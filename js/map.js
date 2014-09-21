L.mapbox.accessToken = 'pk.eyJ1IjoiZ2FtZXJhIiwiYSI6IjNlclVnZDAifQ.a8PjkEfE5i2aOShPawCy1A';
var map = L.mapbox.map('map', 'keikreutler.ji79a15n', {
			// zoomControl: false
		}).setView([40.68988017892701, 16.524295806884766], 4);

map.scrollWheelZoom.disable();

var base = new Firebase('https://house-starter.firebaseio.com/');
var marker = L.marker([40.68988017892701, 16.524295806884766], {
  draggable: true,
  icon: L.mapbox.marker.icon({
    'marker-color': '#FFF',
    'marker-symbol': 'star',
    'opacity': 0.8,
  })
  // Add a form to that marker that lets them specify a message and click Add
  // to add the data.
})
.addTo(map)
.bindPopup('Click or drag marker to choose the location.')

var colors = ['#758AC4', '#997453', '#CCB850', '#E5AE7D'];

marker.openPopup();

marker.on('dragend', function(e) {
  marker.openPopup();
});

map.on('click', function(e) {
	marker.setLatLng([e.latlng.lat, e.latlng.lng])
	.openPopup();
});

// Add submitted location to database
function onLocation() {
  // First, clean the potential-HTML they've added to the value.
  var category = L.DomUtil.get('category').value;
  // Get the current draggable marker's position and GeoJSON representation
  var geojson = marker.toGeoJSON();
  geojson.properties['category'] = category;
  geojson.properties['marker-color'] = colors[category];
  geojson.properties['name'] = L.DomUtil.get('name').value;
  geojson.properties['description'] = L.DomUtil.get('description').value;
  geojson.properties['twitter'] = L.DomUtil.get('twitter').value;
  // And save it to Firebase
  base.push(geojson);
  // marker.closePopup();
  document.getElementById('name').value='';
  document.getElementById('category').value='0';
  document.getElementById('description').value='';
  // Reset the original marker
	// map.setView(geojson.geometry.coordinates[0], geojson.geometry.coordinates[1]);
  marker.setLatLng([40.68988017892701, 16.524295806884766]);
};

// Display all geojson points in database
base.on('value', function(snapshot) {
  features = [];
  for (var k in snapshot.val()) {
    features.push(snapshot.val()[k]);
  }
  baseLayer = L.mapbox.featureLayer(features);
  // And for each new marker, add a featureLayer
  baseLayer.eachLayer(function(l) {
    // Which positions markers below the marker you drag, so that
    // they don't overlap in the z-index
    l.setZIndexOffset(-500);
    // And each marker should have a label with its title.
    var geojson = l.toGeoJSON();
    var handle = geojson.properties['twitter'];
    l.bindPopup('<p class="marker-title">'+ geojson.properties['name'] +'</p><p class="marker-description"> '+ geojson.properties.description +'</p><p><a href="https://twitter.com/' + handle + '" target="_blank">@'+ handle +'</a>');
  })
  .addTo(map);
});
