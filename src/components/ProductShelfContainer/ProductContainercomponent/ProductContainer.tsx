import React, { useState } from "react";
import ProductListComponent from "../productcomponent/ProductListComponent";
import CardDetail from "../../carddetail/carddetail";
import { ServerProduct } from "../ProductShelfContainer";



type ProductPageProps = {
  products: ServerProduct[];
  onMoreClick: (product: ServerProduct) => void;
};
export default function ProductPage({ products }: { products: ServerProduct[] }) {
  const [selectedProduct, setSelectedProduct] = useState<ServerProduct | null>(null);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  
  const handleMoreClick = (product: ServerProduct) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  return (
    <div>
      <ProductListComponent products={products} onMoreClick={handleMoreClick} />
      <CardDetail isModalOpen={isModalOpen} setModalOpen={setModalOpen} product={selectedProduct} />
    </div>
  );
}
