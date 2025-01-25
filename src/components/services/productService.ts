import { fetchProducts } from "@/apicall/mock/mockApi";
import { getCharacterWithCloth, getClothsByCategory, getImage } from "@/apicall/template/api_calls";
import { FilterTypes } from "@/app/components/Types/FilterTypes";
import { Product } from "@/app/layouts/ProductShelfContainer/ProductShelfContainer";
import { istest } from "@/apicall/settings/urlsettings";

export const fetchImagePaths = async (filter: FilterTypes): Promise<string[]> => {
  if (istest) {
    const mockProducts = await fetchProducts(filter);
    return mockProducts.map(product => product.image);
  }
  return getClothsByCategory(filter);
};

export const fetchImagesForPage = async (imagePaths: string[], page: number, IMAGES_PER_PAGE: number): Promise<Product[]> => {
  if (istest) {
    const mockProducts = Array.from({ length: 10 }, (_, index) => ({
      id: `mock-product-${index}`,
      name: `Mock Product ${index + 1}`,
      image: "/img/—Pngtree—dropshipping men hole sole jogging_14339669.png", // Use the specified image
      type: "tops",
    }));
    return mockProducts;
  }

  const startIndex = (page - 1) * IMAGES_PER_PAGE;
  const pathsToFetch = imagePaths.slice(startIndex, startIndex + IMAGES_PER_PAGE);
  const productPromises = pathsToFetch.map(async (path, index) => {
    const response = await getImage(path);
    return {
      id: `product-${startIndex + index}`,
      name: `Product ${startIndex + index + 1}`,
      image: path,
      base64Image: response.image_base64,
      type: "tops",
      price: "300",
    } as Product;
  });
  return Promise.all(productPromises);
};

export const fetchCharacterWithCloth = async (product: Product, tryOnRequest: any): Promise<string> => {
  return getCharacterWithCloth(product.image, product.gender, product.image, tryOnRequest);
};