import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { toast } from "react-toastify";

const Map = ({ readOnly, onChange, location }) => {
  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={location || [0, 0]}
        zoom={location ? 13 : 2}
        dragging={!readOnly}
        touchZoom={!readOnly}
        doubleClickZoom={!readOnly}
        scrollWheelZoom={!readOnly}
        boxZoom={!readOnly}
        keyboard={!readOnly}
        attributionControl={!readOnly}
        className="w-full h-[400px]"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <FindButtonAndMarker
          readOnly={readOnly}
          onChange={onChange}
          location={location}
        />
      </MapContainer>
    </div>
  );
};

export default Map;

function FindButtonAndMarker({ readOnly, onChange, location }) {
  const [position, setPosition] = useState(location || null);

  const map = useMapEvents({
    click(e) {
      if (!readOnly) setPosition(e.latlng);
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, 13);
    },
    locationerror(e) {
      toast.error(e.message);
    },
  });

  useEffect(() => {
    if (position && !readOnly) {
      map.setView(position, 13);
      onChange(position);
    }
  }, [position]);

  return (
    <>
      {!readOnly && (
        <button
          type="button"
          className="bg-[#C14600] font-bold cursor-pointer text-white p-2 rounded-md absolute top-2 right-2 z-[1000] hover:bg-white hover:text-[#C14600]"
          onClick={() => map.locate()}
        >
          Find My Location
        </button>
      )}

      {position && (
        <Marker
          position={position}
          draggable={!readOnly}
          eventHandlers={{
            dragend: (e) => {
              const newPos = e.target.getLatLng();
              setPosition(newPos);
              onChange(newPos);
            },
          }}
        >
          <Popup>Shipping Address</Popup>
        </Marker>
      )}
    </>
  );
}
