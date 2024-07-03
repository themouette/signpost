import { useState } from "react";
import { formatNumber } from "./lib/format-number";
import { distanceInKm } from "./lib/distance";
import { direction } from "./lib/direction";
import { AddressAutoComplete } from "./components/geo/AddressAutoComplete";
import { DestinationMap } from "./DestinationMap";
import { DestinationWheel } from "./DestinationWheel";
import { Address } from "./lib/address";

export interface SelectDestinationsProps {
  postLocation: Address;
}

export const SelectDestinations: React.FunctionComponent<
  SelectDestinationsProps
> = ({ postLocation }) => {
  const [destinations, setDestinations] = useState<Address[]>([]);
  const vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
  const vh = Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  );

  return (
    <div className="flex justify-stretch gap-4">
      <div className="w-1/3">
        <DestinationSelector
          postLocation={postLocation}
          destinations={destinations}
          setDestinations={setDestinations}
        />
      </div>
      <div className="flex-grow">
        <DestinationMap
          width={(2 / 3) * vw}
          height={0.85 * vh}
          postLocation={postLocation}
          destinations={destinations}
        />
        <DestinationWheel
          postLocation={postLocation}
          destinations={destinations}
        />
      </div>
    </div>
  );
};

interface DestinationSelectorProps {
  postLocation: Address;
  destinations: Address[];
  setDestinations: React.Dispatch<React.SetStateAction<Address[]>>;
}

const DestinationSelector: React.FunctionComponent<
  DestinationSelectorProps
> = ({ postLocation, destinations, setDestinations }) => {
  return (
    <div>
      <div>
        {destinations.map((destination, index) => (
          <div
            key={index}
            className="flex gap-4 justify-stretch items-start text-left"
          >
            <div className="text-md grow">
              <p>{destination.name}</p>
              <p>
                {formatNumber(distanceInKm(postLocation, destination))}
                km {formatNumber(direction(postLocation, destination))}º{" "}
              </p>
            </div>
            <div className="self-center">
              <button
                onClick={() => {
                  setDestinations((prev) => prev.filter((_, i) => i !== index));
                }}
              >
                X
              </button>
            </div>
          </div>
        ))}
      </div>
      <AddressAutoComplete
        onAddressChange={(location) =>
          setDestinations((prev) => prev.concat(location))
        }
      />
    </div>
  );
};
