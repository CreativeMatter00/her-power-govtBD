interface Props {
  examName: string;
  examFee?: string;
}
const ExamHeading: React.FC<Props> = ({ examName, examFee }) => {
  return (
    <>
      <div className="">
        <div className="flex justify-between items-center font-bold">
          {/* --------------------- bcs exam step name ---------------------------------- */}
          <div className="text-[#000000 text-2xl]">Course {examName}</div>
          {examFee && (
            <div className="flex justify-center items-start text-[#252525] mt-3">
              <p className="text-xl">TK</p>
              {/* -------------------- bcs different exam step fee --------------------- */}
              <p className="text-4xl">{examFee}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ExamHeading;
