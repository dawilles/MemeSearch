import axios, { AxiosResponse } from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;
export const DEFAULT_LIMIT = 16;

export const getMemes = async ({
	query,
	offset = 0,
	limit = DEFAULT_LIMIT,
}: {
	query: string;
	offset?: number;
	limit?: number;
}) => {
	try {
		const response: AxiosResponse = await axios.get(
			`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&offset=${offset}&limit=${limit}`,
		);
		console.log("API Response:", response.data);
		if (response.data && Array.isArray(response.data.data)) {
			const hasMore = response.data.data.length === limit;
			return { ...response.data, hasMore };
		} else {
			throw new Error("Invalid data format received from API");
		}
	} catch (error: unknown) {
		console.error(error);
	}
};
