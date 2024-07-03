import MapLibre, { Marker } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { GEOAPIFY_API_KEY } from "./configuration";
import { Address } from "@/lib/address";

export interface DestinationMapProps {
  /** Add an extra className to DestinationMap wrapper */
  className?: string;
  height?: number;
  width?: number;
  postLocation: Address;
  destinations: Address[];
}

export const DestinationMap: React.FunctionComponent<DestinationMapProps> = ({
  postLocation,
  destinations,
  height,
  width,
}) => {
  return (
    <div className="relative pt-8">
      <MapLibre
        style={{ width, height }}
        initialViewState={{
          latitude: postLocation.latitude,
          longitude: postLocation.longitude,
          zoom: 4,
        }}
        mapStyle={`https://maps.geoapify.com/v1/styles/osm-carto/style.json?apiKey=${GEOAPIFY_API_KEY}`}
      >
        <Marker
          longitude={postLocation.longitude}
          latitude={postLocation.latitude}
        >
          <div className="text-2xl absolute -top-6 -left-3">📍</div>
        </Marker>
        {destinations.map((destination, index) => (
          <Marker
            key={index}
            longitude={destination.longitude}
            latitude={destination.latitude}
          >
            <div className="text-2xl absolute -top-6 -right-6">📌</div>
          </Marker>
        ))}
      </MapLibre>
    </div>
  );
};
