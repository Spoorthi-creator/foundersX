import React from 'react';
import { ImageBackground, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const GetStarted = ({ navigation }) => {


  const handleSignIn = () => {
    navigation.navigate('SignIn');
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/GetStartedScreen.png')}
        style={styles.image}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleSignIn} style={styles.button}>
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSignUp} style={styles.button}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },

  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: '10%',
  },

  buttonContainer: {
    alignItems: 'center',
  },

  button: {
    alignItems: 'center',
    backgroundColor: '#00ADB5',
    marginBottom: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 3,
    height: 55,
    width: 150,
  },
  buttonText: {
    fontSize: 25,
    color: '#070618',
    textAlign: 'center',
  },
});

export default GetStarted;
