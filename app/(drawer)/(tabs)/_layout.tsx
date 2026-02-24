import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../../constants/Colors";
import { useTheme } from "../../../constants/ThemeContext";

function CustomTabBar({ state, descriptors, navigation }: any) {
    const { colors } = useTheme();

    const icons: Record<string, { active: string; inactive: string }> = {
        index: { active: "home", inactive: "home-outline" },
        explore: { active: "location", inactive: "location-outline" },
        saved: { active: "heart", inactive: "heart-outline" },
        profile: { active: "person", inactive: "person-outline" },
    };

    return (
        <View
            style={{
                flexDirection: "row",
                backgroundColor: colors.tabBar,
                height: 65,
                paddingBottom: 12,
                paddingTop: 10,
                elevation: 5,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: -2 },
                shadowOpacity: 0.05,
                shadowRadius: 4,
            }}
        >
            {state.routes.map((route: any, index: number) => {
                const { options } = descriptors[route.key];
                const label = options.title ?? route.name;
                const isFocused = state.index === index;

                const iconSet = icons[route.name] || { active: "apps", inactive: "apps-outline" };
                const iconName = isFocused ? iconSet.active : iconSet.inactive;
                const iconColor = isFocused ? Colors.light.secondary : colors.tabInactive;
                const iconSize = route.name === "explore" ? 26 : 24;

                const onPress = () => {
                    const event = navigation.emit({
                        type: "tabPress",
                        target: route.key,
                        canPreventDefault: true,
                    });
                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                return (
                    <TouchableOpacity
                        key={route.key}
                        onPress={onPress}
                        style={{
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Ionicons name={iconName as any} size={iconSize} color={iconColor} />
                        <Text
                            style={{
                                color: iconColor,
                                fontSize: 13,
                                fontWeight: "600",
                                marginTop: 1,
                            }}
                        >
                            {label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{ headerShown: false }}
            tabBar={(props) => <CustomTabBar {...props} />}
        >
            <Tabs.Screen name="index" options={{ title: "Home" }} />
            <Tabs.Screen name="explore" options={{ title: "Explore" }} />
            <Tabs.Screen name="saved" options={{ title: "Saved" }} />
            <Tabs.Screen name="profile" options={{ title: "Profile" }} />
        </Tabs>
    );
}
