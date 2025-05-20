import React, { useState } from "react";
import EditInputField from "./fields/EditInputField";
import InputImage from "./fields/InputImage";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import RadioInput from "./fields/RadioInput";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useCookies } from "next-client-cookies";
import { sellerValidationSchema } from "./Schema";
import { IEditInfo, SellerFormData } from "./EditProfileFormI";
import ScaleLoader from "react-spinners/ScaleLoader";
import { api } from "@/api/api";
import { useTranslations } from "next-intl";


const EditProfileForm: React.FC<IEditInfo> = ({
  setEditProfile,
  sellerInfoData,
  refetch,
}) => {
  const t = useTranslations("talentHunt");
  const [nidFrontSide, setNidFrontSide] = useState<any | null>();
  const [nidEndSide, setNidEndSide] = useState<any | null>();
  const [tinCertificate, setTinCertificate] = useState<any | null>();
  const [signature, setSignature] = useState<any | null>();
  const [tradeLicense, setTradeLicense] = useState<any | null>();
  const [vatID, setVatID] = useState<any | null>();
  const [taxID, setTaxID] = useState<any | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const cookies = useCookies();
  const entrepreneurPid = cookies.get("enterpenure_pid");
  const email= cookies.get("email");
  const handleCancel = () => {
    setEditProfile(false);
  };
  const onSubmit = async (data: any) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("fname", data.fname);
    formData.append("lname", data.lname);
    formData.append("mobile_no", data.mobile_no);
    formData.append("email", email||"");
    formData.append("shop_name", data.shop_name);
    formData.append("business_name", data.business_name);
    formData.append("seller_address", data.seller_address);
    formData.append("seller_area_name", data.seller_area_name);
    formData.append("seller_city_name", data.seller_city_name);
    formData.append("seller_zip_postal_code", data.seller_zip_postal_code);
    formData.append("bank_name", data.bank_name);
    formData.append("bank_code", data.bank_code);
    formData.append("account_holder_name", data.account_holder_name);
    formData.append("account_number", data.account_number);
    formData.append("product_from", data.product_from);
    formData.append("account_type", data.account_type);
    formData.append("sell_other_websites", data?.sell_other_websites || "");
    formData.append("sell_other_ecommerce", data?.sell_other_ecommerce || "");
    formData.append("own_ecommerce_site", data.own_ecommerce_site);
    formData.append("annual_turnover", data.annual_turnover);
    if (nidFrontSide) formData.append("nidimage_front_side", nidFrontSide);
    if (nidEndSide) formData.append("nidimage_back_side", nidEndSide);
    if (tinCertificate)
      formData.append("tin_certificate_image", tinCertificate);
    if (signature) formData.append("signature_image", signature);
    if (tradeLicense) formData.append("trade_license_image", tradeLicense);
    if (taxID) formData.append("tax_id_image", taxID);
    if (vatID) formData.append("vat_id_image", vatID);

    try {
      const response = await api.post(
        `/api/admin/entrepreneur-info-update/${entrepreneurPid}`,
        formData
      );
      
      if (response?.status === 200) {
        toast.success("User Updated successfully!", {
          position: "bottom-left",
          autoClose: 3001,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(()=>{
          refetch();
          reset();
          handleCancel();
        },3000)
      } else {
        // console.log(response);
        toast.error("Failed to updating user information. Please try again.", {
          position: "bottom-left",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error updating user information:", error);

      toast.error("An error occurred. Please try again.", {
        position: "bottom-left",
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<SellerFormData>({
    // resolver: yupResolver(sellerValidationSchema),
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <ScaleLoader color="#421957" height={70} radius={8} width={10} />
      </div>
    );
  return (
    <div>
      <ToastContainer className={"z-50"} />
      <div className="border-b border-brandLsPrimary">
        {/* ========================= HEADING ========================= */}
        <h1 className="text-base text-brandDs font-bold pb-2">
          {t("My_Personal_Information")}
        </h1>
      </div>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        {/* ======================= PERSONAL DATA ===================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
          <EditInputField
            labelName={t("First_Name")}
            fieldName="fname"
            defaultData={sellerInfoData?.fname}
            register={register}
            errors={errors}
            type="text"
          />
          <EditInputField
            labelName={t("Last_Name")}
            fieldName="lname"
            defaultData={sellerInfoData?.lname}
            register={register}
            errors={errors}
            type="text"
          />
          <EditInputField
            labelName={t("Mobile_Number")}
            fieldName="mobile_no"
            defaultData={sellerInfoData?.mobile_no}
            register={register}
            errors={errors}
            type="number"
          />
          {/* <EditInputField
            labelName={t("Email")}
            fieldName="email"
            defaultData={sellerInfoData?.email}
            register={register}
            errors={errors}
            type="email"
          /> */}
          <EditInputField
            labelName={t("Business_Name")}
            fieldName="business_name"
            defaultData={sellerInfoData?.business_name}
            register={register}
            errors={errors}
            type="text"
          />
          <EditInputField
            labelName={t("Store_Name")}
            fieldName="shop_name"
            defaultData={sellerInfoData?.shop_name}
            register={register}
            errors={errors}
            type="text"
          />
          <EditInputField
            labelName={t("Product_From")}
            fieldName="product_from"
            defaultData={sellerInfoData?.product_from}
            register={register}
            errors={errors}
            type="text"
          />
          <EditInputField
            labelName={t("Address")}
            fieldName="seller_address"
            defaultData={sellerInfoData?.address_line}
            register={register}
            errors={errors}
            type="text"
          />
          <EditInputField
            labelName={t("Area")}
            fieldName="seller_area_name"
            defaultData={sellerInfoData?.area_name}
            register={register}
            errors={errors}
            type="text"
          />
          <EditInputField
            labelName={t("City")}
            fieldName="seller_city_name"
            defaultData={sellerInfoData?.city_name}
            register={register}
            errors={errors}
            type="text"
          />
          <EditInputField
            labelName={t("Zip_Code")}
            fieldName="seller_zip_postal_code"
            defaultData={sellerInfoData?.zip_postal_code}
            register={register}
            errors={errors}
            type="number"
          />

          <EditInputField
            labelName={t("Own_E-commerce")}
            fieldName="own_ecommerce_site"
            defaultData={sellerInfoData?.own_ecommerce_site}
            register={register}
            errors={errors}
            type="text"
          />

          <RadioInput
            title={t("What_your_Account_type")}
            defaultValueInput={sellerInfoData?.account_type}
            labelNameOne={t("Individual")}
            labelNameTwo={t("Business")}
            idOne="individual"
            idTwo="business"
            valueOne="1"
            valueTwo="0"
            htmlForAttributeOne="individual"
            htmlForAttributeTwo="business"
            buttonStyle="flex gap-12 items-center"
            topMargin="mt-2"
            control={control}
            fieldName="account_type"
            errors={errors}
          />

          <RadioInput
            title={t("Do_you_sell_in_other_websites")}
            defaultValueInput={sellerInfoData?.sell_other_websites}
            labelNameOne={t("Yes")}
            labelNameTwo={t("No")}
            idOne="yes"
            idTwo="no"
            valueOne="1"
            valueTwo="0"
            htmlForAttributeOne="yes"
            htmlForAttributeTwo="2"
            buttonStyle="flex gap-12 items-center"
            topMargin="mt-2"
            control={control}
            fieldName="sell_other_websites"
            errors={errors}
          />

          <RadioInput
            title={t("any_other_Ecommerce_market_places")}
            defaultValueInput={sellerInfoData?.sell_other_ecommerce}
            labelNameOne={t("Yes")}
            labelNameTwo={t("No")}
            idOne="yes"
            idTwo="no"
            valueOne="1"
            valueTwo="0"
            htmlForAttributeOne="yes"
            htmlForAttributeTwo="no"
            buttonStyle="flex gap-12 items-center"
            topMargin="mt-2"
            control={control}
            fieldName="sell_other_ecommerce"
            errors={errors}
          />

          <EditInputField
            labelName={t("your_annual_turnover")}
            fieldName="annual_turnover"
            defaultData={sellerInfoData?.annual_turnover}
            register={register}
            errors={errors}
            type="number"
          />
          <EditInputField
            labelName={t("How_many_products_do_you_sell")}
            fieldName="number_product_sell"
            defaultData={sellerInfoData?.number_product_sell}
            register={register}
            errors={errors}
            type="number"
          />
          <EditInputField
            labelName={t("Bank_Name")}
            fieldName="bank_name"
            defaultData={sellerInfoData?.bank_name}
            register={register}
            errors={errors}
            type="text"
          />
          <EditInputField
            labelName={t("Branch_Code")}
            fieldName="bank_code"
            defaultData={sellerInfoData?.bank_code}
            register={register}
            errors={errors}
            type="text"
          />
          <EditInputField
            labelName={t("Account_Holder_Name")}
            fieldName="account_holder_name"
            defaultData={sellerInfoData?.account_holder_name}
            register={register}
            errors={errors}
            type="text"
          />
          <EditInputField
            labelName={t("Account_Number")}
            fieldName="account_number"
            defaultData={sellerInfoData?.account_number}
            register={register}
            errors={errors}
            type="number"
          />
          <div>
            <InputImage
              labelName={t("NID_Card_photo_front")}
              selectedFile={nidFrontSide}
              setSelectedFile={setNidFrontSide}
              defaultImage={sellerInfoData?.nidimage_front_side}
            />
          </div>
          <div>
            <InputImage
              labelName={t("NID_Card_photo_back")}
              selectedFile={nidEndSide}
              setSelectedFile={setNidEndSide}
              defaultImage={sellerInfoData?.nidimage_back_side}
            />
          </div>
          <div>
            <InputImage
              labelName={t("Tin_copy")}
              selectedFile={tinCertificate}
              setSelectedFile={setTinCertificate}
              defaultImage={sellerInfoData?.tin_certificate_image}
            />
          </div>
          <div>
            <InputImage
              labelName={t("signature_copy")}
              selectedFile={signature}
              setSelectedFile={setSignature}
              defaultImage={sellerInfoData?.signature_image}
            />
          </div>
          <div>
            <InputImage
              labelName={t("Trade_License")}
              selectedFile={tradeLicense}
              setSelectedFile={setTradeLicense}
              defaultImage={sellerInfoData?.trade_license_image}
            />
          </div>
          <div>
            <InputImage
              labelName={t("Vat_ID")}
              selectedFile={vatID}
              setSelectedFile={setVatID}
              defaultImage={sellerInfoData?.vat_id_image}
            />
          </div>
          <div>
            <InputImage
              labelName={t("Tax_ID")}
              selectedFile={taxID}
              setSelectedFile={setTaxID}
              defaultImage={sellerInfoData.tax_id_image}
            />
          </div>
        </div>

        <div className="mt-4 flex items-center gap-8">
          <button
            type="submit"
            className="bg-link text-white text-base font-bold py-2 px-6 rounded-md"
          >
            {t("Save_Changes")}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-dangerPrimary text-white text-base font-bold py-2 px-6 rounded-md"
          >
            {t("Cancel")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm;
