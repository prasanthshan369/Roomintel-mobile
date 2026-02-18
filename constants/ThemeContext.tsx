import React, { createContext, useContext, useState } from "react";

interface ThemeContextType {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
    colors: {
        bg: string;
        card: string;
        text: string;
        textSecondary: string;
        border: string;
        inputBg: string;
        tabBar: string;
        tabInactive: string;
    };
}

const lightColors = {
    bg: "#F9FAFB",
    card: "#FFFFFF",
    text: "#111827",
    textSecondary: "#6B7280",
    border: "#E5E7EB",
    inputBg: "#FFFFFF",
    tabBar: "#FFFFFF",
    tabInactive: "gray",
};

const darkColors = {
    bg: "#111827",
    card: "#1F2937",
    text: "#F9FAFB",
    textSecondary: "#9CA3AF",
    border: "#374151",
    inputBg: "#374151",
    tabBar: "#1F2937",
    tabInactive: "#6B7280",
};

const ThemeContext = createContext<ThemeContextType>({
    isDarkMode: false,
    toggleDarkMode: () => { },
    colors: lightColors,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

    const colors = isDarkMode ? darkColors : lightColors;

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, colors }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
