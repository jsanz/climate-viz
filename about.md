---
layout: page
title: "About this site"
description: "This site is a project to visualize climate data"
group: navigation
---
{% include JB/setup %}

# Why?

This site is a small project to try to visualize a [dataset](http://aws.amazon.com/datasets/Climate/2759) about weather data. I'll use the most recent and complete year, that's **2008**. The main aim of this project is to experiment on the visualization of a big amount of data, trying to express it in a meaningful way.

I'll try to write a post on the [log](/log/) on every step on the project so you can read my advances over this two days or three of work.

# How?

The main components to build this site are:

- Created this website using [Jekyll](jekyllrb.com) static generator, started to [report](/log/) from the beginning.
- Data retrieved from [Amazon Web Services](https://aws.amazon.com/) using an EC2 virtual machine as plain text files. Check the [readme.txt](/dataset-readme.txt) file for details.
- Data processed using three simple python scripts as [iPython Notebooks](http://ipython.org/notebook.html) and leveraging several libraries: [fiona](https://github.com/Toblerity/Fiona), [shapely](http://toblerity.org/shapely/) and [psycopg2](http://pythonhosted.org//psycopg2/). Those scripts generate *shapefiles* and populate a Postgres/PostGIS database running on my workstation. The main output are two tables, one for the stations data (27.950 records) and other observations data for 2008 (3.414.183 records).
- Working on the database, an aggregation by month of all the variables is carried out, adding a void geometry field to allow a *shapefile* export later. That's important to maintain data types when uploading to CartoDB.
- Using a command line tool called [ogr2ogr](http://www.gdal.org/ogr2ogr.html), I've exported the stations that had data from 2008 and the month aggregated observations data into a pair of *shapefiles*.
- Those *shapefiles* have been uploaded to [CartoDB](http://cartodb.com) and are right now freely [available](https://xurxosanz.cartodb.com/datasets). It's just by 3MB, but they don't fit on the [free account](http://cartodb.com/pricing) (*Magellan*) so I've upgraded my account to a *John Snow* type (free for 14 days).
- On CartoDB I've set up a visualization with four layers, as explained on this [log entry](/log/2014/08/02/21-32-putting-the-data-into-cartodb/).
- Coded the visualization from the CartoDB visualization using the [D3](http://d3js.org/) library.

<div class="figure">
<img style="width:600px;border:2px solid white;background-color:#f2f2f2;" src="/imgs/diagram.png">
<p class="caption">Workflow to create this site.</p>
</div>

# Next steps

There are several things that need to be improved. My intention for these two days was to have a minimum product, something that tackles all the steps on creating a visualization site: grabbing data, analysing and transforming it, uploading to a service or repository, and finally coding a web visualization. Those stepes (even I've learnt **A LOT**) are quite near on my current expertise and tool box, but there are more challenges and with more dedication, more features to add.

- Data

  - I'd want to perform a simple ETL task to automatically retrieve and process any other year data from the EC2 instance. It's free so I don't need to switch it off. Not a high priority, though.

  - Automate all data management. This should be easy because everything is driven by some scripts, it's just a matter of putting all of them well organised and with more error control and so on. Again, not a high priority.

  - Explore the Big Data approach. I'd like to try to load all this data into an [Elastic Map Reduce](https://aws.amazon.com/elasticmapreduce/) task, but first I should move it to S3. At least, set up a local single master/slave Hadoop node. Then write the map/reduce python scripts to generate the output text files or maybe store them on SimpleDB to check how well they work afterwards on the visualization phase. Also maybe explore [HIVE](https://hive.apache.org/) possibilities to aggregate data from this huge dataset dynamically. For example, extract for one variable and region (that is, a set of stations) a complete series of data recorded.

- Visualization

  - Definitely, study [CartodbJS](http://docs.cartodb.com/cartodb-platform/cartodb-js.html) to use it properly and solve the evident problems I have now with the layers management. Instead of setting manually every map I've added to this site, I'd like to have a complete client driven visualization, where for example the user selects the variable and the months (with a complete year by default) and the data is requested for rendering to CartoDB service using some default CartoCSS rules that work with normalized data, so the styles are not dependent on the data set.

  - I'd extract some indicators to generate something like an infography with the relevant data, something appealing that could be added to the site like a travel map for different interesting facts. I'd use [OddisseyJS](http://cartodb.github.io/odyssey.js/) to generate the story and drive the user over the world, adding selected photographies and videos of those places.

  - Add another layer of regions from this [dataset](http://www.naturalearthdata.com/downloads/10m-cultural-vectors/10m-admin-1-states-provinces/) to allow regional aggregations smaller than by country. Maybe something like the typical Business Intelligence OLAP cubes approach, to drill down the data from country aggregation level down to stations from year to quarter and month levels (that's what I can upload to CartoDB) and then using SimpleDB or static JSON files stored on S3 for the maximum level of detail for one specific station.

  - With a dynamic selector for the data rendered by country, region or station (so first and second are coropleth maps and the second a point map as I've done this week end), I could render a more complex table. That table could also respond to events highlighting sections on the accompanying graphs or for example allowing the user to select the variable to render on the graphs clicking on its column header. For every variable an specific graph would be selected, sharing the same graph for several variables as I've done with temperatures on the climogram I have right now.

  - I'd develop some kind of station locator using an auto-complete text input, moving the map to that station location automatically
