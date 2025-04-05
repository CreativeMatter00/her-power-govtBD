import Image from "next/image";
import React from "react";
import Challenges from "./Challenges";

const ChallengesHome = () => {
  return (
    <section>
      <section>
        {/* banner */}
        <div className="h-80 flex mx-auto justify-center">
          <Image
            src={"/assets/images/meet-partners/Meet Partners Banner 1.png"}
            alt="Events Banner"
            width={1920}
            height={300}
            className="object-cover object-center h-80"
          />
        </div>
        {/* blog posts  */}
        <div className="max-w-7xl container">
          <Challenges />
        </div>
      </section>
    </section>
  );
};

export default ChallengesHome;
