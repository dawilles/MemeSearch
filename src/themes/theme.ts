import * as React from "react";
import { createTheme } from "@mui/material/styles";

export const ColorModeContext = React.createContext({
	toggleColorMode: () => {},
});

const commonThemeSettings = {
	typography: {
		fontFamily: 'Roboto, "Helvetica Neue", Arial, sans-serif',
		h1: {
			fontWeight: 700,
			fontSize: "3.4rem",
			letterSpacing: ".1rem",
			padding: ".7rem",
		},
		h2: {
			fontWeight: 700,
			fontSize: "1.6rem",
		},
		h3: {
			fontWeight: 400,
			fontSize: "1rem",
			letterSpacing: ".1rem",
		},
	},
};

export const darkTheme = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: "#FFFFFF",
		},
		warning: {
			main: "#FFFFF6",
		},
	},
	...commonThemeSettings,
});

export const lightTheme = createTheme({
	palette: {
		mode: "light",
		primary: {
			main: "#000000",
		},
		warning: {
			main: "#757575",
		},
	},
	...commonThemeSettings,
});
