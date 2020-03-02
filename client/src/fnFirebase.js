export function requestPermission(messaging) {
  return new Promise((resolve, reject) => {
    messaging
      .requestPermission()
      .then(function () {
        resolve()
      }).catch(function (err) {
        reject('Unable to get permission to notify.', err)
      })
  })
}

export function getToken(messaging) {
  return new Promise((resolve, reject) => {
    messaging
      .getToken()
      .then(function (currentToken) {
        if (currentToken) {
          resolve(currentToken)
        } else {
          reject("No Instance ID token available. Request permission to generate one.")
        }
      })
      .catch(function (err) {
        reject(err)
      });
  })
}

export function receivedMessage(messaging) {
  messaging
    .onMessage(function (payload) {
      console.log('Message received. ', payload)
      if (!("Notification" in window)) {
        alert("This browser does not support system notifications");
      }
      else if (Notification.permission === "granted") {
        var notification = new Notification(
          payload.data.title,
          {
            body: payload.data.body,
          });
        notification
      }
      else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {
          if (permission === "granted") {
            var notification = new Notification(
              payload.data.title,
              {
                body: payload.data.body,
              });
              notification
          }
        });
      }
    })
}