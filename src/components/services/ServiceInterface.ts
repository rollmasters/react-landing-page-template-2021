import {FilterTypes} from "@/app/components/Types/FilterTypes";
import {ServerProduct, TryOnRequest} from "@/app/layouts/ProductShelfContainer/ProductShelfContainer";

export interface ProductServiceInterface {
    fetchImagePaths(filter: FilterTypes): Promise<string[]>;

    fetchImagesForPage(imagePaths: string[], page: number, IMAGES_PER_PAGE: number, filter:string ): Promise<ServerProduct[]>;

    fetchCharacterWithCloth(product: ServerProduct, tryOnRequest: TryOnRequest): Promise<string>;

    getRecommendations(imagePath: string): Promise<ServerProduct>;

}
