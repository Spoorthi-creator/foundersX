import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,Alert,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Header } from 'react-native-elements';
import firebase from 'firebase';

import db from '../config';
import { ScrollView } from 'react-native-gesture-handler';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.uid,
      allProfiles: [],
    };
  }

  getProfiles = () => {
    db.collection('profiles').onSnapshot((snapshot) => {
      const allP = [];

      snapshot.docs.forEach((doc) => {
        const profile = doc.data();
        profile['docId'] = doc.id;
        allP.push(profile);
      });

      this.setState({ allProfiles: allP });
    });
  };

  componentDidMount() {
    this.getProfiles();
  }

   handleDelete = (profileId) => {
    Alert.alert(
      'Delete post',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed!'),
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => this.deleteProfile(profileId),
        },
      ],
      {cancelable: false},
    );
  };

  deleteProfile = async(id) =>{
    await db.collection("profiles").doc(id).delete().then(() => {
      alert("Profile successfully deleted!");
     
  }).catch((error) => {
      alert("Something went wrong!Try later");
  });
  this.getProfiles()
  }

  renderItem = ({ item }) => {
    if(firebase.auth().currentUser.uid == item.uid){
    return (
      <ScrollView>
      <TouchableOpacity
        style={styles.profileItem}
        onPress={() => {
          this.props.navigation.navigate('CofounderDetails', {cofounder:item})
        }}>
        
            <Text style={styles.details}>{item.fullName}</Text>
        <Text style={styles.details}>{item.emailAddress}</Text>
        <Text style={styles.details}>{item.bio}</Text>
        
            <TouchableOpacity
            onPress = {()=> this.handleDelete(item.docId)}
            style={{alignItems: 'center'}}
            >
              <AntDesign name="delete" size={24} color="red" />
            </TouchableOpacity>
       
      </TouchableOpacity>
      </ScrollView>
   
    );
      }
      else{
        return(
        <TouchableOpacity
        style={styles.profileItem}
        onPress={() => {
          this.props.navigation.navigate('CofounderDetails', {cofounder:item})
        }}>
        
            <Text style={styles.details}>{item.fullName}</Text>
        <Text style={styles.details}>{item.emailAddress}</Text>
        <Text style={styles.details}>{item.bio}</Text>
        </TouchableOpacity>
        )
      }
  };

  keyExtractor = (item, index) => index.toString();

  render() {
    return (
      <View style={styles.container}>
        <Header
          centerComponent={{
            text: 'Find your Co-Founder!',
            style: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
          }}
          backgroundColor="#00ADB5"
        />
        
        <View
          style={{
            flex: 1,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            marginTop: 10,
            padding: 15,
            backgroundColor: '#070618',
            marginBottom:40,
          }}>
          <FlatList
         scrollEnabled
            data={this.state.allProfiles}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
            
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070618',
  },
  profileItem: {
    width: '95%',
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
    borderColor: '#00ADB5',
  },
  details: {
    color: '#00ADB5',
    fontWeight: 'bold',
  },
});