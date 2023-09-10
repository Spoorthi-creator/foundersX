import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from 'react-native-elements';

export default function CofounderDetails({ route, navigation }) {
  const cofounder = route.params.cofounder;

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>

      
      <Header
        centerComponent={{
          text: cofounder.fullName,
          style: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
        }}
        backgroundColor="#00ADB5">
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      </Header>
     
      
      <Image source={{ uri: cofounder.photo }} style={styles.profileImage} />
      <View style={styles.profileInfo}>
        <View style={styles.infoRow}>
          <Text style={styles.heading}>Bio: </Text>
          <Text style={styles.text}>{cofounder.bio}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.heading}>Email: </Text>
          <Text style={styles.text}>{cofounder.emailAddress}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.heading}>Experience: </Text>
          <Text style={styles.text}>{cofounder.experience}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.heading}>Skills: </Text>
          <Text style={styles.text}>{cofounder.skills}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.heading}>Goals: </Text>
          <Text style={styles.text}>{cofounder.goals}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.heading}>Qualities in a Co-Founder: </Text>
          <Text style={styles.text}>{cofounder.qualitiesInCofounder}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.heading}>Vision: </Text>
          <Text style={styles.text}>{cofounder.vision}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.heading}>Availability: </Text>
          <Text style={styles.text}>{cofounder.availability}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.heading}>LinkedIn Profile: </Text>
          <Text style={styles.text}>{cofounder.linkedInProfile}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070618',
   // paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    //top: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginTop: 20,
    alignSelf: 'center',
  },
  profileInfo: {
    marginTop: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  heading: {
    color: '#00ADB5',
    fontWeight: 'bold',
    fontSize: 16,
  },
  text: {
    color: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    flex: 1,
  },
});
