"use client";

import React, { useState, useEffect } from "react";
import MainContainer from "../modalContainer/ModalContainer";
import FilterComponent from "./filtercomponent/FilterComponent";
import ProductPage from "./ProductContainercomponent/ProductContainer";
import styles from "./ProductShelfContainer.module.css";
import { FilterTypes } from "../Types/FilterTypes";

export interface ServerProduct {
  id: string;
  name: string;
  image: string;
  type: string;
  price?: string;
}

const staticProducts: ServerProduct[] = [
  { id: "1", name: "Product 1", image: "/assets/images/pngegg (3).png", type: "tops", price: "20.00" },
  { id: "2", name: "Product 2", image: "/assets/images/pngegg (3).png", type: "tops", price: "25.00" },
  { id: "3", name: "Product 3", image: "/assets/images/pngegg (3).png", type: "tops", price: "20.00" },
  { id: "4", name: "Product 4", image: "/assets/images/pngegg (3).png", type: "tops", price: "25.00" },
  { id: "5", name: "Product 5", image: "/assets/images/pngegg (3).png", type: "tops", price: "20.00" },
  { id: "6", name: "Product 6", image: "/assets/images/pngegg (3).png", type: "tops", price: "25.00" },
  { id: "7", name: "Product 1", image: "/assets/images/e1f048f4ee0b4c1b9c66bc8cac0b2089 31.png", type: "bottoms", price: "20.00" },
  { id: "8", name: "Product 2", image: "/assets/images/e1f048f4ee0b4c1b9c66bc8cac0b2089 31.png", type: "bottoms", price: "25.00" },
  { id: "9", name: "Product 3", image: "/assets/images/e1f048f4ee0b4c1b9c66bc8cac0b2089 31.png", type: "bottoms", price: "20.00" },
  { id: "10", name: "Product 4", image: "/assets/images/e1f048f4ee0b4c1b9c66bc8cac0b2089 31.png", type: "bottoms", price: "25.00" },
  { id: "11", name: "Product 5", image: "/assets/images/e1f048f4ee0b4c1b9c66bc8cac0b2089 31.png", type: "bottoms", price: "20.00" },
  { id: "12", name: "Product 6", image: "/assets/images/e1f048f4ee0b4c1b9c66bc8cac0b2089 31.png", type: "bottoms", price: "25.00" },
  { id: "13", name: "Product 1", image: "/assets/images/—Pngtree—dropshipping men hole sole jogging_14339669.png", type: "overwears", price: "20.00" },
  { id: "14", name: "Product 2", image: "/assets/images/—Pngtree—dropshipping men hole sole jogging_14339669.png", type: "overwears", price: "25.00" },
  { id: "15", name: "Product 3", image: "/assets/images/—Pngtree—dropshipping men hole sole jogging_14339669.png", type: "overwears", price: "20.00" },
  { id: "16", name: "Product 4", image: "/assets/images/—Pngtree—dropshipping men hole sole jogging_14339669.png", type: "overwears", price: "25.00" },
  { id: "17", name: "Product 5", image: "/assets/images/—Pngtree—dropshipping men hole sole jogging_14339669.png", type: "overwears", price: "20.00" },
  { id: "18", name: "Product 6", image: "/assets/images/—Pngtree—dropshipping men hole sole jogging_14339669.png", type: "overwears", price: "25.00" },
  { id: "19", name: "Product 1", image: "/assets/images/—Pngtree—dropshipping men hole sole jogging_14339669.png", type: "fullbody", price: "20.00" },
  { id: "20", name: "Product 2", image: "/assets/images/—Pngtree—dropshipping men hole sole jogging_14339669.png", type: "fullbody", price: "25.00" },
  { id: "21", name: "Product 3", image: "/assets/images/—Pngtree—dropshipping men hole sole jogging_14339669.png", type: "fullbody", price: "20.00" },
  { id: "22", name: "Product 4", image: "/assets/images/—Pngtree—dropshipping men hole sole jogging_14339669.png", type: "fullbody", price: "25.00" },
  { id: "23", name: "Product 5", image: "/assets/images/—Pngtree—dropshipping men hole sole jogging_14339669.png", type: "fullbody", price: "20.00" },
  { id: "24", name: "Product 6", image: "/assets/images/—Pngtree—dropshipping men hole sole jogging_14339669.png", type: "fullbody", price: "25.00" },
];

export default function ProductShelfContainer() {
  const [filter, setFilter] = useState<FilterTypes>(FilterTypes.TOPS);
  const [products, setProducts] = useState<ServerProduct[]>([]); // Initially empty
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<ServerProduct | null>(null);
  const formattedPrice = selectedProduct?.price
  ? `${selectedProduct.price} EUR`
  : "N/A";


  // Filter products initially and whenever `filter` changes
  useEffect(() => {
    setProducts(staticProducts.filter((product) => product.type === filter));
  }, [filter]);

  const handleFilterChange = (newFilter: FilterTypes) => {
    setFilter(newFilter); // This will trigger the `useEffect` to update products
  };

  const handleMoreClick = (product: ServerProduct) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className={styles.main}>
      <MainContainer isOpen={isModalOpen} onClose={closeModal} title="Product Details">
        {selectedProduct && (
          <div>
            <h3>{selectedProduct.name}</h3>
            <img src={selectedProduct.image} alt={selectedProduct.name} />
            <p>Price: {formattedPrice}</p>
          </div>
        )}
      </MainContainer>
      <div className={styles.countproduct}>
        <div className={styles.filters}>
          <FilterComponent filter={filter} onFilterChange={handleFilterChange} />
        </div>
        <div className={styles.products}>
          <ProductPage products={products} onMoreClick={handleMoreClick} />
        </div>
      </div>
    </div>
  );
}
