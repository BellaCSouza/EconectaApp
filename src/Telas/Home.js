import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useFonts, Montserrat_400Regular, Montserrat_600SemiBold } from "@expo-google-fonts/montserrat";
import { db } from "../Config/firebaseConnection";
import { doc, getDoc, onSnapshot } from 'firebase/firestore';

export default function Home() {
  const navegacao = useNavigation();
  const [nome, setNome] = useState("Carregando...");

  useEffect(() => {
    async function getDados() {
        // Forma de buscar uma única vez e encerrar conexão
        const docref = doc(db, "usuarios", "1")

        getDoc(docref)
        .then((snapshot) => {
             setNome(snapshot.data()?.nome)
        })
        .catch((err) => {
            console.log("erro: ")
            console.log(err);
        })

        // Forma de buscar real time
        // onSnapshot(doc(db, "usuarios", "1"), (doc) => {
        //     setNome(doc.data()?.nome)
        // })
    }

    getDados();
  }, [])

  const [fontsCarregadas] = useFonts({ 
    Montserrat_400Regular,
    Montserrat_600SemiBold 
    });

    const [carregando, setCarregando] = useState(false);

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
                <Text style={styles.txtOla}>Olá, {nome}!</Text>
            </View>
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logo: {
        width: 120,
        height: 32,
        marginTop: 20,
    },
    txtOla: {
        marginTop: 40,
        fontSize: 40,
        fontFamily: "Montserrat_400Regular",
        color: "#fff",
    }
});