import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface SelectFieldProps {
    label: string;
    name: string;
    control: any;
    options: { value: string; label: string }[];
    rules?: UseControllerProps['rules'];
    errorMessage?: string;
    placeholder?: string;
    defaultValue?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
    label,
    name,
    control,
    options,
    rules,
    errorMessage,
    placeholder = 'Select...',
    defaultValue = ''
}) => {
    return (
        <div className="col-span-1">
            <label className="font-normal text-brandDs">
                {label} <span className="text-red-500">*</span>
            </label>
            <Controller
                name={name}
                control={control}
                rules={rules}
                defaultValue={defaultValue}
                render={({ field }) => (
                    <Select onValueChange={(value) => field.onChange(value)} value={field.value || defaultValue}>
                        <SelectTrigger className="w-full bg-white">
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                            {options.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
            />
            {errorMessage && <p className="text-red-600">{errorMessage}</p>}
        </div>
    );
};

export default SelectField;
