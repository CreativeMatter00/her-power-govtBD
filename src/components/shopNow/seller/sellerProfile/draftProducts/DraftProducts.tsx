import { useTranslations } from "next-intl";

const products = [
  {
    sl: 1,
    id: "HPO387",
    date: "3 May, 2024",
    category: "Handicraft",
    price: "1600tk",
  },
  {
    sl: 2,
    id: "HPO836",
    date: "26 May, 2024",
    category: "Food",
    price: "not specified",
  },
];

const DraftProducts = () => {
  const t = useTranslations("talentHunt");
  return (
    <div className="py-6 container mx-auto">
      <div className="mb-6">
        <p className="text-3xl text-brandPrimary mb-10">
          {t("Draft_Products")}
        </p>
        <p className="text-greyPrimary">
          {t("Total_items_in_draft_product")}:{" "}
          <span className="text-brandPrimary">2</span>
        </p>
      </div>

      <div className="mb-8 overflow-x-auto">
        <div style={{ minWidth: "700px" }}>
          <table className="w-full">
            <thead>
              <tr className="py-4 border-b border-brandLsPrimary text-brandDs">
                <th className="py-4">SL</th>
                <th className="py-4">Order ID#</th>
                <th className="py-4">Date</th>
                <th className="py-4">Product Category</th>
                <th className="py-4">Price</th>
                <th className="py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr
                  className="py-4 border-b border-brandLsPrimary text-brandPrimary text-center"
                  key={index}
                >
                  <td className="py-4">{product.sl}</td>
                  <td className="py-4">{product.id}</td>
                  <td className="py-4">{product.date}</td>
                  <td className="py-4">{product.category}</td>
                  <td className="py-4">{product.price}</td>
                  <td className="py-4 flex items-center justify-center gap-2">
                    <button className="text-dangerPrimary">Delete</button>
                    <button className="text-link">Edit Draft</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DraftProducts;
