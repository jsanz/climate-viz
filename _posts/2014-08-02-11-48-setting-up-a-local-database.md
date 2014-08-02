---
layout: post
title: "Setting up a local database"
description: ""
tags: data
date: 2014-08-02 11:48
---
{% include JB/setup %}

I have to handle like 3 million records to join with a stations table so I decided to setup a local database before doing anything on the web so I can explore my data in a more convenient way to do aggregations and so on.

I've installed Postgres+PostGIS and created a ``climate`` database. Then I've imported the ``stations`` and the ``stations_2008`` shapefiles as well as the [Admin 1 - States, provinces](http://www.naturalearthdata.com/downloads/10m-cultural-vectors/10m-admin-1-states-provinces/) shapefile from [Natural Earth](http://www.naturalearthdata.com) so I can do a region or country aggregation if needed.

To import the Natural Earth I've executed:

 	$ ogr2ogr -f PostgreSQL PG:"user=myUser password=myPassword dbname=climate" \
 		ne_10m_admin_1_states_provinces_resaved.shp -overwrite \
 		-nlt MULTIPOLYGON -nln provinces -lco GEOMETRY_NAME=geom


So now, I have my regions and stations on my database and I can start doing basic things like this to count the number of stations by country on the geodata (not the alphanumeric data provided by the dataset).

	select
		pr.admin as country, count(*) c
	from stations st join provinces pr
		on ST_Within(st.geom,pr.geom)
	group by pr.admin
	order by c desc


Or count the number of stations by region on a given country:

	select
		sp.name as region, count(*) c
	from stations st join provinces sp
		on ST_Within(st.geom,sp.geom)
	where st.country = 'SP'
	group by sp.name
	order by c desc;

I've also set up a class in Python that parses a line of the observation data, so as for now, I'm ready to create the observation table and parse all the observations to have everything on my database.


<script>hljs.initHighlightingOnLoad();</script>