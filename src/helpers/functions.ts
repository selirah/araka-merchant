import { Currency, Category, Product } from '../interfaces';

export const getCurrency = (
  currencies: Currency[],
  currencyCodeId: number
): string => {
  const currency = currencies.find((c) => c.numericCode === currencyCodeId);
  if (currency !== undefined) {
    return currency.code;
  } else {
    return 'none';
  }
};

export const getCategoryName = (
  categories: Category[],
  categoryId: number
): string => {
  const category = categories.find((c) => c.productCategoryId === categoryId);
  if (category !== undefined) {
    return category.name;
  } else {
    return 'none';
  }
};

export const getProductName = (
  categories: Category[],
  categoryId: number,
  productId: number
): string => {
  const category = categories.find((c) => c.productCategoryId === categoryId);
  if (category !== undefined) {
    const product = category.products.find((p) => p.productId === productId);
    if (product !== undefined) {
      return product.name;
    } else {
      return 'none';
    }
  } else {
    return 'none';
  }
};

export const getCategory = (
  categories: Category[],
  categoryId: number
): Category => {
  const category = categories.find((c) => c.productCategoryId === categoryId);
  return category!;
};

export const getProduct = (
  categories: Category[],
  categoryId: number,
  productId: number
): Product => {
  const category = categories.find((c) => c.productCategoryId === categoryId);
  const product = category!.products.find((p) => p.productId === productId);
  return product!;
};

export const filterCategories = (
  categories: Category[],
  query: string
): Category[] => {
  let filteredList: Category[] = [];
  filteredList = categories.filter((category) => {
    const lowerCase = category.name.toLowerCase();
    const filter = query.toLowerCase();
    return lowerCase.includes(filter);
  });
  return filteredList;
};

export const filterCategoriesById = (
  categories: Category[],
  id: number
): Category | undefined => {
  const category = categories.find((c) => c.productCategoryId === id);
  if (category === undefined) {
    return undefined;
  }
  return category;
};

export const filterProducts = (categories: Category[]): Product[] => {
  // check if user wants all products
  let products: Product[] = [];
  for (let i = 0; i < categories.length; i++) {
    const prods = categories[i].products;
    for (let j = 0; j < prods.length; j++) {
      products.push(prods[j]);
    }
  }

  return products;
};
