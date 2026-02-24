import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ExploreHeaderProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    colors: any;
}

const ExploreHeader: React.FC<ExploreHeaderProps> = ({ searchQuery, setSearchQuery, colors }) => {
    return (
        <SafeAreaView className="absolute top-4 left-0 right-0 px-6 z-10">
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
                <Ionicons name="search" size={24} color="#F1510C" />
                <TextInput
                    placeholder="Search rooms, locations..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    className="flex-1 ml-3 text-base font-medium"
                    style={{ color: colors.text }}
                    placeholderTextColor="#9CA3AF"
                />
                {searchQuery.length > 0 && (
                    <TouchableOpacity onPress={() => setSearchQuery("")}>
                        <Ionicons name="close-circle" size={20} color="#9CA3AF" />
                    </TouchableOpacity>
                )}
            </View>
        </SafeAreaView>
    );
};

export default ExploreHeader;
