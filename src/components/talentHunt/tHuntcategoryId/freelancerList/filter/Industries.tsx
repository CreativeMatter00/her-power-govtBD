import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTranslations } from "next-intl";

const Industries = () => {
  const t = useTranslations("talentHunt");

  return (
    <>
      <div>
        <h1 className="text-xl font-bold text-[#252525] mb-4">
          {t("Industries")}
        </h1>

        {/* ================ RADIO OPTIONS ========================= */}
        <div>
          <RadioGroup>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                className="bg-brandLsPrimary text-brandPrimary"
                value="business-consulting"
                id="business-consulting"
              />
              <Label
                className="text-sm text-[#252525] font-normal"
                htmlFor="business-consulting"
              >
                {t("Business_&_consulting")}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                className="bg-brandLsPrimary text-brandPrimary"
                value="medical"
                id="medical"
              />
              <Label
                className="text-sm text-[#252525] font-normal"
                htmlFor="medical"
              >
                {t("Medical_&_pharmaceutical")}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                className="bg-brandLsPrimary text-brandPrimary"
                value="retail"
                id="retail"
              />
              <Label
                className="text-sm text-[#252525] font-normal"
                htmlFor="retail"
              >
                {t("Retail")}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                className="bg-brandLsPrimary text-brandPrimary"
                value="technology"
                id="technology"
              />
              <Label
                className="text-sm text-[#252525] font-normal"
                htmlFor="technology"
              >
                {t("Technology")}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                className="bg-brandLsPrimary text-brandPrimary"
                value="agriculture"
                id="agriculture"
              />
              <Label
                className="text-sm text-[#252525] font-normal"
                htmlFor="agriculture"
              >
                {t("Agriculture")}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                className="bg-brandLsPrimary text-brandPrimary"
                value="architectural"
                id="architectural"
              />
              <Label
                className="text-sm text-[#252525] font-normal"
                htmlFor="architectural"
              >
                {t("Architectural")}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                className="bg-brandLsPrimary text-brandPrimary"
                value="automobile"
                id="automobile"
              />
              <Label
                className="text-sm text-[#252525] font-normal"
                htmlFor="automobile"
              >
                {t("Automobilet")}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                className="bg-brandLsPrimary text-brandPrimary"
                value="educational"
                id="educational"
              />
              <Label
                className="text-sm text-[#252525] font-normal"
                htmlFor="educational"
              >
                {t("Educational")}
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* ======================== SEE MORE OPTIONS ======================= */}
        <div>
          <button className="text-sm text-[#252525] opacity-80 mt-3">
            {t("See_more")}
          </button>
        </div>
      </div>
    </>
  );
};

export default Industries;
