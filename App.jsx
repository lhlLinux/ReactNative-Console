/**
* @format
* @flow strict-local
*/

import * as React from 'react'; 
import { View, Text } from 'react-native'; 
import { NavigationContainer } from '@react-navigation/native'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 

import Home from './components/Maher_Home'; 
import Historique from './components/Maher_Historique';

  
const Stack = createNativeStackNavigator(); 

function App() // notre application
{ 
    return (
        <NavigationContainer> 
            <Stack.Navigator> 
                <Stack.Screen name="Home" component={ Home }/> 
                <Stack.Screen name="Historique" component={ Historique }/> 
            </Stack.Navigator> 
        </NavigationContainer> 
    );
} 
 
 
export default App;