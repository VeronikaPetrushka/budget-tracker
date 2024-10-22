import React, { useState, useEffect, useRef } from 'react';
import { Animated, View, ImageBackground, StyleSheet } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen.jsx';
import BudgetScreen from './src/screens/BudgetScreen.jsx';
import StatisticScreen from './src/screens/StatisticScreen.jsx';
import ProfileScreen from './src/screens/ProfileScreen.jsx';
import TransactionsScreen from './src/screens/TransactionsScreen.jsx';
import { ResetProvider } from './src/constants/reset.js';

enableScreens();

const Stack = createStackNavigator();

const App = () => {

    const [loaderIsEnded, setLoaderIsEnded] = useState(false);
    const [prog, setProg] = useState(0);
  
    const firstImageAnim = useRef(new Animated.Value(0)).current;
    const loaderImageAnim = useRef(new Animated.Value(0)).current;

    const firstLoaderImage = require('./src/assets/back/loader1.jpg');
    const loaderImage = require('./src/assets/back/loader2.jpg');

    useEffect(() => {
        Animated.timing(firstImageAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
        }).start(() => {
                Animated.timing(loaderImageAnim, {
                    toValue: 1,
                    duration: 2000,
                    useNativeDriver: true,
                }).start(() => {
                        setLoaderIsEnded(true);
                });
        });
    }, []);
  
    return (
        <ResetProvider>
        <NavigationContainer>
        {
                !loaderIsEnded ? (
                    <View style={{ flex: 1 }}>
                        <ImageBackground style={{ flex: 1 }} source={loaderImage}>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                                <Animated.View style={[styles.imageContainer, { opacity: firstImageAnim }]}>
                                    <ImageBackground source={firstLoaderImage} style={styles.image} />
                                </Animated.View>

                                <Animated.View style={[styles.imageContainer, { opacity: loaderImageAnim }]}>
                                    <ImageBackground source={loaderImage} style={styles.image} />
                                </Animated.View>
                                
                            </View>
                        </ImageBackground>
                    </View>
                ) : (
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
                )
            }
        </NavigationContainer>
        </ResetProvider>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    image: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default App;
