import { Checkbox } from "@/components/ui/checkbox";
import { RiDeleteBin6Line } from "react-icons/ri";
import NotificationCard from "./NotificationCard";
import { useTranslations } from "next-intl";

const notifications = [
  {
    title:
      "Opshora Ahmed Tonni replied to you comment on her product “Pink Flower Vase",
    time: "01:28 pm",
  },
  {
    title:
      "Md Shah Alam, Tania Rahaman, Jubayer Talukdar Himel and 5 others liked your review for Dark Chocolate cake from Samira’s Cake Baking Shop. Md Shah Alam, Tania Rahaman, Jubayer Talukdar Himel and 5 others liked your review for Dark Chocolate cake from Samira’s Cake Baking Shop.",
    time: "03:09 pm",
  },
  {
    title:
      "Opshora Ahmed Tonni replied to you comment on her product “Pink Flower Vase",
    time: "01:28 pm",
  },
  {
    title:
      "Md Shah Alam, Tania Rahaman, Jubayer Talukdar Himel and 5 others liked your review for Dark Chocolate cake from Samira’s Cake Baking Shop.",
    time: "03:09 pm",
  },
];

const Notifications = () => {
  const t = useTranslations("talentHunt");

  return (
    <div className="container mx-auto py-6">
      <p className="text-brandPrimary text-3xl mb-10">{t("Notifications")}</p>
      <div className="flex justify-end items-center gap-4">
        <div className="flex items-center space-x-2 hover:cursor-pointer">
          <Checkbox id="terms" />
          <label htmlFor="terms" className="text-sm text-brandPrimary">
            {t("Select_All")}
          </label>
        </div>

        <button className="p-1 border border-greyPrimary hover:cursor-pointer">
          <RiDeleteBin6Line color="border-greyPrimary" />
        </button>
      </div>

      <div>
        <p className="text-grey mb-6">{t("Today")}</p>
        <div>
          {notifications.map((notification, index) => {
            return (
              <NotificationCard
                key={index}
                title={notification.title}
                time={notification.time}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
