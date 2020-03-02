import Vue from 'vue'
import App from './App.vue'
const axios = require('axios')
const instance = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 100000,
});
Vue.prototype.$api = instance

Vue.config.productionTip = false
const firebase = require("firebase/app");
require("firebase/messaging");

const config = {
  apiKey: "AIzaSyAmqr3cKkNtAo0Z6iAvX21kasXrJEKfnUw",
  authDomain: "testfirestore-ec405.firebaseapp.com",
  databaseURL: "https://testfirestore-ec405.firebaseio.com",
  projectId: "testfirestore-ec405",
  storageBucket: "testfirestore-ec405.appspot.com",
  messagingSenderId: "615502815676",
  appId: "1:615502815676:web:5ca4f18cd976ec0a870bb9"
};
firebase.initializeApp(config);
const messaging = firebase.messaging();

messaging.usePublicVapidKey(
  "BOaJS5EDm_76jEe1ni2ECWyaKwbwRP7hLwsdcN3XnWgQRN0F0K46a8dqDwAsf5Q8f2_H8jvrcT9qOBS2DNqmlKw"
);
Vue.prototype.$firebase = messaging
// let getTokenFcm = messaging => {
//   messaging
//     .getToken()
//     .then(function(currentToken) {
//       if (currentToken) {
//         console.log(currentToken)
//       } else {
//         console.log(
//           "No Instance ID token available. Request permission to generate one."
//         );
//       }
//     })
//     .catch(function(err) {
//       console.log("An error occurred while retrieving token. ", err);
//     });
// };

// let receivedMessage = (messaging) => {
//   messaging.onMessage(function(payload) {
//     console.log('Message received. ', payload)
//     if (!("Notification" in window)) {
//       alert("This browser does not support system notifications");
//     }
//     else if (Notification.permission === "granted") {
//       var notification = new Notification(
//       payload.data.title, 
//       {
//           body: payload.data.body,
//       });
//     }
//     else if (Notification.permission !== 'denied') {
//       Notification.requestPermission(function (permission) {
//         if (permission === "granted") {
//           var notification = new Notification(
//           payload.data.title, 
//           {
//               body: payload.data.body,
//           });
//         }
//       });
//     }
//   })
// }



// messaging.requestPermission().then(function () {
//   messaging.getToken().then(function (currentToken) {
//     if (currentToken) {
//       console.log(currentToken)
//       // console.log(currentToken)
//       receivedMessage(messaging)
//       // setBackgroundFcm(messaging)
//       // sendTokenToServer(currentToken)
//     } else {
//       // updateUIForPushPermissionRequired();
//       // setTokenSentToServer(false);
//       console.log('No Instance ID token available. Request permission to generate one.')
//     }
//   }).catch(function (err) {
//     // setTokenSentToServer(false);
//     console.log('An error occurred while retrieving token. ', err)
//   })
// }).catch(function (err) {
//   console.log('Unable to get permission to notify.', err)
// })

// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker
//     .register(`${process.env.BASE_URL}sw.js`)
//     .then(registration => {
//       messaging.useServiceWorker(registration);

//       messaging.requestPermission().then(function () {
//         messaging.onMessage(function(payload) {
//           console.log(payload)
//           if (!("Notification" in window)) {
//             alert("This browser does not support system notifications");
//           } else if (Notification.permission === "granted") {
//             var notification = new Notification(
//             payload.data.title, 
//             {
//               body: payload.data.body,
//             });
//           } else if (Notification.permission !== 'denied') {
//             Notification.requestPermission(function (permission) {
//               if (permission === "granted") {
//                 var notification = new Notification(
//                 payload.data.title, 
//                 {
//                   body: payload.data.body,
//                 });
//               }
//             });
//           }
//         })
//       }).catch(function (err) {
//         console.log('Unable to get permission to notify.', err)
//       })

      
//       // window.messaging = messaging;
//       Vue.prototype.$firebase = messaging
//     })
//     .catch(err => alert("Service Worker Error", err));
// } else {
//   alert("Push not supported.");
// }


new Vue({
  render: h => h(App),
}).$mount('#app')
