import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Controller } from "react-hook-form";

interface SelectFieldProps {
  control: any;
  name: string;
  data: any[];
  label: string;
  placeholder: string;
  error?: string;
  labelKey: string;
  valueKey: string;
  makeDisable?: boolean;
  isLoading: boolean;
  onChange?: (value: any) => void;
  defaultValue?: any;
  required?: boolean;
}

const SelectField: React.FC<SelectFieldProps> = ({
  control,
  name,
  data,
  label,
  placeholder,
  error,
  labelKey,
  valueKey,
  makeDisable,
  isLoading,
  onChange,
  defaultValue,
  required
}) => {
  return (
    <div className="col-span-1">
      <label className="text-base font-normal text-black">{label} {required && (<span className="text-dangerPrimary">*</span>)}</label>

      {isLoading ? (
        <Skeleton className="w-full h-11 bg-gray-300" />
      ) : (
        <div className="w-full mt-1">
          <Controller
            control={control}
            name={name}
            defaultValue={defaultValue}
            render={({ field }) => (
              <Select
                value={field.value || defaultValue}
                onValueChange={(value) => {
                  field.onChange(value);
                  if (onChange) onChange(value);
                }}
                disabled={makeDisable}
              >
                <SelectTrigger className="outline-none placeholder:text-[#afacac] text-base py-2 px-6 border border-brandLsPrimary rounded w-full flex">
                  <SelectValue className="text-sm" placeholder={placeholder} />
                </SelectTrigger>

                <SelectContent>
                  {data?.map((item: any) => (
                    <SelectItem
                      key={item[valueKey]}
                      className="border-b-2 border-brandLsPrimary text-sm text-brandPrimary"
                      value={item[valueKey]}
                    >
                      {item[labelKey]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
      )}
    </div>
  );
};

export default SelectField;