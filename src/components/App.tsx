import React from "react";
import {
	Container,
	Typography,
	Button,
	CircularProgress,
	Stack,
} from "@mui/material";
import { Gallery } from "./Gallery";
import { Search } from "./Search";
import { useMemes } from "../hooks/useMemes";

export const App = () => {
	const { state, handleSearch, fetchMoreData } = useMemes();

	let content;
	switch (state.type) {
		case "loading":
			content = (
				<Stack justifyContent='center'>
					<CircularProgress />
				</Stack>
			);
			break;
		case "error":
			content = (
				<>
					<Typography color='error'>Error: {state.error}</Typography>
					<Button
						variant='contained'
						color='primary'
						onClick={() => handleSearch(state.query)}>
						Try again
					</Button>
				</>
			);
			break;
		case "loaded":
			content = (
				<Gallery
					memes={state.memes}
					fetchMoreData={fetchMoreData}
					hasMore={state.hasMore}
				/>
			);
			break;
		default:
			content = null;
			break;
	}

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
				<Search onSearch={handleSearch} />
				{content}
			</Stack>
		</Container>
	);
};
