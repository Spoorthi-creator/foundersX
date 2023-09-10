import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert,Image } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Assuming you are using Expo
import firebase from "firebase";
import db from "../config";
import { Header } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: firebase.auth().currentUser ? firebase.auth().currentUser.email : "",
      firstName: "",
      docId:'',
      image:'',
      email:firebase.auth().currentUser.email,
    };
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log('Result', result.assets[0].uri);

    if (!result.cancelled) {
      this.setState({ profilePicture: result.assets[0].uri });
      this.uploadImage(result.assets[0].uri);
    }
  };

  uploadImage = async (imageUri) => {
    try {
      // Create a blob from the image URI
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function () {
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', imageUri, true);
        xhr.send(null);
      });

      await firebase
        .storage()
        .ref()
        .child('usersP/' + this.state.email)
        .put(blob);

      this.fetchImage();
    } catch (error) {
      console.log(error);
    }
  };

  fetchImage = async () => {
    try {
      const url = await firebase
        .storage()
        .ref()
        .child('usersP/' + this.state.email)
        .getDownloadURL();
      this.setState({ image: url });
    } catch (e) {
      console.log(e);
    }
  };


  componentDidMount() {
   this.fetchImage();
    this.getUserDetails();
  }

  getUserDetails = () => {
    db.collection("users")
      .where("email", "==", this.state.userId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.setState({
            firstName: doc.data().name,
          });
          this.setState({docId:doc.id})
        });
      })
      .catch((error) => {
        console.log("Error getting documents:", error);
      });
  };

  signoutUser = () => {
    try {
      firebase.auth().signOut().then(() => {
        this.props.navigation.replace("GetStarted");
      }).catch((error) => {
        console.log(error);
        Alert.alert("An error occurred. Please try again later.");
      });
    } catch (e) {
      console.log(e);
      Alert.alert("An error occurred. Please try again later.");
    }
  };

  deleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action is irreversible.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => this.confirmDeleteAccount(),
        },
      ],
      { cancelable: false }
    );
  };

  confirmDeleteAccount = async() => {
    const user = firebase.auth().currentUser;

    if (user) {

     await user.delete().then(() => {
       db.collection("users").doc(this.state.docId).delete();
          alert("Profile successfully deleted!");
         
          this.props.navigation.replace("GetStarted");
      
        
      }).catch((error) => {
        console.log(error);
        Alert.alert("An error occurred. Please try again later.");
      });

    //   await db.collection("users").doc(this.state.docId).delete().then(() => {
    //     alert("Profile successfully deleted!");
    //     this.props.navigation.replace("GetStarted");
       
    // }).catch((error) => {
    //     alert("Something went wrong!Try later");
    // });
    }


  };

  navigateToScreen = (screenName) => {
    this.props.navigation.navigate(screenName);
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#070618" }}>
        <Header
          centerComponent={{
            text: 'Settings',
            style: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
          }}
          backgroundColor="#00ADB5"
        />
        <TouchableOpacity  onPress={this.pickImage}
                style={{  alignItems: 'center' }}>
 <Image
          source={{ uri: this.state.image }}
          
          style={{ width: 100, height: 100 ,alignSelf:'center',borderRadius:80,borderWidth:2,borderColor:'white',margin:15}}
        />
        </TouchableOpacity>
        <View style={styles.userInfoContainer}>
          <Text style={styles.userInfoText}>{this.state.firstName}</Text>
          <Text style={styles.userInfoText2}>{this.state.userId}</Text>
        </View>

        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => this.navigateToScreen("AboutApp")}
          >
            <Ionicons name="phone-portrait-outline" size={24} color="#00ADB5" />
            <Text style={styles.menuItemText}>About App</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => this.navigateToScreen("SendFeedback")}
          >
            <Ionicons name="mail-outline" size={24} color="#00ADB5" />
            <Text style={styles.menuItemText}>Send Feedback</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => this.navigateToScreen("EditProfile")}
          >
            <Ionicons name="create-outline" size={24} color="#00ADB5" />
            <Text style={styles.menuItemText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => this.signoutUser()}
          >
            <Ionicons name="log-out-outline" size={27} color="#00ADB5" />
            <Text style={styles.menuItemText}>Sign Out</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => this.deleteAccount()}
          >
            <Ionicons name="trash-outline" size={24} color="#FF6B6B" />
            <Text style={styles.menuItemText}>Delete Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  userInfoContainer: {
    flex: 0.2,
    alignItems: "center",
    padding: 10,
  },
  userInfoText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#00ADB5",
  },
  userInfoText2: {
    fontSize: 16,
    color: "#00ADB5",
  },
  menuContainer: {
    flex: 0.8,
    padding: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#00ADB5",
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  menuItemText: {
    color: "#00ADB5",
    fontSize: 16,
    marginLeft: 10,
  },
});
