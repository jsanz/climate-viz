---
layout: post
title: "First diagrams and interactions"
description: ""
tags: web,design
date: 2014-08-03 16:04
---
{% include JB/setup %}

After some attempts I've discarded using Crossfilter and dc. It's a pity because they seem quite powerful but I don't have time to invest on learning them. I'll use plain d3 code that I already have some knowledge of. Nothing really fancy or powerful but at least it works.

One big change is I've discarded tornado data as it's very sparse (but interesting!) and used rain days count, that offers with temperatures a more good vision of the most important features of weather. So I planned to drawo at least the old school [climograms](https://en.wikipedia.org/wiki/Climograph). I hope to have time to plot more data I have at hand like days of thunder, wind, gust, etc.

Anyway, I've splitted the details section in two columns, one for the table and other for the graph(s). The D3 code for the graphs in quite easy and similar to other test I've done [last week](http://bl.ocks.org/jsanz/779f9b9954b92461fa50) so nothing unexpected, even doing graphs this way is quite laborious. At least I have a complete control over any characteristic of the graph, for the good and the bad.

The visualization works well right now from 800x800 window size, so it should work on any modern tablet.


<div class="figure">
<img style="border:2px solid white;" src="/imgs/web-histogram-1.png">
<p class="caption">First histograms</p>
</div>

I've added also a little helper for the webpage using a non-intrusive library called [ChardinJS](http://heelhook.github.io/chardin.js/), that way users can press the *help?* text up on the right and get a dark overlay with instructions about how to use the map.


<div class="figure">
<img style="border:2px solid white;" src="/imgs/web-help.png">
<p class="caption">Adding a little help</p>
</div>


Things unresolved or just I don't like at this moment

- I don't know how to make the layers not visible by default. This works in other ways to access the CartoDB visualization but it doesn't when it is loaded by the JavaScript Library. I know well how to do this with OpenLayers but Leaflet is quite unknown to me.

- Graph is not responsive, widths and height are passed in absolute units to D3

- The graph needs labels

- The table needs more love in general (row colors, alignments, etc)

- More data to graph



I'll try to fix the responsive thing, as I find important to have this working well on tablets.