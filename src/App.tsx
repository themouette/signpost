import { useState } from "react";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";
import { GeoapifyContext } from "@geoapify/react-geocoder-autocomplete";
import { GEOAPIFY_API_KEY } from "./configuration";

import { SelectPostLocation } from "./SelectPostLocation";
import { SelectDestinations } from "./SelectDestinations";
import { Address } from "@/lib/address";

function App() {
  const [position, setPosition] = useState<Address>();
  const [destinations, setDestinations] = useState<Address[]>([]);

  return (
    <GeoapifyContext apiKey={GEOAPIFY_API_KEY}>
      {!position ? (
        <SelectPostLocation
          onLocationSelected={setPosition}
          className="flex flex-col justify-stretch gap-4"
        />
      ) : (
        <div className="flex items-stretch justify-items-stretch gap-4">
          <SelectDestinations
            postLocation={position}
            setPostLocation={setPosition}
            destinations={destinations}
            setDestinations={setDestinations}
          />
        </div>
      )}
    </GeoapifyContext>
  );
}

export default App;
