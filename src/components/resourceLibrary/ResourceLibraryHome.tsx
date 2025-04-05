import Image from "next/image";
import ArticleHome from "./articles/ArticleHome";
import Documents from "./documents/Documents";
import VideoHome from "./videos/VideoHome";


const ResourceLibraryHome = () => {
  return <>
        <div className="">
          <div className="h-80 flex mx-auto justify-center">
            <Image
              src={"/assets/images/resource/Images/Hero_Banner.png"}
              alt="Resource Banner"
              width={1920}
              height={300}
              className="object-cover object-center h-80"
            />
          </div>
        </div>
        
        <div className="container max-w-7xl p-4">
          <ArticleHome/>
        </div>
        <div className="container max-w-7xl p-4">
          <Documents/>
        </div>
        <div className="container max-w-7xl p-4">
          <VideoHome/>
        </div>
  </>;
};

export default ResourceLibraryHome;
