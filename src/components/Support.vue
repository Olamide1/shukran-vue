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
   <div class="uk-background-muted uk-margin uk-text-center" uk-scrollspy="cls: uk-animation-slide-bottom; repeat: true">     
    <div class="uk-margin-auto uk-margin-auto-vertical uk-width-1-2@m uk-card uk-card-default uk-card-body">
       <img :src="'https://drive.google.com/uc?export=view&id=' + image" class="uk-height-small uk-flex uk-flex-center uk-border-circle" style="min-width: 80%; height: 250px;margin-left: auto;
  margin-right: auto;display: block;" alt="profile" uk-img>
       <h3>Support <br> {{username}}</h3>
       <div>
          a(n) <i>{{field}}</i>. <br> 
          <i>Message from {{$route.params.username}}:</i> <br> {{summary}}
          <p><a v-bind:href="''+content+''" target="blank">Find my content here.</a></p>
      </div>
    </div>        
   </div>
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
                this.content = res.data[0].primary_link
                this.image = res.data[0].picture_id
                this.userinfos = res.data
            }).catch( err => {
               console.log(err)
               })
            },
            showTipNudge() {
               if (this.amount < 100) {
                  this.tipNudge = 'Please support this creator with at least &#x20a6;100';
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
                        if (redirect == '') {
                           var url = '/cr/' + this.username 
                           this.$router.push(url);
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
</style>