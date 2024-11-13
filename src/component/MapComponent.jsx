import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./MapComponent.css";
const LocationMarker = ({ setPosition }) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]); // Cập nhật vị trí với tọa độ đã click
      console.log(lat, lng);
    },
  });
  return null;
};

// Custom Marker Icon for Store (Optional)
const customIconStore = new L.Icon({
  iconUrl: "https://example.com/store-icon.png", // replace with your icon URL
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const MapComponent = () => {
  const [clickedCoords, setClickedCoords] = useState(null);
  const [route, setRoute] = useState(null);

  const handleMapClick = async (e) => {
    const { lat, lng } = e.latlng;
    setClickedCoords([lat, lng]);

    // Get the route from the clicked position to a fixed point (e.g., store or Huế)
    try {
      const client = new openrouteservice.Client({
        apiKey: "5b3ce3597851110001cf62481607a0c61799494f8d6079e5c19daa68", // Replace with your OpenRouteService API key
      });

      // Fetch directions from the store (or Huế) to the clicked location
      const response = await client.directions({
        coordinates: [
          [107.5902, 16.466], // Starting point (replace with store coordinates or Huế)
          [lng, lat], // End point (clicked location)
        ],
        profile: "driving-car",
        format: "geojson",
      });

      // Set the route to state to draw the polyline
      const routeData = response.routes[0].geometry.coordinates;
      console.log("RD", routeData);
      setRoute(routeData);
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  };

  return (
    <div className="container">
      <MapContainer
        center={[16.2554, 107.9006]} // Default center (can be Huế or a store)
        zoom={9}
        style={{ height: "400px", width: "400px" }}
        onClick={handleMapClick} // Trigger route drawing on map click
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Marker for the clicked coordinates */}
        {clickedCoords && (
          <Marker position={clickedCoords}>
            <Popup>Tọa độ đã click: {clickedCoords.join(", ")}</Popup>
          </Marker>
        )}

        {/* Marker for the store location */}
        <Marker position={[16.0471, 108.2068]} icon={customIconStore}>
          <Popup>Vị trí của cửa hàng</Popup>
        </Marker>

        {/* Draw the route (Polyline) if route exists */}
        {route && (
          <Polyline
            positions={route.map(([lng, lat]) => [lat, lng])}
            color="blue"
          />
        )}

        {/* Location marker (if you want to get the user's current position) */}
        <LocationMarker setPosition={setClickedCoords} />
        {/* Zoom to specific address or coordinates */}
        {/* <ZoomToAddress /> */}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
