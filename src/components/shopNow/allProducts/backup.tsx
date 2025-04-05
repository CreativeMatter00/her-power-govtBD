// "use client";

// import { getAllProductsDetail, getProductsByAdminPage } from "@/api/api";
// import ProductLoader from "@/components/shared/loader/ProductLoader";
// import ProductCard from "@/components/shared/ProductCard";
// import BreadCrumb from "@/components/ui/breadcrumb/BreadCrumb";
// import { useQuery } from "@tanstack/react-query";
// import { useTranslations } from "next-intl";
// import { useState } from "react";

// const AllProducts = () => {
//   const t = useTranslations("ShopNowHome");

//   // ? State for pagination
//   const [currentPage, setCurrentPage] = useState(1);

//   // ? API Call

//   const { isLoading, error, data } = useQuery({
//     queryKey: ["getAllProductsDetail", currentPage],
//     queryFn: () => getProductsByAdminPage(currentPage),
//   });

//   console.log(data);

//   // ? Extracting data from the response
//   const totalProducts = data?.data || []; // Array of products
//   const totalPages = data?.meta?.total_pages || 1; // Total number of pages(products)
//   const metaData = data?.meta;

//   // debugging
//   console.log(totalProducts);
//   console.log("total_pages", totalPages);

//   // Function to change the current page
//   const handlePageChange = (newPage: number) => {
//     if (newPage >= 1 && newPage <= totalPages) {
//       setCurrentPage(newPage);
//     }
//   };

//   if (error)
//     return (
//       <div className="text-center text-xl font-md py-8">
//         Something went wrong. Please reload
//       </div>
//     );

//   return (
//     <div>
//       <div className="h-24 border-b border-brandLsPrimary flex justify-center">
//         <BreadCrumb
//           title1={t("shopNow")}
//           link1="shop-now"
//           title2={t("allProducts")}
//         />
//       </div>
//       <div className="container mx-auto">
//         <p className="text-3xl text-brandPrimary pt-6"> {t("allProducts")} </p>

//         {/* ---------------- SEARCH FIELD ----------------   */}

//         <div className="flex items-center flex-col md:flex-row gap-2 md:gap-8 py-8">
//           <input
//             type="text"
//             placeholder={t("searchForProducts")}
//             className="my-6 py-2 px-4 text-xl flex-grow rounded-full w-full bg-white border border-brandPrimary"
//           />
//           <button className="w-48 bg-brandPrimary text-white py-2 rounded-full font-medium text-lg hover:bg-brandHover">
//             {t("search")}
//           </button>
//         </div>

//         {/* ---------------- PRODUCTS ----------------   */}

//         <div className="py-10">
//           {isLoading ? (
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//               {Array.from({ length: totalPages }).map((_, index) => (
//                 <div key={index} className="mx-auto">
//                   <ProductLoader />
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//               {totalProducts?.map((product: any, index: number) => (
//                 <div key={index} className="w-full mb-4 mx-auto">
//                   <ProductCard
//                     id={product?.product_pid}
//                     name={product?.product_name}
//                     image={product?.attachments[0]?.img_thumb}
//                     price={product?.variant[0]?.mrp}
//                     oldPrice={product?.variant[0].mrp_primary}
//                     rating={product?.avg_rating}
//                     sale={product?.is_sale}
//                   />
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Pagination Controls */}
//           <div className="my-8 text-lg flex justify-center text-brandDs font-medium">
//             {/* Previous Button */}
//             <button
//               className={`px-4 py-2 mx-2 rounded-md border-2 border-brandDs ${
//                 currentPage === 1
//                   ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                   : "bg-brandDs text-white hover:bg-white hover:text-brandDs"
//               }`}
//               onClick={() => handlePageChange(currentPage - 1)}
//               disabled={currentPage === 1}
//             >
//               Previous
//             </button>

//             {/* Page Number Buttons */}
//             {Array.from({ length: totalPages }, (_, index) => (
//               <button
//                 key={index + 1}
//                 className={`px-3 py-2 mx-1 rounded-md border-2 border-brandDs ${
//                   currentPage === index + 1
//                     ? "bg-brandDs text-white" // Highlight the current page
//                     : "bg-white text-brandDs hover:bg-brandDs hover:text-white"
//                 }`}
//                 onClick={() => handlePageChange(index + 1)}
//               >
//                 {index + 1}
//               </button>
//             ))}

//             {/* Next Button */}
//             <button
//               className={`px-4 py-2 mx-2 rounded-md border-2 border-brandDs ${
//                 currentPage === totalPages
//                   ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                   : "bg-brandDs text-white hover:bg-white hover:text-brandDs"
//               }`}
//               onClick={() => handlePageChange(currentPage + 1)}
//               disabled={currentPage === totalPages}
//             >
//               Next
//             </button>
//           </div>

//           {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
// 						{products.map((product, index) => (
// 							<div key={index} className="w-full mb-4 mx-auto">
// 								<ProductCard
// 									id={index}
// 									name={product.name}
// 									image={product.image}
// 									price={product.price}
// 									oldPrice={product.oldPrice}
// 									rating={product.rating}
// 									sale={product.sale}
// 								/>
// 							</div>
// 						))}
// 					</div>
// 					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
// 						{products.map((product, index) => (
// 							<div key={index} className="w-full mb-4 mx-auto">
// 								<ProductCard
// 									id={index}
// 									name={product.name}
// 									image={product.image}
// 									price={product.price}
// 									oldPrice={product.oldPrice}
// 									rating={product.rating}
// 									sale={product.sale}
// 								/>
// 							</div>
// 						))}
// 					</div> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllProducts;
