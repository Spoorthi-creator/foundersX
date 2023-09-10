import React, { Component, useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, Platform, StatusBar, TextInput, Alert, TouchableOpacity, Text, ImageBackground } from 'react-native';
import firebase from 'firebase';
import { Feather,Entypo } from '@expo/vector-icons';


class SignInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'samyakwasekar830@gmail.com',
      password: 'SAMYAK123',
       secureTextEntry: true,
    };
  }

     changeSecureText = () => {

      this.setState({ secureTextEntry: !this.state.secureTextEntry })
  }

signIn = () => {
  const { email, password } = this.state;

  if (!email || !password) {
    Alert.alert('Error', 'Please fill in both email and password fields.');
    return;
  }

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      this.props.navigation.replace('Tabs');
    })
    .catch(error => {
      if (error.code === 'auth/invalid-email') {
        Alert.alert('Error', 'Invalid email.');
      } else if (error.code === 'auth/wrong-password') {
        Alert.alert('Error', 'Incorrect password.');
      } else if (error.code === 'auth/user-not-found') {
        Alert.alert('Error', 'User account not found.');
      } else {
        Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
      }
    });
};

  render() {
    const { navigation } = this.props;
    const { email, password } = this.state;

    return (
      <View style={styles.container}>
        <ImageBackground source={require('../assets/SignInScreen.png')} style={styles.image}>
          <View style={styles.contentContainer}>
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Feather name="at-sign" size={20} color="#00ADB5" style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Email ID"
                  value={email}
                  onChangeText={val => this.setState({ email: val })}
                />
              </View>
              <View style={styles.inputContainer}>
                <Feather name="lock" size={20} color="#00ADB5" style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                 
                  value={password}
                  onChangeText={val => this.setState({ password: val })}
                   secureTextEntry = {this.state.secureTextEntry}
                />
                 <TouchableOpacity
            onPress={this.changeSecureText}
            >
            {this.state.secureTextEntry? <Entypo name="eye-with-line" size={20} color="white" />: <Entypo name="eye" size={24} color="white" />}
            </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity onPress={() => navigation.replace('ForgotPassword')}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={this.signIn}>
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.replace('SignUp')}>
              <Text style={styles.signUpText}>New User? Sign Up!</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    width: '90%',
    marginTop: '60%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    marginBottom: 20,
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: "#00ADB5",
  },
  button: {
    backgroundColor: '#00ADB5',
    marginTop: 20,
    marginBottom: 20,
    padding: 12,
    borderRadius: 3,
    width: 200,
  },
  buttonText: {
    fontSize: 24,
    color: '#070618',
    textAlign: 'center',
  },
  forgotPasswordText: {
    fontSize: 15,
    marginTop: 10,
    marginLeft: 10,
    color: "#00ADB5",
  },
  signUpText: {
    textDecorationLine: 'underline',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 200,
    color: "#00ADB5",
  },
});

export default SignInScreen;