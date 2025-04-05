import React from "react";
import { UseFormRegister } from "react-hook-form";
import get from "lodash/get";

interface IInputInfo {
    inputType?: string;
    labelName: string;
    placeholderText: string;
    inputName: string;
    errors: any;
    register: UseFormRegister<any>;
    required?: boolean;
    defaultValue?: any;
    disabled?: any;
}
const Input: React.FC<IInputInfo> = ({
    inputType = "text",
    labelName,
    placeholderText,
    inputName,
    errors,
    register,
    defaultValue,
    required,
    disabled,
}) => {
    const errorMessage = get(errors, inputName)?.message;
    // console.log(errorMessage);

    return (
        <div className="w-full">
            <label className="text-sm font-normal pb-2 pl-6 text-brandPrimary">
                {labelName} {required && <span className="text-red-500">*</span>}
            </label>

            <input
                type={inputType}
                placeholder={placeholderText}
                step={inputType === "number" ? 0.01 : undefined}
                className={`mt-1 block outline-none placeholder:text-[#cacaca] text-base py-2 pl-6 border border-brandLsPrimary rounded-full w-full`}
                {...register(inputName)}
                disabled={disabled}
                defaultValue={defaultValue}
            />
            {errorMessage && (
                <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
            )}
        </div>
    );
};

export default Input;
