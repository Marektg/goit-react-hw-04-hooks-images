// Import of Axios library
import axios from "axios";

// Function that sends a request to the pixabay.com server
export async function fetchImages(searchedValue, page) {
    const params = new URLSearchParams({
        key: "28184339-859e6c5458c417a5a68f4e5a7",
        q: searchedValue,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        per_page: 12,
        page,
    });

    try {
        const response = await axios({
            method: 'get',
            url: `https://pixabay.com/api/?${params}`,
        });
        return response.data;
    } catch (error) {
        console.log(`Error: ${error}`);
    }
};


