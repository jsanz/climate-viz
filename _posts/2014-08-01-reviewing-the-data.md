---
layout: post
title: "Reviewing the data"
description: ""
category:
tags: [data]
date: '2014-08-01 22:57'
---
{% include JB/setup %}

After uncompressing the 2008 folder I see that I have:

- Country codes text file (fixed width): ``country-list.txt``
- Database of stations as a CSV, TXT and XLS: ``ish-history.{csv,txt,xls}``
- A folder with ``2008`` observation files

On the ``2008`` folder there are **11.785** files with a total of **3.414.183** records (headers non counted). Every file has an structure of fixed fields like this

	STN--- WBAN   YEARMODA    TEMP       DEWP      SLP        STP       VISIB      WDSP     MXSPD   GUST    MAX     MIN   PRCP   SNDP   FRSHTT
	010010 99999  20080101    36.0 24    32.7 24  1004.7 24  1003.5 24    6.2  6   23.2 24   29.1  999.9    36.9    33.4   0.11G 999.9  010000
	010010 99999  20080102    33.3 23    29.3 23  1007.6 23  1006.4 23    5.7  6    9.6 23   23.3  999.9    35.8*   29.1*  0.06G 999.9  010000
	010010 99999  20080103    35.0 24    32.8 24  1017.5 24  1016.4 24    1.6  6   12.2 24   19.4  999.9    36.7    28.8   0.34G 999.9  110000

So the schema for this data is rather simple:

	                      +----------------+         +----------------------+
	+-------------+       | Stations       |         | Data                 |
	| Countries   |       +----------------+         +----------------------+
	+-------------+       | id             | <-------+ station              |
	| id          | <-----+ country_id     |         | year                 |
	| name        |       | name           |         | month-day            |
	|             |       | lat            |         | temp                 |
	+-------------+       | lon            |         | dewpoint             |
	                      | elevation      |         | msl_pressure         |
	                      |                |         | mst_pressure         |
	                      +----------------+         | visibility           |
	                                                 | wind_speed           |
	                                                 | max_sust_windspeed   |
	                                                 | max_gust_wind_speed  |
	                                                 | max_temp             |
	                                                 | min_temp             |
	                                                 | precipitation        |
	                                                 | snow_depth           |
	                                                 |                      |
	                                                 +----------------------+

For all the data measures there is an accompanying flag that specifies different things like the number of measures during the day, the type of measurement and so on.

As for now, I think the first step is to watch the distribution of the stations with data. After loading the station database into an structured data, I'll filter this with the stations that actually have data for 2008.