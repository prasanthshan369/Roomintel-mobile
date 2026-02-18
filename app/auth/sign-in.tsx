import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Colors } from "../../constants/Colors";

export default function SignInScreen() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1 bg-white"
        >
            <StatusBar style="dark" />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                <View className="flex-1 px-8 pt-16 pb-8 justify-center">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="w-12 h-12 bg-gray-50 rounded-full items-center justify-center mb-6 absolute top-12 left-6 z-10"
                    >
                        <Ionicons name="arrow-back" size={28} color={Colors.light.text} />
                    </TouchableOpacity>

                    <View className="mb-12 items-center mt-12">
                        <Text className="text-4xl font-bold text-primary mb-4 text-center">Let's Sign You In</Text>
                        <Text className="text-gray-500 text-lg text-center px-6">Welcome back, you've been missed!</Text>
                    </View>

                    <View className="space-y-8">
                        <View>
                            <Text className="text-gray-700 font-bold text-lg mb-3 ml-1">Email Address</Text>
                            <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 focus:border-primary focus:bg-white transition-colors">
                                <Ionicons name="mail-outline" size={24} color={Colors.light.textSecondary} />
                                <TextInput
                                    placeholder="name@example.com"
                                    placeholderTextColor={Colors.light.textSecondary}
                                    className="flex-1 ml-4 text-gray-900 text-lg font-medium"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    value={email}
                                    onChangeText={setEmail}
                                />
                            </View>
                        </View>

                        <View>
                            <Text className="text-gray-700 font-bold text-lg mb-3 ml-1">Password</Text>
                            <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 focus:border-primary focus:bg-white transition-colors">
                                <Ionicons name="lock-closed-outline" size={24} color={Colors.light.textSecondary} />
                                <TextInput
                                    placeholder="Enter your password"
                                    placeholderTextColor={Colors.light.textSecondary}
                                    className="flex-1 ml-4 text-gray-900 text-lg font-medium"
                                    secureTextEntry={!showPassword}
                                    value={password}
                                    onChangeText={setPassword}
                                />
                                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                    <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={24} color={Colors.light.textSecondary} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <TouchableOpacity className="items-end">
                            <Text className="text-primary font-bold text-base">Forgot Password?</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => router.replace("/(tabs)")}
                            className="bg-secondary py-5 rounded-2xl items-center shadow-xl shadow-orange-900/30 active:opacity-90 mt-2"
                        >
                            <Text className="text-white font-bold text-xl">Sign In</Text>
                        </TouchableOpacity>

                        <View className="flex-row items-center my-8">
                            <View className="flex-1 h-[1px] bg-gray-200" />
                            <Text className="mx-4 text-gray-500 font-medium text-base">Or continue with</Text>
                            <View className="flex-1 h-[1px] bg-gray-200" />
                        </View>

                        <View className="flex-row justify-between w-full px-8">
                            <TouchableOpacity className="flex-row items-center justify-center border border-gray-200 rounded-full w-20 h-20 bg-white shadow-sm">
                                <Ionicons name="logo-google" size={32} color="#DB4437" />
                            </TouchableOpacity>
                            <TouchableOpacity className="flex-row items-center justify-center border border-gray-200 rounded-full w-20 h-20 bg-white shadow-sm">
                                <Ionicons name="logo-apple" size={32} color="#000000" />
                            </TouchableOpacity>
                            <TouchableOpacity className="flex-row items-center justify-center border border-gray-200 rounded-full w-20 h-20 bg-white shadow-sm">
                                <Ionicons name="logo-facebook" size={32} color="#1877F2" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View className="flex-row justify-center mt-12 mb-4">
                    <Text className="text-gray-500">Don't have an account? </Text>
                    <TouchableOpacity onPress={() => router.push("/auth/sign-up")}>
                        <Text className="text-primary font-bold">Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
