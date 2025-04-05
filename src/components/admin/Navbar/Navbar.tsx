import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logo from "@/components/ui/logo/Logo";
import { LogOut } from "lucide-react";
import Image from "next/image";
import { RiArrowDownSLine, RiLockPasswordFill } from "react-icons/ri";
import { useRouter } from "next/navigation";
interface IProps {
	isSidebarVisible: boolean;
	setSidebarVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<IProps> = ({ isSidebarVisible, setSidebarVisible }) => {
	const router = useRouter();
	const handleLogout = () => {
		localStorage.clear();
		// cookies.remove("");
		document.cookie.split(";").forEach((cookie) => {
		  const cookieName = cookie.split("=")[0].trim();
		  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
		});
	
		// Clear cookies
		// const cookies = document.cookie.split(";");
	
		// for (let i = 0; i < cookies.length; i++) {
		//   const cookie = cookies[i];
		//   const eqPos = cookie.indexOf("=");
		//   const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
		//   document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
		// }
		router.push("/");
	  };
	return (
		<>
			<nav className="bg-[#F2F2F2] w-full fixed left-0 top-0 h-16 z-50">
				<div className="flex justify-between items-center px-12 h-full">
					{/* =================== LEFT SIDE ================== */}
					<div onClick={() => router.push('/')} className="cursor-pointer">
					<Logo
						logoHeight="h-14"
						logoWidth="w-10"
						text={true}
						textHeight="h-14"
						textWidth="w-20"
					/>

					</div>

					{/* =================== RIGHT SIDE ================== */}
					<div className="flex items-center gap-2">
						{/* =================== PROFILE PICTURE ===================== */}
						<Image
							src={"/assets/images/navbar/admin.png"}
							alt=""
							width={30}
							height={30}
							className="rounded-full"
						/>
						{/* ===================== PROFILE OPTION ================== */}
						<DropdownMenu>
							{/* ==================== BUTTON ==================== */}
							<DropdownMenuTrigger asChild>
								<button className="cursor-pointer outline-none">
									<RiArrowDownSLine className="w-5 h-5" />
								</button>
							</DropdownMenuTrigger>

							{/* ============ CONTENT =============== */}
							<DropdownMenuContent className="w-48 mr-6">
								{/* ========= PROFILE ========== */}
								{/* <DropdownMenuItem className="border-b flex items-start">
									<User className="mr-2 h-4 w-4" />
									<span className="pb-1">Profile</span>
								</DropdownMenuItem> */}

								{/* ========= CHANGE PASSWORD ======== */}
								{/* <DropdownMenuItem className="border-b flex items-start">
									<RiLockPasswordFill className="mr-2 h-4 w-4" />
									<span className="pb-2">Change Password</span>
								</DropdownMenuItem> */}

								{/* ====== LOGOUT ========== */}
								<DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
									<LogOut className="mr-2 h-4 w-4" />
									<span>Log out</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</nav>
		</>
	);
};

export default Navbar;
