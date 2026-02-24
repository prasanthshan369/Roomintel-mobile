import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    NativeScrollEvent,
    NativeSyntheticEvent,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useTheme } from "../../constants/ThemeContext";
import { siteService } from "../../src/api/siteServices";
import { getImageUrl } from "../../src/utils/imageHelper";

// Components
import AboutTab from "../../src/components/hotel/AboutTab";
import GalleryTab from "../../src/components/hotel/GalleryTab";
import HotelBanner from "../../src/components/hotel/HotelBanner";
import ReviewTab from "../../src/components/hotel/ReviewTab";

const { width } = Dimensions.get("window");
const TABS = ["About", "Gallery", "Review"];
const PLACEHOLDER = "https://via.placeholder.com/800x500?text=No+Image";

const REVIEWS = [
    {
        id: "1",
        name: "Sarah Johnson",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        rating: 5,
        date: "2 days ago",
        comment: "Absolutely stunning! The views from the room were breathtaking. Staff was incredibly attentive.",
    },
    {
        id: "2",
        name: "Michael Chen",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        rating: 4,
        date: "1 week ago",
        comment: "Great location and beautiful property. Would definitely recommend for a romantic getaway.",
    },
];

interface Room {
    _id: string;
    name: string;
    slug?: string;
    location?: string;
    price: number;
    rating?: number;
    description?: string;
    category?: any;
    amenities?: string[];
    maxGuests?: number;
    status?: string;
    images?: string[];
    previewImage?: string;
    image?: string;
    photo?: string;
    thumbnail?: string;
}

export default function HotelDetailsScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { isDarkMode, colors } = useTheme();
    const [activeTab, setActiveTab] = useState("About");
    const [activeSlide, setActiveSlide] = useState(0);
    const [room, setRoom] = useState<Room | null>(null);
    const [loading, setLoading] = useState(true);
    const flatListRef = useRef<FlatList<any>>(null);

    useEffect(() => {
        if (id) fetchRoomDetails();
    }, [id]);

    const fetchRoomDetails = async () => {
        try {
            setLoading(true);
            const response = await siteService.getRoomBySlug(id as string);
            const data = response?.data || response?.room || response;
            setRoom(data);
        } catch (error) {
            console.log("Error fetching room details:", error);
        } finally {
            setLoading(false);
        }
    };

    const buildImageList = useCallback((roomData: Room): string[] => {
        const list: string[] = [];
        const hero = roomData.previewImage || roomData.image || roomData.photo || roomData.thumbnail;
        if (hero) list.push(getImageUrl(hero));

        if (Array.isArray(roomData.images)) {
            roomData.images.forEach((img) => {
                const url = getImageUrl(img);
                if (url !== PLACEHOLDER && !list.includes(url)) list.push(url);
            });
        }
        if (list.length === 0) list.push(PLACEHOLDER);
        return list;
    }, []);

    const carouselImages = room ? buildImageList(room) : [PLACEHOLDER];

    const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const slideSize = event.nativeEvent.layoutMeasurement.width;
        const index = event.nativeEvent.contentOffset.x / slideSize;
        const roundIndex = Math.round(index);
        setActiveSlide(roundIndex);
    };

    const scrollToImage = (index: number) => {
        flatListRef.current?.scrollToIndex({ index, animated: true });
    };

    const renderStars = (rating: number = 4.5) => {
        return [...Array(5)].map((_, i) => (
            <Ionicons
                key={i}
                name={i + 1 <= rating ? "star" : i + 0.5 <= rating ? "star-half" : "star-outline"}
                size={14}
                color="#fbbf24"
            />
        ));
    };

    if (loading) {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.bg }}>
                <StatusBar style={isDarkMode ? "light" : "dark"} />
                <ActivityIndicator size="large" color="#F1510C" />
                <Text style={{ color: colors.textSecondary, marginTop: 12 }}>Loading details...</Text>
            </View>
        );
    }

    const amenities = room?.amenities && room.amenities.length > 0
        ? room.amenities.map((a: any, i: number) => ({
            name: typeof a === 'string' ? a : (a?.name || a?.title || a?.label || String(i + 1)),
            icon: "checkmark-circle" as const,
            key: i,
        }))
        : [
            { name: "Wi-Fi", icon: "wifi" as const, key: 0 },
            { name: "AC", icon: "snow" as const, key: 1 },
            { name: "Breakfast", icon: "cafe" as const, key: 2 },
        ];

    return (
        <View className="flex-1" style={{ backgroundColor: colors.bg }}>
            <StatusBar style={isDarkMode ? "light" : "dark"} />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>

                {/* Banner Carousel Component */}
                <HotelBanner
                    carouselImages={carouselImages}
                    flatListRef={flatListRef}
                    activeSlide={activeSlide}
                    onScroll={onScroll}
                    scrollToImage={scrollToImage}
                    isDarkMode={isDarkMode}
                />

                <View className="px-6 mt-6">
                    <View className="flex-row justify-between items-start mb-2">
                        <View className="flex-1 mr-4">
                            <Text className="text-2xl font-bold mb-2" style={{ color: colors.text }}>
                                {room?.name || "Luxury Room"}
                            </Text>
                            <View className="flex-row items-center">
                                <Ionicons name="location-sharp" size={16} color="#F1510C" />
                                <Text className="text-sm ml-1" style={{ color: colors.textSecondary }}>
                                    {room?.location || "Manhattan, New York"}
                                </Text>
                            </View>
                        </View>
                        <View className="items-end">
                            <View className="flex-row mb-1">
                                {renderStars(room?.rating || 4.5)}
                            </View>
                            <Text className="text-xs font-medium" style={{ color: colors.textSecondary }}>
                                (124 reviews)
                            </Text>
                        </View>
                    </View>

                    {/* Tabs */}
                    <View className="flex-row border-b mb-6 mt-4" style={{ borderColor: colors.border }}>
                        {TABS.map((tab) => (
                            <TouchableOpacity
                                key={tab}
                                onPress={() => setActiveTab(tab)}
                                className="mr-8 pb-3 relative"
                            >
                                <Text
                                    className={`text-sm font-bold ${activeTab === tab ? "" : ""}`}
                                    style={{ color: activeTab === tab ? "#F1510C" : colors.textSecondary }}
                                >
                                    {tab}
                                </Text>
                                {activeTab === tab && (
                                    <View
                                        className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                                        style={{ backgroundColor: "#F1510C" }}
                                    />
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Tab Content */}
                    {activeTab === "About" && (
                        <AboutTab
                            amenities={amenities as any}
                            description={room?.description || ""}
                            maxGuests={room?.maxGuests}
                            colors={colors}
                        />
                    )}

                    {activeTab === "Gallery" && (
                        <GalleryTab
                            carouselImages={carouselImages}
                            placeholder={PLACEHOLDER}
                            colors={colors}
                        />
                    )}

                    {activeTab === "Review" && (
                        <ReviewTab
                            reviews={REVIEWS}
                            colors={colors}
                        />
                    )}
                </View>
            </ScrollView>

            {/* Bottom Bar */}
            <View
                className="absolute bottom-0 left-0 right-0 px-6 py-4 flex-row justify-between items-center border-t shadow-lg"
                style={{ backgroundColor: colors.card, borderColor: colors.border }}
            >
                <View>
                    <Text className="text-xs font-medium" style={{ color: colors.textSecondary }}>Price</Text>
                    <View className="flex-row items-center">
                        <Text className="text-2xl font-bold" style={{ color: "#F1510C" }}>
                            ${room?.price || 199}
                        </Text>
                        <Text className="text-xs ml-1" style={{ color: colors.textSecondary }}>/night</Text>
                    </View>
                </View>
                <TouchableOpacity
                    className="bg-primary px-10 py-4 rounded-2xl shadow-md"
                    style={{ backgroundColor: "#F1510C" }}
                >
                    <Text className="text-white font-bold text-base">Book Now</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
