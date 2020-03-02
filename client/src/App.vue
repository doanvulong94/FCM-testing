<template>
  <div id="app">
    <div>
      <div>
        <input type="text" placeholder="Name" v-model="name" />
      </div>
      <!-- <div>
        <input type="text" placeholder="Topic" v-model="topic" />
      </div> -->
      <button @click="generateToken">GenarateToken</button>
      <p>token</p>
      <p>{{token}}</p>
    </div>
    <div>
      
      <div>
        <input type="text" placeholder="title" v-model="title" />
      </div>
      <div>
        <input type="text" placeholder="body" v-model="body" />
      </div>
      <div>
        <input type="text" placeholder="Send who" v-model="send" />
      </div>
      <button @click="sendMess">Send</button>
    </div>
  </div>
</template>

<script>
import * as fnFirebase from './fnFirebase'

export default {
  name: "App",
  data() {
    return {
      token: "",
      name: "",
      topic: "",
      title: "",
      body: "",
      send: "",
    };
  },
  methods: {
    generateToken() {
      if (this.name === "") {
        alert("input your name and generate token");
      } else {
        if ("serviceWorker" in navigator) {
          navigator.serviceWorker
            .register(`${process.env.BASE_URL}sw.js`)
            .then(registration => {
              this.$firebase.useServiceWorker(registration);
              fnFirebase.requestPermission(this.$firebase)
                .then(() => {
                  fnFirebase.getToken(this.$firebase)
                  .then((token) => {
                    this.token = token
                    this.sendServer()
                  })
                  .catch(err => alert(err)) 
                })
                .catch(err => alert(err))
            })
            .catch(err => alert("Service Worker Error", err));
        } else {
          alert("Push not supported.");
        }
      }
    },

    sendServer() {
      if (this.token === "" || this.name === "") {
        alert("input your name and generate token");
      } else {
        this.$api
          .post("/generate", { token: this.token, name: this.name })
          .then(res => {
            alert(res.data.message)
            fnFirebase.receivedMessage(this.$firebase)
          })
          .catch(err => { alert(err) });
      }
    },

    sendMess() {
      if (this.send === "") {
        alert("input user name received");
      } else {
        this.$api
          .post("/message", { title: this.title, body: this.body, name: this.send })
          .then(res => {
            alert(res.data.message)
          })
          .catch(err => { alert(err) });
      }
    },

    refreshToken() {
      let that = this;
      this.$firebase.onTokenRefresh(function() {
        this.$firebase
          .getToken()
          .then(function(currentToken) {
            that.token = currentToken.toString();
          })
          .catch(function(err) {
            that.token = err.toString();
          });
      });
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
