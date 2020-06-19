<template>
    <div class="uk-container">
       <nav class="uk-navbar uk-navbar-container uk-margin">
    <div class="uk-navbar-left">
     <router-link class="uk-navbar-item uk-logo" to="/">Shukran</router-link>
    </div>
    </nav>
    <div class="uk-container-expand" align="center">
      <div class="uk-card uk-card-default uk-width-1-2@m uk-box-shadow-large uk-padding" v-if="loginbutton == true">
    <div class="uk-card-header">
        <div class="uk-grid-small uk-flex-middle" uk-grid>
            <div class="uk-width-expand"  align="center">
                <h3 class="uk-card-title uk-margin-remove-bottom">Login</h3>
            </div>
        </div>
    </div>
    <div class="uk-card-body">
      <div class="uk-margin">
        <input class="uk-input" v-on:keyup.enter="login" data-uk-tooltip title="Your username, NOT email." v-model="username" type="text" placeholder="Username">
      </div>
      <div class="uk-margin">
        <div class="uk-inline">
         <input v-on:keyup.enter="login" data-uk-tooltip title="***** or NOT" class="uk-input uk-form uk-width-1-1" v-model="password" :type="loginPasswordFieldType" placeholder="Password">
         <a class="uk-form-icon uk-form-icon-flip" href="#!" v-bind:uk-icon="loginPasswordIcon" @click="switchLoginVisibility"></a>
        </div>
      </div>

      <div class="uk-margin">
         <p>{{issue}}</p>
        <button class="uk-button uk-button-default uk-width-1-1" @click="login">{{loginbtn}}</button>
      </div>
     
    </div>
    <div class="uk-card-footer"  align="center">
        <a @click="loginbutton = false" class="uk-button-text">Sign up</a> | 
        <router-link to="/resetpassword">Reset Password</router-link>
    </div>
  </div>


  <div v-else>
    <div class="uk-card uk-card-default uk-width-1-2@m">
       <div class="uk-card-header">
        <div class="uk-grid-small uk-flex-middle" uk-grid>
            <div class="uk-width-expand"  align="center">
                <h3 class="uk-card-title uk-margin-remove-bottom">Signup</h3>
            </div>
        </div>
    </div>

    <div class="uk-card-body uk-box-shadow-large uk-padding">
      <div class="uk-margin">
        <input v-on:keyup.enter="signup" class="uk-input uk-form" data-uk-tooltip title="Basically your brand name. What name do name do your content consumers recognise you with, please no spaces" v-model="username" type="text" placeholder="Username">
      </div>
      <div class="uk-margin">
         <input v-on:keyup.enter="signup" class="uk-input uk-form" data-uk-tooltip title="NG laws require us to have this so we can verify and pay to your account. No one else sees it so..." v-model="fullname" type="text" placeholder="Fullname">
      </div>
      <div class="uk-margin">
         <input v-on:keyup.enter="signup" class="uk-input uk-form" data-uk-tooltip title="That main email you open often" v-model="email" type="email" placeholder="Email">
      </div>
      <div class="uk-margin">
        <div class="uk-inline">
         <input v-on:keyup.enter="signup" data-uk-tooltip title="Enter a memorable secure password" class="uk-input uk-form uk-width-1-1" :type="signupPasswordFieldType" v-model="password" placeholder="Password">
         <a class="uk-form-icon uk-form-icon-flip" href="#!" v-bind:uk-icon="signupPasswordIcon" @click="switchSignupVisibility"></a>
        </div>
      </div>

      <div class="uk-margin">
          <p>{{issue}}</p>
        <button class="uk-button uk-button-default uk-width-1-1" @click="signup">{{signupbtn}}</button>
        <br>
           <a @click="loginbutton = true" class="uk-button-text">Login</a>
         
      </div>
    </div>

    </div>
  </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
var md5 = require('md5')
export default {
  name: 'hello',
  data () {
    return {
      loginbutton: true,
      username:'',
      password:'',
      loginbtn:'Login',
      fullname: '',
      signupbtn: 'Signup',
      issue: '',
      email: '',
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      loginPasswordFieldType: 'password',
      signupPasswordFieldType: 'password',
      loginPasswordIcon: "icon: unlock",
      signupPasswordIcon: "icon: unlock",
    }
  },
  methods: {
    login(){
      if (this.username == '' || this.password == '') {
        this.issue = 'Please fill in the empty fields.'
      } else {
        this.issue = ''
        this.loginbtn = 'loading...';
        axios.post('https://shukran-api.herokuapp.com/api/login/', {
            username: this.username.toLowerCase().trim(),
            password: md5(this.password)
        }).then( res => {
          if (res.data.length == 0) {
            this.loginbtn = 'Login'
            this.issue = 'Username or password incorrect...'
          } else {
            sessionStorage.setItem('username', this.username.toLowerCase().trim())
            sessionStorage.setItem('id', res.data[0]._id)
            sessionStorage.setItem('profile', JSON.stringify(res.data[0]))
            this.$router.push('/dash')
          }
        }).catch( err => {
          console.log(err)
          this.loginbtn = 'Login'
          this.issue = 'An error occured. Please try again.'
      })
      }
    },
    switchSignupVisibility() {
      this.signupPasswordIcon = this.signupPasswordIcon === "icon: lock" ? "icon: unlock" : "icon: lock";
      this.signupPasswordFieldType = this.signupPasswordFieldType === 'password' ? 'text' : 'password';
    },
    switchLoginVisibility() {
      this.loginPasswordIcon = this.loginPasswordIcon === "icon: lock" ? "icon: unlock" : "icon: lock";
      this.loginPasswordFieldType = this.loginPasswordFieldType === 'password' ? 'text' : 'password';
    },
    signup(){
      if (this.username == '' || this.fullname == '' || this.email == '' || this.password == '') {
        this.issue = 'Please fill in the empty fields.'
      } else if(!this.reg.test(this.email)){
        this.issue = "Enter correct email please."
      } else {
        this.signupbtn = 'loading...'
        axios.post('https://shukran-api.herokuapp.com/api/myprofile/', {
           username: this.username.toLowerCase().trim()
        }).then(res => {
          if (res.data.length >= 1) {
            console.log('username taken')
              this.issue = 'Username already taken...'
              this.signupbtn = 'Signup'
          } else {
            axios.post('https://shukran-api.herokuapp.com/api/createaccount/', {
              username: this.username.toLowerCase().trim(),
              fullname: this.fullname,
              email: this.email,
              password: md5(this.password)
            }).then(res => {
              this.signupbtn = 'Signup'
              if (res.data.message == "User's email exist") {
                console.log('cannot register')
                this.issue = "User's email exist"
              } else {
                console.log('registered')
                sessionStorage.setItem('username', res.data.username)
                sessionStorage.setItem('id', res.data._id)
                sessionStorage.setItem('profile', JSON.stringify(res.data))
                this.$router.push('/profile')
              }
            }).catch( error => {
              console.log(error)
            })
          }
        }).catch( err => {
          console.log(err)
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.uk-navbar, .uk-navbar-item, .lead {
  background: transparent !important;
  color: #c63968 !important;
}
.uk-container{
  background-color: #ffffff !important;
  color: #ee7155 !important;
  height: 40rem !important;
}
.uk-card, .uk-card-title {
  background-color: #fceedd !important;
  color: #ff6870 !important;
}
.uk-button{
  background-color: #c63968 !important;
  color: #fceedd;
}
</style>