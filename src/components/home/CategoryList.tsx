import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

interface CategoryListProps {
    categories: string[];
    activeCategory: string;
    setActiveCategory: (category: string) => void;
    isDarkMode: boolean;
    colors: any;
}

const CategoryList: React.FC<CategoryListProps> = ({
    categories,
    activeCategory,
    setActiveCategory,
    isDarkMode,
    colors
}) => {
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

    return (
        <View className="pl-6 mb-2">
            <FlatList
                data={categories}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

export default CategoryList;
