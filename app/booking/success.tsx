import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, TouchableOpacity, View } from "react-native";

export default function SuccessScreen() {
    const router = useRouter();

    return (
        <View className="flex-1 bg-white justify-center items-center px-6">
            <StatusBar style="dark" />

            <View className="w-32 h-32 bg-green-100 rounded-full items-center justify-center mb-8 animate-bounce">
                <Ionicons name="checkmark" size={64} color="#10B981" />
            </View>

            <Text className="text-3xl font-bold text-primary mb-4 text-center">Payment Success!</Text>
            <Text className="text-gray-500 text-center text-lg mb-10 leading-6">
                Your booking has been successfully processed. We have sent the receipt to your email.
            </Text>

            <View className="w-full space-y-4">
                <TouchableOpacity
                    onPress={() => router.push("/(tabs)")}
                    className="bg-primary p-4 rounded-xl items-center shadow-lg shadow-blue-900/20 w-full"
                >
                    <Text className="text-white font-bold text-lg">Go to Home</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => router.push("/(tabs)/saved")}
                    className="bg-white border border-gray-200 p-4 rounded-xl items-center w-full"
                >
                    <Text className="text-gray-700 font-bold text-lg">View My Booking</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
