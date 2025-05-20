import { api } from "@/api/api";
import { useCookies } from "next-client-cookies";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useRef } from "react";
import { FaCamera } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

type userInfo = {
  userData: any;
  refetch: any;
};

const UserInfo: FC<userInfo> = ({ userData, refetch }) => {
  const t = useTranslations("talentHunt");

  const router = useRouter();
  const cookies = useCookies();

  const handleLogout = () => {
    // Clear local storage
    localStorage.clear();

    // Get all cookies and delete each one
    // document.cookie.split(";").forEach((cookie) => {
    //   const cookieName = cookie.split("=")[0].trim();
    //   deleteCookie(cookieName);
    // });

    document.cookie.split(";").forEach((cookie) => {
      const cookieName = cookie.split("=")[0].trim();
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
    });

    // Redirect the user
    router.push("/");
  };
  // const handleLogout = () => {
  //   localStorage.clear();
  //   cookies.remove("");

  //   // Clear cookies
  //   // const cookies = document.cookie.split(";");

  //   // for (let i = 0; i < cookies.length; i++) {
  //   //   const cookie = cookies[i];
  //   //   const eqPos = cookie.indexOf("=");
  //   //   const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
  //   //   document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
  //   // }

  //   router.push("/");
  // };

  // console.log(userData);

  // ? Image Upload

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    // Trigger the hidden file input click when the button is clicked
    fileInputRef.current?.click();
  };
  // console.log("userData ---------->",userData.customer_pid)
  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event?.target?.files?.[0];

    if (file) {
      // console.log("File selected:", file);

      const imageData = new FormData();
      imageData.append("attachments", file);
      imageData.append("ref_pid", userData?.user_pid);

      const printFormData = (formData: FormData) => {
        formData.forEach((value, key) => {
          // if (value instanceof File) {
          //   console.log(`${key}: File - ${value.name}`);
          // } else {
          //   console.log(`${key}: ${value}`);
          // }
        });
      };

      printFormData(imageData);

      try {
        // console.log("inside try");
        const response = await api.post(
          `/api/admin/update-profile-photo`,
          imageData
        );
        // console.log("Image uploaded successfully:", response?.data);
        refetch();
        if (response?.data?.meta?.status) {
          toast.success("Image updated successfully!", {
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
        console.error("Error uploading image:", error);
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
      }
    } else {
      // console.log("No file selected");
    }
  };

  return (
    <>
      <div className="bg-brandLsSecondary">
        <div className="container mx-auto">
          <div className="flex max-md:flex-col max-md:justify-center justify-between items-center">
            <div className="flex items-center max-md:flex-col max-md:justify-center justify-start">
              <div className="flex flex-col items-center py-8">
                <Image
                  src={userData?.profile_photo || "/images/user.png"}
                  alt="user image"
                  width={200}
                  height={200}
                  className="h-[200px] w-[200px] rounded-full border-2 border-successHover z-10"
                />
                <div className="z-20">
                  <input
                    type="file"
                    ref={fileInputRef} // Reference to the file input
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }} // Hides the default file input
                  />
                  <button
                    onClick={handleButtonClick} // Trigger file input click
                    className="-mt-4 bg-slate-200 opacity-70 p-2 flex items-center justify-center rounded-full"
                  >
                    <FaCamera size={18} />
                  </button>
                </div>
              </div>
              <div className="ml-5 my-2 font-normal text-brandPrimary">
                <h1 className="max-md:text-xl text-3xl mb-4">
                  {/* MD. Samiul Ahmed Protik */}
                  {userData.fname} {userData.lname}
                </h1>

                {/* <div className="flex flex-col lg:flex-row items-start lg:items-center gap-0 lg:gap-8 text-brandPrimary">
									@samiul333
								</div> */}
              </div>
            </div>
            <div>
              <button
                className="bg-dangerPrimary px-8 py-2 rounded-3xl text-sm text-bgPrimary"
                onClick={handleLogout}
              >
                {t("Logout")}
              </button>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default UserInfo;
