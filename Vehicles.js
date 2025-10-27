cons vehicleMarkers=[];
const airplaneMarkers=[];
const vehicles=[{lat:40.730610,lng:-73.935242},{lat:48.8566,lng:2.3522},{lat:51.5074,lng:-0.1278}];
const airplanes=[{lat:34.0522,lng:-118.2437},{lat:35.6895,lng:139.6917},{lat:55.7558,lng:37.6173}];

vehicles.forEach(v=>vehicleMarkers.push(L.circleMarker([v.lat,v.lng],{color:'blue',radius:6}).addTo(map)));
airplanes.forEach(a=>airplaneMarkers.push(L.circleMarker([a.lat,a.lng],{color:'red',radius:6}).addTo(map)));

setInterval(()=>{
    vehicleMarkers.forEach(m=>m.setLatLng([m.getLatLng().lat+(Math.random()-0.5)/50,m.getLatLng().lng+(Math.random()-0.5)/50]));
    airplaneMarkers.forEach(m=>m.setLatLng([m.getLatLng().lat+(Math.random()-0.3)/20,m.getLatLng().lng+(Math.random()-0.3)/20]));
},2000);