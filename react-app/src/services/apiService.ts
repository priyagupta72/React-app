import axios from 'axios';

const API_URL = 'https://api.artic.edu/api/v1/artworks';

// Function to fetch data for a given page and limit
export const fetchPageData = async (page: number, limit: number) => {
  try {
    const response = await axios.get(`${API_URL}?page=${page}&limit=${limit}`);
    const { data, pagination } = response.data;
    return { data, pagination };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
