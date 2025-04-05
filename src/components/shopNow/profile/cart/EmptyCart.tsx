import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { TbShoppingBag } from "react-icons/tb";

const EmptyCart = () => {
	const locale = useLocale();
const t = useTranslations("ProductDetails");
	return (
		<div>
			<div className="py-4 ">
				<Image
					src="/assets/images/shop-now/cart/cart.png"
					width={263}
					height={211}
					alt="cart"
					className="mx-auto"
				/>
			</div>

			<div className="py-10 text-center">
				<p className="text-5xl mb-6">
					{t("Your Cart is")} <span className="text-dangerPrimary"> {t("Empty")} </span>
				</p>
				<p className="text-brandPrimary mb-10">
					{t("Must add items on the cart before you proceed to checkout")}
				</p>

				<Link href={`/${locale}/shop-now/`}>
					<button className="flex items-center gap-4 text-brandPrimary mx-auto border border-brandPrimary rounded-full py-4 px-10 font-medium hover:bg-brandPrimary hover:text-white duration-300">
						<TbShoppingBag /> {t("Return to Shop")}
					</button>
				</Link>
			</div>
		</div>
	);
};

export default EmptyCart;
