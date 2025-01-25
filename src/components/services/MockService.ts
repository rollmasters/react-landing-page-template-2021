import {ProductServiceInterface} from "./ServiceInterface";
import {fetchProducts} from "../mock/mockApi";
import {ServerProduct} from "../ProductShelfContainer/ProductShelfContainer";
import {FilterTypes} from "../Types/FilterTypes";


export class MockService implements ProductServiceInterface {
    async fetchImagePaths(filter: FilterTypes): Promise<string[]> {
        const mockProducts = await fetchProducts(filter);
        console.log("Mock products:", mockProducts);
        return mockProducts.map((product: ServerProduct) => product.image);
    }

    async fetchImagesForPage(imagePaths: string[], page: number, IMAGES_PER_PAGE: number, filter:string): Promise<ServerProduct[]> {
        const startIndex = (page - 1) * IMAGES_PER_PAGE;
        const mockProduct_filter = await fetchProducts(filter);
        const selectedMockProducts = mockProduct_filter.slice(startIndex, startIndex + IMAGES_PER_PAGE);

        // Map the selected mock products to the expected Product format
        return selectedMockProducts.map((mockProduct_filter:ServerProduct, index:number) => ({
            id: `${startIndex + index}`,
            name: `Mock Product ${startIndex + index + 1}`,
            image: mockProduct_filter.image, // Use the image from the mock product
            type: mockProduct_filter.type,  // Use the type from the mock product
        }));
    }

    async fetchCharacterWithCloth(product: ServerProduct, tryOnRequest: any): Promise<string> {
        return `Mock response for character with ${product.name}`;
    }

    async getRecommendations(imagePath: string): Promise<any> {
        return [
            {id: 1, recommendation: "Mock Recommendation 1"},
            {id: 2, recommendation: "Mock Recommendation 2"}
        ];
    }
}
