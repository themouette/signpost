import { initialBearing } from "geodesy-fn";

export const direction = (
  from: {
    latitude: number;
    longitude: number;
  },
  to: { latitude: number; longitude: number }
) => {
  return initialBearing(
    [from.longitude, from.latitude],
    [to.longitude, to.latitude]
  );
};
