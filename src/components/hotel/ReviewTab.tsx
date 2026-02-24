import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, View } from "react-native";

interface Review {
    id: string;
    name: string;
    avatar: string;
    rating: number;
    date: string;
    comment: string;
}

interface ReviewTabProps {
    reviews: Review[];
    colors: any;
}

const ReviewTab: React.FC<ReviewTabProps> = ({ reviews, colors }) => {
    return (
        <View>
            <View className="flex-row justify-between items-center mb-6">
                <Text className="text-lg font-bold" style={{ color: colors.text }}>User Reviews</Text>
                <View className="flex-row items-center">
                    <Ionicons name="star" size={18} color="#fbbf24" />
                    <Text className="ml-1 font-bold" style={{ color: colors.text }}>4.8 (124)</Text>
                </View>
            </View>

            {reviews.map((r) => (
                <View
                    key={r.id}
                    className="mb-5 p-4 rounded-2xl"
                    style={{ backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border }}
                >
                    <View className="flex-row justify-between items-center mb-3">
                        <View className="flex-row items-center">
                            <Image source={{ uri: r.avatar }} className="w-10 h-10 rounded-full" />
                            <View className="ml-3">
                                <Text className="font-bold text-sm" style={{ color: colors.text }}>{r.name}</Text>
                                <Text className="text-xs" style={{ color: colors.textSecondary }}>{r.date}</Text>
                            </View>
                        </View>
                        <View className="flex-row">
                            {[...Array(5)].map((_, i) => (
                                <Ionicons key={i} name="star" size={12} color={i < r.rating ? "#fbbf24" : colors.border} />
                            ))}
                        </View>
                    </View>
                    <Text className="text-sm leading-5" style={{ color: colors.textSecondary }}>{r.comment}</Text>
                </View>
            ))}
        </View>
    );
};

export default ReviewTab;
