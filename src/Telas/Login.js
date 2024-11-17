import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    TouchableOpacity,
    Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts, Montserrat_400Regular, Montserrat_600SemiBold } from '@expo-google-fonts/montserrat';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { db } from "../Config/firebaseConnection";
import { doc, getDoc } from 'firebase/firestore';


export default function Login() {
    const navegacao = useNavigation();
    const [fontsCarregadas] = useFonts({ Montserrat_400Regular, Montserrat_600SemiBold });

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [senhaVisivel, setSenhaVisivel] = useState(false);
    const [carregando, setCarregando] = useState(false);

    if (!fontsCarregadas) {
        return null;
    }

    const handleLogin = async () => {
      let usuario = { email, senha };

      if (!usuario.email || !usuario.senha) {
        Alert.alert("Atenção", "Preencha todos os campos!");
        return;
      }
      
      navegacao.navigate("Home");
    }

  return (
    <KeyboardAwareScrollView>
        <View style={styles.container}>
            <Image
                source={require("../../assets/logo.png")}
                style={styles.logo}
            />

            <Text style={styles.txtLogin}>Login</Text>
            <View style={styles.areaInput}>
              <Text style={styles.txtInput}>Email:</Text>
              
              <TextInput
                style={styles.email}
                placeholder='seu@email.com'
                placeholderTextColor={"#a0a0a0"}
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.areaInput}>
              <Text style={styles.txtInput}>Senha:</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}> 
              <TextInput
                style={styles.senha}
                placeholder='********'
                placeholderTextColor={"#a0a0a0"}
                secureTextEntry={!senhaVisivel}
                value={senha}
                onChangeText={setSenha}
              />
              <TouchableOpacity
              style={styles.olhoIcon}
              onPress={() => setSenhaVisivel(!senhaVisivel)}>
                <Image
                  source={
                    senhaVisivel
                      ? require("../../assets/olhoFechado.png")
                      : require("../../assets/olhoAberto.png")
                  }
                  resizeMode="contain"
                  style={styles.icon}
                />
              </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.btnLogin} onPress={handleLogin}>
              <Text style={styles.txtBtnLogin}>Login</Text>
            </TouchableOpacity>
        </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: "#000",
  },
  logo: {
    width: 120,
    height: 32,
    marginTop: 20,
  },
  txtLogin: {
    fontSize: 40,
    color: "#fff",
    fontFamily: "Montserrat_400Regular",
    marginBottom: 40,
    marginTop: 35,
  },
  areaInput: {
    width: "80%",
    marginTop: 20,
  },
  txtInput: {
    marginBottom: 10,
    fontSize: 22,
    color: "#fff",
    fontFamily: "Montserrat_400Regular",
  },
  email: {
    color: "#fff",
    width: "100%",
    padding: 15,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 30,
    fontSize: 20,
    fontFamily: "Montserrat_400Regular",
  },
  senha: {
    color: "#fff",
    width: "100%",
    padding: 15,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 30,
    fontSize: 20,
    fontFamily: "Montserrat_400Regular",
  },
  btnLogin: {
    marginTop: 70,
    backgroundColor: "#f28123",
    borderRadius: 30,
    padding: 10,
    width: 270,
    height: 50,
  },
  txtBtnLogin: {
    color: "#000",
    textAlign: 'center',
    fontSize: 24,
    fontFamily: "Montserrat_600SemiBold",
  },
  olhoIcon: {
    marginLeft: -50,
  },
  icon: {
    width: 24,
    height: 24,
  },
});
