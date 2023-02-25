# Desired State Configuration (DSC) for SQL Server FailoverCluster
10/20/2017 3:16:29 PM

Following up from my last post I have published the Failover Cluster Instance composite configurations and updated the previous configurations.  Initially lets talk about the updates to the which were pushed.

Single Instance, Primary AlwaysOn,  and Secondary AlwaysOn  all had additional optional parameters added enabling all configurable items to be leveraged.  Each of these are defaulted so no breaking changes to the previous examples but additional flexibility added.

Lets move on to Failover Cluster Instance as this has been one I have gotten several questions on how to leverage.  Utilizing the SQLCompositeResources module there are three new resources which will be utilized to build a Failover Cluster Instance [FailOverClusterDisk](https://github.com/aultt/DSCSQLCompositeResources/tree/master/Modules/SQLCompositeResources/DSCResources/FailOverClusterDisk), [FailOverClusterInstanceFirstNode](https://github.com/aultt/DSCSQLCompositeResources/tree/master/Modules/SQLCompositeResources/DSCResources/FailOverClusterInstanceAdditionalNode), and [FailOverClusterInstanceAdditionalNode](https://github.com/aultt/DSCSQLCompositeResources/tree/master/Modules/SQLCompositeResources/DSCResources/FailOverClusterInstanceFirstNode).  To show how they can be leveraged we will walk through the example provided for [FailOverClusterInstanceFirstNode](https://github.com/aultt/DSCSQLCompositeResources/tree/master/Modules/SQLCompositeResources/DSCResources/FailOverClusterInstanceFirstNode) and [FailOverClusterInstanceAdditionalNode](https://github.com/aultt/DSCSQLCompositeResources/tree/master/Modules/SQLCompositeResources/DSCResources/FailOverClusterInstanceAdditionalNode)

# Failover Cluster Instance First Node
First resource we will cover this time is [FailOverClusterInstanceFirstNode_Example.ps1](https://github.com/aultt/DSCSQLCompositeResources/blob/master/Modules/SQLCompositeResources/DSCResources/FailOverClusterInstanceFirstNode/Examples/FailOverClusterInstanceFirstNode_Example.ps1). As in the previous post Credential Management and LCM Config are identical so I will not cover these again.

## Metadata ($CofigData)
Here we need to provide a few more data elements than we did previously.  Unlike our previous builds we have to provide an installation path for our SQL Server database and logs files as these are required to reside on a shared disk.  Since at least one shared disk is required we need to provide the disk layout and how each drive should be labeled.  To simplify we do this by providing a key of DiskConfiguration and passing an array of hashtable values.  Each hashtable will provide the parameters FailOverClusterDisk requires. Finally we need to provide a name for our FCI and the IPaddress.

## SQL Server Configuration
The main section is the SQL Configuration and its a simple call.  One call to  FailOverClusterInstanceFirstNode will ensure the following:

Ensure Failover Cluster feature is installed on the machine
Ensures disks partitions are created, formatted and added to the cluster.  This is accomplished by calling FailOverClusterDisk
Ensure .Net framework is present
Installs Failover Cluster Instance of SQL Server
Configures SQL FCI
To complete the example Resources are moved and the configuration is generated and deployed.

# Failover Cluster Instance Additional Node
Next we will look at FailOverClusterInstanceAdditionalNode_Example.ps1 

## Metadata ($CofigData)
Since we are adding to an existing cluster, we have a much smaller set required.  All required values are listed in FailOverClusterInstanceAdditionalNode_Example.ps1 .

## SQL Server Configuration
The main section for SQL Configuration is again simple, a singe call to FailOverClusterInstanceAdditionalNode.  Calling FailOverClusterInstanceAdditionalNode will do the following:

Ensure Failover Cluster feature is installed on the machine
Wait for the cluster created from FailOverClusterInstanceFirstNode to be found
Join the cluster
Ensure .Net framework is present
Add node to SQL FCI
To complete the example Resources are moved and the configuration is generated and deployed.

With the addition of these composite resources I hope building out new SQL configurations will be simpler and have less redundancy.  Please let me know if you have issues or recommendations for improvement.