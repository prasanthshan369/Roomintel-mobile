import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { Dimensions, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { IMAGE_BASE_URL } from "../../utils/urls";

const { width } = Dimensions.get("window");

interface BannerItem {
    _id: string;
    image?: string;
    title?: string;
    name?: string;
    slug?: string;
}

interface BannerCarouselProps {
    bannerData: BannerItem[];
    bannerIndex: number;
    bannerRef: React.RefObject<any>;
    colors: any;
}

const BannerCarousel: React.FC<BannerCarouselProps> = ({ bannerData, bannerIndex, bannerRef, colors }) => {
    const router = useRouter();

    return (
        <View className="mb-5">
            <FlatList
                ref={bannerRef}
                data={bannerData}
                keyExtractor={(item) => item._id}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                scrollEnabled={false}
                renderItem={({ item }) => {
                    const uri = item.image
                        ? (item.image.startsWith('http') ? item.image : `${IMAGE_BASE_URL}${item.image}`)
                        : 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80';
                    return (
                        <TouchableOpacity
                            activeOpacity={0.95}
                            onPress={() => item.slug && router.push(`/hotel/${item.slug}`)}
                            style={{ width, paddingHorizontal: 20 }}
                        >
                            <View
                                style={{
                                    borderRadius: 20,
                                    overflow: 'hidden',
                                    height: 200,
                                    shadowColor: '#F1510C',
                                    shadowOffset: { width: 0, height: 3 },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 12,
                                    elevation: 10,
                                }}
                            >
                                <Image
                                    source={{ uri }}
                                    style={{ width: '100%', height: 200 }}
                                    resizeMode="cover"
                                />
                                <LinearGradient
                                    colors={["transparent", "rgba(0,0,0,0.75)"]}
                                    style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 120 }}
                                />
                                {/* Badge */}
                                <View
                                    style={{
                                        position: 'absolute', top: 14, left: 14,
                                        backgroundColor: '#F1510C',
                                        paddingHorizontal: 10, paddingVertical: 4,
                                        borderRadius: 20,
                                    }}
                                >
                                    <Text style={{ color: 'white', fontSize: 11, fontWeight: '700' }}>✦ Special Offer</Text>
                                </View>
                                {/* Bottom info */}
                                <View style={{ position: 'absolute', bottom: 14, left: 14, right: 14, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                                    <View style={{ flex: 1, marginRight: 8 }}>
                                        {item.title && (
                                            <Text
                                                style={{ color: 'white', fontWeight: '700', fontSize: 17, marginBottom: 2 }}
                                                numberOfLines={1}
                                            >
                                                {item.title}
                                            </Text>
                                        )}
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                            <Ionicons name="location-sharp" size={13} color="rgba(255,255,255,0.75)" />
                                            <Text style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12 }}>Tap to view details</Text>
                                        </View>
                                    </View>
                                    <View style={{ backgroundColor: 'white', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 }}>
                                        <Text style={{ color: '#F1510C', fontWeight: '700', fontSize: 12 }}>Book Now</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                }}
            />
            {/* Dot Indicators */}
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10, gap: 5 }}>
                {bannerData.map((_, i) => (
                    <View
                        key={i}
                        style={{
                            width: bannerIndex === i ? 20 : 6,
                            height: 6,
                            borderRadius: 3,
                            backgroundColor: bannerIndex === i ? '#F1510C' : colors.border,
                        }}
                    />
                ))}
            </View>
        </View>
    );
};

export default BannerCarousel;
