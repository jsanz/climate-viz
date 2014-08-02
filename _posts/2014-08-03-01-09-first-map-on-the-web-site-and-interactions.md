---
layout: post
title: "First map on the web site and interactions"
description: ""
tags: []
date: 2014-08-03 01:09
---
{% include JB/setup %}

It's been a long day but I have the foundation to work tomorrow on the visualization the whole day.

As reported on the previous post, I've created a [visualization](http://cdb.io/1qEvMhz) on CartoDB for four layers. Next step has been to place this visualization into the front page of the web site. It's been impossiblo to me to deactivate some layers by default. Tomorrow I'll check again and will ask on their support, let's see if they answer quick (on Sunday and August I'd be surprised of course).

Anyway, it's Leaflet and I've never worked with that framework so I don't plan to spend too much time with it.

But I've accomplished the main task to start the visualizations, that is, after a click on any feature on the map, and using the SQL API of CartoDB, I've been able to retreive all the observations data related with that weather station an using a very simple D3 Code, create a table with all the entries of the database aggregated by month. This way tomorrow I'll be ready to generate some graphs with this data and maybe add a couple of variables.

<div class="figure">
<img style="border:2px solid white;" src="/imgs/d3-table.png">
<p class="caption">First data driven table from CartoDB data</p>
</div>
