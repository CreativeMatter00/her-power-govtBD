'use client'
import React, { useEffect } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputField from '../inputFields/InputField';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { useCookies } from 'next-client-cookies';
import { getCourseProviderDetailsById, url } from '@/api/api';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { schema } from './Schema';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

const EditCourseProvider = () => {
  const t=useTranslations("providerInfo")
  const cookies = useCookies();
  const user_pid = cookies.get('user_pid')
  const provider_pid = cookies.get('providor_pid')
  const locale = useLocale();
  const router = useRouter();
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["userInfo", user_pid],
    queryFn: () => getCourseProviderDetailsById(user_pid as any),
  });
  const { control, handleSubmit, register, reset, formState: { errors }, watch } = useForm({
    defaultValues: {},
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (data) {
      const filterData = {
        providor_name: data.providor_name,
        trade_licence: data.trade_licence,
        vat_reg_id: data.vat_reg_id,
        tax_reg_id: data.tax_reg_id,
        tin_number: data.tin_number,
        website_address: data.website_address,
        address_line: data.address_line,
        branch: data?.branch?.map((item: any) => ({
          branch_pid: item.branch_pid,
          branch_name: item.branch_name,
          address_line: item.address_line,
          website_address: item.website_address,
          remarks: item.remarks
        })),
        education_info: data.education_info?.map((item: any) => ({
          educatmap_pid: item.educatmap_pid,
          degree: item.degree,
          group: item.group_department,
          passing_year: item.passing_year,
          result: item.result_gpa,
          gpa_cgpa_outof: item.gpa_cgpa_outof
        })),
        experience: data.experience?.map((item: any) => ({
          expcatmap_pid: item.expcatmap_pid,
          work_as: item.work_as,
          experience: item.experiance,
          institution: item.institution,
          relavent_dgree: item.relavent_dgree
        }))
      }
      reset(filterData)
    }
  }, [data, reset])

  const { fields: educationFields, append: addEducation, remove: removeEducation } = useFieldArray({
    control,
    name: 'education_info',
  });

  const { fields: experienceFields, append: addExperience, remove: removeExperience } = useFieldArray({
    control,
    name: 'experience',
  });

  const { fields: branchFields, append: addBranch, remove: removeBranch } = useFieldArray({
    control,
    name: 'branch',
  });

  const handleDeleteEducation = async (index: number, id: string | undefined | null) => {
    if (id) {

      try {
        const response = await axios.delete(`${url}/api/admin/education-delete/${id}`);
        // console.log("Response Data:", response);
        if (response?.data?.meta?.status) {
          toast.success("Course Provider Education Deleted successfully!", {
            position: "bottom-left",
            autoClose: 3000,
          });
          removeEducation(index)
        }
      }
      catch (err: any) {
        console.error("Error deleting education", err);
      }
    }
    else {
      removeEducation(index)
    }
  }
  const handleDeleteExperience = async (index: number, id: string | undefined | null) => {
    if (id) {
      try {
        const response = await axios.delete(`${url}/api/admin/experience-delete/${id}`);
        // console.log("Response Data:", response);
        if (response?.data?.meta?.status) {
          toast.success("Course Provider Experience Deleted successfully!", {
            position: "bottom-left",
            autoClose: 3000,
          });
          removeExperience(index)
        }
      }
      catch (err: any) {
        console.error("Error deleting education", err);
      }
    }
    else {
      removeExperience(index)
    }

  }
  const handleDeleteBranch = async (index: number, id: string | undefined | null) => {
    if (id) {

      try {
        const response = await axios.delete(`${url}/api/admin/branch-delete/${id}`);
        if (response?.data?.meta?.status) {
          toast.success("Course Provider Branch Deleted successfully!", {
            position: "bottom-left",
            autoClose: 3000,
          });
          removeBranch(index)
        }
      }
      catch (err: any) {
        console.error("Error deleting education", err);
      }
    }
    else {
      removeBranch(index)
    }
  }


  const hasBranches = watch("hasBranches");



  const onSubmit = async (formData: any) => {
    // console.log("formdata", formData)
    const newData = {
      ref_user_pid: user_pid,
      provider_info: {
        providor_name: formData.providor_name,
        trade_licence: formData.trade_licence,
        vat_reg_id: formData.vat_reg_id,
        tax_reg_id: formData.tax_reg_id,
        tin_number: formData.tin_number,
        website_address: formData.website_address,
        address_line: formData.address_line,
      },
      branch_info: formData.branch,
      education_info: formData.education_info,
      experience_info: formData.experience,
    }
    // console.log("new data", newData)
    try {
      const response = await axios.put(
        `${url}/api/admin/course-provider/${provider_pid}`,
        newData,
      );

      // console.log("Response:", response.data);

      if (response?.data?.meta?.status) {
        toast.success("Course Provider Information Updated successfully!", {
          position: "bottom-left",
          autoClose: 3000,
        });
        refetch();
        reset();
        setTimeout(()=>{
          router.push(`/${locale}/course/course-provider/dashboard`);
        },3000)
      } else {
        toast.error("Failed to updating course provider information. Please try again.", {
          position: "bottom-left",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("An error occurred. Please try again.", {
        position: "bottom-left",
        autoClose: 3000,
      });
    } finally {
      // setIsLoading(false);
    }
  };

  return (
    <section className=" container p-4">
      <ToastContainer />
      <main className="my-12">
        <div className="">
          <h1 className="text-center text-brandDs mt-12 font-bold underline underline-offset-4 text-4xl">
            {t("Edit Course Provider")}
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="my-8">
            <div className="grid grid-cols-2 gap-6 w-full">
              <InputField
                labelName={t("Name")}
                placeholderText={t("Enter your name here")}
                inputName="providor_name"
                register={register}
                errors={errors}
                required={true}
                defaultValue={data?.providor_name}
              />

              <InputField
                labelName={t("Website Address")}
                placeholderText={t("Enter your website address here")}
                inputName="website_address"
                register={register}
                errors={errors}
                required={true}
                defaultValue={data?.website_address}
              />
              <InputField
                labelName={t("Address")}
                placeholderText={t("Enter your address here")}
                inputName="address_line"
                register={register}
                errors={errors}
                required={true}
                defaultValue={data?.address_line}
              />
              <InputField
                labelName={t("Trade License")}
                inputType="number"
                placeholderText={t("Enter your trade license number")}
                inputName="trade_licence"
                register={register}
                errors={errors}
                required={true}
                defaultValue={data?.trade_licence}
              />
              <InputField
                labelName={t("VAT ID")}
                inputType="number"
                placeholderText={t("Enter your Vat ID")}
                inputName="vat_reg_id"
                register={register}
                errors={errors}
                required={true}
                defaultValue={data?.vat_reg_id}
              />
              <InputField
                labelName={t("Tax ID")}
                inputType="number"
                placeholderText={t("Enter your Tax ID")}
                inputName="tax_reg_id"
                register={register}
                errors={errors}
                required={true}
                defaultValue={data?.tax_reg_id}
              />
              <InputField
                labelName={t("TIN Number")}
                inputType="number"
                placeholderText={t("Enter your TIN Number")}
                inputName="tin_number"
                register={register}
                errors={errors}
                required={true}
                defaultValue={data?.tin_number}
              />
            </div>

            <div className="my-8">
              <div>
                <div className="flex items-start space-x-2">
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
                    {t("phyDes")}
                  </label>
                </div>

                {hasBranches && (
                  <div className="my-8">
                    <div className="flex items-center justify-between">
                      <h1 className="text-2xl text-[#252525] font-bold">
                        {t("Branch")}
                      </h1>
                      <button
                        type="button"
                        onClick={() => addBranch({ branch_pid: null, branch_name: '', address_line: '', website_address: '', remarks: "" })}
                        className="rounded-full bg-link h-fit"
                      >
                        <FaPlus className="text-bgPrimary p-2 w-10 h-10" />
                      </button>
                    </div>
                    {branchFields.map((section, index) => (
                      <div key={section.id} className="w-full">
                        <div className="flex justify-between items-center mt-8">
                          <div className='flex-1'>
                            <h1 className='text-center text-xl font-semibold text-brandPrimary'>{data?.branch[index]?.branch_name || "New Branch"}</h1>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleDeleteBranch(index, section?.branch_pid)}
                            disabled={branchFields.length === 1}
                            className={`rounded-full ${branchFields.length === 1
                              ? "bg-gray-300 cursor-not-allowed"
                              : "bg-dangerSecondary"
                              } h-fit`}
                          >
                            <FaMinus className="text-bgPrimary p-2 w-10 h-10" />
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-6 w-full">
                          <InputField
                            labelName={t("Branch Name")}
                            placeholderText={t("Enter branch name")}
                            inputName={`branch[${index}].branch_name`}
                            register={register}
                            errors={errors}
                            required={true}
                            defaultValue={data?.branch[index]?.branch_name || undefined || ''}
                          />
                          <InputField
                            labelName={t("Branch Location")}
                            placeholderText={t("Enter branch location")}
                            inputName={`branch[${index}].address_line`}
                            register={register}
                            errors={errors}
                            required={true}
                            defaultValue={data?.branch[index]?.address_line || ''}
                          />
                          <InputField
                            labelName={t("Website Address")}
                            placeholderText={t("Enter website address")}
                            inputName={`branch[${index}].website_address`}
                            register={register}
                            errors={errors}
                            required={true}
                            defaultValue={data?.branch[index]?.website_address || ''}
                          />
                          <InputField
                            labelName={t("Remarks")}
                            placeholderText={t("Enter remarks here")}
                            inputName={`branch[${index}].remarks`}
                            register={register}
                            errors={errors}
                            // required={true}
                            defaultValue={data?.branch[index]?.remarks || ''}
                          />
                        </div>
                        <hr
                          className={`border-b border-brandLsPrimary my-4 ${branchFields.length === 1 ||
                            index === branchFields.length - 1
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
                  {t("Expertise")}
                </h1>
                <button
                  type="button"
                  onClick={() => addExperience({ expcatmap_pid: null, work_as: "", experience: "", institution: "", relavent_dgree: "" })}
                  className="rounded-full bg-link h-fit"
                >
                  <FaPlus className="text-bgPrimary p-2 w-10 h-10" />
                </button>
              </div>
              {experienceFields.map((section, index) => (
                <div key={section.id} className="w-full">
                  <div className="flex justify-between items-center mt-8 mb-4">
                    <div className='flex-1'>
                      <h1 className='text-center text-xl font-semibold text-brandPrimary'>{data?.experience?.[index]?.institution || t(`New Experience`)}</h1>
                    </div>
                    <button
                      type='button'
                      onClick={() => handleDeleteExperience(index, section?.expcatmap_pid)}
                      disabled={experienceFields.length === 1}
                      className={`rounded-full ${experienceFields.length === 1
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-dangerSecondary"
                        } h-fit`}
                    >
                      <FaMinus className="text-bgPrimary p-2 w-10 h-10" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-6 w-full ">
                    <InputField
                      labelName={t("Worked as / Trained as")}
                      placeholderText={t("I worked as / trained as a")}
                      inputName={`experience[${index}].work_as`}
                      register={register}
                      errors={errors}
                      required={true}
                      defaultValue={data?.experience?.[index]?.work_as || ''}
                    />
                    <InputField
                      labelName={t("Experience")}
                       inputType="number"
                      placeholderText={t("How long you served here")}
                      inputName={`experience[${index}].experience`}
                      register={register}
                      errors={errors}
                      required={true}
                      defaultValue={data?.experience?.[index]?.experiance || ''}
                    />

                    <InputField
                      labelName={t("Institution Name")}
                      placeholderText={t("Enter your institution name")}
                      inputName={`experience[${index}].institution`}
                      register={register}
                      errors={errors}
                      required={true}
                      defaultValue={data?.experience?.[index]?.institution || ''}
                    />
                    <InputField
                      labelName={t("Relevant Degree")}
                      placeholderText={t("Enter your degree")}
                      inputName={`experience[${index}].relavent_dgree`}
                      register={register}
                      errors={errors}
                      required={true}
                      defaultValue={data?.experience?.[index]?.relavent_dgree || ''}
                    />
                  </div>
                  <hr
                    className={`border-b border-brandLsPrimary my-4 ${experienceFields.length === 1 ||
                      index === experienceFields.length - 1
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
                  {t("Education")}
                </h1>
                <button
                  type="button"
                  onClick={() => addEducation({ educatmap_pid: null, degree: '', group: '', passing_year: '', result: '', gpa_cgpa_outof: '' })}
                  className="rounded-full bg-link h-fit"
                >
                  <FaPlus className="text-bgPrimary p-2 w-10 h-10" />
                </button>
              </div>
              {educationFields.map((section, index) => (
                <div key={section.id} className="w-full">
                  <h1 className='text-center text-xl font-semibold text-brandPrimary mt-4'>{data?.education_info?.[index]?.degree || "New Education"}</h1>
                  <div className="grid grid-cols-1 gap-6 w-full mt-2">
                    <div className="grid grid-cols-2 gap-6 ">
                      <InputField
                        labelName={t("Degree")}
                        placeholderText={t("Degree")}
                        inputName={`education_info[${index}].degree`}
                        register={register}
                        errors={errors}
                        required={true}
                        defaultValue={data?.education_info?.[index]?.degree}
                      />
                      <div className="flex justify-end items-center mt-8">
                        <button
                          type='button'
                          onClick={() => handleDeleteEducation(index, section.educatmap_pid)}
                          disabled={educationFields.length === 1}
                          className={`rounded-full ${educationFields.length === 1
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
                        labelName={t("Group / Department")}
                        placeholderText={t("Group / Department")}
                        inputName={`education_info[${index}].group`}
                        register={register}
                        errors={errors}
                        required={true}
                        defaultValue={data?.education_info?.[index]?.group_department}
                      />
                      <InputField
                       inputType="number"
                        labelName={t("Passing Year")}
                        placeholderText={t("Passing Year")}
                        inputName={`education_info[${index}].passing_year`}
                        register={register}
                        errors={errors}
                        required={true}
                        defaultValue={data?.education_info?.[index]?.passing_year}
                      />
                    </div>
                    <div className="w-1/2 pr-3 flex items-center gap-2">
                      <div className="pr-2 w-full">
                        <InputField
                          inputType="number"
                          labelName={t("GPA / CGPA")}
                          placeholderText={t("GPA / CGPA")}
                          inputName={`education_info[${index}].result`}
                          register={register}
                          errors={errors}
                          required={true}
                          defaultValue={data?.education_info?.[index]?.result_gpa}
                        />
                      </div>
                      <p className="min-w-fit mt-6">{t("out of")}</p>
                      <div className="mt-6">
                        <select
                          className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 min-w-[160px]"
                          id="gpa_cgpa_outof"
                          {...register(
                            `education_info.${index}.gpa_cgpa_outof`,
                            {
                              required: "Please select a value",
                            }
                          )}
                        >
                          {/* <option value="" disabled selected>
                            4.00/5.00
                          </option> */}
                          <option value={4} selected>4.00</option>
                          <option value={5}>5.00</option>
                        </select>

                        {(errors as any)?.education_info?.[index]
                          ?.gpa_cgpa_outof && (
                            <p className="text-red-500 text-sm mt-1">
                              {
                                (errors as any).education_info?.[index]
                                  .gpa_cgpa_outof.message
                              }
                            </p>
                          )}
                      </div>
                    </div>
                    <hr
                      className={`border-b border-brandLsPrimary my-4 ${educationFields.length === 1 ||
                        index === educationFields.length - 1
                        ? "hidden"
                        : ""
                        }`}
                    />
                  </div>
                </div>
              ))}
              <button
                type="submit"
                className="bg-success hover:bg-successHover rounded-full w-full py-3 text-lg text-bgPrimary font-medium mt-10"
              >
                {t("Submit")}
              </button>
            </div>
          </form>
        </div>
      </main>
    </section>
  );
};



export default EditCourseProvider;
