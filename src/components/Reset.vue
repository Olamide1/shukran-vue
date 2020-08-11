<template>
  <div class="uk-container">
    <nav class="uk-navbar uk-navbar-container uk-margin">
      <div class="uk-navbar-left">
        <router-link class="uk-navbar-item uk-logo" to="/">Shukran</router-link>
      </div>
    </nav>

    <div class="uk-container-expand" align="center">
      <div class="uk-card fit uk-card-default uk-width-1-2@m uk-box-shadow-large uk-padding">
        <div class="uk-card-header">
          <div class="uk-grid-small uk-flex-middle" uk-grid>
            <div class="uk-width-expand" align="center">
              <h3 class="uk-card-title uk-margin-remove-bottom">Reset Password</h3>
            </div>
          </div>
        </div>

        <div class="uk-card-body">
          <div class="uk-margin">
            <input
              class="uk-input uk-border-rounded uk-form"
              v-model="username"
              type="text"
              placeholder="Username"
            />
          </div>
          <div class="uk-margin">
            <input
              class="uk-input uk-border-rounded uk-form"
              v-model="email"
              type="email"
              placeholder="Email"
            />
          </div>
          <div class="uk-margin">
            <div class="uk-inline">
              <a
                class="uk-form-icon uk-form-icon-flip"
                href="#"
                uk-icon="icon: unlock"
                @click="switchVisibility"
              ></a>
              <input
                class="uk-input uk-border-rounded uk-form uk-form-width-large"
                :type="passwordFieldType"
                v-model="password"
                placeholder="New Password"
              />
            </div>
          </div>

          <div class="uk-margin">
            <p>{{issue}}</p>
            <button
              class="uk-button uk-border-rounded uk-button-default uk-width-1-1"
              @click="resetMe"
            >{{reset}}</button>
          </div>
        </div>
        <div class="uk-card-footer" align="center">
          <router-link to="/accounts">Login</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
var md5 = require("md5");
export default {
  name: "reset",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      issue: "",
      reset: "Reset",
      passwordFieldType: "password",
    };
  },
  methods: {
    resetMe() {
      var username = this.username;
      var password = this.password;
      var email = this.email;
      this.reset = "Resetting...";
      axios
        .post(process.env.BASE_URL + "/api/resetpassword/", {
          username: username.toLowerCase().trim(),
          email: email,
        })
        .then((res) => {
          if (res.data.length == 0) {
            this.reset = "Reset";
            this.issue = "Username/Email incorrect!";
          } else {
            var id = res.data[0]._id;
            console.log(id);
            axios
              .post(process.env.BASE_URL + "/api/update/", {
                id: id,
                password: md5(password),
              })
              .then((resp) => {
                this.reset = "Reset";
                this.issue = "Password successfully reset, please login.";
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })
        .catch((err) => {
          console.log(err);
          this.reset = "Reset";
          this.issue = "Error connecting to server, please contact support!";
        });
    },
    switchVisibility() {
      this.passwordFieldType =
        this.passwordFieldType === "password" ? "text" : "password";
    },
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fit {
  width: 300px;
}
.uk-padding {
  padding: 10px;
}
.uk-navbar,
.uk-navbar-item,
.lead {
  background: transparent !important;
  color: #ffffff !important;
}
.uk-container {
  height: 110vh;
  background-image: linear-gradient(135deg, #d44d62 0%, #ff746c 100%);
}
.uk-card {
  border-radius: 5px;
  min-width: 40% !important;
}
.uk-input {
  border-width: 2px;
}
.uk-button {
  background-color: #ff5976 !important;
  color: #fff6fa;
}
</style>