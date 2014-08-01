---
layout: post
title: "Processing all the stations"
description: ""
category:
tags: [data]
date: '2014-08-02 00:24'
---
{% include JB/setup %}

A python script has been developed to process the ``ish-history.csv`` using Fiona, Shapely and native CSV library to load the file and generate a *shapefile* of stations. Some of them doesn't have codes or elevation data but all of them are geolocated on a valid position. On the next simple map, the positions of all valid stations is depicted.

<div class="figure">
<img src="/imgs/all-stations.png"/>
<p class="caption">Map of all positions</p>
</div>

A second scripts loads the contents of the ``2008`` folder and filters the contents of the previous shapefile looking for every feature of the shapefile on the combined id of ``usaf`` and ``wban`` codes. Notice the lack of many data on Russia, the Antartica region and many ocean buoys.

<div class="figure">
<img src="/imgs/2008-stations.png"/>
<p class="caption">Map of 2008 positions</p>
</div>

Tomorrow I'll start joining the actual observations data with those locations and see how they *behave*.