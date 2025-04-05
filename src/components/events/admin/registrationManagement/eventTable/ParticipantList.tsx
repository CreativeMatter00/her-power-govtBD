import { getEventsParticipant } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { title } from "process";
import React from "react";
import ScaleLoader from "react-spinners/ScaleLoader";

interface Participant {
  participant_name: string;
  participant_email: string | null;
  phone_no: string | null;
  participant_adress: string | null;
}

interface ParticipantListI {
  eventId: string;
  title: string | undefined;
}

const ParticipantList = ({ eventId, title }: ParticipantListI) => {
  const {
    isLoading,
    error,
    data: eventParticipants,
    refetch,
  } = useQuery({
    queryKey: ["eventParticipants", eventId],
    queryFn: () => getEventsParticipant(eventId),
  });

  if (isLoading)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <ScaleLoader color="#421957" height={70} radius={8} width={10} />
      </div>
    );

  if (error)
    return (
      <div className="text-center text-xl font-md py-8">
        Something went wrong. Please reload
      </div>
    );
  return (
    <>
      {eventParticipants?.data?.length === 0 ? (
        <div className="text-center text-xl font-md py-8">
          No participants found for this event
        </div>
      ) : (
        <section className="w-full bg-white mb-8">
          <p className="text-start my-8 text-xl">Participant of {title} </p>
          <table className="w-full table-auto">
            <thead>
              <tr className="text-base text-greyPrimary font-normal">
                <th className="text-start">SL no.</th>
                <th className="text-start">Name</th>

                <th className="text-start">Email</th>
                <th className="text-start">Phone</th>
                <th className="text-start">Address</th>
              </tr>
            </thead>
            <tbody>
              {eventParticipants?.data?.map(
                (participant: Participant, index: number) => (
                  <tr
                    key={index}
                    className="border-t border-[##DDDDDD] text-brandPrimary py-3"
                  >
                    <td className="py-3">{index + 1}</td>

                    <td className="py-3">{participant.participant_name}</td>

                    <td className="py-3">{participant.participant_email}</td>
                    <td className="py-3">{participant.phone_no}</td>
                    <td className="py-3">{participant.participant_adress}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </section>
      )}
    </>
  );
};

export default ParticipantList;
