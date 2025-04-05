import { useQuery } from "@tanstack/react-query";
import WishlistCard from "./WishlistCard";
import { getWishlistProducts } from "@/api/api";
import ScaleLoader from "react-spinners/ScaleLoader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "next-client-cookies";
import { useTranslations } from "next-intl";

const Wishlist = () => {
  const t = useTranslations("talentHunt");

  const cookies = useCookies();
  const customerId = cookies.get("customer_pid") || "";

  // const userData = JSON.parse(localStorage.getItem("loginDetails") || "{}");
  // const customerId = userData.customer_pid;

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["getWishlistProducts"],
    queryFn: () => getWishlistProducts(customerId),
  });

  if (error)
    return (
      <div className="text-center text-xl font-md py-8">
        {t("Something_went_wrong")}
      </div>
    );

  return (
    <div>
      <div>
        {isLoading ? (
          <div className="flex items-center justify-center">
            <ScaleLoader color="#421957" height={70} radius={8} width={10} />
          </div>
        ) : (
          <div className="py-10">
            {data?.data?.length < 1 ? (
              <div className="text-center text-xl font-bold">
                {t("There_is_no_product_in_the_wishlist_for_this_customer")}
              </div>
            ) : (
              <>
                {data?.data?.map((product: any, index: number) => {
                  return (
                    <WishlistCard
                      key={index}
                      id={product.product_pid}
                      variantId={product.varient_pid}
                      image={product.img_wishlist}
                      title={product.product_name}
                      rating={product.avg_rating}
                      price={product.mrp}
                      refetch={refetch}
                    />
                  );
                })}
              </>
            )}
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Wishlist;
