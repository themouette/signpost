import roseDesVents from "@/assets/rose_des_vents.svg";
import { direction } from "./lib/direction";
import { Address } from "./lib/address";

export interface DestinationWheelProps {
  /** Add an extra className to DestinationWheel wrapper */
  className?: string;
  postLocation: Address;
  destinations: Address[];
}

export const DestinationWheel: React.FunctionComponent<
  DestinationWheelProps
> = ({ postLocation, destinations }) => {
  return (
    <div>
      <svg
        width="400"
        height="400"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <defs>
          <marker
            id="markerCircle"
            markerWidth="13"
            markerHeight="13"
            refX="5"
            refY="7"
            orient="auto"
          >
            <circle cx="7" cy="7" r="3" />
          </marker>
          <line id="stick" y1="-97.5" />
        </defs>

        <g transform="translate(150,152.5)">
          <image
            href={roseDesVents}
            x="-100"
            y="-100"
            width="200"
            height="200"
          />
          <circle r="97.5" color="#ff0" stroke="#ff0" fill="none" />
          <use
            xlinkHref="#stick"
            color="#000"
            stroke="#000"
            transform="rotate(0)"
          />
          {destinations.map((destination, index) => {
            const angle = direction(postLocation, destination);
            return (
              <>
                <use
                  key={index}
                  xlinkHref="#stick"
                  color="#f00"
                  stroke="#f00"
                  transform={`rotate(${angle})`}
                />
                <text
                  x="97.5"
                  y="0"
                  fill="black"
                  transform={`rotate(${angle - 90})`}
                >
                  {destination.name}
                </text>
              </>
            );
          })}
        </g>
      </svg>
    </div>
  );
};
