React Native Mobile Chat App
Objective
Build a mobile chat application using React Native, enabling users to engage in real-time conversations, share images, and exchange location data.

Context
More and more people use their phones for daily tasks, such as shopping, creating to-do lists,
communicating with friends, scheduling meetings, and more. That's why many companies offer native
mobile versions of their web apps, or even skip creating a web app entirely.

Key Features
User-Friendly Interface: Intuitive design for seamless navigation and interaction.
Real-Time Chat: Instant message delivery and updates.
Image Sharing: Share images from the device gallery or directly from the camera.
Location Sharing: Conveniently share real-time location information with other users.
Offline Capabilities: Access cached messages when offline.
Accessibility: Designed to be accessible to users with visual impairments.

User Stories
As a new user, I want to be able to easily enter a chat room so I can quickly start talking to my
friends and family.
● As a user, I want to be able to send messages to my friends and family members to exchange
the latest news.
● As a user, I want to send images to my friends to show them what I’m currently doing.
● As a user, I want to share my location with my friends to show them where I am.
● As a user, I want to be able to read my messages offline so I can reread conversations at any
time.
● As a user with a visual impairment, I want to use a chat app that is compatible with a screen
reader so that I can engage with a chat interface.

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
