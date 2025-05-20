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
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CgDetailsMore } from "react-icons/cg";
import { FaCalendarAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdDelete, MdEdit } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IPostedJobCardProps {
  id: string;
  title: string;
  companyName: string;
  description: string;
  location: string;
  type: string;
  workLocation: string;
  refetch: Function;
}

const PostedJobsCard = ({
  id,
  title,
  companyName,
  description,
  location,
  type,
  workLocation,
  refetch,
}: IPostedJobCardProps) => {
  const t = useTranslations("career");
  const locale = useLocale();
  const pathName = usePathname();

  const handleRemoveJob = async (id: string) => {
    try {
      const response = await api.get(`/api/delete-job-post/${id}`);
      if (response?.data?.meta?.status) {
        toast.success("Successfully Deleted Post", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error("Failed to delete post", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      toast.error("Something went wrong", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      refetch();
    }
  };

  return (
    <>
      <div className="col-span-1 bg-brandLsSecondary p-8 flex flex-col justify-between gap-5">
        <div className="space-y-3">
          <p className="text-black font-bold text-2xl">{title}</p>
          <div className="space-y-1">
            <p className="line-clamp-4 md:line-clamp-3 font-bold">{companyName}</p>
            <p
              className="line-clamp-4 md:line-clamp-3"
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FaLocationDot className="text-brandDs font-bold w-5" />
              <p className="font-bold text-sm">{location}</p>
            </div>
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-brandDs font-bold w-5" />
              <p className="font-bold text-sm">
                {type}
                {` (${workLocation})`}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap md:flex-nowrap items-center pt-2 gap-4">
            <Link
              href={{
                pathname: `/${locale}/career/profile/job-provider/edit-job/${id}`,
                query: { redirect: pathName },
              }}
            >
              <button className="text-base px-6 py-2 bg-brandHover rounded-full text-white hover:text-white hover:bg-brandDs inline-flex justify-center items-center gap-2">
                <MdEdit />
                {t("Edit")}
              </button>
            </Link>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="text-base px-6 py-2 bg-red-500 rounded-full text-white hover:text-white hover:bg-red-600 inline-flex justify-center items-center gap-2">
                  <MdDelete />
                  {t("Remove")}
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-white">
                <AlertDialogHeader>
                  <AlertDialogTitle>{t("ConfirmRemove")}</AlertDialogTitle>
                  <AlertDialogDescription>
                    {t("areyouSureRemomveThisJob")}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>{t("Cancel")}</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleRemoveJob(id)}
                    className="bg-brandDs text-brandLsPrimary"
                  >
                    {t("Confirm")}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Link href={`/${locale}/career/jobs/${id}`} className="w-full">
              <button className="text-base px-6 py-2 bg-link rounded-full text-white hover:text-white hover:bg-linkHover inline-flex justify-center items-center gap-2">
                <CgDetailsMore />
                {t("Details")}
              </button>
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default PostedJobsCard;
// "use client";
// import { url } from "@/api/api";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import axios from "axios";
// import { useLocale, useTranslations } from "next-intl";
// import { redirect } from "next/dist/server/api-utils";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import React from "react";
// import { CgDetailsMore } from "react-icons/cg";
// import { FaCalendarAlt } from "react-icons/fa";
// import { FaLocationDot } from "react-icons/fa6";
// import { MdDelete, MdEdit } from "react-icons/md";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// interface IPostedJobCardProps {
//   id: string;
//   title: string;
//   companyName: string;
//   description: string;
//   location: string;
//   type: string;
//   workLocation: string;
//   refetch: Function;
// }

// const PostedJobsCard = ({
//   id,
//   title,
//   companyName,
//   description,
//   location,
//   type,
//   workLocation,
//   refetch,
// }: IPostedJobCardProps) => {
//   const t = useTranslations("career");

//   const locale = useLocale();
//   const pathName = usePathname();
//   // console.log("pathName", pathName);
//   const handleRemoveJob = async (id: string) => {
//     try {

//       const response = await axios.get(`${url}/api/delete-job-post/${id}`);
//       // refetch();
//       if(response?.data?.meta?.status){
//         console.log("tost not show if success");
//         toast.success("Successfully Deleted Post", {
//           position: "bottom-left",
//           autoClose: 3000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "light",
//         })
//       }else{
//         console.log("jjjj");
        
//       }
      
//     } catch (error) {

//       console.log("tost not show");
      
//       toast.error("Something went wrong", {
//                 position: "bottom-left",
//                 autoClose: 3000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "light",
//               });
//     }
//     refetch();
//   };
//     try {

//       const response = await axios.get(`${url}/api/delete-job-post/${id}`);
//       // refetch();
//       if(response?.data?.meta?.status){
//         console.log("tost not show if success");
//         toast.success("Successfully Deleted Post", {
//           position: "bottom-left",
//           autoClose: 3000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "light",
//         })
//       }else{
//         console.log("jjjj");
        
//       }
      
//     } catch (error) {

//       console.log("tost not show");
      
//       toast.error("Something went wrong", {
//                 position: "bottom-left",
//                 autoClose: 3000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "light",
//               });
//     }
//     refetch();
//   };

//   return (
//     <>
//  <ToastContainer />
//     <div className="col-span-1 bg-brandLsSecondary p-8 flex flex-col justify-between gap-5">

//       <div className="space-y-3">
//         <p className="text-black font-bold text-2xl">{title}</p>

//         <div className="space-y-1">
//           <p className="line-clamp-4 md:line-clamp-3 font-bold">
//             {companyName}
//           </p>
//           <p
//             className="line-clamp-4 md:line-clamp-3"
//             dangerouslySetInnerHTML={{
//               __html: description,
//             }}
//           />
//         </div>
//       </div>
//       <div className="flex flex-col">
//         <div className="flex justify-between items-center">
//           <div className="flex items-center gap-2">
//             <FaLocationDot className="text-brandDs font-bold w-5" />{" "}
//             <p className="font-bold text-sm">{location}</p>
//           </div>
//           <div className="flex items-center gap-2">
//             <FaCalendarAlt className="text-brandDs font-bold w-5" />{" "}
//             <p className="font-bold text-sm">
//               {type}
//               {` (${workLocation})`}
//             </p>
//           </div>
//         </div>
//         <div className="flex flex-wrap md:flex-nowrap items-center pt-2 gap-4">
//           {/* ======== edit button ====== */}
//           <Link
//             href={{
//               pathname: `/${locale}/career/profile/job-provider/edit-job/${id}`,
//               query: { redirect: pathName },
//             }}
//           >
//             <button className="text-base px-6 py-2 bg-brandHover rounded-full text-white hover:text-white hover:bg-brandDs inline-flex justify-center items-center gap-2">
//               <MdEdit />
//               {t("Edit")}
//             </button>
//           </Link>

//           {/* ======== remove button ====== */}
//           <AlertDialog>
//             <AlertDialogTrigger asChild>
//               <button className="text-base px-6 py-2 bg-red-500 rounded-full text-white hover:text-white hover:bg-red-600 inline-flex justify-center items-center gap-2">
//                 <MdDelete />
//                 {t("Remove")}
//               </button>
//             </AlertDialogTrigger>
//             <AlertDialogContent className="bg-white">
//               <AlertDialogHeader>
//                 <AlertDialogTitle>{t("ConfirmRemove")}</AlertDialogTitle>
//                 <AlertDialogDescription>
//                   {t("areyouSureRemomveThisJob")}
//                 </AlertDialogDescription>
//               </AlertDialogHeader>
//               <AlertDialogFooter>
//                 <AlertDialogCancel>{t("Cancel")}</AlertDialogCancel>
//                 <AlertDialogAction
//                   onClick={() => handleRemoveJob(id)}
//                   className="bg-brandDs text-brandLsPrimary"
//                 >
//                   {t("Confirm")}
//                 </AlertDialogAction>
//               </AlertDialogFooter>
//               <ToastContainer />
//             </AlertDialogContent>
//           </AlertDialog>

//           {/* ======== details button ====== */}
//           <Link href={`/${locale}/career/jobs/${id}`} className="w-full">
//             <button className="text-base px-6 py-2 bg-link rounded-full text-white hover:text-white hover:bg-linkHover inline-flex justify-center items-center gap-2">
//               <CgDetailsMore />
//               {t("Details")}
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//       <ToastContainer />
//     </>
//   );
// };

// export default PostedJobsCard;
