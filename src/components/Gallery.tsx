import React from "react";
import Image from "./Image";
import styles from "./Gallery.module.css";
import InfiniteScroll from 'react-infinite-scroll-component';

type Meme = {
  id: string;
  title: string;
  images: {
    fixed_width: {
      url: string;
    }
  }
}

type GalleryProps = {
  memes: Meme[];
  fetchMoreData: () => void;
}

const Gallery = ({memes, fetchMoreData}: GalleryProps) => {  
  return (
    <InfiniteScroll
      dataLength={memes.length}
      next={fetchMoreData}
      hasMore={true}
      loader={<h4>Loading...</h4>}
      className={styles.gallery}
    >
      {memes.map((meme: Meme) => (  
        <Image key={meme.id} meme={meme} />
      ))}
    </InfiniteScroll>
  );
};

export default Gallery;
