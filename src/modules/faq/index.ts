export { default as FaqClient } from "./components/faq-client";
export {
  fetchFaqCategories,
  fetchFaqs,
  useFaqCategories,
  useFaqs,
} from "./lib/queries";
export type { Faq, FaqCategory, FetchFaqsParams } from "./types";
