---
layout: post
title: "Setting up the EC2 vm and getting the data"
description: ""
category:
tags: [sysadmin,data]
date: '2014-08-01 22:25'
---
{% include JB/setup %}

Next step is accessing the [dataset](http://aws.amazon.com/datasets/Climate/2759). I've never accessed data stored on a third party EBS volume. Anyway after reading the docs about [EBS mapping](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/block-device-mapping-concepts.html) I'm able to start a t2.micro instance.

Once I had access to the server, I've mounted the EBS volume and downloaded the small general files from the root of the data set. Then I've compressed the data from 2008, as I'll use the most recent data for the project that has data for a complete year (I discovered this after downloading 2009 data and realize it has only data until July).

Until I have a better idea of what I'm going to do, I'll shut down this server, maybe I'll use it if I need to set up a database, a map server or something like that but as for now, I need to just focus on the data and see what I can do.

The 2008 dataset is a compressed **79MB** file, by the way.