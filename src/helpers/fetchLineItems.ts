import { Stripe } from "stripe";
import { api } from "./../utils/api-utils";
export const fetchLineItems = async (sessionId: string) => {
  const data = await api.get<any>(`getSession?session_id=${sessionId}`);
  const { data: products } = data.session;

  return products as StripeProduct[];
};
