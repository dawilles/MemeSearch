import { useState, useRef } from "react";
import { getMemes } from "../services/giphy";

export type Meme = {
	id: string;
	images: { fixed_width: { url: string } };
	title: string;
};

type IdleState = { type: "idle" };
type LoadingState = { type: "loading"; query: string };
type LoadedState = {
	type: "loaded";
	memes: Meme[];
	query: string;
	hasMore: boolean;
};
type ErrorState = { type: "error"; error: string; query: string };
type State = IdleState | LoadingState | ErrorState | LoadedState;

export const useMemes = () => {
	const [state, setState] = useState<State>({ type: "idle" });
	const loading = useRef(false);

	const handleSearch = async (query: string) => {
		if (loading.current) return;
		loading.current = true;
		setState({ type: "loading", query });
		try {
			const data = await getMemes(query);
			setState({
				type: "loaded",
				memes: data?.data || [],
				query,
				hasMore: data.hasMore || false,
			});
		} catch (error) {
			const message = (error as Error).message;
			setState({
				type: "error",
				error: message,
				query,
			});
		} finally {
			loading.current = false;
		}
	};

	const fetchMoreData = async () => {
		switch (state.type) {
			case "loaded":
				if (!state.hasMore || loading.current) return;
				loading.current = true;
				try {
					const data = await getMemes(state.query, state.memes.length);
					setState((prevState: State) => {
						if (prevState.type !== "loaded") {
							return prevState;
						}
						return {
							...prevState,
							type: "loaded",
							memes: [...prevState.memes, ...(data?.data || [])],
							hasMore: data.hasMore || false,
						};
					});
				} catch (error) {
					const message = (error as Error).message;
					setState((prevState: State) => {
						if (prevState.type !== "loaded") {
							return prevState;
						}
						return {
							...prevState,
							type: "error",
							error: message,
						};
					});
				} finally {
					loading.current = false;
				}
				break;
			default:
				return;
		}
	};

	return {
		state,
		handleSearch,
		fetchMoreData,
	};
};
