import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts, Montserrat_400Regular, Montserrat_600SemiBold } from '@expo-google-fonts/montserrat';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { auth } from "../config/firebaseConnection";
import { sendPasswordResetEmail } from 'firebase/auth';

export default function TrocaSenha() {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_600SemiBold,
  });

  const [email, setEmail] = useState("");

  if (!fontsLoaded) {
    return null; // Aguarda as fontes serem carregadas
  }

  // Função para enviar o e-mail de redefinição de senha
  async function handlePasswordReset() {
    if (!email) {
      Alert.alert("Atenção", "Por favor, insira seu e-mail!");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email); // Envia o e-mail de redefinição de senha
      Alert.alert(
        "Sucesso",
        "Um e-mail de redefinição de senha foi enviado para o endereço fornecido."
      );
      setEmail(""); // Limpa o campo de e-mail
      navigation.goBack(); // Volta para a tela anterior (opcional)
    } catch (error) {
      Alert.alert("Erro", `Não foi possível enviar o e-mail: ${error.message}`);
    }
  }

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Image source={require("../../assets/logo.png")} style={styles.logo} />
        <Text style={styles.txtLogin}>Esqueci minha senha</Text>

        <View style={styles.areaInput}>
          <Text style={styles.txtInput}>E-mail:</Text>
          <TextInput
            style={styles.email}
            placeholder='seu@email.com'
            placeholderTextColor={"#a0a0a0"}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity style={styles.btnLogin} onPress={handlePasswordReset}>
          <Text style={styles.txtBtnLogin}>Enviar e-mail</Text>
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
    marginBottom: 19,
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
  btnLogin: {
    marginTop: 70,
    backgroundColor: "#f28123",
    borderRadius: 30,
    padding: 10,
    width: 270,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtBtnLogin: {
    color: "#000",
    textAlign: 'center',
    fontSize: 24,
    fontFamily: "Montserrat_600SemiBold",
  },
});