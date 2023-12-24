import axios from "axios";

export const getAllProducts = async (pageNumber, userToken) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/recommend/items?page=${pageNumber}`, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      });
  
      return response.data;
    } catch (error) {
      console.error('API call error:', error);
      throw error;
    }
};