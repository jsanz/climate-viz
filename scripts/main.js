
var toC = function(f){return (f-32)*5/9};

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
    layers[1].setInteraction(true);
    layers[1].on('featureOver', function(e, pos, latlng, data) {
      //cartodb.log.log( data);
    });

    layers[1].on('featureClick', function(event, latlng, pos, data, layerIndex){
      cartodb.log.log( data.cartodb_id);

      var sql = new cartodb.SQL({ user: 'xurxosanz' });
      sql.execute(
        "with id as ( select station_id id from stations where cartodb_id = "
          + data.cartodb_id
          +" ) select * from observations, id where station_id=id.id order by obs_month")
        .done(function(data) {
          console.log(data.rows);

          prevTable = d3.select('#details').select('table');
          if (prevTable){
            prevTable.remove();
          }

          d3.select('#details')
            .append('table')
              .attr("class","table")
              .append('tr')
              .append('th')
                .text('Month');
          d3.select('#details table tr')
              .append('th')
                .text('Max');
          d3.select('#details table tr')
              .append('th')
                .text('Avg');
          d3.select('#details table tr')
              .append('th')
                .text('Min');
          d3.select('#details table tr')
              .append('th')
                .text('Tornados');
          tr = d3.select('#details table')
            .selectAll('tr')
            .data(data.rows)
            .enter()
            .append('tr')

          tr.append('td')
                .text(function(d){return d.obs_month;})
          tr.append('td')
                .text(function(d){return toC(d.max_tmp).toFixed(2);})
          tr.append('td')
                .text(function(d){return toC(d.tmp).toFixed(2);})
          tr.append('td')
                .text(function(d){return toC(d.min_tmp).toFixed(2);})
          tr.append('td')
                .text(function(d){return d.tornado_co.toFixed(2);})
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
  })
  .error(function(err) {
    console.log(err);
  });
}

window.onload = main;