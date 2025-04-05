import Image from "next/image";
import React from "react";
import BlogPosts from "./blogPosts/BlogPosts";

const MeetPartnersHome = () => {
  return (
    <section>
      <section>
        {/* banner */}
        <div className="h-80 flex mx-auto justify-center">
          <Image
            src={"/assets/images/meet-partners/banner.jpg"}
            alt="Events Banner"
            width={1920}
            height={300}
            className="object-cover object-center h-80"
          />
        </div>
        {/* blog posts  */}
        <div className="max-w-7xl container">
          <BlogPosts />
        </div>
      </section>
    </section>
  );
};

export default MeetPartnersHome;
