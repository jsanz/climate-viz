---
layout: post
title: "Putting the data into CartoDB"
description: ""
tags: [design, data]
date: 2014-08-02 21:32
---
{% include JB/setup %}

Woah, long afternoon. I've struggled with CartoDB as never used it so hard but I have something.

Firstly, what I have at CartoDB are two tables:

- The table [stations](https://xurxosanz.cartodb.com/tables/stations/public) with the stations that appeared on 2008 records with the combined id for USAF and WBAN.
- The table [observations](https://xurxosanz.cartodb.com/tables/observations/public) with data aggregated by month with all the measures.

So the task is to join both tables and produce different year aggregated maps. But tey have to be representative, any station with less than 300 samples per variable has to be discarded. That measure is not perfect because I haven't added a counter for every variable but it will suffice.

I've placed both tables as public so anyone can [access and play](https://xurxosanz.cartodb.com/datasets) with them. Well the observations dataset is not going to be too much there as I will retire it to go down to the free account type.

<div class="figure">
<img style="width:500px;" src="/imgs/cartodb-dashboard.png">
<p class="caption"><a href="https://xurxosanz.cartodb.com/datasets">Datasets</a> on CartoDB</p>
</div>

Once the data is loaded properly, next phase is creating the visualizations. This phase is still a mix of data and design as the data to be rendered still needs to be defined. At this moment I've set up four layers for the visualization.

1. **Maximum temperature** registered
2. **Minimum temperature** registered
3. **Maximum temperature range**, that is the difference between the maximum and the minimum temperature over the whole year.
4. Number of **tornados** registered.

The data are more or less all very similar to this query:

<div class="figure">
<img style="" src="/imgs/cartodb-sql.png">
<p class="caption">SQL on CartoDB</p>
</div>

On this query first the  observations data is aggregated to obtain the number of samples and the maximum temperature, afterwards a ``select`` prepares the data to be presented, joining the data with the stations geometries, filtering those without enough samples and finallly ordering the data so the higher stations are rendered later.

Then some visualization decisions are made, selecting to start one of the palettes offered (all well known [Cindy Brewer](http://www.personal.psu.edu/cab38/) work). Then the other minimal parameters are set up on the wizard to finally fine tune the work on the [CartoCSS](https://www.mapbox.com/tilemill/docs/manual/carto/) editor.

<div class="figure">
<img style="" src="/imgs/cartodb-wizard.png">
<p class="caption">CartoDB symbology wizard</p>
</div>

<div class="figure">
<img style="" src="/imgs/cartodb-carto.png">
<p class="caption">CartoCSS editor</p>
</div>


Finally the infowindow both for hover and click events is designed, using defaults at this moment.


<div class="figure">
<img style="" src="/imgs/cartodb-info.png">
<p class="caption">CartoDB infowindows</p>
</div>
