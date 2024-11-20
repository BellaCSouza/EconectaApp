import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useUser } from "../context/userContext";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Picker } from '@react-native-picker/picker';
import { useFonts, Montserrat_400Regular, Montserrat_600SemiBold } from "@expo-google-fonts/montserrat";

export default function Conta() {
    const { usuario, setUsuario } = useUser();
    const [nome, setNome] = useState(usuario?.nome);
    const [sobrenome, setSobrenome] = useState(usuario?.sobrenome);
    const [idade, setIdade] = useState(usuario?.idade);
    const [genero, setGenero] = useState(usuario?.genero);
    const [email, setEmail] = useState(usuario?.email);
    const [senha, setSenha] = useState("");
    const [senhaVisivel, setSenhaVisivel] = useState(false);
    const [editando, setEditando] = useState(false);
    
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

        async function handleSalvar() {
            setEditando(false);
        }

  return (
    <KeyboardAwareScrollView>
        <View style={styles.container}>

            <Image
                source={require("../../assets/logo.png")}
                style={styles.logo}
            />

            <Text style={styles.txtCadastrar}>Minha Conta</Text>
            
            <View style={styles.areaInput}>
              <Text style={styles.txtInput}>Nome:</Text>
              
              <TextInput
                style={styles.txtDados}
                placeholder='seu nome'
                placeholderTextColor={"#a0a0a0"}
                value={nome}
                onChangeText={setNome}
                editable={editando}
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
                editable={editando}
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
                editable={editando}
              />
            </View>

            <View style={styles.areaInput}>
              <Text style={styles.txtInput}>Gênero:</Text>

                <View style={styles.areaPicker}> 
                    <Picker
                    selectedValue={genero}
                    onValueChange={setGenero}
                    enabled={editando}
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
                editable={editando}
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
                editable={editando}
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

            <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                    if (editando) {
                    handleSalvar();
                    } else {
                    setEditando(true);
                    }
                }}
            >
                <Text style={styles.txtBtn}>
                    {editando ? "Salvar" : "Editar"}
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
  btn: {
    marginTop: 50,
    backgroundColor: "#f28123",
    borderRadius: 30,
    padding: 10,
    width: 270,
    height: 50,
    marginBottom: 50,
  },
  txtBtn: {
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
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
});