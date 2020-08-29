// TO MAKE THE MAP APPEAR YOU MUST
// ADD YOUR ACCESS TOKEN FROM
// https://account.mapbox.com
mapboxgl.accessToken = 'pk.eyJ1IjoiYWlkYXNwIiwiYSI6ImNqbXluems2ZTEweWoza28xOTg5aXB6YmIifQ.wXudA2k_3vuvGPe_x7-bbQ';
const map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
center: [10, 50],
zoom: 4 // starting zoom
});

(async () => {
  const res = await fetch('/coverage.json');
  const data = await res.json()

  data.forEach(({ lat, lon, name, icao }) => {

    new mapboxgl.Marker()
    .setLngLat([lon, lat])
    .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
    .setHTML('<h3>' + name + '</h3><a target="_blank" href="/api/airports/' + icao + '">' + icao + '</a>'))
    .addTo(map);
  })
})();