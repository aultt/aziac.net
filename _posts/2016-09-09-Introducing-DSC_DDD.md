---
title: "Introducing DSC Data Driven Deployment"
date: 2016-09-09T03:37:20-04:00
categories:
  - blog
tags:
  - DSC
  - SQL Server
---

9/9/2016 3:37:59 PM

Working with customers over the past year, many have asked: How can we manage SQL Server configurations at scale in a large enterprise?  PowerShell DSC provides a configuration framework out of the box, however, there isn’t a way to quickly build SQL deployment templates and provision in a DevOps fashion without using a third party product. 
A colleague and I took on the task of developing a proof of concept data driven deployment solution backed by a SQL database. The solution provides default SQL configurations (templates) and the ability to add additional configurations as you see fit. Meta data for the configuration is stored within the database as well as setup credentials stored in a secure manner.  DevOps users may quickly queue requests which can be pushed manually or via some orchestration (even just a scheduled task).

Initially available in the project are two configurations: SQLStandAlone and SQLAlwaysOn. Steps to setup and deploy the solution are all documented in the Readme file. Currently the solution is a push deployment which consists of a Test-Configuration at the end to validate it was successful. Future plans are to add include the following:

Provide a mechanism to validate the configuration and redeploy
Provide history tracking of configuration overtime
Provide reporting/auditing of configurations
Over the past couple of months I have spoken with many of you about this solution, and it is now publicly available as a sanctioned open source project on [GitHub](ttps://github.com/Microsoft/DSC-data-driven-deployment)

Please feel free to add Issues/Feature requests and Contribute to the project

 