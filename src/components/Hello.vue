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
        <input class="uk-input" v-model="username" type="text" placeholder="Username">
      </div>
      <div class="uk-margin">
         <input class="uk-input" v-model="password" type="password" placeholder="Password">
      </div>

      <div class="uk-margin">
         <p>{{issue}}</p>
        <button class="uk-button uk-button-default uk-width-1-1" @click="login">{{loginbtn}}</button>
      </div>
     
    </div>
    <div class="uk-card-footer"  align="center">
        <a @click="loginbutton = false" class="uk-button-text">Sign up</a>
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
        <input class="uk-input uk-form" v-model="username" type="text" placeholder="Username">
      </div>
      <div class="uk-margin">
         <input class="uk-input uk-form" v-model="fullname" type="text" placeholder="Fullname">
      </div>
      <div class="uk-margin">
         <input class="uk-input uk-form" v-model="email" type="email" placeholder="Email">
      </div>
      <div class="uk-margin">
         <input class="uk-input uk-form" v-model="password" type="password" placeholder="Password">
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
      email: ''
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
            password: this.password
        }).then( res => {
          console.log(res)
          console.log(res.data)
          if (res.data.length == 0) {
            this.loginbtn = 'Login'
            this.issue = 'Username or password incorrect..'
          } else {
            sessionStorage.setItem('username', this.username)
            this.$router.push('/dash')
          }
        }).catch( err => {
          console.log(err)
      })
      }
    },
    signup(){
      if (this.username == '' || this.fullname == '' || this.email == '' || this.password == '') {
        this.issue = 'Please fill in the empty fields.'
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
              password: this.password
            }).then(res => {
              this.signupbtn = 'Signup'
              if (res.data.message == "User's email exist") {
                console.log('cannot register')
                this.issue = "User's email exist"
              } else {
                console.log('registered')
                sessionStorage.setItem('username', res.data.username)
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