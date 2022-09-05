type Slug = {
  _type: "slug";
  current: string;
};

type CategoryType = "IPAD" | "APPLE-WATCH" | "IPHONE" | "MAC";

type Category = {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  _type: "category";
  slug: Slug;
  title: string;
};

type Image = {
  _key: string;
  _type: "image";
  asset: {
    url: string;
  };
};

type Product = {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  _type: "product";
  title: string;
  price: number;
  slug: Slug;
  description: string;
  category: {
    _type: "reference";
    _ref: string;
  };
  image: Image[];
};

type ProductInformation = {
  details: Product;
  quantity: number;
};

type StripeProduct = {
  id: string;
  amount_discount: number;
  amount_subtotal: number;
  amount_tax: number;
  amount_total: number;
  currency: string;
  description: string;
  object: string;
  quantity: number;
  price: {
    unit_amount: number;
  };
};
