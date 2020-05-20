<template>
  <div>
<nav class="uk-navbar uk-navbar-container uk-margin">
    <div class="uk-navbar-left">
      <a class="uk-navbar-toggle" 
     uk-toggle="target: #offcanvas-usage">
     <span uk-navbar-toggle-icon></span> <span class="uk-margin-small-left"></span>
     </a>

     <a class="uk-navbar-item uk-logo">Shukran</a>
    </div>
</nav>


  <div id="offcanvas-usage" uk-offcanvas>
    <div class="uk-offcanvas-bar">
        <button class="uk-offcanvas-close" type="button" uk-close></button>
    <h3>Shukran</h3>
<ul class="uk-list uk-list-divider">
    <li><router-link to="/dash">Home</router-link></li>
    <li href="#modal-center" uk-toggle>Your URL</li>
    <div id="modal-center" class="uk-flex-top" uk-modal>
    <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">

    <button class="uk-modal-close-default" type="button" uk-close></button>
  <h2 class="uk-modal-title">Hey {{username}},</h2>
        <p> 
          Your url is: <a >http://localhost:8080/{{url}}</a>
        </p>

    </div>
</div>
    <li><router-link to="/profile">Profile</router-link></li>
    <li>Show us <a uk-icon="heart"></a></li>
    <li  @click="logout">Logout</li>
</ul>
    </div>
</div>




  <div class="uk-container">
    <div class="uk-container-expand" align="center">
      <div class="uk-card uk-card-default uk-width-1-2@m" uk-scrollspy="cls: uk-animation-slide-bottom; repeat: true" align="center">
    <div class="uk-card-header">
        <div class="uk-grid-small uk-flex-middle" uk-grid>
            <div class="uk-width-expand" align="center">
                <h3 class="uk-card-title uk-margin-remove-bottom">Update profile</h3>
            </div>
        </div>
    </div>

 <div class="uk-card-body">
    <ul class="uk-subnav uk-subnav-pill" uk-switcher>
    <li><a href="#">Personal Info</a></li>
    <li><a href="#">Banking info</a></li>
    <li><a href="#">Brand Info</a></li>
    </ul>

<ul class="uk-switcher uk-margin">
    <li>
      <div class="uk-card-body" v-for="(profile, index) in profiles" :key="index" align="center">
       <div class="uk-margin"> 
          <input type="text" class="uk-input" placeholder="Fullname" v-model="profile.fullname">
       </div>
       <div class="uk-margin"> 
          <input type="text" class="uk-input" v-model="profile.email">
       </div>

      <div class="uk-margin"> 
          <input type="text" class="uk-input" v-model="profile.username">
       </div>
        <button class="uk-button uk-button-default">{{savebtn}}</button>
    </div>
    </li>
    <li>
      <div class="uk-card-body" v-for="(profile, index) in profiles" :key="index" align="center">
       <div class="uk-margin"> 
          <input type="text" class="uk-input" placeholder="Bank (e.g Access, MPESA etc)" v-model="profile.bank">
       </div>
       <div class="uk-margin"> 
          <input type="text" class="uk-input" placeholder="Account Name" v-model="profile.account_name">
       </div>

      <div class="uk-margin"> 
          <input type="text" class="uk-input" placeholder="Account Number" v-model="profile.account_number">
       </div>
        <button class="uk-button uk-button-default" @click="bankUpdate">{{savebtn}}</button>
    </div>
    </li>
    <li>
      <div class="uk-card-body" v-for="(profile, index) in profiles" :key="index" align="center">
       <div class="uk-margin"> 
          <input type="text" class="uk-input" placeholder="What do you do?" v-model="profile.craft_type">
       </div>
       <div class="uk-margin"> 
          <input type="text" class="uk-input" placeholder="Approx audience size(listeners, subs etc)" v-model="profile.audience_size">
       </div>

      <div class="uk-margin"> 
          <textarea class="uk-textarea" placeholder="Heartfelt Message to audience" v-model="profile.summary"></textarea>
       </div>
        <button class="uk-button uk-button-default" @click="messageUpdate">{{savebtn}}</button>
    </div>
    </li>
</ul>
 </div>  
</div>
    </div>

  </div>

  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'profile',
  data () {
    return {
     username: sessionStorage.getItem('username'),
     id: '',
     profiles: [],
     savebtn: 'Save',
     url: 'cr/' + sessionStorage.getItem('username'),
    }
  },
  methods: {
    logout() {
        sessionStorage.clear()
        this.$router.push('/')
    },
    getId() {
      axios.post('http://localhost:3000/api/myprofile', {
        username: this.username
      }).then( res => {
       // console.log(res.data)
        this.id = res.data[0]._id
        console.log(res.data)
        this.profiles = res.data
      }).catch( err => {
        console.log(err)
      })
    },
     checkUser() {
      if (this.username == null) {
      this.$router.push('/accounts')
    }
    },
    messageUpdate(){
      var id = this.id
      var summary = this.profiles[0].summary
      var craft_type = this.profiles[0].craft_type
      var audience_size = this.profiles[0].audience_size
      this.savebtn = 'chill...'
      axios.post('http://localhost:3000/api/update', {
        summary: summary,
        craft_type: craft_type,
        audience_size: audience_size,
        id: id
      }).then(res => {
        console.log('updated')
        this.savebtn = 'Updated!'
      }).catch(err => {
        console.log(err)
      })
    },
    bankUpdate(){
      var id = this.id
      var bank = this.profiles[0].bank
      var account_name = this.profiles[0].account_name
      var account_number = this.profiles[0].account_number
      axios.post('http://localhost:3000/api/update', {
        id: id,
        bank: bank,
        account_name: account_name,
        account_number: account_number
      }).then(res => {
        console.log('updated')
        this.savebtn = 'Updated!'
      }).catch(error => {
        console.log('error occured')
      })
    }
  },
  mounted() {
    this.getId()
    this.checkUser()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>