import React, { useRef, useEffect, useState } from "react";

import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken =
  "pk.eyJ1IjoibmVsMTUiLCJhIjoiY2t0MXl5cDJoMGZhaDMwcjIwY3g2b2lyciJ9.9bOVK_BAblBO-j4E53qDRQ";

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(2.0854041);
  const [lat, setLat] = useState(49.0433946);
  const [zoom, setZoom] = useState(15);

//   const marker1 = new mapboxgl.Marker()
//   .setLngLat([lng, lat])
//   .addTo(map);



  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
  });

 
  return <div ref={mapContainer} className="map-container" />;
};

export default Map;
