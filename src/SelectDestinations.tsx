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
  setPostLocation: React.Dispatch<React.SetStateAction<Address | undefined>>;
  destinations: Address[];
  setDestinations: React.Dispatch<React.SetStateAction<Address[]>>;
}

export const SelectDestinations: React.FunctionComponent<
  SelectDestinationsProps
> = ({ postLocation, setPostLocation, destinations, setDestinations }) => {
  const [tab, setTab] = useState<"map" | "wheel">("map");
  const vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
  const vh = Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  );

  return (
    <div className="grow flex justify-items-stretch items-stretch gap-0">
      <div className="w-1/3 p-2">
        <div>
          <h2>Position du panneau</h2>
          <p>{postLocation?.name}</p>
          <button onClick={() => setPostLocation(undefined)}>X</button>
        </div>
        <DestinationSelector
          postLocation={postLocation}
          destinations={destinations}
          setDestinations={setDestinations}
        />
      </div>
      <div className="w-2/3">
        <div className="mx-2 py-4 flex gap-4">
          <button onClick={() => setTab("map")}>Carte</button>
          <button onClick={() => setTab("wheel")}>Rose des vents</button>
        </div>
        {tab === "map" ? (
          <DestinationMap
            width={(2 / 3) * vw}
            height={0.85 * vh}
            postLocation={postLocation}
            destinations={destinations}
          />
        ) : (
          <DestinationWheel
            width={(2 / 3) * vw}
            height={0.85 * vh}
            postLocation={postLocation}
            destinations={destinations}
          />
        )}
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
