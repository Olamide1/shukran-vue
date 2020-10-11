<template subscribers-body>
  <div class="uk-container-expand">
    <nav class="uk-navbar uk-navbar-container uk-margin mobile-nav">
      <div class="uk-navbar-left">
        <a class="uk-navbar-toggle" uk-toggle="target: #offcanvas-usage">
          <span uk-navbar-toggle-icon></span>
          <span class="uk-margin-small-left"></span>
        </a>

        <a class="uk-navbar-item uk-logo uk-padding-remove-left">Shukran</a>
      </div>

      <div class="uk-navbar-right">
        <div class="uk-form-controls uk-margin-small-right" style="width: 60px;">
          <select
            @change="rates()"
            v-model="currency"
            style="border-radius: 3px"
            class="uk-select uk-form-width-xsmall"
            id="form-stacked-select"
          >
            <option value="NGN">₦</option>
            <option value="KES">Ksh</option>
            <option value="USD">$</option>
          </select>
        </div>
      </div>
    </nav>

    <nav class="uk-navbar-container desktop-nav" uk-navbar>
      <div class="uk-navbar-left">
        <ul class="uk-navbar-nav">
          <li class="uk-active">
            <router-link to="/dash">Dashboard</router-link>
          </li>
          <li id="get-tipped" href="#modal-center" uk-toggle>
            <a>Get tipped</a>
          </li>
          <li>
            <router-link to="/subscribers"><span uk-tooltip="We like to call people who subscribe to paying you recurringly every month 'Shuclans'">Shuclans</span></router-link>
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
              <div class="uk-form-controls" style="width: 60px;">
                <select
                  @change="rates()"
                  v-model="currency"
                  style="border-radius: 3px"
                  class="uk-select uk-form-width-xsmall"
                  id="form-stacked-select"
                >
                  <option value="NGN">₦</option>
                  <option value="KES">Ksh</option>
                  <option value="USD">$</option>
                </select>
              </div>
            </a>
          </li>
          <li>
            <a class href="#modal-middle" uk-toggle>
              <button class="uk-button request-button uk-button-primary">Request payout</button>
            </a>
          </li>
          <li>
            <a>
              <div
                ref="file"
                class="us uk-height-small uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light"
                v-lazy:background-image="{src: `https://drive.google.com/uc?export=view&id=${profiles[0].picture_id}`, loading: '/static/img/loading.gif' }"
                uk-img
              >

              <div
                uk-tooltip="Click to change your profile picture"
                id="add-image"
                uk-form-custom="target: true"
              >
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
    <div class="uk-section">
      <!-- sidebar -->
      <div id="offcanvas-usage" uk-offcanvas>
        <div class="uk-offcanvas-bar">
          <button class="uk-offcanvas-close" type="button" uk-close></button>

          <h3>Shukran</h3>
          <!-- -->
          <div
            ref="file"
            id="image-background"
            class="uk-height-small uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light"
            v-lazy:background-image="{src: `https://drive.google.com/uc?export=view&id=${profiles[0].picture_id}`, loading: '/static/img/loading.gif' }"
            uk-img
          >
            <div
              uk-tooltip="Click to change your profile picture"
              id="add-image"
              uk-form-custom="target: true"
            >
              <input type="file" @change="onFileChanged" />
              <span uk-icon="icon: plus; ratio: 2"></span>
            </div>

          </div>
          <progress class="side-nav-progress-bar" id="snpb" value="80" max="100"></progress>
          <div uk-spinner="ratio: 2" id="wait"></div>
          <!-- -->
          <ul class="uk-list uk-list-divider">
            <li>
              <router-link to="/dash">Dashboard</router-link>
            </li>
            <li>
              <router-link to="/subscribers"><span uk-tooltip="We like to call people who subscribe to paying you recurringly every month 'Shuclans'">Shuclans</span></router-link>
            </li>
            <li id="get-tipped" href="#modal-center" uk-toggle>Get tipped</li>
            <div id="modal-center" class="uk-flex-top" uk-modal>
              <div
                class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical uk-width-auto"
                uk-overflow-auto
              >
                <button class="uk-modal-close-default" type="button" uk-close></button>
                <h2 class="uk-modal-title">
                  Hey
                  <span class="capitalize">{{username}}</span>,
                </h2>
                <p class="show">Share this link to get tipped.</p>
                <router-link
                  :to="'/cr/' + username"
                  class="uk-modal-close"
                >https://useshukran.com/{{url}}</router-link>
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
                <h2 class="uk-modal-title">Hi {{username}}</h2>
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
            <li id="logout" @click="logout">Logout</li>
          </ul>
        </div>
      </div>
      <!-- Sidebar end -->
      <div class="uk-container">
        <h3 class="h3">
          Hello,
          <span class="capitalize">{{username}}</span>
        </h3>
        <!--<div uk-alert>
          <a class="uk-alert-close" uk-close></a>
          <h3>Notice</h3>
          <p>
            Hi {{username}}, our 10% charge will take effect on payout requests from hence forth, find the breakdown
            <router-link to="/pricing">here.</router-link> Shukran!😊
          </p>
        </div>-->

        <div class=" uk-child-width-1-2@m uk-grid-match" uk-grid uk-height-match="row: false">
          
              <!-- Total revenue start -->
              <div>
                <div class="uk-card uk-card-default uk-card-body" uk-scrollspy="cls: uk-animation-slide-bottom; repeat: true">
                  <div class="sub-list-header">
                    <h3 class="uk-card-title"><span uk-tooltip="We like to call people who subscribe to paying you recurringly every month 'Shuclans'">Shuclans</span> list</h3>
                    <!-- The button toggling the message modal -->
                    <a class="uk-icon-button send-message-all" uk-icon="file-edit" data-uk-tooltip title="Send an email message to all your subscribers. Make an announcement or send your love!" href="#send-message" uk-toggle></a>
                  </div>
                  <div class="total-revenue">
                    <h4 class="uk-heading-small">{{currencySymbol}}{{totalRevenue.toFixed(2)}}</h4>
                    <small>Total revenue</small>
                  </div>
                  <!-- This is the modal -->
                  <div id="send-message" uk-modal>
                      <div class="uk-modal-dialog uk-modal-body">
                          <button class="uk-modal-close-default" type="button" uk-close></button>
                          <h2 class="uk-modal-title">Compose message</h2>
                          <div class="uk-margin">
                              <input class="uk-input" type="text" v-model="message_subject" placeholder="Subject">
                          </div>
                          <div class="uk-margin">
                              <textarea class="uk-textarea" v-model="message" rows="5" placeholder="Type your message. All your shuclans will receive this message."></textarea>
                          </div>
                          <p class="uk-text-right">
                              <button class="uk-button uk-button-default uk-modal-close" type="button">Cancel</button>
                              <button class="uk-button uk-button-primary" @click="sendMsg" type="button">{{message_status}}</button>
                          </p>
                      </div>
                  </div>

                  <!-- Calculate total revenue from subscribers and uncomment later -->
                  <!-- <span>
                    Total revenue from subscribers.
                    <a class="uk-card-badge uk-label" href="#modal-middle" uk-toggle>Request payout</a>
                  </span>
                  <h1 class="uk-heading-small">{{currencySymbol}}{{tipTotal.toFixed(2)}}</h1> -->

                  <div class="">
                    <ul uk-accordion v-if="this.subscribing_amounts.length > 0">
                        <li class="uk-open" v-for="(sub_amount, index) in this.subscribing_amounts"
                        :key="index">
                            <a class="uk-accordion-title" href="#">{{currencySymbol}}{{sub_amount.toFixed(2)}} <span uk-tooltip="We like to call people who subscribe to paying you recurringly every month 'Shuclans'">shuclans</span></a>
                            <div class="uk-accordion-content">
                                <ul class="uk-list uk-list-striped">
                                    <li v-for="(sub, index) in subscribers.filter(s => s.amount == sub_amount)"
                                      :key="index">
                                      {{sub.name.split('-', 1)[0]}}
                                      <p><small>Subscribed {{new Date(
                                                  sub.created_at
                                                ).toLocaleDateString("en-GB", {
                                                  year: "2-digit",
                                                  month: "short",
                                                  day: "2-digit"
                                                })}}</small></p>
                                      </li>
                                    
                                </ul>
                            </div>
                        </li>
                        <!-- <li>
                            <a class="uk-accordion-title" href="#">Item 3</a>
                            <div class="uk-accordion-content">
                                <ul class="uk-list uk-list-striped">
                                    <li>List item 1</li>
                                    <li>List item 2</li>
                                    <li>List item 3</li>
                                </ul>
                            </div>
                        </li> -->
                    </ul>
                    <div v-else>
                      No <span uk-tooltip="We like to call people who subscribe to paying you recurringly every month 'Shuclans'">shuclans</span> yet
                    </div>
                  </div>
                </div>
              </div>
              <!-- Total revenue end -->

              <!-- Uncomment for next feature -->
              <div>
                <div class="uk-card uk-card-default uk-card-body" uk-scrollspy="cls: uk-animation-slide-top; repeat: true">
                  
                  <div class="sub-list-header cont-list-header">
                    <h3 class="uk-card-title">Content list</h3>
                    <div uk-form-custom>
                        <input type="file" @change="addFile">
                        <button class="uk-button uk-button-default" type="button" tabindex="1">Add file</button>
                    </div>
                  </div>

                  <div class="">
                    <ul class="uk-list uk-list-striped">
                        <li>List item 1</li>
                        <li>List item 2</li>
                        <li>List item 3</li>
                    </ul>
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
export default {
  name: "subscribers",
  data() {
    return {
      username: sessionStorage.getItem("username"),
      transactions: [],
      allTips: [], // optimise this later
      tipsDates: [],
      currency: !localStorage.getItem("shukran-country-currency") ? "NGN" : localStorage.getItem("shukran-country-currency"), // optimse later, use country's currency
      tempCurr: "",
      payoutGuard: 1000, // 1000 naira
      url: "cr/" + encodeURIComponent(sessionStorage.getItem("username").trim()),
      copied: "",
      files: [],
      amount: 0,
      message: '',
      message_subject: '',
      message_status: 'Send',
      subscribers: [],
      subscribing_amounts: [],
      tipTotal: 0,
      tipWithdrawn: 0,
      withdrawals: [],
      profiles: [JSON.parse(sessionStorage.getItem("profile"))],
      balance: 0,
      comment: "",
      feed: "Submit",
      request: "Request",
      uniqueSupporters: 0,
      totalRevenue: 0
    };
  },
  computed: {
    availableBalance() {
      return this.tipTotal - this.tipWithdrawn;
    },
    currencySymbol() {
      switch (this.currency) {
        case "NGN":
          return "₦";
          break;
        case "USD":
          return "$";
          break;
        case "KES":
          return "Ksh";
          break;
        default:
          return "₦";
          break;
      }
    }
  },
  methods: {
    addFile() {
      // this.selectedFile = event.target.files[0]
      let formData = new FormData();
      formData.append("creator_id", this.profiles[0]._id);
      formData.append("file", event.target.files[0]);
      // console.log(event.target.files);
      
      axios.post(process.env.BASE_URL + "/api/update/", formData)
        .then(res => {
          this.profiles[0].picture_id = res.data;
          sessionStorage.setItem('profile', JSON.stringify(this.profiles[0])) // update session too
        })
        .catch(error => {
          // console.log("error occured uploading", error);
        });
    },
    sendMsg() {
      this.message_status = 'Sending...';
      axios.post(process.env.BASE_URL + "/api/sendmessage/", 
       {
          username: this.username,
          subscribers: [...new Set(this.subscribers.map(s => s.name.split('-', 1)[0]))].join(';'), // get emails, seperate with ';'
          message: this.message,
          message_subject: this.message_subject
        }).then(res => {
          this.message_status = 'Sent';
          // console.log("message sent?", res);
          this.message = '', this.message_subject = '';
          UIkit.modal('#send-message').hide();
          alert('Message sent!')
        })
        .catch(err => {
          // tell them to try again later // later on, we'll be trying for them
          // console.log("send message err", err);
        });
    },
    fetchConversionDataAndUpdate() {
      
      // hide app_id
      fetch(
        `https://openexchangerates.org/api/latest.json?app_id=91527baa61514e6e81db3a2604a4822f`
      ).then(resp => resp.json())
        .then(data => {
          fx.base = "USD"; // wish it was localStorage.getItem('shukran-country-currency')
          fx.rates = data.rates;
          // console.log(data);
          localStorage.setItem(
            "shukran-currency-converter-data",
            JSON.stringify(data)
          );
        }).then(ex)
        .catch(err => {
          // console.error("fetch ex rates err", err)
        });
    },
    getSupporters() {
        // Optionally the request above could also be done as
        // we really don't need this end point, because we can just count the number of tips they've gotten, the table length
        axios.get(process.env.BASE_URL + "/api/yoursupporters/", {
            params: {
              username: this.username
            }
          })
          .then(response => {
            // console.log('how many', response.data.length);
            this.uniqueSupporters = response.data.length
          })
          .catch(error => {
            // console.log('baddd', error);
          })
          .then(() => { // always executed
          });

    },
    getSubscribers() { // here also gets total revenue
      axios.get(process.env.BASE_URL + "/api/getsubscribers/", {
            params: {
              id: this.profiles[0]._id,
              username: this.profiles[0].username,
            }
          }).then(response => {
            // console.log('how many subscribers', response);
            for (let index = 0; index < response.data.length; index++) {
              const element = response.data[index];
              this.totalRevenue += fx(element.amount) // convert all other amounts
              .from(element.currency).to(this.currency);

              // crucial part
              
              element.amount = fx(element.amount) // convert all other amounts
              .from(element.currency).to(this.currency);
            }
            this.subscribers = response.data;

            this.subscribing_amounts = [...new Set(this.subscribers.map(sub => sub.amount))]
          })
          .catch(error => {
            // console.log('baddd getsubscribers', error);
          })
          .then(() => { // always executed
          });
    },
    setFX() {
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
            const diffInDays = (new Date().getTime() - lastSavedDate.getTime()) / (1000 * 3600 * 24);
            if (diffInDays > 7) {
              // more than 7 days
              // fetch again
              this.fetchConversionDataAndUpdate();
            } else {
              // less than a week old? then just convert
              fx.base = "USD";
              fx.rates = savedCurrConvData.rates;
            
            }
            // console.log('all tips', this.allTips)
          }
    },
    rates() {
      this.totalRevenue = fx(this.totalRevenue) // convert tip total
            .from(
              this.tempCurr
                ? this.tempCurr
                : localStorage.getItem("shukran-country-currency")
            ).to(this.currency);


            this.subscribing_amounts = this.subscribing_amounts.map(amt => fx(amt) // convert all other tips
            .from(
              this.tempCurr
                ? this.tempCurr
                : localStorage.getItem("shukran-country-currency")
            ).to(this.currency));

            for (let index = 0; index < this.subscribers.length; index++) {
              let element = this.subscribers[index];
              element.amount = fx(element.amount) // convert all other tips
            .from(
              this.tempCurr
                ? this.tempCurr
                : localStorage.getItem("shukran-country-currency")
            ).to(this.currency)
            }

    this.tempCurr = this.currency; // must be last
      
    },
    logout() {
      sessionStorage.clear();
      this.$router.push("/accounts");
    },
    onFileChanged(event) {
      // this.selectedFile = event.target.files[0]
      let formData = new FormData();
      formData.append("id", this.profiles[0]._id);
      formData.append("pic", event.target.files[0]);
      // console.log(event.target.files);
      
      let bar1 = document.getElementById('snpb');
      let bar2 = document.getElementById('js-progressbar');

      let loader1 = document.getElementById('wait');
      let loader2 = document.getElementById('chill');
      bar1.style.display = 'block';
      bar2.style.display = 'flex';
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
          this.profiles[0].picture_id = res.data;
          sessionStorage.setItem('profile', JSON.stringify(this.profiles[0])) // update session too
        })
        .catch(error => {
          // console.log("error occured", error);
        });
    },
    submitFeedback() {
      let username = this.username;
      let comment = this.comment;
      this.feed = "loading...";
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
    getBalance() {
      this.balance = this.tipTotal - this.tipWithdrawn;
    },
    checkUser() {
      if (this.username == null) {
        this.$router.push("/accounts");
      }
    },
    getId() {
      let username = this.username;
      axios
        .post(process.env.BASE_URL + "/api/myprofile/", {
          username: username
        })
        .then(res => {
          this.id = res.data[0]._id;
          // console.log("id");
          this.profiles = res.data;
        })
        .catch(err => {
          // console.log(err);
        });
    },
    getCountryData(){
        if(!localStorage.getItem('shukran-country-currency')) {
          fetch('https://ipapi.co/json/', { // http://ipinfo.io
              headers: {
              'Accept': 'application/json',
              "Content-Type": "application/json"
            }
            })
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json()
            })
            .then(data => {
              // console.log(data.country_name, "using", data.currency_name, data.currency)
              localStorage.setItem('shukran-country-currency', data.currency);
              this.currency = data.currency;
              localStorage.setItem('shukran-country-code', data.country_code);
            })
            .catch(error => { // why did this error happen. let's know... save and send to backend later?
              // console.error('There has been a problem with our fetch operation:', error);
            });
        } else { // use their currency
        }
    }
  },
  mounted() {
    // this.getId(); // shouldn't be
    this.checkUser();
    this.getBalance();
    // this.rates(); // so we don't do it on currency change
    this.getSupporters(); // should we call this? peep comment in it's definitino
    this.getSubscribers();
  },
  beforeMount() {
    this.getCountryData();
    this.setFX();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

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
#send-message > .uk-modal-body {
  border-radius: 5px;
}

#send-message button, #send-message textarea.uk-textarea, #send-message input.uk-input {
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
 float:left;
}
.top-nav-progress-bar:before {
 content: "";
 background: white;
 position:absolute;
 z-index:100;
 width:40px;
 height:40px;
 border-radius:50%;
 margin:auto auto;
}
progress.top-nav-progress-bar::-moz-progress-bar { background: transparent; }
progress.top-nav-progress-bar::-webkit-progress-bar {background: transparent;}
progress.top-nav-progress-bar::-moz-progress-value { background: blue; }
progress.top-nav-progress-bar::-webkit-progress-value { background: blue; }
.top-nav-progress-bar {
 border-radius: 100%;
 overflow: hidden;
 padding:0;
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
.h3, .uk-navbar-toggle {
  color: #ffffff;
}
.uk-offcanvas-bar {
  color: #fceedd;
}
.uk-card, .uk-card-title, .uk-heading-small {
  color: #666 !important;
  margin-top: 0px;
}

.uk-card, .uk-alert, .payout-modal {
  border-radius: 5px;
}

.payout-input, .payout-button {
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
  background-color: #c63968 !important;
  color: #fceedd;
}
.request-button.uk-button-primary {
  border-radius: 5px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
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

/* ::selection{background:#39f;color:#fff;text-shadow:none;} */
/** for dark theme
.uk-section[data-v-aae30ed8] {
    background-color: #33302c !important;
    color: #ff6870 !important;
}

.uk-container-expand[data-v-aae30ed8] {
    background-color: #170808;
    color: #ebebe7 !important; */
.tippers-table {
  height: 725px;
  overflow-y: auto;
}
ul.metrics {
  margin-bottom: 25px;
}
ul.metrics > li {
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

  .chart-container {
    position: relative;
    height: 70vh;
    width: 37vw;
  }
}

@media (max-width: 960px) {
  .desktop-nav,
  .request-button.uk-button-primary {
    display: none;
  }

  .uk-card-body {
    padding: 20px 20px;
  }

  .tippers-table {
    max-height: 520px;
    height: auto;
    overflow-y: auto;
  }

  .chart-container {
    position: relative;
    height: 40vh;
    width: 80vw;
  }
}
</style>