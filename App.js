import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Main from "./src/Telas/Main";
import Login from "./src/Telas/Login";

const Stack = createStackNavigator();

function AppStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: "#000" },
        }}
      >
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return <AppStack></AppStack>
}
