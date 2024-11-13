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
                source={require("./assets/logotipo_econecta_341x98.png")}
                style={{ marginTop: 40, justifyContent: 'row', alignItems: 'center', top: 0 }}
            />
        </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
