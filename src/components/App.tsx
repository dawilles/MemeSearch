import React from "react";
import { Container, Typography, CircularProgress, Stack } from "@mui/material";
import { Gallery } from "./Gallery";
import { Search } from "./Search";
import { useMemes } from "../hooks/useMemes";
import { notReachable } from "../utils/notReachable";

export const App = () => {
	return (
		<Container fixed>
			<Stack flexDirection='column' alignItems='center'>
				<Typography
					variant='h4'
					component='h1'
					gutterBottom
					style={{ color: "#0016b3", margin: "20px" }}>
					Giphy Meme Search
				</Typography>
				<SearchContentLoader />
			</Stack>
		</Container>
	);
};

const SearchContentLoader = () => {
	const { loadableState: state, handleSearch, fetchMoreData } = useMemes();

	switch (state.type) {
		case "loading":
			return (
				<>
					<Search onSearch={handleSearch} />
					<Stack justifyContent='center'>
						<CircularProgress />
					</Stack>
				</>
			);

		case "loaded":
			return (
				<>
					<Search onSearch={handleSearch} />
					<Gallery
						data={state.data.memes}
						hasMore={state.data.hasMore}
						onNextPage={fetchMoreData}
					/>
				</>
			);

		case "error":
			return (
				<>
					<Search onSearch={handleSearch} />
					<Typography color='error'>{`Error: ${state.error}`}</Typography>
				</>
			);

		default:
			return notReachable(state);
	}
};
