
interface SellerInfo {
    account_holder_name: string;
    account_number: string;
    active_order: number;
    annual_turnover: number | null;
    account_type: string;
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
  
  export interface IEditInfo {
    setEditProfile: Function;
    sellerInfoData: SellerInfo;
    refetch: Function;
  }
  
  export interface SellerFormData {
    fname: string;
    lname: string;
    email: string;
    mobile_no: string;
    shop_name: string;
    business_name: string;
    seller_address: string;
    seller_area_name: string;
    seller_city_name: string;
    seller_zip_postal_code: string;
    bank_name: string;
    bank_code: string;
    account_holder_name: string;
    account_number: string;
    account_type: string;
    // profile_photo: string;
    nidimage_front_side: string;
    nidimage_back_side: string;
    tin_certificate_image: string;
    signature_image: string;
    trade_license_image: string;
    tax_id_image: string;
    vat_id_image: string;
    sell_other_websites: string | null;
    sell_other_ecommerce: string | null;
    own_ecommerce_site: string | null;
    product_from: string | null;
    annual_turnover: string | null;
    number_product_sell: string | null;
  }