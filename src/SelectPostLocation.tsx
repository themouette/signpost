import signPostSwitzerland from "@/assets/complex-signpost.jpg";
import signPostMalaisia from "@/assets/signpost-malaysia.jpg";
import { AddressAutoComplete } from "./components/geo/AddressAutoComplete";
import { cn } from "@/lib/utils";
import { Address } from "@/lib/address";
import { useState } from "react";

export interface SelectPostLocationProps {
  className?: string;
  onLocationSelected: (address: Address) => void;
}

export const SelectPostLocation: React.FunctionComponent<
  SelectPostLocationProps
> = ({ className, onLocationSelected }) => {
  const [signPost] = useState(
    Math.random() > 0.5 ? signPostSwitzerland : signPostMalaisia
  );
  return (
    <div className={cn("flex gap-4 homepage-gradient", className)}>
      <div className="hidden md:block">
        <img src={signPost} className="h-dvh" alt="Image" />
      </div>
      <div className="grow items-stretch">
        <div
          className={cn(
            "h-full flex flex-col justify-center items-center",
            className
          )}
        >
          <div className="flex flex-col gap-4">
            <div className="text-center text-3xl font-sans">
              Vous souhaitez créer un totem avec des destinations ?
            </div>
            <div className="text-center text-2xl font-sans">
              Commencez par choisir son emplacement.
            </div>
            <div className="relative mt-20 mb-52">
              <AddressAutoComplete
                onAddressChange={onLocationSelected}
                className="text-xl [&_input]:text-xl rounded-lg border [&_input]:my-2 px-4"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
