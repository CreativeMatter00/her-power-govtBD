interface HeadingInfo {
  heading: string;
  option?: string;
}

const HeadingPart: React.FC<HeadingInfo> = ({ heading, option }) => {
  return (
    <>
      <div>
        <p className="text-brandDs font-bold">
          {/* ======================== MAIN HEADING ============================= */}
          {heading} &nbsp;
          {/* ============================ OPTIONAL HEADING ======================= */}
          <span className="text-greyPrimary text-sm font-normal">{`(${option})`}</span>
        </p>
      </div>
    </>
  );
};

export default HeadingPart;
