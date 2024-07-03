import { AddressAutoComplete } from "./components/geo/AddressAutoComplete";
import { cn } from "@/lib/utils";
import { Address } from "@/lib/address";

export interface SelectPostLocationProps {
  className?: string;
  onLocationSelected: (address: Address) => void;
}

export const SelectPostLocation: React.FunctionComponent<
  SelectPostLocationProps
> = ({ className, onLocationSelected }) => {
  return (
    <div className={cn("flex", className)}>
      <div className="text-2xl">Où sera placé le totem?</div>
      <div className="relative">
        <AddressAutoComplete onAddressChange={onLocationSelected} />
      </div>
    </div>
  );
};
