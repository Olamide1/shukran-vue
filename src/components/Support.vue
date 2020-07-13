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
      save() {
          // [optimize] save their email & nickname & phone number for later autofilling
   
         localStorage.setItem('shukran-supporter-nickname', this.nickname);
         localStorage.setItem('shukran-supporter-email', this.email);
         localStorage.setItem('shukran-supporter-phone', this.phone);
         
         // ---optimize re-assignments//
          let email = this.email
          let username = this.username
          let supporter_nickname = this.nickname
          let message = this.message
          let amount = this.amount
          let phone = this.phone
          let currency = this.currency
          let user_email = this.userinfos[0].email
          let redirect = this.userinfos[0].redirect
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
                        fx.base = "USD";
                        fx.rates = {
                           "AED": 3.673,
                           "AFN": 77.199999,
                           "ALL": 109.2,
                           "AMD": 481.616228,
                           "ANG": 1.79489,
                           "AOA": 573.21,
                           "ARS": 71.227156,
                           "AUD": 1.436062,
                           "AWG": 1.8,
                           "AZN": 1.7025,
                           "BAM": 1.72637,
                           "BBD": 2,
                           "BDT": 84.789383,
                           "BGN": 1.7224,
                           "BHD": 0.377116,
                           "BIF": 1925,
                           "BMD": 1,
                           "BND": 1.389259,
                           "BOB": 6.914523,
                           "BRL": 5.3596,
                           "BSD": 1,
                           "BTC": 0.00010768506,
                           "BTN": 75.176552,
                           "BWP": 11.586691,
                           "BYN": 2.417481,
                           "BZD": 2.015533,
                           "CAD": 1.358895,
                           "CDF": 1940,
                           "CHF": 0.941651,
                           "CLF": 0.02881,
                           "CLP": 787.7,
                           "CNH": 7.001014,
                           "CNY": 6.9973,
                           "COP": 3602.453332,
                           "CRC": 583.107553,
                           "CUC": 1,
                           "CUP": 25.75,
                           "CVE": 97.575,
                           "CZK": 23.4787,
                           "DJF": 178.0375,
                           "DKK": 6.5572,
                           "DOP": 58.5,
                           "DZD": 128.535566,
                           "EGP": 15.9748,
                           "ERN": 15.002857,
                           "ETB": 35.21,
                           "EUR": 0.880844,
                           "FJD": 2.1595,
                           "FKP": 0.795438,
                           "GBP": 0.795438,
                           "GEL": 3.07,
                           "GGP": 0.795438,
                           "GHS": 5.7725,
                           "GIP": 0.795438,
                           "GMD": 51.785,
                           "GNF": 9615,
                           "GTQ": 7.699484,
                           "GYD": 209.09049,
                           "HKD": 7.750935,
                           "HNL": 24.89,
                           "HRK": 6.6348,
                           "HTG": 110.018088,
                           "HUF": 312.513939,
                           "IDR": 14382.292257,
                           "ILS": 3.4375,
                           "IMP": 0.795438,
                           "INR": 75.19005,
                           "IQD": 1190,
                           "IRR": 42105,
                           "ISK": 140.57,
                           "JEP": 0.795438,
                           "JMD": 141.991109,
                           "JOD": 0.7095,
                           "JPY": 107.27775,
                           "KES": 107.11,
                           "KGS": 77.461841,
                           "KHR": 4103,
                           "KMF": 434,
                           "KPW": 900,
                           "KRW": 1201.1,
                           "KWD": 0.307798,
                           "KYD": 0.833326,
                           "KZT": 412.374787,
                           "LAK": 9050,
                           "LBP": 1513.764964,
                           "LKR": 185.887683,
                           "LRD": 199.274948,
                           "LSL": 16.75,
                           "LYD": 1.395,
                           "MAD": 9.60275,
                           "MDL": 16.932029,
                           "MGA": 3846,
                           "MKD": 54.386251,
                           "MMK": 1363.905145,
                           "MNT": 2832.863178,
                           "MOP": 7.98226,
                           "MRO": 357,
                           "MRU": 37.72,
                           "MUR": 39.960001,
                           "MVR": 15.41,
                           "MWK": 737.5,
                           "MXN": 22.546612,
                           "MYR": 4.265,
                           "MZN": 70.349995,
                           "NAD": 16.76,
                           "NGN": 387.5,
                           "NIO": 34.55,
                           "NOK": 9.406223,
                           "NPR": 120.282427,
                           "NZD": 1.524692,
                           "OMR": 0.385056,
                           "PAB": 1,
                           "PEN": 3.499,
                           "PGK": 3.465,
                           "PHP": 49.420129,
                           "PKR": 166.6,
                           "PLN": 3.95705,
                           "PYG": 6866.056134,
                           "QAR": 3.641,
                           "RON": 4.2652,
                           "RSD": 103.6,
                           "RUB": 70.7896,
                           "RWF": 951,
                           "SAR": 3.75076,
                           "SBD": 8.349572,
                           "SCR": 17.949885,
                           "SDG": 55.3,
                           "SEK": 9.163752,
                           "SGD": 1.38923,
                           "SHP": 0.795438,
                           "SLL": 9773.862932,
                           "SOS": 582,
                           "SRD": 7.458,
                           "SSP": 130.26,
                           "STD": 21817.577244,
                           "STN": 21.8,
                           "SVC": 8.749834,
                           "SYP": 513.242772,
                           "SZL": 16.76,
                           "THB": 31.37,
                           "TJS": 10.30792,
                           "TMT": 3.5,
                           "TND": 2.8385,
                           "TOP": 2.281881,
                           "TRY": 6.8605,
                           "TTD": 6.76122,
                           "TWD": 29.434998,
                           "TZS": 2319,
                           "UAH": 27.098703,
                           "UGX": 3705.22339,
                           "USD": 1,
                           "UYU": 43.673752,
                           "UZS": 10205,
                           "VEF": 248487.642241,
                           "VES": 215736.74069,
                           "VND": 23125.897349,
                           "VUV": 115.721987,
                           "WST": 2.652186,
                           "XAF": 577.795694,
                           "XAG": 0.05167564,
                           "XAU": 0.00055297,
                           "XCD": 2.70255,
                           "XDR": 0.721981,
                           "XOF": 577.795694,
                           "XPD": 0.00049927,
                           "XPF": 105.112632,
                           "XPT": 0.00118696,
                           "YER": 250.349922,
                           "ZAR": 16.734386,
                           "ZMW": 18.078814,
                           "ZWL": 322
                        };
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