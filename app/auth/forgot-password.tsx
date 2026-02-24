import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Colors } from "../../constants/Colors";
import { useAuthStore } from "../../src/store/useAuthStore";

export default function ForgotPasswordScreen() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const { forgotPassword, loading } = useAuthStore();

    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email.trim()) {
            setEmailError('Email is required');
            return false;
        }
        if (!emailRegex.test(email)) {
            setEmailError('Please enter a valid email address');
            return false;
        }

        setEmailError('');
        return true;
    };

    const handleSubmit = async () => {
        if (!validateEmail()) return;

        try {
            await forgotPassword(email.trim());
            Alert.alert(
                'Email Sent',
                'A password reset link has been sent to your email address.',
                [
                    {
                        text: 'OK',
                        onPress: () => router.push({ pathname: "/auth/reset-password", params: { email: email.trim() } }),
                    },
                ]
            );
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || error.message || 'Failed to send reset email. Please try again.';
            Alert.alert('Error', errorMessage);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1 bg-white"
        >
            <StatusBar style="dark" />
            <ScrollView
                contentContainerStyle={{ paddingBottom: 30 }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <View className="px-6 pt-12">
                    {/* Back Button */}
                    <TouchableOpacity
                        onPress={() => router.canGoBack() ? router.back() : router.replace('/auth/sign-in')}
                        className="w-10 h-10 bg-gray-50 rounded-full items-center justify-center mb-6"
                    >
                        <Ionicons name="arrow-back" size={24} color={Colors.light.text} />
                    </TouchableOpacity>

                    {/* Lock Icon */}
                    <View className="items-center mb-6">
                        <View className="w-20 h-20 bg-orange-50 rounded-full items-center justify-center mb-4">
                            <Ionicons name="lock-closed-outline" size={40} color="#F1510C" />
                        </View>
                    </View>

                    {/* Header */}
                    <View className="mb-8 items-center">
                        <Text className="text-3xl font-bold text-primary mb-2 text-center">Forgot Password?</Text>
                        <Text className="text-gray-400 text-sm text-center px-4 leading-5">
                            Don't worry! Enter your email address and we'll send you a link to reset your password.
                        </Text>
                    </View>

                    {/* Email Input */}
                    <View className="mb-6">
                        <Text className="text-gray-700 font-semibold text-sm mb-1.5 ml-0.5">Email Address</Text>
                        <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-3">
                            <Ionicons name="mail-outline" size={20} color={Colors.light.textSecondary} />
                            <TextInput
                                placeholder="name@example.com"
                                placeholderTextColor={Colors.light.textSecondary}
                                className="flex-1 ml-2.5 text-gray-900 text-[15px]"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={email}
                                onChangeText={(text) => {
                                    setEmail(text);
                                    setEmailError('');
                                }}
                            />
                        </View>
                        {emailError ? <Text style={{ color: 'red' }} className="text-xs mt-1 ml-1">{emailError}</Text> : null}
                    </View>

                    {/* Submit Button */}
                    <TouchableOpacity
                        onPress={handleSubmit}
                        disabled={loading}
                        className={`py-4 rounded-xl items-center shadow-lg active:opacity-90 ${loading ? 'bg-gray-400' : 'bg-secondary'}`}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" size="small" />
                        ) : (
                            <Text className="text-white font-bold text-[17px]">Send Reset Link</Text>
                        )}
                    </TouchableOpacity>

                    {/* Back to Sign In */}
                    <View className="flex-row justify-center mt-8">
                        <Text className="text-gray-500">Remember your password? </Text>
                        <TouchableOpacity onPress={() => router.push("/auth/sign-in")}>
                            <Text className="text-primary font-bold">Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
