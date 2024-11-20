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
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../context/userContext";
import { useFonts, Montserrat_400Regular, Montserrat_600SemiBold } from "@expo-google-fonts/montserrat";

export default function Analise() {
    const navegacao = useNavigation();
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
        </View>
        <View style={styles.areaAnalise}>
              <Text style={styles.txt}>Visualize seus gráficos:</Text>

              <TouchableOpacity style={styles.botao} onPress={() => navegacao.navigate("temp")}>
                  <Text style={styles.txtBotao}>Temperatura</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.botao} onPress={() => navegacao.navigate("umidSolo")}>
                  <Text style={styles.txtBotao}>Umidade do Solo</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.botao} onPress={() => navegacao.navigate("umidAr")}>
                  <Text style={styles.txtBotao}>Umidade do Ar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.botao} onPress={() => navegacao.navigate("lumi")}>
                  <Text style={styles.txtBotao}>Luminosidade</Text>
              </TouchableOpacity>
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
    txt: {
        fontSize: 28,
        color: "#fff",
        fontFamily: "Montserrat_400Regular",
        marginBottom: 40,
        textAlign: 'center',
      },
      botao: {
        marginTop: 20,
        backgroundColor: "#39b54a",
        borderRadius: 30,
        padding: 10,
        width: 270,
        height: 50,
      },
      txtBotao: {
        color: "#000",
        textAlign: 'center',
        fontSize: 24,
        fontFamily: "Montserrat_600SemiBold",
      },
      areaAnalise: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
});