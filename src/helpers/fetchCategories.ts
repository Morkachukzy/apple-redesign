import { fetcher } from "../utils/fetcher";

type Data = {
  categories: [Category];
};

export const fetchCategories = async () => {
  const { categories } = await fetcher<Data>("getCategories");
  return categories;
};
