import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../constants/ThemeContext";
import { useAuthStore } from "../../src/store/useAuthStore";

export default function SignUpScreen() {
    const router = useRouter();
    const { isDarkMode, colors } = useTheme();
    const { register, loading: authLoading } = useAuthStore();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [agreed, setAgreed] = useState(false);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setErrors(prev => ({ ...prev, [field]: '' }));
    };

    const validateForm = () => {
        const newErrors = { name: '', email: '', password: '', confirmPassword: '' };
        let valid = true;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.name.trim()) {
            newErrors.name = 'Full name is required';
            valid = false;
        }

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

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
            valid = false;
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
            valid = false;
        }

        if (!agreed) {
            Alert.alert('Terms & Conditions', 'Please agree to the Terms & Conditions to continue.');
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSignUp = async () => {
        if (!validateForm()) return;

        try {
            await register({
                name: formData.name,
                email: formData.email,
                password: formData.password,
            });

            Alert.alert('Success', 'Account created successfully!', [
                {
                    text: 'OK',
                    onPress: () => router.replace("/(tabs)"),
                },
            ]);
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || error.message || 'Registration failed. Please try again.';
            Alert.alert('Sign Up Failed', errorMessage);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1"
            style={{ backgroundColor: colors.bg }}
        >
            <StatusBar style={isDarkMode ? "light" : "dark"} />
            <ScrollView
                contentContainerStyle={{ paddingBottom: 30 }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <View className="px-6 pt-12">
                    {/* Back Button */}
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="w-10 h-10 rounded-full items-center justify-center mb-4"
                        style={{ backgroundColor: colors.card }}
                    >
                        <Ionicons name="arrow-back" size={24} color={colors.text} />
                    </TouchableOpacity>

                    {/* Header */}
                    <View className="mb-6 items-center">
                        <Text className="text-3xl font-bold mb-1 text-center" style={{ color: colors.text }}>Create Account</Text>
                        <Text className="text-sm text-center" style={{ color: colors.textSecondary }}>Start exploring your dream stays today!</Text>
                    </View>

                    {/* Full Name */}
                    <View className="mb-3.5">
                        <Text className="font-semibold text-sm mb-1.5 ml-0.5" style={{ color: colors.text }}>Full Name</Text>
                        <View className="flex-row items-center border rounded-xl px-3.5 py-3" style={{ backgroundColor: colors.inputBg, borderColor: colors.border }}>
                            <Ionicons name="person-outline" size={20} color={colors.textSecondary} />
                            <TextInput
                                placeholder="John Doe"
                                placeholderTextColor={colors.textSecondary}
                                className="flex-1 ml-2.5 text-[15px]"
                                style={{ color: colors.text }}
                                value={formData.name}
                                onChangeText={(text) => handleInputChange('name', text)}
                            />
                        </View>
                        {errors.name ? <Text style={{ color: 'red' }} className="text-xs mt-1 ml-1">{errors.name}</Text> : null}
                    </View>

                    {/* Email */}
                    <View className="mb-3.5">
                        <Text className="font-semibold text-sm mb-1.5 ml-0.5" style={{ color: colors.text }}>Email Address</Text>
                        <View className="flex-row items-center border rounded-xl px-3.5 py-3" style={{ backgroundColor: colors.inputBg, borderColor: colors.border }}>
                            <Ionicons name="mail-outline" size={20} color={colors.textSecondary} />
                            <TextInput
                                placeholder="name@example.com"
                                placeholderTextColor={colors.textSecondary}
                                className="flex-1 ml-2.5 text-[15px]"
                                style={{ color: colors.text }}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={formData.email}
                                onChangeText={(text) => handleInputChange('email', text)}
                            />
                        </View>
                        {errors.email ? <Text style={{ color: 'red' }} className="text-xs mt-1 ml-1">{errors.email}</Text> : null}
                    </View>

                    {/* Password */}
                    <View className="mb-3.5">
                        <Text className="font-semibold text-sm mb-1.5 ml-0.5" style={{ color: colors.text }}>Password</Text>
                        <View className="flex-row items-center border rounded-xl px-3.5 py-3" style={{ backgroundColor: colors.inputBg, borderColor: colors.border }}>
                            <Ionicons name="lock-closed-outline" size={20} color={colors.textSecondary} />
                            <TextInput
                                placeholder="Create a password"
                                placeholderTextColor={colors.textSecondary}
                                className="flex-1 ml-2.5 text-[15px]"
                                style={{ color: colors.text }}
                                secureTextEntry={!showPassword}
                                value={formData.password}
                                onChangeText={(text) => handleInputChange('password', text)}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color={colors.textSecondary} />
                            </TouchableOpacity>
                        </View>
                        {errors.password ? <Text style={{ color: 'red' }} className="text-xs mt-1 ml-1">{errors.password}</Text> : null}
                    </View>

                    {/* Confirm Password */}
                    <View className="mb-3.5">
                        <Text className="font-semibold text-sm mb-1.5 ml-0.5" style={{ color: colors.text }}>Confirm Password</Text>
                        <View className="flex-row items-center border rounded-xl px-3.5 py-3" style={{ backgroundColor: colors.inputBg, borderColor: colors.border }}>
                            <Ionicons name="lock-closed-outline" size={20} color={colors.textSecondary} />
                            <TextInput
                                placeholder="Confirm your password"
                                placeholderTextColor={colors.textSecondary}
                                className="flex-1 ml-2.5 text-[15px]"
                                style={{ color: colors.text }}
                                secureTextEntry={!showConfirmPassword}
                                value={formData.confirmPassword}
                                onChangeText={(text) => handleInputChange('confirmPassword', text)}
                            />
                            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                                <Ionicons name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} size={20} color={colors.textSecondary} />
                            </TouchableOpacity>
                        </View>
                        {errors.confirmPassword ? <Text style={{ color: 'red' }} className="text-xs mt-1 ml-1">{errors.confirmPassword}</Text> : null}
                    </View>

                    {/* Terms & Conditions */}
                    <View className="flex-row items-start mb-4">
                        <TouchableOpacity
                            onPress={() => setAgreed(!agreed)}
                            style={{ backgroundColor: agreed ? '#0A1B56' : 'transparent', borderColor: agreed ? '#0A1B56' : colors.border }}
                            className="mt-0.5 w-[22px] h-[22px] border-2 rounded items-center justify-center"
                        >
                            {agreed && <Ionicons name="checkmark" size={14} color="white" />}
                        </TouchableOpacity>
                        <Text className="text-[13px] flex-1 leading-5 ml-2.5" style={{ color: colors.textSecondary }}>
                            <Text className="font-bold" style={{ color: "#0A1B56" }}>Agree With </Text>
                            <Text className="font-bold" style={{ color: "#F1510C" }}>Terms & Conditions</Text>
                        </Text>
                    </View>

                    {/* Sign Up Button */}
                    <TouchableOpacity
                        onPress={handleSignUp}
                        disabled={authLoading}
                        className={`py-4 rounded-xl items-center shadow-lg active:opacity-90 ${authLoading ? 'bg-gray-400' : 'bg-secondary'}`}
                    >
                        {authLoading ? (
                            <ActivityIndicator color="#fff" size="small" />
                        ) : (
                            <Text className="text-white font-bold text-[17px]">Sign Up</Text>
                        )}
                    </TouchableOpacity>

                    {/* Divider */}
                    <View className="flex-row items-center my-4">
                        <View className="flex-1 h-[1px]" style={{ backgroundColor: colors.border }} />
                        <Text className="mx-3 font-medium text-[13px]" style={{ color: colors.textSecondary }}>Or sign up with</Text>
                        <View className="flex-1 h-[1px]" style={{ backgroundColor: colors.border }} />
                    </View>

                    {/* Social Buttons */}
                    <View className="flex-row justify-center gap-5">
                        <TouchableOpacity className="w-[52px] h-[52px] border rounded-full items-center justify-center" style={{ backgroundColor: colors.card, borderColor: colors.border }}>
                            <Ionicons name="logo-google" size={24} color="#DB4437" />
                        </TouchableOpacity>
                        <TouchableOpacity className="w-[52px] h-[52px] border rounded-full items-center justify-center" style={{ backgroundColor: colors.card, borderColor: colors.border }}>
                            <Ionicons name="logo-apple" size={24} color={isDarkMode ? "#FFFFFF" : "#000000"} />
                        </TouchableOpacity>
                        <TouchableOpacity className="w-[52px] h-[52px] border rounded-full items-center justify-center" style={{ backgroundColor: colors.card, borderColor: colors.border }}>
                            <Ionicons name="logo-facebook" size={24} color="#1877F2" />
                        </TouchableOpacity>
                    </View>

                    {/* Sign In Link */}
                    <View className="flex-row justify-center mt-6 mb-2">
                        <Text style={{ color: colors.textSecondary }}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => router.push("/auth/sign-in")}>
                            <Text className="font-bold" style={{ color: "#0A1B56" }}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

