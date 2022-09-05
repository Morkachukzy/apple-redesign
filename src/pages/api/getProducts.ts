// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { groq } from "next-sanity";
import { sanityClient } from "../../../sanity";

const query = groq`*[_type == "product"] {
  _id,
  ...
}`;
type Data = {
  products: Product[];
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const products = await sanityClient.fetch(query);
  res.status(200).json({ products });
};
export default handler;
