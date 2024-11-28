import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from '../screens/main';
import Cadastrar from '../screens/cadastrar';
import Login from '../screens/login';
import TabRoutes from "./tab.routes";
import Temp from "../screens/temp";
import UmidSolo from "../screens/umidSolo";
import UmidAr from "../screens/umidAr";
import Lumi from "../screens/lumi";
import trocaSenha from "../screens/trocaSenha";

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
            name="main"
            component={Main}
            />
            <Stack.Screen
            name="cadastrar"
            component={Cadastrar}
            />
            <Stack.Screen
            name="login"
            component={Login}
            />
            <Stack.Screen
            name="tab"
            component={TabRoutes}
            />
            <Stack.Screen
            name="temp"
            component={Temp}
            />
            <Stack.Screen
            name="umidSolo"
            component={UmidSolo}
            />
            <Stack.Screen
            name="umidAr"
            component={UmidAr}
            />
            <Stack.Screen
            name="lumi"
            component={Lumi}
            />
            <Stack.Screen
            name="trocaSenha"
            component={trocaSenha}
            />
        </Stack.Navigator>
    )
}