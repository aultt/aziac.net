# AlwaysOn Availability Group Automation Part 1

6/18/2015 11:19:00 AM

AlwaysOn Availability Group Automation Part 1
Do you have a need to create multiple availability groups?  Do you wish there was an easy way script and deploy them consistently? PowerShell to the rescue!  PowerShell is the DBA’s best friend in that there are many tasks which can be simplified and automated, saving the DBA precious time to devote to other tasks.  The first PowerShell script I want to share with you can be leveraged to create availability groups.  The module name is NewCustomAG and can be found in the TechNet Gallery https://gallery.technet.microsoft.com/PowerShell-Module-for-9538e843) and PowerShell Gallery (https://www.powershellgallery.com/packages/NewCustomAG/).

I want to call out a few prerequisites before moving forward about the function.  This function assumes you have a functional Windows failover cluster with SQL Server installed on all nodes.  SQL Server versions tested were SQL Server 2012 and 2014 on Windows Server 2012 and 2012 R2.  SQL Server client tools and remote server administration tools need to be present on the server where you are running the script.  The script will check to verify AlwaysOn is enabled for the instance and if not, enable and recycle the services.  Therefore, if you don’t want your services recycled you should enable prior to executing the function.

With NewCustomAG you can now create a script to create all the availability groups at once by just passing a few parameters.  Where does this come in handy?  Once scenario I have run into is when SharePoint is utilizing availability groups.  You will want to isolate specific databases to specific availability groups.

For instance I may create a script such as below:

Import-Module NewCustomAG

New-CustomAG -Servers TNSQL3001,WASQL3001 -SqlAgName AG-SPAdmin-3001 -CNO CLUWATN3001 -IPAddresses 192.168.81.32,192.168.71.32 -BackupDirectory ohnas001SQLBackups -verbose

New-CustomAG -Servers TNSQL3001,WASQL3001 -SqlAgName AG-SPBI-3001 -CNO CLUWATN3001 -IPAddresses 192.168.81.33,192.168.71.33 -BackupDirectory ohnas001SQLBackups -verbose 

New-CustomAG -Servers TNSQL3001,WASQL3001– SqlAgName AG-SPContent01-3001 -CNO CLUWATN3001-IPAddresses 192.168.81.34,192.168.71.34 -BackupDirectory ohnas001SQLBackups -verbose 

New-CustomAG -Servers TNSQL3001,WASQL3001– SqlAgName AG-SPService01-3001 -CNO CLUWATN3001 -IPAddresses 192.168.81.35,192.168.71.35 -BackupDirectory ohnas001SQLBackups -verbose 

This will create four empty availability groups for me.  For many large companies DBAs do not have the ability to create computer objects in the default OU of active directory.  Often times companies will create an OU specifically for their database servers and grant the DBA’s privileges.  In this case additional steps need to occur.  When you create the availability, listener it will attempt to create the Computer object in the default OU and will fail since you as a DBA do not have privileges there.  However, if the object exists and is disabled, SQL will be able to enable it.  The PowerShell module will ask for the Cluster Name Object(CNO), the script will look up the object and take the OU Path, and create the Availability Group Listener computer object in the same path.  After creating the computer object, it will assign the appropriate privileges to the CNO so when the listener is created it can enable it.  A dummy database is created and dropped when done for each DB since an availability group requires a database exist at time of creation.  All backup files are removed after the script completes.

New-CustomAG gives you the flexibility to create the availability group on as many servers and subnets as needed.  The only requirement is the first server in the list will be assumed the primary.  If you are adding an existing database, it will be required to exist on this server or will create the dummy database here and restore to each additional server.  Multi-subnet clusters will need an IP address provided for each subnet.  PowerShell will loop through all servers and IPs.

Hopefully you will find this useful in setting up your next availability group.
