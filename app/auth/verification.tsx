import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Colors } from "../../constants/Colors";

export default function VerificationScreen() {
    const router = useRouter();
    const [code, setCode] = useState(["", "", "", ""]);
    const inputRefs = useRef<Array<TextInput | null>>([]);

    const handleCodeChange = (text: string, index: number) => {
        const newCode = [...code];
        newCode[index] = text;
        setCode(newCode);

        if (text && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1 bg-white"
        >
            <StatusBar style="dark" />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                <View className="flex-1 px-6 pt-12 pb-6">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="w-10 h-10 bg-gray-50 rounded-full items-center justify-center mb-8"
                    >
                        <Ionicons name="arrow-back" size={24} color={Colors.light.text} />
                    </TouchableOpacity>

                    <View className="mb-12 items-center">
                        <Text className="text-4xl font-bold text-primary mb-4 text-center">Verify Code</Text>
                        <Text className="text-gray-500 text-lg text-center px-6 leading-6">
                            Please enter the code we sent to your email <Text className="text-secondary font-bold">@user@gmail.com</Text>
                        </Text>
                    </View>

                    <View className="flex-row justify-center space-x-6 mb-12">
                        {code.map((digit, index) => (
                            <TextInput
                                key={index}
                                ref={(ref) => { inputRefs.current[index] = ref; }}
                                className={`w-16 h-16 border-2 mx-2 rounded-2xl text-center text-3xl font-bold bg-gray-50 ${digit ? 'border-secondary text-secondary bg-white shadow-sm shadow-orange-500/10' : 'border-gray-200 text-gray-900'
                                    } focus:border-secondary focus:bg-white`}
                                maxLength={1}
                                keyboardType="number-pad"
                                value={digit}
                                onChangeText={(text) => handleCodeChange(text, index)}
                                onKeyPress={(e) => handleKeyPress(e, index)}
                                selectionColor={Colors.light.secondary}
                            />
                        ))}
                    </View>

                    <View className="items-center mb-10">
                        <Text className="text-gray-400 text-base mb-3">00:46</Text>
                        <View className="flex-row justify-center">
                            <Text className="text-gray-500 text-base">Didn't receive code? </Text>
                            <TouchableOpacity>
                                <Text className="text-secondary font-bold text-base border-b-2 border-secondary border-dotted">Resend Code</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity
                        onPress={() => router.replace("/(tabs)")}
                        className="bg-secondary py-5 rounded-2xl items-center shadow-xl shadow-orange-900/30 active:opacity-90"
                    >
                        <Text className="text-white font-bold text-xl">Verify</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
