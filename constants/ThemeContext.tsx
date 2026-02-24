import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextType {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
    themeLoaded: boolean;
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

const THEME_STORAGE_KEY = 'app_theme_dark_mode';

const ThemeContext = createContext<ThemeContextType>({
    isDarkMode: false,
    toggleDarkMode: () => { },
    themeLoaded: false,
    colors: lightColors,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [themeLoaded, setThemeLoaded] = useState(false);

    // Load saved theme on app start
    useEffect(() => {
        const loadTheme = async () => {
            try {
                const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
                if (savedTheme !== null) {
                    setIsDarkMode(savedTheme === 'true');
                }
            } catch (error) {
                console.log('Error loading theme:', error);
            } finally {
                setThemeLoaded(true);
            }
        };
        loadTheme();
    }, []);

    // Save theme whenever it changes
    const toggleDarkMode = async () => {
        const newValue = !isDarkMode;
        setIsDarkMode(newValue);
        try {
            await AsyncStorage.setItem(THEME_STORAGE_KEY, String(newValue));
        } catch (error) {
            console.log('Error saving theme:', error);
        }
    };

    const colors = isDarkMode ? darkColors : lightColors;

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, themeLoaded, colors }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
