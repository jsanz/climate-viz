---
layout: post
title: "Filling the database with observation data"
description: ""
tags: data
date: 2014-08-02 16:45
---
{% include JB/setup %}

Time to write a post while the database is busy. Basically I've set up a table on the db with the proper fields for weather data, using a combined ``station_id`` that is created from both identifiers on the text files, USAF and the WBAN. Then I've created a class in Python to map all the data coming from the files and a small piece of code to process all that data into the database.

	# [... set up imports, folders and helper class ...]
	conn = psycopg2.connect("dbname=climate user=myUser password=myPass")
	cur = conn.cursor()
	for op_file in os.listdir(obs_dir): #walk the directory
	    with open(os.path.join(obs_dir,op_file)) as f: #open the file
	        for line in f: #walk the file
	                if len(line)>0:
	                    try:
	                        o = observation(line) #instantiate the helper class
	                        cur.execute(o.getSQL()) #get the insert SQL
	                        conn.commit()
	                    except Exception, an_error:
	                        print an_error
	                        conn.rollback()
	                        pass
	cur.close()
	conn.close()

Then, once the data is stored on the database we can create an aggregation by month, something more approachable for the map I want to build.


	with data as (select * from observations)
	select
		o.station_id,
		extract(month from obs_date) m,
		count(*) c ,
		avg(tmp) tmp,
		avg(dewp) dewp,
		avg(sea_pr) sea_pr,
		avg(st_pr) st_pr,
		avg(vis) vis,
		avg(wind) wind,
		max(max_wind) max_wind,
		max(max_gust) max_gust,
		max(max_tmp) max_tmp,
		min(min_tmp) min_tmp,
		sum(precip) precip,
		avg(snow_depth) snow_depth,
		sum(fog::int) fog_count,
		sum(rain::int) rain_count,
		sum(snow::int) snow_count,
		sum(hail::int) hail_count,
		sum(thunder::int) thunder_count,
		sum(tornado::int) tornado_count
	into temp stations_month_tmp
	from data o
	group by o.station_id, m;


Depending on the variable I'll use ``avg``, ``max``, ``min`` or ``sum`` to get the appropriate data for the statistics. This gives a 12 times 11000 rows table, that's still more than required for a free account but well, at least I have an API to query for month level.

But I want also all the raw data by station so I'll generate small files to be requested by the visuazilation later if I want the details of one particular station. That is, I'll translate the fixed width files into CSVs that I'll be able to request on demand directly from the web server, without any service involved.

To summarize I want:

- Stations and monthly aggregated data on CartoDB for dinamic queries and map visualizations.
- Raw observations on a web server for station details, out of the map.


<script>hljs.initHighlightingOnLoad();</script>