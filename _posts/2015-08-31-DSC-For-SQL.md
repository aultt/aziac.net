---
title: "Desired State Configuration(DSC) for SQL Server"
date: 2015-08-31T06:04:04-04:00
categories:
  - blog
tags:
  - DSC
  - SQL Server
---

8/31/2015 7:53:47 AM

Many people are not familiar with DSC yet so lets first start with what is DSC and why we as DBA’s should care.  DSC is a management framework in PowerShell.  DSC allows us to deploy and manage configuration data.

Some examples of practical applications would be the following:

Enabling/Disabling server roles and features
Managing registry settings
Managing files and directories
Starting/Stopping/Managing processes and services
Managing groups and user accounts
Deploying software
Fixing a configuration which has drifted from its intended configuration
So from a SQL perspective how can we as DBA’s leverage this framework?  There are several ways and many are already available for us in the PowerShell Gallery.  If we don’t find specifically what we need we can generate it and publish it for others to consume as well.  The exciting thing about DSC is it is community driven.

So specifically around SQL Server I can think of a few things which every DBA should be interested in automating.

Installation of SQL Server
Configuration of SQL Server. (MaxMemory, MaxDop, ect)
Security Compliance
In addition it would be nice if after we built a server we knew the configuration would not change.  DSC can help us here as well because it can monitor the configuration and if it changes it can put it back to the correct configuration.

When we talk DSC the first thing we need to understand is how are the configurations being applied.  On each target node there is a local configuration manager (LCM) which is responsible for calling resources included in the DSC configuration script.  LCM is configurable such that you can specify the frequency it checks the configuration, which mode the confutation is in (Push vs. Pull), if the node can be rebooted if needed, as well as others.

Two different modes exist for the LCM push or pull.  Push allows for configurations to be pushed to the server and applied.  This works well for testing or for a small deployment, however in larger deployments we will most likely look to a pull configuration.  Pull can be a SMB file share or a HTTP website.  Configuration files are stored here and servers periodically check in to see if they are utilizing the most recent configuration.  Depending on their LCM settings they could apply or just monitor.

Now we have an understanding of LCM,how about the configuration where we want to deploy SQL Server and configure it.

Here is the piece of code which will tell the LCM to install SQL Server.  A few parameters are required to be passed and then the configuration can be provided to the node and LCM will do the rest.

In addition we probably want to configure SQL Server after the install.  For instance SQL Server performs best when the power plan is set to High Performance. There are likely others we would want to set also such as min and max memory and page file.  There are many possibilities.  I took the most common ones I could think of and created a DSC module.  An example of how you can leverage them is listed below:

Location of the modules are provided below.  Once you have cSQLConfig installed locally you will find an example configuration script in the examples folder.  This should get you started and only need some minor changes for your environment.

cSQLConfig can be found in the PowerShell Gallery [here](https://www.powershellgallery.com/packages/cSQLConfig/)

xSQLServer can be found in the PowerShell Gallery [here](https://www.powershellgallery.com/packages/xSQLServer/)

DSC opens up many possibilities for DBAs to automate and reduce unwanted change in their environment.

If you are looking to learn more about DSC and how you can leverage it Jeffrey Snover and Jason Helmick have an excellent video on Microsoft Virtual Academy.  Link provided [here](https://www.microsoftvirtualacademy.com/en-US/training-courses/getting-started-with-powershell-desired-state-configuration-dsc—8672)

Hopefully everyone is excited about the opportunities this presents!

Updates to leveraging DSC with the latest resources can be found in he following two posts.