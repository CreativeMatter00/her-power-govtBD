"use client";
import { useQuery } from "@tanstack/react-query";
import ProfileField from "./fields/ProfileField";
import ShowImage from "./fields/ShowImage";
import { getSellerInfo } from "@/api/api";
import { useCookies } from "next-client-cookies";
import { useTranslations } from "next-intl";

interface SellerInfo {
	account_holder_name: string;
	account_number: string;
	active_order: number;
	annual_turnover: number | null;
	bank_code: string;
	bank_name: string;
	business_name: string;
	customer_address: string;
	customer_area_name: string;
	customer_city_name: string;
	customer_pid: string;
	customer_zip_postal_code: string;
	email: string;
	enterpenure_pid: string;
	fname: string;
	lname: string;
	mobile_no: string;
	name: string;
	nidimage_back_side: string;
	nidimage_front_side: string;
	number_product_sell: number | null;
	own_ecommerce_site: string | null;
	previous_order: number;
	product_from: string | null;
	profile_photo: string;
	sell_other_ecommerce: string | null;
	sell_other_websites: string;
	address_line: string;
	area_name: string;
	city_name: string;
	zip_postal_code: string;
	shop_name: string;
	signature_image: string;
	tax_id_image: string;
	tin_certificate_image: string;
	trade_license_image: string;
	user_pid: string;
	vat_id_image: string;
}

interface SellerInfoProps {
	sellerInfoData: SellerInfo;
}

const MyProfile = ({ sellerInfoData }: SellerInfoProps) => {
	const t = useTranslations("talentHunt");
	return (
		<>
			<div>
				{/* ================== HEADING ================ */}
				<div className="border-b border-brandLsPrimary">
					<h1 className="text-base text-brandDs font-bold pb-2">
						{t("My_Personal_Information")}
					</h1>
				</div>
				{/* ======================= PERSONAL DATA ===================== */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
					<ProfileField
						infoLabel={t("First_Name")}
						infoData={sellerInfoData?.fname}
					/>
					<ProfileField
						infoLabel={t("Last_Name")}
						infoData={sellerInfoData?.lname}
					/>
					<ProfileField
						infoLabel={t("Mobile_Number")}
						infoData={sellerInfoData?.mobile_no}
					/>
					<ProfileField infoLabel={t("Email")} infoData={sellerInfoData?.email} />
					<ProfileField
						infoLabel={t("Business_Name")}
						infoData={sellerInfoData?.business_name}
					/>
					<ProfileField
						infoLabel={t("Store_Name")}
						infoData={sellerInfoData?.shop_name}
					/>
					{/* //! have to implement later */}
					<ProfileField infoLabel={t("Product_Category")} infoData="Footwear" />
					{/*  //!-------------------------- */}
					<ProfileField
						infoLabel={t("Address")}
						infoData={sellerInfoData?.address_line}
					/>
					<ProfileField
						infoLabel={t("Area")}
						infoData={sellerInfoData?.area_name}
					/>
					<ProfileField
						infoLabel={t("City")}
						infoData={sellerInfoData?.city_name}
					/>
					<ProfileField
						infoLabel={t("Zip_Code")}
						infoData={sellerInfoData?.zip_postal_code}
					/>
					{/* //!------------------- */}
					<ProfileField infoLabel={t("What_your_Account_type")} infoData="Business" />
					<ProfileField
						infoLabel={t("Do_you_sell_in_other_websites")}
						infoData={sellerInfoData?.sell_other_websites === "1" ? "Yes" : "No"}
					/>
					<ProfileField
						infoLabel={t("Own_E-commerce")}
						infoData={sellerInfoData?.own_ecommerce_site}
					/>
					<ProfileField
						infoLabel={t("Where_do_you_get_products_from")}
						infoData={sellerInfoData?.product_from}
					/>
					<ProfileField
						infoLabel={t("your_annual_turnover")}
						infoData={sellerInfoData?.annual_turnover}
					/>
					{/* <ProfileField
						infoLabel={t("Enter_number_of_selling_products")}
						infoData={sellerInfoData?.number_product_sell}
					/>
					<ProfileField
						infoLabel={t("Active_Orders")}
						infoData={sellerInfoData?.active_order}
					/>
					<ProfileField
						infoLabel={t("Previous_Orders")}
						infoData={sellerInfoData?.previous_order}
					/> */}
					<ProfileField
						infoLabel={t("Bank_Name")}
						infoData={sellerInfoData?.bank_name}
					/>
					<ProfileField
						infoLabel={t("Branch_Code")}
						infoData={sellerInfoData?.bank_code}
					/>
					<ProfileField
						infoLabel={t("Account_Holder_Name")}
						infoData={sellerInfoData?.account_holder_name}
					/>

					<ProfileField
						infoLabel={t("Account_Number")}
						infoData={sellerInfoData?.account_number}
					/>
					<ShowImage
						labelName={t("NID_Card_photo_front")}
						selectedFile={sellerInfoData?.nidimage_front_side||""}
					/>
					<ShowImage
						labelName={t("NID_Card_photo_back")}
						selectedFile={sellerInfoData?.nidimage_back_side||""}
					/>
					<ShowImage
						labelName={t("Tin_copy")}
						selectedFile={sellerInfoData?.tin_certificate_image||""}
					/>
					<ShowImage
						labelName={t("signature_copy")}
						selectedFile={sellerInfoData?.signature_image||""}
					/>
					<ShowImage
						labelName={t("Trade_License")}
						selectedFile={sellerInfoData?.trade_license_image||""}
					/>
					<ShowImage
						labelName={t("Vat_ID")}
						selectedFile={sellerInfoData?.vat_id_image||""}
					/>
					<ShowImage
						labelName={t("Tax_ID")}
						selectedFile={sellerInfoData?.tax_id_image||""}
					/> 
				</div>
			</div>
		</>
	);
};

export default MyProfile;
