import { Product } from './Product';

export interface Category {
  productCategoryId: number;
  name: string;
  image: string;
  merchants: null;
  products: Product[];
}
