import { useCallback, useEffect, useState } from "react";
import { AxiosError, AxiosRequestConfig } from "axios";
import { notReachable } from "../utils/notReachable";

export type LazyReloadableData<Data, Params, E = AxiosError<Error>> =
  | { type: "not_requested" }
  | { type: "loading"; params: Params }
  | { type: "loaded"; data: Data; params: Params }
  | { type: "reloading"; data: Data; params: Params }
  | { type: "error"; error: E; params: Params };


export type ReloadableReturnType<Data, Params, Error> = {
	state: LazyReloadableData<Data, Params, Error>;
	load: (params: Params) => void;
	reset: () => void;
};

export const useLazyReloadableData = <
	Data,
	Params = undefined,
	E = AxiosError<Error>,
>(
	loadData: (params: Params, config?: AxiosRequestConfig) => Promise<Data>,
): ReloadableReturnType<Data, Params, E> => {
	const [state, setState] = useState<LazyReloadableData<Data, Params, E>>({
		type: "not_requested",
	});

	useEffect(() => {
		switch (state.type) {
      case "not_requested":
      case "loaded":
      case "error":
        break;

      case "reloading":
      case "loading":
        loadData(state.params)
          .then((data) => {
            setState({
              type: "loaded",
              data: data,
              params: state.params,
            });
          })
          .catch((error) => {
            if (error.type !== "canceledRequest") {
              setState({ type: "error", error, params: state.params });
            }
          });
        break;

      default:
        return notReachable(state);
    }
	}, [loadData, state]);

	const load = useCallback<(params: Params) => void>(
		(params) => {
			switch(state.type) {
				case "error":
				case "loading":
				case "not_requested":
					setState({ type: "loading", params })
					break;

				case "reloading":
				case "loaded":
					setState({ type: "reloading", params, data: state.data })
					break;

				default:
			    return notReachable(state);
			}

		},
		[state],
	);

	const reset = useCallback(() => setState({ type: "not_requested" }), []);

	return {
		state,
		load,
		reset,
	};
};
