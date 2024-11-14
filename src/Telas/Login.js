import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts, Montserrat_400Regular } from '@expo-google-fonts/montserrat';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default function Login() {
    const navegacao = useNavigation();
    const [fontsCarregadas] = useFonts({ Montserrat_400Regular });

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [senhaVisivel, setSenhaVisivel] = useState(false);
    const [carregando, setCarregando] = useState(false);

    if (!fontsCarregadas) {
        return null;
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
                style={styles.input}
                placeholder='seu@email.com'
                value={email}
                onChangeText={setEmail}
              />
            </View>
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
    fontSize: 35,
    color: "#fff",
    fontFamily: "Montserrat_400Regular",
    marginBottom: 40,
    marginTop: 35,
  },
  areaInput: {
    
  },
  txtInput: {
    marginBottom: 3,
    color: "#fff",
    fontFamily: "Montserrat_400Regular",
  },
});
