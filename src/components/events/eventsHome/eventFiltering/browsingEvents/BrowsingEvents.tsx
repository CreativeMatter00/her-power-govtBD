"use client";
import { useState } from "react";
import PastEventsDropDownMenu from "./PastEventsDropDownMenu";

interface BrowsingEventsI {
  setSelectedDivision: Function;
}

const BrowsingEvents = ({ setSelectedDivision }: BrowsingEventsI) => {
  const [division, setDivision] = useState("");
  return (
    <>
      <div className="border-y border-brandLsPrimary w-full my-6">
        <div className="container p-4">
          <div className="flex items-center gap-2">
            <p className="text-xl text-brandPrimary">Browsing events in</p>
            <PastEventsDropDownMenu
              division={division}
              setDivision={setDivision}
              setSelectedDivision={setSelectedDivision}
            />
            <p className="text-base font-bold text-link underline underline-offset-2 decoration-2 decoration-greyPrimary">
              {division}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BrowsingEvents;
