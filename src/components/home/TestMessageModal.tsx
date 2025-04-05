"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Lottie from "lottie-react";
// Example path to Lottie JSON file
import testing from "../../../public/assets/testing.json";
import { useTranslations } from "next-intl";

const TestMessageModal = () => {
  const t = useTranslations("Index");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="animate-fadeIn z-50 max-w-md bg-bgPrimary text-brandPrimary border-none rounded-lg p-5 shadow-lg">
        <div className="flex justify-center mb-4">
          <Lottie
            animationData={testing}
            loop={true}
            className="w-auto h-[300px]"
          />
        </div>
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">
            {t("testModalTitle")}
          </DialogTitle>
          <DialogDescription className="text-greyPrimary mt-3 text-sm text-center">
            {t("testModalDescription")}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 text-center">
          <button
            onClick={() => setIsOpen(false)}
            className="bg-brandPrimary text-bgPrimary px-4 py-2 rounded-md hover:bg-brandHover transition duration-200"
          >
            {t("okayGotIt")}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TestMessageModal;
