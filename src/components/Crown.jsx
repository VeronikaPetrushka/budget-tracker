import React from "react"
import { View, Image, StyleSheet, Dimensions } from "react-native"
import LinearGradient from 'react-native-linear-gradient';

const { height, width } = Dimensions.get('window');

const Crown = () => {

    return (
        <View style={styles.container}>
            <View style={styles.imgContainer}>
                <Image style={styles.image} source={require('../assets/decor/crown.png')}/>
                <LinearGradient
                    colors={['#c77a12', '#FFFFFF00']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={[styles.gradient, { top: 0 }]}
                />
                
                <LinearGradient
                    colors={['#FFFFFF00', '#1d0d46']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={[styles.gradient, { bottom: 0 }]}
                />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    imgContainer: {
        width: '100%',
        height: width * 1.07,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: height * 0.034
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    gradient: {
        position: 'absolute',
        width: '100%',
        height: '20%',
        zIndex: 1,
    }
})

export default Crown;