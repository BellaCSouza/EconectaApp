import React, { useState } from "react";
import {
    StyleSheet,
    View,
    Image,
    Text,
    ScrollView,
    ActivityIndicator,
    Animated,
} from "react-native";
import { useUser } from "../context/userContext";
import { useFonts, Montserrat_400Regular, Montserrat_600SemiBold } from "@expo-google-fonts/montserrat";
import { WebView } from 'react-native-webview';

export default function Temp() {
    const { usuario } = useUser();
    const [fontsCarregadas] = useFonts({
        Montserrat_400Regular,
        Montserrat_600SemiBold,
    });

    if (!usuario) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Usuário não encontrado!</Text>
            </View>
        );
    }

    if (!fontsCarregadas) {
        return <ActivityIndicator size="large" color="#fff" />;
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#000' }} contentContainerStyle={{ padding: 10 }}>
            <View style={styles.areaHeader}>
                <View style={styles.areaNav}>
                    <Image
                        source={require("../../assets/logo.png")}
                        style={styles.logo}
                    />
                </View>
                <View style={styles.body}>
                    {/* Primeiro gráfico */}
                    <View style={styles.webViewContainer}>
                        <Text style={styles.title}>Área 1 {`\n`} Sensor 1</Text>
                        <WebView
                            style={styles.webView}
                            source={{ uri: 'http://192.168.212.96:1880/lumi' }}
                        />
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    logo: {
        width: 120,
        height: 32,
        marginTop: 40,
        marginBottom: 55,
    },
    title: {
        fontSize: 22,
        textAlign: 'center',
        marginBottom: 10,
        color: '#ffff',
        fontFamily: "Montserrat_400Regular",
    },
    webViewContainer: {
        flex: 1,
        marginBottom: 20,
    },
    webView: {
        flex: 1,
        height: 600,
        width: '100%',
    },
    areaNav: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtOla: {
        marginTop: 80,
        marginLeft: 20,
        fontSize: 40,
        fontFamily: "Montserrat_400Regular",
        color: "#fff",
    },
});