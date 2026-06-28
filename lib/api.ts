export {
  fetchProduct,
  fetchProductBySlug,
  fetchProductCategories,
  fetchProducts,
  fetchProductsWithDetails,
} from "@/lib/api/products/queries";
export type {
  FetchProductsParams,
  FetchProductsResult,
  Product,
  ProductCategory,
} from "@/lib/api/products/types";

export {
  fetchBlogPostCategories,
  fetchBlogPost,
  fetchBlogPosts,
  fetchBlogPostsWithDetails,
  fetchPostCategories,
  fetchPost,
  fetchPosts,
  fetchPostsWithDetails,
} from "@/lib/api/posts/queries";
export type {
  FetchBlogPostsParams,
  FetchBlogPostsResult,
  FetchPostsParams,
  FetchPostsResult,
  Post,
  PostCategory,
} from "@/lib/api/posts/types";

export {
  fetchFaqs,
  fetchFaqCategories,
  useFaqs,
  useFaqCategories,
} from "@/lib/api/faqs/queries";
export type {
  Faq,
  FaqCategory,
  FetchFaqsParams,
} from "@/lib/api/faqs/types";
