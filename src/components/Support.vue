<template>
   <div>
       <nav class="uk-navbar uk-navbar-container uk-margin" uk-navbar="boundary-align: true; align: center;">
        <div class="uk-navbar-left">
     <router-link class="uk-navbar-item uk-logo" to="/">Shukran</router-link>
    </div>

    <div class="uk-navbar-right">
        <ul class="uk-navbar-nav">
            <li>
                <router-link to="/accounts" class="lead">Creators</router-link>
            </li> 
            
        </ul>
    </div>
</nav>

<div class="uk-card uk-card-default uk-grid-collapse uk-child-width-1-2@s uk-margin show-desktop-only" uk-grid>
    <div class="uk-card-media-left uk-cover-container">
        <img :src="'https://drive.google.com/uc?export=view&id=' + image" alt="" uk-cover>
        <canvas width="600" height="400"></canvas>
    </div>
    <div>
        <div class="uk-card-body">
            <h3 class="uk-card-title">Meet {{username}}</h3>
            <p>a(n) {{field}}</p>
            <p>{{summary}}</p>
            <p><a v-bind:href="''+content+''" target="blank">Find my content here.</a></p>
        </div>
    </div>
</div>

   <!-- mobile view -->
   <div class="uk-card uk-card-default uk-width-1-2@m show-mobile-only">
    <div class="uk-card-header">
        <div class="uk-grid-small uk-flex-middle" uk-grid>
            <div class="uk-width-auto">
                <img class="almost-square" width="40" height="40" :src="'https://drive.google.com/uc?export=view&id=' + image">
            </div>
            <div class="uk-width-expand">
                <h3 class="uk-card-title uk-margin-remove-bottom">Meet {{username}}</h3>
                <p class="uk-text-meta uk-margin-remove-top"><time datetime="2016-04-01T19:00">a(n) {{field}}</time></p>
            </div>
        </div>
    </div>
    <div class="uk-card-body">
        <p>{{summary}}</p>
    </div>
    <div class="uk-card-footer">
       <a v-bind:href="''+content+''" target="blank" class="uk-button uk-button-text">Find my content here.</a>
    </div>
</div>
<br>
   <!-- //mobile view -->
      <div class="uk-container">
         <div class="uk-container-expand" align="center" >
      <div class="uk-card uk-card-default uk-width-1-2@m" uk-scrollspy="cls: uk-animation-slide-bottom; repeat: false" align="center">
    <div class="uk-card-body">
        <h3 class="uk-card-title">Let <span class="capitalize">{{username}}</span> know you</h3>
        <p>You'll not have to fill your nickname, 
           email address & phone number again for a faster tipping experience.</p>
       <div>
          <div class="uk-margin">
          <input type="text" class="uk-input" placeholder="Nickname" v-model="nickname">
          <input type="email" class="uk-input" placeholder="Email" v-model="email">
          <input type="text" class="uk-input" placeholder="Phone" v-model="phone">
       </div>
       </div>
       <div>
          <input type="number" class="uk-input" placeholder="Amount" v-model="amount" @change="showTipNudge">
          <p style="color: #c63968;"> {{tipNudge}} </p>
       </div>
       <div class="uk-margin">
          <textarea placeholder="Drop an encouraging message" class="uk-textarea" v-model="message"></textarea>
       </div>
       <div class="uk-margin">
          <p style="color: #c63968;">{{issue}}</p>
       </div>
       <div class="uk-margin" v-if="parseInt(amount) >= 100">
          <button class="uk-button uk-button-default" @click="save()">{{tipbtn}}</button>
       </div>
    </div>
    <div>
        
    </div>
</div>
</div>
</div>   

   </div> 
</template>
<script>

import axios from 'axios'
export default {
    name: 'support',
    data(){
       return {
          username: this.$route.params.username,
          tipNudge: '',
          summary: '',
          message: '',
          nickname: '',
          email: localStorage.getItem('shukran_email'),
          amount: '',
          phone: localStorage.getItem('shukran_phone'),
          tipbtn: 'Tip',
          field: '',
          content: '',
          image: '',
          redirect: '',
          userinfos: [],
          reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
          user_email: '',
          issue: ''
       }
    },
    methods:{
       showUserWelcome(){
          axios.post('https://shukran-api.herokuapp.com/api/myprofile/', {
             username: this.username.toLowerCase().trim()
             }).then( res => {
                this.summary = res.data[0].summary
                this.field = res.data[0].craft_type
                this.content = this.getUrl(res.data[0].primary_link)
                this.image = res.data[0].picture_id
                this.userinfos = res.data
            }).catch( err => {
               console.log(err)
               })
            },
         getUrl(link){
          if (link == undefined) {
             return 'useshukran.com/cr/' + this.username
          } else {
             return link
          }
         },
            showTipNudge() {
               if (this.amount < 100) {
                  this.tipNudge = 'Please support this creator with at least 100 Naira';
               }
               
            },
       save() {
          var email = this.email
          var username = this.username
          var supporter_nickname = this.nickname
          var message = this.message
          var amount = this.amount
          var phone = this.phone
          var user_email = this.userinfos[0].email
          var redirect = this.userinfos[0].redirect
          if(email == '' || amount == '') {
             this.issue = 'Enter Email & Amount Please'
             this.tipbtn = "Tip"
          } else if(!this.reg.test(this.email)){
             this.issue = "Please Enter Correct Email";
             this.tipbtn = "Tip"
          } else {
            var handler = PaystackPop.setup({
               key: 'pk_live_01351689dce87a8749467a962e29c12f79388c3d',
               email: email,
               amount: parseInt(amount) * 100,
               currency: "NGN",
               channels: ['card', 'bank', 'ussd', 'mobile_money', 'qr'],
               metadata: {
                  custom_fields: [
                     {
                        display_name: "Mobile Number",
                        variable_name: "mobile_number",
                        value: phone
                     }
                     ]},
               callback: function(response){
                  localStorage.setItem('shukran_email', email)
                  localStorage.setItem('shukran_nickname', supporter_nickname)
                  localStorage.setItem('shukran_phone', phone)
                  axios.post('https://shukran-api.herokuapp.com/api/createtransaction/', {
                     username: username,
                     supporter_nickname: supporter_nickname,
                     amount: amount,
                     message: message,
                     status: 'received',
                     email: user_email
                     }).then(res => {
                        console.log('tipped')
                        if (redirect == undefined) {
                           this.$router.push('/thanks');
                        } else {
                           window.location = redirect
                        }
                        }).catch(err => {
                           this.tipbtn = 'Tip'
                           this.issue = err
                           console.log(err)
                        })
                     console.log('success. transaction ref is ' + response.reference);
                     },
               onClose: function(){
                  alert('Payment action cancelled'); 
                  } 
                  });
                  handler.openIframe();
                  }
       },
    },
    beforeMount(){
       this.showUserWelcome()
    },
    mounted(){
       this.showUserWelcome()
    }
}
</script>
<style scoped>
.uk-navbar, .uk-navbar-item, .lead {
  background: transparent !important;
  color: #c63968 !important;
}

.uk-margin-auto{
  background-color: #fceedd !important;
  color: #ff6870;
}
.uk-card, .uk-card-title {
   background-color: #fceedd;
   color: #ff6870;
}
.capitalize {
    text-transform: capitalize;   
  }
.uk-button{
  background-color: #c63968 !important;
  color: #fceedd;
}
h3 {
   color: #ff6870;
   font-size: 18px; 
}
.show-mobile-only {
   display: none;
}
@media screen and (max-device-width: 415px) {
   .show-mobile-only {
      display: block;
   }

   .show-desktop-only {
      display: none;
   }
}
.almost-square {
   border-radius: 10%;
}
</style>