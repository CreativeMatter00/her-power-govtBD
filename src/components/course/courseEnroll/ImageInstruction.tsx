const ImageInstruction = () => {
  return (
    <>
      <div className="text-[#763B90]">
        <h1 className="text-xl font-bold">Photo uploading instruction:</h1>
        <ul className="text-sm pl-8">
          <li className="list-disc">Upload image file only (jpg, jpeg, png)</li>
          <li className="list-disc">
            The photo must be of passport size and be less than one month old{" "}
          </li>
          <li className="list-disc">
            Minimum size of the image shall be 25KB and maximum size shall be
            1024KB
          </li>
          <li className="list-disc">
            The image must show full frontal view Side way image shall not be
            accepted
          </li>
        </ul>
      </div>
    </>
  );
};

export default ImageInstruction;
