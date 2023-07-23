import React from "react";
import styles from "./Image.module.css";

type Meme = {
  title: string;
  images: {
    fixed_width: {
      url: string;
    }
  }
}

type ImageProps = {
  meme: Meme;
}

const Image = ({ meme }: ImageProps) => { 
  return (
    <img className={styles.img} src={meme.images.fixed_width.url} alt={meme.title} />
  );
};

export default Image;
