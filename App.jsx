import React from 'react';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen.jsx';
import BudgetScreen from './src/screens/BudgetScreen.jsx';

enableScreens();

const Stack = createStackNavigator();

const App = () => {
  
    return (
        <NavigationContainer>
                    <Stack.Navigator initialRouteName="HomeScreen">
                        <Stack.Screen 
                            name="HomeScreen" 
                            component={HomeScreen} 
                            options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                            name="BudgetScreen" 
                            component={BudgetScreen} 
                            options={{ headerShown: false }} 
                        />
                    </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
