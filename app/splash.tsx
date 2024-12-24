import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useRouter } from 'expo-router'

const Splash = () => {
const router = useRouter()
useEffect(() => {
    const navigate = setTimeout(() => {
      // Navigating to the / (tabs) route after 2 seconds
      router.push('/(tabs)');
    }, 2000);

    // Clean up the timer on component unmount
    return () => clearTimeout(navigate);
  }, [router]);
  return (
    <View style = { styles.container}>
        <Image
        source ={require('../assets/images/netflix.png')}
        style = {styles.img}
        />

       
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center', 
        alignItems:'center',
        backgroundColor: '#121212',
    },
    img:{
        width:200,
        height:200
    }
})