import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { authService } from "../api/authService";

type User = any;

interface AuthState {
    user: User | null;
    token: string | null;
    isLoggedIn: boolean;
    loading: boolean;
    error: string | null;

    // actions
    register: (payload: any) => Promise<void>;
    login: (payload: any) => Promise<void>;
    logout: () => Promise<void>;
    loadFromStorage: () => Promise<void>;
    updateUser: (user: User) => Promise<void>;
    forgotPassword: (email: string) => Promise<void>;
    resetPassword: (token: string, password: string) => Promise<void>;
    clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: null,
    isLoggedIn: false,
    loading: false,
    error: null,

    // ---------------- REGISTER ----------------
    register: async (payload) => {
        set({ loading: true, error: null });
        try {
            const data = await authService.register(payload);

            const user = data?.data || data?.user;
            const token = data?.token;

            if (token) {
                await AsyncStorage.setItem("token", token);
            }
            if (user) {
                await AsyncStorage.setItem("user", JSON.stringify(user));
            }

            set({
                user: user,
                token: token,
                isLoggedIn: !!token,
                loading: false,
            });
        } catch (error: any) {
            set({
                error: error?.response?.data?.message || error.message || "Registration failed",
                loading: false
            });
            throw error;
        }
    },

    // ---------------- LOGIN ----------------
    login: async (payload) => {
        set({ loading: true, error: null });
        try {
            const data = await authService.login(payload);

            const user = data?.data || data?.user;
            const token = data?.token;

            if (token) {
                await AsyncStorage.setItem("token", token);
            }
            if (user) {
                await AsyncStorage.setItem("user", JSON.stringify(user));
            }

            set({
                user: user,
                token: token,
                isLoggedIn: !!token,
                loading: false,
            });
        } catch (error: any) {
            set({
                error: error?.response?.data?.message || error.message || "Login failed",
                loading: false
            });
            throw error;
        }
    },

    // ---------------- LOGOUT ----------------
    logout: async () => {
        try {
            await authService.logout();
            await AsyncStorage.removeItem("user");
            await AsyncStorage.removeItem("token");

            set({
                user: null,
                token: null,
                isLoggedIn: false,
            });
        } catch (error) {
            console.error("Logout error:", error);
        }
    },

    // ---------------- LOAD ON APP START ----------------
    loadFromStorage: async () => {
        set({ loading: true });
        try {
            const token = await AsyncStorage.getItem("token");
            const userStr = await AsyncStorage.getItem("user");

            if (token && userStr) {
                set({
                    token,
                    user: JSON.parse(userStr),
                    isLoggedIn: true,
                    loading: false,
                });
            } else {
                set({ loading: false });
            }
        } catch (error) {
            set({ loading: false });
            console.error("Load from storage error:", error);
        }
    },

    updateUser: async (user) => {
        await AsyncStorage.setItem("user", JSON.stringify(user));
        set({ user });
    },

    forgotPassword: async (email: string) => {
        set({ loading: true, error: null });
        try {
            await authService.forgotPassword(email);
            set({ loading: false });
        } catch (error: any) {
            set({
                error: error?.response?.data?.message || error.message || "Failed to send reset email",
                loading: false
            });
            throw error;
        }
    },

    resetPassword: async (token: string, password: string) => {
        set({ loading: true, error: null });
        try {
            await authService.resetPassword(token, password);
            set({ loading: false });
        } catch (error: any) {
            set({
                error: error?.response?.data?.message || error.message || "Failed to reset password",
                loading: false
            });
            throw error;
        }
    },

    clearError: () => set({ error: null }),
}));