import { useEffect, useState } from "react";
import { getMemes, DEFAULT_LIMIT } from "../services/giphy";
import { useLoadableData } from "./useLoadableData";
import { useReloadableData } from "./useReloadableData";

export type Meme = {
  id: string;
  title: string;
  url: string;
  images: {
    fixed_width: {
      url: string;
    };
  };
};

export type Data = {
  memes: Meme[];
  hasMore: boolean;
};

type Params = {
  query: string;
  offset: number;
};

const fetchMemes = async (params: Params): Promise<Data> => {
  const response = await getMemes({
    query: params.query,
    offset: params.offset,
  });
  return {
    memes: response.data || [],
    hasMore: response.hasMore || false,
  };
};

export const useMemes = () => {
  const initialParams: Params = {
    query: "",
    offset: 0,
  };

  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const {
    state: loadableState,
    reload,
    setState,
  } = useLoadableData<Data, Params>(fetchMemes, initialParams);
  const { state: reloadableState, load: loadMore } = useReloadableData<Data, Params>(fetchMemes);

  const handleSearch = (query: string) => {
    reload({ query, offset: 0 });
  };

  const fetchMoreData = () => {
    if (!isLoadingMore && loadableState.type === "loaded" && loadableState.data.hasMore) {
      setIsLoadingMore(true);
      const newOffset = loadableState.params.offset + DEFAULT_LIMIT;
      loadMore({
        query: loadableState.params.query,
        offset: newOffset,
      });
    }
  };

  useEffect(() => {
    if (reloadableState.type === "loaded" && loadableState.type === "loaded") {
      setIsLoadingMore(false);
      const existingMemeIds = new Set(loadableState.data.memes.map(meme => meme.id));
      const newMemes = reloadableState.data.memes.filter(meme => !existingMemeIds.has(meme.id));
      const combinedMemes = [...loadableState.data.memes, ...newMemes];
      const hasMore = reloadableState.data.hasMore;

      const isNewDataDifferent = JSON.stringify(combinedMemes) !== JSON.stringify(loadableState.data.memes);

      if (isNewDataDifferent) {
        setState({
          type: "loaded",
          data: { memes: combinedMemes, hasMore: hasMore },
          params: {
            query: loadableState.params.query,
            offset: loadableState.params.offset + DEFAULT_LIMIT 
          },
        });
      }
    }
  }, [reloadableState, loadableState, setState]);

  return {
    loadableState,
    handleSearch,
    fetchMoreData,
  };
};
