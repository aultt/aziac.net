---
title: "AlwaysOn Availability Group Automation Part 2"
date: 2015-06-23T06:41:20-04:00
categories:
  - blog
tags:
  - AlwaysOn
  - DSC
  - SQL Server
---

6/23/2015 6:41:20 AM

Last post I talked about the function NewCustomAg which allows you to create availability groups. After running it, you will have an availability group created with one or no databases. Most likely you will want to add several databases to each availability group.  One option would be to utilize the GUI wizard, however, if you want to ensure a repeatable process you may want to utilize a script.  PowerShell again helps us with its integration with SMO.  To assist in this process, I have written a PowerShell module to accompany NewCustomAg.  The module name is Add-CustomAvailabilityDB and can be found in the TechNet Gallery [here](https://gallery.technet.microsoft.com/Powershell-Module-To-Add-704fefe0) and in the PowerShell gallery [here](https://www.powershellgallery.com/packages/AddCustomAvailabilityDB/).

First we will call out the prerequisites.  Function assumes you have a working windows failover cluster, with SQL server installed and AlwaysOn enabled.  In addition it assumes the availability group you pass is created.  Any of the assumptions listed here will cause the function to abort and return an error.  Function was tested on SQL Server 2012 and SQL Server 2014 on Windows Server 2012 and 2012 R2.  Function will validate that the database(s) don’t exist already in another availability group, if it does, it will error and call out the group it currently exists in.  The final check is to validate that each database is in full recovery model.  If the database is not in full recovery, then it will alter the database and place it in full recovery.

Parameters passed to Add-CustomAvailabilityDB include the following: Servers, SQLAgName, Database(s), and Backup Directory, TimeOut

Servers parameter is array of strings of servers which the availability group exists on where you would like the database(s) to be replicated to.

SQLAgName is the availability group you would like to add database(s) to.

Backup Directory is optional.  In the event it is passed, all databases will be backed up to this location and restored from here to the corresponding servers passed.  Once restored, the databases will be joined to the availability group.  If Backup Directory is not passed, the function assumes you would like to do a Join Only operation and will attempt to join the databases.  If you do not pass Backup Directory, then the function assumes you have already taken a full and transaction log backup for each database and restored to each server with norecovery.  Database administrators may want to leverage this option when they have VLDB (Very Large Databases) because they often take a longtime to backup/restore and you may want to isolate when this occurs.

TimeOut is the connection timeout for the SMO connection which is utilized to backup and restore the database(s).  If not passed, the value is set to 0 which will not timeout.  In the event you want the function to timeout after a period of time, TimeOut can be passed and the time is in seconds.

Function will loop through each server and databases.  Depending on parameters passed, it will Backup/Restore and join the database to the availability group.  Once complete any backup files generated as a part of the function will be removed.

Examples of the function are listed below:

Add-CustomAvailabilityDB -Servers TNSQL3001,WASQL3001 -SqlAgName AG-TNWA3004 -Databases Test1 -BackupDirectory ohnas001SQLBackups –verbose

Add-CustomAvailabilityDB -Servers TNSQL3001,WASQL3001,MISQL3001 -SqlAgName AG-TNWA3004 -Databases Test1,Test2,Test3,Test4,Test5 -BackupDirectory ohnas001SQLBackups -verbose