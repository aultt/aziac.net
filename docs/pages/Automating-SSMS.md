# Automating installation of SSMS with DSC

1/13/2017 8:40:20 AM

Over the past few months I’ve had a couple of customers ask me, “Now that SQL 2016 doesn’t include SSMS how am I supposed to automate the installation?”.  Typically my response is you shouldn’t be installing it on your servers as its just an additional item that will require patching.  However there are times its necessary and often times customers have dedicated management servers where they want to automate the installation or you want to automate it on your workstation.  Either way DSC is here to assist, installing any .exe or .msi with DSC is relatively simple with the Package resource which is included with DSC.  There are likely other pieces of software you may want to automate on your SQL installations also.  Here I am providing a code example of specifically how SSMS can be installed but it can be modified for other uses.  This is again “Sample Code” so you will notice I am allowing for the use of plain text passwords, not something you would want to do in a production environment.
This is a simple configuration, its only intended purpose is to install SSMS.  To do this there are only a couple of parameters you will need to set.
Name: Actual file name of the package we want to install
Path: Full path to the executable or msi we want to install.
Arguments:  This is an optional parameter but required for SSMS so it doesn’t generate prompts on install
ProductId: This is the GUID found in the uninstall key of the registry.  This allows DSE to remove the software if we set Ensure to “Absent”
Credential:  Credential of the user which has the privileges to install the software.

Adding a link to the file as formatting is getting lost when pasted into the blog.
For reference below is the link for additional details on the Package Resource.
https://msdn.microsoft.com/en-us/powershell/dsc/packageResource
DSC has a lot of flexibility for automating your infrastructure stay tuned next I will be talking about modifying environment Variables and running PowerShell scripts with DSC.