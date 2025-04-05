"use client";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import AboutBusinessInput from "./AboutBusinessInput";
import { SubmitHandler, useForm, useFormContext } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AboutBusinessSchema from "./AboutBusinessSchema";
import ProductCategoryInput from "./ProductCategoryInput";
import SelectProductCategoryForm from "./SelectProductCategoryForm";
import { useTranslations } from "next-intl";

// ------- SELLER INFO SCHEME ------------------
interface BusinessInfo {
  storeName: string;
  address: string;
  area: string;
  city: string;
  zipCode: string;
  productCategory: string;
}

const AboutBusinessForm = ({ setActive }: { setActive: Function }) => {
  const t = useTranslations("talentHunt");

  // ----------------- RESOLVER PROBLEM NOT SOLVED ----------------------
  const resolver = yupResolver(AboutBusinessSchema);

  // -------------------------- REACT HOOK FORM --------------------------
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<BusinessInfo>();

  //   } = useForm<BusinessInfo>({ resolver });

  // ------------------ FORM DATA CONSOLE LOGGED ---------------------
  const onSubmit: SubmitHandler<BusinessInfo> = (data) =>{ console.log(data);
    setActive(3);
  }

  return (
    <>
      {/* ------------------ SELLER INFO FORM FOR ABOUT BUSINESS COMPONENT ----------------- */}
      <div>
        <div className="border border-brandLsPrimary rounded-lg p-4">
          <h1 className="text-brandDs font-bold text-base mx-4 pb-2 mb-2 border-b border-brandLsPrimary">
            {t("Seller_Information")}
          </h1>
          <div className="mx-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-4">
                <AboutBusinessInput
                  labelName={t("Store_Name")}
                  placeholderText={t("Enter_your_store_name_here")}
                  inputType="text"
                  inputName="storeName"
                  register={register}
                  errors={errors}
                  required={true}
                />
                {/* <ProductCategoryInput /> */}
                {/* changed by abdullah miraz */}
                {/* <SelectProductCategoryForm /> */}

                <AboutBusinessInput
                  labelName={t("Address")}
                  placeholderText={t("Enter_address_here")}
                  inputType="text"
                  inputName="address"
                  register={register}
                  errors={errors}
                  required={true}
                />
                <AboutBusinessInput
                  labelName={t("Area")}
                  placeholderText={t("Enter_area_here")}
                  inputType="text"
                  inputName="area"
                  register={register}
                  errors={errors}
                  required={true}
                />
                <AboutBusinessInput
                  labelName={t("City")}
                  placeholderText={t("Enter_city_here")}
                  inputType="text"
                  inputName="city"
                  register={register}
                  errors={errors}
                  required={true}
                />
                <AboutBusinessInput
                  labelName={t("Zip_Code")}
                  placeholderText={t("Enter_zip_code_here")}
                  inputType="text"
                  inputName="zipCode"
                  register={register}
                  errors={errors}
                  required={true}
                />
                <div className="mt-4 flex gap-4">
                  <button
                    type="button"
                    className="bg-link text-bgSecondary text-base font-medium flex items-center gap-2 rounded-3xl px-6 py-3"
                    onClick={() => setActive(1)}
                  >
                    <GoArrowLeft />
                    {t("Back")}
                  </button>
                  <button
                    type="submit" 
                    className="bg-link text-bgSecondary text-base font-medium flex items-center gap-2 rounded-3xl px-6 py-3"
                  >
                    {t("Continue")}
                    <GoArrowRight />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutBusinessForm;
