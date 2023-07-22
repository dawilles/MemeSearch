import React, { useState, FormEvent } from "react";
import styles from "./Search.module.css"

interface SearchProps {
  onSearch: (query: string) => void;
}

const Search = ({ onSearch }: SearchProps) => { 
  const [query, setQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
    setQuery(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => { 
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.search}>
      <input
        type="text"
        placeholder="Search for memes..."
        onChange={handleInputChange}
      />
      <input type="submit" value="Search" />
    </form>
  );
};

export default Search;
