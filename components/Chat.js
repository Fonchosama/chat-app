import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  Timestamp,
} from 'firebase/firestore';

const Chat = ({ route, navigation }) => {
  const { userName, bgColor, name, userId } = route.params;
  const [messages, setMessages] = useState([]);
  const db = getFirestore(); // Firebase Firestore

  // realtime messages
  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newMessages = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          _id: doc.id,
          text: data.text,
          createdAt: data.createdAt.toDate(), // Firestore Timestamp to JS Date
          user: data.user,
        };
      });
      setMessages(newMessages);
    });

    return () => unsubscribe();
  }, []);

  const onSend = (newMessages) => {
    const message = newMessages[0];
    const { text, user } = message;

    // firestone meesage
    addDoc(collection(db, 'messages'), {
      text,
      createdAt: Timestamp.fromDate(new Date()),
      user,
    });
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: { backgroundColor: '#000' },
          left: { backgroundColor: '#FFF' },
        }}
      />
    );
  };

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, [name, navigation]);

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Text style={styles.header}>Bienvenido al chat, {userName}!</Text>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={onSend}
        user={{
          _id: userId,
          name: userName,
        }}
        style={{ marginTop: 1000 }}
      />
      {Platform.OS === 'android' ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    top: 30,
  },
});

export default Chat;
