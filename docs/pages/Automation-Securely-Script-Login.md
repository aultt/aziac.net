# Automation with Azure? How to securely script login?

8/21/2017 3:53:17 PM

Do you have a need to login to azure securely without being prompted?  Often times I am doing demos or writing automation routines which interact with Azure.  Typically you will see one of two things: 
Get-Credential
$PlainPassword = “P@ssw0rd”
$SecurePassword = $PlainPassword | ConvertTo-SecureString -AsPlainText -Force
The first one is painful because it requires input from the user running the script and the second one well… is obviously not secure.  Since neither one of these are desirable for automation I went searching for a better solution.  What I found is described in the following article -> [Use Azure PowerShell to create a service principal to access resources](https://learn.microsoft.com/en-us/azure/active-directory/develop/howto-authenticate-service-principal-powershell)

Since i use this often I wrapped things into a couple of functions which exist in [LabInaBox](https://github.com/Microsoft/DSC-data-driven-deployment/tree/dev/utility/LabInaBox).  The two functions I am going to talk about here are New-AzureCertAuthentication and Login-AzurebyCert.

New-AzureCertAuthentication is called one time per subscription or resource group depending on how you are looking to secure the authentication.  The function has two mandatory parameters and two optional parameters.  ApplicationDisplayName is required and is the name of the service principal which will be created in your azure subscription which will be granted the permissions required.  You will find this under the subscriptions blade, followed by selecting the subscription then selecting Access control (IAM).  Here you will see the ApplicationDisplayName after you call the function.  Subject is the second required parameter which corresponds to the subject name of the self-signed certificate which will be generated and used for connecting to the service principal url which is created.  Once the function has been called you will find this certificate in the Current User personal certificate folder.  Subscription parameter is not required and will default to your default subscription if not passed.  Resource Group is also not required and should only be passed if you want your permission to be scoped to a particular resource group.  For LabinaBox and everything I do myself I want subscription access so I can create and remove resource groups.  If you have a need to scope at the resource group level the functionality is there.  So this provides up with three possible ways you can call this function which are documented below:

Securing authentication to the Resource Group Level you would pass the following
New-AzureCertAuthentication -ResourceGroup ‘MyResourceGroup’ -SubscriptionID ‘MySubscriptionID’ -ApplicationName ‘MyApplicationName’ -Subject ‘MyCertSubject’
Securing authentication to the Subscription level and passing the subscription you want to utilize.
New-AzureCertAuthentication -SubscriptionID ‘MySubscriptionID’ -ApplicationName ‘MyApplicationName’ -Subject ‘MyCertSubject’
Securing authentication to the Subscription level using our default subscription
New-AzureCertAuthentication -ApplicationName ‘MyApplicationName’ -Subject ‘MyCertSubject’
New-AzureCertAuthentication only needs to be called once.  When you call it it will prompt for your credentials to connect to your azure subscription.  After it completes it will want to capture the following information:

Cert Subject – corresponds to Subject passed to New-AzureCertAuthentication
ApplicationID – This is returned function
TennantID –  This is returned from the function
Now we have all the plumbing in place to connect to azure within a script from our machine.  We can simply call Login-AzurebyCert and pass three pieces of information and we will be connected to our subscription and be able to interact with any azure cmd-let.  Below is an example of a call :

Import-module -name “C:YourPathtoModulemodulesLabinaBox.psm1”
Login-AzurebyCert -Certsubject ‘MyCertSubject’ -ApplicationID ‘xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx’ -TennantID ‘xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx’

Because I wanted to easily be able to interact with Azure I modified my function to default to my certsubject, applicationid, and tennantid.  Simplifies if I am at PowerShell prompt and want a connection to my subscription.

Stay tuned in my next article I will talk about utilizing this cmd-let and Azure Key Vault to build a credential and login to a Azure VM without being prompted.