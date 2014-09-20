L.mapbox.accessToken = 'pk.eyJ1IjoiZ2FtZXJhIiwiYSI6IjNlclVnZDAifQ.a8PjkEfE5i2aOShPawCy1A';
var map = L.mapbox.map('map', 'keikreutler.ji79a15n');

var marker = L.marker([51.5, -0.09]).addTo(map);

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
    .bindPopup('Click or drag to add location')
    .openPopup()
    .addTo(map);
