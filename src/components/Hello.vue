<template>
    <div class="uk-container">
       <nav class="uk-navbar uk-navbar-container uk-margin">
    <div class="uk-navbar-left">
     <router-link class="uk-navbar-item uk-logo" to="/">Shukran</router-link>
    </div>
    </nav>
    <div class="uk-container-expand" align="center">
      <div class="uk-card uk-card-default uk-width-1-2@m" v-if="loginbutton == true">
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
        <a @click="loginbutton = false" class="uk-button uk-button-text">Sign up</a>
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

    <div class="uk-card-body">
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
           <a @click="loginbutton = true" class="uk-button uk-button-text">Login</a>
         
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
        this.loginbtn = 'Give me a sec...';
        axios.post('http://localhost:3000/api/login', {
            username: this.username.toLowerCase(),
            password: this.password
        }).then( res => {
          console.log(res.data)
          if (res.data.length == 0) {
            this.loginbtn = 'Login'
            this.issue = 'User does not exist..'
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
        console.log(this.username)
        this.signupbtn = 'Give me a sec...'
        axios.post('http://localhost:3000/api/myprofile', {
           username: this.username.toLowerCase()
        }).then(res => {
          console.log(res.data)
          if (res.data.length >= 1) {
              this.issue = 'Username already taken...'
              this.signupbtn = 'Signup'
          } else {
            axios.post('http://localhost:3000/api/createaccount', {
              username: this.username,
              fullname: this.fullname,
              email: this.email,
              password: this.password
            }).then(res => {
              this.signupbtn = 'Signup'
              if (res.data.message == "User's email exist") {
                this.issue = "User's email exist"
              } else {
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
.uk-navbar, .uk-navbar-item {
  background: transparent !important;
  color: #516784 !important;
}
.uk-container{
  background-color: #CDD5DC;
  color: #FAF8F0 ;
  height: 40rem !important;
}

</style>