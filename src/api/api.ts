import axios from "axios";
import Cookies from "js-cookie";
import { adminMail, baseUrl } from "../../config/config";
export const url =baseUrl();
export const adminEmail=adminMail();
// env
// export const url = process.env.NEXT_PUBLIC_API_URL;

export const api = axios.create({
  baseURL: url,
});


api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token"); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.data?.message === "Unauthenticated") {
      const locale = Cookies.get("NEXT_LOCALE") || "en"
      Object.keys(Cookies.get()).forEach((cookieName) => {
        Cookies.remove(cookieName);
      });
      localStorage.clear();
      window.location.href = `/${locale}/login`; 
    }
    return Promise.reject(error);
  }
);

export const placeholderImage = `https://placehold.co/600x400?text=PlaceHolder+Image`;

// export const token =
//   "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI1IiwianRpIjoiMTE5NjQwYjdkMzQ3MTZjNGQ1NTU4Yjc0OTlmYTFjYmI1ZmMyZmJlMDQ5MzljNjVhYzRmNWVkZTYxYjg1YzlkMTZmZTA4NzY0ZTZiNmI2ZTUiLCJpYXQiOjE3MjM5ODA4MzEuMjIyMzQ3LCJuYmYiOjE3MjM5ODA4MzEuMjIyMzQ5LCJleHAiOjE3NTU1MTY4MzEuMjE3MTU4LCJzdWIiOiI1MSIsInNjb3BlcyI6W119.cAqYmwOVcTXLgsFzcnxcHfdd_hK2BaRWSlgwVHH-EzYYNjCIJu6K7aGKVElHcVhbG3J34a47V_4Hb_xot1QJ9kovXBvD1fqi9qTrloINvu7zjWSZXplG3m1JqlkLNYEQL0yowmA9AEi5or4I3X9wyQ8WhP2fUstDfw7nPeqKXiGjnaBVsR0QLvfCzD0HsgGiwIO-AtkNKCctas3f_K_5pUepfSjJQ99Ohgug690k5MtWRG2OUE6XtXCRmE0mXmL8IqWRSWOw3UcefUiaBvWs3r0D6tnHLumt42-aAPSbQW7EMhzn80ghla5A5RB97wByzk8Dx08TBZm2G-fCly34oXuyPd-_d4i4p13dRlGlus3U30ckxzhU5eOC8mWxH_YgEFi-GpvCpOLz5kyWwwsu5Gx1lbS04XveHBDJiKqCX6ybluQvH8OWPRd_gCNC5Ei6hVGdml7s6MFwpLZ3tueD-PPuY53ysmwZmLQM6e8mEzqck6AWXAfNTmXQsbdoUyqfLfa6U0tTrqI1loi-gkHxUaE-eu31hCGcQ2yqeBDuALQerd8sNF76dY-5WkdGUFAjhEng_jwMTJIVQkIMhjA14LQC6LSD1yp290Ybhn1KoiRVuoZ39rdO10A3-GfCUjY8rDSd5TkLSQgo7dL1_1YBdzYjZpx4HWy5OPsQnsCHFLE";

// ? Get Popular Products Home

export const getPopularProductsHome = async () => {
  try {
    const response = await api.get(`/api/frontend/popular-products`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// ? Get Popular Products All

export const getPopularProductsAll = async () => {
  try {
    const response = await api.get(
      `/api/frontend/popular-products-peginate`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// ? Get New Products Home

export const getNewProductsHome = async () => {
  try {
    const response = await api.get(`/api/frontend/new-products`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// ? Get New Products All

export const getNewProductsAll = async () => {
  try {
    const response = await api.get(
      `/api/frontend/new-products-peginate`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// ? Get All Products Home

export const getAllProductsHome = async () => {
  try {
    const response = await api.get(`/api/frontend/products`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// ? Get All Products Detail

export const getAllProductsDetail = async (page: string | number) => {
  try {
    const response = await api.get(
      `/api/frontend/products-peginate?page=${page}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// ? Get Product Details

export const getProductDetails = async (id: string) => {
  try {
    const response = await api.get(`/api/frontend/products/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// ? PRODUCT DETAIL CHAT
export const getProductDetailsChat = async (id: string,page:any) => {
  try {
    const response = await api.get(`/api/admin/chat-with-seller/${id}?page=${page}`);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

// ? Get Product details with customer ID
export const getProductDetailWithCustomerId = async (
  productID: string,
  customerID: string
) => {
  try {
    const response = await api.get(
      `/api/frontend/products/${productID},${customerID}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// ? Get Product Categories

export const getProductCategories = async () => {
  try {
    const response = await api.get(`/api/frontend/category`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// ? Get Products by Category

export const getProductByCategory = async (
  id: string,
  page: string | number
) => {
  try {
    const response = await api.get(
      `/api/frontend/products-by-category-id/${id}?page=${page}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// ? Get Latest News

export const getNews = async () => {
  try {
    const response = await api.get(`/api/frontend/news`);
    return response?.data?.data;
  } catch (error) {
    console.log(error);
  }
};

// ? get latest news by admin with pagination

export const getNewsAdminById = async (page = 1) => {
  try {
    const response = await api.get(`/api/admin/news?page=${page}`);
    return response?.data;
  } catch (error) {
    console.log(error);
    throw error; // Rethrow the error to handle it properly in the calling component
  }
};

// ? get latest news by admin

export const getNewsAdmin = async () => {
  try {
    const response = await api.get(`/api/admin/news`);
    return response?.data?.data;
  } catch (error) {
    console.log(error);
  }
};

// ? Get Product Categories Frontend

export const getProductFrontendCategory = async () => {
  try {
    const response = await api.get(`/api/frontend/category`);
    return response?.data?.data;
  } catch (error) {
    console.log(error);
  }
};

// ? Get User Info

export const getUserInfo = async (id: string) => {
  try {
    const response = await api.get(`/api/admin/get-userinfo/${id}`);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

// ? Get wishlist prdoucts

export const getWishlistProducts = async (id: string) => {
  try {
    const response = await api.get(`/api/admin/wishlist/${id}`);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

// ? Get followed stores

export const getFollowedStores = async (id: string) => {
  try {
    const response = await api.get(`/api/admin/follower/${id}`);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

// ? Get all sponsors

export const getAllSponsers = async () => {
  try {
    const response = await api.get(`/api/admin/event/sponsor`);
    return response?.data?.data;
  } catch (error) {
    console.log(error);
  }
};

// ? Get seller basic info

export const getSellerBasicInfo = async (id: string) => {
  try {
    const response = await api.get(
      `/api/admin/seller-basic-info/${id}`
    );
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
export const sellerApprove = async (seller_pid: string|null, data:any) => {
  try {
    const response = await api.post(`/api/admin/seller-approve/${seller_pid}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
// ? Get seller latest products

export const getLatestSellerProducts = async (id: string) => {
  try {
    const response = await api.get(
      `/api/admin/seller-last-product/${id}`
    );
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

// ? Get seller latest products

export const getAllSellerProducts = async (
  id: string,
  page: string | number
) => {
  try {
    const response = await api.get(
      `/api/admin/seller-all-product/${id}?page=${page}`
    );
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const getSellerOrderInfo = async (id: string) => {
  // try {
  // 	const response = await api.get(`/api/admin/get-userinfo/${id}`);
  // 	return response?.data;
  // } catch (error) {
  // 	console.log(error);
  // }
  try {
    const response = await api.get(`/api/admin/seller-oder-info/${id}`);
    console.log("response", response);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

// ? Get seller order list of products

export const sellerOrderList = async (id: any) => {
  try {
    const response = await api.get(`/api/admin/seller-oder-list/${id}`);

    return response?.data?.data;
  } catch (error) {
    console.log(error);
  }
};

// ? Get seller order list for seller for id

export const sellerOrderDetails = async (id: any) => {
  try {
    const response = await api.get(
      `/api/admin/seller-oder-details/${id}`
    );
    return response?.data?.data;
  } catch (error) {
    console.log(error);
  }
};

// ? Get seller all products

export const getSellerAllProducts = async (id: any) => {
  try {
    const response = await api.get(
      `/api/admin/product-by-id/${id}`
    );
    return response?.data?.data;
  } catch (error) {
    console.log(error);
  }
};

// ? Get seller chats

export const getSellerChat = async (id: any,page: string | number,queryNumber:any) => {
  try {
    const response = await api.get(
      `/api/admin/get-chats-for-seller/${id}/${queryNumber}?page=${page}`
    );
    return response?.data?.data;
  } catch (error) {
    console.log(error);
  }
};

// ? Get order detailos for user

export const getOrderDetails = async (id: string) => {
  try {
    const response = await api.get(
      `/api/admin/user-oder-details/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// ? Get Admin User Info

export const getSellerInfo = async (id: string) => {
  try {
    const response = await api.get(`/api/admin/get-userinfo/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// ? Get Search Product

export const getSearchProduct = async (urlLastSegment: string | undefined) => {
  // console.log(urlLastSegment);
  try {
    const response = await api.get(
      `/api/frontend/customer-product-filter?${urlLastSegment}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// ? Get seller Search Product

export const getSellerSearchProduct = async (
  urlLastSegment: string | undefined
) => {
  // console.log(urlLastSegment);
  try {
    const response = await api.get(
      `/api/frontend/customer-product-filter?${urlLastSegment}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// ? Get seller Search Product

export const getAllReviews = async (productId: string | undefined) => {
  // console.log(urlLastSegment);
  try {
    const response = await api.get(
      `/api/frontend/review-rating/${productId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// ? Get Product Details

export const getCustomerOrderCount = async (id: string) => {
  try {
    const response = await api.get(
      `/api/admin/customer-oder-count/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// ? Get Single Order Details

export const getSingleOrderDetails = async (id: string) => {
  try {
    const response = await api.get(
      `/api/admin/seller-oder-details/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// ? Get latest Notifications

export const getLastFourNotifications = async (id: string) => {
  try {
    const response = await api.get(
      `/api/admin/recent-notifications/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// ? Get all Notifications

export const getAllNotifications = async (id: string) => {
  try {
    const response = await api.get(
      `/api/admin/all-notifications/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// * EVENTS API

// ? Get All Event Categories

export const getAllEventCategories = async () => {
  try {
    const response = await api.get(`/api/admin/ew-category`);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

// ? Get All Divisions

export const getAllDivisions = async () => {
  try {
    const response = await api.get(`/api/admin/geo-division`);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

// ? Get all venues

export const getAllVenue = async () => {
  try {
    const response = await api.get(`/api/admin/event/venue`);
    return response?.data?.data;
  } catch (error) {
    console.log(error);
  }
};

export const courseApprove = async (course_provider: string|null, data:any) => {
  try {
    const response = await api.post(`/api/admin/course-provider-approve/${course_provider}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
export const getAllProviders = async () => {
  try {
    const response = await api.get(`/api/admin/course-providers`);
    return response?.data?.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllStudents = async () => {
  try {
    const response = await api.get(`/api/admin/students`);
    return response?.data?.data;
  } catch (error) {
    console.log(error);
  }
};
// ? Get All users
export const getAllUsers = async () => {
  try {
    const response = await api.get(`/api/admin/get-alluser`);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
// ? Get All sellers
export const getAllSellers = async () => {
  try {
    const response = await api.get(`/api/admin/get-allseller`);
    // console.log(response?.data)
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
// ? Get all speakers

export const getAllSpeakers = async () => {
  try {
    const response = await api.get(`/api/admin/event/speaker`);
    return response?.data?.data;
  } catch (error) {
    console.log(error);
  }
};

// ? Get all speakers

export const getAllEventsCategory = async () => {
  try {
    const response = await api.get(`/api/admin/ew-category`);
    return response?.data?.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllEventByCategory = async (
  query: string | undefined | null
) => {
  try {
    const response = await api.get(`/api/${query}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllEventByMonthYear = async (monthYear: string) => {
  try {
    const response = await api.get(
      `/api/frontend/events-by-monthyear/${monthYear}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//! GET FIRST 6 UPCOMING EVENTS

export const getLimitedUpcomingEvents = async () => {
  try {
    const response = await api.get(
      `/api/frontend/up-comming-events-firstsix`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// ? Get upcoming events all

export const getUpcomingEventsAll = async (page: number = 1) => {
  try {
    const response = await api.get(
      `/api/frontend/up-comming-events-all?page=${page}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// ? Get featured events home

export const getFeaturedEventsHome = async () => {
  try {
    const response = await api.get(
      `/api/frontend/featured-events-firstEight`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// ? Get featured events home

export const getAllFeaturedEvents = async (page: number) => {
  try {
    const response = await api.get(
      `/api/frontend/featured-events-otherall?page=${page}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// ? Get all events

export const getAllEvents = async (page: number) => {
  try {
    const response = await api.get(
      `/api/frontend/get-all-events?page=${page}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// ? Get All Events

export const getAllEventsBackend = async () => {
  try {
    const response = await api.get(`/api/admin/event/newEvent`);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
// ? Get All Events by ID

export const getAllEventsBackendById = async (id: string) => {
  try {
    const response = await api.get(`/api/admin/event-by-id/${id}`);

    const responseData = response?.data?.data;
    // console.log(responseData);
    return responseData;
  } catch (error) {
    console.log(error);
  }
};

// ? Get past events
export const getPastEvents = async (page: number) => {
  try {
    const response = await api.get(
      `/api/frontend/post-events-all?page=${page}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// ? Get search events

export const getSearchEvents = async (query: string) => {
  try {
    const response = await api.get(`/api/admin/search-event?${query}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// ? Get search events

export const getEventsByOrganizer = async (id: string) => {
  try {
    const response = await api.get(
      `/api/admin/events-by-organizer/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getOrganizerProviders = async () => {
  try {
    const response = await api.get(`/api/admin/event/organizer`);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
export const approveOrganizerProvider = async (org_provider_pid: string|null, data:any) => {
  try {
    const response = await api.post(`/api/admin/organizer-approve/${org_provider_pid}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    return response?.data;
  } catch (error:any) {
    throw new Error(error?.response?.data?.meta?.message || "something went wrong")
  }
};
// Overview

export const getOverViewData = async (id: string) => {
  try {
    const response = await api.get(
      `/api/admin/registration-overview/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// ? GET FIRST 8 ALL EVENTS FOR EVENT HOME PAGE

export const getLimitedAllEvents = async () => {
  try {
    const response = await api.get(
      `/api/frontend/firsteight-of-allevents`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// ? GET FIRST 6 PAST EVENTS FOR EVENT HOME PAGE

export const getLimitedPastEvents = async () => {
  try {
    const response = await api.get(
      `/api/frontend/post-events-firstSix`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// ? GET all divisions by id

export const getAllDevisions = async () => {
  try {
    const response = await api.get(`/api/admin/geo-division`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// ? GET all divisions by id

export const getEventsDivisionId = async (query: string) => {
  try {
    const response = await api.get(
      `/api/frontend/events-by-division/${query}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// ? GET all divisions by id

export const getEventsParticipant = async (id: string) => {
  try {
    const response = await api.get(`/api/admin/users-of-event/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// ? GET all event paricipant by user by id

export const getEventsParticipantByUser = async (id: string) => {
  try {
    const response = await api.get(
      `/api/admin/event/participant/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// ? Get Physical Courses

export const getPhyscialCourses = async () => {
  try {
    const response = await api.get(
      `/api/frontend/get-course?courseType=physical`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// ? Get Online Courses
export const addNewLesson = async (data: any) => {
  try {
    await api.post(`/api/admin/course-lessons`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
  } catch (error) {
    console.log(error);
  }
};
export const getOnlineCourses = async () => {
  try {
    const response = await api.get(
      `/api/frontend/get-course?courseType=online`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getCourseLessons = async (id: string) => {
  try {
    const response = await api.get(
      `/api/admin/course-lessons/${id}`
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
export const getCourseLessonById = async (id: string|null) => {
  try {
    const response = await api.get(
      `/api/admin/course-lesson/${id}`
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
export const getCourseDetailsById = async (id: string|null) => {
  try {
    const response = await api.get(
      `/api/frontend/get-course-details/${id}`
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
// ? Get Blended Courses

export const getBlendedCourses = async () => {
  try {
    const response = await api.get(
      `/api/frontend/get-course?courseType=blended`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// ? Get course by id

export const getCourseDetail = async (id: string) => {
  try {
    const response = await api.get(
      `/api/frontend/get-course-details/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// ? Get course by id with studentID

export const getCourseDetailWithStudentId = async (
  courseid: string,
  studentid: string
) => {
  try {
    const response = await api.get(
      `/api/frontend/get-course-details/${courseid},${studentid}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// ? Get mentor by id

export const getProviderInfo = async (id: string) => {
  try {
    const response = await api.get(`/api/frontend/mentor/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// ? Get mentor by id

export const getStudentInfo = async (id: string) => {
  try {
    const response = await api.get(`/api/frontend/student/${id}`);
    return response?.data?.data;
  } catch (error) {
    console.log(error);
  }
};

// ? Get Skillset

export const getSkillSet = async () => {
  try {
    const response = await api.get(`/api/get-skillset`);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
export const getSkillBySkillset = async (id: string) => {
  try {
    const response = await api.get(`/api/get-skill-by-skillset/${id}`);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

// ? GET ALL SKILL
export const getAllSkill = async () => {
  try {
    const response = await api.get(`/api/get-all-skills`);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

// ? Get All Branches by provider id

export const getBranchList = async (id: string) => {
  try {
    const response = await api.get(`/api/admin/branch/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// ? Get All courses by provider id

export const getCoursesByProviderId = async (id: string) => {
  try {
    const response = await api.get(
      `/api/frontend/course-by-user_id/${id}`
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

// ? Get Latest Jobs
export const getJobProviders = async () => {
  try {
    const response = await api.get(`/api/get-all-job-providers`);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
export const approveJobProvider = async (job_provider_pid: string|null, data:any) => {
  try {
    const response = await api.post(`/api/admin/job-provider-approve/${job_provider_pid}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    return response?.data;
  } catch (error:any) {
    console.log(error?.response?.data?.meta?.message)
    throw new Error(error?.response?.data?.meta?.message || "something went wrong")
  }
};
export const getLatestJobs = async () => {
  try {
    const response = await api.get(`/api/get-latest-jobs`);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

// ? Get Latest Jobs

export const getLatestTasks = async () => {
  try {
    const response = await api.get(`/api/get-latest-tasks`);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

// ? Get All Jobs

export const getAllJobs = async (page: number) => {
  try {
    const response = await api.get(`/api/get-all-jobs?page=${page}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// ? Get All Tasks

export const getAllTasks = async (page: number) => {
  try {
    const response = await api.get(`/api/get-all-tasks?page=${page}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
// ? Get All Tasks

export const getStudentEnrolledCourse = async (id: string) => {
  try {
    const response = await api.get(
      `/api/frontend/get-student-enrolled-course/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// ? Get Job detail by id

export const getJobDetailById = async (id: string) => {
  try {
    const response = await api.get(`/api/get-job/${id}`);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

// ? Get Job detail by id

export const getTaskDetailById = async (id: string) => {
  try {
    const response = await api.get(`/api/get-task/${id}`);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

// ? Get Provider info by id

export const getCourseProviderInfoById = async (id: string) => {
  try {
    const response = await api.get(`/api/admin/course-provider/${id}`);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
// ? Get job provider info by id

export const getJobProviderInfo = async (id: string) => {
  try {
    const response = await api.get(`/api/get-job-provider/${id}`);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

// ? Get Searched Courses

export const getSearchedCourses = async (param: string) => {
  try {
    const response = await api.get(
      `/api/frontend/search-course?searchQuery=${param}`
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
// ? Get Searched Courses

// ? Get Searched Courses

export const getPostedJobsByProviderId = async (id: string) => {
  try {
    const response = await api.get(`/api/get-jobs-by-provider/${id}`);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

// ? Get Searched Courses

export const getPostedTaskByProviderId = async (id: string) => {
  try {
    const response = await api.get(`/api/get-task-by-provider/${id}`);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

// ? Get Searched Courses

export const getJobDetailsById = async (id: string) => {
  try {
    const response = await api.get(`/api/get-job/${id}`);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

// ? Get Task Details By ID

export const getTaskDetailsById = async (id: string) => {
  try {
    const response = await api.get(`/api/get-task/${id}`);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

// ? Get Job Provider By ID

export const getJobProviderDetailsById = async (id: string) => {
  try {
    const response = await api.get(`/api/get-job-provider/${id}`);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
// ? Get course Provider By ID

export const getCourseProviderDetailsById = async (id: string) => {
  try {
    const response = await api.get(`/api/admin/course-provider/${id}`);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchData = async (path: string) => {
  try {
    const response = await api.get(`/api/${path}`);
    return response.data.data;
  } catch (err: any) {
    console.log("error");
  }
};

export const getJobSeekerEditById = async (id: string) => {
  try {
    const response = await api.get(`/api/get-job-seeker/${id}`);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getProductCategory = async () => {
  try {
    const response = await api.get(`/api/admin/category`);
    return response?.data?.data;
  } catch (error) {
    console.log(error);
  }
};
export const getAllBlogs = async (page: number) => {
  try {
    const response = await api.get(
      `/api/admin/blog-post-all-blogs?page=${page}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getBlogs = async () => {
  try {
    const response = await api.get(
      `/api/admin/admin-blog-post`
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
export const approveBlogProvider = async (blog_provider_pid: string|null, data:any) => {
  try {
    const response = await api.post(`/api/admin/organizer-approve/${blog_provider_pid}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    return response?.data;
  } catch (error:any) {
    throw new Error(error?.response?.data?.meta?.message || "something went wrong")
  }
};
export const blogsManagement = async (page: number,userID:string) => {
  try {
    const response = await api.get(
      `/api/admin/get-vbad-by-pid/${userID}/10?page=${page}`
    );
    return response.data.blogs;
  } catch (error) {
    console.log(error);
  }
};
export const getHomeBlogs = async () => {
  try {
    const response = await api.get(`/api/admin/blog-post-homepage`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getBlogById = async (id: string, num: number) => {
  try {
    const response = await api.get(`/api/admin/blog-post/${id}/${num}`);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
export const getCommentById = async (id: string, num: number) => {
  try {
    const response = await api.get(
      `/api/admin/get-blog-comment/${id}/${num}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllDocuments = async (page: number) => {
  try {
    const response = await api.get(`/api/admin/documents?page=${page}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const documentsManagement = async (page: number,userID:string) => {
  try {
    const response = await api.get(`/api/admin/get-vbad-by-pid/${userID}/10?page=${page}`);
    return response.data.documents;
  } catch (error) {
    console.log(error);
  }
};
export const getHomeDocuments = async () => {
  try {
    const response = await api.get(`/api/admin/document-homepage`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllVideos = async (page: number) => {
  try {
    const response = await api.get(`/api/admin/videos?page=${page}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const videoManagement = async (page: number,userID:string) => {
  try {
    const response = await api.get(`/api/admin/get-vbad-by-pid/${userID}/10?page=${page}`);
    return response.data.videos;
  } catch (error) {
    console.log(error);
  }
};

export const getHomeVideos = async () => {
  try {
    const response = await api.get(`/api/admin/video-homepage`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getVideoById = async (id: string) => {
  try {
    const response = await api.get(`/api/admin/video/${id}`);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllArticles = async (page: number) => {
  try {
    const response = await api.get(`/api/admin/articles?page=${page}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const articlesManagement = async (page: number,userID:string) => {
  try {
    const response = await api.get(`/api/admin/get-vbad-by-pid/${userID}/10?page=${page}`);
    return response.data.articles;
  } catch (error) {
    console.log(error);
  }
};

export const getHomeArticle = async () => {
  try {
    const response = await api.get(`/api/admin/article-homepage`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getArticleById = async (id: string) => {
  try {
    const response = await api.get(`/api/admin/articles/${id}`);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};


export const getHomeStories = async () => {
  try {
    const response = await api.get(`/api/admin/success-stories-homepage`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllStories= async (page: number) => {
  try {
    const response = await api.get(`/api/admin/success-stories?page=${page}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getStoryById = async (id: string) => {
  try {
    const response = await api.get(`/api/admin/success-stories/${id}`);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
}

export const getHomeChallenges = async () => {
  try {
    const response = await api.get(`/api/admin/challanges-homepage`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllChallenges = async (page: number) => {
  try {
    const response = await api.get(
      `/api/admin/challanges?page=${page}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getChallengeById = async (id: string) => {
  try {
    const response = await api.get(`/api/admin/challanges/${id}`);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};