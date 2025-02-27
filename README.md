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

Follow these steps to set up the project locally:

1. Clone the Repository
   git clone https://github.com/your-username/chat-app.git

cd chat-app

2. Use Node.js Version 18
   Ensure you have Node.js v18 installed. If you use nvm, switch to Node 18 with:

nvm use 18

If you don't have nvm, install Node.js v18 from Node.js website.

3. Install Dependencies
   Install necessary dependencies by running:

npm install

4. Install Expo CLI
   If you don't already have the Expo CLI globally, install it using:

npm install -g expo-cli

5. Configure Firebase
   Go to the Firebase console.
   Create a new Firebase project.
   Enable Firestore and Firebase Storage:
   In Firestore and Storage, set the rules as follows during development:
   '{ "rules": { ".read": "auth != null", ".write": "auth != null" } }'

Add a web app to your project and copy the config.
Add the Firebase config to your project in the firebaseConfig object in App.js:
'const firebaseConfig = { apiKey: "YOUR_API_KEY", authDomain: "YOUR_AUTH_DOMAIN", projectId: "YOUR_PROJECT_ID", storageBucket: "YOUR_STORAGE_BUCKET", messagingSenderId: "YOUR_MESSAGING_SENDER_ID", appId: "YOUR_APP_ID" };'

6. Run the App Locally
   Start the development server using:

npm run start
