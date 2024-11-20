import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/home';
import Analise from '../screens/analise';
import Conta from "../screens/conta";
import { Feather } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
    return (
        <Tab.Navigator screenOptions={{ 
            headerShown: false,
            tabBarActiveTintColor: '#39b54a',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: {
                    backgroundColor: '#000',
                    borderTopWidth: 0,
                }, }}>
            <Tab.Screen
            name="home"
            component={Home}
            options={{
                tabBarIcon: ({ color, size }) => <Feather name="home" color={color} size={size}/>,
                tabBarLabel: 'Home'
            }}
            />
            <Tab.Screen
            name="analise"
            component={Analise}
            options={{
                tabBarIcon: ({ color, size }) => <Feather name="bar-chart" color={color} size={size}/>,
                tabBarLabel: 'Análise'
            }}
            />
            <Tab.Screen
            name="conta"
            component={Conta}
            options={{
                tabBarIcon: ({ color, size }) => <Feather name="user" color={color} size={size}/>,
                tabBarLabel: 'Minha conta'
            }}
            />
        </Tab.Navigator>
    )
}