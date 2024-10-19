import React from 'react';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen.jsx';
import BudgetScreen from './src/screens/BudgetScreen.jsx';
import StatisticScreen from './src/screens/StatisticScreen.jsx';
import ProfileScreen from './src/screens/ProfileScreen.jsx';
import TransactionsScreen from './src/screens/TransactionsScreen.jsx';

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
                        <Stack.Screen 
                            name="StatisticScreen" 
                            component={StatisticScreen} 
                            options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                            name="ProfileScreen" 
                            component={ProfileScreen} 
                            options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                            name="TransactionsScreen" 
                            component={TransactionsScreen} 
                            options={{ headerShown: false }} 
                        />
                    </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
