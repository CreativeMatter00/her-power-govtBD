import { useTranslations } from "next-intl";

interface PaginationProps {
  currentPage: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

const EventsPagination = ({
  currentPage,
  hasPreviousPage,
  hasNextPage,
  onPreviousPage,
  onNextPage,
}: PaginationProps) => {
  const t = useTranslations("resources_Library");

  return (
    <div className="flex justify-center mt-8 space-x-4">
      <button
        onClick={onPreviousPage}
        disabled={!hasPreviousPage}
        className={`px-4 py-2 border rounded ${
          !hasPreviousPage ? "cursor-not-allowed opacity-50" : ""
        }`}
      >
        {t("Previous")}
      </button>
      <span className="px-4 py-2">{` ${currentPage}`}</span>
      <button
        onClick={onNextPage}
        disabled={!hasNextPage}
        className={`px-4 py-2 border rounded ${
          !hasNextPage ? "cursor-not-allowed opacity-50" : ""
        }`}
      >
        {t("Next")}
      </button>
    </div>
  );
};

export default EventsPagination;
