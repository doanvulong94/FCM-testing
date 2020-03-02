const express = require('express')
const app = express()
const redis = require("redis");
const client = redis.createClient();
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const port = 8000

const admin = require("firebase-admin")
const serviceAccount = require("./firebase-conf.json")

 
client.on("error", error => { console.error(error) })

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://testfirestore-ec405.firebaseio.com"
});

app.post('/generate', jsonParser, (req, res) => {
  let a = client.set(req.body.name, req.body.token, redis.print);
  res.status(200).json({ status: true, message: 'success', data: a })
})

app.post('/message', jsonParser, (req, res) => {
  // res.status(200).json({ status: true, message: 'success', data: {} })
  let message = {
    data: {
      title: req.body.title,
      body: req.body.body
    }
  }
  if (req.body.name !== undefined) {
    client.get(req.body.name, function(err, reply) {
      message.token = reply
      admin.messaging().send(message).then((response) => {
        res.status(200).json({ status: true, message: 'success', data: response })
      })
      .catch((error) => {
        console.log('Error sending message:', error);
      });
    });
  }
  // if (req.body.token !== undefined) {
  //   message.token = req.body.token
  // } else if (req.body.condition !== undefined) {
  //   message.condition = req.body.condition
  // }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))