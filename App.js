import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Start from './components/Start';
import Chat from './components/Chat';
import 'react-native-gesture-handler';

//create navigator
const Stack = createStackNavigator();

//start firebas & firestone
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// chat-app Firebase configuration
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
const auth = getAuth(app);

export { db, auth };

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
