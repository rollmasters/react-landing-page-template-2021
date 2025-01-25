type Product = {
  id: number;
  type: string;
  image: string;
  price: number;
};

const mockProducts: Product[] = [
  { id: 1, type: "tops", image: "/img/pngegg (3).png", price: 29.99 },
  { id: 2, type: "tops", image: "/img/pngegg (3).png", price: 29.99 },
  { id: 3, type: "tops", image: "/img/pngegg (3).png", price: 29.99 },
  { id: 4, type: "tops", image: "/img/pngegg (3).png", price: 29.99 },
  { id: 5, type: "tops", image: "/img/pngegg (3).png", price: 29.99 },
  { id: 6, type: "tops", image: "/img/pngegg (3).png", price: 29.99 },
  { id: 7, type: "bottoms", image: "/img/e1f048f4ee0b4c1b9c66bc8cac0b2089 31.png", price: 39.99 },
  { id: 8, type: "bottoms", image: "/img/e1f048f4ee0b4c1b9c66bc8cac0b2089 31.png", price: 39.99 },
  { id: 9, type: "bottoms", image: "/img/e1f048f4ee0b4c1b9c66bc8cac0b2089 31.png", price: 39.99 },
  { id: 10, type: "bottoms", image: "/img/e1f048f4ee0b4c1b9c66bc8cac0b2089 31.png", price: 39.99 },
  { id: 11, type: "bottoms", image: "/img/e1f048f4ee0b4c1b9c66bc8cac0b2089 31.png", price: 39.99 },
  { id: 12, type: "bottoms", image: "/img/e1f048f4ee0b4c1b9c66bc8cac0b2089 31.png", price: 39.99 },
  { id: 13, type: "overwears", image: "/img/—Pngtree—dropshipping men hole sole jogging_14339669.png", price: 49.99 },
  { id: 14, type: "overwears", image: "/img/—Pngtree—dropshipping men hole sole jogging_14339669.png", price: 49.99 },
  { id: 15, type: "overwears", image: "/img/—Pngtree—dropshipping men hole sole jogging_14339669.png", price: 49.99 },
  { id: 16, type: "overwears", image: "/img/—Pngtree—dropshipping men hole sole jogging_14339669.png", price: 49.99 },
  { id: 17, type: "overwears", image: "/img/—Pngtree—dropshipping men hole sole jogging_14339669.png", price: 49.99 },
  { id: 18, type: "overwears", image: "/img/—Pngtree—dropshipping men hole sole jogging_14339669.png", price: 49.99 },
];

// Function to simulate fetching products based on filter type
export const fetchProducts = (filterType: string): Promise<Product[]> => {
  return new Promise((resolve) => {
      setTimeout(() => {
          resolve(mockProducts.filter((product) => product.type === filterType));
      }, 1000); // Simulating a 1-second delay for the mock API
  });
};
