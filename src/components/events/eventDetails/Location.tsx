import Link from "next/link";
import { PiHeartThin, PiShareNetworkThin } from "react-icons/pi";

const Location = () => {
  return (
    <>
      {/* ==================== LOCATION, MAP, SHARE, FAVOURITE ====================== */}
      <section className="flex justify-between items-center my-4">
        {/* ====================== LOCATION & MAP ============================= */}
        <div className="flex items-center gap-2 text-base text-brandPrimary max-lg:flex-wrap">
          <p>Location:</p>
          <p className="font-bold">Dhaka, Bangladesh</p>

          <Link
            href={"https://maps.app.goo.gl/dFzC11QZZPibDMYt9"}
            target="_blank"
          >
            <p className="ml-4 text-link hover:underline underline-offset-2 cursor-pointer">
              Show Map
            </p>
          </Link>
        </div>

        {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.3698524482325!2d90.38800147602568!3d23.876500283922194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c43ca7f68407%3A0x3f083770ea2fa274!2sATI%20Limited!5e0!3m2!1sen!2sbd!4v1719739959988!5m2!1sen!2sbd" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}

        {/* ================================ SHARE & ADD TO FAVOURITE ==================== */}
        <div className="flex items-center gap-3 text-brandPrimary ">
          {/* =======================  ADD TO FAVOURITE LIST ============================ */}
          <div className="bg-brandLsSecondary p-1.5 rounded-full hover:bg-brandDs hover:text-brandLsSecondary cursor-pointer">
            <PiHeartThin className="w-6 h-6" />
          </div>
          {/* ======================== SHARE FEATURED EVENT ============================ */}
          <div className="bg-brandLsSecondary p-1.5 rounded-full hover:bg-brandDs hover:text-brandLsSecondary cursor-pointer">
            <PiShareNetworkThin className="w-6 h-6" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Location;
