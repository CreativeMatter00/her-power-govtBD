"use client";
import Image from "next/image";
import React, { FC, useState } from "react";

interface IEditProps {
  setViewModalOpen: Function;
  refetch: any;
  viewData: any;
}

const VeiwVenue: FC<IEditProps> = ({ setViewModalOpen, refetch, viewData }) => {
  // console.log("viewData", viewData);

  // setViewModalOpen(false);

  return (
    <>
      <section className="w-full">
        <main className={`rounded-2xl`}>
          <div className={`p-2`}>
            {/* ========================== HEADING PART ======================= */}
            <div className="border-b border-[#989898]">
              <div className="mb-4 flex justify-between items-center">
                <h1 className="text-xl text-[#1C1C1C] font-bold">View Venue</h1>
              </div>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
              <div>
                <h1 className="text-greyPrimary ml-6">Venue Name</h1>
                <p className="px-6  py-1 mt-1">{viewData.venue_name}</p>
              </div>

              <div>
                <h1 className="text-greyPrimary ml-6">Capacity</h1>
                <p className="px-6  py-1 mt-1">{viewData.capacity}</p>
              </div>
              <div>
                <h1 className="text-greyPrimary ml-6">Venue Address</h1>
                <p className="px-6  py-1 mt-1">{viewData.venue_address}</p>
              </div>
              <div>
                <h1 className="text-greyPrimary ml-6">Venue Title</h1>
                <p className="px-6  py-1 mt-1">{viewData.venue_title}</p>
              </div>

              <div>
                <h1 className="text-greyPrimary ml-6">Remarks</h1>
                <p className="px-6  py-1 mt-1">{viewData.remarks}</p>
              </div>

              <div>
                <h1 className="text-greyPrimary ml-6">Per Day Rent</h1>
                <p className="px-6  py-1 mt-1">{viewData.per_day_rent}</p>
              </div>
              <div>
                <h1 className="text-greyPrimary ml-6">Division</h1>
                <p className="px-6  py-1 mt-1">{viewData.division_name}</p>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default VeiwVenue;
