import Globe, { GlobeMethods } from "react-globe.gl";
import { Address } from "@/lib/address";
import globeImg from "@/assets/three-globe/earth-day.jpg";
import { useMemo, useRef } from "react";

export interface DestinationGlobeProps {
  /** Add an extra className to DestinationMap wrapper */
  className?: string;
  height?: number;
  width?: number;
  postLocation: Address;
  destinations: Address[];
}

interface Point {
  lat: number;
  lng: number;
  color: string;
}
interface ArcLine {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  label: string;
}

export const DestinationGlobe: React.FunctionComponent<
  DestinationGlobeProps
> = ({ className, height, width, postLocation, destinations }) => {
  const globeEl = useRef<GlobeMethods | undefined>();
  const points: Point[] = useMemo(() => {
    return [
      {
        lat: postLocation.latitude,
        lng: postLocation.longitude,
        color: "red",
      },
      ...destinations.map((destination) => ({
        lat: destination.latitude,
        lng: destination.longitude,
        color: "blue",
      })),
    ];
  }, [postLocation, destinations]);
  const arcLines: ArcLine[] = useMemo(() => {
    return destinations.map((destination) => ({
      startLat: postLocation.latitude,
      startLng: postLocation.longitude,
      endLat: destination.latitude,
      endLng: destination.longitude,
      label: destination.name,
    }));
  }, [postLocation, destinations]);

  return (
    <div className={className}>
      <Globe
        ref={globeEl}
        height={height}
        width={width}
        globeImageUrl={globeImg}
        animateIn={false}
        pointsData={points}
        pointColor={(point) => {
          return (point as Point).color;
        }}
        pointRadius={0.1}
        arcsData={arcLines}
        arcColor={() => "orange"}
        arcLabel={(arc) => (arc as ArcLine).label}
        arcStroke={0.2}
        onGlobeReady={() => {
          if (!globeEl.current) return;
          globeEl.current.pointOfView({
            lat: postLocation.latitude,
            lng: postLocation.longitude,
            altitude: 2,
          });
        }}
      />
    </div>
  );
};
