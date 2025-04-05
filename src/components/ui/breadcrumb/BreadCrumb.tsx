import { useLocale } from "next-intl";
import Link from "next/link";

type IBreadCrumb = {
  title1: string;
  link1: string;
  title2: string;
};

const BreadCrumb = (props: IBreadCrumb) => {
  const locale = useLocale();

  return (
    <div className="flex items-center gap-2 container mx-auto py-4 px-5 lg:px-2 mt-2">
      <Link href={`/${locale}/`} className="text-link hover:text-linkHover">
        {locale === "bn" ? <> হোম </> : <> Home </>}
      </Link>
      /
      <Link
        href={`/${locale}/${props.link1}`}
        className="text-link hover:text-linkHover"
      >
        {props.title1}
      </Link>
      /<div className="text-greyPrimary"> {props.title2} </div>
    </div>
  );
};

export default BreadCrumb;
