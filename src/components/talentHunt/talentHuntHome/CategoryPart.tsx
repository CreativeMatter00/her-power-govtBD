import { useTranslations } from "next-intl";
import { MdStarRate } from "react-icons/md";

interface ICategory {
  name: string;
  rating: number;
  skills: number;
}

type ICategoryPart = { categories: ICategory[] };

const CategoryPart: React.FC<ICategoryPart> = ({ categories }) => {
  const t = useTranslations("talentHunt");

  return (
    <div className="container my-16">
      <p className="text-black text-4xl font-bold">
        {t("Browsetalentbycategory")}
      </p>
      <p className="text-[#252525] text-lg font-medium mb-6">
        {t("Lookingforwork")} &nbsp;
        <span className="text-[#763B90] hover:underline underline-offset-4 decoration-[#b28bc3] decoration-2 transition-all cursor-pointer">
          {t("BrowseJobs")}
        </span>
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-[#252525]">
        {categories.map((category) => (
          <div
            key={category.name}
            className="bg-[#F3E9F6] p-6 rounded-md  group hover:bg-[#D0B4DA] cursor-pointer"
          >
            <p className="text-2xl font-bold mb-4 truncate text-start">
              {category.name}
            </p>
            <div className="flex gap-2 justify-between text-[#5C5C5C] text-lg font-semibold">
              <div className="font-semibold flex gap-1 items-center">
                <MdStarRate color="#59187B" fontSize={20} className="-mt-0.5" />
                {category.rating}/5
              </div>
              <p className="">{category.skills}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPart;
