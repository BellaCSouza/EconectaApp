import React, { useState } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFonts, Montserrat_400Regular, Montserrat_600SemiBold } from '@expo-google-fonts/montserrat';

export default function Main() {
  const navegacao = useNavigation();
  const [fontsCarregadas] = useFonts({ 
    Montserrat_400Regular,
    Montserrat_600SemiBold 
    });

    const [carregando, setCarregando] = useState(false);

    if (!fontsCarregadas) {
        return null;
    }

  return (
    <View style={styles.container}>
        <Image 
            source={require("../../assets/logo.png")}
            style={styles.logo}
        />
        <View style={styles.areaMain}> 

            <Text style={styles.txt}>Conectando tecnologia{"\n"}e agricultura!</Text>

            <TouchableOpacity style={styles.botao} onPress={() => navegacao.navigate("login")}>
                <Text style={styles.txtBotao}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botao} onPress={() => navegacao.navigate("cadastrar")}>
                <Text style={styles.txtBotao}>Cadastrar</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#000',
  },
  logo: {
    width: 120,
    height: 32,
    marginTop: 20,
  },
  areaMain: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  txt: {
    fontSize: 28,
    color: "#fff",
    fontFamily: "Montserrat_400Regular",
    marginBottom: 40,
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
  }
});