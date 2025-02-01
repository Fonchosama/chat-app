About Chat App with React Native:
To build a chat app for mobile devices using React Native. The app will
provide users with a chat interface and options to share images and their
location

Features and Requirements:
Key Features:
A page where users can enter their name and choose a background color for the chat screen before joining the chat.
A page displaying the conversation, as well as an input field and submit button.
The chat must provide users with two additional communication features: sending images and location data.
Data gets stored online and offline.
Technologies Used:
React Native
Expo
Expo ImagePicker
Expo Location
Google Firestore/Firebase
Gifted Chat Library
Android Studio
Dependencies:
"@react-navigation/native": "^7.0.14",
"@react-navigation/native-stack": "^7.2.0",
"@react-navigation/stack": "^7.1.1",
"expo": "~52.0.28",
"expo-status-bar": "~2.0.1",
"react": "18.3.1",
"react-native": "0.76.6",
"react-native-gesture-handler": "^2.22.1",
"react-native-reanimated": "^3.16.7",
"react-native-safe-area-context": "^4.12.0",
"react-native-screens": "~4.4.0",
"react-native-svg": "^15.11.1",
"react-native-svg-transformer": "^1.5.0",
"react-native-vector-icons": "^10.2.0"
Prerequisites
Node.js
Google Firestore/Firebase
create an account and a new project
obtain the configuration code, and add it to App.js:
set up the database under build --> Firestore Database
activate storage
change rules to: allow read, write: if true
Start the expo project
npx expo start
Testing Options
download and connect the expo app on your mobile device
Android Studio (android)
a
