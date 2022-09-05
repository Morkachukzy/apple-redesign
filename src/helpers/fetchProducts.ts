import { api } from "../utils/api-utils";

type Data = {
  products: Product[];
};

export const fetchProducts = async () => {
  const { products } = await api.get<Data>("getProducts");
  return products;
};
