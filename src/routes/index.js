import { NavigationContainer } from '@react-navigation/native';
import StackRoutes from './stack.routes';
import { UserProvider } from '../context/userContext';

export default function Routes() {
    return (
        <UserProvider>
            <NavigationContainer>
                <StackRoutes />
            </NavigationContainer>
        </UserProvider>
    )
}
