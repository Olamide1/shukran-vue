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
   <div class="uk-flex uk-height-medium uk-background-muted uk-margin uk-text-center" uk-scrollspy="cls: uk-animation-slide-bottom; repeat: true">     
    <div class="uk-margin-auto uk-margin-auto-vertical uk-width-1-2@s uk-card uk-card-default uk-card-body">
       <h3 >Support, <br> {{fullname}}</h3>
       <p>a(an) <i>{{field}}</i> <br> 
          <i>Message from {{$route.params.username}}:</i> <br> {{summary}}</p>
    </div>        
   </div>
      <div class="uk-container">
         <div class="uk-container-expand" align="center" >
      <div class="uk-card uk-card-default uk-width-1-2@m" uk-scrollspy="cls: uk-animation-slide-bottom; repeat: true" align="center">
    <div class="uk-card-body">
        <h3 class="uk-card-title">Let {{username}} know you</h3>
        <p>You'll not have to fill nickname, 
           email & phone again for a faster tipping experience.</p>
       <div>
          <div class="uk-margin">
          <input type="text" class="uk-input" placeholder="Nickname" v-model="nickname">
          <input type="email" class="uk-input" placeholder="Email" v-model="email">
          <input type="text" class="uk-input" placeholder="Phone" v-model="phone">
       </div>
       </div>
       <div>
          <input type="number" class="uk-input" placeholder="Amount" v-model="amount">
       </div>
       <div class="uk-margin">
          <textarea placeholder="Drop a message" class="uk-textarea" v-model="message"></textarea>
       </div>
       
       <div class="uk-margin">
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
          summary: '',
          fullname: '',
          message: 'Thanks for all you do.',
          nickname: localStorage.getItem('shukran_nickname'),
          email: localStorage.getItem('shukran_email'),
          amount: '',
          phone: localStorage.getItem('shukran_phone'),
          tipbtn: 'Tip',
          field: ''
       }
    },
    methods:{
       showUserWelcome(){
          axios.post('https://shukran-api.herokuapp.com/api/myprofile/', {
             username: this.username
             }).then( res => {
                this.summary = res.data[0].summary
                this.fullname = res.data[0].fullname
                this.field = res.data[0].craft_type
            }).catch( err => {
               console.log(err)
               })
            },
       save() {
          var email = this.email
          var username = this.username
          var supporter_nickname = this.nickname
          var message = this.message
          var amount = this.amount
          var phone = this.phone
          this.tipbtn = '...'
          if(email == '' || supporter_nickname == '' || amount == '') {
             console.log('fill in every info')
          } else {
             localStorage.setItem('shukran_email', email)
             localStorage.setItem('shukran_nickname', supporter_nickname)
             localStorage.setItem('shukran_phone', phone)
             axios.post('https://shukran-api.herokuapp.com/api/createtransaction/', {
                     username: username,
                     supporter_nickname: supporter_nickname,
                     amount: amount,
                     message: message,
                     status: 'received'
                  }).then(res => {
                     console.log('tipped')
                     this.tipbtn = 'Tip'
                     this.$router.push('/thanks')
                  }).catch(err => {
                     this.tipbtn = 'Tip'
                     console.log(err)
                  })
            var handler = PaystackPop.setup({
               key: 'pk_live_01351689dce87a8749467a962e29c12f79388c3d',
               email: email,
               amount: parseInt(amount) * 100,
               currency: "NGN",
               metadata: {
                  custom_fields: [
                     {
                        display_name: "Mobile Number",
                        variable_name: "mobile_number",
                        value: phone
                     }
                     ]},
               callback: function(response){
                  alert('success. transaction ref is ' + response.reference);
                  axios.post('https://shukran-api.herokuapp.com/api/createtransaction/', {
                     username: username,
                     supporter_nickname: supporter_nickname,
                     amount: amount,
                     message: message,
                     status: 'received'
                  }).then(res => {
                     console.log('tipped')
                     this.tipbtn = 'Tip'
                     this.$router.push('/thanks')
                  }).catch(err => {
                     this.tipbtn = 'Tip'
                     console.log(err)
                  })
                  },
               onClose: function(){
                  alert('window closed');
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
.uk-flex {
   background-color: #fceedd;
   color: #fceedd !important;
}
.uk-margin-auto{
  background-color: #fceedd !important;
  color: #ff6870;
}
.uk-card, .uk-card-title {
   background-color: #fceedd;
   color: #ff6870;
}
.uk-button{
  background-color: #c63968 !important;
  color: #fceedd;
}
h3 {
   color: #ff6870;
}
</style>