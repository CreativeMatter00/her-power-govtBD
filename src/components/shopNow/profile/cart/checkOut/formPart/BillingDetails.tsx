import { UseFormRegister } from "react-hook-form";
import CheckOutInput from "../checkOutInputs/CheckOutInput";
import LinksText from "../checkOutInputs/LinksText";
import CheckBoxInput from "../checkOutInputs/CheckBoxInput";
import { useTranslations } from "next-intl";

interface ValidationInfo {
  errors: any;
  register: UseFormRegister<any>;
}

const BillingDetails: React.FC<ValidationInfo> = ({ errors, register }) => {
  const t = useTranslations("talentHunt");

  return (
    <section className="mt-3">
      {/* ============================= TEXT INPUTS =============================== */}
      <div className="flex flex-col gap-4 ">
        {/* <CheckOutInput
					inputType="text"
					placeholderText="Enter your first name"
					name="firstName"
					label="First Name"
					errors={errors}
					register={register}
				/>

				<CheckOutInput
					inputType="text"
					placeholderText="Enter your last name"
					name="lastName"
					label="Last Name"
					errors={errors}
					register={register}
				/> */}

        <CheckOutInput
          inputType="text"
          placeholderText={t("Ex_House_number_and_street_name")}
          name="address"
          label={t("Address")}
          errors={errors}
          register={register}
        />

        <CheckOutInput
          inputType="text"
          placeholderText="Ex. Banani"
          name="area"
          label={t("Area")}
          errors={errors}
          register={register}
        />

        <CheckOutInput
          inputType="text"
          placeholderText="Ex. Dhaka - North"
          name="city"
          label={t("City")}
          errors={errors}
          register={register}
        />

        <CheckOutInput
          inputType="text"
          placeholderText="Ex. 1230"
          name="zipCode"
          label={t("Zip_Code")}
          errors={errors}
          register={register}
        />

        <CheckOutInput
          inputType="text"
          placeholderText={t("Enter_your_mobile_number")}
          name="phone"
          label={t("Phone")}
          errors={errors}
          register={register}
        />

        <CheckOutInput
          inputType="text"
          placeholderText={t("Enter_your_email_address")}
          name="emailAddress"
          label={t("Email_Address")}
          errors={errors}
          register={register}
        />
      </div>

      {/* ======================== SAVE CHANGES LINKS =========================== */}
      {/* <div className="mt-4 ml-6">
				<LinksText linksText="Save Changes" />
			</div> */}

      {/* ============================== OPTIONAL TEXT AREA & CHECK BOX ================================= */}
      <div className="flex flex-col gap-8 w-full mt-12">
        {/* ======================= CHECK BOX ==================== */}
        {/* <div className="font-bold">
					<CheckBoxInput
						inputText="My delivery and billing addresses are the same"
						fontWeightClass="font-bold"
					/>
				</div> */}

        {/* ====================== OPTIONAL TEXT AREA ======================== */}
        <div>
          <label className=" text-brandPrimary text-sm pl-6">
            {t("Description")}{" "}
            <span className="text-greyPrimary">({t("Optional")})</span>
          </label>
          <textarea
            rows={4}
            className="mt-1 block outline-none placeholder:text-greyPrimary text-base py-2 px-4 border border-brandLsPrimary rounded-md w-full bg-white resize-none"
            placeholder={t("Write_description_here")}
            {...register("description")}
          />
          {errors["description"] && (
            <p className="text-red-500 text-sm mt-1">
              {errors["description"]?.message}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default BillingDetails;
