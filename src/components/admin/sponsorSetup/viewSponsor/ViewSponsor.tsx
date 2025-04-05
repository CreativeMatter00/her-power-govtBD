"use client";
import Image from "next/image";
import React, { FC, useState } from "react";

// interface IFormInput {
// 	sponsorName: string;
// 	contractPerson: string;
// 	address: string;
// 	contactEmail: string;
// 	sponsorDescription: string;
// 	contactPhone: number;
// 	imageFile?: string;
// }

interface IEditProps {
  setViewModalOpen: Function;
  refetch: any;
  viewData: any;
}

const ViewSponsor: FC<IEditProps> = ({
  setViewModalOpen,
  refetch,
  viewData,
}) => {
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
                <h1 className="text-xl text-[#1C1C1C] font-bold">
                  View Sponsor
                </h1>
              </div>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
              <div>
                <h1 className="text-greyPrimary ml-6">Sponsor Name</h1>
                <p className="px-6  py-1 mt-1">{viewData.sponsor_name}</p>
              </div>
              <div>
                <h1 className="text-greyPrimary ml-6">Contact Person Name</h1>
                <p className="px-6  py-1 mt-1">{viewData.contract_persone}</p>
              </div>
              <div>
                <h1 className="text-greyPrimary ml-6">Phone Number</h1>
                <p className="px-6  py-1 mt-1">{viewData.contact_phone}</p>
              </div>
              <div>
                <h1 className="text-greyPrimary ml-6">Email</h1>
                <p className="px-6  py-1 mt-1">{viewData.contact_email}</p>
              </div>
              <div>
                <h1 className="text-greyPrimary ml-6">Address</h1>
                <p className="px-6  py-1 mt-1">{viewData.address_line}</p>
              </div>
              <div>
                <h1 className="text-greyPrimary ml-6">Description</h1>
                <p className="px-6  py-1 mt-1">{viewData.description}</p>
              </div>
              <div className="ml-6">
                <h1 className="text-greyPrimary mb-2">Sponsor Image</h1>
                <Image
                  src={`${viewData.sponsor_image}`}
                  height={300}
                  width={300}
                  alt="upload image"
                  className="w-72 h-72 rounded-md"
                />
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default ViewSponsor;
