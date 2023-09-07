import axios, { AxiosResponse } from "axios";
import { Meme } from "../types/types";

const API_KEY = process.env.REACT_APP_API_KEY;
export const DEFAULT_LIMIT = 30;

type Data = { hasMore: boolean; memes: Meme[] };

export const getMemes = async ({
	query,
	offset,
	previousMemes,
	limit = DEFAULT_LIMIT,
}: {
	query: string;
	offset: number;
	previousMemes: Meme[];
	limit?: number;
}): Promise<Data> => {
	try {
		const response: AxiosResponse = await axios.get(
			`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&offset=${offset}&limit=${limit}`,
		);
		if (response.data && Array.isArray(response.data.data)) {
			const hasMore = response.data.data.length === limit;
			return { memes: [...previousMemes, ...response.data.data], hasMore };
		} else {
			throw new Error("Invalid data format received from API");
		}
	} catch (error: unknown) {
		throw new Error(`${error}`);
	}
};
