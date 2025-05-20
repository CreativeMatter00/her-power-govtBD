import { api } from "@/api/api";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AlertDialogAction } from "@radix-ui/react-alert-dialog";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CgDetailsMore } from "react-icons/cg";
import { FaClock } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";

interface ITaskCardProps {
  id: string;
  title: string;
  description: string;
  time: string;
  refetch: Function;
}

const PostedTaskCard = ({
  title,
  description,
  time,
  id,
  refetch,
}: ITaskCardProps) => {
  const t = useTranslations("career");

  const locale = useLocale();
  const pathName = usePathname();
  const handleRemoveTask = async (id: string) => {
    const response = await api.get(`/api/delete-task-post/${id}`);
    // console.log("response", response?.data.meta.status);
    if (response?.data.meta.status) {
      refetch();
    }
  };
  return (
    <div className="col-span-1 bg-brandLsSecondary p-8 space-y-2 flex flex-col justify-between">
      <div className="space-y-2">
        <p className="text-black font-bold text-2xl">{title}</p>

        {/* <p className="line-clamp-4 md:line-clamp-3 text-opacity-80">{description}</p> */}
        <p
          className="line-clamp-4 md:line-clamp-3 text-opacity-80"
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        />

        <div className="flex items-center gap-2">
          <FaClock className="text-brandDs font-bold w-5" />{" "}
          <p className="font-bold text-sm">{time}</p>
        </div>
      </div>

      <div className="flex flex-wrap md:flex-nowrap items-center pt-2 gap-4">
        {/* ======== edit button ====== */}
        <Link
          href={{
            pathname: `/${locale}/career/profile/job-provider/edit-task/${id}`,
            query: { redirect: pathName },
          }}
        >
          <button className="text-base px-6 py-2 bg-brandHover rounded-full text-white hover:text-white hover:bg-brandDs inline-flex justify-center items-center gap-2">
            <MdEdit />
            {t("Edit")}
          </button>
        </Link>

        {/* ====== remove button ======== */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className=" text-base px-6 py-2 bg-red-500 rounded-full text-white hover:text-white hover:bg-red-600 inline-flex justify-center items-center gap-2">
              <MdDelete />
              {t("Remove")}
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>{t("ConfirmRemove")}</AlertDialogTitle>
              <AlertDialogDescription>
                {t("areYouSureRemoveTask")}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t("Cancel")}</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleRemoveTask(id)}
                className="bg-brandDs text-brandLsPrimary px-6 py-2 rounded"
              >
                {t("Confirm")}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* ====== details button ====== */}
        <Link href={`/${locale}/career/tasks/${id}`} className="w-full">
          <button className="text-base px-6 py-2 bg-link rounded-full text-white hover:text-white hover:bg-linkHover inline-flex justify-center items-center gap-2">
            <CgDetailsMore />
            {t("Details")}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PostedTaskCard;
