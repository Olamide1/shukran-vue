<template hello-body>
    <div class="get-in">
       <nav class="uk-navbar uk-navbar-container uk-margin">
    <div class="uk-navbar-left">
     <router-link class="uk-navbar-item uk-padding-remove-left uk-logo" to="/">Shukran</router-link>
    </div>
    </nav>
    <div align="center">
      <div class="uk-card uk-card-default fit uk-box-shadow-large uk-padding login-card">
    <div class="uk-card-header">
        <div class="uk-flex-middle">
            <div class="uk-width-expand">
                <h3 class="uk-card-title uk-margin-remove-bottom">Admin login</h3>
            </div>
        </div>
    </div>
    <div class="uk-card-body">
      <div class="uk-margin">
        <input class="uk-input uk-border-rounded" name="username" v-on:keyup.enter="login" data-uk-tooltip v-model="username" type="text" placeholder="Username">
      </div>
      <div class="uk-margin">
        <div class="uk-inline">
         <input v-on:keyup.enter="login" name="password" data-uk-tooltip title="***** or NOT" class="uk-input uk-border-rounded uk-form-width-large" v-model="password" :type="loginPasswordFieldType" placeholder="Password">
         <a class="uk-form-icon uk-form-icon-flip" href="#!" v-bind:uk-icon="loginPasswordIcon" @click="switchLoginVisibility"></a>
        </div>
      </div>

      <div class="uk-margin">
         <p style="color: #ff5976;">{{issue}}</p>
        <button class="uk-button uk-border-rounded uk-button-default uk-width-1-1" @click="login">{{loginbtn}}</button>
      </div>
    </div>
    <div class="uk-card-footer" align="center">
        <a href="/OhWell" class="uk-button-text">See Creators</a> | 
        <router-link to="/">Leave</router-link>
    </div>
  </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'BossIn',
  data () {
    return {
      username:'',
      password:'',
      loginbtn:'Login',
      issue: '',
      loginPasswordFieldType: 'password',
      loginPasswordIcon: "icon: unlock",
    }
  },
  methods: {
    login() {
      if (this.username == '' || this.password == '') {
        this.issue = 'Please fill all fields.'
      } else {
        this.issue = ''
        this.loginbtn = 'loading...';
        axios.post(process.env.BASE_URL + '/api/bosslogin/', {
            username: this.username.toLowerCase().trim(),
            password: this.password.toLowerCase().trim()
        }).then(res => {
          if (res.status === 200) {
            sessionStorage.setItem('++', true)
            this.$router.push('/boss')
          } else {
            this.loginbtn = 'Login'
            this.issue = 'An error occured. Please try again.'
          }
        }).catch(err => {
          sessionStorage.setItem('++', false)
          console.log(err)
          this.loginbtn = 'Login'
          this.issue = 'Uhmmm. Try again.'
      })
      }
    },
    switchLoginVisibility() {
      this.loginPasswordIcon = this.loginPasswordIcon === "icon: lock" ? "icon: unlock" : "icon: lock";
      this.loginPasswordFieldType = this.loginPasswordFieldType === 'password' ? 'text' : 'password';
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.uk-navbar, .uk-navbar-item, .lead {
  background: transparent !important;
  color: #ffffff !important;
}
.uk-card, .uk-card-title {
  color: #2f1a35 !important;
}
.uk-button {
  background-color: #ff5976 !important;
  color: #fff6fa;
}

.login-card {
  border-radius: 5px;
}
.signup-card {
  border-radius: 5px;
}
.fit {
  width: 300px;
}
@media (max-width:960px) {
  .uk-padding {
    padding: 10px;
  }
  .uk-navbar-left {
    margin-left: 30px;
  }
}
.get-in {
  background-image: linear-gradient(135deg, #d44d62 0%, #ff746c 100%);
  position: fixed;
  bottom: 0;
  right: 0;
  top: 0;
  left: 0;
  overflow: auto;
}


@media (min-width:960px) {
  .fit {
    width: 370px;
  }
  .uk-navbar-left {
    margin-left: 50px;
  }
}

.uk-input {
  border-width: 2px;
}
</style>