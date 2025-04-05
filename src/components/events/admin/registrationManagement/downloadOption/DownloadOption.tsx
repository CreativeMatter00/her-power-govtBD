import { DownloadArrowIcon } from "@/components/ui/icon/EventsIcon";

const DownloadOption = () => {
	return (
		<>
			<div className="flex justify-between items-center pt-6">
				{/* =========================== EVENT LIST ============================ */}
				<p className="text-base text-brandDs font-bold">All Event List</p>

				{/* ========================== DOWNLOAD OPTION =================== */}
				{/* <button className="flex items-center gap-2 px-8 py-3 rounded-full bg-success hover:bg-successHover">
					<DownloadArrowIcon />
					<span className="text-sm text-bgSecondary font-medium">
						Download list
					</span>
				</button> */}
			</div>
		</>
	);
};

export default DownloadOption;
