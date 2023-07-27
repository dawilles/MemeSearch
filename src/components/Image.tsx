import React from "react";
import { CardMedia } from "@mui/material";
import { Meme } from "../hooks/useMemes";

type ImageProps = {
	meme: Meme;
};

export const Image = ({ meme }: ImageProps) => {
	return (
		<CardMedia
			component='img'
			image={meme.images.fixed_width.url}
			alt={meme.title}
			sx={{
				maxWidth: "100%",
				border: "solid 3px black",
				borderRadius: "3px",
			}}
		/>
	);
};
