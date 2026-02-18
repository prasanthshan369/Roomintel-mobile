import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../constants/Colors";

export default function BookDateScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();

    const [showCheckIn, setShowCheckIn] = useState(false);
    const [showCheckOut, setShowCheckOut] = useState(false);
    const [checkIn, setCheckIn] = useState(new Date());
    // Default checkout is next day
    const [checkOut, setCheckOut] = useState(() => {
        const d = new Date();
        d.setDate(d.getDate() + 1);
        return d;
    });

    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(0);

    const onCheckInChange = (event: any, selectedDate?: Date) => {
        setShowCheckIn(Platform.OS === 'ios');
        if (selectedDate) setCheckIn(selectedDate);
    };

    const onCheckOutChange = (event: any, selectedDate?: Date) => {
        setShowCheckOut(Platform.OS === 'ios');
        if (selectedDate) setCheckOut(selectedDate);
    };

    const Counter = ({ label, value, onIncrement, onDecrement }: { label: string, value: number, onIncrement: () => void, onDecrement: () => void }) => (
        <View className="flex-row items-center justify-between mb-4">
            <Text className="text-gray-900 font-semibold text-lg">{label}</Text>
            <View className="flex-row items-center space-x-4 bg-gray-50 rounded-lg p-2">
                <TouchableOpacity onPress={onDecrement} className="bg-white p-2 rounded-md shadow-sm">
                    <Ionicons name="remove" size={20} color={Colors.light.text} />
                </TouchableOpacity>
                <Text className="font-bold text-lg w-6 text-center">{value}</Text>
                <TouchableOpacity onPress={onIncrement} className="bg-primary p-2 rounded-md shadow-sm">
                    <Ionicons name="add" size={20} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View className="flex-1 bg-white">
            <StatusBar style="dark" />
            <View className="px-6 pt-12 pb-4 flex-row items-center border-b border-gray-100">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="w-10 h-10 bg-gray-50 rounded-full items-center justify-center"
                >
                    <Ionicons name="arrow-back" size={24} color={Colors.light.text} />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-gray-900 ml-4">Select Dates & Guests</Text>
            </View>

            <ScrollView className="flex-1 px-6 pt-6">
                <Text className="text-gray-900 font-bold text-xl mb-4">Dates</Text>

                <View className="flex-row space-x-4 mb-8">
                    <View className="flex-1">
                        <Text className="text-gray-500 mb-2">Check-in</Text>
                        <TouchableOpacity
                            onPress={() => setShowCheckIn(true)}
                            className="flex-row items-center bg-gray-50 border border-gray-200 rounded-xl p-4"
                        >
                            <Ionicons name="calendar-outline" size={20} color={Colors.light.primary} />
                            <Text className="ml-2 font-semibold text-gray-900">
                                {checkIn.toLocaleDateString()}
                            </Text>
                        </TouchableOpacity>
                        {showCheckIn && (
                            <DateTimePicker
                                value={checkIn}
                                mode="date"
                                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                onChange={onCheckInChange}
                                minimumDate={new Date()}
                            />
                        )}
                    </View>

                    <View className="flex-1">
                        <Text className="text-gray-500 mb-2">Check-out</Text>
                        <TouchableOpacity
                            onPress={() => setShowCheckOut(true)}
                            className="flex-row items-center bg-gray-50 border border-gray-200 rounded-xl p-4"
                        >
                            <Ionicons name="calendar-outline" size={20} color={Colors.light.primary} />
                            <Text className="ml-2 font-semibold text-gray-900">
                                {checkOut.toLocaleDateString()}
                            </Text>
                        </TouchableOpacity>
                        {showCheckOut && (
                            <DateTimePicker
                                value={checkOut}
                                mode="date"
                                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                onChange={onCheckOutChange}
                                minimumDate={checkIn}
                            />
                        )}
                    </View>
                </View>

                <Text className="text-gray-900 font-bold text-xl mb-4">Guests</Text>
                <View className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm mb-6">
                    <Counter
                        label="Adults"
                        value={adults}
                        onIncrement={() => setAdults(adults + 1)}
                        onDecrement={() => setAdults(Math.max(1, adults - 1))}
                    />
                    <View className="h-[1px] bg-gray-100 my-2" />
                    <Counter
                        label="Children"
                        value={children}
                        onIncrement={() => setChildren(children + 1)}
                        onDecrement={() => setChildren(Math.max(0, children - 1))}
                    />
                </View>
            </ScrollView>

            <View className="p-6 border-t border-gray-100 pb-10">
                <TouchableOpacity
                    onPress={() => router.push({ pathname: "/booking/confirm", params: { id, adults, children, checkIn: checkIn.toISOString(), checkOut: checkOut.toISOString() } })}
                    className="bg-secondary p-4 rounded-xl items-center shadow-lg shadow-orange-500/30"
                >
                    <Text className="text-white font-bold text-lg">Continue</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
