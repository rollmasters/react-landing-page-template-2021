import baseurl from "../settings/urlsettings";


export const handleApiResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch data');
    }
    return response.json();
};

export const getImage = async (pathUrl) => {

    try {
        const response = await fetch(`${baseurl}/get-image/${pathUrl}`, {
            method: "GET",
            headers: {"Content-Type": "application/json"},
            credentials: "include"
        });
        return await handleApiResponse(response);
    } catch (error) {
        console.error('Error in get image api:', error);
        throw error;
    }
};

export const getRecommendations = async (image_path) => {

    try {
        const response = await fetch(`${baseurl}/recommendation/${image_path}`, {
            method: "GET",
            headers: {"Content-Type": "application/json"},
            credentials: "include"
        });
        return await handleApiResponse(response);
    } catch (error) {
        console.error('Error in get recommendation api:', error);
        throw error;
    }
};

export const getCharacterWithCloth = async (main_character, gender, cloth_path, tryOnRequest = {}) => {
    try {
        const queryParams = new URLSearchParams({
            gender,
            ...(cloth_path && {cloth_path}),
            ...Object.keys(tryOnRequest).reduce((acc, key) => {
                acc[key] = tryOnRequest[key];
                return acc;
            }, {}),
        });

        const response = await fetch(`${baseurl}/api/v2/character_with_cloth/${main_character}?${queryParams.toString()}`, {
            method: "GET",
            headers: {"Content-Type": "application/json"},
            credentials: "include",
        });

        return await handleApiResponse(response);
    } catch (error) {
        console.error('Error in getCharacterWithCloth API:', error);
        throw error;
    }
};

export const getClothsByCategory = async (category) => {
    try {
        const response = await fetch(`${baseurl}/get-cloth/${category}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Error fetching cloths for category ${category}: ${response.statusText}`);
        }

        return await handleApiResponse(response); // Expecting a list of strings
    } catch (error) {
        console.error("Error in getClothsByCategory API call:", error);
        throw error;
    }
};
