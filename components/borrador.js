app 

import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

// Components
import Start from './components/Start';
import Chat from './components/Chat';

// Crear navegador
const Stack = createStackNavigator();

// Network connectivity
import { useNetInfo } from '@react-native-community/netinfo';
import { Alert } from 'react-native';

// Firebase
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  disableNetwork,
  enableNetwork,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyDo9gvgyv61m5ip4SrJPAqUUeW9xjHqS_U',
  authDomain: 'chat-app-e3cb8.firebaseapp.com',
  projectId: 'chat-app-e3cb8',
  storageBucket: 'chat-app-e3cb8.firebasestorage.app',
  messagingSenderId: '636563977439',
  appId: '1:636563977439:web:e194f690348eb9c79a256a',
};

// Inicializar Firebase (esto va fuera de la función)
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Exportar las instancias de Firebase correctamente
export { db, auth };

const App = () => {
  const connectionStatus = useNetInfo();

  // Manejo de conexión
  useEffect(() => {
    if (!connectionStatus.isConnected) {
      Alert.alert('Connection Lost!');
      disableNetwork(db);
    } else {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => (
            <Chat
              isConnected={connectionStatus.isConnected}
              db={db}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

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
  onSnapshot,
  addDoc,
  Timestamp,
} from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Chat = ({ route, navigation, isConnected }) => {
  const { userName, bgColor, name, userId } = route.params;
  const [messages, setMessages] = useState([]);
  const db = getFirestore(); // Firebase Firestore

  const loadCachedMessages = async () => {
    const cachedMessages = (await AsyncStorage.getItem('messages')) || [];
    setMessages(JSON.parse(cachedMessages));
  };

  // realtime messages

  let unsubMessages;

  useEffect(() => {
    if (isConnected === true) {
      if (unsubMessages) unsubMessages();
      unsubMessages = null;

      const q = query(collection(db, 'messages'), where('uid', '==', userIDd);
      unsubMessages = onSnapshot(q, (documentsSnapshot) => {
        let newMessages = [];
        documentsSnapshot.forEach((doc) => {
          newMessages.push({ id: doc.id, ...doc.data() });
        });
        cacheMessages(newMessages);
        setMessages(newMessages);
      });
    } else loadCachedMessages();

    // Clean up code
    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, [isConnected]);

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