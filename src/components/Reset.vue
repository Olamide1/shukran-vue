<template>
    <div class="uk-container">
        <nav class="uk-navbar uk-navbar-container uk-margin">
            <div class="uk-navbar-left">
                <router-link class="uk-navbar-item uk-logo" to="/">Shukran</router-link>
            </div>
        </nav>

        <div class="uk-container-expand" align="center">
            <div class="uk-card uk-card-default uk-width-1-2@m uk-box-shadow-large uk-padding">
                <div class="uk-card-header">
                    <div class="uk-grid-small uk-flex-middle" uk-grid>
                        <div class="uk-width-expand"  align="center">
                            <h3 class="uk-card-title uk-margin-remove-bottom">Reset Password</h3>
                        </div>
                    </div>
                </div>


                <div class="uk-card-body">
                     <div class="uk-margin">
                            <input class="uk-input" v-model="username" type="text" placeholder="Username">
                     </div>
                     <div class="uk-margin">
                            <input class="uk-input" v-model="email" type="email" placeholder="Email">
                     </div>
                     <div class="uk-margin">
        <div class="uk-inline">
          <a class="uk-form-icon uk-form-icon-flip" href="#" uk-icon="icon: unlock" @click="switchVisibility"></a>
         <input class="uk-input uk-form uk-width-1-1" :type="passwordFieldType" v-model="password" placeholder="New Password">
        </div>
      </div>

                     <div class="uk-margin">
                         <p>{{issue}}</p>
                         <button class="uk-button uk-button-default uk-width-1-1" @click="resetMe">{{reset}}</button>
                         <router-link to="/accounts">Login</router-link>
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
    name: 'reset',
    data(){
        return{
            username: '',
            email: '',
            password: '',
            issue: '',
            reset: 'Reset',
            passwordFieldType: 'password'
        }
    },
    methods: {
        resetMe(){
            var username = this.username
            var password = this.password
            var email = this.email
            this.reset = 'Resetting...'
            axios.post('https://shukran-api.herokuapp.com/api/resetpassword/', {
                username: username.toLowerCase().trim(),
                email: email
            }).then(res => {
                if (res.data.length == 0) {
                    this.reset = 'Reset'
                    this.issue = 'Username/Email incorrect!'
                } else {
                    var id = res.data[0]._id
                    axios.post('https://shukran-api.herokuapp.com/api/update', {
                        id: id,
                        password: password
                    }).then( resp => {
                        this.reset = 'Reset'
                        this.issue = 'Password successfully reset, please login.'
                    }).catch(error => {
                        console.log(error)
                    })
                }
            }).catch(err => {
                console.log(err)
                this.reset = 'Reset'
                this.issue = 'Error connecting to server, please contact support!'
            })
        },
        switchVisibility() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
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