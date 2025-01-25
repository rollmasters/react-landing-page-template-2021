import {ProductServiceInterface} from "./ServiceInterface";
import {getCharacterWithCloth, getClothsByCategory, getImage, getRecommendations} from "../template/api_calls";
import {ServerProduct, TryOnRequest} from "../ProductShelfContainer/ProductShelfContainer";
import {FilterTypes} from "../Types/FilterTypes";

export class RealService implements ProductServiceInterface {
  async fetchImagePaths(filter: FilterTypes): Promise<string[]> {
    return getClothsByCategory(filter);
  }

  async fetchImagesForPage(imagePaths: string[], page: number, IMAGES_PER_PAGE: number): Promise<ServerProduct[]> {
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
        price: "300$", // Hardcoded price for now
      } as ServerProduct;
    });

    return Promise.all(productPromises);
  }

  async fetchCharacterWithCloth(product: ServerProduct, tryOnRequest: TryOnRequest): Promise<string> {
    return getCharacterWithCloth(product.image, product.gender, tryOnRequest);
  }

  async getRecommendations(imagePath: string): Promise<ServerProduct> {
    return getRecommendations(imagePath); // Direct call to API function
  }
}
