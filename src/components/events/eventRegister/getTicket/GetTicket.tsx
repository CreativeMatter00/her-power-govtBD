import styles from "@/styles/Events.module.css";
import {
  Dialog,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import { useState } from "react";

const GetTicket: React.FC<{ setActive: Function }> = ({ setActive }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="container mx-auto py-10">
      <p className="text-brandPrimary text-3xl mb-6"> Get Ticket </p>

      <div className="flex items-center justify-center gap-4">
        <div className="w-[330px] h-[420px] rounded-lg shadow-lg relative">
          <div className="mb-10">
            <div
              className={`${styles.pentagon} bg-[#C0C0C0] h-[200px] rounded-md overflow-hidden py-8`}
            >
              <div className="flex flex-col gap-4 items-center">
                <p className="text-xl text-[#404040]"> Standard </p>
                <p className="text-5xl font-bold text-[#404040]">৳ 1200</p>
              </div>
            </div>
          </div>

          <div className="mx-16 mb-10">
            <ul className="list-inside list-disc">
              <li> General Admission </li>
              <li> Access to Exhibits </li>
              <li> Networking Opportunities </li>
            </ul>
          </div>

          <div className="">
            <button
              className="text-white py-3 px-8 rounded-full bg-[#404040] block mx-auto"
              onClick={() => setOpen(true)}
            >
              Buy Now
            </button>
          </div>
        </div>

        <div className="w-[330px] h-[470px] rounded-lg shadow-lg relative">
          <div className="mb-10">
            <div
              className={`${styles.pentagon} bg-[#1E90FF] h-[200px] rounded-md overflow-hidden py-8`}
            >
              <div className="flex flex-col gap-4 items-center">
                <p className="text-xl text-white"> Standard </p>
                <p className="text-5xl font-bold text-white">৳ 1200</p>
              </div>
            </div>
          </div>

          <div className="mx-16 mb-10">
            <ul className="list-inside list-disc">
              <li> General Admission </li>
              <li> Access to Exhibits </li>
              <li> Networking Opportunities </li>
            </ul>
          </div>

          <div className="">
            <button
              className="text-white py-3 px-8 rounded-full bg-[#1E90FF] block mx-auto"
              onClick={() => setOpen(true)}
            >
              Buy Now
            </button>
          </div>
        </div>

        <div className="w-[330px] h-[420px] rounded-lg shadow-lg relative">
          <div className="mb-10">
            <div
              className={`${styles.pentagon} bg-[#DFBD07] h-[200px] rounded-md overflow-hidden py-8`}
            >
              <div className="flex flex-col gap-4 items-center">
                <p className="text-xl text-white"> VIP </p>
                <p className="text-5xl font-bold text-white">৳ 2000</p>
              </div>
            </div>
          </div>

          <div className="mx-16 mb-10">
            <ul className="list-inside list-disc">
              <li> General Admission </li>
              <li> Access to Exhibits </li>
              <li> Networking Opportunities </li>
            </ul>
          </div>

          <div className="">
            <button
              className="text-white py-3 px-8 rounded-full bg-[#DFBD07] block mx-auto"
              onClick={() => setOpen(true)}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[600px] bg-white">
          <DialogDescription>
            <p className="text-brandPrimary text-4xl text-center mb-20">
              {" "}
              Are you sure you want to purchase
              <span className="text-[#1E90FF] font-bold"> Standard </span>{" "}
              ticket?{" "}
            </p>

            <div className="flex items-center justify-center gap-8">
              <button
                className="bg-link py-4 px-10 text-white rounded-full"
                onClick={() => setActive("payment")}
              >
                Confirm my ticket
              </button>
              <button
                className="
              border-2 border-dangerPrimary py-4 px-10 text-dangerPrimary rounded-full"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GetTicket;
