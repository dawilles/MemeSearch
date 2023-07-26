export type Meme = {
	id: string;
	images: { fixed_width: { url: string } };
	title: string;
};

export type GalleryProps = {
	memes: Meme[];
	fetchMoreData: () => void;
	hasMore: boolean;
};

export type ImageProps = {
	meme: Meme;
};

export type SearchProps = {
	onSearch: (query: string) => void;
};
