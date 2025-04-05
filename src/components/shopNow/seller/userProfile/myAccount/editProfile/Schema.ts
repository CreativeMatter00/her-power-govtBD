import * as Yup from "yup";
export const sellerValidationSchema = Yup.object().shape({
  fname: Yup.string().required("First name is required"), //ok
  lname: Yup.string().required("Last name is required"), //ok
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"), //ok
  mobile_no: Yup.string().required("Mobile number is required"), //ok
  shop_name: Yup.string().required("Shop name is required"), //ok
  business_name: Yup.string().required("Business name is required"),
  seller_address: Yup.string().required("Seller address is required"), //ok
  seller_area_name: Yup.string().required("Seller area name is required"), //ok
  seller_city_name: Yup.string().required("Seller city name is required"), //ok
  seller_zip_postal_code: Yup.string().required(
    "Seller zip/postal code is required"
  ), //ok
  bank_name: Yup.string().required("Bank name is required"), //ok
  bank_code: Yup.string().required("Bank code is required"), //ok
  account_holder_name: Yup.string().required("Account holder name is required"), //ok
  account_number: Yup.string().required("Account number is required"), //ok
  product_from: Yup.string().nullable(), //ok
  account_type: Yup.string().nullable(), //ok
  sell_other_websites: Yup.string().nullable(), //ok
  sell_other_ecommerce: Yup.string().nullable(), //ok
  own_ecommerce_site: Yup.string().nullable(), //ok
  annual_turnover: Yup.string().nullable(), //ok
  number_product_sell: Yup.string().nullable(), //ok
});
