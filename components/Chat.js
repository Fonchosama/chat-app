import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  Timestamp,
  disableNetwork,
  enableNetwork,
} from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { useNetInfo } from '@react-native-community/netinfo'; // Import for network info
import CustomActions from './CustomActions'; //import custom actions
import MapView from 'react-native-maps';

const Chat = ({ route, navigation }) => {
  const { userName, bgColor, name, userId } = route.params;
  const [messages, setMessages] = useState([]);
  const db = getFirestore(); // Firebase Firestore

  const connectionStatus = useNetInfo(); // Get network status

  // Monitor network connectivity and disable/enable Firestore accordingly
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      // Check if disconnected
      Alert.alert('Connection Lost!'); // Alert when connection is lost
      disableNetwork(db); // Disable Firestore network when offline
    } else if (connectionStatus.isConnected === true) {
      // Check if connected
      enableNetwork(db); // Enable Firestore network when online
    }
  }, [connectionStatus.isConnected, db]); // Track network status changes

  // Load messages from Firestore or AsyncStorage based on connectivity
  useEffect(() => {
    const loadMessages = async () => {
      if (connectionStatus.isConnected) {
        // If connected, fetch messages from Firestore
        const q = query(
          collection(db, 'messages'),
          orderBy('createdAt', 'desc')
        );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const newMessages = querySnapshot.docs.map((doc) => ({
            _id: doc.id,
            text: doc.data().text || null,
            location: doc.data().location || null,
            createdAt: doc.data().createdAt.toDate(),
            user: doc.data().user,
          }));

          setMessages(newMessages); // Update state with new messages
        });

        return () => unsubscribe();
      } else {
        // If offline, load messages from AsyncStorage
        const storedMessages = await AsyncStorage.getItem('messages');
        if (storedMessages) {
          setMessages(JSON.parse(storedMessages)); // Load messages from AsyncStorage
        }
      }
    };

    // Load messages on network status change
    loadMessages();
  }, [connectionStatus.isConnected, db]);

  const onSend = (newMessages) => {
    const message = newMessages[0];

    // Update state immediately when a new message is sent (for better UX)
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );

    // Add new message to Firestore
    if (connectionStatus.isConnected) {
      addDoc(collection(db, 'messages'), {
        text: message.text || '',
        location: message.location || null,
        createdAt: Timestamp.fromDate(new Date()),
        user: message.user,
      });
    } else {
      // Handle offline message sending (if desired, store in AsyncStorage as well)
      AsyncStorage.setItem('pendingMessage', JSON.stringify(newMessages));
    }
  };

  // Disable InputToolbar when offline
  const renderInputToolbar = (props) => {
    if (connectionStatus.isConnected) {
      return <InputToolbar {...props} />;
    } else {
      return null; // Do not show InputToolbar when offline
    }
  };

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, [name, navigation]);

  const renderCustomActions = (props) => {
    console.log(props);
    return (
      <CustomActions
        onSend={(msg) => onSend([msg])}
        user={{ userId, userName }}
        {...props}
      />
    );
  };

  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{ width: 150, height: 100, borderRadius: 15, margin: 3 }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922, // zoom level
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  };

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Text style={styles.header}>Welcome to the chat, {userName}!</Text>
      <GiftedChat
        messages={messages}
        renderBubble={(props) => (
          <Bubble
            {...props}
            wrapperStyle={{
              right: { backgroundColor: '#000' },
              left: { backgroundColor: '#FFF' },
            }}
          />
        )}
        renderCustomView={renderCustomView}
        onSend={onSend}
        user={{
          _id: userId,
          name: userName,
        }}
        renderInputToolbar={renderInputToolbar} // Use custom InputToolbar render
        renderActions={renderCustomActions}
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
