import { useLoadableData } from "./useLoadableData";
import { getMemes, DEFAULT_LIMIT } from "../services/giphy";

export type Meme = {
	id: string;
	title: string;
	url: string;
	images: {
		fixed_width: {
			url: string;
		};
	};
};

type Data = {
	memes: Meme[];
	hasMore: boolean;
};

type Params = {
	query: string;
	offset: number;
};

export const useMemes = () => {
	const initialParams: Params = {
		query: "",
		offset: 0,
	};

	const { state, reload } = useLoadableData<Data, Params>(async (params) => {
		const response = await getMemes({
			query: params.query,
			offset: params.offset,
		});
		return {
			memes: response.data || [],
			hasMore: response.hasMore || false,
		};
	}, initialParams);

	const handleSearch = (query: string) => {
		console.log("handleSearch");
		reload({
			query: query,
			offset: 0,
		});
	};

	const fetchMoreData = () => {
		console.log("fetchMoreData");
		if (state.type === "loaded" && state.data.hasMore) {
			const newOffset = state.params.offset + DEFAULT_LIMIT;
			reload({
				query: state.params.query,
				offset: newOffset,
			});
		}
	};

	return {
		state,
		handleSearch,
		fetchMoreData,
	};
};
