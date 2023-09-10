import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Button, StyleSheet, Modal, Alert ,Linking} from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Header } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config'
const EditProfile = () => {
  const navigation = useNavigation();
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const[docId,setDocId]=useState('');
  const userId= firebase.auth().currentUser ? firebase.auth().currentUser.email : "";
  const goBack = () => {
    navigation.goBack();
  };

  

  const closeConfirmation = () => {
    setShowConfirmation(false);
  };

useEffect(()=>{
  getUserDetails();
},[])

 const getUserDetails = () => {
    db.collection("users")
      .where("email", "==", userId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setEmail(doc.data().email);
          setName(doc.data().name);
          setPassword(doc.data().password);
          setDocId(doc.id);
         
        });
       
      })
      .catch((error) => {
        console.log("Error getting documents:", error);
      });
  };  

  const updateProfile=async()=>{
    try {
      await db.collection("users").doc(docId).update({
        name: name,
        email: email,
        password:password,
       
    });
    Alert.alert('Profile updated');
    } catch (error) {
      Alert.alert(error.message)
      
    }
    

       
}

  return (
    <View style={styles.container}>
       <Header
        centerComponent={{
          text: "Edit Profile",
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
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            placeholder="Your Email"
            style={styles.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
          />
           <TextInput
            placeholder="Your Password"
            style={styles.input}
            value={password}
            onChangeText={(text) => setPassword(text)}
            
          />
        
          <Button title="Update" onPress={updateProfile} color="#00ADB5" />
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

export default EditProfile;