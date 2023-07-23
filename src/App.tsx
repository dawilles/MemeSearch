import React, { useState } from "react";
import { getMemes } from './services/giphy';
import Gallery from "./components/Gallery";
import Search from "./components/Search";
import styles from './App.module.css';

type Meme = {
  id: string;
  title: string;
  images: {
    fixed_width: {
      url: string;
    }
  }
}

const App = () => {
  const [memes, setMemes] = useState<Meme[]>([]);  
  const [query, setQuery] = useState("");

  const handleSearch = async (query: string) => {
    setQuery(query);
    const data = await getMemes(query);
    setMemes(data?.data || []);
  };

  const fetchMoreData = async () => {
    const data = await getMemes(query, memes.length);
    setMemes(memes.concat(data?.data || []));
  };

  return (
    <div className={styles.app}>
      <h1>Giphy Meme Search</h1>
      <Search onSearch={handleSearch} />
      <Gallery memes={memes} fetchMoreData={fetchMoreData} />
    </div>
  );
};

export default App;
