import React from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";

interface SuccessModalI {
  name?: string;
  phone?: string;
  address?: string;
  messageDescription: string;
  message: string;
}
const SuccessModal = ({ name, phone, address, message, messageDescription }: SuccessModalI) => {
  return (
    <div>
      <div className="rounded-lg p-6 space-y-2">
        <div className="flex justify-center items-center ">
          <IoIosCheckmarkCircle className="text-8xl text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-center text-green-500">
          Success!
        </h2>
        <p className="text-center">
          {messageDescription}
        </p>
        {
          (name || phone || address) && (
            <>
              <p>
                <strong>Contact Information:</strong>
              </p>
              <ul>
                {name && (
                  <li>Name: {name}</li>
                )}
                {
                  name && (
                    <li>Phone: {phone}</li>
                  )
                }
                {name && (
                  <li>Address: {address}</li>
                )}
              </ul></>
          )
        }
        <p className="text-center text-green-500 mt-2">{message}</p>
      </div>
    </div>
  );
};

export default SuccessModal;
