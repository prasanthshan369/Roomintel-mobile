import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

interface Amenity {
    name: string;
    icon: "checkmark-circle" | "wifi" | "snow" | "cafe" | "bed" | "water" | "resize" | "people-outline";
    key: number;
}

interface AboutTabProps {
    amenities: Amenity[];
    description: string;
    maxGuests?: number;
    colors: any;
}

const AboutTab: React.FC<AboutTabProps> = ({ amenities, description, maxGuests, colors }) => {
    return (
        <View>
            <Text className="text-lg font-bold mb-3" style={{ color: colors.text }}>Amenities</Text>
            <View className="flex-row flex-wrap mb-6">
                {amenities.map((a) => (
                    <View key={a.key} className="flex-row items-center mb-4" style={{ width: "50%" }}>
                        <Ionicons name={a.icon} size={18} color="#F1510C" />
                        <Text className="text-sm font-medium ml-2" style={{ color: colors.text }}>
                            {a.name}
                        </Text>
                    </View>
                ))}
            </View>

            <Text className="text-lg font-bold mb-3" style={{ color: colors.text }}>Description</Text>
            <Text className="leading-6 text-sm" style={{ color: colors.textSecondary }}>
                {description || "No description available for this room."}
            </Text>

            {maxGuests ? (
                <View className="flex-row items-center mt-4 space-x-2">
                    <Ionicons name="people-outline" size={20} color="#F1510C" />
                    <Text style={{ color: colors.textSecondary }}>
                        Max {maxGuests} guests
                    </Text>
                </View>
            ) : null}
        </View>
    );
};

export default AboutTab;
