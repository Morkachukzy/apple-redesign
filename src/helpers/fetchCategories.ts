import { api } from "../utils/api-utils";

type Data = {
  categories: Category[];
};

export const fetchCategories = async () => {
  const { categories } = await api.get<Data>("getCategories");
  return categories;
};
