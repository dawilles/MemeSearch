import React from "react";
import Image from "./Image";
import InfiniteScroll from "react-infinite-scroll-component";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import { GalleryProps, Meme } from "../utils/types";

const Gallery = ({ memes, fetchMoreData, hasMore }: GalleryProps) => {
	return (
		<InfiniteScroll
			dataLength={memes.length}
			next={fetchMoreData}
			hasMore={hasMore}
			loader={
				<Box sx={{ display: "flex", justifyContent: "center" }}>
					<CircularProgress />
				</Box>
			}
			style={{ overflow: "visible" }}>
			<Grid container spacing={4} sx={{ marginTop: "30px" }}>
				{memes.map((meme: Meme) => (
					<Grid item xs={12} sm={6} md={4} lg={3} key={meme.id}>
						<Image meme={meme} />
					</Grid>
				))}
			</Grid>
		</InfiniteScroll>
	);
};

export default Gallery;
