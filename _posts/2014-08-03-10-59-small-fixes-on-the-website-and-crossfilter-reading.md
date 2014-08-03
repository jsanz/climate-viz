---
layout: post
title: "Small fixes on the website and crossfilter reading"
description: ""
tags: web
date: 2014-08-03 10:59
---
{% include JB/setup %}

This morning apart from more OSGeo Election work (voting are going well), I've fixed some small things regarding the Jekyll templates I'm using to produce the site. Also simplified the index page reordering the code to a new JavaScript file and moving all the externall calls to an outer template so the index page at this moment only has the divs for the map and the details.

With more time, I'd set up something more professional with Grunt, Bower, etc to generate a site more performant on the browser but as I'm out of time, it will be as it is.

Apart from that, I've started on reading about [Crossfilter](https://square.github.io/crossfilter/), very handy library for the typical data groupings and filters. It's great to discover it at this moment (even paying the prize of learning a new tool) because it fits perfectlly with what I'm doing. On top of Crossfilter and D3 there is a library to join both features with some graphics capabilities. I'll try it, and let's see if it pays off, I imagine it will force my graphics but will avoid some low level development that D3 enforces.

Let's go.