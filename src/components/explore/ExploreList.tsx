import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, Dimensions, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { getImageUrl } from "../../utils/imageHelper";

const { width } = Dimensions.get("window");

interface Room {
    _id: string;
    name: string;
    slug?: string;
    location?: string;
    price: number;
    rating?: number;
    previewImage?: string;
    image?: string;
    photo?: string;
    thumbnail?: string;
    category?: any;
}

interface ExploreListProps {
    rooms: Room[];
    loading: boolean;
    searchQuery: string;
    colors: any;
}

const ExploreList: React.FC<ExploreListProps> = ({ rooms, loading, searchQuery, colors }) => {
    const router = useRouter();

    const renderHotelCard = ({ item }: { item: Room }) => (
        <TouchableOpacity
            onPress={() => router.push(`/hotel/${item.slug || item._id}`)}
            className="rounded-3xl shadow-lg mr-5 p-3"
            style={{
                width: width * 0.85,
                backgroundColor: colors.card,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 12,
                elevation: 8,
            }}
        >
            <Image
                source={{ uri: getImageUrl(item.previewImage || item.image || item.photo || item.thumbnail) }}
                className="w-full h-44 rounded-2xl"
                resizeMode="cover"
            />
            <View className="px-4 py-3 space-y-2">
                <View className="flex-row justify-between items-center">
                    <Text className="text-xl font-bold line-clamp-1 flex-1 mr-2" style={{ color: colors.text }}>
                        {item.name}
                    </Text>
                    <View className="flex-row items-end space-x-1 mt-1">
                        <Text className="text-secondary font-bold text-lg" style={{ color: "#F1510C" }}>${item.price}</Text>
                        <Text className="text-sm mb-0.5" style={{ color: colors.textSecondary }}>/Day</Text>
                    </View>
                </View>
                <View className="flex-row items-center space-x-1">
                    <Ionicons name="location-sharp" size={18} color="#9ca3af" />
                    <Text className="text-sm line-clamp-1" style={{ color: colors.textSecondary }}>
                        {item.location || "Location not specified"}
                    </Text>
                </View>
                <View className="flex-row items-center space-x-1 py-1">
                    <Text className="text-secondary font-bold" style={{ color: "#F1510C" }}>{item.rating || "4.5"}</Text>
                    <Ionicons name="star" size={16} color="#fbbf24" />
                    <Text className="text-base ml-2" style={{ color: colors.textSecondary }}>
                        {item.category?.name || "Room"}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View className="absolute bottom-6 left-0 right-0">
            {loading ? (
                <View style={{ alignItems: "center", paddingVertical: 20 }}>
                    <ActivityIndicator size="large" color="#F1510C" />
                </View>
            ) : rooms.length === 0 ? (
                <View
                    style={{
                        marginHorizontal: 24,
                        backgroundColor: colors.card,
                        borderRadius: 16,
                        padding: 20,
                        alignItems: "center",
                    }}
                >
                    <Ionicons name="search-outline" size={32} color="#9CA3AF" />
                    <Text style={{ color: colors.textSecondary, marginTop: 8 }}>
                        No rooms found for "{searchQuery}"
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={rooms}
                    renderItem={renderHotelCard}
                    keyExtractor={(item) => item._id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 10 }}
                    snapToInterval={width * 0.85 + 20}
                    decelerationRate="fast"
                />
            )}
        </View>
    );
};

export default ExploreList;
