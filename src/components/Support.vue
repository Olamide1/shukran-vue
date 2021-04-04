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

    <div class="uk-section-default">
      <div class="uk-background-blend-multiply uk-background-primary uk-section uk-section-small uk-background-cover"
        v-lazy:background-image="{src: `https://drive.google.com/uc?export=view&id=${this.creatorInfo.picture_id}`}">

        <div class="uk-container">
          <div class="uk-card uk-card-body">

            <div class="header-combo">
              <mark>
                <h4 class="uk-heading-small uk-margin-remove-bottom">{{this.creatorInfo.username}}</h4>
              </mark>

            </div>
            <p>
              <mark>
                <small>&mdash; {{this.creatorInfo.craft_type}}</small>
              </mark>
            </p>

            <p>
              <mark>
                {{this.creatorInfo.summary}}
              </mark>
            </p>
            <p>
              <mark>
                <a :href="this.creatorInfo.primary_link" target="blank">Find my content here.</a>
              </mark>
            </p>
          </div>
        </div>

      </div>
    </div>

    <div id="content-parent">
      <div v-if="this.creatorInfo.content && this.creatorInfo.content.length > 0"
        class="uk-padding-large-top uk-section uk-section-default uk-section-small uk-padding-remove-bottom">
        <div class="uk-container">

          <div class="header-combo">
            <h2>Contents</h2>
            <small>&middot; {{this.creatorInfo.content.length}}</small>
          </div>

          <div class="uk-flex uk-flex-row" style="overflow-x: scroll;">

            <div v-for="content in this.creatorInfo.content" :key="content.created_at"
              class="uk-card uk-card-default description-body">
              <div class="uk-card-badge">
                {{new Date(
                              content.created_at
                           ).toLocaleDateString("en-GB", {
                              year: "2-digit",
                              month: "short"
                           })}}
              </div>
              <div class="uk-card-body sk">
                <h3 class="uk-card-title">
                  <span class="uk-label">{{contentType(content.file_type)}}</span>
                </h3>
                <p>{{ content.filename }}</p>
                <p class="peek-it">{{ content.description }}</p>
                <p uk-margin="" class="get-it">
                  <a class="uk-button uk-button-default uk-first-column uk-icon-link" uk-icon="link"
                    :href="content.web_content_link ? content.web_content_link : 'https://drive.google.com/uc?id='+ content.file_id +'&export=download'"
                    download>Download</a>
                </p>
              </div>
            </div>

            <!-- <div v-for="n in 4" :key="n" class="uk-card uk-card-default uk-card-hover uk-margin-medium-left">
                        <div class="uk-card-badge">Hot</div>
                        <div class="uk-card-body sk">
                           <h3 class="uk-card-title">
                              <span class="uk-label">PDF</span>
                           </h3>
                           <p class="peek-it">Lorem ipsum <a href="#">dolor</a> sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                           sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.sit amet, consectetur adipiscing elit, 
                           sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
                           labore et dolore magna aliqua.sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.sit amet, 
                           consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                           <p uk-margin="" class="get-it">
                              <a class="uk-button uk-button-default uk-first-column uk-icon-link" uk-icon="link" href="#">Download</a>
                           </p>
                        </div>
                  </div> -->


          </div>

          <!-- // Some form of seperation \\ -->

          <!-- <div class="uk-child-width-1-4@m uk-grid-match uk-grid uk-grid-row-medium" uk-grid="">
                    <div class="">

                        <div class="uk-card uk-card-default uk-card-hover">
                            <div class="uk-card-badge">Hot</div>
                            <div class="uk-card-body">
                                <h3 class="uk-card-title">
                                   <span class="uk-label">PDF</span>
                                 </h3>
                                <p>Lorem ipsum <a href="#">dolor</a> sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                <p uk-margin="">
                                    <a class="uk-button uk-button-default uk-first-column uk-icon-link" uk-icon="link" href="#">Download</a>
                                </p>
                            </div>
                        </div>

                    </div>
                    <div class="uk-grid-margin ">

                        <div class="uk-card uk-card-primary uk-card-hover">
                            <div class="uk-card-badge">Hot</div>
                            <div class="uk-card-body">
                                <h3 class="uk-card-title">
                                   <span class="uk-label">PDF</span> 
                                </h3>
                                <p>Lorem ipsum <a href="#">dolor</a> sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                <p uk-margin="">
                                    <a class="uk-button uk-button-default uk-first-column uk-icon-link" uk-icon="link" href="#">Download</a>                                </p>
                            </div>
                        </div>

                    </div>
                    <div class="uk-grid-margin ">

                        <div class="uk-card uk-card-secondary uk-card-hover">
                            <div class="uk-card-badge">Hot</div>
                            <div class="uk-card-body">
                                <h3 class="uk-card-title">
                                   <span class="uk-label">IMAGE</span>
                                </h3>
                                <p>Lorem ipsum <a href="#">dolor</a> sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                <p uk-margin="">
                                    <a class="uk-button uk-button-default uk-first-column uk-icon-link" uk-icon="link" href="#">Download</a>
                                </p>
                            </div>
                        </div>

                    </div>
                    <div class="uk-grid-margin ">

                        <div class="uk-card uk-card-hover">
                            <div class="uk-card-badge">Hot</div>
                            <div class="uk-card-body">
                                <h3 class="uk-card-title">
                                   <span class="uk-label">VIDEO</span>
                                </h3>
                                <p>Lorem ipsum <a href="#">dolor</a> sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                <p uk-margin="">
                                    <a class="uk-button uk-button-default uk-first-column uk-icon-link" uk-icon="link" href="#">Download</a>
                                </p>
                            </div>
                        </div>

                    </div>
                </div> -->

        </div>
      </div>
    </div>

    <div class="uk-container uk-margin-top">
      <div class="uk-container-expand" align="center">
        <div class="uk-card tip-card uk-card-default uk-width-1-2@m"
          uk-scrollspy="cls: uk-animation-slide-bottom; repeat: false" align="center">
          <div class="uk-card-body">
            <h3 class="uk-card-title">Let <span class="capitalize">{{username}}</span> know you</h3>
            <p>You won't have to fill your nickname & email address again for a faster experience.</p>
            <div>
              <div class="uk-margin">
                <input type="text" class="uk-input" autocomplete="nickname" placeholder="Nickname" v-model="nickname">
                <input type="email" class="uk-input" autocomplete="email" placeholder="Email" v-model="supporter_email">
                <!-- <input type="text" class="uk-input" autocomplete="tel" placeholder="Phone" v-model="phone"> -->
              </div>
            </div>
            <div>
              <div style="display: flex">
                <div class="uk-form-controls" style="margin-right: 1px">
                  <select @change="showTipNudge()" v-model="currency" style="border-radius: 3px"
                    class="uk-select uk-form-width-xsmall" id="form-stacked-select">
                    <option value="NGN">₦</option>
                    <option value="KES">Ksh</option>
                    <option value="USD">$</option>
                  </select>
                </div>
                <input type="number" class="uk-input" placeholder="Amount" v-model="amount" @change="showTipNudge">
              </div>
              <p style="color: #c63968;"> {{tipNudge}}</p>
            </div>
            <div v-show="parseFloat(amount) >= tipGuard" class="uk-margin uk-flex subscription-nudge">
              <label><input v-model="isSubscribing" class="uk-checkbox" type="checkbox"> Wanna tip {{username}}
                <b>{{currencySymbol()}}</b>{{amount}}
                <!-- this time --> every month
                <!-- for the next 1 year -->? <a class="cancel-sub"
                  href="mailto:support@usehukran.com?subject=Hello Shukran&body=Hi, I want to cancel my subscription for ... creator."
                  data-uk-tooltip title="A message with instructions would be sent to your email">Email us to cancel
                  anytime</a> <!-- Starts from next month. --></label>
              <!-- ask them for the time of the month when they'd be debited, you'll be notified before your support would be made -->
            </div>
            <div class="uk-margin">
              <textarea :placeholder="'Drop an encouraging message for ' + username" class="uk-textarea"
                v-model="message"></textarea>
            </div>
            <div class="uk-margin">
              <p style="color: #c63968;">{{issue}}</p>
            </div>
            <div class="uk-margin">
              <button :disabled="parseFloat(amount) < tipGuard || amount == ''"
                class="uk-button tip-button uk-button-default" @click="save()">{{tipbtn}}</button>
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
  import axios from 'axios';
  import fx from "money";
  fx.base = "USD";
  fx.rates = { // LiG
    "AED": 3.6732,
    "AFN": 77.571739,
    "ALL": 101.322195,
    "AMD": 522.91,
    "ANG": 1.79468,
    "AOA": 654.16,
    "ARS": 85.115434,
    "AUD": 1.29985,
    "AWG": 1.8,
    "AZN": 1.7025,
    "BAM": 1.601236,
    "BBD": 2,
    "BDT": 84.632456,
    "BGN": 1.601212,
    "BHD": 0.377011,
    "BIF": 1941.945389,
    "BMD": 1,
    "BND": 1.328012,
    "BOB": 6.919072,
    "BRL": 5.1934,
    "BSD": 1,
    "BTC": 0.00003015358,
    "BTN": 73.428791,
    "BWP": 10.802857,
    "BYN": 2.612258,
    "BZD": 2.015329,
    "CAD": 1.273005,
    "CDF": 1971.040379,
    "CHF": 0.890075,
    "CLF": 0.025749,
    "CLP": 710.49939,
    "CNH": 6.50503,
    "CNY": 6.533,
    "COP": 3461.475266,
    "CRC": 610.275904,
    "CUC": 0.999805,
    "CUP": 25.75,
    "CVE": 90.55,
    "CZK": 21.470201,
    "DJF": 178.902125,
    "DKK": 6.0929,
    "DOP": 58.177256,
    "DZD": 132.070391,
    "EGP": 15.842604,
    "ERN": 15.001453,
    "ETB": 39.551923,
    "EUR": 0.824063,
    "FJD": 2.0392,
    "FKP": 0.731368,
    "GBP": 0.731368,
    "GEL": 3.285,
    "GGP": 0.731368,
    "GHS": 5.899054,
    "GIP": 0.731368,
    "GMD": 51.755,
    "GNF": 10001.800634,
    "GTQ": 7.793425,
    "GYD": 209.171282,
    "HKD": 7.75325,
    "HNL": 24.201215,
    "HRK": 6.1794,
    "HTG": 72.62042,
    "HUF": 296.92,
    "IDR": 14213.6925,
    "ILS": 3.21302,
    "IMP": 0.731368,
    "INR": 73.09225,
    "IQD": 1468.227817,
    "IRR": 42105,
    "ISK": 127.81,
    "JEP": 0.731368,
    "JMD": 142.971637,
    "JOD": 0.709,
    "JPY": 103.23998054,
    "KES": 99.5, // 109.74,
    "KGS": 83.169856,
    "KHR": 4057.957295,
    "KMF": 403.000217,
    "KPW": 900,
    "KRW": 1085.73,
    "KWD": 0.304144,
    "KYD": 0.833157,
    "KZT": 421.359547,
    "LAK": 9341.069588,
    "LBP": 1519.51088,
    "LKR": 186.166825,
    "LRD": 164.233303,
    "LSL": 14.681041,
    "LYD": 1.344386,
    "MAD": 8.927095,
    "MDL": 17.269066,
    "MGA": 3931.398747,
    "MKD": 50.444146,
    "MMK": 1334.572418,
    "MNT": 2854.186283,
    "MOP": 7.983466,
    "MRO": 357,
    "MRU": 36.18,
    "MUR": 39.699575,
    "MVR": 15.4,
    "MWK": 774.654957,
    "MXN": 19.8822,
    "MYR": 4.0505,
    "MZN": 74.81,
    "NAD": 14.69,
    "NGN": 380, // 396.700509,
    "NIO": 34.873728,
    "NOK": 8.63301,
    "NPR": 117.485776,
    "NZD": 1.412085,
    "OMR": 0.384976,
    "PAB": 1,
    "PEN": 3.637889,
    "PGK": 3.539268,
    "PHP": 48.338897,
    "PKR": 160.992872,
    "PLN": 3.75377,
    "PYG": 6951.07244,
    "QAR": 3.64125,
    "RON": 3.9831,
    "RSD": 96.25,
    "RUB": 73.945,
    "RWF": 990.813199,
    "SAR": 3.751084,
    "SBD": 8.002049,
    "SCR": 21.204537,
    "SDG": 55.225,
    "SEK": 8.26929,
    "SGD": 1.321615,
    "SHP": 0.731368,
    "SLL": 10099.47633,
    "SOS": 581.358349,
    "SRD": 14.154,
    "SSP": 130.26,
    "STD": 20389.997455,
    "STN": 20.325,
    "SVC": 8.748595,
    "SYP": 513.419605,
    "SZL": 14.677733,
    "THB": 30.170546,
    "TJS": 11.325199,
    "TMT": 3.5,
    "TND": 2.6945,
    "TOP": 2.274086,
    "TRY": 7.4392,
    "TTD": 6.795284,
    "TWD": 28.069001,
    "TZS": 2318.537,
    "UAH": 28.475256,
    "UGX": 3655.26232,
    "USD": 1,
    "UYU": 42.360892,
    "UZS": 10474.795277,
    "VEF": 248487.642241,
    "VES": 1105425.302503,
    "VND": 23344.601074,
    "VUV": 108.952017,
    "WST": 2.536797,
    "XAF": 540.549729,
    "XAG": 0.03790043,
    "XAU": 0.0005268,
    "XCD": 2.70255,
    "XDR": 0.696046,
    "XOF": 540.549729,
    "XPD": 0.00040677,
    "XPF": 98.336844,
    "XPT": 0.00093188,
    "YER": 250.408348,
    "ZAR": 14.662595,
    "ZMW": 21.165801,
    "ZWL": 322
  };
  export default {
    name: 'Support',
    data() {
      return {
        username: this.$route.params.username,
        tipGuard: process.env.TIP_GUARD, // should be 100 naira or Ksh // should be dynamic
        tipNudge: '',
        currency: !sessionStorage.getItem('shukran-country-currency') ? "NGN" : sessionStorage.getItem(
          'shukran-country-currency'), // hardcoding NGN isn't ideal
        message: '',
        nickname: !localStorage.getItem('shukran-supporter-nickname') ? '' : localStorage.getItem(
          'shukran-supporter-nickname'),
        supporter_email: !localStorage.getItem('shukran-supporter-email') ? '' : localStorage.getItem(
          'shukran-supporter-email'),
        amount: '', // should be 0
        // phone: !localStorage.getItem('shukran-supporter-phone') ? '' : localStorage.getItem('shukran-supporter-phone'),
        tipbtn: 'Tip',
        isSubscribing: false,
        paymentID: undefined,
        cancel: null,
        redirect: '',
        subscriptions: [],
        creatorInfo: {},
        emailRegEx: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/, // checking for email, why though?
        issue: ''
      }
    },
    computed: {},
    watch: {
      isSubscribing: function (val) { // right now, if they change the amount after we've made a request, we can't update the subscription to reflect the new amount... we need our custom payment kini so we sort everything in the backend
        if (val) {
          this.subbed()
        }
      },
      supporter_email: function (value, oldValue) {
        localStorage.setItem('shukran-supporter-email', value)
      },
      $route (to, from) { // necessary ?
        console.log('to ====>', to);
        document.title = to.meta.title;
        document.querySelector('head meta[property="twitter:image"]').content = `${process.env.BASE_URL}/api/smp/${to.params.username}`;
        document.querySelector('head meta[property="og:image"]').content = `${process.env.BASE_URL}/api/smp/${to.params.username}`;
      }
    },
    methods: {
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
      getSubs() { // why not do this on first initial request
        axios.get(process.env.BASE_URL + `/api/getsubscriptions/${this.creatorInfo._id}/`, {
            withCredentials: true
          })
          .then((res) => {
            // console.log('subs res',res); // debug
            this.subscriptions = res.data;
          }).catch((err) => console.error('subs err', err));
      },
      subbed() {
        try {
          // console.log('tryigng to sub', this.subscriptions);
          // careful here, it's important we use '==' not '===', this.amount is string, sub.amount is int... == would work for comparison, but === won't
          this.paymentID = this.subscriptions.find(sub => parseFloat(sub.amount) == parseFloat(this.amount) && sub.currency == this.currency)
            .id // using '?.id' sadly doens't work
          // console.log(this.paymentID, '99');
        } catch (error) { // means there are no subs like that

        }
        // 
        if (this.isSubscribing && this.paymentID === undefined) { // check if it hasn't ran
          const source = axios.CancelToken.source();
          let paymentID = this.paymentID; // re-assign because we don't see it inside axios.intercptors.request.use(...)
          axios.interceptors.request.use(function (config) {
            // Do something before request is sent, like we're inserting a timeout for only requests with a particular baseURL
            if (paymentID === undefined && config.url === process.env.BASE_URL + '/api/createsubscription/') {
              // config.timeout = 4000;
              return config
            } else if (paymentID !== undefined && config.url === process.env.BASE_URL +
              '/api/createsubscription/') { // we could add checking that paymentID is a number --over-kill
              source.cancel('Can\'t make more than one reqeust for subscription'); // cancels request
            } else {
              return config
            }
            // console.log(config)
          }, function (error) {
            // Do something with request error
            return Promise.reject(error);
          });

          // before we make this call, let's check if the subscirption amount exits in this.subscirptions
          axios.post(process.env.BASE_URL + '/api/createsubscription/', {
            amount: parseFloat(this.amount),
            supporter_email: this.supporter_email, // not using
            creator_email: this.creatorInfo.email, // not using
            creator_username: this.username, // not using
            creator_id: this.creatorInfo._id, // not using
            name: `shukraning-${this.creatorInfo._id}`, // using _id is surety, [we stopped using email]
          }, {
            cancelToken: source.token
          }).then(res => { // set the subscription/payment plan ID
            //console.log('good subscription', res)
            this.paymentID = res.data
          }).catch(err => {
            // console.log('bad subscription', err)
          }).finally(() => {
            // console.log('we\'re getting the payment plan id')
          })

        }
        // console.log(this.paymentID, '8');
      },
      showUserWelcome() {
        axios.post(process.env.BASE_URL + '/api/creatorprofile/', {
          username: this.username.toLowerCase().trim()
        }, {
          withCredentials: true
        }).then(res => {
          // console.log('creator profile', res) // if res.data is empty, say we don't have any such creators
          this.creatorInfo = res.data[0];
          this.getSubs()
        }).catch(err => {
          // console.log('!!', err)
        }).finally(() => {

        })
      },
      showTipNudge() {
        if (this.currency == "USD") {
          this.tipGuard = 3;
        } else {
          this.tipGuard = process.env.TIP_GUARD; // should be 100
        }

        if (isNaN(this.amount)) {
          this.tipNudge = `Please input a valid number as amount`;
        } else if (this.amount < this.tipGuard && this.amount !== '') {
          this.tipNudge = `Please support ${this.username} with at least ${this.currencySymbol()}${this.tipGuard}`;
        } else {
          this.tipNudge = ''
        }
      },
      contentType(mime) {
        switch (mime) {
          case "image/jpeg":
          case 'image/gif':
          case 'image/jpg':
          case 'image/png':
          case 'image/tiff':
          case 'image/vnd.wap.wbmp':
          case 'image/x-icon':
          case 'image/x-jng':
          case 'image/x-ms-bmp':
          case 'image/svg+xml':
          case 'image/webp':
            return "IMAGE";
            break;
          case "application/msword":
          case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':

          case "application/rtf":
            return "DOC";
            break;
          case "application/pdf":
            return "PDF";
            break;
          case "video/webm":
          case "video/3gpp2":
          case "video/3gpp":
          case "video/mp2t":
          case "video/ogg":
          case "video/x-msvideo":
          case "video/mpeg":
            return "VIDEO";
            break;
          case "audio/mpeg":
          case "audio/3gpp2":
          case "audio/3gpp":
          case "audio/webm":
          case "audio/wav":
          case "audio/acc":
          case "audio/ogg":
          case "audio/opus":
            return "AUDIO";
            break;
          case "application/zip":
          case "application/x-7z-compressed":
          case "application/vnd.rar":
          case "application/x-bzip2":
          case "application/x-bzip":
            return "ZIP";
            break;
          default:
            return "FILE";
            break;
        }
      },
      save() {
        // [optimize] save their email & nickname & phone number for later autofilling

        analytics.identify(this.supporter_email, {
          nickname: this.nickname
        });
        analytics.track('Tipping Creator', {
          authentication: 'Tipped creator'
        })

        localStorage.setItem('shukran-supporter-nickname', this.nickname);
        localStorage.setItem('shukran-supporter-email', this.supporter_email);
        // localStorage.setItem('shukran-supporter-phone', this.phone);

        // optimize re-assignments//
        let supporter_email = this.supporter_email
        let username = this.username
        let supporter_nickname = this.nickname
        let message = this.message
        let amount = this.amount
        // let phone = this.phone
        let currency = this.currency
        let creator_email = this.creatorInfo.email
        let creator_id = this.creatorInfo._id
        let redirect = this.creatorInfo.redirect || this.creatorInfo.primary_link
        let isSub = this.isSubscribing
        if (supporter_email == '' || amount == '') {
          this.issue = 'Enter email & amount please'
          this.tipbtn = "Tip"
        } else if (!this.emailRegEx.test(this.supporter_email)) {
          this.issue = "Please enter a correct email";
          this.tipbtn = "Tip"
        } else {
          // paystack
          /* 
            var handler = PaystackPop.setup({
            key: 'pk_live_01351689dce87a8749467a962e29c12f79388c3d',
            supporter_email: supporter_email,
            amount: parseFloat(amount) * 100,
            currency: sessionStorage.getItem("shukran-country-currency"),
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
               localStorage.setItem('shukran_email', supporter_email)
               localStorage.setItem('shukran_nickname', supporter_nickname)
               // localStorage.setItem('shukran_phone', phone)
               axios.post(process.env.BASE_URL + '/api/createtransaction/', {
                  username: username,
                  supporter_nickname: supporter_nickname,
                  amount: amount,
                  currency: currency,
                  message: message,
                  status: 'received',
                  creator_email: creator_email
                  }).then(res => {
                     console.log('tipped')
                     if (redirect == '') {
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
            tx_ref: `${supporter_email}-shukran${this.isSubscribing ? 'ing' : ''}-${this.creatorInfo._id} @ ${Date.now()} | ${location.href}`,
            amount: parseFloat(amount), // why previously parseInt ?
            // https://stackoverflow.com/a/40560953
            // make country based on currency? how about ?
            ...(this.currency == "KES") && {
              country: "KE"
            }, // !sessionStorage.getItem('shukran-country-code') ? "NG" : sessionStorage.getItem('shukran-country-code')
            currency: this.currency,
            ...(this.currency == "GBP") && {
              type: "debit_uk_account"
            }, // to accept uk payments
            payment_options: "card, mobilemoney, ussd, account, banktransfer, mpesa, qr, payattitude, credit",
            // redirect_url: redirect ? redirect : process.env.BASE_URL + '/thanks', // specified redirect URL
            // creating subscriptions
            ...(this.isSubscribing && this.paymentID !== undefined) && {
              payment_plan: this.paymentID
            },
            meta: { // Goes to our flutterwave dashboard
              supporter_message: message,
              supporter_nickname: supporter_nickname,
              // consumer_mac: "92a3-912ba-1192a", // https://ourcodeworld.com/articles/read/257/how-to-get-the-client-ip-address-with-javascript-only
            },
            customer: {
              email: supporter_email, // must be 'email'
              supporter_message: message,
              supporter_nickname: supporter_nickname,
              creator_username: username,
              subscribing: this.isSubscribing
            },
            callback: function (response) { // if transaction not successful, don't do anything... get info why & probably who...
                // console.log('call back redirect', redirect);
                let _redirect = redirect
              if (response.status == "successful") {
                if (response.currency !== "NGN") { // we can do more
                  amount = fx(amount) // convert to NGN
                    .from(response.currency).to("NGN")
                }
                axios.post(process.env.BASE_URL + '/api/createtransaction/', { // we should ref the creator id
                  username: username, // creator_username
                  supporter_nickname: supporter_nickname,
                  supporter_email: supporter_email,
                  creator_id: creator_id,
                  amount: amount,
                  message: message,
                  status: 'received',
                  currency: 'NGN', // currency
                  tx_ref: response.tx_ref,
                  creator_email: creator_email
                }, {
                  withCredentials: true
                }).then(res => { // if they subscribed ...refresh the page to show their content.
                  console.log('tipped res', JSON.stringify(res));
                  console.log('this', JSON.stringify(this));
                  console.log('redirected response', document.URL, JSON.parse(res.config.data).tx_ref);
                  console.info('_redirect', _redirect)
                  if (JSON.parse(res.config.data).tx_ref.includes('-shukraning-')) {
                    // Vue.set('profile', res.data); // instead update sessionStorage ??
                    location.reload()
                    location.assign(document.URL + '#content-parent')
                  } else if (_redirect) { // show some info telling them they would be redirected
                    window.location = _redirect
                  } else {
                    window.location = process.env.URL + '/thanks'; // this.$router.push('/thanks');
                  }
                }).catch(err => {
                  this.tipbtn = 'Tip'
                  this.issue = err; // what if err is not a string?!
                  // console.error('catch in tip', err)
                  window.location = process.env.URL +
                  '/thanks'; // this.$router.push('/thanks'); // should we, no because this isn't Vue ?
                })
              } else {

              }
            },
            customizations: {
              title: "Support " + username,
              description: "Shukran to " + username,
              logo: 'https://drive.google.com/uc?export=view&id=' + this.creatorInfo.picture_id,
            },
          }); // flutterwave ends here

        }
      },
    },
    beforeMount() {
      this.showUserWelcome();
    },
    mounted() {
      // this.getSubs();
      this.checkUser();
    }
  }

</script>
<style scoped>
  .sk p.peek-it {
    height: 180px;
    overflow-y: scroll;
  }

  @media screen and (max-device-width: 415px) {
    .sk p.peek-it {
      height: 120px;
    }
  }

  .description-body {
    height: auto;
  }

  .get-it {
    bottom: 30px;
  }

  @media screen and (min-width: 1200px) {
    .get-it {
      bottom: 40px;
    }
  }

  .sk {
    width: 200px;
  }

  .header-combo {
    display: flex;
    align-items: baseline;
  }

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

  .uk-navbar,
  .uk-navbar-item,
  .lead {
    background: transparent;
    color: #ffffff;
  }

  .tip-card {
    border-radius: 5px;
    margin-bottom: 30px;
  }

  .capitalize {
    text-transform: capitalize;
  }

  .uk-button {
    background-color: #c63968;
    color: #fceedd;
    border-radius: 3px
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
