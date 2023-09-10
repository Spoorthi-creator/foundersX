import * as React from 'react';
import {
  View,
  Text,
 
  StyleSheet,
  
} from 'react-native';
import firebase from 'firebase';

export default class Loading extends React.Component{
    componentDidMount(){
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.props.navigation.navigate('Tabs')
              var uid = user.uid;
              // ...
            } else {
                this.props.navigation.navigate('GetStarted')
            }
          });
          
    }
    render() {
        return (
          <View style={styles.container}>
            <Text
              style={{
                marginTop: 150,
                alignSelf: 'center',
                fontSize: 25,
                color: '#19969d',
                fontWeight: 'bold',
              }}>
              Loading .....
            </Text>
          </View>
        );
      }
    }
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: 'white',
      },
    });