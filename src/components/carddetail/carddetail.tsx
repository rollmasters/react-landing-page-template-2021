import React from "react";
import Image from "next/image";
import ModalContainer from "../../components/modalContainer/ModalContainer";
import styles from "./carddetail.module.css";
import customStyles from "./CustomModalStyles.module.css";
import { ServerProduct } from "@/app/layouts/ProductShelfContainer/ProductShelfContainer";

type CardDetailProps = {
  isModalOpen: boolean;
  setModalOpen: (isOpen: boolean) => void;
  product: ServerProduct | null;
};

export default function CardDetail({ isModalOpen, setModalOpen, product }: CardDetailProps) {
  if (!product) return null; // Return null if no product is selected

  return (
    <ModalContainer
      className={customStyles.customModal}
      isOpen={isModalOpen}
      onClose={() => setModalOpen(false)}
      title={"Prdouct Card"}
    >
      <div className={styles.productDetail}>
        <div className={styles.bodyDetLeft}>
        <img 
          src={product.image} 
          alt={product.name} 
          className={styles.productImage}
          width={600}
          height={600}
        />
        </div>
        <div className={styles.bodyDetRight}>
        <h2 className={styles.productTitle} title={product.name}>{product.name}</h2>
        {/*<p class="product-type" id="productTags">Tags</p>*/}
        <p className={styles.productPrice}>Price: {Number(product.price).toFixed(2)}</p>
        {/*<p className={styles.productSize}>Size: {product.size || "N/A"}</p>
        <p className={styles.productColor}>Color: {product.color || "N/A"}</p>*/}
        <div className={styles.descriptionDropdown}>
            <button className={styles.descriptionTitle} aria-expanded="false">
                Description
            </button>
            <div className={styles.descriptionContent && styles.show} aria-hidden="true">
                <ul className={styles.descriptionList} id="descriptionList">
                  <li>dasdasdasdasdasdasdasdasdasd
                    asdasdasdasdasdasdasdasdasdsd</li>
                </ul>
            </div>
        </div>
        <button className={styles.orderButton}>Try on</button>
    </div>
      </div>
    </ModalContainer>
  );
}
