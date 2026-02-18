import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function OnboardingScreen() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.replace("/auth/sign-in");
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="auto" />

      {/* Top Image Section */}
      <View className="flex-1 relative items-center justify-center">
        <Image
          source={{ uri: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" }}
          // className="w-full  h-[350px] rounded-full"
          className="w-full h-full  rounded-b-3xl"
          resizeMode="cover"
        />
      </View>

      {/* Bottom Content Section */}
      <View className="px-8 pt-10 pb-12 items-center">
        <Text className="text-4xl font-bold text-center text-gray-900 mb-4 leading-tight">
          Find Your{"\n"}
          <Text className="text-secondary">Perfect Place</Text>{"\n"}
          to stay
        </Text>
        <Text className="text-gray-500 text-center text-base mb-10 leading-6 px-4">
          Find  hotel easily and travel anywhere you want to go.
        </Text>

        <TouchableOpacity
          onPress={handleGetStarted}
          className="bg-secondary w-full py-4 rounded-2xl items-center shadow-lg shadow-orange-500/30 active:opacity-90 flex-row justify-center space-x-2"
        >
          <Text className="text-white font-bold text-lg">Get Started</Text>
          <Ionicons name="arrow-forward" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
