import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Dimensions,
    FlatList,
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../../constants/ThemeContext";

const { width } = Dimensions.get("window");

const CATEGORIES = ["All", "Recommended", "Popular", "Trending", "Luxury"];

interface Hotel {
    id: string;
    name: string;
    location: string;
    price: string;
    rating: number;
    image: string;
    description?: string;
}

const HOTELS: Hotel[] = [
    {
        id: "1",
        name: "Oceanview Resort",
        location: "Maldives",
        price: "$320",
        rating: 4.8,
        image:
            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        description: "Experience luxury living with breathtaking ocean views.",
    },
    {
        id: "2",
        name: "Mountain Retreat",
        location: "Swiss Alps",
        price: "$450",
        rating: 4.9,
        image:
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        description: "Cozy cabin vibes in the heart of the mountains.",
    },
    {
        id: "3",
        name: "Urban Oasis",
        location: "Tokyo, Japan",
        price: "$210",
        rating: 4.6,
        image:
            "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        description: "Modern stay in the bustling city center.",
    },
];

const NEARBY_HOTELS: Hotel[] = [
    {
        id: "4",
        name: "City Center Hotel",
        location: "London, UK",
        price: "$180",
        rating: 4.5,
        image:
            "https://images.unsplash.com/photo-1455587734955-081b22074882?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
    {
        id: "5",
        name: "Grand Plaza",
        location: "Paris, France",
        price: "$290",
        rating: 4.7,
        image:
            "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
    {
        id: "6",
        name: "Seaside Villa",
        location: "Amalfi Coast, Italy",
        price: "$400",
        rating: 4.9,
        image:
            "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
];

export default function HomeScreen() {
    const router = useRouter();
    const [activeCategory, setActiveCategory] = useState("Recommended");
    const { isDarkMode, colors } = useTheme();

    const renderCategoryItem = ({ item }: { item: string }) => (
        <TouchableOpacity
            onPress={() => setActiveCategory(item)}
            className={`mr-4 px-5 py-2 rounded-full`}
            style={{
                backgroundColor: activeCategory === item ? "#F1510C" : isDarkMode ? "#374151" : "#F3F4F6",
            }}
        >
            <Text
                className="font-semibold"
                style={{
                    color: activeCategory === item ? "#FFFFFF" : colors.textSecondary,
                }}
            >
                {item}
            </Text>
        </TouchableOpacity>
    );

    const renderHotelCard = ({ item }: { item: Hotel }) => (
        <TouchableOpacity
            onPress={() => router.push(`/hotel/${item.id}`)}
            className="mr-6 rounded-2xl shadow-sm w-72 mb-4"
            style={{ backgroundColor: colors.card }}
        >
            <Image
                source={{ uri: item.image }}
                className="w-full h-48 rounded-t-2xl"
                resizeMode="cover"
            />
            <View className="px-4 py-4 space-y-2">
                <View className="flex-row justify-between items-center">
                    <Text className="text-base font-normal text-secondary line-clamp-1 flex-1 mr-2">
                        10% Off
                    </Text>
                    <View className="flex-row items-center space-x-1">
                        <Ionicons name="star" size={16} color="#fbbf24" />
                        <Text className="font-bold" style={{ color: colors.text }}>{item.rating}</Text>
                    </View>
                </View>
                <Text className="text-xl font-bold line-clamp-1 flex-1 mr-2" style={{ color: colors.text }}>
                    {item.name}
                </Text>
                <View className="flex-row items-center space-x-1">
                    <Ionicons name="location-sharp" size={16} color="#9ca3af" />
                    <Text className="text-sm line-clamp-1" style={{ color: colors.textSecondary }}>
                        {item.location}
                    </Text>
                </View>
                <View className="flex-row items-end space-x-1 mt-1">
                    <Text className="text-secondary font-bold text-lg">{item.price}</Text>
                    <Text className="text-sm mb-0.5" style={{ color: colors.textSecondary }}>/Day</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    const renderNearbyItem = ({ item }: { item: Hotel }) => (
        <TouchableOpacity
            onPress={() => router.push(`/hotel/${item.id}`)}
            className="flex-row rounded-xl shadow-sm p-3 mb-4 items-center"
            style={{ backgroundColor: colors.card }}
        >
            <Image
                source={{ uri: item.image }}
                className="w-24 h-24 rounded-lg"
                resizeMode="cover"
            />
            <View className="flex-1 ml-4 space-y-2">
                <View className="flex-row justify-between">
                    <Text className="text-lg font-bold flex-1 mr-2" style={{ color: colors.text }}>{item.name}</Text>
                    <View className="flex-row items-center space-x-1">
                        <Ionicons name="star" size={14} color="#fbbf24" />
                        <Text className="font-bold text-xs" style={{ color: colors.text }}>{item.rating}</Text>
                    </View>
                </View>
                <Text className="text-sm" style={{ color: colors.textSecondary }}>{item.location}</Text>
                <View className="flex-row items-end space-x-1">
                    <Text className="text-primary font-bold text-base">{item.price}</Text>
                    <Text className="text-xs mb-0.5" style={{ color: colors.textSecondary }}>/night</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView className="flex-1" style={{ backgroundColor: colors.bg }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
            >
                {/* Header */}
                <View className="px-6 pt-4 pb-4 flex-row justify-between items-center">
                    <View>
                        <Text className="text-base" style={{ color: colors.textSecondary }}>Current Location</Text>
                        <View className="flex-row items-center space-x-1 mt-1">
                            <Ionicons name="location" size={20} color="#F1510C" />
                            <Text className="font-bold text-lg" style={{ color: colors.text }}>
                                New York, USA
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        className="p-2 rounded-full shadow-sm"
                        style={{
                            backgroundColor: colors.card,
                            borderWidth: 1,
                            borderColor: colors.border,
                        }}
                    >
                        <Ionicons name="notifications-outline" size={24} color={colors.text} />
                    </TouchableOpacity>
                </View>

                {/* Search Bar */}
                <View className="px-6 mb-6">
                    <View
                        className="flex-row items-center rounded-xl px-4 py-3 shadow-sm"
                        style={{
                            backgroundColor: colors.inputBg,
                            borderWidth: 1,
                            borderColor: colors.border,
                        }}
                    >
                        <Ionicons name="search" size={20} color="#9CA3AF" />
                        <TextInput
                            placeholder="Search hotel..."
                            className="flex-1 ml-3 text-base"
                            style={{ color: colors.text }}
                            placeholderTextColor="#9CA3AF"
                        />
                        <TouchableOpacity className="bg-secondary p-2 rounded-lg ml-2">
                            <Ionicons name="options-outline" size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Categories */}
                <View className="pl-6 mb-2">
                    <FlatList
                        data={CATEGORIES}
                        renderItem={renderCategoryItem}
                        keyExtractor={(item) => item}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>

                {/* Popular Hotels */}
                <View className="mb-2">
                    <View className="flex-row justify-between items-center px-6 mb-3">
                        <Text className="text-xl font-expressa font-bold" style={{ color: colors.text }}>Popular Hotels</Text>
                        <TouchableOpacity onPress={() => router.push("/(tabs)/explore")}>
                            <Text className="text-secondary font-semibold">See all</Text>
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={HOTELS}
                        renderItem={renderHotelCard}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingLeft: 24, paddingRight: 8 }}
                    />
                </View>

                {/* Nearby Hotels */}
                <View className="px-6">
                    <View
                        className="flex-row justify-between items-center mb-2 px-8 py-5 rounded-md"
                        style={{ backgroundColor: colors.card }}
                    >
                        <Text className="text-xl font-expressa font-bold" style={{ color: colors.text }}>Nearby Hotels</Text>
                        <TouchableOpacity onPress={() => router.push("/(tabs)/explore")}>
                            <Text className="text-secondary font-semibold">See all</Text>
                        </TouchableOpacity>
                    </View>
                    {NEARBY_HOTELS.map((item) => (
                        <View key={item.id}>{renderNearbyItem({ item })}</View>
                    ))}
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}
