import { useState, useCallback, useEffect } from "react";
import { AxiosError, AxiosRequestConfig } from "axios";

export type LoadableData<Data, Params, E = AxiosError<Error>> =
  | { type: "loading"; params: Params }
  | { type: "loaded"; data: Data; params: Params }
  | { type: "error"; error: E; params: Params };

type ReturnType<Data, Params, Error> = {
  state: LoadableData<Data, Params, Error>;
  reload: (newParams?: Params) => void;
  setState: React.Dispatch<React.SetStateAction<LoadableData<Data, Params, Error>>>;
};

export const useLoadableData = <
  Data,
  Params = undefined,
  E = AxiosError<Error>,
>(
  load: (params: Params, config?: AxiosRequestConfig) => Promise<Data>,
  initialParams: Params,
): ReturnType<Data, Params, E> => {
  const [state, setState] = useState<LoadableData<Data, Params, E>>({
    type: "loading",
    params: initialParams,
  });

  const reload = useCallback(
    (newParams?: Params) => {
      const paramsToUse = newParams || state.params;
      setState({ type: "loading", params: paramsToUse });
    },
    [state],
  );

  useEffect(() => {
    if (state.type === "loading") {
      load(state.params)
        .then((data) => {
          setState({ type: "loaded", data: data, params: state.params });
        })
        .catch((error) => {
          setState({ type: "error", error, params: state.params });
        });
    }
  }, [load, state]);

  return {
    state,
    reload,
    setState
  };
};
