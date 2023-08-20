import { useState, useEffect, useCallback } from "react";
import { LoadableData } from "./useLoadableData";
import { AxiosError, AxiosRequestConfig } from "axios";

export type ReloadableData<Data, Params = undefined, E = AxiosError<Error>> =
	| LoadableData<Data, Params, E>
	| { type: "not_requested" };

export type ReloadableReturnType<Data, Params, Error> = {
	state: ReloadableData<Data, Params, Error>;
	load: (params: Params) => void;
	reset: () => void;
};

export const useReloadableData = <
	Data,
	Params = undefined,
	E = AxiosError<Error>,
>(
	loadData: (params: Params, config?: AxiosRequestConfig) => Promise<Data>,
): ReloadableReturnType<Data, Params, E> => {
	const [state, setState] = useState<ReloadableData<Data, Params, E>>({
		type: "not_requested",
	});

	useEffect(() => {
		if (state.type === "loading") {
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
		}
	}, [loadData, state]);

	const load = useCallback<(params: Params) => void>(
		(params) => setState({ type: "loading", params }),
		[],
	);

	const reset = useCallback(() => setState({ type: "not_requested" }), []);

	return {
		state,
		load,
		reset,
	};
};
