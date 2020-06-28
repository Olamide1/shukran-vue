<template dashboard-body>
  <div class="uk-container-expand">
    <nav class="uk-navbar uk-navbar-container uk-margin mobile-nav">
      <div class="uk-navbar-left">
        <a class="uk-navbar-toggle" uk-toggle="target: #offcanvas-usage">
          <span uk-navbar-toggle-icon></span>
          <span class="uk-margin-small-left"></span>
        </a>

        <a class="uk-navbar-item uk-logo">Shukran</a>
      </div>
    </nav>

    <nav class="uk-navbar-container desktop-nav" uk-navbar>
    <div class="uk-navbar-left">

        <ul class="uk-navbar-nav">
            <li class="uk-active"><router-link to="/dash">Dashboard</router-link></li>
            <li id="get-tipped" href="#modal-center" uk-toggle><a>Get tipped</a></li>
            <li>
              <a><router-link to="/profile">Profile</router-link></a>
            </li>
            <li id="give-feedback" uk-toggle="target: #my-id">
              <a>Give feedback</a>
            </li>
            <li id="logout" @click="logout"><a>Logout</a></li>
        </ul>

    </div>

    <div class="uk-navbar-right">

        <ul class="uk-navbar-nav">
            <li>
              <a class="" href="#modal-middle" uk-toggle><button class="uk-button request-button uk-button-primary">Request payout</button></a>
            </li>
            <li>
              <a href="#!">
                <div class="uk-width-auto">
                  <img class="uk-border-circle" width="40" height="40" :src="`https://drive.google.com/uc?export=view&id=${profiles[0].picture_id}`">
                </div>
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
            v-bind:style="{ 'background-image': `url(https://drive.google.com/uc?export=view&id=${profiles[0].picture_id})` }"
            uk-img="target: #offcanvas-usage"
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
          <!-- -->
          <ul class="uk-list uk-list-divider">
            <li>
              <router-link to="/dash">Home</router-link>
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
                <h2 class="uk-modal-title">{{username}}</h2>
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
        <div uk-alert>
          <a class="uk-alert-close" uk-close></a>
          <h3>Notice</h3>
          <p>
            Hi {{username}}, our 10% charge will take effect on payout requests from hence forth.
            Shukran!😊
          </p>
        </div>

        <div class="uk-child-width-1-2@m uk-grid-match" uk-grid>
        <div class="uk-flex uk-flex-column">
          <div>
            <!-- Total tips start -->
            <div
              class="uk-card uk-card-default uk-card-body"
              uk-scrollspy="cls: uk-animation-slide-bottom; repeat: true"
            >
              
              <span>Total tips. <a class="uk-card-badge uk-label" href="#modal-middle" uk-toggle>Request payout</a></span>
              <!-- <h3 class="uk-card-title">&#x20a6;{{tipTotal}}</h3> -->
              <h1 class="uk-heading-small">&#x20a6;{{tipTotal}}</h1>
              
              <!-- Withdraw request modal start -->
              <div id="modal-middle" class="uk-flex-top" uk-modal>
                <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
                  <div class="uk-modal-header">
                    <h4 class="uk-modal-title">Payout request</h4>
                  </div>
                  <button class="uk-modal-close-default" type="button" uk-close></button>
                  <div class="uk-margin">
                    <h4>Available balance: &#x20a6;{{availableBalance}}</h4>
                  </div>
                  <div class="uk-margin" align="center">
                    <input type="number" class="uk-input" placeholder="Amount" v-model="amount" />
                    <span v-if="amount > (availableBalance)">Insufficient available balance.</span>
                    <span v-if="amount < 1000">Payout requests cannot be less than &#x20a6;1000</span>
                  </div>
                  <div class="uk-margin">
                    <button
                      class="uk-button"
                      v-if="amount < (availableBalance) && amount != 0"
                      @click="withdrawRequest()"
                    >{{request}}</button>
                  </div>
                </div>
              </div>
              <!-- Withdraw request modal end -->
              
              
              <canvas id="total-tips-chart" aria-label="Total Tips Chart" role="Total tips chart image">
                <p aria-label="Fallback text">Your browser does not support displaying canvas</p>
              </canvas>
            </div>
            <!-- Total tips end -->
          </div>
          <div class="uk-margin-top">
            <div
              class="uk-card uk-card-default uk-card-body"
              uk-scrollspy="cls: uk-animation-slide-top; repeat: true"
            >
              <h3 class="uk-card-title">Overview</h3>
              <ul class="metrics">
                <li class="li-available">Available</li>
                <li class="li-withdrawn">Withdrawn</li>
              </ul>

              <div class="progress">
                <span :uk-tooltip="`${availableBalance > 1000 ? 'You have ₦' + availableBalance + ' available to withdraw' : 'You need more that ₦1000 to make a withdrawal request'}`" class="value" :data-label="`₦${availableBalance}`" :style="`width:${(((tipTotal - tipWithdrawn) / tipTotal) * 100).toFixed(2)}%;`"></span>
                <span :uk-tooltip="`You've withdrawn ₦${tipWithdrawn} so far`" class="value" :data-label="`₦${tipWithdrawn}`" :style="`width:${(((tipTotal - availableBalance) / tipTotal) * 100).toFixed(2)}%;`"></span>
              </div>
            </div>
          </div>
        </div>


        <!-- table -->
        <div>
            <div
              class="uk-card uk-card-default uk-card-body"
              uk-scrollspy="cls: uk-animation-slide-top; repeat: true"
            >
              <h3 class="uk-card-title">Tip details</h3>

              <div class="tippers-table">
                <table class="uk-table uk-table-middle uk-table-divider">
                  <thead>
                    <tr>
                      <th class="uk-width-small" style="color:#516E6F;">Nickname</th>
                      <th style="color:#516E6F;">Amount</th>
                      <th style="color:#516E6F;">Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(transaction, index) in transactions.slice().reverse()" :key="index">
                      <td>{{transaction.supporter_nickname}}</td>
                      <td>&#x20a6;{{transaction.amount}}</td>
                      <td>{{transaction.message}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        <!-- //table -->
        </div>

        <!-- <ul uk-accordion>
          <li>
            <a class="uk-accordion-title h3" href="#">Tips details</a>
            <div class="uk-accordion-content">
              <p v-if="transactions.length == 0" align="center">No tips sent to you yet</p>

              <div v-else>
                <table class="uk-table uk-table-middle uk-table-divider">
                  <thead>
                    <tr>
                      <th class="uk-width-small" style="color:#516E6F;">Nickname</th>
                      <th style="color:#516E6F;">Amount</th>
                      <th style="color:#516E6F;">Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(transaction, index) in transactions.slice().reverse()" :key="index">
                      <td>{{transaction.supporter_nickname}}</td>
                      <td>&#x20a6;{{transaction.amount}}</td>
                      <td>{{transaction.message}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </li>
        </ul> -->

      </div>
    </div>
  </div>
</template>

<script>
// inspiration https://uidesigndaily.com/posts/sketch-dashboard-ui-components-upgrade-stats-statistics-admin-panel-day-1076
import axios from "axios";
import Chart from "chart.js";
export default {
  name: "dashboard",
  data() {
    return {
      username: sessionStorage.getItem("username"),
      transactions: [],
      allTips: [], // optimise this later
      tipsDates: [],
      url:
        "cr/" + encodeURIComponent(sessionStorage.getItem("username").trim()),
      copied: "",
      amount: 0,
      tipTotal: 0,
      tipWithdrawn: 0,
      withdrawals: [],
      profiles: [JSON.parse(sessionStorage.getItem("profile"))],
      balance: 0,
      comment: "",
      feed: "Submit",
      request: "Request"
    };
  },
  computed: {
    availableBalance() {
      return this.tipTotal - this.tipWithdrawn;
    }
  },
  methods: {
    createChart(chartId /* , chartData */) {
      const ctx = document.getElementById(chartId);
      const myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: this.tipsDates,
          datasets: [
            {
              // another line graph
              label: "Tips",
              data: this.allTips,
              backgroundColor: [
                "rgba(71, 183,132,.5)" // Green
              ],
              borderColor: ["#47b784"],
              borderWidth: 3,
              fill: "start",
              lineTension: 0 // make lines straight
            }
          ]
        },
        options: {
          title: { // ??
            display: false,
            text: 'Chart'
          },
          responsive: true,
          lineTension: 1,
          scales: {
            
            xAxes: [{
                pointLabels: {
                  display: false
                },
            }],
            yAxes: [
              {
                pointLabels: {
                  display: false
                },
                ticks: {
                  // beginAtZero: false,
                  padding: 25,
                  callback: function(value, index, values) { // return null to hide
                      return '₦' + value; // Include a naira sign in the ticks
                  }
                }
              }
            ]
          }
        }
      });
    },
    logout() {
      sessionStorage.clear();
      this.$router.push("/accounts");
    },
    loadTransactions() {
      var username = this.username;
      axios
        .post("https://shukran-api.herokuapp.com/api/findall/", {
          username: username,
          status: "received"
        })
        .then(res => {
          console.log("loadTransactions done");
          this.transactions = res.data;
          for (var i = 0; i < this.transactions.length; i++) {
            this.tipTotal += parseInt(this.transactions[i].amount);
            this.allTips.push(this.transactions[i].amount) // optimise how this is gotten
            // https://stackoverflow.com/a/34015511
            this.tipsDates.push( new Date(this.transactions[i].transaction_date).toLocaleDateString('en-GB', {
                year: '2-digit',
                month: 'short',
                day: '2-digit'
            })) // .toDateString() .toLocaleDateString("en-US")
          }

        this.createChart("total-tips-chart");

        })
        .catch(err => {
          console.error(err);
        });
      // console.log(`hey ${username}`)
    },
    loadWithdrawn() {
      var username = this.username;
      axios
        .post("https://shukran-api.herokuapp.com/api/findall/", {
          username: username,
          status: "paid"
        })
        .then(res => {
          console.log("loadWithdrawn done");
          this.withdrawals = res.data;
          for (var i = 0; i < this.withdrawals.length; i++) {
            this.tipWithdrawn += parseInt(this.withdrawals[i].amount);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    withdrawRequest() {
      var username = this.username;
      var amount = this.amount;
      var status = "requested";
      this.request = "loading...";
      axios
        .post("https://shukran-api.herokuapp.com/api/createtransaction/", {
          username: username,
          amount: amount,
          status: status,
          email: this.profiles[0].email
        })
        .then(res => {
          console.log("withdrawRequest done", res);
          this.request = "Done";
          UIkit.modal("#modal-middle").hide();
          var thanks =
            "Hi," +
            this.username +
            " your payout request will be processed within the next 6 - 10 hours & sent to your account with the 10% charge in effect. Hang tight";
          alert(thanks);
        })
        .catch(err => {
          console.log(err);
        });
    },
    onFileChanged(event) {
      // this.selectedFile = event.target.files[0]
      let formData = new FormData();
      formData.append("id", this.id);
      formData.append("pic", event.target.files[0]);
      console.log(event.target.files);
      axios
        .post("https://shukran-api.herokuapp.com/api/update/", formData, {
          onUploadProgress: progressEvent => {
            console.log(progressEvent.loaded / progressEvent.total);
          }
        })
        .then(res => {
          this.profiles[0].picture_id = res.data;
        })
        .catch(error => {
          console.log("error occured", error);
        });
    },
    submitFeedback() {
      var username = this.username;
      var comment = this.comment;
      this.feed = "loading...";
      axios
        .post("https://shukran-api.herokuapp.com/api/givefeedback/", {
          username: username,
          comment: comment
        })
        .then(res => {
          console.log("feedback submitted");
          UIkit.modal("#my-id").hide();
          alert("Thank you for your feedback!");
        })
        .catch(err => {
          console.log(err);
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
      var username = this.username;
      axios
        .post("https://shukran-api.herokuapp.com/api/myprofile/", {
          username: username
        })
        .then(res => {
          this.id = res.data[0]._id;
          console.log("id");
          this.profiles = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getId(); // shouldn't be
    this.loadTransactions();
    this.checkUser();
    this.loadWithdrawn();
    this.getBalance();
  }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >

body, html {
  background-image: linear-gradient(135deg, #c63968 0%, #ff746c 100%);
}


.uk-navbar,
.uk-navbar-item,
.lead {
  background: transparent !important;
  color: #ffffff !important;
}
.uk-container-expand {
  /* background-color: #ffffff; */
  color: #ebebe7 !important;
}
.uk-accordion-content {
  /* background-color: #fceedd !important; */
  color: #ff6870 !important;
}
.show {
  color: #c63968;
}
.h3 {
  color: #000000;
}
.uk-offcanvas-bar {
  /* background-color: #c63968 !important; */
  color: #fceedd;
}
.uk-card,
.uk-card-title, .uk-heading-small {
  /* background-color: #fceedd !important; */
  color: #f8f8f8 !important;
  margin-top: 0px;
}

.uk-card,
.uk-alert {
  border-radius: 5px;
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
  box-shadow: 0 5px 15px rgba(0,0,0,.08);
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
  height: 560px;
  overflow-y: auto;
}
@media (max-width:960px) {
  .tippers-table {
  max-height: 400px;
  height: auto;
  overflow-y: auto;
}
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
@media (min-width:960px) {
  .mobile-nav, .uk-card-badge.uk-label[href] {
    display: none;
  }
  
}

@media (max-width:960px) {
  .desktop-nav, .request-button.uk-button-primary {
    display: none;
  }

}
</style>