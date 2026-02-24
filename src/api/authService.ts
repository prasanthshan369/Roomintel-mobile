import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from './axiosInstance';

export const authService = {
    getMe: async () => {
        const response = await axiosInstance.get('/site/auth/me');
        return response.data;
    },
    register: async (data: any) => {
        const response = await axiosInstance.post('/site/auth/register', data);
        return response.data;
    },
    forgotPassword: async (email: string) => {
        const response = await axiosInstance.post('/site/auth/forgot-password', { email });
        return response.data;
    },
    resetPassword: async (token: string, password: string) => {
        const response = await axiosInstance.post('/site/auth/reset-password', { token, password });
        return response.data;
    },

    login: async (data: any) => {
        const response = await axiosInstance.post('/site/auth/login', data);
        return response.data;
    },

    logout: async () => {
        await AsyncStorage.removeItem('token');
    }
}