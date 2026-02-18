import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../constants/ThemeContext";

export default function ProfileScreen() {
    const router = useRouter();
    const { isDarkMode, toggleDarkMode, colors } = useTheme();
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);

    const MenuItem = ({ icon, title, showChevron = true, onPress, color, rightElement, iconBg }: any) => (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.6}
            style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: 14,
                marginBottom: 4,
            }}
        >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
                <View
                    style={{
                        width: 44,
                        height: 44,
                        borderRadius: 14,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: iconBg || (isDarkMode ? "#374151" : "#EFF6FF"),
                    }}
                >
                    <Ionicons name={icon} size={21} color={color === "#ef4444" ? "#ef4444" : "#2563EB"} />
                </View>
                <Text style={{ fontSize: 15, fontWeight: "600", color: color || colors.text }}>{title}</Text>
            </View>
            {rightElement ? rightElement : (showChevron && <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />)}
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
                bounces={true}
            >
                {/* Header */}
                <View style={{ paddingHorizontal: 24, paddingTop: 16, paddingBottom: 6 }}>
                    <Text className="font-expressa" style={{ fontSize: 28, fontWeight: "800", color: colors.text }}>Profile</Text>
                </View>

                {/* Profile Card */}
                <View
                    style={{
                        marginHorizontal: 24,
                        marginTop: 16,
                        marginBottom: 20,
                        backgroundColor: colors.card,
                        borderRadius: 20,
                        padding: 20,
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: isDarkMode ? 0.3 : 0.08,
                        shadowRadius: 8,
                        elevation: 3,
                    }}
                >
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <View style={{ position: "relative" }}>
                            <Image
                                source={{ uri: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" }}
                                style={{
                                    width: 72,
                                    height: 72,
                                    borderRadius: 36,
                                    borderWidth: 3,
                                    borderColor: "#F1510C",
                                }}
                            />
                            <View
                                style={{
                                    position: "absolute",
                                    bottom: 0,
                                    right: 0,
                                    backgroundColor: "#F1510C",
                                    width: 24,
                                    height: 24,
                                    borderRadius: 12,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderWidth: 2,
                                    borderColor: colors.card,
                                }}
                            >
                                <Ionicons name="camera" size={12} color="white" />
                            </View>
                        </View>
                        <View style={{ marginLeft: 16, flex: 1 }}>
                            <Text className="font-expressa" style={{ fontSize: 20, fontWeight: "700", color: colors.text }}>Sarah Anderson</Text>
                            <Text style={{ fontSize: 13, color: colors.textSecondary, marginTop: 2 }}>sarah.anderson@example.com</Text>
                            <TouchableOpacity
                                style={{
                                    marginTop: 8,
                                    backgroundColor: isDarkMode ? "#374151" : "#FFF7ED",
                                    paddingHorizontal: 14,
                                    paddingVertical: 6,
                                    borderRadius: 20,
                                    alignSelf: "flex-start",
                                }}
                            >
                                <Text style={{ color: "#F1510C", fontWeight: "600", fontSize: 12 }}>Edit Profile</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Stats Row */}
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-around",
                            marginTop: 20,
                            paddingTop: 16,
                            borderTopWidth: 1,
                            borderTopColor: colors.border,
                        }}
                    >
                        <View style={{ alignItems: "center" }}>
                            <Text style={{ fontSize: 20, fontWeight: "700", color: "#F1510C" }}>12</Text>
                            <Text style={{ fontSize: 12, color: colors.textSecondary, marginTop: 2 }}>Bookings</Text>
                        </View>
                        <View style={{ width: 1, backgroundColor: colors.border }} />
                        <View style={{ alignItems: "center" }}>
                            <Text style={{ fontSize: 20, fontWeight: "700", color: "#F1510C" }}>3</Text>
                            <Text style={{ fontSize: 12, color: colors.textSecondary, marginTop: 2 }}>Saved</Text>
                        </View>
                        <View style={{ width: 1, backgroundColor: colors.border }} />
                        <View style={{ alignItems: "center" }}>
                            <Text style={{ fontSize: 20, fontWeight: "700", color: "#F1510C" }}>8</Text>
                            <Text style={{ fontSize: 12, color: colors.textSecondary, marginTop: 2 }}>Reviews</Text>
                        </View>
                    </View>
                </View>

                {/* General Section */}
                <View
                    style={{
                        marginHorizontal: 24,
                        marginBottom: 16,
                        backgroundColor: colors.card,
                        borderRadius: 20,
                        paddingHorizontal: 18,
                        paddingVertical: 12,
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: isDarkMode ? 0.2 : 0.05,
                        shadowRadius: 4,
                        elevation: 2,
                    }}
                >
                    <Text style={{ fontSize: 12, fontWeight: "700", color: colors.textSecondary, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>
                        General
                    </Text>

                    <MenuItem icon="person-outline" title="Personal Information" />
                    <MenuItem icon="card-outline" title="Payment Methods" />
                    <MenuItem
                        icon="notifications-outline"
                        title="Notifications"
                        rightElement={
                            <Switch
                                trackColor={{ false: isDarkMode ? "#4B5563" : "#D1D5DB", true: "#bfdbfe" }}
                                thumbColor={notificationsEnabled ? "#2563EB" : "#f4f3f4"}
                                onValueChange={setNotificationsEnabled}
                                value={notificationsEnabled}
                            />
                        }
                    />
                    <MenuItem
                        icon="moon-outline"
                        title="Dark Mode"
                        rightElement={
                            <Switch
                                trackColor={{ false: isDarkMode ? "#4B5563" : "#D1D5DB", true: "#bfdbfe" }}
                                thumbColor={isDarkMode ? "#2563EB" : "#f4f3f4"}
                                onValueChange={toggleDarkMode}
                                value={isDarkMode}
                            />
                        }
                    />
                </View>

                {/* Support Section */}
                <View
                    style={{
                        marginHorizontal: 24,
                        marginBottom: 16,
                        backgroundColor: colors.card,
                        borderRadius: 20,
                        paddingHorizontal: 18,
                        paddingVertical: 12,
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: isDarkMode ? 0.2 : 0.05,
                        shadowRadius: 4,
                        elevation: 2,
                    }}
                >
                    <Text style={{ fontSize: 12, fontWeight: "700", color: colors.textSecondary, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>
                        Support
                    </Text>

                    <MenuItem icon="help-circle-outline" title="Help Center" />
                    <MenuItem icon="shield-checkmark-outline" title="Privacy Policy" />
                    <MenuItem icon="document-text-outline" title="Terms of Service" />
                </View>

                {/* Log Out */}
                <View style={{ marginHorizontal: 24, marginBottom: 16 }}>
                    <TouchableOpacity
                        onPress={() => router.replace('/auth/sign-in')}
                        activeOpacity={0.7}
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: isDarkMode ? "#451A1A" : "#FEF2F2",
                            borderRadius: 16,
                            paddingVertical: 16,
                            gap: 8,
                        }}
                    >
                        <Ionicons name="log-out-outline" size={20} color="#ef4444" />
                        <Text style={{ fontSize: 16, fontWeight: "600", color: "#ef4444" }}>Log Out</Text>
                    </TouchableOpacity>
                </View>

                {/* App Version */}
                <Text style={{ textAlign: "center", fontSize: 12, color: colors.textSecondary, marginTop: 4 }}>
                    AvensStay v1.0.0
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}
