<template subscribers-body>
  <div class="uk-container-expand">
    
    <div class="uk-section">
      <!-- sidebar -->
      
      <!-- Sidebar end -->
      <div class="uk-container">
        <h3 class="h3">
          Hello
        </h3>
        <div class=" uk-child-width-1-2@m uk-grid-match" uk-grid uk-height-match="row: false">

          <!-- Total revenue start -->
          <div>
            <div class="uk-card uk-card-default uk-card-body"
              uk-scrollspy="cls: uk-animation-slide-bottom; repeat: true">
              <div class="sub-list-header">
                <h3 class="uk-card-title"><span
                    uk-tooltip="Transfer to any African account">Shukran International transfers</span></h3>
                <!-- The button toggling the message modal -->
                <span class="uk-icon-button send-message-all" uk-icon="info" data-uk-tooltip
                  title="Make transfers to select African countries from outside Africa"
                  ></span>
              </div>
              <div class="total-revenue">
                <p>Destination Account Details</p>
              </div>
              <!-- This is the modal -->
              
              <div class="">
                <div class="uk-padding-small uk-padding-remove-top">
              <form class="uk-grid-small" uk-grid>
                  <div class="uk-width-1-1">
                      <input
                      required
                        type="text"
                        class="uk-input"
                        placeholder="Destination country"
                        v-model="destination_country"
                        list="african_countries"
                      />
                      <datalist id="african_countries">
                        <!-- supported currencies rwf ngn ghs kes rwf ugx sll usd eur xaf zar xof zmw -->
                          <option value="Nigeria">Nigeria</option>
                          <option value="Sierra Leone">Sierra Leone</option>
                          <option value="Central African Republic">Central African Republic</option>
                          <option value="Kenya">Kenya</option>
                          <option value="Uganda">Uganda</option>
                          <option value="Cameroon">Cameroon</option>
                          <option value="Chad">Chad</option>
                          <option value="DR Congo">DR Congo</option>
                          <option value="Guinea">Guinea</option>
                          <option value="Tanzania">Tanzania</option>
                          <option value="Rwanda">Rwanda</option>
                          <option value="Ghana">Ghana</option>
                          <option value="Gabon">Gabon</option>
                          <option value="Equatorial Guinea">Equatorial Guinea</option>
                          <option value="Namibia">Namibia</option>
                          <option value="South Africa">South Africa</option>
                          <option value="Cote d'Ivoire">Côte d'Ivoire</option>
                          <option value="Niger">Niger</option>
                          <option value="Burkina Faso">Burkina Faso</option>
                          <option value="Senegal">Senegal</option>
                          <option value="Mali">Mali</option>
                          <option value="Benin">Benin</option>
                          <option value="Zambia">Zambia</option>
                      </datalist>
                  </div>
                  <div class="uk-width-1-1">
                      <input
                      required
                        type="text"
                        class="uk-input"
                        placeholder="Destination Bank Name"
                        v-model="destination_bank"
                      />
                  </div>
                  <div class="uk-width-1-1">
                      <input
                      required
                        type="text"
                        class="uk-input"
                        placeholder="Bank Account Name"
                        v-model="destination_bank_account_name"
                      />
                  </div>
                  <div class="uk-width-1-1">
                      <input
                      required
                        type="tel"
                        class="uk-input"
                        placeholder="Bank Account Number"
                        v-model="destination_bank_account_number"
                      />
                  </div>
                  <div class="uk-width-1-1">
                      
                      <div style="display: flex">
                        <div class="uk-form-controls" style="margin-right: 1px">
                          <select
                          required
                          @change="feeRate()"
                            v-model="sender_currency"
                            style="border-radius: 3px"
                            class="uk-select uk-form-width-xsmall">
                            <option value="USD">$</option>
                            <option value="EUR">€</option>
                            <option value="GBP">£</option>
                            <!-- <option value="NGN">₦</option>
                            <option value="KES">Ksh</option>
                            <option value="USD">$</option>
                            <option value="RWF">RF</option>
                            <option value="GHS">GH¢</option>
                            <option value="UGX">USh</option>
                            <option value="SLL">Le</option>
                            <option value="XAF">FCFA</option>
                            <option value="ZAR">R</option>
                            <option value="XOF">CFA</option>
                            <option value="ZMW">ZK</option> -->
                          </select>
                        </div>
                        <input
                        required
                          type="number"
                          class="uk-input"
                          placeholder="Amount"
                          v-model="amount"
                        />
                      </div>
                    <span class="uk-text-meta">
                      Transaction fee of {{currencySymbol}} {{fee}}
                    </span>
                      

                  </div>
                  <p class="uk-padding-remove-left">Billing info.</p>

                  <div class="uk-width-1-1">
                      <input
                      required
                        type="text"
                        class="uk-input"
                        autocomplete="name"
                        placeholder="Fullname"
                        v-model="sender_fullname"
                      />
                  </div>
                  <div class="uk-width-1-1">
                      <input
                      required
                        type="email"
                        class="uk-input"
                        autocomplete="email"
                        placeholder="Email"
                        v-model="sender_email"
                      />
                  </div>

                  <p>{{issue}}</p>

                  
              </form>
              <!-- make this bit responsive -->
                    <button
                      :disabled="!amount"
                      class="uk-button uk-button-default"
                      @click="save()"
                    >Send</button>
                    <!-- todo: send email once payment is made -->
              <div>
              
            </div>
            </div>
                
              </div>
            </div>
          </div>
          
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
  // inspiration https://uidesigndaily.com/posts/sketch-dashboard-ui-components-upgrade-stats-statistics-admin-panel-day-1076
  import axios from "axios";
  import Chart from "chart.js";
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
    "NGN": 420, // 396.700509,
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
    name: "IntlTransfers",
    data() {
      return {
        issue: '',
        sender_currency: 'USD', // optimse later, use country's currency
        destination_bank: '',
        destination_country:'',
        destination_bank_account_number: '',
        destination_bank_account_name: '',
        sender_fullname: '',
        sender_email: '',
        amount: "",
        fee: 4.8,
        message: '',
        message_subject: '',
        message_status: 'Send',
        balance: 0,
        comment: "",
        feed: "Send",
      };
    },
    computed: {
      currencySymbol() {
        switch (this.sender_currency) {
          case "USD":
            return "$";
          case "EUR":
            return "€";
          case "GBP":
            return "£";
          default:
            return "$";
        }
      }
    },
    watch: {
      
    },
    methods: {
      save() {
      // [optimize] save their email & nickname & phone number for later autofilling
      analytics.identify(this.sender_email, {
        fullname: this.sender_fullname,
      });
      analytics.track("International Transfer", {
        authentication: "International Transfer",
      });

      localStorage.setItem("shukran-intl-transfer-fullname", this.sender_fullname);
      localStorage.setItem("shukran-intl-transfer-email", this.sender_email);
      // localStorage.setItem('shukran-supporter-phone', this.phone);

      
      // let phone = this.phone
      
      if (this.sender_email == "" || this.amount == "") {
        this.issue = "Enter email & amount please";
      } else {
        let sender_email = this.sender_email,
            destination_bank_account_number = this.destination_bank_account_number,
            destination_bank = this.destination_bank,
            amount = this.amount,
            destination_bank_account_name = this.destination_bank_account_name,
            sender_fullname = this.sender_fullname,
            sender_currency = this.sender_currency,
            destination_country = this.destination_country
            ;
       
        // flutterwave
        // console.log('flutter wave visibilty??', this.sender_fullname);
        
        FlutterwaveCheckout({
          public_key: "FLWPUBK-fe9f65ed4b3608107e0c150e34f52c98-X",
          tx_ref: `${sender_email}-intl-transfer-to-${ // never changing this ref
            destination_bank
          }-${destination_bank_account_number} @ ${Date.now()}`,
          amount: parseFloat(amount), // why previously parseInt ?
          // https://stackoverflow.com/a/40560953
          currency: sender_currency,
          ...(sender_currency == "GBP" && {
            type: "debit_uk_account",
          }), // to accept uk payments
          payment_options:
            "card, mobilemoney, ussd, account, banktransfer, mpesa, qr, payattitude, credit",
          redirect_url: process.env.BASE_URL + '/thanks', // specified redirect URL
          
          meta: {
            // Goes to our flutterwave dashboard
            sender_email: sender_email,
            destination_bank_account_name: destination_bank_account_name,
            destination_bank_account_number: destination_bank_account_number,
            destination_bank: destination_bank,
            amount: amount,
            sender_fullname: sender_fullname,

            sender_currency: sender_currency,
            destination_country: destination_country,
            // https://ourcodeworld.com/articles/read/257/how-to-get-the-client-ip-address-with-javascript-only
          },
          customer: {
            email: sender_email, // must be 'email'
            fullname: sender_fullname,
          },
          callback: function (response) {
            // if transaction not successful, don't do anything... get info why & probably who...
            // console.log('resssss', response);
            // console.log('lemon peppr order, this?', this);
            if (response.status == "successful") {
              
              axios
                .post(
                  process.env.BASE_URL + "/api/createinternationaltransaction/",
                  {
                    // we should ref the creator id
                    sender_currency: sender_currency,
                    destination_country: destination_country,
                    destination_bank: destination_bank,
                    amount: amount,
                    destination_bank_account_name: destination_bank_account_name,
                    destination_bank_account_number: destination_bank_account_number,
                    // status: status,
                    sender_fullname: sender_fullname,
                    sender_email: sender_email
                  },
                  {
                    withCredentials: true,
                  }
                )
                .then((res) => {
                  
                })
                .catch((err) => {
                  this.tipbtn = "Tip";
                  this.issue = err; // what if err is not a string?!
                  console.error('catch in tip', err)
                  window.location = process.env.URL + "/thanks"; // this.$router.push('/thanks'); // should we, no because this isn't Vue ?
                });
            } else {
            }
          },
          onclose: function() {
            // close modal
            // console.log('ouchhh, closeddd');
          },
          customizations: {
            title: `Send to ${destination_country}`,
            description: `Sending to ${destination_bank}, ${destination_bank_account_number}`,
            logo: "https://drive.google.com/uc?export=view&id=1GfeklRxs6fyzI7Kz1qYGKaskU_oHfrLq",
          },
        }); // flutterwave ends here
      }
    },
    feeRate(){
      console.log('curr', this.sender_currency);
      this.fee = fx(2000) // convert fee rate
          .from("NGN").to(this.sender_currency).toFixed(2)
    },
      
      submitFeedback() { // use later
        let username = this.username;
        let comment = this.comment;
        this.feed = "Sending...";
        axios
          .post(process.env.BASE_URL + "/api/givefeedback/", {
            username: username,
            comment: comment
          })
          .then(res => {
            // console.log("feedback submitted");
            UIkit.modal("#my-id").hide();
            alert("Thank you for your feedback!");
          })
          .catch(err => {
            // console.log(err);
          });
      },

      
    },
    mounted() {
    },
    beforeMount() {}
  };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a.router-link-exact-active {
  color: #333;
}
  .modal-buttons>* {
    border-radius: 3px;
    background-color: #c63968 !important;
    color: #fceedd;
  }
.uk-button.white-bg-button {
    background-color: white;
    color: #000;
  }
  .tip-modal {
    border-radius: 5px;
  }

  @media (max-width: 640px) {
    .modal-buttons>.uk-button {
      padding: 0 10px;
      font-size: 0.8rem;
    }
    .uk-icon-button {
      width: 40px;
    }
  }

  @media (min-width: 640px) {
    textarea {
      height: 50px;
    }
  }

  div[contenteditable] {
    min-height: 25px;
  }

  div[contenteditable]:empty::before {
    content: '*Add a description';
    color: rgba(0, 0, 0, 0.2);
  }

  div[contenteditable='true'] {
    outline: auto;
  }

  .threshold-price {
    height: 30px;
    width: 70px;
    margin-bottom: 5px;
    padding: 2px 0 2px 0;
  }

  .the-what {
    /** https://css-tricks.com/line-clampin/ */
    /* width: 250px; */
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  .content-name {
    width: 75%;
  }

  @media (max-width: 960px) {
    .content-name {
      width: 50%;
    }
  }

  .uk-icon-button.send-message-all {
    background: #e46067;
    color: #212121;
  }

  .total-revenue {
    display: flex;
    align-items: baseline;
  }

  .total-revenue small {
    padding-left: 5px;
  }

  #my-id>div {
    border-radius: 5px;
  }

  #my-id>div textarea,
  #my-id>div button {
    border-radius: 3px;
  }

  .sub-list-header {
    display: inline-flex;
    width: 100%;
    justify-content: space-between;
  }

  .cont-list-header {
    align-items: baseline;
  }

  .cont-list-header button {
    border-radius: 3px;
  }

  .uk-form-custom input[type=file] {
    cursor: pointer;
  }

  /** circle progress bar https://stackoverflow.com/a/48441688/9259701 */
  .top-nav-progress-bar {
    display: none;
    z-index: 1;
    margin-left: -5px;

    position: absolute;
    height: 46px;
    width: 46px;
    /* display: flex; */
    align-items: center;
    justify-content: center;
    color: blue;
    /* margin:30px 30px; */
    float: left;
  }

  .top-nav-progress-bar:before {
    content: "";
    background: white;
    position: absolute;
    z-index: 100;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: auto auto;
  }

  progress.top-nav-progress-bar::-moz-progress-bar {
    background: transparent;
  }

  progress.top-nav-progress-bar::-webkit-progress-bar {
    background: transparent;
  }

  progress.top-nav-progress-bar::-moz-progress-value {
    background: blue;
  }

  progress.top-nav-progress-bar::-webkit-progress-value {
    background: blue;
  }

  .top-nav-progress-bar {
    border-radius: 100%;
    overflow: hidden;
    padding: 0;
  }

  .side-nav-progress-bar {
    width: 29.5%;
    position: absolute;
    margin-top: -7.5px;
    height: 10px;
    display: none;
  }

  #wait {
    display: none;
    margin-top: -70px;
    margin-left: 10px;
    position: absolute;
  }

  #chill {
    display: none;
    margin-left: -35px;
    z-index: 20;
  }

  .uk-container-expand {
    background-image: linear-gradient(135deg, #c63968 0%, #ff746c 100%);

    position: fixed;
    bottom: 0;
    right: 0;
    top: 0;
    left: 0;
    overflow: auto;
  }

  .uk-navbar,
  .uk-navbar-item,
  .lead {
    background: transparent !important;
    color: #ffffff !important;
  }

  .uk-container-expand {
    color: #ebebe7 !important;
  }

  .uk-accordion-content {
    color: #ff6870 !important;
  }

  .show {
    color: #c63968;
  }

  .h3,
  .uk-navbar-toggle {
    color: #ffffff;
  }

  .uk-offcanvas-bar {
    color: #fceedd;
  }

  .uk-card,
  .uk-card-title,
  .uk-heading-small {
    color: #666 !important;
    margin-top: 0px;
  }

  .uk-card,
  .uk-alert,
  .payout-modal {
    border-radius: 5px;
  }

  .payout-input,
  .payout-button {
    border-radius: 3px;
  }

  .payout-button[disabled="disabled"] {
    cursor: not-allowed;
  }

  .uk-alert {
    text-align: left;
  }

  .capitalize {
    text-transform: capitalize;
  }

  .uk-section {
    /* background-color: #fceedd !important; */
    color: #ff6870 !important;
  }

  .uk-label {
    background: #ff6870;
    color: #fceedd;
  }

  .uk-modal {
    background-color: #ff6870 !important;
    color: #fceedd;
  }

  #modal-middle,
  #my-id {
    /* background-color: #fceedd; */
    color: #ff6870;
  }

  .uk-button {
    background-color: #c63968;
    color: #fceedd;
  }

  li#give-feedback,
  li#get-tipped,
  li#logout {
    cursor: pointer;
  }

  li#give-feedback:hover,
  li#get-tipped:hover,
  li#logout:hover {
    text-decoration: underline;
  }

  #image-background {
    width: 80px;
    height: 80px;
    border-radius: 5px;
  }

  #add-image {
    opacity: 0;
  }

  #add-image:hover {
    opacity: 1;
  }

  div[data-src][src*="data:image"] {
    background: rgba(0, 0, 0, 0.1);
  }

  .uk-modal-dialog.uk-modal-body.uk-margin-auto-vertical.uk-width-auto {
    border-radius: 5px;
    box-shadow: 0 5px 15px rgba(4, 4, 4, 0.45);
  }

  .us {
    z-index: 10;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-left: -10px;
  }

  /**https://stackoverflow.com/a/32186894 */


  ul.metrics {
    margin-bottom: 25px;
  }

  ul.metrics>li {
    list-style: none;
  }

  li.li-available:before {
    content: "•";
    font-size: 450%;
    line-height: 0;
    margin: 0 0.3rem 0 -2rem;
    position: relative;
    top: 1.2rem;
    bottom: 0;
    color: rgb(79, 192, 116);
  }

  li.li-withdrawn:before {
    content: "•";
    font-size: 450%;
    line-height: 0;
    margin: 0 0.3rem 0 -2rem;
    position: relative;
    top: 1.2rem;
    bottom: 0;
    color: #329ba6;
  }

  .progress {
    height: 15px;
    width: 100%;
    display: flex;
    background-color: #329ba6;
    position: relative;
    border-radius: 500px;
  }

  .progress .value:before {
    content: attr(data-label);
    font-size: 0.8em;
    position: relative;
    text-align: center;
    top: -25px;
    left: 0;
  }

  .progress .value:nth-child(1) {
    color: rgb(79, 192, 116);
  }

  .progress .value:nth-child(2) {
    color: #329ba6;
  }

  .progress .value:nth-child(1) {
    background-color: rgb(79, 192, 116);
    border-radius: 500px 0 0 500px;
  }

  .progress .value:nth-child(2) {
    background-color: #329ba6;
    border-radius: 0 500px 500px 0;
  }

  .progress .value {
    display: block;
    height: 100%;
  }

  /**good spot */
  .desktop-nav {
    margin: 30px;
    border-radius: 5px;
    background: #edf4f0 !important;
    color: #111011 !important;
  }

  @media (min-width: 960px) {

    .mobile-nav,
    .uk-card-badge.uk-label[href] {
      display: none;
    }
  }

  @media (max-width: 960px) {

    .desktop-nav {
      display: none;
    }

    .uk-card-body {
      padding: 20px 20px;
    }
  }

</style>
