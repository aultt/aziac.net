# SQL DSC AlwaysOn Support

4/22/2016 7:47:21 PM

New updates are coming to xSQLServer, they should be available shortly after this post, and will provide support for AlwaysOn Availability groups. Along with the updates are three new example scripts. The three scripts are the following: DSCSQLBuild.ps1, DSCClusterSQLBuild.ps1, and DSCSQLBuildEncrypted.ps1. This blog post will talk specifically about DSCClusterSQLBuild.ps1. This example shows how to leverage the new resources to build an AlwaysOn cluster. Since DSC is built on PowerShell it doesn’t matter how many nodes are participating in our AlwaysOn cluster we just have to specify the computer names and it handles all the configuration for us. Image the amount of time we can save building out new AlwaysOn clusters. So let’s dig into the script and talk about how you can start leveraging it.

At the top of the configuration script we have a couple of variables.

$computers is an array of computers which will participate in the AlwaysOn cluster. First iteration of the resource makes some assumptions around the list of computers you are providing here. The first two nodes will be assumed to be synchronous with automatic failover. All additional nodes provided will be created as asynchronous replicas. Advancements can be made here however initially this is how the resource is developed.

The next few lines of code will look similar to the other configuration examples provided.  We create Cimsessions to each computer and apply the LCM to each.

Next Section is where things differentiate from previous configuration slightly.  Notice the Node $AllNodes line. Everything within this section will only be applied to Nodes which contain the Role of PrimaryClusterNode

As before, we ensure the .Net Framework exists as SQL Server install requires this.  Additionally, we will ensure the AD PowerShell cmdlets are installed as one of the AlwaysOn modules will require it.  The next section doesn’t change from previous example configurations as it’s the configuration of SQL Server.  Here the values are specified as literals, however, we could make them variables and expose at the top of the script or even set them from a database connect. I will talk about further options like these in a later post.

Next we ensure the FailoverFeature and all supporting components are available.

The last section of the PrimaryClusternode will create the cluster, enable AlwaysOn, create the Endpoint and create the Availability Group.  Note that along the way we add all of our dependencies so DSC is aware and doesn’t do something before we are ready.  In the first step, we ensure the cluster is created and the node we are working with is a member of the cluster. Next, we enable AlwaysOn on the instance of SQL Server. We create the endpoint that AlwaysOn will leverage. It’s important to pass the Authorized user as we will grant connect to this user. Without this AlwaysOn will fail.  Finally, we Create the Availability Group with xSQLAOGroupEnsure. xSQLAOGroupEnsure defaults many of the parameters it accepts to limit the need to set a bunch of parameters. Within xSQLAOGroupEnsure there are a couple of things I would like you to be aware of that occur behind the scenes. There are some permissions granted to NT AUTHORITYSYSTEM such as ALTER Availability Group and View Server State. Currently these permissions are not removed, but I may look to remove them. Further testing needs to be done to validate. The resource also creates the computer object in AD within the same OU container where the cluster is created. Enterprises typically don’t place computer objects in the default computer object OU. SQL Server by default will place the listener object in the default computer OU. xSQLAOGroupEnsure creates the computer object in the same OU as the cluster, disables the object, and grants the permissions required to the cluster name object so it can enable the account and bring it online.

To make you aware, I will call each out below:

$AvailabilityGroupNameListener if not passed will default to the availability group name.

$AvailabilityGroupNameIp if not passed the listener will be created with a dynamic IP address. Multiple Ips can be passed each will be added to the listener.

$AvailabilityGroupSubMask if not passed the listener will be created with a dynamic IP address.

$AvailabilityGroupPort defaults to 1433

$ReadableSecondary defaults to ReadOnly. Valid options are None, ReadOnly, ReadIntent

$AutoBackupPreference defaults to Primary

$SetupCredential must be passed as this is what is used to create the availability group in SQL Server.

We have now configured the PrimaryClusterNode and will now loop configure each of the ReplicaServerNodes.  As before, we do this based on the role where it equals ReplicaServerNode.

Again, we ensure the FailoverFeature and all the components are present.


Unlike the PrimaryReplicaNode, we need to ensure the Cluster is created before we try to add the node to the cluster so we have a waitForCluster resource and set our JoinCluster resource to depend on it. WaitforCluster has a retry interval and retry count you can use to influence how often it checks. Depending on your domain environment, you may have replication you have to wait on before its available so you can adjust accordingly.

As before, we need to enable AlwaysOn on the instance and create the endpoint.

Similar to the Cluster portion, we need to wait for the availability group to be created before we can join it.   xWaitForAvailabilityGroup also has retryinterval and retrycount to determine how often and how many times it attempts before failing.

The last part of the script dynamically builds the configuration data which is passed to the configuration.

The first section AllNodes applies to each and every node in the configuration. Each value is described below:

PSDscAllowPlainTextPassword – Allows the use of plain txt passwords. Passwords will be stored in the mof file unencrypted. Set to false and use certificates to be secure. A blog post on this to follow.

PSDscAllowDomainUser required since we hare passing in a domain credential to resources

NETPath – shared location where the SXS folder for the version of Windows you are running on each node. This is utilized if .NET is not present on the node.

SourcePath – shared location where the SQL Server installation files have been exploded on disk for the version of SQL which should be present.

InstallerServiceAccount – Account which will be leveraged to run the SQL Server installation.

AdminAccount – account which will be granted sa within SQL Server.

ClusterName – Name of the cluster which is created for AlwaysOn

ClusterIPAddress – Ip address of the cluster. Currently this resource doesn’t support DynamicIP, however maybe in the future.

The next section dynamically builds each Node configuration and appends it to the configurationdata. The first computer in the list becomes the PrimaryServerNode while all others are made ReplicaServerNodes. Again, as discussed before, the values set here could be defined as variables and passed here to simplify.

In the last step of the loop, we test for the resources on each node, remove them if they exist, and recopy them to ensure we have the latest code.

After we create the configuration, the final step is to push the configuration to each of the nodes. Since we are building to potentially many nodes, I chose to do this via a workflow as shown below. I have also included the test in the form of a workflow for validating after the configuration has applied.

I hope after reading this blog post you have a better understanding of how you can leverage the xSQLServer resources.