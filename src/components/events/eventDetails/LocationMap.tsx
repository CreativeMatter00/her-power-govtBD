import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import Image from "next/image";

const LocationMap = () => {
  return (
    <>
      <section>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="text-link text-base hover:underline underline-offset-2 cursor-pointer -ml-2 -my-2">
              Show map
            </Button>
          </DialogTrigger>
          <DialogContent className=" bg-white">
            <Image
              src={"/assets/images/events/Images/map.png"}
              alt="map"
              width={858}
              height={486}
              className="my-4"
            />
          </DialogContent>
        </Dialog>
      </section>
    </>
  );
};

export default LocationMap;
