import React from "react";
import { CircularProgress, Container, Stack, Typography } from "@mui/material";
import { Gallery } from "./Gallery";
import { Search } from "./Search";
import { notReachable } from "../utils/notReachable";
import { useLazyReloadableData } from "../hooks/useReloadableData";
import { getMemes } from "../services/giphy";

export const App = () => {
  return (
    <Container fixed>
      <Stack flexDirection="column" alignItems="center">
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          style={{ color: "#0016b3", margin: "20px" }}
        >
          Giphy Meme Search
        </Typography>
        <SearchContentLoader />
      </Stack>
    </Container>
  );
};

const SearchContentLoader = () => {
  const { state, load } = useLazyReloadableData(getMemes);

	console.log(state)
  const handleSearch = (query: string) =>
    load({ query, offset: 0, previousMemes: [] });

  switch (state.type) {
    case "not_requested":
      return (
        <>
          <Search onSearch={handleSearch} />
          <Stack justifyContent="center">
            <Typography>No memes available.</Typography>
          </Stack>
        </>
      );

    case "reloading":
      return (
        <>
          <Search onSearch={handleSearch} />
          <Gallery
            data={state.data.memes}
            hasMore={false}
            onNextPage={() => {}}
          />
        </>
      );

    case "loading":
      return (
        <>
          <Search onSearch={handleSearch} />
          <Stack justifyContent="center">
            <CircularProgress />
          </Stack>
        </>
      );

    case "loaded":
      return (
        <>
          <Search onSearch={handleSearch} />
          <Gallery
            data={state.data.memes}
            hasMore={state.data.hasMore}
            onNextPage={() =>
              load({
                ...state.params,
                previousMemes: state.data.memes,
                offset: state.params.offset + state.data.memes.length,
              })
            }
          />
        </>
      );

    case "error":
      return (
        <>
          <Search onSearch={handleSearch} />
          <Typography color="error">{`Error: ${state.error}`}</Typography>
        </>
      );

    default:
      return notReachable(state);
  }
};
