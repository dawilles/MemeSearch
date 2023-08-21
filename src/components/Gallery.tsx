import React from "react";
import { Image } from "./Image";
import InfiniteScroll from "react-infinite-scroll-component";
import Stack from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import {Typography} from "@mui/material";
import {Meme} from "../types";

type GalleryProps = {
	data: Meme[];
	hasMore: boolean;
	onNextPage: () => void;
};

export const Gallery = ({
	data,
	hasMore,
	onNextPage,
}: GalleryProps) => {
	if(!data.length) {
		return <Typography>No memes available.</Typography>
	}


	return (
		<InfiniteScroll
			dataLength={data.length}
			next={onNextPage}
			hasMore={hasMore}
			loader={
				<Stack justifyContent='center'>
					<CircularProgress />
				</Stack>
			}
			style={{ overflow: "visible" }}>
			<Grid container spacing={4} sx={{ marginTop: "30px" }}>
				{data.map((meme) => (
					<Grid item xs={12} sm={6} md={4} lg={3} key={meme.id}>
						<Image meme={meme} />
					</Grid>
				))}
			</Grid>
		</InfiniteScroll>
	);
};
