import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  image,
  ImageBackground,
} from 'react-native';

// Firebase import
import { signInAnonymously } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const Start = ({ navigation }) => {
  const [name, setName] = useState('');
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const auth = getAuth(); // get the authporization

  const colorStyles = [
    { color: '#090C08', styleKey: 'black' },
    { color: '#474056', styleKey: 'darkGray' },
    { color: '#8A95A5', styleKey: 'gray' },
    { color: '#B9C6AE', styleKey: 'lightGreen' },
  ]; // colors for the buttons

  const handleSignIn = () => {
    if (!name.trim()) {
      alert('Please enter your name');
      return;
    }

    signInAnonymously(auth) // 🔹 annonymous auth
      .then((userCredential) => {
        const user = userCredential.user;
        navigation.navigate('Chat', {
          userId: user.uid,
          userName: name,
          bgColor: bgColor,
        });
      })
      .catch((error) => console.error('Error signing in:', error));
  };

  return (
    <View style={styles.maincontainer}>
      <ImageBackground
        source={require('../assets/Background-image.png')}
        style={styles.background}
      >
        <Text style={styles.header}>Welcome to ChatApp</Text>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Your Name"
            value={name}
            onChangeText={setName}
          />
          <View>
            <Text style={styles.choosetext}>Choose Background Color:</Text>

            <View style={styles.colorContainer}>
              {colorStyles.map(({ color }) => (
                <TouchableOpacity
                  key={color}
                  style={[
                    styles.colorCircle,
                    { backgroundColor: color },
                    bgColor === color && styles.selectedColor,
                  ]}
                  onPress={() => setBgColor(color)}
                />
              ))}
            </View>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSignIn}>
            <Text style={styles.buttonText}>Start Chatting</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  container: {
    backgroundColor: '#f2f2f2',

    width: '88%',
    height: '50%',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 20,
    borderRadius: 15,
  },
  header: {
    flex: 1,
    fontSize: 45,
    fontWeight: '600',
    color: '#FFFFFF',
    margin: 25,
  },
  input: {
    width: '88%',
    borderColor: '#757083',
    borderRadius: 4,
    color: 'black',
    fontSize: 16,
    fontWeight: '300',

    padding: 15,
    borderWidth: 1,
    marginBottom: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#757083',
    borderRadius: 40,
    height: '20%',
    justifyContent: 'center',
    padding: 10,
    width: '88%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    alignItems: 'center',
  },

  choosetext: {
    textAlign: 'left',
    alignSelf: 'flex-start',
    top: -20,
    marginLeft: 20,
  },

  colorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  colorCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 10,
  },
  selectedColor: {
    borderWidth: 3,
    borderColor: '#000',
  },
  maincontainer: {
    flex: 1,
  },
});

export default Start;
