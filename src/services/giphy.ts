import axios, { AxiosResponse, AxiosError } from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;
const LIMIT = 16;

const handleAxiosError = (error: AxiosError) => {
  console.error(error);
}

export const getMemes = async (query: string, offset = 0) => {
  try {
    const response: AxiosResponse = await axios.get(
      `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&offset=${offset}&limit=${LIMIT}`,
    );
    if(response.data && Array.isArray(response.data.data)) {
      return response.data;
    } else {
      throw new Error("Invalid data format received from API");
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      handleAxiosError(error);
    }
  }
};
