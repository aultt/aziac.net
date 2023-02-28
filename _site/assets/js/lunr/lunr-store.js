var store = [{
        "title": "AlwaysOn Availability Group Automation Part 1",
        "excerpt":"6/18/2015 11:19:00 AM AlwaysOn Availability Group Automation Part 1 Do you have a need to create multiple availability groups? Do you wish there was an easy way script and deploy them consistently? PowerShell to the rescue! PowerShell is the DBA’s best friend in that there are many tasks which can...","categories": ["blog"],
        "tags": ["AlwaysOn","DSC","SQL Server"],
        "url": "/blog/AlwaysOn-AG-AutomationPart1/",
        "teaser": null
      },{
        "title": "AlwaysOn Availability Group Automation Part 2",
        "excerpt":"6/23/2015 6:41:20 AM Last post I talked about the function NewCustomAg which allows you to create availability groups. After running it, you will have an availability group created with one or no databases. Most likely you will want to add several databases to each availability group. One option would be...","categories": ["blog"],
        "tags": ["AlwaysOn","DSC","SQL Server"],
        "url": "/blog/AlwaysOn-AG-AutomationPart2/",
        "teaser": null
      },{
        "title": "Desired State Configuration(DSC) for SQL Server",
        "excerpt":"8/31/2015 7:53:47 AM Many people are not familiar with DSC yet so lets first start with what is DSC and why we as DBA’s should care. DSC is a management framework in PowerShell. DSC allows us to deploy and manage configuration data. Some examples of practical applications would be the...","categories": ["blog"],
        "tags": ["DSC","SQL Server"],
        "url": "/blog/DSC-For-SQL/",
        "teaser": null
      },{
        "title": "SQL DSC AlwaysOn Support",
        "excerpt":"4/22/2016 7:47:21 PM New updates are coming to xSQLServer, they should be available shortly after this post, and will provide support for AlwaysOn Availability groups. Along with the updates are three new example scripts. The three scripts are the following: DSCSQLBuild.ps1, DSCClusterSQLBuild.ps1, and DSCSQLBuildEncrypted.ps1. This blog post will talk specifically...","categories": ["blog"],
        "tags": ["Azure","SQL Server"],
        "url": "/blog/SQL-DSC-AlwaysOn-Support/",
        "teaser": null
      },{
        "title": "SQL Server DSC Encrypted Configuration",
        "excerpt":"4/25/2016 2:02:01 PM Following up on my last post about new changes coming to xSQLServer. Today I want to talk about two additional Example scripts which have been provided with the new updates. The first script is DSCSqlBuild.ps1. This new script adds a couple of items SQLPush_SingleServer.ps1 doesn’t have. DSCSQLBuild.ps1...","categories": ["blog"],
        "tags": ["SQL Server"],
        "url": "/blog/SQL-DSC-Encrypted-Config/",
        "teaser": null
      },{
        "title": "Introducing DSC Data Driven Deployment",
        "excerpt":"9/9/2016 3:37:59 PM Working with customers over the past year, many have asked: How can we manage SQL Server configurations at scale in a large enterprise? PowerShell DSC provides a configuration framework out of the box, however, there isn’t a way to quickly build SQL deployment templates and provision in...","categories": ["blog"],
        "tags": ["DSC","SQL Server"],
        "url": "/blog/Introducing-DSC_DDD/",
        "teaser": null
      },{
        "title": "Introducing LabInaBox",
        "excerpt":"11/22/2016 9:56:58 AM Do you have a need to spin up a sandbox lab environment quickly to test DSC configurations, updates or really anything? In writing DSC configurations over the last year I have found the need to do this often. To simplify things I put together a few configurations...","categories": ["blog"],
        "tags": ["PowerShell","SQL Server"],
        "url": "/blog/Introducing-LabInaBox/",
        "teaser": null
      },{
        "title": "Automating the installation of SSMS with DSC",
        "excerpt":"1/13/2017 8:40:20 AM Over the past few months I’ve had a couple of customers ask me, “Now that SQL 2016 doesn’t include SSMS how am I supposed to automate the installation?”. Typically my response is you shouldn’t be installing it on your servers as its just an additional item that...","categories": ["blog"],
        "tags": ["DSC","SQL Server"],
        "url": "/blog/Automating-SSMS/",
        "teaser": null
      },{
        "title": "Creating a SQL container that’s always the Latest build",
        "excerpt":"5/2/2017 1:07:00 PM Want to stay current with the latest SQL server builds so you can test new features? Or want the ability to have a quick SQL instance up and running as a development environment? Now with Docker for Windows and Windows 10 there is a quick and easy...","categories": ["blog"],
        "tags": ["SQL Server"],
        "url": "/blog/Creating-SQL-Container/",
        "teaser": null
      },{
        "title": "Automation with Azure? How to securely script login?",
        "excerpt":"8/21/2017 3:53:17 PM Do you have a need to login to azure securely without being prompted? Often times I am doing demos or writing automation routines which interact with Azure. Typically you will see one of two things: Get-Credential $PlainPassword = “P@ssw0rd” $SecurePassword = $PlainPassword | ConvertTo-SecureString -AsPlainText -Force The...","categories": ["blog"],
        "tags": ["Azure","ARM","PowerShell"],
        "url": "/blog/Automation-Securely-Script-Login/",
        "teaser": null
      },{
        "title": "Utilizing Key Vault for Automation",
        "excerpt":"8/29/2017 12:42:21 PM Working with PowerShell I often find myself doing demos which require me to have some form of credentials or other sensitive data. In the past I’ve used really generic passwords which are easy to work with but always leave a bad taste in your mouth because the...","categories": ["blog"],
        "tags": ["Azure","Powershell","Key Vault"],
        "url": "/blog/Utilizing-Key-Vault-Automation/",
        "teaser": null
      },{
        "title": "Enabling Auditing and Diagnostics on Azure SQL with PowerShell",
        "excerpt":"8/30/2017 2:48:12 PM Today building out repeatable demo/lab environments quickly has become a necessity. Previous this year I released LabInaBox which provided for a quick way to build out lab environments on a Windows 10 machine using Hyper-V. As more and more customers are looking at Azure I wanted to...","categories": ["blog"],
        "tags": ["PowerShell","Azure","SQL Server"],
        "url": "/blog/LabinaBox-Onprem-or-Cloud/",
        "teaser": null
      },{
        "title": "Desired State Configuration (DSC) for SQL Server AlwaysOn",
        "excerpt":"10/9/2017 6:04:53 PM Over the past few months several individuals/customers have asked me for updated examples of the latest xSQLServer Resource. As of this post, the current version is 8.2.0.0. Throughout this post I will provide reference to configurations which are actually calling composite resources. If you haven’t heard of...","categories": ["blog"],
        "tags": ["DSC","SQL Server","AlwaysOn"],
        "url": "/blog/DSC-For-SQL-Update/",
        "teaser": null
      },{
        "title": "Desired State Configuration (DSC) for SQL Server FailoverCluster",
        "excerpt":"10/20/2017 3:16:29 PM Following up from my last post I have published the Failover Cluster Instance composite configurations and updated the previous configurations. Initially lets talk about the updates to the which were pushed. Single Instance, Primary AlwaysOn, and Secondary AlwaysOn all had additional optional parameters added enabling all configurable...","categories": ["blog"],
        "tags": ["DSC","SQL Server","Failover Cluster"],
        "url": "/blog/DSC-For-SQL-FC/",
        "teaser": null
      },{
        "title": "SQL Server Modern Data Platform",
        "excerpt":"1/1/2019 Are you looking to modernize your data platform? Do you have need to quickly get off a version of SQL Server which is approaching end of life? Today I am going to walk through through the different options and help you determine how you will run SQL Server in...","categories": ["blog"],
        "tags": ["Azure","ARM"],
        "url": "/blog/SQL-Server-Modern-Data-Platform/",
        "teaser": null
      },{
        "title": "Automating SQL Server in Azure Part 1",
        "excerpt":"1/2/2019 In the previous blog entry, we talked about the different options available for SQL Server running in a PaaS solution in Azure. Today we will focus on the IaaS solutions available. Let’s get started! We have four different options when implementing SQL Server in an IaaS solution. The first...","categories": ["blog"],
        "tags": ["Azure","ARM","DSC","SQL Server"],
        "url": "/blog/Automating-SQL-In-Azure-Part1/",
        "teaser": null
      },{
        "title": "Automating SQL Server in Azure Part 2",
        "excerpt":"1/3/2019 Continuing where we left off from our last post, we are now going to look into a more complex Azure Resource Manager (ARM) template. In this post we will cover an Always On deployment to an existing VNet and domain. Provided you read the first post in this series,...","categories": ["blog"],
        "tags": ["Azure","ARM","DSC","SQL Server"],
        "url": "/blog/Automating-SQL-In-Azure-Part2/",
        "teaser": null
      },{
        "title": "Automating SQL Server in Azure Part 3",
        "excerpt":"1/15/2019 Finishing out the series on SQL Server Automation for IaaS. The final template is SQL Server Failover Cluster Instance running on storage spaces direct. Source code for this and all other templates can be found on my Github. For this template the direct link is here. Ensure you have...","categories": ["blog"],
        "tags": ["Azure","ARM","DSC","SQL Server"],
        "url": "/blog/Automating-SQL-In-Azure-Part3/",
        "teaser": null
      },{
        "title": "Lift and Shift SSIS to Azure",
        "excerpt":"3/8/2019 With SQL Server 2008 end of life around the corner, July 9 2019 for those not aware, many companies are looking to lift and shift their SQL environments to the cloud. In doing so, most companies are looking for the opportunity to move to Platform as a Service (PaaS)...","categories": ["blog"],
        "tags": ["Azure","SQL Server"],
        "url": "/blog/Lift-and-Shift-SSIS/",
        "teaser": null
      },{
        "title": "Managing Azure Data Services Costs through Automation",
        "excerpt":"10/29/2019 Cloud computing cost management… Do you have services which should be running only during a pipeline? Do you have a lab environment which you want to ensure isn’t running after hours? There are multiple ways to manage and ensure minimal cost. My first iterations were leveraging automation accounts. These...","categories": ["blog"],
        "tags": ["Azure"],
        "url": "/blog/Managing-Azure-Data-Services-Costs/",
        "teaser": null
      },{
        "title": "Enabling Auditing and Diagnostics on Azure SQL with PowerShell",
        "excerpt":"10/31/2019 Do you have databases which were created in Azure without auditing or diagnostics turned on? Do you want to ensure all databases always have this enabled? Recently I have had discussions with customers around monitoring Azure SQL databases. Microsoft has a dashboard, Azure SQL Analytics, which gives you information...","categories": ["blog"],
        "tags": ["PowerShell","Azure","SQL Server"],
        "url": "/blog/Enable-Auditing-AzureSQL/",
        "teaser": null
      },{
        "title": "Moving Databases with TDE to Azure SQL MI",
        "excerpt":"1/19/2020 Many customers are long on their journey to Azure, while some are just beginning. As customers begin to look at migrating databases, security is typically the first discussion point. By default, Azure SQL encrypts data at rest and in transit. Azure does this utilizing a system managed key, however,...","categories": ["blog"],
        "tags": ["Azure","SQL","Migration"],
        "url": "/blog/Moving-Databases-with-TDE/",
        "teaser": null
      },{
        "title": "Azure DevOps for the Data Engineer Part 1",
        "excerpt":"8/10/2020 Working with customers, I often need to spin up environments to demo/test/validate different scenarios. In the past I have kept a Hyper-V lab which housed all the different versions of SQL. This became a management overhead to ensure they were up to date. In addition, the number of releases...","categories": ["blog"],
        "tags": ["Azure","ARM","DSC","SQL Server"],
        "url": "/blog/Azure-DevOps-for-the-Data-Engineer-Part1/",
        "teaser": null
      },{
        "title": "Azure DevOps for the Data Engineer Part 2",
        "excerpt":"8/16/2020 Welcome back as we continue from our previous discussion, where we discussed deploying a domain controller in Azure with ARM and DevOps. If you missed it, read the previous blog post. Here we will leverage two more ARM templates which I have published to my GitHub account. The first...","categories": ["blog"],
        "tags": ["Azure","ARM","DSC","SQL Server"],
        "url": "/blog/Azure-DevOps-for-the-Data-Engineer-Part2/",
        "teaser": null
      },{
        "title": "Oracle Infrastructure as Code in Azure",
        "excerpt":"7/7/2021 Are you looking to move Oracle workloads to Azure? Want to establish an Oracle development environment in Azure? Before getting started, I suggest you check out the following video. After watching the video, you will have a good understanding of all the things to consider when moving Oracle workloads...","categories": ["blog"],
        "tags": ["Azure","ARM","Oracle","Ansible"],
        "url": "/blog/Oracle-Infrastructure-as-Code-in-Azure/",
        "teaser": null
      }]
