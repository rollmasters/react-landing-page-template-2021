"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import MainContainer from "../modalContainer/ModalContainer";
import FilterComponent from "./filtercomponent/FilterComponent";
import ProductPage from "./ProductContainercomponent/ProductContainer";
import styles from "./ProductShelfContainer.module.css";
import { FilterTypes } from "../Types/FilterTypes";
import { ServiceFactory } from "../services/ServiceFactory";

export interface ServerProduct {
  id: string;
  name: string;
  image: string;
  type: string;
  gender?: string;
  cloth_path?: string;
  base64Image?: string;
  price?: string;
}
export interface TryOnRequest {
  guidance_scale: number;
  timesteps: number;
  num_samples: number;
  seed: number;
  nsfw_filter: boolean;
  cover_feet: boolean;
  adjust_hands: boolean;
  restore_background: boolean;
  restore_clothes: boolean;
  garment_photo_type: string;
  long_top: boolean;
}
export default function ProductShelfContainer() {
  const [filter, setFilter] = useState<FilterTypes>(FilterTypes.TOPS);
  const [imagePaths, setImagePaths] = useState<string[]>([]);
  const [products, setProducts] = useState<ServerProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [selectedProduct, setSelectedProduct] = useState<ServerProduct | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // State for modal visibility
  const observer = useRef<IntersectionObserver | null>(null);
  const service = ServiceFactory.getService();

  const IMAGES_PER_PAGE = 4;

  useEffect(() => {
    const fetchPaths = async () => {
      setLoading(true);
      try {
        const paths = await service.fetchImagePaths(filter);
        setImagePaths(paths);
        setProducts([]);
        setPage(1);
      } catch (error) {
        console.error("Error fetching image paths:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPaths();
  }, [filter]);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const productsWithImages = await service.fetchImagesForPage(imagePaths, page, IMAGES_PER_PAGE, filter);
        setProducts((prevProducts) => [...prevProducts, ...productsWithImages]);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    if (page > 0 && imagePaths.length > 0) {
      fetchImages();
    }
  }, [page, imagePaths, IMAGES_PER_PAGE]);

  const lastProductRef = useCallback((node: HTMLElement | null) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prevPage) => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading]);

  const handleFilterChange = (newFilter: FilterTypes) => {
    setFilter(newFilter);
  };

  const handleMoreClick = async (product: ServerProduct) => {
    console.log("Product clicked:", product); // Log product data for now
    setSelectedProduct(product);
    setIsModalOpen(true); // Open the modal when a product is clicked

    const tryOnRequest: TryOnRequest = {
      guidance_scale: 2.0,
      timesteps: 50,
      num_samples: 1,
      seed: 42,
      nsfw_filter: true,
      cover_feet: false,
      adjust_hands: false,
      restore_background: false,
      restore_clothes: false,
      garment_photo_type: "auto",
      long_top: false,
    };

    try {
      const imagePath = await service.fetchCharacterWithCloth(product, tryOnRequest);
      console.log("Fetched image path:", imagePath);
    } catch (error) {
      console.error("Error fetching character image:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null); // Optionally clear the selected product
  };

  return (
    <div className={styles.main}>
      <MainContainer isOpen={isModalOpen} onClose={closeModal} title="Product Details">
        {/* Modal content */}
        {selectedProduct && (
          <div>
            <h3>{selectedProduct.name}</h3>
            <img src={selectedProduct.image} alt={selectedProduct.name} />
            <p>Price: {selectedProduct.price || "N/A"}</p>
          </div>
        )}
      </MainContainer>
      <div className={styles.countproduct}>
        <div className={styles.filters}>
          <FilterComponent filter={filter} onFilterChange={handleFilterChange} />
        </div>
        <div className={styles.products}>
          <ProductPage products={products} onMoreClick={handleMoreClick} />
          {loading && <p>Loading...</p>}
          <div ref={lastProductRef}></div>
        </div>
      </div>
    </div>
  );
}
