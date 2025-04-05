import Image from "next/image";
import { useForm, useFormContext } from "react-hook-form";
import ConfirmAccountInfo from "./ConfirmAccountInfo";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { url } from "@/api/api";
import { useTranslations } from "next-intl";
import { useCookies } from "next-client-cookies";

const ConfirmAccount = ({
  setActive,
  setVerifyEmail,
  setEmail,
}: {
  setActive: Function;
  setVerifyEmail: Function;
  setEmail: Function;
}) => {
  const t = useTranslations("talentHunt");

  const { getValues } = useFormContext();
//   const router = useRouter();
// const cookies = useCookies();
  const formData = getValues();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const getStatus = (sectionData: any) => {
    const hasEmptyField = Object.values(sectionData).some(
      (value) => value === null || value === "" || value === undefined
    );
    return hasEmptyField ? "error" : "completed";
  };

  const onSubmit = async () => {
    const formattedData = {
      business_name: formData.businessName,
      fname: formData.firstName,
      lname: formData.lastName,
      mobile_no: formData.mobileNumber,
      email: formData.email,
      password: formData.password,
      confirm_password: formData.confirmPassword,
      shop_name: formData.storeName,
      product_category: formData.selectedProductCategory,
      address_line: formData.address,
      area_name: formData.area,
      city_name: formData.city,
      zip_postal_code: formData.zipCode,
      bank_name: formData.bankName,
      bank_code: formData.branchCode,
      account_holder_name: formData.accountHolder,
      account_number: formData.accountNumber,
      nidimage_front_side: formData.nidFrontSide,
      nidimage_back_side: formData.nidEndSide,
      tin_certificate_image: formData.tinCertificate,
      signature_image: formData.signature,
      trade_license_image: formData.tradeLicense,
      vat_id_image: formData.vatID,
      tax_id_image: formData.taxID,
      account_type: formData.accountType,
      sell_other_websites: formData.sellInOtherWebsites,
      sell_other_ecommerce: formData.sellInEcommerceMarketplaces,
      own_ecommerce_site: formData.ecommerceWebsite,
      product_from: formData.productSource,
      annual_turnover: formData.annualTurnover,
      number_product_sell: formData.numberOfProducts,
    };
    const data = formattedData;
    setEmail(data?.email);
    await axios
      .post(`${url}/api/seller-registration`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res?.data?.success === true) {
          toast.success("Successfully Registered!", {
            position: "bottom-left",
            autoClose: 3001,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        else{
          toast.error("Registration failed. Please try again.", {
            position: "bottom-left",
            autoClose: 3001,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        return res.data; 
      })
      .then((data) => {
        if (data?.success) {
          setTimeout(() => {
            setVerifyEmail(true);
          }, 4000);
        }
      })
      .catch((error) => {
        console.error("Error during submission:",error);
        toast.error(`${error?.response?.data?.message ||error?.response?.data?.meta?.message|| ""}`, {
                  position: "bottom-left",
                  autoClose: 3001,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
      });
  };

  const formattedStatusDataCheck = {
    personalInfo: {
      fname: formData.firstName,
      lname: formData.lastName,
      mobile_no: formData.mobileNumber,
      email: formData.email,
      password: formData.password,
      confirm_password: formData.confirmPassword,
    },
    sellerInfo: {
      shop_name: formData.storeName,
      address_line: formData.address,
      area_name: formData.area,
      city_name: formData.city,
      zip_postal_code: formData.zipCode,
    },
    bankDetails: {},
    documents: {
      bank_name: formData.bankName,
      bank_code: formData.branchCode,
      account_holder_name: formData.accountHolder,
      account_number: formData.accountNumber,
      nidimage_front_side: formData.nidFrontSide,
      nidimage_back_side: formData.nidEndSide,
      tin_certificate_image: formData.tinCertificate,
      signature_image: formData.signature,
      trade_license_image: formData.tradeLicense,
      vat_id_image: formData.vatID,
      tax_id_image: formData.taxID,
    },
    inquiries: {
      account_type: formData.accountType,
      sell_other_websites: formData.sellInOtherWebsites,
      sell_other_ecommerce: formData.sellInEcommerceMarketplaces,
      // own_ecommerce_site: formData.ecommerceWebsite,
      product_from: formData.productSource,
      annual_turnover: formData.annualTurnover,
      number_product_sell: formData.numberOfProducts,
    },
  };

  return (
    <section className="container mx-auto p-4">
      <h1 className="text-2xl md:text-3xl text-brandPrimary my-4">
        {t("Confirm_Seller_Account")}
      </h1>

      <main className="flex flex-col gap-4">
        {/* <ConfirmAccountInfo
					title="Business Name"
					status={getStatus(formattedStatusDataCheck.businessName)}
				/> */}
        <ConfirmAccountInfo
          title={t("Personal Information")}
          status={getStatus(formattedStatusDataCheck.personalInfo)}
        />
        <ConfirmAccountInfo
          title={t("Seller_Information")}
          status={getStatus(formattedStatusDataCheck.sellerInfo)}
        />
        <ConfirmAccountInfo
          title={t("Interview")}
          status={getStatus(formattedStatusDataCheck.inquiries)}
        />
        <ConfirmAccountInfo
          title={t("Documents")}
          status={getStatus(formattedStatusDataCheck.documents)}
        />
      </main>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-end mt-4 gap-4">
          <div className="flex justify-center items-center gap-3 border border-link rounded-3xl py-2 px-6">
            <Image
              src={"/assets/images/shop-now/registration form/rocket.png"}
              alt="rocket"
              width={23}
              height={23}
              className="w-auto h-6"
            />
            <button className="font-medium text-link text-lg" type="submit">
              {t("Launch_Your_Business")}
            </button>
          </div>
        </div>
      </form>

      <ToastContainer />
    </section>
  );
};

export default ConfirmAccount;
