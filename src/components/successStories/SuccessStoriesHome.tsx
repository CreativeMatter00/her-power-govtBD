import Image from "next/image";
import StoriesHome from "./stories/StoriesHome";



const SuccessStoriesHome = () => {
  return <>
        <div>
          <div className="h-80 flex mx-auto justify-center">
            <Image
              src={"/assets/images/success-stories/Images/Hero_Banner.jpg"}
              alt="Resource Banner"
              width={1920}
              height={300}
              className="object-cover object-center h-80"
            />
          </div>
        </div>
        <div className="container max-w-7xl p-4">
          <StoriesHome/>
        </div>
  </>;
};

export default SuccessStoriesHome;
