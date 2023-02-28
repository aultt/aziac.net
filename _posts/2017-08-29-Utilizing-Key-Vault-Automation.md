---
title: "Utilizing Key Vault for Automation"
date: 2017-08-29T00:00:20-04:00
categories:
  - blog
tags:
  - Azure
  - Powershell
  - Key Vault
---

8/29/2017 12:42:21 PM

Working with PowerShell I often find myself doing demos which require me to have some form of credentials or other sensitive data.  In the past I’ve used really generic passwords which are easy to work with but always leave a bad taste in your mouth because the passwords are stored in plain text.  Azure has a very nice service called Key Vault which is a great solution to this problem.  To demonstrate I put together a simple script to build a credential and then utilize the credential to login into a virtual machine which is hosted in Azure.

# Prerequisites
Prior to running this script you will need to have setup a way to automatically login to Azure, if you have not done this please read my previous log post [here](https://learn.microsoft.com/en-us/archive/blogs/troy_aults_blog/loginazurewithoutprompt) first.

Next we will need a function called [Connect-Mstsc](https://www.powershellgallery.com/packages/Connect-Mstsc/1.2.5) which is available on the PowerShell Gallery.

# Creating The Key Vault
First thing we need to do is setup Key Vault in our subscription.  You have a couple options we can do it online through the online through the portal or in PowerShell.  Since I lend to automation I will demonstrate PowerShell.  Below is an example script to setup your first Key Vault.  We will want to run the setup under our personal account so we have the ability to also add/update/delete to the Key Vault in the web.  For instance adding in new keys we will do online because its a onetime task and we don’t want our secrets in plain text.  So to enable this when setting up the Key Vault we will utilize Login-AzureRMAccount.  We capture the output into the variable $login so we can extract our accountid and grant ourselves all permissions to the secrets.  In addition we need to provide a couple of details to create.  We need to provide a name for the Key Vault, a resource group, and if we want to automate with PowerShell, we will also need to provide our Service Principal so we can grant it privileges.
$login = Login-AzureRmAccount

$KeyVaultName = ‘MyKeyVault100’
$ResourceGroup = “$($KeyVaultName)RG”
$location = ‘EastUS2’
$ServicePrincipal = ‘http://ManageInternalAzureApp’
$UserPrincipal = $login.Context.Account.id

New-AzureRmResourceGroup -Name $ResourceGroup -Location $location
New-AzureRmKeyVault -VaultName $KeyVaultName -ResourceGroupName $ResourceGroup -Location $location
Set-AzureRmKeyVaultAccessPolicy -VaultName $KeyVaultName -ServicePrincipalName $ServicePrincipal -PermissionsToSecrets get
Set-AzureRmKeyVaultAccessPolicy -VaultName $KeyVaultName -userPrincipalName $UserPrincipal -PermissionsToSecrets all

As you see above this script will create a new Resource Group, Key Vault and then grant privileges to the Key Vault.  For this demo it is granting my automation ServicePrincipal get only privileges.  Therefore utilizing my automation I will not be able to update or delete the secrets.  My credentials I logged in to create the Key Vault will have all permissions on Secrets which will give me the ability to add new/update/delete secrets from the portal.

After running the script we now have a Key Vault and we need to go put some secrets in to retrieve.  Now browse to ResourceGroups>MyKeyVault100RG>MyKeyVault100.  Here we will see /assets (Keys, Secrets) and Monitoring (Access Policies).  First if we look at Access Policies we will see our application and user which we granted get and all privileges to above.  Next we will go to Secrets.  Here we want to click + Add change our upload options to Manual and fill in the required fields.  We will do this for both the AdminUser and AdminPass.

# Accessing Key Vault
We are now ready to consume our secrets!!  We can make calls out to KeyVault and build a credential.  Below is some sample code showing this.

Login-AzurebyCert
$AdminUserName = ‘AdminUser’
$AdminPassName = ‘AdminPass’
$AdminUser = Get-AzureKeyVaultSecret -VaultName $KeyVaultName -Name $AdminUserName
$AdminPass = Get-AzureKeyVaultSecret -VaultName $KeyVaultName -Name $AdminPassName
$mycred = New-Object System.Management.Automation.PSCredential (“$($AdminUser.SecretValueText)”, $AdminPass.SecretValue)

First we leverage Login-AzurebyCert which is explained in earlier post.  We define which secrets we want to retrieve in this case AdminUser and AdminPass.  We retrieve the values for these then build a credential from them.  After we run the above script if we take a look at $mycred we will see we now have a PSCredential.

I can now leverage this credential to pass to any other PowerShell cmdlet which takes a credential as an input.  For my example here I am going to pass it to a PowerShell function I referenced earlier Connect-Mstsc which will allow me to RDP into a windows machine.  This machine could be local in azure or any where for that matter.  I will be automatically logged in without having the need to know or pass credentials.  Below is the actual call.

Connect-Mstsc -ComputerName 192.168.10.1:3389 -Credential $mycred

Having the ability to store secrets helps aid in cleaning up our automation/demo scripts to ensure we are being good stewards of our sensitive data.

