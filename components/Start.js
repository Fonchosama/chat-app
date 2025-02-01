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

const Start = ({ navigation }) => {
  const [name, setName] = useState('');
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const colorStyles = [
    { color: '#090C08', styleKey: 'black' },
    { color: '#474056', styleKey: 'darkGray' },
    { color: '#8A95A5', styleKey: 'gray' },
    { color: '#B9C6AE', styleKey: 'lightGreen' },
  ]; // colors for the buttons

  const handleEnterChat = () => {
    if (name.trim()) {
      navigation.navigate('Chat', { userName: name, bgColor });
    } else {
      alert('Please write your name');
    }
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
          <TouchableOpacity style={styles.button} onPress={handleEnterChat}>
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
    // flex: 1,
    // height: '44%',
    // width: '88%',
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#fff',
    // position: 'absolute',
    // bottom: 20,
    // padding: 15,
    // backgroundColor: '#ffffff',
    backgroundColor: '#f2f2f2',

    width: '88%',
    height: '50%',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  header: {
    // flex: 1,
    // fontSize: 45,
    // fontWeight: '600',
    // marginBottom: 500,
    // color: '#FFFFFF',
    flex: 1,
    fontSize: 45,
    fontWeight: '600',
    color: '#FFFFFF',
    margin: 25,
  },
  input: {
    // width: '100%',
    // height: 70,
    // borderColor: '#ccc',
    // borderWidth: 3,
    // borderRadius: 5,
    // marginBottom: 20,
    // paddingLeft: 10,
    // fontSize: 16,
    // fontWeight: 300,
    // color: '#757083',
    // opacity: 0.5,
    // position: 'Absolute',
    // top: -40,
    width: '88%',
    borderColor: '#757083',
    borderRadius: 4,
    color: '#757083',
    fontSize: 16,
    fontWeight: '300',
    opacity: 50,
    padding: 15,
    borderWidth: 1,
    marginBottom: 10,
  },
  button: {
    // backgroundColor: '#757083',
    // paddingVertical: 20,
    // paddingHorizontal: 0,
    // width: '90%',
    // height: 60,
    // bottom: -30,
    alignItems: 'center',
    backgroundColor: '#757083',
    borderRadius: 4,
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
