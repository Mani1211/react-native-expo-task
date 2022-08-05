import {NavigationContainer} from'@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './components/Login';
import Home from './components/Home';
const Stack = createNativeStackNavigator();

const App = ()=>{

  return(
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen component={Login} name="login"  options={{headerShown:false}} />
        <Stack.Screen component={Home} name="home" options={{headerShown:false}} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default App;