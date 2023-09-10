import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from 'react-native';
import firebase from 'firebase';
import { Feather } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }

  sendResetLink = () => {
    const { email } = this.state;

    if (email.trim() === '') {
      Alert.alert('Please enter your email.');
    } else {
      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          Alert.alert('Email for Password Reset sent!');
          this.props.navigation.replace('SignIn');
        })
        .catch((error) => {
          const errorMessage = error.message;
          Alert.alert(errorMessage);
        });
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={{ flexDirection: 'row', alignItems: 'flex-start' }}
          >
            <Feather
              name="chevron-back"
              size={19}
              color="#6A82FB"
              style={{ marginRight: 5 }}
            />
          </TouchableOpacity>
        </View>

        <ImageBackground
          source={require('../assets/ForgotPassword.png')}
          resizeMode="cover"
          style={styles.backgroundImage}
        >
          <View style={styles.textContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                keyboardType="email-address"
                onChangeText={(email) => {
                  this.setState({ email });
                }}
                value={this.state.email.trim()}
              />
            </View>
            <TouchableOpacity style={styles.box} onPress={this.sendResetLink}>
              <Icon name="send" size={20} color="white" style={styles.icon} />
              <Text style={styles.routeText}>Send Link</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: 'white',
    padding: 15,
    alignItems: 'flex-start',
    marginTop: 20,
  },
  textContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    marginBottom: 15,
    width: '100%',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    fontSize: 16,
  },
  box: {
    backgroundColor: '#6A82FB',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  routeText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  icon: {
    marginRight: 5,
  },
});
