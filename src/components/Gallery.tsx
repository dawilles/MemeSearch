import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Stack, CircularProgress, Grid, Typography } from "@mui/material";
import { Image } from "./Image";
import { Meme } from "../types/types";

type GalleryProps = {
	data: Meme[];
	hasMore: boolean;
	onNextPage: () => void;
};

export const Gallery = ({ data, hasMore, onNextPage }: GalleryProps) => {
	if (!data.length) {
		return (
			<Typography variant='h3' sx={{ marginTop: "1.4rem" }}>
				No memes available.
			</Typography>
		);
	}

	return (
		<InfiniteScroll
			dataLength={data.length}
			next={onNextPage}
			hasMore={hasMore}
			loader={
				<Stack justifyContent='center'>
					<CircularProgress sx={{ marginTop: "1.4rem" }} />
				</Stack>
			}
			style={{ overflow: "visible" }}>
			<Grid container spacing={5} sx={{ marginTop: "1.4rem" }}>
				{data.map((meme) => (
					<Grid item xs={6} sm={4} md={2} key={meme.id} justifyContent='center'>
						<Image meme={meme} />
					</Grid>
				))}
			</Grid>
		</InfiniteScroll>
	);
};
