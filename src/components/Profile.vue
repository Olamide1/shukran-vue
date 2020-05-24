<template>
  <div class="uk-container-expand">
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
    <li href="#modal-center" uk-toggle>Get tipped</li>
    <div id="modal-center" class="uk-flex-top" uk-modal>
    <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">

    <button class="uk-modal-close-default" type="button" uk-close></button>
  <h2 class="uk-modal-title">Hey {{username}},</h2>
        <p class="uk-modal-body"> 
          <router-link :to="'/cr/' + username">https://shukran.netlify.app/{{url}}</router-link>
        </p>

    </div>
</div>
    <li><router-link to="/profile">Profile</router-link></li>
    <!--Feedback area start -->
    <li uk-toggle="target: #my-id">Give feedback <a uk-icon="heart"></a></li>
    <div id="my-id" uk-modal>
    <div class="uk-modal-dialog uk-modal-body">
        <h2 class="uk-modal-title">Hey, {{username}}</h2>
          <p>Show some love or raise an issue</p>
          <div class="uk-margin">
            <textarea class="uk-textarea" placeholder="message" v-model="comment"></textarea>
          </div>
          <div class="uk-margin">
            <button class="uk-button uk-button-default" @click="submitFeedback">{{feed}}</button>
          </div>
        <button class="uk-modal-close-default" type="button" uk-close></button>
    </div>
</div>
<!--Feebdack area end -->
    <li  @click="logout">Logout</li>
</ul>
    </div>
</div>
   <div class="uk-section uk-section-muted uk-padding" align="center">
    <div class="uk-card uk-width-1-2@m">
        <div class="uk-card-header">
          <h3 class="uk-card-title"> User Profile</h3>
        </div>
      
    <ul uk-tab align="center">
    <li><a href="#" style="color: #208cb7">Personal Info</a></li>
    <li><a href="#" style="color: #208cb7">Banking info</a></li>
    <li><a href="#" style="color: #208cb7">Brand Info</a></li>
    </ul>

<ul class="uk-switcher">
    <li>
      <div class="uk-card-body" v-for="(profile, index) in profiles" :key="index" align="center">
       <div class="uk-margin"> 
          <input type="text" class="uk-input" placeholder="Fullname" v-model="profile.fullname">
       </div>
       <div class="uk-margin"> 
          <input type="text" class="uk-input" v-model="profile.email" placeholder="Email">
       </div>

      <div class="uk-margin"> 
          <input type="text" class="uk-input" v-model="profile.username" placeholder="Username">
       </div>
       <div class="uk-margin"> 
          <input type="text" class="uk-input" v-model="profile.phone" placeholder="Phone number">
       </div>
        <button class="uk-button uk-button-default" @click="personalInfo">{{savebtnOne}}</button>
    </div>
    </li>
    <li>
      <div class="uk-card-body" v-for="(profile, index) in profiles" :key="index" align="center">
       <div class="uk-margin"> 
          <input type="text" class="uk-input" placeholder="Bank (e.g GTBank etc)" v-model="profile.bank">
       </div>
       <div class="uk-margin"> 
          <input type="text" class="uk-input" placeholder="Account Name" v-model="profile.account_name">
       </div>

      <div class="uk-margin"> 
          <input type="text" class="uk-input" placeholder="Account Number" v-model="profile.account_number">
       </div>
        <button class="uk-button uk-button-default" @click="bankUpdate">{{savebtnTwo}}</button>
    </div>
    </li>
    <li>
      <div class="uk-card-body" v-for="(profile, index) in profiles" :key="index" align="center">
       <div class="uk-margin"> 
          <input type="text" class="uk-input" placeholder="What do you do? (Podcaster, Videographer)" v-model="profile.craft_type">
       </div>
       <div class="uk-margin"> 
          <input type="text" class="uk-input" placeholder="~ audience size(listeners, subs etc)" v-model="profile.audience_size">
       </div>

      <div class="uk-margin"> 
          <textarea class="uk-textarea" placeholder="Heartfelt Message to audience" v-model="profile.summary"></textarea>
       </div>
        <button class="uk-button uk-button-default" @click="messageUpdate">{{savebtnThree}}</button>
    </div>
    </li>
</ul>
          
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
     savebtnOne: 'Save',
      savebtnTwo: 'Save',
       savebtnThree: 'Save',
     url: 'cr/' + sessionStorage.getItem('username'),
     comment: '',
     feed: 'Submit'
    }
  },
  methods: {
    logout() {
        sessionStorage.clear()
        this.$router.push('/')
    },
    getId() {
      axios.post('https://shukran-api.herokuapp.com/api/myprofile/', {
        username: this.username
      }).then( res => {
        this.id = res.data[0]._id
        console.log('id')
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
      this.savebtnThree = 'saving...'
      axios.post('https://shukran-api.herokuapp.com/api/update/', {
        summary: summary,
        craft_type: craft_type,
        audience_size: audience_size,
        id: id
      }).then(res => {
        console.log('updated')
        this.savebtnThree = 'Saved!'
      }).catch(err => {
        console.log(err)
      })
    },
    submitFeedback(){
      var username = this.username
      var comment = this.comment

      axios.post('https://shukran-api.herokuapp.com/api/givefeedback/', {
        username: username,
        comment: comment
      }).then( res => {
        console.log('feedback submited')
        UIkit.modal('#my-id').hide();
        alert('Thank you for your feedback!')
      }).catch(err => {
        console.log(err)
      })
    }, 
    bankUpdate(){
      var id = this.id
      var bank = this.profiles[0].bank
      var account_name = this.profiles[0].account_name
      var account_number = this.profiles[0].account_number
      this.savebtnTwo = 'saving...'
      axios.post('https://shukran-api.herokuapp.com/api/update/', {
        id: id,
        bank: bank,
        account_name: account_name,
        account_number: account_number
      }).then(res => {
        console.log('updated')
        this.savebtnTwo = 'Saved!'
      }).catch(error => {
        console.log('error occured')
      })
    },
    personalInfo(){
      var id = this.id
      var fullname = this.profiles[0].fullname
      var email = this.profiles[0].email
      var username = this.profiles[0].username
      var phone = this.profiles[0].phone
      this.savebtnOne = 'saving...'
      axios.post('https://shukran-api.herokuapp.com/api/update/', {
        id: id,
        fullname: fullname,
        email: email,
        username: username,
        phone: phone
      }).then(res => {
        console.log('updated')
        this.savebtnOne = 'Saved!'
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
.uk-navbar, .uk-navbar-item {
  background: #ffffff !important;
  color: #208cb7 !important;
}
.uk-modal{
  background-color: #208cb7 !important;
  color: #208cb7;
}
.uk-container-expand{
  background-color:transparent;
  color: #EBEBE7 !important;
}
.uk-offcanvas-bar {
background-color: #208cb7 !important;
color: #ffffff;
}
.uk-section{
  background-color: #ffffff !important;
  height: 33.7rem !important;
  color: #ffffff !important;
}
.uk-button{
  background-color: #208cb7 !important;
  color: #ffffff;
}
.uk-card, .uk-card-title {
  background-color: #F4F4F4;
  color: #208cb7 !important;
}
</style>