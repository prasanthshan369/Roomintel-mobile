import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Dimensions, FlatList, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../../constants/Colors";
import { useTheme } from "../../../constants/ThemeContext";

const { width } = Dimensions.get("window");

const EXPLORE_HOTELS = [
    {
        id: "1",
        name: "The Leela Palace",
        location: "Chennai, Tamil Nadu",
        price: "$320",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        coordinate: { latitude: 13.0524, longitude: 80.2508 },
    },
    {
        id: "2",
        name: "Heritage Madurai",
        location: "Madurai, Tamil Nadu",
        price: "$450",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        coordinate: { latitude: 9.9252, longitude: 78.1198 },
    },
    {
        id: "3",
        name: "Sterling Ooty",
        location: "Ooty, Tamil Nadu",
        price: "$210",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        coordinate: { latitude: 11.4102, longitude: 76.6950 },
    },
    {
        id: "4",
        name: "Le Meridien",
        location: "Coimbatore, Tamil Nadu",
        price: "$180",
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1455587734955-081b22074882?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        coordinate: { latitude: 11.0168, longitude: 76.9558 },
    },
    {
        id: "5",
        name: "Palais de Mahe",
        location: "Pondicherry, Tamil Nadu",
        price: "$290",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        coordinate: { latitude: 11.9416, longitude: 79.8083 },
    },
];

export default function ExploreScreen() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const { isDarkMode, colors } = useTheme();

    const renderHotelCard = ({ item }: { item: typeof EXPLORE_HOTELS[0] }) => (
        <TouchableOpacity
            onPress={() => router.push(`/hotel/${item.id}`)}
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
                source={{ uri: item.image }}
                className="w-full h-44 rounded-2xl"
                resizeMode="cover"
            />

            <View className="px-4 py-3 space-y-2">
                <View className="flex-row justify-between items-center">
                    <Text className="text-xl font-bold line-clamp-1 flex-1 mr-2" style={{ color: colors.text }}>
                        {item.name}
                    </Text>
                    <View className="flex-row items-end space-x-1 mt-1">
                        <Text className="text-secondary font-bold text-lg">{item.price}</Text>
                        <Text className="text-sm mb-0.5" style={{ color: colors.textSecondary }}>/Day</Text>
                    </View>
                </View>
                <View className="flex-row items-center space-x-1">
                    <Ionicons name="location-sharp" size={18} color="#9ca3af" />
                    <Text className="text-sm line-clamp-1" style={{ color: colors.textSecondary }}>
                        {item.location}
                    </Text>
                </View>

                <View className="flex-row items-center space-x-1 py-1">
                    <Text className="text-secondary font-bold">{item.rating}</Text>
                    <Ionicons name="star" size={16} color="#fbbf24" />
                    <Ionicons name="star" size={16} color="#fbbf24" />
                    <Ionicons name="star" size={16} color="#fbbf24" />
                    <Ionicons name="star" size={16} color="#fbbf24" />

                    <Text className="text-base ml-2 line-clamp-1" style={{ color: colors.textSecondary }}>
                        (107 reviews )
                    </Text>
                </View>
                <View className="flex-row items-center space-x-1 pt-2">
                    <Ionicons name="walk" size={24} color="#F1510C" />
                    <Text className="text-base ml-2" style={{ color: colors.textSecondary }}>
                        4.5km/50min
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View className="flex-1 relative" style={{ backgroundColor: colors.bg }}>
            <MapView
                style={{ flex: 1, width: "100%", height: "100%" }}
                initialRegion={{
                    latitude: 11.1271,
                    longitude: 78.6569,
                    latitudeDelta: 5.0,
                    longitudeDelta: 5.0,
                }}
            >
                {EXPLORE_HOTELS.map((hotel) => (
                    <Marker
                        key={hotel.id}
                        coordinate={hotel.coordinate}
                    >
                        <View className="bg-primary px-3 py-2 rounded-xl border-2 border-white shadow-md">
                            <Text className="text-white font-bold text-sm">{hotel.price}</Text>
                        </View>
                    </Marker>
                ))}
            </MapView>

            {/* Search Bar Overlay */}
            <SafeAreaView className="absolute top-4 left-0 right-0 px-6">
                <View
                    className="flex-row items-center rounded-lg px-4 py-2 shadow-xl"
                    style={{
                        backgroundColor: colors.card,
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.1,
                        shadowRadius: 10,
                        elevation: 5,
                    }}
                >
                    <Ionicons name="search" size={24} color={Colors.light.secondary} />
                    <TextInput
                        placeholder="Search for hotels..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        className="flex-1 ml-3 text-base font-medium"
                        style={{ color: colors.text }}
                        placeholderTextColor="#9CA3AF"
                    />
                </View>
            </SafeAreaView>

            {/* Bottom Carousel Overlay */}
            <View className="absolute bottom-6 left-0 right-0">
                <FlatList
                    data={EXPLORE_HOTELS}
                    renderItem={renderHotelCard}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 10 }}
                    snapToInterval={width * 0.85 + 20}
                    decelerationRate="fast"
                />
            </View>
        </View>
    );
}
