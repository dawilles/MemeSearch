import React from "react";
import {
	Container,
	Typography,
	Button,
	Box,
	CircularProgress,
} from "@mui/material";
import Gallery from "./Gallery";
import Search from "./Search";
import useMemes from "../hooks/useMemes";

const App = () => {
	const { state, handleSearch, fetchMoreData } = useMemes();

	return (
		<Container fixed>
			<Box display='flex' flexDirection='column' alignItems='center'>
				<Typography
					variant='h4'
					component='h1'
					gutterBottom
					style={{ color: "#0016b3", margin: "20px" }}>
					Giphy Meme Search
				</Typography>
				<Search onSearch={handleSearch} />
				{state.status === "loading" && (
					<Box display='flex' justifyContent='center'>
						<CircularProgress />
					</Box>
				)}
				{state.status === "error" && (
					<>
						<Typography color='error'>Error: {state.error}</Typography>
						<Button
							variant='contained'
							color='primary'
							onClick={() => handleSearch(state.query)}>
							Try again
						</Button>
					</>
				)}
				{state.status === "loaded" && (
					<Gallery
						memes={state.memes}
						fetchMoreData={fetchMoreData}
						hasMore={state.hasMore}
					/>
				)}
			</Box>
		</Container>
	);
};

export default App;
