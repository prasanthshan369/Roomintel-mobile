import { useRouter } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

interface Room {
    _id: string;
    price: number;
    latitude?: number;
    longitude?: number;
    slug?: string;
}

interface ExploreMapProps {
    mappedRooms: Room[];
}

const ExploreMap: React.FC<ExploreMapProps> = ({ mappedRooms }) => {
    const router = useRouter();

    return (
        <MapView
            style={{ flex: 1, width: "100%", height: "100%" }}
            initialRegion={{
                latitude: 11.1271,
                longitude: 78.6569,
                latitudeDelta: 5.0,
                longitudeDelta: 5.0,
            }}
        >
            {mappedRooms.map((room) => (
                <Marker
                    key={room._id}
                    coordinate={{ latitude: room.latitude!, longitude: room.longitude! }}
                    onPress={() => router.push(`/hotel/${room.slug || room._id}`)}
                >
                    <View className="bg-primary px-3 py-2 rounded-xl border-2 border-white shadow-md" style={{ backgroundColor: "#F1510C" }}>
                        <Text className="text-white font-bold text-sm">${room.price}</Text>
                    </View>
                </Marker>
            ))}
        </MapView>
    );
};

export default ExploreMap;
