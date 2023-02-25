# Enabling Auditing and Diagnostics on Azure SQL with PowerShell
![image0](assets/images/enableauditimage0.png)

10/31/2019

Do you have databases which were created in Azure without auditing or diagnostics turned on? Do you want to ensure all databases always have this enabled? Recently I have had discussions with customers around monitoring Azure SQL databases. Microsoft has a dashboard, Azure SQL Analytics, which gives you information around the performance of your databases. Additional information on Azure SQL Analytics can be found [here](https://learn.microsoft.com/en-us/azure/azure-monitor/insights/azure-sql). Before you can begin viewing things in the dashboard though, you will need to enable diagnostics for collection. Microsoft also documents how this can be done [here](https://learn.microsoft.com/en-us/azure/azure-sql/database/metrics-diagnostic-telemetry-logging-streaming-export-configure?view=azuresql&tabs=azure-portal). In my case, I had several databases across Azure Sql Logical Servers and Azure SQL Managed Instance. Therefore, I wanted a script to enable them all as well as one that could be run on a regular basis to ensure any new databases were also enabled. Unfortunately, the PowerShell command-lets are different for Azure SQL DB and Azure SQL Managed Instance. Therefore, I have created two different scripts and placed them on my GitHub ProofOfConcepts Repo under [EnableAuditing](https://github.com/aultt/ProofOfConcepts/tree/master/EnableAuditing).

Currently, both have variables defined at the top of the script which you will need to edit for your environment. After editing these, you are ready to step through the code. There are slight variations between the two scripts and I will call them out. First, we check if Audit is enabled on the server itself. If it is not, then we will enable it and point it to the log analytics workspace configured in the variables.

Next, we will get all databases associated with the server and loop through each and ensure Auditing is enabled for each. After Auditing is enabled, we will get the diagnostic settings for the database and loop through each category ensuring it is enabled. If it is not enabled, then we will enable the category.

The largest difference between the two scripts is that I was unable to find a PowerShell module equivalent to Get-AzSqlServerAudit and Set-AzSqlServerAudit for managed instance. Therefore, for managed instance, the script will only enable the audit and diagnostics for all the databases and not for the instance itself. This can, however, be achieved through the portal or through the arm template at creation.

Once you have run the script, it can be scheduled to run through an Automation run-book on a regular basis to ensure any new databases added are also enabled. As always please provide any feedback or questions.

