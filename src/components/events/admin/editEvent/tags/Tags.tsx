import { useFormContext } from "react-hook-form";
import { BsInfoCircle } from "react-icons/bs";
import CreateEventHeading from "../CreateEventHeading";
import CreateEventInputField from "../inputFields/CreateEventInputField";
import { useEffect } from "react";

const Tags = ({eventData}:{eventData?:any}) => {
  const {
    register,
    formState: { errors },
    reset,
    watch,
    handleSubmit,
  } = useFormContext();

  useEffect(()=>{
    if(eventData){
      reset({tags: eventData.tage})
    }
  },[reset, eventData])

  return (
    <section className="my-8">
      <main className="flex flex-col gap-4">
        <CreateEventHeading heading="Tags" />

        {/* ============================================== INPUT FIELD & BUTTON =============================== */}
        <div className="flex items-end gap-6">
          <CreateEventInputField
            label="Tags"
            name="tags"
            inputType="text"
            placeholderText="Enter tags"
            errors={errors}
            register={register}
            required={true}
          />
          {/* ------------------------- BUTTON -------------------- */}
          {/* <button className="bg-link font-medium text-sm text-bgPrimary rounded-full px-8 py-3 h-fit">
            Done
          </button> */}
        </div>

        {/* ================================================= MORE INFO ============================== */}
        <div className="flex items-center gap-2">
          <BsInfoCircle />
          <p className="text-sm text-greyPrimary">Separate tags with commas</p>
        </div>
      </main>
    </section>
  );
};

export default Tags;
