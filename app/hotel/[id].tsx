import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    Image,
    NativeScrollEvent,
    NativeSyntheticEvent,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import ImportedURL from "../../components/common/urls";
import { useAppDispatch, useAppSelector } from "../../components/redux/hooks";
import { fetchRoomById } from "../../components/redux/slices/roomSlice";
import { useTheme } from "../../constants/ThemeContext";

const { width } = Dimensions.get("window");

const TABS = ["About", "Gallery", "Review"];

const FACILITIES = [
    { name: "2 Beds", icon: "bed" as const },
    { name: "1 Bath", icon: "water" as const },
    { name: "2000 sqrt", icon: "resize" as const },
    { name: "AC", icon: "snow" as const },
    { name: "Wi fi", icon: "wifi" as const },
    { name: "Breakfast", icon: "cafe" as const },
];

const REVIEWS = [
    {
        id: "1",
        name: "Sarah Johnson",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        rating: 5,
        date: "2 days ago",
        comment: "Absolutely stunning resort! The ocean views from the room were breathtaking. Staff was incredibly attentive and the food was amazing.",
    },
    {
        id: "2",
        name: "Michael Chen",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        rating: 4,
        date: "1 week ago",
        comment: "Great location and beautiful property. The infinity pool was the highlight. Would definitely recommend for a romantic getaway.",
    },
    {
        id: "3",
        name: "Emily Davis",
        avatar: "https://randomuser.me/api/portraits/women/68.jpg",
        rating: 5,
        date: "2 weeks ago",
        comment: "Perfect stay from start to finish. The spa treatments were world-class and the private beach was pristine. Can't wait to return!",
    },
];

export default function HotelDetailsScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { currentRoom, loading, errorMessage } = useAppSelector((state) => state.rooms);
    const [activeTab, setActiveTab] = useState("About");
    const [activeSlide, setActiveSlide] = useState(0);
    const flatListRef = useRef<FlatList>(null);
    const { isDarkMode, colors } = useTheme();

    // Fetch room details on mount
    useEffect(() => {
        const loadRoomDetails = async () => {
            if (!id) return;
            try {
                const token = await AsyncStorage.getItem('token');
                if (token) {
                    dispatch(fetchRoomById({ id: id as string, token }));
                }
            } catch (error) {
                console.error('Error loading room details:', error);
            }
        };
        loadRoomDetails();
    }, [id, dispatch]);

    // Prepare image URLs
    const getImageUrl = (value: string) => {
        if (!value || value.trim() === '') {
            return 'https://via.placeholder.com/400?text=No+Image';
        }
        const src = value.startsWith('http') ? value : `${ImportedURL.FILEURL}${value}`;
        return src;
    };

    const carouselImages = currentRoom?.images && Array.isArray(currentRoom.images)
        ? currentRoom.images.map(getImageUrl)
        : [getImageUrl(currentRoom?.previewImage || currentRoom?.image || '')];

    const hotel = {
        name: currentRoom?.name || currentRoom?.title || 'Hotel Name',
        location: currentRoom?.location || currentRoom?.address || 'Location not available',
        price: `$${currentRoom?.price || currentRoom?.pricePerDay || '0'}`,
        rating: currentRoom?.rating || 4.5,
        description:
            currentRoom?.description || "Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.",
    };

    const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
        if (slideIndex !== activeSlide) {
            setActiveSlide(slideIndex);
        }
    };

    const scrollToImage = (index: number) => {
        flatListRef.current?.scrollToIndex({ index, animated: true });
        setActiveSlide(index);
    };

    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <Ionicons
                    key={i}
                    name={i <= rating ? "star" : i - 0.5 <= rating ? "star-half" : "star-outline"}
                    size={14}
                    color="#fbbf24"
                />
            );
        }
        return stars;
    };

    const renderCarouselItem = ({ item }: { item: string }) => (
        <Image
            source={{ uri: item }}
            style={{ width: width, height: 350 }}
            resizeMode="cover"
        />
    );

    return (
        <View className="flex-1" style={{ backgroundColor: colors.bg }}>
            <StatusBar style={isDarkMode ? "light" : "dark"} />
            {loading ? (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#F1510C" />
                </View>
            ) : (
                <>
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }} className="flex-1">
                        {/* Image Carousel with Thumbnail Strip */}
                        <View className="relative">
                            <FlatList
                                ref={flatListRef}
                                data={carouselImages}
                                renderItem={renderCarouselItem}
                                keyExtractor={(_, index) => index.toString()}
                                horizontal
                                pagingEnabled
                                showsHorizontalScrollIndicator={false}
                                onScroll={onScroll}
                                scrollEventThrottle={16}
                                bounces={false}
                                style={{ height: 350 }}
                            />

                            {/* Gradient overlay for top icons */}
                            <LinearGradient
                                colors={["rgba(0,0,0,0.45)", "transparent"]}
                                className="absolute top-0 left-0 right-0 h-28"
                                pointerEvents="none"
                            />

                            {/* Back Button */}
                            <TouchableOpacity
                                onPress={() => router.back()}
                                className="absolute top-12 left-6 p-2.5 rounded-full"
                                style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
                            >
                                <Ionicons name="chevron-back" size={22} color="white" />
                            </TouchableOpacity>

                            {/* Top Right Icons */}
                            <View className="absolute top-12 right-6 flex-row space-x-3">
                                <TouchableOpacity
                                    className="p-2.5 rounded-full"
                                    style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
                                >
                                    <Ionicons name="share-outline" size={22} color="white" />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    className="p-2.5 rounded-full ml-3"
                                    style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
                                >
                                    <Ionicons name="heart-outline" size={22} color="white" />
                                </TouchableOpacity>
                            </View>

                            {/* Thumbnail Strip at Bottom of Image */}
                            <View
                                className="absolute bottom-3 mx-10 rounded-lg left-0 right-0 flex-row justify-center items-center"
                                style={{
                                    gap: 6,
                                    backgroundColor: isDarkMode ? "#1f2937" : "rgba(255, 255, 255, 0.5)",
                                    paddingVertical: 5,
                                    paddingHorizontal: 5,
                                    shadowColor: "#F1510C",
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.3,
                                    shadowRadius: 8,
                                    elevation: 5,
                                }}
                            >
                                {carouselImages.map((img, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => scrollToImage(index)}
                                        style={{
                                            borderWidth: activeSlide === index ? 2 : 0,
                                            borderColor: activeSlide === index ? "transparent" : "transparent",
                                            borderRadius: 8,
                                            overflow: "hidden",
                                        }}
                                    >
                                        <Image
                                            source={{ uri: img }}
                                            style={{
                                                width: activeSlide === index ? 50 : 46,
                                                height: activeSlide === index ? 50 : 46,
                                                borderRadius: 6,
                                            }}
                                            resizeMode="cover"
                                        />
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        {/* Content Container */}
                        <View className="px-6 pt-5 pb-4" style={{ backgroundColor: colors.card }}>
                            {/* 20% Off + Rating Row */}
                            <View className="flex-row justify-between items-center mb-3">
                                <Text className="text-secondary font-semibold text-base">20% Off</Text>
                                <View className="flex-row items-center space-x-1">
                                    <Ionicons name="star" size={16} color="#fbbf24" />
                                    <Text className="font-bold text-sm" style={{ color: colors.text }}>{hotel.rating}</Text>
                                    <Text className="text-sm" style={{ color: colors.textSecondary }}>(107 reviews)</Text>
                                </View>
                            </View>

                            {/* Hotel Name & Location */}
                            <View className="flex-row justify-between items-start mb-1">
                                <View className="flex-1 pr-4">
                                    <Text className="text-2xl font-bold" style={{ color: colors.text }}>{hotel.name}</Text>
                                </View>
                                <TouchableOpacity
                                    className="bg-secondary w-10 h-10 rounded-full items-center justify-center"
                                >
                                    <Ionicons name="send" size={18} color="white" />
                                </TouchableOpacity>
                            </View>
                            <View className="flex-row items-center space-x-1 mb-5">
                                <Ionicons name="location-sharp" size={16} color="#9ca3af" />
                                <Text className="text-sm" style={{ color: colors.textSecondary }}>{hotel.location}</Text>
                            </View>

                            {/* Tab Navigation */}
                            <View className="flex-row mb-6" style={{ borderBottomWidth: 1, borderBottomColor: colors.border }}>
                                {TABS.map((tab) => (
                                    <TouchableOpacity
                                        key={tab}
                                        onPress={() => setActiveTab(tab)}
                                        className="mr-8 pb-3"
                                        style={{
                                            borderBottomWidth: activeTab === tab ? 2 : 0,
                                            borderBottomColor: activeTab === tab ? colors.text : "transparent",
                                        }}
                                    >
                                        <Text
                                            className="text-base font-semibold"
                                            style={{
                                                color: activeTab === tab ? colors.text : colors.textSecondary,
                                            }}
                                        >
                                            {tab}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            {/* Tab Content */}
                            {activeTab === "About" && (
                                <View>
                                    {/* Facilities Grid */}
                                    <View className="flex-row flex-wrap mb-6">
                                        {FACILITIES.map((facility, index) => (
                                            <View
                                                key={index}
                                                className="flex-row items-center mb-4"
                                                style={{ width: "33.33%" }}
                                            >
                                                <Ionicons name={facility.icon} size={20} color="#F1510C" />
                                                <Text className="text-sm font-medium ml-2" style={{ color: colors.text }}>
                                                    {facility.name}
                                                </Text>
                                            </View>
                                        ))}
                                    </View>

                                    {/* Description */}
                                    <Text className="text-lg font-bold mb-3" style={{ color: colors.text }}>Description</Text>
                                    <Text className="leading-6 text-sm" style={{ color: colors.textSecondary }}>
                                        {hotel.description}
                                    </Text>
                                </View>
                            )}

                            {activeTab === "Gallery" && (
                                <View>
                                    <Text className="text-lg font-bold mb-4" style={{ color: colors.text }}>Photos</Text>
                                    <View className="flex-row flex-wrap justify-between">
                                        {carouselImages.map((img, index) => (
                                            <View key={index} className="mb-3" style={{ width: (width - 60) / 2 }}>
                                                <Image
                                                    source={{ uri: img }}
                                                    className="rounded-2xl"
                                                    style={{ width: "100%", height: 150 }}
                                                    resizeMode="cover"
                                                />
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            )}

                            {activeTab === "Review" && (
                                <View>
                                    <View className="flex-row justify-between items-center mb-5">
                                        <Text className="text-lg font-bold" style={{ color: colors.text }}>Reviews</Text>
                                        <View className="flex-row items-center space-x-1">
                                            <Ionicons name="star" size={18} color="#fbbf24" />
                                            <Text className="font-bold text-lg" style={{ color: colors.text }}>{hotel.rating}</Text>
                                            <Text className="text-sm" style={{ color: colors.textSecondary }}>(2.5k)</Text>
                                        </View>
                                    </View>

                                    {REVIEWS.map((review) => (
                                        <View
                                            key={review.id}
                                            className="mb-5 pb-5"
                                            style={{ borderBottomWidth: 1, borderBottomColor: colors.border }}
                                        >
                                            <View className="flex-row items-center mb-3">
                                                <Image
                                                    source={{ uri: review.avatar }}
                                                    className="w-10 h-10 rounded-full"
                                                />
                                                <View className="flex-1 ml-3">
                                                    <Text className="font-bold text-sm" style={{ color: colors.text }}>{review.name}</Text>
                                                    <Text className="text-xs" style={{ color: colors.textSecondary }}>{review.date}</Text>
                                                </View>
                                                <View className="flex-row">
                                                    {renderStars(review.rating)}
                                                </View>
                                            </View>
                                            <Text className="text-sm leading-5" style={{ color: colors.textSecondary }}>{review.comment}</Text>
                                        </View>
                                    ))}
                                </View>
                            )}
                        </View>

                    </ScrollView>
                    {/* Footer: Total Price + Book Now */}
                    <View
                        className="px-6 py-4 shadow-md flex-row justify-between items-center"
                        style={{
                            backgroundColor: colors.card,
                            borderTopWidth: 1,
                            borderTopColor: colors.border,
                        }}
                    >
                        <View>
                            <Text className="text-xs" style={{ color: colors.textSecondary }}>Total price</Text>
                            <View className="flex-row items-end">
                                <Text className="text-secondary font-bold text-xl">{hotel.price}</Text>
                                <Text className="text-xs mb-0.5 ml-1" style={{ color: colors.textSecondary }}>/Day</Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            onPress={() => router.push({ pathname: "/booking/dates", params: { id } })}
                            className="bg-secondary px-10 py-4 rounded-xl items-center shadow-lg shadow-orange-500/30"
                        >
                            <Text className="text-white font-bold text-base">Book Now</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </View>
    );
}
