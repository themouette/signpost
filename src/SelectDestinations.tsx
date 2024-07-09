import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { formatNumber } from "./lib/format-number";
import { distanceInKm } from "./lib/distance";
import { direction } from "./lib/direction";
import { AddressAutoComplete } from "./components/geo/AddressAutoComplete";
import { DestinationMap } from "./DestinationMap";
import { DestinationWheel } from "./DestinationWheel";
import { Address } from "./lib/address";
import { ListItem } from "./components/ListItem";
import { cn } from "./lib/utils";

export interface SelectDestinationsProps {
  postLocation: Address;
  setPostLocation: React.Dispatch<React.SetStateAction<Address | undefined>>;
  destinations: Address[];
  setDestinations: React.Dispatch<React.SetStateAction<Address[]>>;
}

export const SelectDestinations: React.FunctionComponent<
  SelectDestinationsProps
> = ({ postLocation, setPostLocation, destinations, setDestinations }) => {
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
      <div className="w-1/3 border-r">
        <Accordion type="single" collapsible defaultValue="destinations">
          <AccordionItem value="post-position">
            <AccordionTrigger>Position du panneau</AccordionTrigger>
            <AccordionContent>
              <ListItem
                content={<p>{postLocation?.name}</p>}
                onDelete={() => setPostLocation(undefined)}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="destinations">
            <AccordionTrigger>Destinations</AccordionTrigger>
            <AccordionContent>
              <DestinationSelector
                postLocation={postLocation}
                destinations={destinations}
                setDestinations={setDestinations}
                className="min-h-[80vh]"
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="w-2/3">
        <Tabs defaultValue="map">
          <TabsList className="grid max-w-96 mx-auto my-4 grid-cols-2">
            <TabsTrigger value="map">Carte</TabsTrigger>
            <TabsTrigger value="wheel">Rose des vents</TabsTrigger>
          </TabsList>
          <TabsContent value="map">
            <DestinationMap
              width={(2 / 3) * vw}
              height={0.85 * vh}
              postLocation={postLocation}
              destinations={destinations}
            />
          </TabsContent>
          <TabsContent value="wheel">
            <DestinationWheel
              width={(2 / 3) * vw}
              height={0.85 * vh}
              postLocation={postLocation}
              destinations={destinations}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

interface DestinationSelectorProps {
  className?: string;
  postLocation: Address;
  destinations: Address[];
  setDestinations: React.Dispatch<React.SetStateAction<Address[]>>;
}

const DestinationSelector: React.FunctionComponent<
  DestinationSelectorProps
> = ({ className, postLocation, destinations, setDestinations }) => {
  return (
    <div className={className}>
      <AddressAutoComplete
        onAddressChange={(location) =>
          setDestinations((prev) => prev.concat(location))
        }
        className="border"
      />
      {!destinations.length && (
        <div className="text-center p-4 text-lg">
          Ajoutez votre première destination
        </div>
      )}
      <div className={cn("mt-2", destinations.length && "border-y")}>
        {destinations.map((destination, index) => (
          <ListItem
            key={index}
            className={cn(index !== 0 ? "border-t" : "")}
            content={
              <div className="flex gap-4 justify-stretch items-start text-left px-1">
                <div className="text-md grow">
                  <p>{destination.name}</p>
                  <p>
                    {formatNumber(distanceInKm(postLocation, destination))}
                    km {formatNumber(
                      direction(postLocation, destination)
                    )}º{" "}
                  </p>
                </div>
              </div>
            }
            onDelete={() => {
              setDestinations((prev) => prev.filter((_, i) => i !== index));
            }}
          />
        ))}
      </div>
    </div>
  );
};
