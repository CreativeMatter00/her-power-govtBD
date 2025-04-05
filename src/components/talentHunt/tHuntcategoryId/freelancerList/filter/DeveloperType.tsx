import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTranslations } from "next-intl";

const DeveloperType = () => {
  const t = useTranslations("talentHunt");
  return (
    <>
      <div>
        <h1 className="text-xl font-bold text-[#252525] mb-4">
          {t("Developer_Type")}
        </h1>

        {/* ================ RADIO OPTIONS ========================= */}
        <div>
          <RadioGroup>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                className="bg-brandLsPrimary text-brandPrimary"
                value="top"
                id="top"
              />
              <Label
                className="text-sm text-[#252525] font-normal"
                htmlFor="top"
              >
                {t("Top_Level")}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                className="bg-brandLsPrimary text-brandPrimary"
                value="mid"
                id="mid"
              />
              <Label
                className="text-sm text-[#252525] font-normal"
                htmlFor="mid"
              >
                {t("Mid_Level")}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                className="bg-brandLsPrimary text-brandPrimary"
                value="entry"
                id="entry"
              />
              <Label
                className="text-sm text-[#252525] font-normal"
                htmlFor="entry"
              >
                {t("Entry_Level")}
              </Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </>
  );
};

export default DeveloperType;
