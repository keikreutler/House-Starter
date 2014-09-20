L.mapbox.accessToken = 'pk.eyJ1IjoiZ2FtZXJhIiwiYSI6IjNlclVnZDAifQ.a8PjkEfE5i2aOShPawCy1A';
var map = L.mapbox.map('map', 'keikreutler.ji79a15n').
  setView([40.68988017892701, 16.524295806884766], 5);

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
    .bindPopup('Click or drag to add location');

marker.openPopup();

marker.on('dragend', function(e) {
    marker.openPopup();
});

function onLocation() {
  // First, clean the potential-HTML they've added to the value.
  var category = L.DomUtil.get('category').value;
  // Get the current draggable marker's position and GeoJSON representation
  var geojson = marker.toGeoJSON();
  geojson.properties['category'] = category;
  // geojson.properties['marker-color'] = colors[category];
  // geojson.properties['marker-symbol'] = icons[category];
  geojson.properties['name'] = L.DomUtil.get('name').value;
  geojson.properties['description'] = L.DomUtil.get('description').value;
  // And save it to Firebase
  base.push(geojson);
  // marker.closePopup();
  document.getElementById('name').value='';
  document.getElementById('category').value='0';
  document.getElementById('description').value='';
  // Reset the original marker
  marker.setLatLng([40.68988017892701, 16.524295806884766]);
};
