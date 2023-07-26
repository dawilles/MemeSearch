import { useState } from "react";
import { getMemes } from "../services/giphy";
import { Meme } from "../utils/types";

type BaseState = {
	query: string;
	memes: Meme[];
	hasMore: boolean;
};

type IdleState = BaseState & { status: "idle" };
type LoadingState = BaseState & { status: "loading" };
type ErrorState = BaseState & { status: "error"; error: string };
type LoadedState = BaseState & { status: "loaded" };
type State = IdleState | LoadingState | ErrorState | LoadedState;

const useMemes = () => {
	const [state, setState] = useState<State>({
		status: "idle",
		query: "",
		memes: [],
		hasMore: false,
	});

	const handleSearch = async (query: string) => {
		setState({ status: "loading", query, memes: [], hasMore: false });
		try {
			const data = await getMemes(query);
			setState({
				status: "loaded",
				memes: data?.data || [],
				query,
				hasMore: data.hasMore || false,
			});
		} catch (error) {
			const message = (error as Error).message;
			setState({
				status: "error",
				error: message,
				query,
				memes: [],
				hasMore: false,
			});
		}
	};

	const fetchMoreData = async () => {
		if (state.status !== "loaded" || !state.hasMore) return;

		try {
			const data = await getMemes(state.query, state.memes.length);
			setState((prevState) => ({
				...prevState,
				status: "loaded",
				memes: [...prevState.memes, ...(data?.data || [])],
				hasMore: data.hasMore || false,
			}));
		} catch (error) {
			const message = (error as Error).message;
			setState((prevState) => ({
				...prevState,
				status: "error",
				error: message,
			}));
		}
	};

	return {
		state,
		handleSearch,
		fetchMoreData,
	};
};

export default useMemes;
