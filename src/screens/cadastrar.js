import React, { useState } from 'react';
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
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { useFonts, Montserrat_400Regular, Montserrat_600SemiBold } from '@expo-google-fonts/montserrat';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { db, auth } from "../config/firebaseConnection";
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';

export default function Cadastrar() {
    const navegacao = useNavigation();
    const [fontsCarregadas] = useFonts({ Montserrat_400Regular, Montserrat_600SemiBold });

    const [nome, setNome] = useState("");
    const [sobrenome, setSobrenome] = useState("");
    const [idade, setIdade] = useState("");
    const [genero, setGenero] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [senhaVisivel, setSenhaVisivel] = useState(false);
    const [loading, setLoading] = useState(false);

    if (!fontsCarregadas) {
        return null;
    }

    function validarCampos() {
        if (!nome || !sobrenome || !idade || !genero || !email || !senha) {
            Alert.alert("Atenção", "Preencha todos os campos!");
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert("Erro", "Digite um e-mail válido!");
            return false;
        }

        if (senha.length < 6) {
            Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres!");
            return false;
        }

        return true;
    }

    async function salvarUsuario(user) {
        try {
            const usuariosRef = collection(db, "usuarios");
            const querySnapshot = await getDocs(query(usuariosRef, where("email", "==", email)));

            if (!querySnapshot.empty) {
                Alert.alert("Erro", "Usuário já cadastrado!");
                return false;
            }

            await addDoc(usuariosRef, {
                nome,
                sobrenome,
                idade,
                genero,
                email,
                uid: user.uid,
            });

            return true;
        } catch (error) {
            console.error("Erro ao salvar usuário no Firestore:", error);
            throw error;
        }
    }

    async function handleCadastrar() {
        if (!validarCampos()) return;

        setLoading(true);

        try {
            // Criação do usuário no Firebase Authentication
            const credencialUsuario = await createUserWithEmailAndPassword(auth, email, senha);
            const user = credencialUsuario.user;

            // Envia o email de verificação
            await sendEmailVerification(user);
            Alert.alert(
                "Sucesso",
                "Cadastro realizado! Confirme seu e-mail para continuar.",
                [
                    {
                        text: "OK",
                        onPress: () => navegacao.navigate("login"),
                    },
                ]
            );

            // Salva o usuário no Firestore
            const sucesso = await salvarUsuario(user);
            if (!sucesso) return;
        } catch (error) {
            console.error(error);

            switch (error.code) {
                case "auth/email-already-in-use":
                    Alert.alert("Erro", "Este e-mail já está em uso.");
                    break;
                case "auth/invalid-email":
                    Alert.alert("Erro", "O e-mail fornecido é inválido.");
                    break;
                case "auth/weak-password":
                    Alert.alert("Erro", "A senha é muito fraca.");
                    break;
                default:
                    Alert.alert("Erro", "Algo deu errado. Tente novamente.");
                    break;
            }
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

            <Text style={styles.txtCadastrar}>Cadastrar</Text>
            
            <View style={styles.areaInput}>
              <Text style={styles.txtInput}>Nome:</Text>
              
              <TextInput
                style={styles.txtDados}
                placeholder='seu nome'
                placeholderTextColor={"#a0a0a0"}
                value={nome}
                onChangeText={setNome}
              />
            </View>

            <View style={styles.areaInput}>
              <Text style={styles.txtInput}>Sobrenome:</Text>
              
              <TextInput
                style={styles.txtDados}
                placeholder='seu sobrenome'
                placeholderTextColor={"#a0a0a0"}
                value={sobrenome}
                onChangeText={setSobrenome}
              />
            </View>

            <View style={styles.areaInput}>
              <Text style={styles.txtInput}>Idade:</Text>
              
              <TextInput
                style={styles.txtDados}
                placeholder='sua idade'
                placeholderTextColor={"#a0a0a0"}
                value={idade}
                onChangeText={setIdade}
              />
            </View>

            <View style={styles.areaInput}>
              <Text style={styles.txtInput}>Gênero:</Text>

                <View style={styles.areaPicker}> 
                    <Picker
                    selectedValue={genero}
                    onValueChange={setGenero}
                    style={styles.picker}
                    dropdownIconColor="#fff"
                    >
                    <Picker.Item label="Masculino" value="Masculino" style={styles.itemPicker}/>
                    <Picker.Item label="Feminino" value="Feminino" style={styles.itemPicker}/>
                    </Picker>
                </View>
            </View>

            <View style={styles.areaInput}>
              <Text style={styles.txtInput}>Email:</Text>
              
              <TextInput
                style={styles.txtDados}
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
                style={styles.txtDados}
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

            <TouchableOpacity style={styles.btnCadastrar} onPress={handleCadastrar}>
              <Text style={styles.txtBtnCadastrar}>Cadastrar</Text>
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
  txtCadastrar: {
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
  txtDados: {
    color: "#fff",
    width: "100%",
    padding: 15,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 30,
    fontSize: 20,
    fontFamily: "Montserrat_400Regular",
  },
  areaPicker: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#fff',
    fontFamily: "Montserrat_400Regular",
    fontSize: 22,
  },
  picker: {
    width: '100%',
    backgroundColor: '#000',
    color: "#fff",
    alignSelf: 'flex-start',
  },
  pickerItem: {
    fontSize: 22,
    fontFamily: "Montserrat_400Regular",
  },
  btnCadastrar: {
    marginTop: 50,
    backgroundColor: "#f28123",
    borderRadius: 30,
    padding: 10,
    width: 270,
    height: 50,
    marginBottom: 50,
  },
  txtBtnCadastrar: {
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