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

export default function Home() {
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
                <Text style={styles.txtOla}>Olá, {usuario.nome}!</Text>

                <Text style={styles.txt}> Estamos monitorando:</Text>
                <Text style={styles.areaSensores}>Área 1:</Text>
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
    txt: {
        fontSize: 25,
        color: "#fff",
        fontFamily: "Montserrat_400Regular",
        marginTop: 40,
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
    },
    areaSensores: {
        fontSize: 20,
        color: "#fff",
        fontFamily: "Montserrat_400Regular",
        marginTop: 40,
    },
});