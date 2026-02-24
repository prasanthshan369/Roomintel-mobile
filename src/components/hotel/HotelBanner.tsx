import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { Dimensions, FlatList, Image, NativeScrollEvent, NativeSyntheticEvent, TouchableOpacity, View } from "react-native";

const { width } = Dimensions.get("window");

interface HotelBannerProps {
    carouselImages: string[];
    flatListRef: React.RefObject<any>;
    activeSlide: number;
    onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
    scrollToImage: (index: number) => void;
    isDarkMode: boolean;
}

const HotelBanner: React.FC<HotelBannerProps> = ({
    carouselImages,
    flatListRef,
    activeSlide,
    onScroll,
    scrollToImage,
    isDarkMode
}) => {
    const router = useRouter();

    return (
        <View className="relative">
            <FlatList
                ref={flatListRef}
                data={carouselImages}
                renderItem={({ item }) => (
                    <Image source={{ uri: item }} style={{ width, height: 350 }} resizeMode="cover" />
                )}
                keyExtractor={(_, index) => index.toString()}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={onScroll}
                scrollEventThrottle={16}
                bounces={false}
                style={{ height: 350 }}
            />

            {/* Gradient Overlay */}
            <LinearGradient
                colors={["rgba(0,0,0,0.45)", "transparent"]}
                className="absolute top-0 left-0 right-0 h-28"
                pointerEvents="none"
            />

            {/* Back Button */}
            <TouchableOpacity
                onPress={() => router.canGoBack() ? router.back() : router.replace("/(tabs)")}
                className="absolute top-12 left-6 p-2.5 rounded-full"
                style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
            >
                <Ionicons name="chevron-back" size={22} color="white" />
            </TouchableOpacity>

            {/* Share & Wishlist */}
            <View className="absolute top-12 right-6 flex-row space-x-3">
                <TouchableOpacity className="p-2.5 rounded-full" style={{ backgroundColor: "rgba(0,0,0,0.3)" }}>
                    <Ionicons name="share-outline" size={22} color="white" />
                </TouchableOpacity>
                <TouchableOpacity className="p-2.5 rounded-full ml-3" style={{ backgroundColor: "rgba(0,0,0,0.3)" }}>
                    <Ionicons name="heart-outline" size={22} color="white" />
                </TouchableOpacity>
            </View>

            {/* Thumbnail Strip */}
            {carouselImages.length > 1 && (
                <View
                    className="absolute bottom-3 mx-5 rounded-lg left-0 right-0 flex-row justify-center items-center"
                    style={{
                        gap: 6,
                        backgroundColor: isDarkMode ? "rgba(0, 0, 0, 0.5)" : "rgba(255, 255, 255, 0.5)",
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
                                borderColor: "#F1510C",
                                borderRadius: 8,
                                overflow: "hidden",
                            }}
                        >
                            <Image
                                source={{ uri: img }}
                                style={{
                                    width: activeSlide === index ? 50 : 44,
                                    height: activeSlide === index ? 50 : 44,
                                    borderRadius: 6,
                                }}
                                resizeMode="cover"
                            />
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
};

export default HotelBanner;
