---
title: "Creating a SQL container that’s always the Latest build"
date: 2017-05-02T00:00:20-04:00
categories:
  - blog
tags:
  - SQL Server
---

5/2/2017 1:07:00 PM

Want to stay current with the latest SQL server builds so you can test new features?  Or want the ability to have a quick SQL instance up and running as a development environment?  Now with Docker for Windows and Windows 10 there is a quick and easy way to do both.  In this blog post I will walk through the steps to get you up and running and provide links to further get you familiar with containers. 
First things first you will need to install Docker for Windows.  There is a great article you can find [here](https://docs.docker.com/desktop/get-started/#general).  This will walk you through installing and all the options you have to configure.  If you are looking to do some automation you will want to enable at least one shared drive.  The article referenced above will walk you through this configuration as well.  Since we are building a SQL Server container make sure to configure Docker for a minimum of 4GB of memory as this is required for the container to start.

Now that we have Docker running on windows we can leverage the PowerShell to enable a simple way to launch a development environment.  Ensure you have SQL Server PowerShell cmd-lets installed as the script references Invoke-SQLcmd.  To verify if you have it installed you can run get-command invoke-sqlcmd.  If you have it installed it will return a record with the Source.  In my case I have it from SQLPS.  If it does not find it you can install the latest SQLServer PowerShell module by running install-module sqlserver.

What I have done is created a script and placed it on my desktop.  I right click the script and execute with PowerShell.  The script checks if I currently have the container created if so it will remove it then check to ensure I have the latest SQL Server bits if not it will update them.  Once updated it will create a new container mapping the shared drive we created earlier.  Note I shared my d drive and I created a folder off the root called Docker.  Anything I place in this directory will be available to my container located in the following path in my container /volumes/docker.  Now I have a container running SQL Server and I will loop until SQL Server can get a consistent connection for three attempts.  Once I have a good connection I will restore the backup I have placed in my shared folder.  Notice I need to redirect my paths so SQL Server knows where to place them in my container.  Finally I launch SQL Server Management studio so we can connect and do some testing.

Once you are in SSMS if you would like to change any of server configuration properties you can do that with the exception of SQL Server Authentication, it is the only security mode you can run.  SQL on linux container provides the core sql engine,  if you need SSAS, SSIS, SSRS these are not included in the container.

Now anytime I want to test with the latest SQL Server bits I simple run one PowerShell script and within a couple seconds I have a new instance of SQL Server with a database I can query.

$Container = ‘LatestSQL’
$Database = “AdventureWorks2016CTP3”

#Check for existance of Container
$Current = docker ps –filter “name=$Container”

#Remove our current container so we can replace it
if ($Current){docker rm -v $Container -f}

#pulls latest sql docker image
docker pull microsoft/mssql-server-linux

#Creates new container using the latest bits
docker run -v d:Docker://volumes/Docker –name $Container -e ‘ACCEPT_EULA=Y’ -e ‘SA_PASSWORD=P@ssw0rd’ -p 1433:1433 -d microsoft/mssql-server-linux

#Loop until SQL is up
Do
{
try {Start-Sleep -Seconds 2
$Test = Invoke-Sqlcmd -ServerInstance . -U sa -P P@ssw0rd -Query “Select @@version” -ErrorAction SilentlyContinue
if ($test) {$loop = $loop+1}

}
catch {Write-Output “Waiting for SQL to Start….”}
}
until ($loop -eq 3)

#Restore a backup of my Sample Database
Write-Output “Restoring Database to SQL Server….”
$Query =”RESTORE DATABASE [$($Database)] FROM DISK = N’/volumes/Docker/$($Database).bak’ WITH FILE = 1, MOVE N’$($Database)_Data’ TO N’/var/opt/mssql/data$($Database)_Data.mdf’, `
MOVE N’$($Database)_Log’ TO N’/var/opt/mssql/data$($Database)_Log.ldf’, MOVE N’$($Database)_mod’ TO N’/var/opt/mssql/data$($Database)_mod’, NOUNLOAD, STATS = 5″

Invoke-Sqlcmd -ServerInstance . -U sa -P P@ssw0rd -Query $Query

#Launch SSMS
Invoke-Item “C:Program Files (x86)Microsoft SQL Server140ToolsBinnManagementStudioSsms.exe”