// =================================== PROPS TYPE DEFINITION ===================
interface FieldInfo {
	infoLabel: string;
	infoData?: string | number | null;
}

const ProfileField: React.FC<FieldInfo> = ({ infoLabel, infoData }) => {
	return (
		<div>
			{/* =========================== LABEL ================ */}
			<h1 className="text-greyPrimary text-sm pl-6">{infoLabel}</h1>
			{/* ================================== DATA ======================== */}
			<p className="mt-1 text-base text-brandPrimary py-2 px-6  w-full">
				{infoData}
			</p>
		</div>
	);
};

export default ProfileField;
