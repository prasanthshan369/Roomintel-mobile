import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../constants/ThemeContext";

const SAVED_HOTELS = [
    {
        id: "2",
        name: "Mountain Retreat",
        location: "Swiss Alps",
        price: "$450",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
    {
        id: "5",
        name: "Grand Plaza",
        location: "Paris, France",
        price: "$290",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
    {
        id: "6",
        name: "Seaside Villa",
        location: "Amalfi Coast, Italy",
        price: "$400",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
];

export default function SavedScreen() {
    const router = useRouter();
    const { isDarkMode, colors } = useTheme();

    const renderSavedItem = ({ item }: { item: typeof SAVED_HOTELS[0] }) => (
        <TouchableOpacity
            onPress={() => router.push(`/hotel/${item.id}`)}
            className="flex-row rounded-2xl shadow-sm p-3 mb-4"
            style={{ backgroundColor: colors.card }}
        >
            <Image
                source={{ uri: item.image }}
                className="w-28 h-28 rounded-xl"
                resizeMode="cover"
            />
            <View className="flex-1 ml-4 py-1 justify-between">
                <View>
                    <View className="flex-row justify-between items-start">
                        <Text className="text-lg font-bold flex-1 mr-2 line-clamp-1" style={{ color: colors.text }}>{item.name}</Text>
                        <TouchableOpacity>
                            <Ionicons name="heart" size={20} color="#ef4444" />
                        </TouchableOpacity>
                    </View>
                    <View className="flex-row items-center space-x-1 mt-1">
                        <Ionicons name="location-sharp" size={14} color="#9ca3af" />
                        <Text className="text-sm line-clamp-1" style={{ color: colors.textSecondary }}>{item.location}</Text>
                    </View>
                </View>

                <View className="flex-row justify-between items-end">
                    <View
                        className="flex-row items-center space-x-1 px-2 py-1 rounded-lg"
                        style={{ backgroundColor: isDarkMode ? "#422006" : "#FEFCE8" }}
                    >
                        <Ionicons name="star" size={14} color="#fbbf24" />
                        <Text className="text-xs font-bold" style={{ color: colors.text }}>{item.rating} (Review)</Text>
                    </View>
                    <Text className="text-primary font-bold text-lg">
                        {item.price}
                        <Text className="text-xs font-normal" style={{ color: colors.textSecondary }}>/</Text>
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView className="flex-1" style={{ backgroundColor: colors.bg }}>
            <View className="px-6 pt-4 pb-2">
                <Text className="text-3xl font-bold mb-6" style={{ color: colors.text }}>Saved</Text>
            </View>

            <FlatList
                data={SAVED_HOTELS}
                renderItem={renderSavedItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View className="flex-1 justify-center items-center mt-20">
                        <Ionicons name="heart-outline" size={64} color={colors.textSecondary} />
                        <Text className="text-lg mt-4 font-medium" style={{ color: colors.textSecondary }}>No saved hotels yet</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
}
