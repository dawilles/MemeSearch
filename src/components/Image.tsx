import React from "react";
import { Box } from "@mui/material";
import { Meme } from "../types/types";

type ImageProps = {
	meme: Meme;
};

export const Image = ({ meme }: ImageProps) => {
	return (
		<Box
			component='img'
			src={meme.images.fixed_width.url}
			alt={meme.title}
			sx={{
				maxWidth: "100%",
				border: "solid 2px black",
				borderRadius: "3px",
				transition: "transform 0.3s",
				"&:hover": {
					transform: "scale(1.3)",
				},
				boxShadow: "3px 3px 10px 3px rgba(0, 0, 0, .4)",
			}}
		/>
	);
};
