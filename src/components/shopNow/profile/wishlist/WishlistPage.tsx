"use client";

import React, { useState } from "react";
import Wishlist from "./Wishlist";
import FollowedStores from "./FollowedStores";
import { useTranslations } from "next-intl";

const WishlistPage = () => {
  const t = useTranslations("talentHunt");

  const [active, setActive] = useState<string>("wishlist");

  return (
    <div>
      <div className="container mx-auto py-6">
        <p className="text-3xl text-brandPrimary">
          {t("Wishlist_&_Followed_Stores")}
        </p>

        <div className="my-10">
          <div className="flex items-center gap-8 font-bold border-b-2 pb-2 border-brandLsPrimary">
            <p
              className={`${
                active === "wishlist" ? "text-brandDs" : "text-grey"
              } cursor-pointer`}
              onClick={() => setActive("wishlist")}
            >
              {t("Wishlist")}
            </p>
            <p
              className={`${
                active === "stores" ? "text-brandDs" : "text-grey"
              } cursor-pointer`}
              onClick={() => setActive("stores")}
            >
              {t("Followed_Stores")}
            </p>
          </div>

          {active === "wishlist" && <Wishlist />}
          {active === "stores" && <FollowedStores />}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
