<template>
   <div class="support-div">
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
        <!-- <canvas width="600" height="400"></canvas> -->
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
                <img class="almost-square" width="40" height="40" v-lazy="'https://drive.google.com/uc?export=view&id=' + image">
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
       <a v-bind:href="''+content+''" target="blank" class="uk-label ">Find my content here.</a>
    </div>
</div>
<br>
   <!-- //mobile view -->
      <div class="uk-container">
         <div class="uk-container-expand" align="center" >
      <div class="uk-card tip-card uk-card-default uk-width-1-2@m" uk-scrollspy="cls: uk-animation-slide-bottom; repeat: false" align="center">
    <div class="uk-card-body">
        <h3 class="uk-card-title">Let <span class="capitalize">{{username}}</span> know you</h3>
        <p>You'll not have to fill your nickname & email address again for a faster tipping experience.</p>
       <div>
         <div class="uk-margin">
            <input type="text" class="uk-input" autocomplete="nickname" placeholder="Nickname" v-model="nickname">
            <input type="email" class="uk-input" autocomplete="email" placeholder="Email" v-model="email">
            <!-- <input type="text" class="uk-input" autocomplete="tel" placeholder="Phone" v-model="phone"> -->
         </div>
       </div>
       <div>
          <div style="display: flex">
             <div class="uk-form-controls" style="margin-right: 1px">
                  <select @change="showTipNudge()" v-model="currency" style="border-radius: 3px" class="uk-select uk-form-width-xsmall" id="form-stacked-select">
                     <option value="NGN">₦</option>
                     <option value="KES">Ksh</option>
                     <option value="USD">$</option>
                  </select>
            </div>
          <input type="number" class="uk-input" placeholder="Amount" v-model="amount" @change="showTipNudge">
          </div>
          <p style="color: #c63968;"> {{tipNudge}}</p>
       </div>
       <div v-show="parseInt(amount) >= tipGuard" class="uk-margin uk-flex subscription-nudge">
          <label><input v-model="isSubscribing" @change="subbed" class="uk-checkbox" type="checkbox"> Wanna tip {{username}} <b>{{currencySymbol()}}</b>{{amount}}<!-- this time --> every month<!-- for the next 1 year -->? <a class="cancel-sub" href="mailto:support@usehukran.com?subject=Hello Shukran&body=Hi, I want to cancel my subscription for ... creator." data-uk-tooltip title="A message with instructions would be sent to your email">Email us to cancel anytime</a> <!-- Starts from next month. --></label>
           <!-- ask them for the time of the month when they'd be debited, you'll be notified before your support would be made -->
       </div>
       <div class="uk-margin">
          <textarea @input="subbed" placeholder="Drop an encouraging message" class="uk-textarea" v-model="message"></textarea>
       </div>
       <div class="uk-margin">
          <p style="color: #c63968;">{{issue}}</p>
       </div>
       <div class="uk-margin">
         <button :disabled="parseInt(amount) < tipGuard || amount == ''" class="uk-button tip-button uk-button-default" @click="save()">{{tipbtn}}</button>
         <!-- <button class="uk-button uk-button-default" type="button" @click="save()">tip recurringly?</button> -->
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
/*if we come to support page and the name of the creator doens't exist
put up a nice message or redirect... not show a creator that doens't exist... to-do...abn
I opened /cr/chukd and it opened, asking to tip 'chukd' whoever that is... even if the payment
goes through... it'll probably crash our server... given how we won't have an email for the
unknown user */
import axios from 'axios'
import fx from "money";
export default {
    name: 'support',
    data(){
       return {
          username: this.$route.params.username,
          tipGuard: 100, // should be 100 naira
          tipNudge: '',
          summary: '',
          currency: !localStorage.getItem('shukran-country-currency') ? "NGN" : localStorage.getItem('shukran-country-currency'),
          message: '',
          nickname: !localStorage.getItem('shukran-supporter-nickname') ? '' : localStorage.getItem('shukran-supporter-nickname'),
          email: !localStorage.getItem('shukran-supporter-email') ? '' : localStorage.getItem('shukran-supporter-email'),
          amount: '',
          // phone: !localStorage.getItem('shukran-supporter-phone') ? '' : localStorage.getItem('shukran-supporter-phone'),
          tipbtn: 'Tip',
          field: '',
          isSubscribing: false,
          paymentID: undefined,
          content: '',
          cancel: null,
          image: '',
          redirect: '',
          subscriptions: [],
          userinfos: [],
          reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
          user_email: '',
          issue: ''
       }
    },
    methods:{
       currencySymbol() {
         switch (this.currency) {
         case "NGN":
            return '₦'
            break;
         case "USD":
               return '$'
               break;
         case "KES":
               return 'Ksh'
               break;
         default:
            break;
         }
    },
    checkUser() {
      if (this.username == null) {
        this.$router.push("/");
      }
    },
    getSubs(){
      axios.get(process.env.BASE_URL + '/api/getsubscriptions/')
      .then((res) => {
         //console.log('ress',res);
         this.subscriptions = res.data.data; 
      });
    },
    subbed() {
       // because of the 2nd test in this if, we won't need axios.interceptors ... right now, it's just an overkill
       if (this.isSubscribing && this.paymentID === undefined) { // check if it hasn't ran
         const source = axios.CancelToken.source();
         let paymentID = this.paymentID; // re-assign because we don't see it inside axios.intercptors.request.use(...)
         axios.interceptors.request.use(function (config) {
            // Do something before request is sent, like we're inserting a timeout for only requests with a particular baseURL
            if (paymentID === undefined && config.url === process.env.BASE_URL + '/api/createsubscription/') { 
               // config.timeout = 4000;
               return config
            } else if (paymentID !== undefined && config.url !== process.env.BASE_URL + '/api/createsubscription/') {
               return config
            } else {
               source.cancel('Can\'t make more than one reqeust');
            }
            //console.log(config)
            return config;
         }, function (error) {
            // Do something with request error
            return Promise.reject(error);
         });
         
         // before we make this call, let's check if the subscirption amount exits in this.subscirptions
         axios.post(process.env.BASE_URL + '/api/createsubscription/', {
            amount: parseInt(this.amount),
            supporter_email: this.email,
            creator: this.username,
            creator_id: this.userinfos[0]._id,
            creator_email: this.userinfos[0].email,
            name: `${this.email}-shukraning-${this.userinfos[0]._id}`, // using email & _id is surety
         }, {
         cancelToken: source.token
         }).then(res => { // set the subscription/payment plan ID
            //console.log('good subscription', res)
            this.paymentID = res.data
         }).catch(err => {
            //console.log('bad subscription', err)
         }).finally(() => {
            // console.log('we\'re getting the payment plan id')
         })

       }
    },
   showUserWelcome() {
      axios.post(process.env.BASE_URL + '/api/myprofile/', {
         username: this.username.toLowerCase().trim()
      }).then( res => {
         // console.log('why this?', res) // if res.data is empty, say we don't have any such creators
         this.summary = res.data[0].summary
         this.field = res.data[0].craft_type
         this.content = this.getUrl(res.data[0].primary_link)
         this.image = res.data[0].picture_id
         this.userinfos = res.data
      }).catch( err => {
         // console.log('!!', err)
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
         if (this.currency == "USD") {
            this.tipGuard = 3;
         } else {
            this.tipGuard = 100; // should be 100
         }

         if (isNaN(this.amount)) {
            this.tipNudge = `Please input a valid number as amount`;
         } else if (this.amount < this.tipGuard && this.amount !== '') {
            this.tipNudge = `Please support ${this.username} with at least ${this.currencySymbol()}${this.tipGuard}`;
         } else {
            this.tipNudge = ''
         }
      },
      love() {
         if (this.isSubscribing) {
            try { // if it can't get id, it throws error, we so create a new subscirtpion plan
               this.paymentID = this.subscriptions.find(ele => ele.status === "active" && ele.amount === this.amount).id
               // console.log('teh payament id', this.paymentID)
            } catch(err) { // call fun to create new subscription

            }
         }
      },
      save() {
         // [optimize] save their email & nickname & phone number for later autofilling

         analytics.identify(this.email ,{  nickname: this.nickname});
         analytics.track('Tipping Creator',{  authentication:'Tipped creator'})
   
         localStorage.setItem('shukran-supporter-nickname', this.nickname);
         localStorage.setItem('shukran-supporter-email', this.email);
         // localStorage.setItem('shukran-supporter-phone', this.phone);
         
         // optimize re-assignments//
          let email = this.email
          let username = this.username
          let supporter_nickname = this.nickname
          let message = this.message
          let amount = this.amount
          // let phone = this.phone
          let currency = this.currency
          let user_email = this.userinfos[0].email
          let redirect = this.userinfos[0].redirect
          if(email == '' || amount == '') {
             this.issue = 'Enter email & amount please'
             this.tipbtn = "Tip"
          } else if(!this.reg.test(this.email)){
             this.issue = "Please enter a correct email";
             this.tipbtn = "Tip"
          } else {
             // paystack
            /* var handler = PaystackPop.setup({
               key: 'pk_live_01351689dce87a8749467a962e29c12f79388c3d',
               email: email,
               amount: parseInt(amount) * 100,
               currency: localStorage.getItem("shukran-country-currency"),
               channels: ['card', 'bank', 'ussd', 'mobile_money', 'qr'],
               metadata: {
                  custom_fields: [
                     {
                        display_name: "Mobile Number",
                        variable_name: "mobile_number",
                        // value: phone
                     }
                     ]},
               callback: function(response){
                  localStorage.setItem('shukran_email', email)
                  localStorage.setItem('shukran_nickname', supporter_nickname)
                  // localStorage.setItem('shukran_phone', phone)
                  axios.post(process.env.BASE_URL + '/api/createtransaction/', {
                     username: username,
                     supporter_nickname: supporter_nickname,
                     amount: amount,
                     currency: currency,
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
                  handler.openIframe(); // oh well, paystack
 */
                  // flutterwave

                  FlutterwaveCheckout({
      public_key: "FLWPUBK-fe9f65ed4b3608107e0c150e34f52c98-X",
      tx_ref: `${email}-shukran${this.isSubscribing ? 'ing' : ''}-${this.userinfos[0]._id} @ ${Date.now()}`,
      amount: parseInt(amount),
      // https://stackoverflow.com/a/40560953
      // make country based on currency? how about ?
      ...(this.currency == "KES") && {country: "KE"}, // !localStorage.getItem('shukran-country-code') ? "NG" : localStorage.getItem('shukran-country-code')
      currency: this.currency,
      ...(this.currency == "GBP") && {type: "debit_uk_account"}, // to accept uk payments
      payment_options: "card, mobilemoney, ussd, account, banktransfer, mpesa, qr, payattitude, credit",
      // redirect_url: redirect == undefined ? 'https://useshukran.com/thanks' : redirect, // specified redirect URL
      // creating subscriptions
      ...(this.isSubscribing && this.paymentID !== undefined) && {payment_plan: this.paymentID},
      meta: {
        meta_one: 23,
        meta_two: "A string",
        supporter_message: message,
        supporter_nickname: supporter_nickname,
        // consumer_mac: "92a3-912ba-1192a", // https://ourcodeworld.com/articles/read/257/how-to-get-the-client-ip-address-with-javascript-only
        
      },
      customer: { 
        email: email,
        supporter_message: message,
        supporter_nickname: supporter_nickname,
        creator_username: username,
        subscribing: this.isSubscribing

      },
      callback: function(response){// if transaction not successful, don't do anything... get info why & probably who...

                  if (response.status == "successful") {
                     if (response.currency === "KES") { // we can do more
                        amount = parseFloat(amount) * 4.4
                     } else if (response.currency === "USD") {
                        amount = parseFloat(amount) * 380
                     }
                     
                     axios.post(process.env.BASE_URL + '/api/createtransaction/', {
                        username: username,
                        supporter_nickname: supporter_nickname,
                        amount: amount,
                        message: message,
                        status: 'received',
                        currency: "NGN", // currency
                        tx_ref: response.tx_ref,
                        email: user_email
                     }).then(res => {
                        // console.info('tipped')
                        if (redirect == undefined) {
                           this.$router.push('/thanks');
                        } else {
                           window.location = redirect
                        }
                        }).catch(err => {
                           this.tipbtn = 'Tip'
                           this.issue = err
                           // console.error(err)
                        })
                  } else {
                     
                  }
                     },
      customizations: {
        title: "Support " + username,
        description: "Shukran to " + username,
        logo: 'https://drive.google.com/uc?export=view&id=' + this.image,
      },
    }); // flutterwave ends here

                  }
       },
    },
    computed: {
    
  },
    beforeMount(){
      this.showUserWelcome();
    },
    mounted(){
      this.getSubs();
      this.checkUser();
    }
}
</script>
<style scoped>
.subscription-nudge {
   text-align: left;
}
.cancel-sub {
   text-decoration: underline;
}
.support-div {
   background-image: linear-gradient(135deg, #d44d62 0%, #ff746c 100%);
}
.tip-button[disabled="disabled"] {
  cursor: not-allowed;
}
.show-desktop-only {
   height: -webkit-fill-available;
   height: -moz-available;
}
.uk-navbar, .uk-navbar-item, .lead {
  background: transparent;
  color: #ffffff;
}
.tip-card {
   border-radius: 5px;
   margin-bottom: 30px;
}
.uk-card, .uk-card-title {
   /* background-color: #fceedd; */
   color: #ff6870;
}
.capitalize {
    text-transform: capitalize;   
  }
.uk-button{
  background-color: #c63968;
  color: #fceedd;
  border-radius: 3px
}

.uk-label{
  background-color: #c63968;
  color: #fceedd;
}
.uk-input {
   margin-bottom: 5px;
   border-radius: 3px
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