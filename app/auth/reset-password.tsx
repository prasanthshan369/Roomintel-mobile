import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Colors } from "../../constants/Colors";
import { useAuthStore } from "../../src/store/useAuthStore";

export default function ResetPasswordScreen() {
    const router = useRouter();
    const { email } = useLocalSearchParams<{ email: string }>();

    const [formData, setFormData] = useState({
        token: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({
        token: '',
        password: '',
        confirmPassword: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { resetPassword, loading } = useAuthStore();

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setErrors(prev => ({ ...prev, [field]: '' }));
    };

    const validateForm = () => {
        const newErrors = { token: '', password: '', confirmPassword: '' };
        let valid = true;

        if (!formData.token.trim()) {
            newErrors.token = 'Reset code is required';
            valid = false;
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
            valid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            valid = false;
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
            valid = false;
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        try {
            await resetPassword(formData.token.trim(), formData.password);
            Alert.alert(
                'Password Reset',
                'Your password has been reset successfully. Please sign in with your new password.',
                [
                    {
                        text: 'Sign In',
                        onPress: () => router.replace("/auth/sign-in"),
                    },
                ]
            );
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || error.message || 'Failed to reset password. Please try again.';
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

                    {/* Key Icon */}
                    <View className="items-center mb-6">
                        <View className="w-20 h-20 bg-orange-50 rounded-full items-center justify-center mb-4">
                            <Ionicons name="key-outline" size={40} color="#F1510C" />
                        </View>
                    </View>

                    {/* Header */}
                    <View className="mb-6 items-center">
                        <Text className="text-3xl font-bold text-primary mb-2 text-center">Reset Password</Text>
                        <Text className="text-gray-400 text-sm text-center px-4 leading-5">
                            Enter the code sent to {email || 'your email'} and create a new password.
                        </Text>
                    </View>

                    {/* Reset Code / OTP */}
                    <View className="mb-3.5">
                        <Text className="text-gray-700 font-semibold text-sm mb-1.5 ml-0.5">Reset Code</Text>
                        <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-3">
                            <Ionicons name="keypad-outline" size={20} color={Colors.light.textSecondary} />
                            <TextInput
                                placeholder="Enter reset code"
                                placeholderTextColor={Colors.light.textSecondary}
                                className="flex-1 ml-2.5 text-gray-900 text-[15px]"
                                autoCapitalize="none"
                                value={formData.token}
                                onChangeText={(text) => handleInputChange('token', text)}
                            />
                        </View>
                        {errors.token ? <Text style={{ color: 'red' }} className="text-xs mt-1 ml-1">{errors.token}</Text> : null}
                    </View>

                    {/* New Password */}
                    <View className="mb-3.5">
                        <Text className="text-gray-700 font-semibold text-sm mb-1.5 ml-0.5">New Password</Text>
                        <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-3">
                            <Ionicons name="lock-closed-outline" size={20} color={Colors.light.textSecondary} />
                            <TextInput
                                placeholder="Enter new password"
                                placeholderTextColor={Colors.light.textSecondary}
                                className="flex-1 ml-2.5 text-gray-900 text-[15px]"
                                secureTextEntry={!showPassword}
                                value={formData.password}
                                onChangeText={(text) => handleInputChange('password', text)}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color={Colors.light.textSecondary} />
                            </TouchableOpacity>
                        </View>
                        {errors.password ? <Text style={{ color: 'red' }} className="text-xs mt-1 ml-1">{errors.password}</Text> : null}
                    </View>

                    {/* Confirm Password */}
                    <View className="mb-6">
                        <Text className="text-gray-700 font-semibold text-sm mb-1.5 ml-0.5">Confirm Password</Text>
                        <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-3">
                            <Ionicons name="lock-closed-outline" size={20} color={Colors.light.textSecondary} />
                            <TextInput
                                placeholder="Confirm new password"
                                placeholderTextColor={Colors.light.textSecondary}
                                className="flex-1 ml-2.5 text-gray-900 text-[15px]"
                                secureTextEntry={!showConfirmPassword}
                                value={formData.confirmPassword}
                                onChangeText={(text) => handleInputChange('confirmPassword', text)}
                            />
                            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                                <Ionicons name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} size={20} color={Colors.light.textSecondary} />
                            </TouchableOpacity>
                        </View>
                        {errors.confirmPassword ? <Text style={{ color: 'red' }} className="text-xs mt-1 ml-1">{errors.confirmPassword}</Text> : null}
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
                            <Text className="text-white font-bold text-[17px]">Reset Password</Text>
                        )}
                    </TouchableOpacity>

                    {/* Back to Sign In */}
                    <View className="flex-row justify-center mt-8">
                        <Text className="text-gray-500">Remember your password? </Text>
                        <TouchableOpacity onPress={() => router.replace("/auth/sign-in")}>
                            <Text className="text-primary font-bold">Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
