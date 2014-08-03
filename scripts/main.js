
var toC = function(f){return (f-32)*5/9};
var ROWS, MAP, VIS, LAYERG;
var monthFormat = d3.time.format("%B");

/* Graph for the year */
var margin = {top: 30, right: 50, bottom: 30, left: 50};

var width = $(".graph").width() - margin.left - margin.right,
    aspect = 1/2,
    height = (width * aspect) - margin.top - margin.bottom;

var showHelp = function(){
  $('.cartodb-layer-selector-box')
    .attr('data-intro','Use the layer selector to switch on and of available layers')
    .attr('data-position','left');
  $('.cartodb-zoom')
    .attr('data-intro','Navigate over the cartography using your mouse wheel or these buttons')
    .attr('data-position','right');
  $('.cartodb-searchbox')
    .attr('data-intro','Search for places (using Nokia geocoding)')
    .attr('data-position','bottom');

  $('body').chardinJs('start');
}

var capitalize = function(word){
  var words = word.trim().split(" ");
  if (words.length>1){
    return capitalize(words[0]) + " " + capitalize(words.slice(1).join(" "));
  } else{
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }
}

var loadDCGraph = function(data){
  var ndx = crossfilter(data);

  var dateDim = ndx.dimension(function(d) {return d.date;});
  function reduceAddAvg(attr) {
    return function(p,v) {
      ++p.count
      p.sum += v[attr];
      p.avg = p.sum/p.count;
      return p;
    };
  }
  function reduceRemoveAvg(attr) {
    return function(p,v) {
      --p.count
      p.sum -= v[attr];
      p.avg = p.sum/p.count;
      return p;
    };
  }
  function reduceInitAvg() {
    return {count:0, sum:0, avg:0};
  }
  var hits = dateDim.group().reduce(reduceAddAvg('max_tmp'), reduceRemoveAvg('max_tmp'), reduceInitAvg);

  var minDate = dateDim.bottom(1)[0].date;
  var maxDate = dateDim.top(1)[0].date;

  var hitslineChart  = dc.lineChart("#details");

  hitslineChart
  .width(500).height(200)
  .dimension(dateDim)
  .group(hits)
  .x(d3.time.scale().domain([minDate,maxDate]));

  dc.renderAll();
}

var loadD3Table = function(data){
  d3.select('#details .data').select('table').remove();

  d3.select('#details .data h4')
    .text(capitalize(data[0].name));

  // Draw the table
  d3.select('#details .data')
    .append('table')
      .attr("class","table")
      .append('tr')
      .append('th')
        .text('Month');
  d3.select('#details table tr')
      .append('th')
        .attr("style","color:#ef8a62")
        .text('Max (C)');
  d3.select('#details table tr')
      .append('th')
        .attr("style","color:#f7f7f7")
        .text('Avg (C)');
  d3.select('#details table tr')
      .append('th')
        .attr("style","color:#67a9cf")
        .text('Min (C)');
  d3.select('#details table tr')
      .append('th')
        .text('Rain (count)');
  d3.select('#details table tr')
      .append('th')
        .text('Tornados (count)');
  d3.select('#details table tr')
      .append('th')
        .text('Thunders (count)');
  tr = d3.select('#details table')
    .selectAll('tr.tablerow')
    .data(data)
    .enter()
    .append('tr')
    .attr("class",function(d,i){
        return "tablerow " + ( i%2==0 ? "odd" : "even");
    });

  tr.append('td')
        .text(function(d){return monthFormat(new Date(2008,d.obs_month,1));});
  tr.append('td')
        .text(function(d){return d.max_tmp.toFixed(1);});
  tr.append('td')
        .text(function(d){return d.tmp.toFixed(1);});
  tr.append('td')
        .text(function(d){return d.min_tmp.toFixed(1);});
  tr.append('td')
        .text(function(d){return d.rain_count;});
  tr.append('td')
        .text(function(d){return d.tornado_co;});
  tr.append('td')
        .text(function(d){return d.thunder_co;});
};


var loadD3Graph = function(data){
  d3.select('#details .graph').select('svg').remove();

  var x = d3.time.scale().range([0, width]);
  var y = d3.scale.linear().range([height, 0]);
  var yRain = d3.scale.linear().range([height, 0]);

  var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(5);

  var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(5);

  var yAxisRain = d3.svg.axis().scale(yRain)
    .orient("right").ticks(5);

  var area = d3.svg.area()
    .interpolate("step-before")
    .x(function(d) { return x(d.date); })
    .y0(height)
    .y1(function(d) { return yRain(d.rain_count); });

  var valueline = d3.svg.line()
    .x(function(d) { return x(d.date); })

  var svg = d3.select('#details .graph')
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

  // Scale the range of the data
  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain([
    d3.min(data,function(d){return d3.min([d.max_tmp,d.tmp,d.min_tmp])}) -2,
    d3.max(data,function(d){return d3.max([d.max_tmp,d.tmp,d.min_tmp])}) +2
    ]);
  yRain.domain([0,d3.max(data,function(d){return d.rain_count;})]);

  svg.append("path")
    .datum(data)
    .attr("class", "area")
    .attr("d", area);

  svg.append("path")
    .attr("class", "line rain")
    .attr("d", valueline
        .interpolate("step-before")
        .y(function(d) { return yRain(d.rain_count); })(data));
    svg.append("g")
    // Add the X Axis
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  svg.append("path")
    .attr("class", "line min_tmp")
    .attr("d", valueline
        .interpolate("basis")
        .y(function(d) { return y(d.min_tmp); })(data));

  svg.append("path")
    .attr("class", "line avg_tmp")
    .attr("d", valueline
        .interpolate("basis")
        .y(function(d) { return y(d.tmp); })(data));

  svg.append("path")
    .attr("class", "line max_tmp")
    .attr("d", valueline
        .interpolate("basis")
        .y(function(d) { return y(d.max_tmp); })(data));

  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

  svg.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + width + ",0)")
    .call(yAxisRain);

  /* Labels */
  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Temperature (Cº)");

  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 + width + margin.right / 2)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Number of rainy days");
}

function main() {
  cartodb.createVis('map', 'http://xurxosanz.cartodb.com/api/v2/viz/bcdcf856-1a6c-11e4-9aa6-0e230854a1cb/viz.json', {
      shareable: false,
      title: false,
      description: false,
      search: true,
      tiles_loader: true,
      center_lat: 0,
      center_lon: 0,
      zoom: 2,
      layer_selector:true,
      cartodb_logo: true,
      legends: false

  })
  .done(function(vis, layers) {


    // layer 0 is the base layer, layer 1 is cartodb layer
    // setInteraction is disabled by default
    LAYERG = layers[1];

    layers[1].setInteraction(true);
    layers[1].on('featureOver', function(e, pos, latlng, data) {
      //cartodb.log.log( data);
    });

    layers[1].on('featureClick', function(event, latlng, pos, data, layerIndex){
      cartodb.log.log( data.cartodb_id);

      var sql = new cartodb.SQL({ user: 'xurxosanz' });
      sql.execute(
        "with stations as ( select station_id id, name from stations where cartodb_id = "
          + data.cartodb_id
          +" ) select stations.name, "
          + "o.obs_month, o.max_tmp, o.min_tmp, o.tmp, o.rain_count, o.tornado_co, "
          + "o.thunder_co "
          + "from observations o, stations where station_id=stations.id order by o.obs_month")
        .done(function(data) {
            var parseDate = d3.time.format("%m/%Y").parse;
            //fix the data for the viz
            data.rows.forEach(function(d) {
              d.date = parseDate(d.obs_month+"/2008");
              d.max_tmp = toC(d.max_tmp);
              d.min_tmp = toC(d.min_tmp);
              d.tmp = toC(d.tmp);
            });

          rows = data.rows;

          loadD3Table(data.rows);
          loadD3Graph(data.rows);
          //loadDCGraph(data.rows);

        })
        .error(function(errors) {
          // errors contains a list of errors
          console.log("errors:" + errors);
        })

      /*

      */
    });

    // you can get the native map to work with it
    // depending if you use google maps or leaflet
    map = vis.getNativeMap();

    // now, perform any operations you need
    // map.setZoom(3)
    // map.setCenter(new google.maps.Latlng(...))

    $('#showHelp').show();

    MAP = map;
    VIS = vis;

    $(window).resize(function() {
      var width = $(".graph").width();
      var svg  = $(".graph svg")
      svg.attr("width", width);
      svg.attr("height", width * aspect);
    });
  })
  .error(function(err) {
    console.log(err);
  });
}

window.onload = main;