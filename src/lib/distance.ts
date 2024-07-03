import { distance as geodesyDistance } from "geodesy-fn";

/**
 * Calculate the distance in meter between two points.
 */
export const distance = (
  from: {
    latitude: number;
    longitude: number;
  },
  to: { latitude: number; longitude: number }
) => {
  return geodesyDistance(
    [from.longitude, from.latitude],
    [to.longitude, to.latitude]
  );
};

export const convertInKm = (distance: number) => distance / 1000;

export const distanceInKm = (
  from: {
    latitude: number;
    longitude: number;
  },
  to: { latitude: number; longitude: number }
) => {
  return convertInKm(distance(from, to));
};
