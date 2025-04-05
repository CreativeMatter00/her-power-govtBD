import AllProduct from "@/components/shopNow/home/AllProduct";
import Category from "@/components/shopNow/home/Category";
import Hero from "@/components/shopNow/home/Hero";
import NewProducts from "@/components/shopNow/home/NewProducts";
import PopularProducts from "@/components/shopNow/home/PopularProducts";
import Search from "@/components/shopNow/home/Search";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const page = () => {
	return (
		<div>
			<Hero />
			<Search />
			<NewProducts />
			<PopularProducts />
			<Category />
			<AllProduct />
			<ToastContainer />
		</div>
	);
};

export default page;
