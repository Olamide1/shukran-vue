<template>
  <div>
    <nav class="uk-navbar uk-navbar-container uk-margin mobile-nav">
      <div class="uk-navbar-left">
        <a class="uk-navbar-toggle" uk-toggle="target: #offcanvas-usage">
          <span uk-navbar-toggle-icon></span>
          <span class="uk-margin-small-left"></span>
        </a>

        <a class="uk-navbar-item uk-logo uk-padding-remove-left">Shukran</a>
      </div>

      <div class="uk-navbar-right">
        <div uk-form-custom="target: > * > span:first-child" class="uk-margin-small-right">
          <select id="money-sym" class="" @change="rates()" v-model="currency">
            <option value="NGN">₦</option>
            <option value="KES">Ksh</option>
            <option value="USD">$</option>
            <option value="GBP">£</option>
          </select>
          <button class="uk-button white-bg-button" id="drop-down" type="button" tabindex="-1"
            style="padding: 0 15px; text-transform: capitalize; border-radius: 3px;">
            <span></span>
            <span uk-icon="icon: chevron-down"></span>
          </button>
        </div>
      </div>
    </nav>

    <nav class="uk-navbar-container desktop-nav" uk-navbar>
      <div class="uk-navbar-left">
        <ul class="uk-navbar-nav">
          <li>
            <router-link to="/dash" active-class>Dashboard</router-link>
          </li>
          <li id="get-tipped" href="#modal-center" uk-toggle>
            <a>Get tipped</a>
          </li>
          <li>
            <router-link to="/subscribers" active-class>Shuclans</router-link>
          </li>
          <li>
            <router-link to="/profile">Profile</router-link>
          </li>
          <li id="give-feedback" uk-toggle="target: #my-id">
            <a>Give feedback</a>
          </li>
          <li id="logout" @click="logout">
            <a>Logout</a>
          </li>
        </ul>
      </div>

      <div class="uk-navbar-right">
        <ul class="uk-navbar-nav">
          <li>
            <a>
              <div uk-form-custom="target: > * > span:first-child" class="">
                <select class="" @change="rates()" v-model="currency">
                  <option value="NGN">₦</option>
                  <option value="KES">Ksh</option>
                  <option value="USD">$</option>
                  <option value="GBP">£</option>
                </select>
                <button class="uk-button" id="drop-down" type="button" tabindex="-1"
                  style="padding: 0 15px; text-transform: capitalize; border-radius: 3px;">
                  <span></span>
                  <span uk-icon="icon: chevron-down"></span>
                </button>
              </div>
            </a>
          </li>
          <li>
            <a class href="#modal-middle" uk-toggle>
              <button class="uk-button red-button request-button">Request payout</button>
            </a>
          </li>
          <li>
            <a>
              <div ref="file"
                class="us uk-height-small uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light"
                v-lazy:background-image="{src: `https://drive.google.com/uc?export=view&id=${profiles.picture_id}`, loading: '/static/img/loading.gif' }"
                uk-img>

                <div uk-tooltip="Click to change your profile picture" id="add-image" uk-form-custom="target: true">
                  <input type="file" @change="onFileChanged" />
                  <span uk-icon="icon: plus;"></span>
                </div>
              </div>
              <progress id="js-progressbar" class="top-nav-progress-bar" value="50" max="100"></progress>
              <div uk-spinner id="chill"></div>
            </a>
          </li>
        </ul>
      </div>
    </nav>

    <!-- sidebar -->
      <div id="offcanvas-usage" uk-offcanvas>
        <div class="uk-offcanvas-bar">
          <button class="uk-offcanvas-close" type="button" uk-close></button>

          <h3>Shukran</h3>
          
          <div ref="file" id="image-background"
            class="uk-height-small uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light"
            v-lazy:background-image="{src: `https://drive.google.com/uc?export=view&id=${profiles.picture_id}`, loading: '/static/img/loading.gif' }"
            uk-img>
            <div uk-tooltip="Click to change your profile picture" id="add-image" uk-form-custom="target: true">
              <input type="file" @change="onFileChanged" />
              <span uk-icon="icon: plus; ratio: 2"></span>
            </div>

          </div>
          <progress class="side-nav-progress-bar" id="snpb" value="80" max="100"></progress>
          <div uk-spinner="ratio: 2" id="wait"></div>
          
          <ul class="uk-list uk-list-divider">
            <li>
              <router-link to="/dash">Dashboard</router-link>
            </li>
            <li>
              <router-link to="/subscribers"><span
                  uk-tooltip="We like to call people who subscribe to paying you recurringly every month 'Shuclans'">Shuclans</span>
              </router-link>
            </li>
            <li id="get-tipped" href="#modal-center" uk-toggle>Get tipped</li>
            <div id="modal-center" class="uk-flex-top" uk-modal>
              <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical uk-width-auto tip-modal"
                uk-overflow-auto>
                <button class="uk-modal-close-default" type="button" uk-close></button>
                <h2 class="uk-modal-title">🎉</h2>
                <p class="show uk-text-lead">Hey {{ profiles.username }}, share the link below to get tipped.</p>
                <router-link class="uk-text-break " :to="'/cr/' + profiles.username">{{ url }}</router-link>
                <p class="uk-text-meta">
                  <span class="uk-text-bolder">TL;DR</span> Share link with your audience <textarea name=""
                    class="uk-textarea uk-form-blank" id="shukran-link" v-model="url"></textarea>
                </p>
                <p class="uk-text-meta">
                  <span class="uk-text-bolder">How exactly do you get tipped, you ask?</span> Include your link in your
                  profile description on Twitter, Instagram, YouTube, Podcasts, in your blog etc. and ask your audience
                  to support you.
                  Talk about it in your YouTube videos, Podcast episodes, and where ever you create content.
                  Most creators shy away from doing these, and really shouldn't. You can read <u><a
                      class="uk-text-primary" href="https://blog.useshukran.com/its-not-begging-youre-giving-value">what
                      we have to say</a></u> concerning that.
                </p>
                <p class="uk-margin modal-buttons">
                  <button @click="copyShukranLink" class="uk-button uk-button-default uk-margin-small-right">Copy
                    link</button>
                  <a :href="'https://twitter.com/intent/tweet?url=http%3A%2F%2Fuseshukran.com%2F&text=If+you+love+my+content,+you+can+support+me+here+https://useshukran.com/cr/'+this.profiles.username+'+so+I+can+continue+to+give+more+and+better'"
                    class="uk-button tweet-it" target="blank">
                    Tell others
                    <span class="" uk-icon="twitter"></span>
                  </a>
                </p>

              </div>
            </div>
            <li>
              <router-link to="/profile">Profile</router-link>
            </li>
            <!--Feedback area start -->
            <li id="give-feedback" uk-toggle="target: #my-id">
              Give feedback
              <a uk-icon="heart"></a>
            </li>
            <div id="my-id" uk-modal>
              <div class="uk-modal-dialog uk-modal-body">
                <h2 class="uk-modal-title">Hi {{ profiles.username }}</h2>
                <p>Show some love 😊or raise an issue 🙃</p>
                <div class="uk-margin">
                  <textarea class="uk-textarea" placeholder="Type your message" v-model="comment"></textarea>
                </div>
                <div class="uk-margin">
                  <button class="uk-button red-button" @click="submitFeedback">{{feed}}</button>
                </div>
                <button class="uk-modal-close-default" type="button" uk-close></button>
              </div>
            </div>
            <!--Feebdack area end -->
            <li id="logout" @click="logout">Logout</li>
          </ul>
        </div>
      </div>
      <!-- Sidebar end -->

      <!-- Cropper -->

      <div id="cropper-modal" class="cropper-modal uk-flex-top" uk-modal>
          <div id="inner-cropper" class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">

              <button class="uk-modal-close-outside" type="button" uk-close></button>

              <div id="main-cropper">
                <cropper
                  ref="cropper"
                  :src="img"
                  :stencil-props="{
                    handlers: {},
                    movable: false,
                    scalable: false,
                    aspectRatio: 1,
                  }"
                  :stencil-size="{
                    width: 300,
                    height: 300
                  }"
                  image-restriction="stencil"
                />

                <div class="uk-margin-top">
                  <button @click="crop" class="uk-button">
                    Done
                  </button>

                  <button @click="rotate(+10)" class="uk-button crop-icon">
                    <span uk-icon="icon: future"></span>
                  </button>

                  <button @click="rotate(-10)" class="uk-button crop-icon">
                    <span uk-icon="icon: history"></span>
                  </button>

                  <button @click="zoom(1.5)" class="uk-button crop-icon">
                    <span uk-icon="icon: expand"></span>
                  </button>

                  <button @click="zoom(0.5)" class="uk-button crop-icon">
                    <span uk-icon="icon: shrink"></span>
                  </button>
                </div>
              </div>

          </div>
          
      </div>

      <!-- Cropper end -->
  </div>
</template>

<script>
  import axios from "axios";
  import fx from "money";
  /**
   * https://norserium.github.io/vue-advanced-cropper/components/cropper.html#events
   */
  import { Cropper, StencilPreview, BoundingBox, DraggableArea } from 'vue-advanced-cropper'; // using Static Cropper
  import 'vue-advanced-cropper/dist/style.css';
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
  components: {
    Cropper
  },
  props: [],
  name: "TopSideHeader",
  data() {
    return {
      currency: !sessionStorage.getItem("shukran-country-currency") ? "NGN" : sessionStorage.getItem(
          "shukran-country-currency"), // optimse later, use country's currency
      profiles: JSON.parse(sessionStorage.getItem("profile")),
      // username: JSON.parse(sessionStorage.getItem('profile')).username, // very redundant!!!
      url: "https://useshukran.com/cr/" + encodeURIComponent(JSON.parse(sessionStorage.getItem('profile')).username.trim()),
      comment: "",
      feed: "Send", // why though ? why feed...?
      img: 'https://useshukran.com/static/img/blank-profile-picture.png', // https://images.unsplash.com/photo-1611232099906-dc95961260a4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80
      finalImage: ''
    }
  },
  methods: {
    logout() {
        sessionStorage.clear();
        this.$router.push("/accounts");
    },
    rates() {
        sessionStorage.setItem('shukran-curr-cur-sym', this.currencySymbol)

        this.$emit('change-rates', this.currency)
    },
    onFileChanged(event) {
        
        // make sure we don't have memory leaks
        this.img = window.URL.createObjectURL(event.target.files[0])

        UIkit.modal('#cropper-modal').show();
    },
    crop() {

        const {
          coordinates, imageTransforms, visibleArea, canvas 
        } = this.$refs.cropper.getResult();
        // You able to do different manipulations at a canvas
        // but there we just get a cropped image, that can be used 
        // as src for <img/> to preview result
        this.finalImage = canvas.toDataURL();

        let imageBuffer = new Buffer(this.finalImage, 'base64'); //console = <Buffer 75 ab 5a 8a ...
        
        // console.log('imageBuffer base64', imageBuffer);
        // console.log('canvas dataurl', this.finalImage);

        let bar1 = document.getElementById('snpb');
        let bar2 = document.getElementById('js-progressbar');

        let loader1 = document.getElementById('wait');
        let loader2 = document.getElementById('chill');
        bar1.style.display = 'block';
        bar2.style.display = 'flex';

        // re-assign to be used in nested callback
        let profile_id = this.profiles._id;
        let _this = this;
        canvas.toBlob(
            function(blob){

                let formData = new FormData();
                // console.log('++==', _this);
                formData.append("id", profile_id);
                formData.append("pic", blob);
                //continue do something...

                // close modal
                UIkit.modal('#cropper-modal').hide()

                axios.post(process.env.BASE_URL + "/api/update/", formData, {
                    onUploadProgress: progressEvent => {
                      // console.log(progressEvent.loaded / progressEvent.total, `${progressEvent.loaded} / ${progressEvent.total}`);
                      bar1.value = bar2.value = parseInt((progressEvent.loaded / progressEvent.total) * 100)
                      if (progressEvent.loaded / progressEvent.total == 1) {
                        bar1.style.display = bar2.style.display = 'none';
                        loader1.style.display = loader2.style.display = 'block';
                      }
                    }
                })
                .then(res => {
                  loader1.style.display = loader2.style.display = 'none';
                  _this.profiles.picture_id = res.data;
                  sessionStorage.setItem('profile', JSON.stringify(_this.profiles)) // update session too
                })
                .catch(error => {
                  console.error("error occured", error);
                });
            },
            'image/png',
            // 0.8
        );
    },
    zoom(degree) {
			this.$refs.cropper.zoom(degree);
		},
    rotate(angle){
      this.$refs.cropper.rotate(angle);
    },
    copyShukranLink(evt) {
        let copyText = document.getElementById("shukran-link"); // 'https://useshukran.com/cr/' + this.username;
        copyText.select();
        document.execCommand("copy");
        evt.target.innerText = 'COPIED!'
        setTimeout(function () { // kinda too fast... we should delay a bit
          evt.target.innerText = 'COPY LINK'
        }, 5000)
    },
    submitFeedback() {
        let username = this.profiles.username;
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
            alert("Thank you for your feedback!"); // no alert please
          })
          .catch(err => {
            // console.log(err);
          });
    },
  },
}
</script>

<style scoped>

/* #inner-cropper {
  max-width: 40%;
  max-height: auto;
} */

.crop-icon {
  padding: 0 15px;
}
.uk-button {
  background-color: #c63968;
  color: #fceedd;
}
  .uk-navbar-toggle {
    color: #ffffff;
  }
  .uk-navbar,
  .uk-navbar-item,
  .lead {
    background: transparent !important;
    color: #ffffff !important;
  }
  .desktop-nav {
    margin: 30px;
    border-radius: 5px;
    background: #edf4f0 !important;
    color: #111011 !important;
  }

  .request-button {
    border-radius: 3px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  }

  @media (min-width: 960px) {

    .mobile-nav {
      display: none;
    }
      a.router-link-exact-active {
  color: #333;
}

  }

   @media (max-width: 960px) {

    a.router-link-exact-active {
      color: #c63968;
    }

    .desktop-nav,
    .request-button {
      display: none;
    }
   
  }
  .uk-button.white-bg-button {
    background-color: white;
    color: #000;
  }

  #chill {
    display: none;
    margin-left: -35px;
    z-index: 20;
  }

  #wait {
    display: none;
    margin-top: -70px;
    margin-left: 10px;
    position: absolute;
  }

.red-button {
    background-color: #c63968 !important;
    color: #fceedd;
  }
  .us {
    z-index: 10;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-left: -10px;
  }

   .tip-modal {
    border-radius: 5px;
    box-shadow: 0 5px 15px rgba(4, 4, 4, 0.45);
  }

    #add-image {
    opacity: 0;
  }

  #add-image:hover {
    opacity: 1;
  }
    #image-background {
    width: 80px;
    height: 80px;
    border-radius: 5px;
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

  #modal-middle,
  #my-id {
    /* background-color: #fceedd; */
    color: #ff6870;
  }

    #my-id>div {
    border-radius: 5px;
  }

  #my-id>div textarea,
  #my-id>div button {
    border-radius: 3px;
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
.side-nav-progress-bar {
    width: 29.5%;
    position: absolute;
    margin-top: -7.5px;
    height: 10px;
    display: none;
  }
  
</style>