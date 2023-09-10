import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Text,
  Platform,
  StatusBar,
  ImageBackground,
} from 'react-native';

import firebase from 'firebase';
import { Feather,Entypo } from '@expo/vector-icons';
import db from '../config';
import Ionicon from 'react-native-vector-icons/Ionicons';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      email: '',
      password: '',
      confirmPassword: '',
      secureTextEntry: true,
    };
  }

     changeSecureText = () => {

      this.setState({ secureTextEntry: !this.state.secureTextEntry })
  }

  signUp = () => {
    const { email, password, confirmPassword, fullname } = this.state;

    if (!email || !password || !confirmPassword || !fullname) {
      alert('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((userCredential) => {
        db.collection('users').add({
          email: this.state.email,
          password: this.state.password,
          name: this.state.fullname,
        });

        alert('Successful User Sign Up');

        this.props.navigation.replace('Tabs');
      })
      .catch((error) => {
        var errorMessage = error.message;
        alert(errorMessage);
      });
  };

  render() {
    const { email, password, confirmPassword, fullname } = this.state;

    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/SignUpScreen.png')}
          style={styles.image}
        >
          <View style={styles.contentContainer}>
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Feather
                  name="user"
                  size={20}
                  color="#00ADB5"
                  style={styles.icon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Full name"
                  placeholderTextColor='#00ADB5'
                  onChangeText={(val) => this.setState({ fullname: val })}
                  value={this.state.fullname}
                />
              </View>

              <View style={styles.inputContainer}>
                <Feather
                  name="at-sign"
                  size={20}
                  color="#00ADB5"
                  style={styles.icon}
                />
                <TextInput
                  style={styles.input}
                  placeholderTextColor='#00ADB5'
                  placeholder="Email ID"
                  onChangeText={(val) => this.setState({ email: val })}
                  value={this.state.email}
                />
              </View>

              <View style={styles.inputContainer}>
                <Ionicon
                  name="key-outline"
                  size={20}
                  color="#00ADB5"
                  style={styles.icon}
                />
                <TextInput
                  style={styles.input}
                  placeholderTextColor='#00ADB5'
                  placeholder="Password"
                secureTextEntry = {this.state.secureTextEntry}
                  onChangeText={(val) => this.setState({ password: val })}
                  value={this.state.password}
                />
                 <TouchableOpacity
            onPress={this.changeSecureText}
            >
            {this.state.secureTextEntry? <Entypo name="eye-with-line" size={20} color="white" />: <Entypo name="eye" size={24} color="white" />}
            </TouchableOpacity>
              </View>

              <View style={styles.inputContainer}>
                <Feather
                  name="lock"
                  size={20}
                  color="#00ADB5"
                  style={styles.icon}
                />
                <TextInput
                  style={styles.input}
                  placeholderTextColor='#00ADB5'
                  placeholder="Confirm Password"
                  secureTextEntry = {this.state.secureTextEntry}
                  onChangeText={(val) =>
                    this.setState({ confirmPassword: val })
                  }
                  value={this.state.confirmPassword}
                />
              </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={this.signUp}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.props.navigation.replace('SignIn')}
            >
              <Text style={styles.existingUser}>Already have an account?</Text>
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
    marginTop: 50,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    marginBottom: 20,
    marginLeft: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: '#00ADB5',
  },
  icon: {
    marginRight: 10,
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
  existingUser: {
    textDecorationLine: 'underline',
    fontSize: 15,
    textAlign: 'center',
    color: '#00ADB5',
  },
});