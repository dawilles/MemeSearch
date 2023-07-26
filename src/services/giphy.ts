import axios, { AxiosResponse, AxiosError } from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;
const DEFAULT_LIMIT = 16;
const handleAxiosError = (error: AxiosError) => {
	console.error(error);
};

export const getMemes = async (
	query: string,
	offset = 0,
	limit = DEFAULT_LIMIT,
) => {
	try {
		const response: AxiosResponse = await axios.get(
			`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&offset=${offset}&limit=${limit}`,
		);
		if (response.data && Array.isArray(response.data.data)) {
			const hasMore = response.data.data.length === limit;
			return { ...response.data, hasMore };
		} else {
			throw new Error("Invalid data format received from API");
		}
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			handleAxiosError(error);
		}
		throw error;
	}
};
