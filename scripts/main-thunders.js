function main() {
  var map = new L.Map('map', {
    zoomControl: false,
    center: [0, 0],
    zoom: 2
  });

  L.tileLayer('http://cartocdn_{s}.global.ssl.fastly.net/base-midnight/{z}/{x}/{y}.png', {
    attribution: 'CartoDB'
  }).addTo(map);

  cartodb.createLayer(map, {
    type: "torque",
    order: 1,
    options: {
      query: "",
      table_name: "thunders",
      user_name: "xurxosanz",
      tile_style: '/** torque visualization */ Map { -torque-frame-count:512; -torque-animation-duration:30; -torque-time-attribute:"obs_date"; -torque-aggregation-function:"count(cartodb_id)"; -torque-resolution:1; -torque-data-aggregation:linear; } #thunders{ comp-op: multiply; marker-fill-opacity: 0.6; marker-line-color: #FFCC00; marker-line-width: 1; marker-line-opacity: 0.6; marker-type: ellipse; marker-width: 5.5; marker-fill: #ffe800; } #thunders[frame-offset=1] { marker-width:7.5; marker-fill-opacity:0.3; } #thunders[frame-offset=2] { marker-width:9.5; marker-fill-opacity:0.15; }'
      }
  }).done(function(layer) {
    map.addLayer(layer);
  });
}


// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
var videos = [
    {id:'K-Op1Mng4oY',sec:10}, // bad piper
    {id:'e4Ao-iNPPUc',sec:18}, // Steve'n'Seagulls banjo
    {id:'XYFdldfYEJk',sec:0}, // Oficial video
    {id:'uT3SBzmDxGk',sec:90}, // cello cover
  ];

var myVideo = videos[Math.floor(Math.random()*videos.length)];

function onYouTubeIframeAPIReady() {

  var player;
  player = new YT.Player('player', {
    width: 100,
    height: 80,
    videoId:myVideo.id,
    playerVars: { 'autoplay': 1 },
    events: {
    'onReady': onPlayerReady
  }
  });
}



// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.setVolume(100);
  event.target.seekTo(myVideo.sec);
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
}
}
function stopVideo() {
  player.stopVideo();
}

// you could use $(window).load(main);
window.onload = main;


/*
 * Where the action begins
 */
d3.csv("scripts/thunders_by_month_region.csv", function(data){

  // Prepare the data
  var parseDate = d3.time.format("%m-%Y").parse;
  data.forEach(function(d) {
    d.date = parseDate(d.m+'-2008');
    d.count = +d.count;
  });


  var margin = {top: 30, right: 100, bottom: 30, left: 80};

  var width = $('.graph').width() - margin.left - margin.right,
      aspect = 2/5,
      height = (width * aspect) - margin.top - margin.bottom;

  var x = d3.time.scale().range([0, width]);
  var y = d3.scale.linear().range([height, 0]);

  var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(5);

  var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(5);

  var valueline = d3.svg.line()
    .x(function(d) { return x(d.date); })

  var svg = d3.select('.graph')
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

  // Scale the range of the data
  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain(d3.extent(data, function(d) { return d.count; }));

  continents = [
  'Africa',
  'Asia',
  'Europe',
  'North America',
  'Oceania',
  'South America',
  ];
  for (i in continents){

    continent = continents[i];
    dataContinent = data.filter(function(d){return d.continent == continent});

    svg.append("path")
      .attr("class", "line continent-"+i)
      .attr("d", valueline
          .interpolate("basis")
          .y(function(d) { return y(d.count); })(dataContinent));
      svg.append("g");

    svg.append("text")
      .attr("class","continent-"+i)
      .attr("transform", "translate("+(width*.8)+","+(height*.4 - i*20)+")")
      .attr("dy", ".35em")
      .attr("text-anchor", "start")
      .text(continent);
  }

  svg.append("g")
    // Add the X Axis
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

  // Labels
  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Number of thunders");

  // Labels
  svg.append("text")
    .attr("x", (width*.25))
    .attr("y", height*.10)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Absolute data,");
  svg.append("text")
    .attr("x", (width*.25))
    .attr("y", height*.17)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("without any normalization" );


});

