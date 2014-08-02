---
layout: post
title: "Improving the web site"
description: ""
tags: [web]
date: 2014-08-02 09:16
---
{% include JB/setup %}


After some [OSGeo Elections](http://wiki.osgeo.org/wiki/Election_2014) work and not too much sleeping (summer here is so hot it's hard to sleep after 7am or so) I I've come back to the project. First thing this morning I've done is to try [Darkly](http://bootswatch.com/darkly/) a different [Bootswatch](http://bootswatch.com) theme, I like *flatly* styles, let's see how this work later. Depending on the visualization technique I'll download not just the minimized CSS file for this dark theme but also the less variables so I can use them as a base palette for other interaction elements.

I've decided to work on this web as I do with my own website. After every git commit, I'll upload an static version of the site to a S3 Amazon bucket. This way I keep updated a public version available to anyone that knows the link. At this point I'm not sharing yet it but I'll do it soon.

I'm using to produce this site [Jekyll](http://jekyllrb.com/) a nice web site generator written in Ruby that I've been using for my website for a couple of years. It's easy to use and removes me the fuss of working with a more complex system like a CMS.