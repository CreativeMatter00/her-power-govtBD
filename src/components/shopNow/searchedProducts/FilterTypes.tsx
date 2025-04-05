"use client";

import { getProductCategory } from "@/api/api";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa6";
import ScaleLoader from "react-spinners/ScaleLoader";

interface ICategory {
  category_pid: string;
  category_name: string;
  file_url: string;
  category_desc: string;
  active_status: number;
}

const FilterTypes = () => {
  const t = useTranslations("talentHunt");
  // const locale = useLocale();
  const searchParams = useSearchParams();
  const productName = searchParams.get("productName");
  const pathName = usePathname();
  const [minPrice, setMinPrice] = useState<number | string>("");
  const [maxPrice, setMaxPrice] = useState<number | string>("");
  const [type, setType] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [rating, setRating] = useState<string>("");
  // const [specialOffer, setSpecialOffer] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const router = useRouter();

  const {
    isLoading: categoriesLoading,
    isError: categoriesError,
    data: categoriesData,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getProductCategory(),
  });
  // console.log(categoriesData);

  const applyFilters = () => {
    // Use URLSearchParams to construct the query string
    const queryParams = new URLSearchParams();

    // Validation for price range
    if (minPrice && maxPrice && Number(minPrice) > Number(maxPrice)) {
      // alert("Min price cannot be greater than max price!");
      return;
    }
    if (productName) {
      queryParams.set("productName", productName);
    }

    if (type) {
      queryParams.set("type", type);
    }

    if (minPrice && maxPrice) {
      // console.log("min price:", minPrice);
      // console.log("max price:", maxPrice);
      const minPriceStr = minPrice && String(minPrice);
      // console.log(minPriceStr);
      const maxPriceStr = maxPrice && String(maxPrice);
      // console.log(maxPriceStr);
      queryParams.set("range", `${minPriceStr}-${maxPriceStr}`);
      // queryParams.set("range", `${minPrice}-${maxPrice}`);
    }

    if (category) {
      queryParams.set("category", category);
    }

    if (rating) {
      queryParams.set("rating", rating);
    }

    const queryString = queryParams.toString();
    let newUrl = pathName;

    if (queryString) {
      if (newUrl.includes("&")) {
        newUrl = newUrl.split("&")[0];
      }
      newUrl += `?${queryString}`;
    }
    router.push(newUrl);
  };

  // console.log(pathName);

  useEffect(() => {
    if (pathName) {
      const lastSegment = pathName.split("/").pop();
      // console.log("last segment:", lastSegment);
      const queryParams = new URLSearchParams(lastSegment);

      const extractedType = queryParams.get("type");
      const extractedRange = queryParams.get("range");
      // console.log(extractedRange);
      const min = extractedRange?.split("-")[0];
      // console.log(min);
      const max = extractedRange?.split("-")[1];
      // console.log(max);
      const extractedCategory = queryParams.get("category");
      const extractedRating = queryParams.get("rating");

      if (extractedType) setType(extractedType);
      if (min) {
        setMinPrice(min);
        // console.log(min);
      }
      if (max) {
        setMaxPrice(max);
        // console.log(max);
      }
      if (extractedCategory) setCategory(extractedCategory);
      if (extractedRating) setRating(extractedRating);
    }
  }, [pathName]);

  if (categoriesLoading)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <ScaleLoader color="#421957" height={70} radius={8} width={10} />
      </div>
    );

  return (
    <div className="py-6 px-2">
      <p className="font-bold text-xl text-brandPrimary pb-4 border-b border-brandLsPrimary hidden md:block">
        {t("Filters")}
      </p>

      <div className="text-brandPrimary py-4">
        <div className="mb-6">
          <RadioGroup value={type} onValueChange={(value) => setType(value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="popular"
                id="popular"
                onClick={() => setType("popular")}
              />
              <Label htmlFor="popular" className="text-brandPrimary">
                {t("Most_Popular_Products")}
              </Label>
            </div>

            {/* <div className="flex items-center space-x-2">
							<RadioGroupItem
								value="frequently-sold"
								id="frequently-sold"
								onClick={() => setType("frequently-sold")}
							/>
							<Label htmlFor="frequently-sold" className="text-brandPrimary">
								Most Frequently Selling Products
							</Label>
						</div> */}

            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="low-high"
                id="low-high"
                onClick={() => setType("low-high")}
              />
              <Label htmlFor="low-high" className="text-brandPrimary">
                {t("Price_Low_to_High")}
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="high-low"
                id="high-low"
                onClick={() => setType("high-low")}
              />
              <Label htmlFor="high-low" className="text-brandPrimary">
                {t("Price_High_to_Low")}
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="mb-6">
          <p className="font-bold text-brandDs pb-2">
            {t("Price")} {minPrice} {maxPrice}
          </p>
          <div className="grid grid-cols-2 gap-4">
            <input
              className="bg-brandLsSecondary p-2"
              type="number"
              placeholder="Min"
              value={minPrice}
              onWheel={(e) => (e.target as HTMLInputElement).blur()}
              onChange={(e) => {
                const value = e.target.value;
                if (Number(value) >= 0) {
                  setMinPrice(value);
                }
              }}
            />

            <input
              className="bg-brandLsSecondary p-2"
              type="number"
              placeholder="Max"
              value={maxPrice}
              onWheel={(e) => (e.target as HTMLInputElement).blur()}
              onChange={(e) => {
                const value = e.target.value;
                if (Number(value) >= 0) {
                  setMaxPrice(value);
                }
              }}
            />
          </div>
        </div>

        <div className="mb-6">
          <p className="font-bold text-brandDs pb-2">
            {" "}
            {t("Product_Category")}{" "}
          </p>
          <RadioGroup
            value={category}
            onValueChange={(value) => setCategory(value)}
          >
            {categoriesData?.map((category: ICategory) => (
              <div
                key={category.category_pid}
                className="flex items-center space-x-2"
              >
                <RadioGroupItem
                  value={category.category_pid}
                  id={category.category_pid}
                  onClick={() => setCategory(category.category_pid)}
                />
                <Label
                  htmlFor={category.category_name}
                  className="text-brandPrimary"
                >
                  {category.category_name}
                </Label>
              </div>
            ))}

            {/* <div className="flex items-center space-x-2">
							<RadioGroupItem
								value="food"
								id="food"
								onClick={() => setCategory("food")}
							/>
							<Label htmlFor="food" className="text-brandPrimary">
								Food
							</Label>
						</div>

						<div className="flex items-center space-x-2">
							<RadioGroupItem
								value="handicraft"
								id="handicraft"
								onClick={() => setCategory("handicraft")}
							/>
							<Label htmlFor="handicraft" className="text-brandPrimary">
								Handicrafts
							</Label>
						</div>

						<div className="flex items-center space-x-2">
							<RadioGroupItem
								value="ornament"
								id="ornament"
								onClick={() => setCategory("ornament")}
							/>
							<Label htmlFor="ornament" className="text-brandPrimary">
								Oranament Crafts
							</Label>
						</div>

						<div className="flex items-center space-x-2">
							<RadioGroupItem
								value="potteries"
								id="potteries"
								onClick={() => setCategory("potteries")}
							/>
							<Label htmlFor="potteries" className="text-brandPrimary">
								Potteries
							</Label>
						</div> */}
          </RadioGroup>
        </div>

        <div className="mb-6">
          <p className="font-bold text-brandDs pb-2"> {t("Rating")} </p>
          <RadioGroup
            value={rating}
            onValueChange={(value) => setRating(value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="5" id="5" onClick={() => setRating("5")} />
              <Label htmlFor="5" className="text-brandPrimary">
                <div className="flex">
                  <FaStar className="text-warning" />
                  <FaStar className="text-warning" />
                  <FaStar className="text-warning" />
                  <FaStar className="text-warning" />
                  <FaStar className="text-warning" />
                </div>
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value="4" id="4" onClick={() => setRating("4")} />
              <Label htmlFor="4" className="text-brandPrimary">
                <div className="flex">
                  <FaStar className="text-warning" />
                  <FaStar className="text-warning" />
                  <FaStar className="text-warning" />
                  <FaStar className="text-warning" />
                  <FaRegStar className="text-grey" />
                </div>
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value="3" id="3" onClick={() => setRating("3")} />
              <Label htmlFor="3" className="text-brandPrimary">
                <div className="flex">
                  <FaStar className="text-warning" />
                  <FaStar className="text-warning" />
                  <FaStar className="text-warning" />
                  <FaRegStar className="text-grey" />
                  <FaRegStar className="text-grey" />
                </div>
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value="2" id="2" onClick={() => setRating("2")} />
              <Label htmlFor="2" className="text-brandPrimary">
                <div className="flex">
                  <FaStar className="text-warning" />
                  <FaStar className="text-warning" />
                  <FaRegStar className="text-grey" />
                  <FaRegStar className="text-grey" />
                  <FaRegStar className="text-grey" />
                </div>
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1" id="1" onClick={() => setRating("1")} />
              <Label htmlFor="1" className="text-brandPrimary">
                <div className="flex">
                  <FaStar className="text-warning" />
                  <FaRegStar className="text-grey" />
                  <FaRegStar className="text-grey" />
                  <FaRegStar className="text-grey" />
                  <FaRegStar className="text-grey" />
                </div>
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* <div className="mb-6">
					<p className="font-bold text-brandDs pb-2"> Special Offers </p>
					<RadioGroup>
						<div className="flex items-center space-x-2">
							<RadioGroupItem
								value="sale"
								id="sale"
								onClick={() => setSpecialOffer("sale")}
							/>
							<Label htmlFor="sale" className="text-brandPrimary">
								On Sale
							</Label>
						</div>
						
						<div className="flex items-center space-x-2">
							<RadioGroupItem
								value="new-arrivals"
								id="new-arrivals"
								onClick={() => setSpecialOffer("new-arrivals")}
							/>
							<Label htmlFor="new-arrivals" className="text-brandPrimary">
								New Arrivals
							</Label>
						</div>
					
						<div className="flex items-center space-x-2">
							<RadioGroupItem
								value="customizable"
								id="customizable"
								onClick={() => setSpecialOffer("customizable")}
							/>
							<Label htmlFor="customizable" className="text-brandPrimary">
								Customizable Products
							</Label>
						</div>
					</RadioGroup>
				</div> */}
        <button
          className="px-9 py-2.5 border border-brandPrimary rounded-full text-brandPrimary block mx-auto mt-8 font-medium hover:bg-brandPrimary hover:text-white transition-all duration-300"
          onClick={applyFilters}
        >
          {t("Apply")}
        </button>
      </div>
    </div>
  );
};

export default FilterTypes;
