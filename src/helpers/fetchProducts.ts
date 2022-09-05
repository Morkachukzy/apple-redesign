import { fetcher } from "../utils/fetcher";

type Data = {
  products: [Product];
};

export const fetchProducts = async () => {
  const { products } = await fetcher<Data>("getProducts");
  return products;
};
