import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Chat = ({ route }) => {
  const { userName, bgColor } = route.params;

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Text style={styles.header}>Bienvenido al chat, {userName}!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Chat;
