<template dashboard-body>
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
                <p>Show some love 😊 or raise an issue 🙃</p>
                <div class="uk-margin">
                  <textarea class="uk-textarea" placeholder="Type your message" v-model="comment"></textarea>
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
          <h3>Announcement</h3>
          <p>
            Hi {{username}}, our 10% charge will take effect on payout requests from hence forth, find the breakdown
            <router-link to="/pricing">here.</router-link> Shukran!😊
          </p>
        </div>

        <div class="uk-grid-column-medium uk-grid-row-medium uk-child-width-1-2@m uk-grid-match" uk-grid uk-height-match="row: false">
          
          <div>
            <div class="uk-grid-row-medium uk-flex-column info-card" uk-grid>

              
            <div>
              <!-- Total tips start -->
              <div class="uk-card uk-card-default uk-card-body" uk-scrollspy="cls: uk-animation-slide-bottom; repeat: true">
                <span>
                  Total tips.
                  <a class="uk-card-badge uk-label" href="#modal-middle" uk-toggle>Request payout</a>
                </span>
                <h1 class="uk-heading-small">{{currencySymbol}}{{tipTotal.toFixed(2)}}</h1>

                <!-- Withdraw request modal start -->
                <div id="modal-middle" class="uk-flex-top" uk-modal>
                  <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical payout-modal">
                    <div>
                      <h4 class="uk-modal-title">Payout request</h4>
                    </div>
                    <button class="uk-modal-close-default" type="button" uk-close></button>
                    <div class="uk-margin">
                      <h4>Available balance: {{currencySymbol}}{{availableBalance.toFixed(2)}}</h4>
                    </div>
                    <div class="uk-margin" align="center">
                      <input type="number" class="uk-input payout-input" placeholder="Amount" v-model="amount" />
                      <span v-if="amount > (availableBalance)">Insufficient available balance.</span>
                      <br />
                      <span v-if="amount < payoutGuard">Payout requests cannot be less than {{currencySymbol}}{{payoutGuard.toFixed(2)}}</span>
                    </div>
                    <div class="uk-margin">
                      <button
                        class="uk-button payout-button"
                        :disabled="amount > availableBalance || amount < payoutGuard"
                        @click="withdrawRequest()"
                      >{{request}}</button>
                    </div>
                  </div>
                </div>
                <!-- Withdraw request modal end -->
                <div class="chart-container">
                  <canvas
                    id="total-tips-chart"
                    aria-label="Total Tips Chart"
                    role="Total tips chart image"
                  >
                    <p aria-label="Fallback text">Your browser does not support displaying canvas</p>
                  </canvas>
                </div>
              </div>
              <!-- Total tips end -->

            </div>

            <div>
                <div class="uk-card uk-card-default uk-card-body" uk-scrollspy="cls: uk-animation-slide-top; repeat: true">
                  <h3 class="uk-card-title">Overview</h3>
                  <!-- <ul class="metrics">
                    <li class="li-available">Available</li>
                    <li class="li-withdrawn">Withdrawn</li>
                  </ul>

                  <div class="progress">
                    <span
                      :uk-tooltip="`${availableBalance > payoutGuard ? 'You have ' + currencySymbol + parseInt(availableBalance) + ' available to withdraw' : 'You need more than ' + currencySymbol + payoutGuard + ' to make a withdrawal request'}`"
                      class="value"
                      :data-label="`~${currencySymbol}${availableBalance.toFixed(0)}`"
                      :style="`width:${(((tipTotal - tipWithdrawn) / tipTotal) * 100).toFixed(2)}%;`"
                    ></span>
                    <span
                      :uk-tooltip="`You've withdrawn ${currencySymbol}${tipWithdrawn.toFixed(2)} so far`"
                      class="value"
                      :data-label="`~${currencySymbol}${tipWithdrawn.toFixed(0)}`"
                      :style="`width:${(((tipTotal - availableBalance) / tipTotal) * 100).toFixed(2)}%;`"
                    ></span>
                  </div> -->

                  <div class="chart-container-2">
                  <canvas
                    id="total-money-chart"
                    aria-label="Total Money Chart"
                    role="Total Money chart image"
                  >
                  <div id="chartjs-tooltip"></div>
                    <p aria-label="Fallback text">Your browser does not support displaying canvas</p>
                  </canvas>
                </div>

                </div>
              </div>

          </div>

          </div>

          
            <!-- table -->
            <div>
              <div class="info-card uk-card uk-card-default uk-card-body" uk-scrollspy="cls: uk-animation-slide-top; repeat: true">
                <div>

                  <div class="tip-details-header-section uk-flex uk-flex-between">
                    <span class="uk-margin-small-top">
                      Tip details.
                    </span>
                    <ul class=" uk-flex-right " uk-tab uk-switcher="connect: .re-tain; animation: uk-animation-fade">
                      
                      <li v-for="(n, ni) in Math.round(transactions.length/viewPerPage)" :key="ni"><a href="#">{{ni + 1}}</a></li>
                    
                    </ul>
                  </div>
                  
                  <h1 class="uk-heading-small" v-show="uniqueSupporters > 0">{{uniqueSupporters}} supporters</h1>
                  
                </div>
                
                <ul class="uk-switcher re-tain">
                <li v-for="(n, ni) in Math.round(transactions.length/viewPerPage)" :key="ni + 'jop'" :data-index="ni">
                  <ul class="uk-list uk-list-divider">
                  
                    <li v-for="(m, mi) in transactions.slice(ni*viewPerPage, (ni*viewPerPage)+viewPerPage)" :key="m.transaction_date" :data-index="mi" class="uk-margin-small-left uk-margin-small-right">
                      <div class="uk-width-expand">
                          <h5 class="uk-margin-remove-bottom">{{currencySymbol}}<span class="uk-text-bolder">{{parseFloat(m.amount).toFixed(2)}}</span> from {{ m.supporter_nickname }}</h5>
                          <p class="uk-text-meta uk-margin-remove-bottom uk-margin-small-top">
                            {{ m.message.length === 0 ? "" : m.message.trim().endsWith('.') ? m.message + ' &#8212;' : m.message.concat('.') + ' &#8212;' }} 
                             
                            <time :datetime="m.transaction_date">
                              {{new Intl.DateTimeFormat("en" , {
                                dateStyle: "long"
                              }).format(new Date(m.transaction_date))}}
                            </time>
                          </p>
                      </div>
                    </li>
                    
                  </ul>
                  </li>
                </ul>
                
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
        </ul>-->
      </div>
    </div>
  </div>
</template>

<script>
// inspiration https://uidesigndaily.com/posts/sketch-dashboard-ui-components-upgrade-stats-statistics-admin-panel-day-1076
import axios from "axios";
import Chart from "chart.js";
import fx from "money";
import { forEach } from 'shelljs/commands';
export default {
  name: "dashboard",
  data() {
    return {
      username: sessionStorage.getItem("username"),
      transactions: [],
      allTips: [], // optimise this later
      tipsDates: [],
      currency: !localStorage.getItem("shukran-country-currency") ? "NGN" : localStorage.getItem("shukran-country-currency"), // optimse later, use country's currency
      tempCurr: "NGN", // cause they come as this
      payoutGuard: 1000, // 1000 NGN
      url: "cr/" + encodeURIComponent(sessionStorage.getItem("username").trim()),
      copied: "",
      amount: 0,
      tipTotal: 0,
      tipWithdrawn: 0,
      withdrawals: [],
      profiles: [JSON.parse(sessionStorage.getItem("profile"))],
      balance: 0,
      comment: "",
      feed: "Send",
      request: "Request",
      uniqueSupporters: 0,
      viewPerPage: 8
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
          break;
      }
    }
  },
  methods: {
    fetchConversionDataAndUpdate() {
      // instead, save to our db, then select from there, so everyone else calls to our db, and our db refreshes as often as possible in a month [1K free calls!]
      const ex = () => {
        this.tipTotal = fx(this.tipTotal)
          .from(
            this.tempCurr
              /* ? this.tempCurr
              : localStorage.getItem("shukran-country-currency") */
          ).to(this.currency);
        
        this.tipWithdrawn = fx(this.tipWithdrawn)
            .from(
              this.tempCurr
                /* ? this.tempCurr
                : localStorage.getItem("shukran-country-currency") */
            ).to(this.currency);

        // convert transaction.amount too... to use in tip div
        this.allTips = this.allTips.map(tip => fx(tip) // convert all other tips
            .from(
              this.tempCurr
                /* ? this.tempCurr
                : localStorage.getItem("shukran-country-currency") */
            ).to(this.currency));
        
        for (let index = 0; index < this.transactions.length; index++) {
          const element = this.transactions[index];
          element.amount = fx(element.amount).from(this.tempCurr).to(this.currency)
        }
            
        switch (this.currency) {
            case "NGN":
              this.payoutGuard = 1000
              break;
            case "KES":
              this.payoutGuard = 500
              break
            default:
              this.payoutGuard = 1000
              break;
          }
        /* this.payoutGuard = fx(1000) // convert payout guard ...important!
              .from("NGN")
              .to(this.currency); */
        
        this.tempCurr = this.currency;

        // this.tipsChart.update(); // updates the chart... if this.tipsChart was an instance of new Chart(ctx, ...)

        // const rate = fx(this.tipTotal).from(localStorage.getItem('shukran-country-currency')).to(this.currency)
        // console.log(`${localStorage.getItem('shukran-country-currency')}${this.tipTotal} = ${this.currency}${rate.toFixed(2)}`)
      };
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

          this.tipTotal = fx(this.tipTotal) // convert tip total
            .from(
              this.tempCurr
                /* ? this.tempCurr
                : localStorage.getItem("shukran-country-currency") */
            ).to(this.currency);

          this.tipWithdrawn = fx(this.tipWithdrawn) // convert tip withdrawn
            .from(
              this.tempCurr
                /* ? this.tempCurr
                : localStorage.getItem("shukran-country-currency") */
            ).to(this.currency);
          
          this.allTips = this.allTips.map(tip => fx(tip) // convert all other tips
            .from(
              this.tempCurr
                /* ? this.tempCurr
                : localStorage.getItem("shukran-country-currency") */
            ).to(this.currency));

          for (let index = 0; index < this.transactions.length; index++) {
            const element = this.transactions[index];
            element.amount = fx(element.amount).from(this.tempCurr).to(this.currency)
          }

          switch (this.currency) {
            case "NGN":
              this.payoutGuard = 1000
              break;
            case "KES":
              this.payoutGuard = 500
              break
            default:
              this.payoutGuard = 1000
              break;
          }
        
          /* this.payoutGuard = fx(1000) // convert payout guard ...important!
              .from("NGN")
              .to(this.currency); */

          this.tempCurr = this.currency;
          console.log('did conversion after ...');
          // this.tipsChart.update(); // updates the chart
          
          // const rate = fx(this.tipTotal).from(localStorage.getItem('shukran-country-currency')).to(this.currency)
          // console.log(`${localStorage.getItem('shukran-country-currency')}${this.tipTotal} = ${this.currency}${rate.toFixed(2)}`)
        }
        // console.log('all tips', this.allTips)
      }

      // re-render, the whole page, to update the graph
      this.$forceUpdate();
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
            console.log('how many', response.data.length);
            this.uniqueSupporters = response.data.length
          })
          .catch(error => {
            console.log('baddd', error);
          })
          .then(() => { // always executed
          });

    },
    getSubscribers() {
      axios.get(process.env.BASE_URL + "/api/getsubscribers/", {
            params: {
              id: this.profiles[0]._id,
              username: this.profiles[0].username,
            }
          }).then(response => {
            console.log('how many subscribers', response);
          })
          .catch(error => {
            console.log('baddd getsubscribers', error);
          })
          .then(() => { // always executed
          });
    },
    createChart(chartId , chartData) {
      // https://codepen.io/grayghostvisuals/pen/gpROOz
      let chart = document.getElementById("total-tips-chart").getContext("2d"),
        gradient = chart.createLinearGradient(0, 0, 0, 450);

      gradient.addColorStop(0, "rgba(255, 0,0, 0.5)");
      gradient.addColorStop(0.5, "rgba(255, 0, 0, 0.25)");
      gradient.addColorStop(1, "rgba(255, 0, 0, 0)");

      const ctx = document.getElementById(chartId);
      new Chart(ctx, {
        type: "line",
        data: {
          labels: chartData.tipsDates,
          datasets: [
            {
              // a(nother) line graph
              label: "Tips",
              data: chartData.allTips,
              pointBorderWidth: 7,
              pointHitRadius: 15,
              backgroundColor: gradient /* [
                "rgba(71, 183,132,.5)" // Green
              ] */,
              borderColor: ["#47b784"],
              borderWidth: 3,
              fill: "start",
              lineTension: 0 // make lines straight
            }
          ]
        },
        options: {
          title: {
            display: false,
            text: "You were tipped WHAT? WHEN?"
          },
          maintainAspectRatio: false,
          responsive: true,
          lineTension: 1,
          scales: {
            xAxes: [
              {
                pointLabels: {
                  display: false
                }
              }
            ],
            yAxes: [
              {
                pointLabels: {
                  display: false
                },
                ticks: {
                  // beginAtZero: false,
                  padding: 25,
                  callback: function(value, index, values) {
                    // return null to hide
                    return chartData.currencySymbol + value; // Include a naira/ksh sign in the ticks
                  }
                }
              }
            ]
          },
          tooltips: {
            callbacks: {
              // https://www.chartjs.org/docs/latest/configuration/tooltip.html#label-callback
              label: function(tooltipItem, data) {
                return `You were tipped ${chartData.currencySymbol}${parseInt(tooltipItem.value).toFixed(2)} on ${tooltipItem.label}`;
              },
              title: function(tooltipItem, data) {
                return `${tooltipItem[0].label} tip`;
              }
            }
          }
        }
      });


      // https://uidesigndaily.com/posts/sketch-stats-card-statistics-analytics-chart-day-817
      const ctx2 = document.getElementById("total-money-chart");

      /* Chart.defaults.global.tooltips.custom = function(tooltip) {
        // Tooltip Element
        var tooltipEl = document.getElementById('chartjs-tooltip');

        // Hide if no tooltip
        if (tooltip.opacity === 0) {
          tooltipEl.style.opacity = 0;
          return;
        }

        // Set caret Position
        tooltipEl.classList.remove('above', 'below', 'no-transform');
        if (tooltip.yAlign) {
          tooltipEl.classList.add(tooltip.yAlign);
        } else {
          tooltipEl.classList.add('no-transform');
        }

        function getBody(bodyItem) {
          return bodyItem.lines;
        }

        // Set Text
        if (tooltip.body) {
          var titleLines = tooltip.title || [];
          var bodyLines = tooltip.body.map(getBody);

          var innerHtml = '<thead>';

          titleLines.forEach(function(title) {
            innerHtml += '<tr><th>' + title + '</th></tr>';
          });
          innerHtml += '</thead><tbody>';

          bodyLines.forEach(function(body, i) {
            var colors = tooltip.labelColors[i];
            var style = 'background:' + colors.backgroundColor;
            style += '; border-color:' + colors.borderColor;
            style += '; border-width: 2px';
            var span = '<span class="chartjs-tooltip-key" style="' + style + '"></span>';
            innerHtml += '<tr><td>' + span + body + '</td></tr>';
          });
          innerHtml += '</tbody>';

          var tableRoot = tooltipEl.querySelector('table');
          tableRoot.innerHTML = innerHtml;
        }

        var positionY = this._chart.canvas.offsetTop;
        var positionX = this._chart.canvas.offsetLeft;

        // Display, position, and set styles for font
        tooltipEl.style.opacity = 1;
        tooltipEl.style.left = positionX + tooltip.caretX + 'px';
        tooltipEl.style.top = positionY + tooltip.caretY + 'px';
        tooltipEl.style.fontFamily = tooltip._bodyFontFamily;
        tooltipEl.style.fontSize = tooltip.bodyFontSize;
        tooltipEl.style.fontStyle = tooltip._bodyFontStyle;
        tooltipEl.style.padding = tooltip.yPadding + 'px ' + tooltip.xPadding + 'px';
      }; */

      let config = {
        type: 'pie',
        data: {
          datasets: [{
            data: [300, 50, 100, 40, 10],
            backgroundColor: [
              /* Chart.colorName.red,
              Chart.colorName.orange,
              Chart.colorName.yellow,
              Chart.colorName.green,
              Chart.colorName.blue, */
            ],
          }],
          labels: [
            'Red',
            'Orange',
            'Yellow',
            'Green',
            'Blue'
          ]
        },
        options: {
          responsive: true,
          legend: {
            display: false
          },
          tooltips: {
            enabled: false,
          }
        }
      };

      let chrt2 = new Chart(ctx2, /* config */{
          type: 'doughnut',
          data: {
            datasets: [{
              data: [this.availableBalance.toFixed(2), this.tipWithdrawn.toFixed(2)],
              backgroundColor: ['#3C67D6', '#7244AD'], // https://www.instagram.com/p/CJBJs6BAX0S/
              borderWidth: 4,
            }],
            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: [
                'Available',
                'Withdrawn'
            ]
          },
          options: {
            cutoutPercentage: 75,
            legend: {
              position: 'bottom',
              labels: {
                usePointStyle: true,
              }
            },
          }
      });

      // console.log('chart => ', chrt2);
      
    },
    logout() {
      sessionStorage.clear();
      this.$router.push("/accounts");
    },
    loadTransactions() {
      let username = this.username;
      axios
        .post(process.env.BASE_URL + "/api/findall/", {
          username: username,
          status: "received"
        })
        .then(res => {
          console.log("loadTransactions done", res); // do the currency conversion here.
          this.transactions = res.data;
          for (let i = 0; i < this.transactions.length; i++) {
            this.tipTotal += parseInt(this.transactions[i].amount);
            this.allTips.push(this.transactions[i].amount); // optimise how this is gotten
            // https://stackoverflow.com/a/34015511
            this.tipsDates.push(
              new Date(
                this.transactions[i].transaction_date
              ).toLocaleDateString("en-GB", {
                year: "2-digit",
                month: "short",
                day: "2-digit"
              })
            ); // .toDateString() .toLocaleDateString("en-US")
          }
        }).then(() => {
          this.rates(); // get the conversion first...
        }).then(() => this.createChart("total-tips-chart", {allTips: this.allTips, tipsDates: this.tipsDates, currencySymbol: this.currencySymbol})/* then create chart */)
        .catch(err => {
          console.error(err, err.code);
        });
      // console.log(`hey ${username} what you doing looking on here? care to tell us? all@useshukran.com`)
    },
    loadWithdrawn() {
      let username = this.username;
      axios
        .post(process.env.BASE_URL + "/api/findall/", {
          username: username,
          status: "paid"
        })
        .then(res => {
          console.log("loadWithdrawn done", res);
          this.withdrawals = res.data;
          for (let i = 0; i < this.withdrawals.length; i++) {
            this.tipWithdrawn += parseInt(this.withdrawals[i].amount);
          }
          console.log('first withdrawn', this.tipWithdrawn);
        }).then(() => {
          // this.rates();
          this.tipWithdrawn = fx(this.tipWithdrawn) // convert tip withdrawn
            .from("NGN").to(this.currency);
          console.log('tip withdrawn', this.tipWithdrawn);
        })
        .catch(err => {
          // console.log(err);
        });
    },
    withdrawRequest() { // convert to naira
      /* let amount = fx(this.amount)
            .from(this.currency)
            .to("NGN"); */
      let amount = this.amount;
      if (this.currency === "KES") { // we can do more
        amount = parseFloat(this.amount) * 4.1
      } else if (this.currency === "USD") {
        amount = parseFloat(this.amount) * 380
      }

      let username = this.username;
      // let amount = this.amount;
      let status = "requested";
      this.request = "loading...";
      axios
        .post(process.env.BASE_URL + "/api/requestpayout/", {
          username: username,
          amount: amount, // in naira
          status: status,
          email: this.profiles[0].email
        })
        .then(res => {
          // console.log("withdrawRequest done", res);
          this.request = "Done";
          UIkit.modal("#modal-middle").hide();
          let thanks =
            `Hi ${this.username}, your payout request will be processed within the next 6-10 hours & sent to your account with the 10% charge in effect. Hang tight`;
          alert(thanks);
        })
        .catch(err => {
          // console.log(err);
        });
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
            console.log(progressEvent.loaded / progressEvent.total, `${progressEvent.loaded} / ${progressEvent.total}`);
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
    getBalance() {
      this.balance = this.tipTotal - this.tipWithdrawn;
    },
    checkUser() {
      if (this.username == null) {
        this.$router.push("/accounts");
      }

      analytics.identify(this.profiles[0]._id, {
        username: this.username,
        email: this.profiles[0].email,
      });
      analytics.track('Account Accessed',{  authentication:'Login'})
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
    this.loadTransactions();
    this.checkUser();
    this.loadWithdrawn();
    this.getBalance();
    // this.rates(); // so we don't do it on currency change
    this.getSupporters(); // should we call this? peep comment in it's definitino
    this.getSubscribers();
  },
  beforeMount() {
    this.getCountryData();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tip-details-header-section > ul {
  margin-top: 0px;
}
#my-id > div {
  border-radius: 5px;
}
#my-id > div textarea, #my-id > div button {
  border-radius: 3px;
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