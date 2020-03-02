// /**
//  * Check out https://googlechromelabs.github.io/sw-toolbox/ for
//  * more info on how to use sw-toolbox to custom configure your service worker.
//  */

importScripts('https://www.gstatic.com/firebasejs/7.9.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.9.1/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyAmqr3cKkNtAo0Z6iAvX21kasXrJEKfnUw",
  authDomain: "testfirestore-ec405.firebaseapp.com",
  databaseURL: "https://testfirestore-ec405.firebaseio.com",
  projectId: "testfirestore-ec405",
  storageBucket: "testfirestore-ec405.appspot.com",
  messagingSenderId: "615502815676",
  appId: "1:615502815676:web:5ca4f18cd976ec0a870bb9"
});

const messaging = firebase.messaging();

// messaging.onMessage((payload) => {
//   console.log('Message received. ', payload);
// });

messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: '/firebase-logo.png'
  }

  return self.registration.showNotification(notificationTitle, notificationOptions);
});
