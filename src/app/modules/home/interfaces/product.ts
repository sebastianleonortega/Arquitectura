export interface Category {
  id: number;
  name: string;
  image: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
  creationAt: string;
  updatedAt: string;
}

export interface SendDataProduct {
  title: string,
  price: number,
  description: string,
  categoryId: number,
  images: string[]
}

