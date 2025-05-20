'use client'
import { api, getCourseProviderDetailsById } from '@/api/api';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQuery } from '@tanstack/react-query';
import { useCookies } from 'next-client-cookies';
import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from 'yup';
import InputField from '../inputFields/InputField';

const DemoCourseProviderEdit = () => {
    const cookies = useCookies();
    const user_pid = cookies.get('user_pid')
    const provider_pid = cookies.get('providor_pid')
    const { isLoading, error, data, refetch } = useQuery({
        queryKey: ["userInfo", user_pid],
        queryFn: () => getCourseProviderDetailsById(user_pid as any),
    });
    const schema = Yup.object().shape({
        providor_name: Yup.string().required('Provider name is required'),
        trade_licence: Yup.string().notRequired(),
        vat_reg_id: Yup.string().notRequired(),
        tax_reg_id: Yup.string().notRequired(),
        tin_number: Yup.string().notRequired(),
        website_address: Yup.string().required('Website address is required'),
        address_line: Yup.string().required('Address is required'),
        hasBranches: Yup.boolean(),
        education_info: Yup.array().of(
            Yup.object().shape({
                degree: Yup.string().required('Degree is required'),
                group: Yup.string().required('Group/Department is required'),
                passing_year: Yup.string().required('Passing year is required'),
                result: Yup.string().required('GPA result is required'),
                gpa_cgpa_outof: Yup.string().required('GPA/CGPA out of is required'),
            })
        ),
        experience: Yup.array().of(
            Yup.object().shape({
                work_as: Yup.string().required('Work position is required'),
                experiance: Yup.string().required('Experience description is required'),
                institution: Yup.string().required('Institution name is required'),
                relavent_dgree: Yup.string().required('Relevant degree is required')
            })
        ),
        branch: Yup.array().of(
            Yup.object().shape({
                branch_name: Yup.string().nullable(),
                address_line: Yup.string().nullable()
            })
        ),
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
                    address_line: item.address_line
                })),
                education_info: data.education_info?.map((item: any) => ({
                    educatmap_pid: item.educatmap_pid,
                    degree: item.degree,
                    group_department: item.group_department,
                    passing_year: item.passing_year,
                    result_gpa: item.result_gpa,
                    gpa_cgpa_outof: item.gpa_cgpa_outof
                })),
                experience: data.experience?.map((item: any) => ({
                    expcatmap_pid: item.expcatmap_pid,
                    work_as: item.work_as,
                    experience: item.experience,
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

    const hasBranches = watch("hasBranches");

    const onSubmit = async (formData: any) => {
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
            branch: formData.branch,
            education_info: formData.education_info,
            experience: formData.experience
        }
        try {
            const response = await api.put(
                `/api/admin/course-provider/${provider_pid}`,
                newData,
            );

            // console.log("Response:", response.data);

            if (response?.data?.meta?.status) {
                toast.success("Course Provider Information Updated successfully!", {
                    position: "bottom-left",
                    autoClose: 3000,
                });
                refetch();
                reset(); // Reset form after successful submission
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
                        Edit Course Provider
                    </h1>

                    <form onSubmit={handleSubmit(onSubmit)} className="my-8">
                        <div className="grid grid-cols-2 gap-6 w-full">
                            <InputField
                                labelName="Name"
                                placeholderText="Enter your name here..."
                                inputName="providor_name"
                                register={register}
                                errors={errors}
                                required={true}
                                defaultValue={data?.name}
                            />
                            <InputField
                                labelName="Website Address"
                                placeholderText="Enter your website address here..."
                                inputName="website_address"
                                register={register}
                                errors={errors}
                                required={true}
                                defaultValue={data?.website_address}
                            />
                            <InputField
                                labelName="Address"
                                placeholderText="Enter your address here..."
                                inputName="address_line"
                                register={register}
                                errors={errors}
                                required={true}
                                defaultValue={data?.address_line}
                            />
                            <InputField
                                labelName="Trade License"
                                placeholderText="Enter your trade license number"
                                inputName="trade_licence"
                                register={register}
                                errors={errors}
                                required={true}
                                defaultValue={data?.trade_licence}
                            />
                            <InputField
                                labelName="VAT ID"
                                placeholderText="Enter your Vat ID"
                                inputName="vat_reg_id"
                                register={register}
                                errors={errors}
                                required={true}
                                defaultValue={data?.vat_reg_id}
                            />
                            <InputField
                                labelName="Tax ID"
                                placeholderText="Enter your Tax ID"
                                inputName="tax_reg_id"
                                register={register}
                                errors={errors}
                                required={true}
                                defaultValue={data?.tax_reg_id}
                            />
                            <InputField
                                labelName="TIN Number"
                                placeholderText="Enter your TIN Number"
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
                                                onClick={() => addBranch({ branch_name: '', address_line: '' })}
                                                className="rounded-full bg-link h-fit"
                                            >
                                                <FaPlus className="text-bgPrimary p-2 w-10 h-10" />
                                            </button>
                                        </div>
                                        {branchFields.map((section, index) => (
                                            <div key={section.id} className="w-full">
                                                <div className="flex justify-end items-center mt-8">
                                                    <button
                                                        onClick={() => removeBranch(index)}
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
                                                        labelName="Branch Name"
                                                        placeholderText="Enter branch name"
                                                        inputName={`branch[${index}].branch_name`}
                                                        register={register}
                                                        errors={errors}
                                                        required={true}
                                                        defaultValue={data?.branch[index]?.branch_name || undefined || ''}
                                                    />
                                                    <InputField
                                                        labelName="Branch Location"
                                                        placeholderText="Enter branch location"
                                                        inputName={`branch[${index}].address_line`}
                                                        register={register}
                                                        errors={errors}
                                                        required={true}
                                                        defaultValue={data?.branch[index]?.address_line || ''}
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
                                    Expertise
                                </h1>
                                <button
                                    type="button"
                                    onClick={() => addExperience({ work_as: "", experiance: "", institution: "", relavent_dgree: "" })}
                                    className="rounded-full bg-link h-fit"
                                >
                                    <FaPlus className="text-bgPrimary p-2 w-10 h-10" />
                                </button>
                            </div>
                            {experienceFields.map((section, index) => (
                                <div key={section.id} className="w-full">
                                    <div className="flex justify-end items-center mt-8">
                                        <button
                                            onClick={() => removeExperience(index)}
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
                                            labelName="Worked as / Trained as"
                                            placeholderText="I worked as / trained as a..."
                                            inputName={`experience[${index}].work_as`}
                                            register={register}
                                            errors={errors}
                                            required={true}
                                            defaultValue={data?.experience[index]?.work_as || ''}
                                        />
                                        <InputField
                                            labelName="Experience"
                                            placeholderText="How long you served here"
                                            inputName={`experience[${index}].experiance`}
                                            register={register}
                                            errors={errors}
                                            required={true}
                                            defaultValue={data?.experience[index]?.experiance || ''}
                                        />

                                        <InputField
                                            labelName="Institution Name"
                                            placeholderText="Enter your institution name"
                                            inputName={`experience[${index}].institution`}
                                            register={register}
                                            errors={errors}
                                            required={true}
                                            defaultValue={data?.experience[index]?.institution || ''}
                                        />
                                        <InputField
                                            labelName="Relevant Degree"
                                            placeholderText="Enter your degree"
                                            inputName={`experience[${index}].relavent_dgree`}
                                            register={register}
                                            errors={errors}
                                            required={true}
                                            defaultValue={data?.experience[index]?.relavent_dgree || ''}
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
                                    Education
                                </h1>
                                <button
                                    type="button"
                                    onClick={() => addEducation({ degree: '', group: '', passing_year: '', result: '', gpa_cgpa_outof: '' })}
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
                                                defaultValue={data?.education_info[index]?.degree}
                                            />
                                            <div className="flex justify-end items-center mt-8">
                                                <button
                                                    onClick={() => removeExperience(index)}
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
                                                labelName="Group/Department"
                                                placeholderText="Group/Department"
                                                inputName={`education_info[${index}].group`}
                                                register={register}
                                                errors={errors}
                                                required={true}
                                                defaultValue={data?.education_info[index]?.group_department}
                                            />
                                            <InputField
                                                labelName="Passing Year"
                                                placeholderText="Passing Year"
                                                inputName={`education_info[${index}].passing_year`}
                                                register={register}
                                                errors={errors}
                                                required={true}
                                                defaultValue={data?.education_info[index]?.passing_year}
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
                                                    defaultValue={data?.education_info[index]?.result_gpa}
                                                />
                                            </div>
                                            <p className="min-w-fit mt-6">out of</p>
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
                                                    <option value="" disabled selected>
                                                        4.00/5.00
                                                    </option>
                                                    <option value={4}>4.00</option>
                                                    <option value={5}>5.00</option>
                                                </select>

                                                {(errors as any)?.education_info?.[index]
                                                    ?.gpa_cgpa_outof && (
                                                        <p className="text-red-500 text-sm mt-1">
                                                            {
                                                                (errors as any).education_info[index]
                                                                    .gpa_cgpa_outof.message
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
    );
};

export default DemoCourseProviderEdit;
