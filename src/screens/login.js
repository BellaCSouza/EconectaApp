import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts, Montserrat_400Regular, Montserrat_600SemiBold } from '@expo-google-fonts/montserrat';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { db, auth } from "../config/firebaseConnection";
import { collection, getDocs, query, where } from 'firebase/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useUser } from "../context/userContext";

export default function Login() {
  const navegacao = useNavigation();
  const { setUsuario } = useUser();
  const [fontsCarregadas] = useFonts({ Montserrat_400Regular, Montserrat_600SemiBold });

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!fontsCarregadas) {
    return null;
  }

  async function handleLogin() {
    if (!email || !senha) {
      Alert.alert("Atenção", "Preencha todos os campos!");
      return;
    }

    setLoading(true);

    try {
      const credencialUsuario = await signInWithEmailAndPassword(auth, email, senha);
      const user = credencialUsuario.user;

      // Verificar se o email foi confirmado
      if (!user.emailVerified) {
        Alert.alert(
          "Atenção",
          "Confirme seu e-mail antes de acessar o aplicativo. Verifique sua caixa de entrada."
        );
        return;
      }

      const usuarioDocs = query(collection(db, "usuarios"), where("uid", "==", user.uid));
      const querySnapshot = await getDocs(usuarioDocs);

      if (!querySnapshot.empty) {
        const dadosUsuario = querySnapshot.docs[0].data();
        console.log("Dados do usuário: ", dadosUsuario);

        if (
          dadosUsuario &&
          dadosUsuario.email &&
          dadosUsuario.nome &&
          dadosUsuario.sobrenome &&
          dadosUsuario.idade &&
          dadosUsuario.genero &&
          dadosUsuario.uid
        ) {
          setEmail("");
          setSenha("");
          setUsuario(dadosUsuario);
          navegacao.navigate("tab");
        } else {
          Alert.alert("Erro", "Dados do usuário estão incompletos no banco de dados.");
        }
      } else {
        Alert.alert("Erro", "Usuário não encontrado no banco de dados.");
      }

    } catch (err) {
      console.error("Erro de login: ", err.message);
      Alert.alert("Erro", "Email e/ou senha incorretos.");
    } finally {
      setLoading(false);
    }
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
        <TouchableOpacity
          onPress={() => navegacao.navigate("trocaSenha")}>
          <Text
            style={{ color: '#f28123',
             textAlign: 'center',
              fontSize: 15,
               fontFamily: "Montserrat_600SemiBold",}} >
                Esqueci minha senha
          </Text>
        </TouchableOpacity>

        <Text style={styles.areaRegister}>Ainda não possui uma conta?</Text>
        <TouchableOpacity
          onPress={() => navegacao.navigate("cadastrar")}>
          <Text
            style={{ color: '#f28123',
             textAlign: 'center',
              fontSize: 15,
               fontFamily: "Montserrat_600SemiBold", 
               marginBottom:40,}} >
                Cadastre-se
          </Text>
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
    marginBottom:11,
  },
  areaRegister: {
    marginTop:150,
    color: "#dddd",
    textAlign: 'center',
    fontSize: 15,
    fontFamily: "Montserrat_600SemiBold",
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
