import { MdLogin } from "react-icons/md";

const LoginNav = () => {
	return (
		<button className="group border-2 border-brandPrimary hover:border-brandDs text-brandPrimary hover:text-brandDs flex py-1.5 justify-center items-center px-4 rounded-[40px] gap-2 max-lg:border-none max-lg:w-full max-lg:bg-[#763B90] max-lg:rounded-none max-lg:text-base max-lg:font-bold max-lg:text-white max-lg:hover:text-white ">
			<MdLogin
				fontSize={20}
				className="group-hover:text-brandDs max-lg:group-hover:text-white cursor-pointer"
			/>
			login
		</button>
	);
};

export default LoginNav;
