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
        <p>You'll not have to fill your nickname, 
           email address & phone number again for a faster tipping experience.</p>
       <div>
         <div class="uk-margin">
            <input type="text" class="uk-input" autocomplete="nickname" placeholder="Nickname" v-model="nickname">
            <input type="email" class="uk-input" autocomplete="email" placeholder="Email" v-model="email">
            <input type="text" class="uk-input" autocomplete="tel" placeholder="Phone" v-model="phone">
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
       <div class="uk-margin">
          <textarea placeholder="Drop an encouraging message" class="uk-textarea" v-model="message"></textarea>
       </div>
       <div class="uk-margin">
          <p style="color: #c63968;">{{issue}}</p>
       </div>
       <div class="uk-margin">
         <button :disabled="parseInt(amount) < tipGuard || amount == ''" class="uk-button tip-button uk-button-default" @click="save()">{{tipbtn}}</button>

         <!-- <button class="uk-button uk-button-default" type="button" @click="save()">rates</button> -->
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
          tipGuard: 100,
          tipNudge: '',
          summary: '',
          currency: !localStorage.getItem('shukran-country-currency') ? "NGN" : localStorage.getItem('shukran-country-currency'),
          message: '',
          nickname: !localStorage.getItem('shukran-supporter-nickname') ? '' : localStorage.getItem('shukran-supporter-nickname'),
          email: !localStorage.getItem('shukran-supporter-email') ? '' : localStorage.getItem('shukran-supporter-email'),
          amount: '',
          phone: !localStorage.getItem('shukran-supporter-phone') ? '' : localStorage.getItem('shukran-supporter-phone'),
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
      showUserWelcome(){
         axios.post('https://shukran-api.herokuapp.com/api/myprofile/', {
            username: this.username.toLowerCase().trim()
         }).then( res => {
            // console.log('why this?', res)
            this.summary = res.data[0].summary
            this.field = res.data[0].craft_type
            this.content = this.getUrl(res.data[0].primary_link)
            this.image = res.data[0].picture_id
            this.userinfos = res.data
         }).catch( err => {
            console.log('!!', err)
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
            this.tipGuard = 2;
         } else {
            this.tipGuard = 100;
         }

         if (isNaN(this.amount)) {
            this.tipNudge = `Please input a valid number as amount`;
         } else if (this.amount < this.tipGuard && this.amount !== '') {
            this.tipNudge = `Please support ${this.username} with at least ${this.currencySymbol()}${this.tipGuard}`;
         } else {
            this.tipNudge = ''
         }
      },
      fetchConversionDataAndUpdate() {
         // instead, save to our db, then select from there, so everyone else calls to our db, and our db refreshes as often as possible in a month [1K free calls!]
         
         // hide app_id
         fetch(
         `https://openexchangerates.org/api/latest.json?app_id=91527baa61514e6e81db3a2604a4822f`
         )
         .then(resp => resp.json())
         .then(data => {
            fx.base = "USD"; // wish it was localStorage.getItem('shukran-country-currency')
            fx.rates = data.rates;
            // console.log(data);
            localStorage.setItem(
               "shukran-currency-converter-data",
               JSON.stringify(data)
            );
         })
         // .then(ex)
         .catch(err => console.error("fetch ex rates err", err));
      },
      // https://github.com/exchangeratesapi/exchangeratesapi
    // https://docs.openexchangerates.org/
    rates() {
      if (!localStorage.getItem("shukran-currency-converter-data")) {
        this.fetchConversionDataAndUpdate();
      } else {
        // console.log('saved d', localStorage.getItem('shukran-currency-converter-data'))
        const savedCurrConvData = JSON.parse(
          localStorage.getItem("shukran-currency-converter-data")
        );
        // check if it's more than a week old
        // https://www.geeksforgeeks.org/how-to-calculate-the-number-of-days-between-two-dates-in-javascript/
        // https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
        const lastSavedDate = new Date(savedCurrConvData.timestamp * 1000);

        // calculate the no. of days between two dates
        const diffInDays =
          (new Date().getTime() - lastSavedDate.getTime()) / (1000 * 3600 * 24);
        if (diffInDays > 7) {
          // more than 7 days
          // fetch again
          this.fetchConversionDataAndUpdate();
        } else {
          // less than a week old? then just convert
          fx.base = "USD";
          fx.rates = savedCurrConvData.rates;

          // const rate = fx(this.tipTotal).from(localStorage.getItem('shukran-country-currency')).to(this.currency)
          // console.log(`${localStorage.getItem('shukran-country-currency')}${this.tipTotal} = ${this.currency}${rate.toFixed(2)}`)
        }
      }
    },
      save() {
          // [optimize] save their email & nickname & phone number for later autofilling
   
         localStorage.setItem('shukran-supporter-nickname', this.nickname);
         localStorage.setItem('shukran-supporter-email', this.email);
         localStorage.setItem('shukran-supporter-phone', this.phone);
         
         // ---optimize re-assignments//
          var email = this.email
          var username = this.username
          var supporter_nickname = this.nickname
          var message = this.message
          var amount = this.amount
          var phone = this.phone
          let currency = this.currency
          var user_email = this.userinfos[0].email
          var redirect = this.userinfos[0].redirect
          if(email == '' || amount == '') {
             this.issue = 'Enter Email & Amount Please'
             this.tipbtn = "Tip"
          } else if(!this.reg.test(this.email)){
             this.issue = "Please Enter Correct Email";
             this.tipbtn = "Tip"
          } else {
            /* var handler = PaystackPop.setup({
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
                  handler.openIframe(); // oh well, paystack
 */
                  // flutterwave

                  FlutterwaveCheckout({
      public_key: "FLWPUBK-fe9f65ed4b3608107e0c150e34f52c98-X",
      tx_ref: `${supporter_nickname}-shukran-${username} @ ${Date.now()}`,
      amount: parseInt(amount),
      // https://stackoverflow.com/a/40560953
      // make country based on currency? how about ?
      ...(this.currency == "KES") && {country: "KE"}, // !localStorage.getItem('shukran-country-code') ? "NG" : localStorage.getItem('shukran-country-code')
      currency: this.currency,
      ...(this.currency == "GBP") && {type: "debit_uk_account"}, // to accept uk payments
      payment_options: "card, mobilemoney, ussd, account, banktransfer, mpesa, qr, payattitude, credit",
      // redirect_url: redirect == undefined ? 'https://useshukran.com/thanks' : redirect, // specified redirect URL
      meta: {
        // consumer_id: 23,
        // consumer_mac: "92a3-912ba-1192a", // https://ourcodeworld.com/articles/read/257/how-to-get-the-client-ip-address-with-javascript-only
        
      },
      customer: {
        email: email,
        supporter_phone_number: phone,
        supporter_nickname: supporter_nickname,
      },
      callback: function(response){// if transaction not successful, don't do anything... get info why & probably who...
         console.log('success. transaction ref is ', response);
         console.warn('success. transaction ref is ', response); // optimize

                  console.log('shukran-supporter-nickname', this.nickname);
                  console.log('shukran-supporter-email', this.email);
                  console.log('shukran-supporter-phone', this.phone);


                  if (response.status == "successful") {
                     if (response.currency !== "NGN") {
                        amount = fx(response.amount).from(response.currency).to("NGN")
                     }
                     axios.post('https://shukran-api.herokuapp.com/api/createtransaction/', {
                     username: username,
                     supporter_nickname: supporter_nickname,
                     amount: amount,
                     message: message,
                     status: 'received',
                     currency: "NGN",
                     email: user_email
                     }).then(res => {
                        console.log('tipped')
                        console.info('tipped')
                        if (redirect == undefined) {
                           this.$router.push('/thanks');
                        } else {
                           window.location = redirect
                        }
                        }).catch(err => {
                           this.tipbtn = 'Tip'
                           this.issue = err
                           console.log(err)
                           console.error(err)
                        })
                  } else {
                     
                  }
                     
                     },
      customizations: {
        title: "Support " + username,
        description: "Shukran to " + username,
        logo: 'https://drive.google.com/uc?export=view&id=' + this.image,
      },
    });
                  }
       },
    },
    computed: {
    
  },
    beforeMount(){
      this.showUserWelcome();
      this.rates();
    },
    mounted(){
      // this.showUserWelcome() // no need calling twice
    }
}
</script>
<style scoped>
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