import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Button, StyleSheet, Modal, Alert ,Linking} from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Header } from 'react-native-elements';
const FeedbackScreen = () => {
  const navigation = useNavigation();
  const [feedbackText, setFeedbackText] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const goBack = () => {
    navigation.goBack();
  };

  const sendFeedback = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    Linking.openURL('mailto:jonam134@gmail.com'+'?subject=Feedback - &body=Hi, this is - '+name+' , and I have this feedback - '+feedbackText+' on the application.I hope you consider them. ')

    console.log(`Sending feedback`);
    console.log(`User Name: ${name}`);
    console.log(`User Email: ${email}`);

    setShowConfirmation(true);
    setName("");
    setEmail("");
    setFeedbackText("");
  };

  const closeConfirmation = () => {
    setShowConfirmation(false);
  };

  return (
    <View style={styles.container}>
       <Header
        centerComponent={{
          text: "Feedback",
          style: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
        }}
        backgroundColor="#00ADB5">
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      </Header>
      <View style={styles.middleContent}>
        <View style={styles.feedbackContainer}>
          <TextInput
            placeholder="Your Name"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            placeholder="Your Email"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            placeholder="Type your feedback here"
            multiline
            style={styles.feedbackInput}
            value={feedbackText}
            onChangeText={setFeedbackText}
          />
          <Button title="Submit Feedback" onPress={sendFeedback} color="#00ADB5" />
        </View>
      </View>

      <Modal visible={showConfirmation} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Thank you for your feedback!</Text>
            <Button title="Close" onPress={closeConfirmation} color="#00ADB5" />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070618',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#070618',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    //top: 20,
  },
 
  headerText: {
    fontSize: 20,
    color: '#00ADB5',
  },
  middleContent: {
    flex: 1,
    justifyContent: 'center',
  },
  feedbackContainer: {
    padding: 16,
  },
  input: {
    height: 40,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    marginBottom: 10,
    color: '#070618',
  },
  feedbackInput: {
    height: 120,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    textAlignVertical: 'top',
    color: '#070618',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#070618',
  },
});

export default FeedbackScreen;