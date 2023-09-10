import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
export default class AboutApp extends React.Component{
  render(){
  return (
    <View style={styles.container}>
      <Text style={styles.title}>AboutApp</Text>
    </View>
  )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  }
});