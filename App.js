import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Start from './components/Start';
import Chat from './components/Chat';
import 'react-native-gesture-handler';

// Firebase config and initialization
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  disableNetwork,
  enableNetwork,
} from 'firebase/firestore';
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth';

// Import AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import NetInfo for connectivity
import { useNetInfo } from '@react-native-community/netinfo';

// Create navigator
const Stack = createStackNavigator();

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDo9gvgyv61m5ip4SrJPAqUUeW9xjHqS_U',
  authDomain: 'chat-app-e3cb8.firebaseapp.com',
  projectId: 'chat-app-e3cb8',
  storageBucket: 'chat-app-e3cb8.firebasestorage.app',
  messagingSenderId: '636563977439',
  appId: '1:636563977439:web:e194f690348eb9c79a256a',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initialize Firebase Auth with persistence using AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const App = () => {
  const netInfo = useNetInfo();
  const [isConnected, setIsConnected] = useState(true);

  // Detect network connection and enable/disable Firestore
  useEffect(() => {
    if (netInfo.isConnected) {
      setIsConnected(true);
      enableNetwork(db);
    } else {
      setIsConnected(false);
      disableNetwork(db);
    }
  }, [netInfo.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => <Chat {...props} isConnected={isConnected} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
