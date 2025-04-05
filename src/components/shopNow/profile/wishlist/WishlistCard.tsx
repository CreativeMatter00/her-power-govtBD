import { url } from "@/api/api";
import StarRating from "@/components/shared/RenderStars";
import { addToCart } from "@/redux/Reducer/CartSlice";
import { removeFromWishList } from "@/redux/Reducer/WishListSlice";
import axios from "axios";
import { useCookies } from "next-client-cookies";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type IWishlistCard = {
  id: string;
  variantId: string;
  image: string;
  title: string;
  rating: number;
  price: number;
  refetch: any;
};

const WishlistCard = (props: IWishlistCard) => {
  const locale = useLocale();
const cookies = useCookies();
	const customerId = cookies.get("customer_pid") || ""
  // ? Getting Customer ID
  // const userData = JSON.parse(localStorage.getItem("loginDetails") || "{}");
  // const customerId = userData.customer_pid;

const dispatch = useDispatch();

  const handleDelete = async () => {
    dispatch(removeFromWishList(props.id));
    try {
      const response = await axios.delete(
        `${url}/api/admin/wishlist/${customerId},${props.id}`
      );
      // console.log("Response:", response.data);
      toast.success("Product removed form wishlist successfully.", {
        position: "bottom-left",
        autoClose: 3001,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      props.refetch();
    } catch (error) {
      toast.error("Something went wrong", {
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
  };

  // ? Product Add to cart

  //   const dispatch = useDispatch();

  const handleAddToCart = () => {
    const product = {
      id: props?.id,
      quantity: 1,
      variantId: props?.variantId,
    };

    const cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart") as string)
      : { products: [] };

    cart.products = cart.products || [];

    const existingProductIndex = cart.products.findIndex(
      (p: { id: string; variantId: string }) =>
        p.id === product.id && p.variantId === product.variantId
    );

    if (existingProductIndex >= 0) {
      cart.products[existingProductIndex].quantity += product.quantity;
    } else {
      cart.products.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    toast.success("Product added to cart successfully!", {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    handleDelete();
  };

  return (
    <div className="mb-8">
      <div className="flex gap-4">
        <div className="h-[100px] w-[100px] lg:h-[160px] lg:w-[157px] flex items-center justify-center mx-auto">
          <Image
            src={props.image}
            height={150}
            width={150}
            alt="product"
            className="h-full w-auto object-contain mx-auto rounded-lg"
          />
        </div>

        <div className="flex-grow flex flex-col justify-between">
          <div>
            <Link
              href={`/${locale}/shop-now/products/${props.id}`}
              className="text-brandPrimary text-base break-all line-clamp-2 lg:text-xl hover:underline"
            >
              {props.title}
            </Link>
            <div className="flex items-center text-base lg:text-xl">
              <div className="flex items-center text-warning">
                <StarRating rating={props.rating} />
              </div>
              <p className="text-brandPrimary px-4"> {props.rating} / 5 </p>
            </div>
          </div>

          <div className="block lg:hidden">
            <p className="text-grey"> Price </p>
            <p className="text-brandDs text-2xl"> {props.price}tk. </p>
          </div>
        </div>

        <div className="text-right flex-col justify-between hidden lg:flex">
          <div>
            <p className="text-grey"> Price </p>
            <p className="text-brandDs text-2xl"> {props.price}tk. </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              className="border-2 border-brandPrimary text-brandPrimary hover:bg-brandLsPrimary transition-all duration-300 text-xl rounded-full p-4"
              onClick={() => handleDelete()}
            >
              <MdDelete />
            </button>

            <button
              className="px-10 py-4 text-white bg-brandPrimary hover:bg-brandDs transition-all duration-300 rounded-full"
              onClick={() => handleAddToCart()}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-end gap-4 lg:hidden">
        <button className="px-10 py-4 text-white bg-brandPrimary rounded-full">
          Add to cart
        </button>
        <button
          className="border-2 border-brandPrimary text-brandPrimary text-xl rounded-full p-4"
          onClick={handleDelete}
        >
          <MdDelete />
        </button>
      </div>
    </div>
  );
};

export default WishlistCard;
