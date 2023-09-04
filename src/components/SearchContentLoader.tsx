import React from "react";
import { CircularProgress, Stack, Typography } from "@mui/material";
import { Gallery } from "./Gallery";
import { Search } from "./Search";
import { useLazyReloadableData } from "../hooks/useReloadableData";
import { getMemes } from "../services/giphy";
import { notReachable } from "../utils/notReachable";

const useSearchContentLogic = () => {
	const { state, load } = useLazyReloadableData(getMemes);

	const handleSearch = (query: string) => {
		load({ query, offset: 0, previousMemes: [] });
	};

	const handleNextPage = () => {
		if (state.type !== "loaded") return;
		load({
			...state.params,
			previousMemes: state.data.memes,
			offset: state.params.offset + state.data.memes.length,
		});
	};

	return { state, handleSearch, handleNextPage };
};

export const SearchContentLoader: React.FC = () => {
	const { state, handleSearch, handleNextPage } = useSearchContentLogic();

	const renderContent = () => {
		switch (state.type) {
			case "not_requested":
				return null;
			case "loading":
				return <CircularProgress />;
			case "loaded":
				return (
					<Gallery
						data={state.data.memes}
						hasMore={state.data.hasMore}
						onNextPage={handleNextPage}
					/>
				);
			case "reloading":
				return (
					<>
						<Gallery
							data={state.data.memes}
							hasMore={false}
							onNextPage={() => {}}
						/>
						<CircularProgress />
					</>
				);
			case "error":
				return <Typography color='error'>{`Error: ${state.error}`}</Typography>;
			default:
				return notReachable(state);
		}
	};

	return (
		<Stack
			direction='column'
			alignItems='center'
			justifyContent={state.type === "not_requested" ? "center" : "flex-start"}
			sx={{ height: state.type === "not_requested" ? "90vh" : "auto" }}>
			<Search onSearch={handleSearch} />
			{renderContent()}
		</Stack>
	);
};
