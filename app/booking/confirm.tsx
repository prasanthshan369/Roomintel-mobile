import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../constants/Colors";

export default function ConfirmBookingScreen() {
    const router = useRouter();
    const { id, adults, children, checkIn, checkOut } = useLocalSearchParams();

    // In a real app, query hotel by ID.
    const hotel = {
        name: "Oceanview Resort",
        location: "Maldives",
        price: 320,
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        rating: 4.8,
    };

    const checkInDate = new Date(checkIn as string);
    const checkOutDate = new Date(checkOut as string);
    const days = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
    const total = hotel.price * days;
    const taxes = total * 0.1; // 10% tax
    const grandTotal = total + taxes;

    return (
        <View className="flex-1 bg-white">
            <StatusBar style="dark" />

            {/* Header */}
            <View className="px-6 pt-12 pb-4 flex-row items-center border-b border-gray-100">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="w-10 h-10 bg-gray-50 rounded-full items-center justify-center"
                >
                    <Ionicons name="arrow-back" size={24} color={Colors.light.text} />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-gray-900 ml-4">Confirm Booking</Text>
            </View>

            <ScrollView className="flex-1 px-6 pt-6">
                {/* Hotel Summary Card */}
                <View className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6 flex-row">
                    <Image
                        source={{ uri: hotel.image }}
                        className="w-24 h-24 rounded-xl"
                        resizeMode="cover"
                    />
                    <View className="ml-4 flex-1 justify-center">
                        <Text className="text-lg font-bold text-gray-900 mb-1">{hotel.name}</Text>
                        <View className="flex-row items-center space-x-1 mb-2">
                            <Ionicons name="location-sharp" size={14} color={Colors.light.secondary} />
                            <Text className="text-gray-500 text-sm">{hotel.location}</Text>
                        </View>
                        <View className="flex-row items-center space-x-1">
                            <Ionicons name="star" size={14} color="#fbbf24" />
                            <Text className="text-gray-700 text-sm font-bold">{hotel.rating}</Text>
                            <Text className="text-gray-400 text-xs">(2.5k reviews)</Text>
                        </View>
                    </View>
                </View>

                {/* Booking Details */}
                <View className="bg-gray-50 rounded-2xl p-6 mb-6">
                    <View className="flex-row justify-between mb-4">
                        <View>
                            <Text className="text-gray-500 text-sm mb-1">Check-in</Text>
                            <Text className="text-gray-900 font-bold">{checkInDate.toLocaleDateString()}</Text>
                        </View>
                        <View>
                            <Text className="text-gray-500 text-sm mb-1">Check-out</Text>
                            <Text className="text-gray-900 font-bold">{checkOutDate.toLocaleDateString()}</Text>
                        </View>
                    </View>
                    <View className="flex-row justify-between">
                        <View>
                            <Text className="text-gray-500 text-sm mb-1">Guests</Text>
                            <Text className="text-gray-900 font-bold">{adults} Adults, {children} Children</Text>
                        </View>
                        <View>
                            <Text className="text-gray-500 text-sm mb-1">Nights</Text>
                            <Text className="text-gray-900 font-bold">{days} Nights</Text>
                        </View>
                    </View>
                </View>

                {/* Price Breakdown */}
                <Text className="text-xl font-bold text-gray-900 mb-4">Payment Detail</Text>
                <View className="bg-white border border-gray-100 rounded-2xl p-6 mb-8 shadow-sm">
                    <View className="flex-row justify-between mb-3">
                        <Text className="text-gray-600">Total Price ({days} nights)</Text>
                        <Text className="text-gray-900 font-semibold">${total}</Text>
                    </View>
                    <View className="flex-row justify-between mb-3">
                        <Text className="text-gray-600">Taxes & Fees (10%)</Text>
                        <Text className="text-gray-900 font-semibold">${taxes.toFixed(2)}</Text>
                    </View>
                    <View className="h-[1px] bg-gray-100 my-3" />
                    <View className="flex-row justify-between">
                        <Text className="text-gray-900 font-bold text-lg">Grand Total</Text>
                        <Text className="text-primary font-bold text-lg">${grandTotal.toFixed(2)}</Text>
                    </View>
                </View>

                {/* Payment Method */}
                <View className="flex-row items-center justify-between bg-white border border-gray-200 rounded-xl p-4 mb-8">
                    <View className="flex-row items-center">
                        <Image
                            source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" }}
                            className="w-10 h-6 mr-3"
                            resizeMode="contain"
                        />
                        <Text className="text-gray-900 font-medium">**** **** **** 4582</Text>
                    </View>
                    <TouchableOpacity>
                        <Text className="text-primary font-bold">Change</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>

            <View className="p-6 border-t border-gray-100 pb-10 bg-white shadow-lg">
                <TouchableOpacity
                    onPress={() => router.push("/booking/success")}
                    className="bg-secondary p-4 rounded-xl items-center shadow-lg shadow-orange-500/30 active:scale-95 transition-transform"
                >
                    <Text className="text-white font-bold text-lg">Pay Now • ${grandTotal.toFixed(2)}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
