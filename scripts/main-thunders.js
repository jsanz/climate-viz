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
      tile_style: '/** torque visualization */ Map { -torque-frame-count:512; -torque-animation-duration:30; -torque-time-attribute:"obs_date"; -torque-aggregation-function:"count(cartodb_id)"; -torque-resolution:1; -torque-data-aggregation:linear; } #thunders{ comp-op: multiply; marker-fill-opacity: 0.9; marker-line-color: #FFF; marker-line-width: 1; marker-line-opacity: 1; marker-type: ellipse; marker-width: 6; marker-fill: #5CA2D1; } #thunders[frame-offset=1] { marker-width:8; marker-fill-opacity:0.45; }'
      }
  }).done(function(layer) {
    map.addLayer(layer);
  });
}

// you could use $(window).load(main);
window.onload = main;

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;

function onYouTubeIframeAPIReady() {
  var player;
  player = new YT.Player('player', {
    width: 100,
    height: 80,
    videoId: 'XYFdldfYEJk',
    playerVars: { 'autoplay': 1 },
    events: {
    'onReady': onPlayerReady
  }
  });
}



// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.setVolume(100);
  event.target.playVideo();
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