import { GeoapifyGeocoderAutocomplete } from "@geoapify/react-geocoder-autocomplete";
import { useState } from "react";
import { Address } from "@/lib/address";
import { cn } from "@/lib/utils";

export interface AddressAutoCompleteProps {
  /** Add an extra className to Geocoder wrapper */
  className?: string;
  /** Callback when the address changes */
  onAddressChange?: (address: Address) => void;
}

export const AddressAutoComplete: React.FunctionComponent<
  AddressAutoCompleteProps
> = (props) => {
  const [address, setAddress] = useState("");

  return (
    <div className={cn("bg-white [&_input]:border-0", props.className)}>
      <GeoapifyGeocoderAutocomplete
        placeholder="Enter address here"
        value={address}
        type="city"
        lang="fr"
        onUserInput={(value) => setAddress(value)}
        placeSelect={(result) => {
          props.onAddressChange?.({
            latitude: result.geometry.coordinates[1],
            longitude: result.geometry.coordinates[0],
            name: result.properties.formatted,
          });
          setAddress("");
        }}
      />
    </div>
  );
};
