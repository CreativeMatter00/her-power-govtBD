import Buttons from "../courses/Buttons";
import DashboardTable from "../courses/DashboardTable";
import Overview from "./Overview";
import ProfileHeader from "./ProfileHeader";
import ProviderInfo from "./ProviderInfo";
import SearchBar from "./SearchBar";

const Dashboard = () => {
	return (
		<>
			<section className="">
				<main className="container">
					<ProviderInfo />
				</main>
			</section>
		</>
	);
};

export default Dashboard;
