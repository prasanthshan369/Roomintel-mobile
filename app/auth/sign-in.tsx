import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../constants/ThemeContext";
import { useAuthStore } from "../../src/store/useAuthStore";



export default function SignInScreen() {
    const router = useRouter();
    const { isDarkMode, colors } = useTheme();
    const { login, loading: authLoading } = useAuthStore();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setErrors(prev => ({ ...prev, [field]: '' }));
    };

    const validateForm = () => {
        const newErrors = { email: '', password: '' };
        let valid = true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
            valid = false;
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
            valid = false;
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
            valid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleAuthSubmit = async () => {
        if (!validateForm()) return;

        try {
            await login({
                email: formData.email,
                password: formData.password,
            });

            // If login is successful (no error thrown), navigate to main app
            router.replace("/(tabs)");
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || error.message || 'Authentication failed. Please try again.';
            Alert.alert('Login Failed', errorMessage);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1"
            style={{ backgroundColor: colors.bg }}
        >
            <StatusBar style={isDarkMode ? "light" : "dark"} />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                <View className="flex-1 px-8 pt-16 pb-8 justify-center">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="w-12 h-12 rounded-full items-center justify-center mb-6 absolute top-12 left-6 z-10"
                        style={{ backgroundColor: colors.card }}
                    >
                        <Ionicons name="arrow-back" size={28} color={colors.text} />
                    </TouchableOpacity>

                    <View className="mb-12 items-center mt-12">
                        <Text className="text-4xl font-bold mb-4 text-center" style={{ color: colors.text }}>Let's Sign You In</Text>
                        <Text className="text-lg text-center px-6" style={{ color: colors.textSecondary }}>Welcome back, you've been missed!</Text>
                    </View>

                    <View className="space-y-8">
                        <View>
                            <Text className="font-bold text-lg mb-3 ml-1" style={{ color: colors.text }}>Email Address</Text>
                            <View className="flex-row items-center border rounded-2xl px-5 py-4 transition-colors" style={{ backgroundColor: colors.inputBg, borderColor: colors.border }}>
                                <Ionicons name="mail-outline" size={24} color={colors.textSecondary} />
                                <TextInput
                                    placeholder="name@example.com"
                                    placeholderTextColor={colors.textSecondary}
                                    className="flex-1 ml-4 text-lg font-medium"
                                    style={{ color: colors.text }}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    value={formData.email}
                                    onChangeText={(text) => handleInputChange('email', text)}
                                />
                            </View>
                            {errors.email ? <Text style={{ color: 'red', fontSize: 13, marginTop: 4, marginLeft: 4 }}>{errors.email}</Text> : null}
                        </View>

                        <View>
                            <Text className="font-bold text-lg mb-3 ml-1" style={{ color: colors.text }}>Password</Text>
                            <View className="flex-row items-center border rounded-2xl px-5 py-4 transition-colors" style={{ backgroundColor: colors.inputBg, borderColor: colors.border }}>
                                <Ionicons name="lock-closed-outline" size={24} color={colors.textSecondary} />
                                <TextInput
                                    placeholder="Enter your password"
                                    placeholderTextColor={colors.textSecondary}
                                    className="flex-1 ml-4 text-lg font-medium"
                                    style={{ color: colors.text }}
                                    secureTextEntry={!showPassword}
                                    value={formData.password}
                                    onChangeText={(text) => handleInputChange('password', text)}
                                />
                                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                    <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={24} color={colors.textSecondary} />
                                </TouchableOpacity>
                            </View>
                            {errors.password ? <Text style={{ color: 'red', fontSize: 13, marginTop: 4, marginLeft: 4 }}>{errors.password}</Text> : null}
                        </View>

                        <TouchableOpacity className="items-end" onPress={() => router.push("/auth/forgot-password")}>
                            <Text className="font-bold text-base" style={{ color: "#0A1B56" }}>Forgot Password?</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={handleAuthSubmit}
                            disabled={authLoading}
                            className={`py-5 rounded-2xl items-center shadow-xl shadow-orange-900/30 active:opacity-90 mt-2 ${authLoading ? 'bg-gray-400' : 'bg-secondary'}`}
                        >
                            {authLoading ? (
                                <ActivityIndicator color="#fff" size="small" />
                            ) : (
                                <Text className="text-white font-bold text-xl">Sign In</Text>
                            )}
                        </TouchableOpacity>

                        <View className="flex-row items-center my-8">
                            <View className="flex-1 h-[1px]" style={{ backgroundColor: colors.border }} />
                            <Text className="mx-4 font-medium text-base" style={{ color: colors.textSecondary }}>Or continue with</Text>
                            <View className="flex-1 h-[1px]" style={{ backgroundColor: colors.border }} />
                        </View>

                        <View className="flex-row justify-between w-full px-8">
                            <TouchableOpacity className="flex-row items-center justify-center border rounded-full w-20 h-20 shadow-sm" style={{ backgroundColor: colors.card, borderColor: colors.border }}>
                                <Ionicons name="logo-google" size={32} color="#DB4437" />
                            </TouchableOpacity>
                            <TouchableOpacity className="flex-row items-center justify-center border rounded-full w-20 h-20 shadow-sm" style={{ backgroundColor: colors.card, borderColor: colors.border }}>
                                <Ionicons name="logo-apple" size={32} color={isDarkMode ? "#FFFFFF" : "#000000"} />
                            </TouchableOpacity>
                            <TouchableOpacity className="flex-row items-center justify-center border rounded-full w-20 h-20 shadow-sm" style={{ backgroundColor: colors.card, borderColor: colors.border }}>
                                <Ionicons name="logo-facebook" size={32} color="#1877F2" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View className="flex-row justify-center mt-12 mb-4">
                    <Text style={{ color: colors.textSecondary }}>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => router.push("/auth/sign-up")}>
                        <Text className="font-bold" style={{ color: "#0A1B56" }}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
