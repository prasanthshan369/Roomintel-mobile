import ImportedURL from "@/components/common/urls";
import { useAppDispatch, useAppSelector } from "@/components/redux/hooks";
import { fetchRooms } from "@/components/redux/slices/roomSlice";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../constants/ThemeContext";


const CATEGORIES = ["All", "Recommended", "Popular", "Trending", "Luxury"];



export default function HomeScreen() {
    const router = useRouter();
    const [activeCategory, setActiveCategory] = useState("Recommended");
    const { isDarkMode, colors } = useTheme();

    const dispatch = useAppDispatch();
    const { rooms, loading, errorMessage } = useAppSelector((state) => state.rooms);

    // Fetch token from AsyncStorage and then fetch rooms
    useEffect(() => {
        const loadTokenAndFetchRooms = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                console.log('Token from AsyncStorage:', token);
                
                if (token) {
                    console.log('Fetching rooms with token...');
                    dispatch(fetchRooms(token));
                } else {
                    console.log('No token available in AsyncStorage');
                }
            } catch (error) {
                console.error('Error retrieving token from AsyncStorage:', error);
            }
        };

        loadTokenAndFetchRooms();
    }, [dispatch]);

    useEffect(() => {
        if (errorMessage) {
            console.error('Error message:', errorMessage);
            Alert.alert('Error', errorMessage);
        }
    }, [errorMessage]);



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

    const getImageUrl = (value: string) => {
        if (!value || value.trim() === '') {
            return 'https://via.placeholder.com/300?text=No+Image';
        }
        // Check if full URL (starts with 'http')
        const src = value.startsWith('http') ? value : `${ImportedURL.FILEURL}${value}`;
        return src;
    };

    const renderHotelCard = ({ item }: { item: any }) => {
        const displayName = item?.name || item?.title || 'Unnamed Room';
        const displayLocation = item?.location || item?.address || 'No location';
        const displayPrice = item?.price || item?.pricePerDay || '$0';
        const displayRating = item?.rating || 4.5;
        const rawImage = item?.previewImage || item?.image || item?.thumbnail || item?.imageUrl || item?.photo;
        const displayImage = getImageUrl(rawImage);

        return (
            <TouchableOpacity
                onPress={() => {
                    console.log(item)
                    router.push(`/hotel/${item._id || item.id}`)
                }}
                className="mr-6 rounded-2xl shadow-sm w-72 mb-4"
                style={{ backgroundColor: colors.card }}
            >
                <Image
                    source={{ uri: displayImage }}
                    style={{ 
                        width: '100%', 
                        height: 200,
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                        backgroundColor: colors.card,
                    }}
                    resizeMode="cover"
                />
                <View className="px-4 py-4 space-y-2">
                    <View className="flex-row justify-between items-center">
                        <Text className="text-base font-normal text-secondary line-clamp-1 flex-1 mr-2">
                            10% Off
                        </Text>
                        <View className="flex-row items-center space-x-1">
                            <Ionicons name="star" size={16} color="#fbbf24" />
                            <Text className="font-bold" style={{ color: colors.text }}>{displayRating}</Text>
                        </View>
                    </View>
                    <Text className="text-xl font-bold line-clamp-1 flex-1 mr-2" style={{ color: colors.text }}>
                        {displayName}
                    </Text>
                    <View className="flex-row items-center space-x-1">
                        <Ionicons name="location-sharp" size={16} color="#9ca3af" />
                        <Text className="text-sm line-clamp-1" style={{ color: colors.textSecondary }}>
                            {displayLocation}
                        </Text>
                    </View>
                    <View className="flex-row items-end space-x-1 mt-1">
                        <Text className="text-secondary font-bold text-lg">{displayPrice}</Text>
                        <Text className="text-sm mb-0.5" style={{ color: colors.textSecondary }}>/Day</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    const renderNearbyItem = ({ item }: { item: any }) => {
        const displayName = item?.name || item?.title || 'Unnamed Room';
        const displayLocation = item?.location || item?.address || 'No location';
        const displayPrice = item?.price || item?.pricePerDay || '$0';
        const displayRating = item?.rating || 4.5;
        const rawImage = item?.previewImage || item?.image || item?.thumbnail || item?.imageUrl || item?.photo;
        const displayImage = getImageUrl(rawImage);

        return (
            <TouchableOpacity
                onPress={() => router.push(`/hotel/${item._id || item.id}`)}
                className="flex-row rounded-xl shadow-sm p-3 mb-4 items-center"
                style={{ backgroundColor: colors.card }}
            >
                <Image
                    source={{ uri: displayImage }}
                    style={{ 
                        width: 100, 
                        height: 100,
                        borderRadius: 10,
                        backgroundColor: colors.card,
                    }}
                    resizeMode="cover"
                />
                <View className="flex-1 ml-4 space-y-2">
                    <View className="flex-row justify-between">
                        <Text className="text-lg font-bold flex-1 mr-2" style={{ color: colors.text }}>{displayName}</Text>
                        <View className="flex-row items-center space-x-1">
                            <Ionicons name="star" size={14} color="#fbbf24" />
                            <Text className="font-bold text-xs" style={{ color: colors.text }}>{displayRating}</Text>
                        </View>
                    </View>
                    <Text className="text-sm" style={{ color: colors.textSecondary }}>{displayLocation}</Text>
                    <View className="flex-row items-end space-x-1">
                        <Text className="text-primary font-bold text-base">{displayPrice}</Text>
                        <Text className="text-xs mb-0.5" style={{ color: colors.textSecondary }}>/day</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

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

                    {loading ? (
                        <View className="py-12 flex justify-center items-center">
                            <ActivityIndicator size="large" color="#F1510C" />
                        </View>
                    ) : rooms.length > 0 ? (
                        <FlatList
                            data={rooms}
                            renderItem={renderHotelCard}
                            keyExtractor={(item, index) => (item._id || item.id || index.toString())}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingLeft: 24, paddingRight: 8 }}
                        />
                    ) : (
                        <View className="py-12 flex justify-center items-center">
                            <Text style={{ color: colors.textSecondary }}>No rooms available</Text>
                        </View>
                    )}
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
                    {Array.isArray(rooms) && rooms.length > 0 ? (
                        rooms.map((item, index) => (
                            <View key={item?._id || item?.id || index.toString()}>
                                {renderNearbyItem({ item })}
                            </View>
                        ))
                    ) : (
                        <Text style={{ color: colors.textSecondary }}>No nearby hotels</Text>
                    )}
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}
