import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { adminEmail } from "./api/api";

export default function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const locale = req.nextUrl.pathname.split('/')[1] || "en";
  const isCustomerCookie = req.cookies.get("isCustomer");
  const isSellerCookie = req.cookies.get("isSeller");
  const isUserCookie = req.cookies.get("user_pid");
  const isStudentCookie = req.cookies.get("isStudent");
  const isProviderCookie = req.cookies.get("isProvider");
  const isJobProviderCookie = req.cookies.get("isJobProvider");
  const email = req.cookies.get("email");
  const isCustomer = isCustomerCookie?.value === "true";
  const isSeller = isSellerCookie?.value === "true";
  const isUser = !!isUserCookie?.value;
  const isStudent = isStudentCookie?.value === "true";
  const isProvider = isProviderCookie?.value === "true";
  const isJobProvider = isJobProviderCookie?.value === "true";

  // ---------------------------------------------------------------------------------

  const profilePathRegex = /\/shop-now\/profile(?!\/cart)/;
  const cartPathRegex = /^\/shop-now\/profile\/cart\/?$/;
  const sellerDashboardPathRegex = /\/shop-now\/seller\/dashboard/;
  const organizerRegistrationPathRegex = new RegExp(
    `^/${locale}/events/organizer-registration$`
  );
  const courseProviderDashboardPathRegex = new RegExp(
    `^/${locale}/course/course-provider/dashboard$`
  );
  const courseStudentProfilePathRegex = new RegExp(
    `^/${locale}/course/student-profile$`
  );
  const courseStudentCoursePathRegex = new RegExp(
    `^/${locale}/course/student-courses$`
  );
  const allJobsPathRegex = new RegExp(`^/${locale}/career/all-jobs$`);
  const allTasksPathRegex = new RegExp(`^/${locale}/career/all-tasks$`);
  const jobProviderRegistrationPathRegex = new RegExp(
    `^/${locale}/career/job-provider-registration$`
  );

  // -------------------------------------------------------------------------------

  const isProfileRoute = profilePathRegex.test(req.nextUrl.pathname);
  const isCartRoute = cartPathRegex.test(req.nextUrl.pathname);
  const isSellerDashboardRoute = sellerDashboardPathRegex.test(
    req.nextUrl.pathname
  );
  const isOrganizerRegistrationRoute = organizerRegistrationPathRegex.test(
    req.nextUrl.pathname
  );
  const isCourseProviderDashboardRoute = courseProviderDashboardPathRegex.test(
    req.nextUrl.pathname
  );
  const isCourseStudentProfileRoute = courseStudentProfilePathRegex.test(
    req.nextUrl.pathname
  );
  const isCourseStudentCourseRoute = courseStudentCoursePathRegex.test(
    req.nextUrl.pathname
  );
  const isAllJobsRoute = allJobsPathRegex.test(req.nextUrl.pathname);
  const isAllTasksRoute = allTasksPathRegex.test(req.nextUrl.pathname);
  const isJobProviderRegistrationRoute = jobProviderRegistrationPathRegex.test(
    req.nextUrl.pathname
  );

  // ----------------------------------------------------------------------------

  if (isProfileRoute && !isCustomer) {
    return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
  }

  if (isCartRoute) {
    return res;
  }

  if (isSellerDashboardRoute && !isSeller) {
    return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
  }
  if (isOrganizerRegistrationRoute && !isUser) {
    const redirectUrl = new URL(`/${locale}/login`, req.url);
    redirectUrl.searchParams.set(
      "redirect",
      `/${locale}/events/organizer-registration`
    );
    return NextResponse.redirect(redirectUrl);
  }

  if (isCourseProviderDashboardRoute && !isProvider) {
    return NextResponse.redirect(new URL(`/${locale}`, req.url));
  }

  if (
    (isCourseStudentProfileRoute || isCourseStudentCourseRoute) &&
    !isStudent
  ) {
    return NextResponse.redirect(new URL(`/${locale}`, req.url));
  }

  if (isJobProvider && isJobProviderRegistrationRoute) {
    return NextResponse.redirect(new URL(`/${locale}/not-found`, req.url));
  }

  // --------------------------------------------------------------------------------
  

  const emailCookie = req.cookies.get("email");

  const restrictedRoutes = [
    { path: new RegExp(`^/${locale}/success-stories/add-stories$`)},
    { path: new RegExp(`^/${locale}/success-stories/stories/stories-management$`)},
    { path: new RegExp(`^/${locale}/success-stories/stories/stories-management/edit-stories$`)},
    { path: new RegExp(`^/${locale}/challenges/add-challenge$`)},
    { path: new RegExp(`^/${locale}/challenges/challenge/challenge-management$`)},
    { path: new RegExp(`^/${locale}/challenges/challenge/challenge-management/edit-challenge/$`)},
  ];
  for (const route of restrictedRoutes) {
    if (route.path.test(req.nextUrl.pathname) && email?.value !== adminEmail) {
      return NextResponse.redirect(new URL(`/${locale}`, req.url));
    }
  }
  const isAdminRoute = new RegExp(`^/${locale}/admin(/.*)?$`).test(
    req.nextUrl.pathname
  );
  // console.log({ isAdminRoute });
  if (isAdminRoute) {
    if (emailCookie?.value !== adminEmail) {
      return NextResponse.redirect(new URL(`/${locale}`, req.url));
    }
  }
  return createMiddleware({
    locales: ["bn", "en"],
    defaultLocale: "bn",
  })(req);
}

export const config = {
  matcher: ["/", "/(bn|en)/:path*"],
};
