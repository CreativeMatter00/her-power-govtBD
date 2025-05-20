"use client";

import { useFieldArray, useForm } from "react-hook-form";
import InputField from "../inputFields/InputField";
import { FaMinus, FaPlus } from "react-icons/fa";
import axios from "axios";
import { api, getUserInfo, url } from "../../../../api/api";
import { useCookies } from "next-client-cookies";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { courseProviderSchema } from "../schema/courseProviderSchema";
import DateField from "../inputFields/DateField";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

const CourseProviderRegistration = () => {
  const cookies = useCookies();
  const userId = cookies.get("user_pid");
  const locale = useLocale();
  const router = useRouter();
  // console.log(userId);
  if (!userId) {
    // alert("User Must Login First: No User PID Found");
    // <ScaleLoader />;
  }

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => getUserInfo(userId as any),
  });

  // console.log(data);
  const userEmail = data?.email;
  const userMobileNo = data?.mobile_no;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
    watch,
  } = useForm<any>({
    resolver: yupResolver(courseProviderSchema),

    defaultValues: {
      expertise: [
        {
          workAs: "",
          experienceTime: "",
          instituteName: "",
          relevantDegree: "",
        },
      ],
      education: [
        {
          degree: "",
          group: "",
          passing_year: 1980,
          result: 0.0,
          gpa_cgpa_outof: 0,
        },
      ],
      branch: [{ branchName: "", branchLocation: "" }],
      hasBranches: false,
    },
  });
  const hasBranches = watch("hasBranches");
  const {
    fields: expertiseFields,
    append: appendExpertise,
    remove: removeExpertise,
  } = useFieldArray({ control, name: "expertise" });
  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({ control, name: "education" });

  const {
    fields: branchFields,
    append: appendBranch,
    remove: removeBranch,
  } = useFieldArray({ control, name: "branch" });

  const addExpertise = () =>
    appendExpertise({
      workAs: "",
      experienceTime: "",
      instituteName: "",
      relevantDegree: "",
    });
  const removeExpertiseSection = (index: number) => {
    if (expertiseFields?.length > 1) removeExpertise(index);
  };
  const addEducation = () =>
    appendEducation({ degree: "", dept: "", passingYear: 1980, cgpa: 5 });
  const removeEducationSection = (index: number) => {
    if (educationFields?.length > 1) removeEducation(index);
  };
  const addBranch = () => appendBranch({ branchName: "", branchLocation: "" });
  const removeBranchSection = (index: number) => {
    if (branchFields?.length > 1) removeBranch(index);
  };

  const onSubmit = async (data: any) => {
    // console.log(data);

    const dobFormat = data?.dob
      ? new Date(data?.dob).toISOString().split("T")[0]
      : null;

    const formattedData = {
      ref_user_pid: userId,
      provider_info: {
        providor_name: data.mentorName,
        mobile_no: userMobileNo || "12345",
        email_id: userEmail || "N/A",
        website_address: data.website || "N/A",
        address_line: data.address || "N/A",
        dob: dobFormat,
        trade_licence: data.tradeLicense,
        tin_number: data.tinNumber,
        vat_reg_id: data.vatId,
        tax_reg_id: data.taxId,
      },
      education_info:
        data.education_info?.map((edu: any) => ({
          degree: edu.degree,
          group: edu.group,
          passing_year: edu.passing_year,
          result: parseFloat(edu.result),
          gpa_cgpa_outof: parseFloat(edu.gpa_cgpa_outof),
        })) || [],
      experience_info:
        data.expertise?.map((exp: any) => ({
          work_as: exp.workAs,
          experience: exp.experienceTime,
          institution: exp.instituteName,
          relavent_dgree: exp.relevantDegree,
        })) || [],
      branch_info:
        data.branch?.map((br: any) => ({
          branch_name: br.branchName,
          website_address: br.branchWebsite || "N/A",
          address_line: br.branchLocation,
          remarks: br.remarks || "",
        })) || [],
    };

    try {
      const response = await api.post(
        `/api/admin/course-provider`,
        formattedData
      );
      if (response?.data?.meta?.status === true) {
        toast.success("Form submitted successfully!", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        
        cookies.set("isProvider", "true");
        cookies.set("providor_pid", response?.data?.data?.providor_pid);
        reset();
        router.push(`/${locale}/course`);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data);
        toast.error(
          `Error: ${error.response?.data.message || "Something went wrong"}`,
          {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
      } else {
        console.error("Error during form submission", error);
        toast.error("Unexpected error during form submission", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  return (
    <>
      <section className=" container p-4">
        <ToastContainer />
        <main className="my-12">
          <div className="">
            <h1 className="text-center text-brandDs mt-12 font-bold underline underline-offset-4 text-4xl">
              Course Provider Registration
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="my-8">
              <div className="grid grid-cols-2 gap-6 w-full">
                <InputField
                  labelName="Name"
                  placeholderText="Enter your name here..."
                  inputName="mentorName"
                  register={register}
                  errors={errors}
                  required={true}
                />
                <DateField
                  labelName="Date of Birth"
                  placeholderText="yyyy-mm-dd"
                  inputName="dob"
                  register={register}
                  errors={errors}
                  required={true}
                />
                {/* <InputField
                  labelName="Mobile Number"
                  placeholderText="Enter your mobile number"
                  inputName="mobileNumber"
                  register={register}
                  errors={errors}
                  required={true}
                  disabled={true}
                  defaultValue={userMobileNo}
                />
                <InputField
                  inputType="email"
                  labelName="Email"
                  placeholderText="Enter your email address"
                  inputName="emailAddress"
                  register={register}
                  errors={errors}
                  required={true}
                  disabled={true}
                  defaultValue={userEmail}
                /> */}
                <InputField
                  labelName="Trade License"
                  placeholderText="Enter your trade license number"
                  inputName="tradeLicense"
                  register={register}
                  errors={errors}
                  required={true}
                />
                <InputField
                  labelName="VAT ID"
                  placeholderText="Enter your Vat ID"
                  inputName="vatId"
                  register={register}
                  errors={errors}
                  required={true}
                />
                <InputField
                  labelName="Tax ID"
                  placeholderText="Enter your Tax ID"
                  inputName="taxId"
                  register={register}
                  errors={errors}
                  required={true}
                />
                <InputField
                  labelName="NID"
                  placeholderText="Enter your NID Number"
                  inputName="nid"
                  register={register}
                  errors={errors}
                  required={true}
                />
                <InputField
                  labelName="TIN Number"
                  placeholderText="Enter your TIN Number"
                  inputName="tinNumber"
                  register={register}
                  errors={errors}
                  required={true}
                />
              </div>

              <div className="my-8">
                <div>
                  <div className="flex items-start space-x-2">
                    {/* Correctly bind the checkbox to watch for changes */}
                    <input
                      type="checkbox"
                      id="hasBranches"
                      {...register("hasBranches")}
                      className="checkbox"
                    />
                    <label
                      htmlFor="hasBranches"
                      className="text-sm font-medium leading-none"
                    >
                      We have physical branches (Physical branches are required
                      for posting physical courses)
                    </label>
                  </div>

                  {hasBranches && (
                    <div className="my-8">
                      <div className="flex items-center justify-between">
                        <h1 className="text-2xl text-[#252525] font-bold">
                          Branch
                        </h1>
                        <button
                          type="button"
                          onClick={addBranch}
                          className="rounded-full bg-link h-fit"
                        >
                          <FaPlus className="text-bgPrimary p-2 w-10 h-10" />
                        </button>
                      </div>
                      {branchFields.map((section, index) => (
                        <div key={section.id} className="w-full">
                          <div className="flex justify-end items-center mt-8">
                            <button
                              onClick={() => removeBranchSection(index)}
                              disabled={branchFields?.length === 1}
                              className={`rounded-full ${
                                branchFields?.length === 1
                                  ? "bg-gray-300 cursor-not-allowed"
                                  : "bg-dangerSecondary"
                              } h-fit`}
                            >
                              <FaMinus className="text-bgPrimary p-2 w-10 h-10" />
                            </button>
                          </div>
                          <div className="grid grid-cols-2 gap-6 w-full">
                            <InputField
                              labelName="Branch Name"
                              placeholderText="Enter branch name"
                              inputName={`branch[${index}].branchName`}
                              register={register}
                              errors={errors}
                              required={true}
                            />
                            <InputField
                              labelName="Branch Location"
                              placeholderText="Enter branch location"
                              inputName={`branch[${index}].branchLocation`}
                              register={register}
                              errors={errors}
                              required={true}
                            />
                          </div>
                          <hr
                            className={`border-b border-brandLsPrimary my-4 ${
                              branchFields?.length === 1 ||
                              index === branchFields?.length - 1
                                ? "hidden"
                                : ""
                            }`}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="my-8">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl text-[#252525] font-bold">
                    Expertise
                  </h1>
                  <button
                    type="button"
                    onClick={addExpertise}
                    className="rounded-full bg-link h-fit"
                  >
                    <FaPlus className="text-bgPrimary p-2 w-10 h-10" />
                  </button>
                </div>
                {expertiseFields.map((section, index) => (
                  <div key={section.id} className="w-full">
                    <div className="flex justify-end items-center mt-8">
                      <button
                        onClick={() => removeExpertiseSection(index)}
                        disabled={expertiseFields?.length === 1}
                        className={`rounded-full ${
                          expertiseFields?.length === 1
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-dangerSecondary"
                        } h-fit`}
                      >
                        <FaMinus className="text-bgPrimary p-2 w-10 h-10" />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-6 w-full ">
                      <InputField
                        labelName="Worked as / Trained as"
                        placeholderText="I worked as / trained as a..."
                        inputName={`expertise[${index}].workAs`}
                        register={register}
                        errors={errors}
                        required={true}
                      />
                      <InputField
                        labelName="Experience"
                        placeholderText="How long you served here"
                        inputName={`expertise[${index}].experienceTime`}
                        register={register}
                        errors={errors}
                        required={true}
                      />

                      <InputField
                        labelName="Institution Name"
                        placeholderText="Enter your institution name"
                        inputName={`expertise[${index}].instituteName`}
                        register={register}
                        errors={errors}
                        required={true}
                      />
                      <InputField
                        labelName="Relevant Degree"
                        placeholderText="Enter your degree"
                        inputName={`expertise[${index}].relevantDegree`}
                        register={register}
                        errors={errors}
                        required={true}
                      />
                    </div>
                    <hr
                      className={`border-b border-brandLsPrimary my-4 ${
                        expertiseFields?.length === 1 ||
                        index === expertiseFields?.length - 1
                          ? "hidden"
                          : ""
                      }`}
                    />
                  </div>
                ))}
              </div>
              <div className="my-8">
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl text-[#252525] font-bold">
                    Education
                  </h1>
                  <button
                    type="button"
                    onClick={addEducation}
                    className="rounded-full bg-link h-fit"
                  >
                    <FaPlus className="text-bgPrimary p-2 w-10 h-10" />
                  </button>
                </div>
                {educationFields.map((section, index) => (
                  <div key={section.id} className="w-full">
                    <div className="grid grid-cols-1 gap-6 w-full mt-2">
                      <div className="grid grid-cols-2 gap-6 ">
                        <InputField
                          labelName="Degree"
                          placeholderText="Degree..."
                          inputName={`education_info[${index}].degree`}
                          register={register}
                          errors={errors}
                          required={true}
                        />
                        <div className="flex justify-end items-center mt-8">
                          <button
                            onClick={() => removeEducationSection(index)}
                            disabled={educationFields?.length === 1}
                            className={`rounded-full ${
                              educationFields?.length === 1
                                ? "bg-gray-300 cursor-not-allowed"
                                : "bg-dangerSecondary"
                            } h-fit`}
                          >
                            <FaMinus className="text-bgPrimary p-2 w-10 h-10" />
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-6 ">
                        <InputField
                          labelName="Group/Department"
                          placeholderText="Group/Department"
                          inputName={`education_info[${index}].group`}
                          register={register}
                          errors={errors}
                          required={true}
                        />
                        <InputField
                          labelName="Passing Year"
                          placeholderText="Passing Year"
                          inputName={`education_info[${index}].passing_year`}
                          register={register}
                          errors={errors}
                          required={true}
                        />
                      </div>
                      <div className="w-1/2 pr-3 flex items-center gap-2">
                        <div className="pr-2 w-full">
                          <InputField
                            inputType="number"
                            labelName="GPA/CGPA"
                            placeholderText="GPA/CGPA"
                            inputName={`education_info[${index}].result`}
                            register={register}
                            errors={errors}
                            required={true}
                          />
                        </div>
                        <p className="min-w-fit mt-6">out of</p>
                        <div className="mt-6">
                          {/* <Select>
												<SelectTrigger
													className="w-28 bg-white"
													{...register(
														`education_info.${index}.gpa_cgpa_outof`,
														{
															required: "Please select a value",
														}
													)}
												>
													<SelectValue placeholder="4.00/5.00" />
												</SelectTrigger>
												<SelectContent>
													<SelectGroup>
														<SelectItem value={4}>4.00</SelectItem>
														<SelectItem value={5}>5.00</SelectItem>
													</SelectGroup>
												</SelectContent>
											</Select> */}

                          <select
                            className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 min-w-[160px]"
                            id="gpaCgpaOutOf"
                            // name={`education_info.${index}.gpa_cgpa_outof`}
                            {...register(
                              `education_info.${index}.gpa_cgpa_outof`,
                              {
                                required: "Please select a value",
                              }
                            )}
                          >
                            <option value={4} selected>4.00</option>
                            <option value={5}>5.00</option>
                          </select>

                          { (errors as any)?.education_info?.[index]?.gpa_cgpa_outof
                            ?.message && (
                            <p className="text-red-500 text-sm mt-1">
                              {
                                (errors as any).education_info[index].gpa_cgpa_outof
                                  .message
                              }
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  type="submit"
                  className="bg-success hover:bg-successHover rounded-full w-full py-3 text-lg text-bgPrimary font-medium mt-10"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </main>
      </section>
    </>
  );
};

export default CourseProviderRegistration;
