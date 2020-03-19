var cases = 0;
var deaths = 0;
var recovered = 0;


fetch('https://coronavirus-tracker-api.herokuapp.com/v2/locations')
.then((res)=>res.json()) 
.then((json)=>{


    mapboxgl.accessToken = 'pk.eyJ1Ijoia2FydGhlZWsxMjMiLCJhIjoiY2s3eXAxdGdsMDhjZjNncGl2N2RnaG5jaCJ9.c8QBi_WfH8lrDaNXug6OdA';
    var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    zoom: 1,
    center: [0,0]
    });
    var geojson = json
geojson.locations.forEach(function(marker) {
  cases +=  marker.latest.confirmed
  deaths += marker.latest.deaths
  recovered += marker.latest.recovered

// create a HTML element for each feature
var el = document.createElement('div');
el.className = 'marker';
    var co = [marker.coordinates.longitude,marker.coordinates.latitude]
    if(marker.province===''){
      var html = `
      <h3>${marker.country}</h3>
      <p>cases:${marker.latest.confirmed}</p>
      <p>recovered:${marker.latest.recovered}</p>
      <p>deaths:${marker.latest.deaths}</p>
      `  
    }
    else{
        var html = `
        <h3>${marker.country}(${marker.province})</h3>
        <p>cases:${marker.latest.confirmed}</p>
        <p>recovered:${marker.latest.recovered}</p>
        <p>deaths:${marker.latest.deaths}</p>
        ` 
    }
// make a marker for each feature and add to the map
new mapboxgl.Marker(el)
  .setLngLat(co)
  new mapboxgl.Marker(el)
  .setLngLat(co)
  .setPopup(new mapboxgl.Popup({ offset: 25 })
    .setHTML(html))
  .addTo(map);
});

document.querySelector('#result').innerHTML = `<h1>Cases:${cases}</h1><h1>Deaths:${deaths}</h1><h1>Recovered:${recovered}</h1>`
});