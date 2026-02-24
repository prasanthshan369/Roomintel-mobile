import React from "react";
import { Dimensions, Image, Text, View } from "react-native";

const { width } = Dimensions.get("window");

interface GalleryTabProps {
    carouselImages: string[];
    placeholder: string;
    colors: any;
}

const GalleryTab: React.FC<GalleryTabProps> = ({ carouselImages, placeholder, colors }) => {
    return (
        <View>
            <Text className="text-lg font-bold mb-4" style={{ color: colors.text }}>Photos</Text>
            {carouselImages.length === 1 && carouselImages[0] === placeholder ? (
                <Text style={{ color: colors.textSecondary }}>No photos available.</Text>
            ) : (
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
            )}
        </View>
    );
};

export default GalleryTab;
