import React from "react";
import styles from "./ProductListComponent.module.css";
import Image from "next/image";
import { ServerProduct } from "../ProductShelfContainer";

type ProductListComponentProps = {
  products: ServerProduct[];
  onMoreClick: (product: ServerProduct) => void;
};

export default function ProductListComponent({ products, onMoreClick }: ProductListComponentProps) {
  return (
    <div className={styles["product-list"]}>
      {products.map((product) => (
        <div key={product.id} className={styles["product-item"]}>
          <div className={styles.detContainer}>
            <img
              src={product.image}
              alt={product.name || "Product Placeholder"}
              width={50}
              height={50}
              className={styles.productImage}
            />
          </div>
          <div className={styles.detProduct}>
            <p className={styles.productName}>{product.name}</p>
            <p className={styles.productPrice}>{Number(product.price)?.toFixed(2) || "N/A"}</p>
            <button
              className={styles.purchaseButton}
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering other click handlers
                onMoreClick(product);
              }}
            >
              More
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
