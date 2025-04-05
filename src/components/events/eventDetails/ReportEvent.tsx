import Image from "next/image";
import { GoInfo } from "react-icons/go";

const ReportEvent = () => {
  return (
    <>
      <section className="my-8 border border-brandDs w-full px-5 py-3 rounded">
        <div className="flex items-center gap-6 max-lg:flex-wrap">
          <div className="basis-1/5 max-lg:order-last">
            <div className="bg-dangerPrimary flex items-center justify-center gap-2 px-8 py-2 rounded-full cursor-pointer max-lg:w-96 max-md:w-60">
              <Image
                src={"/assets/images/events/Icons/flag.png"}
                alt="flag"
                width={18}
                height={18}
              />
              <p className="text-bgPrimary">Report this event</p>
            </div>
          </div>
          <div className="basis-4/5">
            <div className="flex items-start justify-start gap-1">
              <GoInfo className="text-greyPrimary mt-0.5 w-4 h-4" />
              <p className="text-sm text-greyPrimary">
                If you encounter any issues or have concerns about this event,
                please click the &lsquo;Report this Event&lsquo; button to
                notify our team. Your feedback helps us maintain the quality and
                integrity of our events.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ReportEvent;
