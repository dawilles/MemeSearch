import { useState, useMemo } from 'react';
import { lightTheme, darkTheme } from '../themes/theme';

export const useColorMode = () => {
    const [mode, setMode] = useState<"light" | "dark">("light");

    const toggleColorMode = () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
    };

    const currentTheme = useMemo(() => {
        return mode === "light" ? lightTheme : darkTheme;
    }, [mode]);

    return { mode, toggleColorMode, currentTheme };
};
