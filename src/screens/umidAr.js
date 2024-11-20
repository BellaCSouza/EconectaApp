import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useUser } from "../context/userContext";
import { useFonts, Montserrat_400Regular, Montserrat_600SemiBold } from "@expo-google-fonts/montserrat";

export default function UmidAr() {
    const { usuario } = useUser();
    const [fontsCarregadas] = useFonts({ 
        Montserrat_400Regular,
        Montserrat_600SemiBold 
        });

        if (!usuario) {
            return (
              <View style={styles.container}>
                <Text style={styles.text}>Usuário não encontrado!</Text>
              </View>
            );
          }

        if (!fontsCarregadas) {
            return null;
        }

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.areaHeader}>
            <View style={styles.areaNav}>
                <Image
                    source={require("../../assets/logo.png")}
                    style={styles.logo}
                />
            </View>
            <View style={styles.body}>
                <Text style={styles.txtOla}>Teste</Text>
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
        marginTop: 60,
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
    }
});