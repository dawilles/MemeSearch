export const notReachable = (_: never): never => {
	throw new Error(`Not reachable state appeared: ${_}`);
};
