"use client";
import { api } from "@/api/api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TKIcon } from "@/components/ui/icon/EventsIcon";
import styles from "@/styles/Events.module.css";
import { useCookies } from "next-client-cookies";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CiCalendar } from "react-icons/ci";
import { IoMdTime } from "react-icons/io";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import ScaleLoader from "react-spinners/ScaleLoader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Countdown from "../../shared/countdown/CountDown";
import SuccessModal from "./SuccessModal";

const EventSummary = ({ eventSummary, refetch }: any) => {
  const t = useTranslations("Events");
  const [selectedTicket, setSelectedTicket] = useState("");
  const [selectedTicketName, setSelectedTicketName] = useState("");
  const [selectedTicketAmount, setSelectedTicketAmount] = useState("");
  const [openModal, setOpenModal] = useState<boolean>();
  const [responseData, setResponseData] = useState<any>({});
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();
  const cookies = useCookies();
  const router = useRouter();
  const userId = cookies.get("user_pid") || "";

  useEffect(() => {
    // console.log("response data", responseData);
  }, [responseData]);

  const handleRegister = async () => {
    if (!userId) {
      router.push(
        `/${locale}/login?redirect=/${locale}/events/event/${eventSummary.event_pid}`
      );
      return;
    }

    try {
      const response = await api.post('/api/admin/event/participant', {
        event_pid: eventSummary.event_pid,
        ticket_pid:
          selectedTicket ||
          eventSummary?.tricket_info?.ticket_pid ||
          eventSummary?.tricket_info[0]?.ticket_pid ||
          "",
        active_status: 1,
        user_pid: userId,
      });
      if (response?.data?.meta.status === true) {
        setOpenModal(true);
        setResponseData(response?.data?.data);
        refetch();
      } else {
        toast.error("Failed to register for the event. Please try again.", {
          position: "bottom-left",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Helper function to format time
  const formatTime = (time: string) => {
    return new Date(`1970-01-01T${time}`).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Helper function to calculate duration
  const calculateDuration = (fromTime: string, toTime: string) => {
    const from = new Date(`1970-01-01T${fromTime}`);
    const to = new Date(`1970-01-01T${toTime}`);
    const durationInMs = to.getTime() - from.getTime();
    const hours = Math.floor(durationInMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationInMs % (1000 * 60 * 60)) / (1000 * 60));
    return { hours, minutes };
  };

  // Determine if event_schedule is an array or an object
  const schedules = Array.isArray(eventSummary?.event_schedule)
    ? eventSummary?.event_schedule
    : [eventSummary?.event_schedule];

  if (!eventSummary || !schedules) {
    return (
      <div className="w-full text-center">
        <ScaleLoader />
      </div>
    );
  }

  // Check if the event has ended by comparing end_datetime with the current time
  const currentTime = new Date().getTime();
  const eventEnded = schedules[schedules.length - 1]?.end_datetime
    ? new Date(schedules[schedules.length - 1].end_datetime).getTime() <
      currentTime
    : false;

  return (
    <section
      className={`flex lg:items-center  min-h-max  lg:divide-x-2 divide-brandLsPrimary border border-brandLsPrimary rounded-md ${styles.myEventsCardShadow}  max-lg:flex-col max-lg:p-4`}
    >
      <div className="lg:basis-2/3 lg:my-4 lg:mx-6">
        {schedules.slice(0, 1).map((schedule: any, index: number) => {
          const { hours, minutes } = calculateDuration(
            schedule?.from_time,
            schedule?.to_time
          );

          return (
            <div key={index}>
              <div className="flex items-center gap-6 text-base text-link max-lg:flex-wrap max-lg:items-start">
                <div className="flex lg:items-center gap-1">
                  <CiCalendar className="w-5 h-5 text-greyPrimary" />
                  <p>
                    {new Date(schedule?.start_datetime).toLocaleDateString(
                      "en-GB",
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </p>
                </div>
                <div className="w-1.5 h-1.5 bg-brandPrimary rounded-full max-lg:hidden"></div>
                <div className="flex items-center gap-1">
                  <IoMdTime className="w-5 h-5 text-greyPrimary " />
                  <p>{formatTime(schedule?.from_time)}</p>
                </div>
              </div>
            </div>
          );
        })}

        <p className="text-4xl text-brandPrimary mt-4 capitalize">
          {eventSummary?.event_title}
        </p>

        {eventEnded ? (
          <p className="text-red-500 text-lg mt-4">
            {/* {t("This_event_has_ended")} */}
          </p>
        ) : (
          <Countdown endDatetime={schedules[0]?.end_datetime} />
        )}
      </div>

      <div className="lg:basis-1/3 max-lg:mt-2 max-lg:w-full">
        <div className="flex flex-col items-center justify-between gap-2 text-base max-lg:w-full">
          {eventSummary?.ticket_type === "F" ? (
            <div className="flex items-center gap-4">
              <div className="relative bg-success text-bgPrimary font-semibold text-lg py-1 px-6 rounded-full flex items-center">
                <span className="absolute bg-bgPrimary h-3 w-3 rounded-full -left-2"></span>
                {t("Free")}
                <span className="absolute bg-bgPrimary h-3 w-3 rounded-full -right-2"></span>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-greyPrimary mb-1 lg:mb-2">
                {t("Ticket_Price")}:
              </p>
              <div className="flex flex-col items-center justify-start">
                {eventSummary?.tricket_info?.length > 0 ? (
                  <>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          type="button"
                          onClick={() => setIsOpen(!isOpen)}
                          className="flex items-center gap-2"
                        >
                          {isOpen ? (
                            <MdOutlineKeyboardArrowUp className="w-7 h-7 text-brandPrimary" />
                          ) : (
                            <MdOutlineKeyboardArrowDown className="w-7 h-7 text-brandPrimary" />
                          )}
                          <div className="flex items-center gap-4 ">
                            <p className="text-link">
                              {selectedTicketName ||
                                eventSummary?.tricket_info[0]?.ticket_name}
                            </p>
                            <p className="text-success">
                              {selectedTicketAmount ||
                                eventSummary?.tricket_info[0]?.ticket_amount}
                            </p>
                          </div>
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-40">
                        {eventSummary?.tricket_info?.map(
                          (ticket: any, index: number) => (
                            <DropdownMenuCheckboxItem
                              key={index}
                              onSelect={() => {
                                setSelectedTicket(ticket?.ticket_pid);
                                setSelectedTicketName(ticket?.ticket_name);
                                setSelectedTicketAmount(ticket?.ticket_amount);
                              }}
                              className="group hover:bg-brandLsPrimary gap-4 text-base text-brandPrimary hover:text-brandDs"
                            >
                              <div className="flex items-center gap-4 ">
                                <p>{ticket?.ticket_name}</p>
                                <p className="text-greyPrimary">
                                  ${ticket?.ticket_amount}
                                </p>
                              </div>
                            </DropdownMenuCheckboxItem>
                          )
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </>
                ) : (
                  <div className="flex items-center gap-2">
                    <TKIcon tkWidth={20} tkHeight={20} />
                    <p className="text-xl text-success">
                      {eventSummary?.tricket_info?.ticket_amount}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {!eventEnded && (
            <>
              {!eventSummary.already_registered ? (
                <div className="mt-3 max-lg:mt-6 max-lg:flex max-lg:justify-center">
                  {/* <Link href={`/${locale}/events/event/1/register`}> */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button className="bg-brandDs rounded-full text-lg text-bgPrimary px-8 py-3">
                        {t("Register_Now")}
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-white">
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          {t("Confirm_Registration")}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          {t("Are_you_sure_register")}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>{t("Cancel")}</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleRegister}
                          className="bg-brandDs text-brandLsPrimary"
                        >
                          {t("Confirm")}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  {/* </Link> */}
                </div>
              ) : (
                <p className="text-green-500 font-medium">
                  {t("Already_registered")}
                </p>
              )}
            </>
          )}
        </div>
      </div>
      <ToastContainer />
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="bg-white w-[40vw]">
          <SuccessModal
            name={responseData?.participant_name}
            phone={responseData?.phone_no}
            address={responseData?.participant_adress}
            messageDescription={`${responseData?.participant_name}, your registration was successful. We have received your
          contact information and will reach out to you shortly.`}
            message={"Successfully registered the event!"}
          />
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default EventSummary;
