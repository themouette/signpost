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
    <div
      className={cn("flex flex-col justify-stretch gap-4 container", className)}
    >
      <p className="text-center text-2xl">
        Vous souhaitez créer un totem avec des destinations ? Commencez par
        choisir l'emplacement du totem.
      </p>
      <div className="relative">
        <AddressAutoComplete onAddressChange={onLocationSelected} />
      </div>
    </div>
  );
};
