import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Container, IconButton } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { SearchContentLoader } from "./SearchContentLoader";
import { ColorModeContext } from "../themes/theme";
import { useColorMode } from "../hooks/useColorMode";

export const App = () => {
	const { mode, toggleColorMode, currentTheme } = useColorMode();

	return (
		<ColorModeContext.Provider value={{ toggleColorMode }}>
			<ThemeProvider theme={currentTheme}>
				<CssBaseline />
				<Container sx={{ height: "100vh", bgcolor: "background.default" }}>
					<IconButton onClick={toggleColorMode}>
						{mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
					</IconButton>
					<SearchContentLoader />
				</Container>
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
};
