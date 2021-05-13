<template>
<div class="uk-container-expand background">

<nav class="uk-navbar-container uk-margin uk-margin-left uk-margin-right" uk-navbar>

    <div class="nav-overlay uk-navbar-left">

        <a class="uk-navbar-item uk-logo" href="#">Shukran</a>

        <ul class="uk-navbar-nav">
            <li><a @click="logout">Logout</a></li>
        </ul>

    </div>

    <div class="nav-overlay uk-navbar-right">

        <a class="uk-navbar-toggle" uk-icon="icon: search; ratio: 2" uk-toggle="target: .nav-overlay; animation: uk-animation-fade" href="#"></a>

    </div>

    <div class="nav-overlay uk-navbar-left uk-flex-1" hidden>

        <div class="uk-navbar-item uk-width-expand">
            <form class="uk-search uk-search-navbar uk-width-1-1">
                <input class="uk-search-input" v-model="search" type="search" placeholder="Search..." autofocus>
            </form>
        </div>

        <a @click="closeSearch" class="uk-navbar-toggle" uk-icon="icon: close; ratio: 2" uk-toggle="target: .nav-overlay; animation: uk-animation-fade" href="#"></a>

    </div>

</nav>

 <div class="uk-modal-body" v-if="search !== ''">
    <div>
        <ul class="uk-list uk-list-striped">
            <li v-for="result in filteresults" :key="result.id">
                <dt>
                    {{result.username}}
                    <div class="uk-inline">
                        <button class="uk-margin-left uk-button uk-button-secondary uk-button-small" type="button">
                            more info
                        </button>
                        <div uk-dropdown="mode: click">
                            <ul class="uk-nav uk-dropdown-nav" >
                                <li>Bank: {{result.bank}}</li>
                                <li>Account name: {{result.account_name}}</li>
                                <li>Account Number: {{result.account_number}}</li>
                                <li>Craft type: {{result.craft_type}}</li>
                                <li>Phone: {{result.phone}}</li>
                            </ul>
                        </div>
                    </div>
                </dt>
                <dd>{{result.fullname}} &middot; {{result.email}}</dd>
            </li>
        </ul>
    
    </div>
 </div>

<div class="uk-card uk-card-default uk-card-body uk-margin uk-margin-left uk-margin-right chart-card">
    <div>
        <div class="uk-margin-left uk-margin-right uk-flex-middle uk-flex-between uk-flex">

            <div>
                <h4>Tips Overview</h4>
            </div>

            <div uk-form-custom="target: > * > span:first-child">
                <select v-model="time">
                    <option value="month">Month</option>
                    <option value="quarter">Quarter</option>
                    <option value="year">Year</option>
                </select>
                <button class="uk-button uk-button-default" id="drop-down" type="button" tabindex="-1" style="padding: 0 15px; text-transform: capitalize; border-radius: 3px;">
                    <span></span>
                    <span uk-icon="icon: chevron-down"></span>
                </button>
            </div>
        </div>
    </div>

    <div>
        <div class="overview-chart-div">
            <canvas
                id="overview-chart"
                aria-label="Overview Chart"
                role="Overview chart image"
                >
                <p aria-label="Fallback text">Your browser does not support displaying canvas</p>
                </canvas>
        </div>
    </div>
</div>


<div class="uk-card uk-card-default uk-card-body uk-margin uk-margin-left uk-margin-right info-card ">
    
    <div class="uk-flex">
        <div>
            <span>No. of creators</span>
            <h1 class="uk-margin-small-top">{{totalUsers}}</h1>
        </div>
        <hr class="uk-divider-vertical">
        <hr class="horizontal">
        <div>
            <span>No. of tips</span>
            <h1 class="uk-margin-small-top">{{totalTransact}}</h1>
        </div>
    </div>
</div>

<div class="uk-card uk-card-default uk-card-body uk-margin uk-margin-left uk-margin-right info-card ">
    
    <div class="uk-flex">
        <div>
            <span>Tips volume</span>
            <h1 class="uk-margin-small-top">&#x20a6;{{transactionVolume.toFixed(2)}}</h1>
        </div>
        <hr class="uk-divider-vertical">
        <hr class="horizontal">
        <div>
            <span>Payout requests</span>
            <h1 class="uk-margin-small-top">{{requested}}</h1>
        </div>
    </div>
</div>


<div class="uk-card uk-card-default uk-card-body uk-margin uk-margin-left uk-margin-right info-card ">
    
    <div class="uk-flex">
        <div>
            <span>Tips Paid Out</span>
            <h1 class="uk-margin-small-top">&#x20a6;{{paidVolume.toFixed(2)}}</h1>
        </div>
        <hr class="uk-divider-vertical">
        <hr class="horizontal">
        <div>
            <span>Revenue gotten</span>
            <h1 class="uk-margin-small-top">&#x20a6;{{netRevenue.toFixed(2)}}</h1>
        </div>
    </div>
</div>


<div class="uk-margin uk-margin-left uk-margin-right">
    <ul uk-tab class="uk-visible@s" uk-switcher="connect: .re-tain; animation: uk-animation-fade">
        <li class="uk-active"><a href="#">Creators</a></li>
        <li><a href="#">Transactions</a></li>
        <li><a href="#">Withdrawal Request</a></li>
        <li class=""><a href="#">Feedback</a></li>
    </ul>
    <ul class="uk-subnav uk-subnav-pill uk-child-width-expand uk-hidden@s uk-text-center" uk-switcher="connect: .re-tain; animation: uk-animation-fade">
        <li class=""><a href="#" uk-icon="users"></a></li>
        <li><a href="#" uk-icon="credit-card"></a></li>
        <li><a href="#" uk-icon="push"></a></li>
        <li><a href="#" uk-icon="comments"></a></li>
    </ul>

    
    <ul class="uk-switcher re-tain uk-margin uk-margin-left uk-margin-right">

            <li>
                <a href="#">Creators</a>
                <div class="uk-child-width-1-2@s uk-child-width-1-3@m" uk-grid>
                    <div class="uk-grid-small uk-flex-middle" uk-grid v-for="(user, index) in _users" :key="index">
                            <div class="uk-width-auto">
                                <img class="uk-border-circle" width="40" height="40" src="/static/img/icons/favicon-16x16.png">
                            </div>
                            <div class="uk-width-expand">
                                <h3 class="uk-card-title uk-margin-remove-bottom">{{user.username}}</h3>
                                <p class="uk-text-meta uk-margin-remove-top">
                                    {{user.fullname}} &middot; {{user.email}}
                                </p>
                            </div>
                            <div>
                                <button @click="clickInfo(index)" id="info-modal" class="uk-button uk-button-secondary">Info</button>
                            </div>
                        </div>
                </div>
            </li>
            <li>
                <a href="#">Transactions</a>
                <div class="uk-child-width-1-2@s uk-child-width-1-3@m" uk-grid >
                    <div class="uk-grid-small uk-flex-middle" uk-grid v-for="(transaction, index) in _transactions" :key="index">
                            <div class="uk-width-expand">
                                <h4 class="uk-margin-remove-bottom">NGN{{transaction.amount}} {{transaction.status == 'paid' ? ' paid to ' : ' receivd by ' }} {{transaction.username}}</h4>
                                <div class="uk-margin-small">
                                    <button class="uk-button uk-button-small uk-button-danger" @click="deleteTransaction(transaction._id)">{{deleted}}</button>
                                </div>
                                <p class="uk-text-meta uk-margin-remove-top">
                                    &mdash;
                                    <time datetime="2016-04-01T19:00">
                                        {{transaction.transaction_date}}
                                    </time>{{transaction.supporter_nickname ? ', by ' + transaction.supporter_nickname : ''}}
                                </p>
                            </div>
                        </div>
                </div>
            </li>
            <li>
                <a href="#">Withdrawal Request</a>
                <div class="uk-child-width-1-2@s uk-child-width-1-3@m" uk-grid>
                    <div class="uk-grid-small uk-flex-middle" uk-grid v-for="(request, index) in _requests" :key="index"><!-- do reverse from server -->
                        <div class="uk-width-expand">
                            <h3 class="uk-card-title uk-margin-remove-bottom">NGN{{request.amount * 0.9}} by {{request.username}}</h3> <!-- auto calculate how much you should pay out -->
                            <div class="uk-margin-small">
                                <div class="uk-button-group">
                                    <button class="uk-button uk-button-small" @click="update(request._id)">{{paid}}</button>
                                    <button class="uk-button uk-button-small uk-button-danger" @click="deleteTransaction(request._id)">{{deleted}}</button>
                                </div>
                                
                            </div>
                            <p class="uk-text-meta uk-margin-remove-top"><time :datetime="request.transaction_date">{{request.transaction_date}}</time>, {{request.status}}</p>
                        </div>
                    </div>
                </div>
                <span v-if="_requests.length == 0" align="center">No requests made yet.</span>
            </li>
            <li>
                <a href="#">Feedback</a>
                <div class="uk-child-width-1-2@s uk-child-width-1-3@m" uk-grid>
                    <div class="uk-grid-small uk-flex-middle" uk-grid v-for="(feedback, index) in _allFeedback" :key="index">
                            <div class="uk-width-expand">
                                <h5 class="uk-margin-remove-bottom">{{feedback.comment}}</h5>
                                <p class="uk-text-meta uk-margin-remove-top">
                                    &mdash; {{feedback.username}}
                                </p>
                            </div>
                        </div>
                </div>
            </li>
        
    </ul>

    
   
</div>



    </div>
</template>

<script>
import axios from 'axios'
import Chart from "chart.js";
export default {
    name: 'Admin',
    data(){
        return{
            admin: 'admin',
            users: [],
            time: 'month',
            transactions: [],
            totalUsers: 0,
            totalTransact: 0,
            requests: [],
            transactionVolume: 0,
            paid: 'Pay',
            netRevenue: 0,
            paidVolume: 0,
            requested: 0,
            search: '',
            allfeedback: [],
            deleted: 'Delete',
            overviewChart: null,
        }
    },
    watch: {
        time: function name(value, oldValue) { // updates chart
            this.overviewChart.config.options.scales.xAxes[0].time.unit = value;
            this.overviewChart.update();
        }
    },
    methods: {
        closeSearch() {
            this.search = ''
        },
        logout() {
            sessionStorage.clear('++')
            this.$router.push('/')
        },
        clickInfo(index){
            let users = this.users
                let modal = UIkit.modal.dialog(`
                            <div class="uk-modal-body uk-margin-auto-vertical">

                            <button class="uk-modal-close-default" type="button" uk-close></button>
                            <h3>${users[parseInt(index)].username} details:</h3>
                            <p>Bank: ${users[parseInt(index)].bank}</p>
                            <p>Account name: ${users[parseInt(index)].account_name}</p>
                            <p>Account Number: ${users[parseInt(index)].account_number}</p>
                            <p>Craft type: ${users[parseInt(index)].craft_type}</p>
                            <p>Phone number: ${users[parseInt(index)].phone}</p>

                            </div>
                            <div class="uk-modal-footer uk-text-right">
                                <button class="uk-button uk-button-default uk-modal-close" type="button">Close</button>
                                <button class="uk-button uk-button-danger delete" type="button" creator-id="${users[parseInt(index)]._id}">delete</button>
                            </div>
                `);

                const el = modal.$el; // The modal element
                let deleteButton = el.querySelector('.delete').addEventListener("click", function(e){
                    e.srcElement.innerText = 'deleting...'
                    axios.post(process.env.BASE_URL + '/api/deleteuser/', {
                        id: users[parseInt(index)]._id,
                    }).then( resp => {
                        e.srcElement.innerText = 'deleted'
                        // close modal
                        setTimeout(function(){
                            el.querySelector('.uk-modal-close-default').click()
                        }, 1000);
                        
                        // UIkit.util.on('#info-modal').hide()
                    }).catch(err => {
                        console.error(err)
                    })

                });
        },
        loadUsers() {
            axios.get(process.env.BASE_URL + '/api/allusers/').then(res => {
                console.log('loaded users', res.data)
                this.users = res.data
                this.totalUsers = this.users.length
            }).catch(err => {
                console.error(err)
            })
        },
        loadTransactions(){
             axios.get(process.env.BASE_URL + '/api/alltransactions/').then( res=> { 
                console.log('loaded transactions')
                this.transactions = res.data
            })
            .then(() => {
                this.createOverviewChart()
            })
            .catch( error => {
                console.error(error)
            })
        },
        createOverviewChart(){ // TODO: 
            let ctx = document.getElementById("overview-chart").getContext("2d");
            // ctx.canvas.width = 1000;
            // ctx.canvas.height = 300;

            // look at this : https://www.chartjs.org/docs/latest/configuration/tooltip.html

            this.overviewChart = new Chart(ctx, { // https://www.chartjs.org/docs/latest/axes/cartesian/time.html
                data: {
                    datasets: [{
                        label: 'Cash In',
                        type: 'line',
                        data: this.transactions.filter(trans => trans.status === 'received').map(({transaction_date, amount, username}) => ({x: new Date(transaction_date).getTime(), y:amount, username}) ).sort((a, b) => (a.x > b.x) ? 1 : -1), // {t: , y:} // https://stackoverflow.com/a/61720671/9259701 // https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/
                        pointRadius: 0,
                        fill: false,
                        lineTension: 0,
                        borderWidth: 2,
                        backgroundColor: "rgba(255, 99, 132, 0.5)",
                        borderColor: "rgb(255, 99, 132)"
                    }, {
                        label: 'Cash out',
                        type: 'line',
                        data: this.transactions.filter(trans => trans.status === 'paid').map(({transaction_date, amount, username}) => ({x: new Date(transaction_date).getTime(), y:amount, username}) ).sort((a, b) => (a.x > b.x) ? 1 : -1), // {t: , y:} // https://stackoverflow.com/a/61720671/9259701 // https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/
                        pointRadius: 0,
                        fill: false,
                        lineTension: 0,
                        borderWidth: 2,
                        backgroundColor: "black",
                        borderColor: "black"
                    }]
                },
                options: {
                    title: {
                        display: false,
                        text: 'An overview'
                    },
                    layout: {
                        padding: {
                            left: 25,
                            right: 20,
                            top: 0,
                            bottom: 10
                        }
                    },
                    legend: {
                        display: false,
                        labels: {
                            fontColor: 'rgb(255, 99, 132)',
                            usePointStyle: true,
                        }
                    },
                    animation: {
                        duration: 0
                    },
                    scales: {
                        xAxes: [{
                            type: 'time',
                            time: {
                                unit: 'month',
                            },
                            distribution: 'series',
                            offset: true,
                            gridLines: {
                                display: false, // don't show the horizontal lines on the chart
                            },
                            ticks: {
                                major: {
                                    enabled: true,
                                    fontStyle: 'bold'
                                },
                                source: 'data',
                                autoSkip: true,
                                autoSkipPadding: 75,
                                maxRotation: 0,
                                sampleSize: 100
                            },
                            afterBuildTicks: function(scale, ticks) {
                                var majorUnit = scale._majorUnit; // second
                                var firstTick = ticks[0];
                                var i, ilen, val, tick, currMajor, lastMajor;
        

                                val = new Date(ticks[0].value); // moment(ticks[0].value);
                                if ((majorUnit === 'minute' && val.getSeconds() === 0)
                                        || (majorUnit === 'hour' && val.getMinutes() === 0)
                                        || (majorUnit === 'day' && val.getHours() === 9)
                                        || (majorUnit === 'month' && val.getDate() <= 3 && val.getDay()+1 === 1)
                                        || (majorUnit === 'year' && val.getMonth() === 0)) {
                                    firstTick.major = true;
                                } else {
                                    firstTick.major = false;
                                }
                                lastMajor = majorUnit == 'month' ? val.getMonth() : majorUnit == 'year' ? val.getFullYear() : majorUnit == 'day' ? val.getDay() : val.getHours() ; // val.get(majorUnit);

                                for (i = 1, ilen = ticks.length; i < ilen; i++) {
                                    tick = ticks[i];
                                    val = new Date(tick.value); // moment(tick.value);
                                    currMajor = majorUnit == 'month' ? val.getMonth() : majorUnit == 'year' ? val.getFullYear() : majorUnit == 'day' ? val.getDay() : val.getHours() ; // val.get(majorUnit);
                                    tick.major = currMajor !== lastMajor;
                                    lastMajor = currMajor;
                                }
                                return ticks;
                            }
                        }],
                        yAxes: [{
                            // display: false,
                            // weight: 5,
                            ticks: {
                                beginAtZero: true,
                                stepSize: 20000, // step by NGN 20K
                                padding: 10,
                                callback: function(value, index, values) {
                                    // return null to hide
                                    return /* '₦' +  */new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(value); // Include a naira/ksh sign in the ticks // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
                                }
                            },
                            gridLines: { // https://www.chartjs.org/docs/latest/axes/styling.html#grid-line-configuration
                                drawBorder: false,
                            },
                            scaleLabel: {
                                display: false,
                                labelString: 'Money rate'
                            }
                        }]
                    },
                    tooltips: {
                        intersect: false,
                        titleFontFamily: "'Raleway', sans-serif",
                        bodyFontSize: 15,
                        footerFontFamily: "'Raleway', sans-serif",
                        titleMarginBottom: 10,
                        cornerRadius: 4,
                        titleFontSize: 15,
                        // borderWidth: 10,
                        caretPadding: 4,
                        caretSize: 7,
                        xPadding: 12,
                        yPadding: 12,
                        mode: 'index',
                        callbacks: {
                            label: function(tooltipItem, myData) {
                                let _text = ''
                                if (tooltipItem.datasetIndex == 0) {
                                    _text = ' got tipped '
                                } else {
                                    _text = ' cashed out '
                                }
                                let label = myData.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].username + _text + new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(parseFloat(tooltipItem.value).toFixed(2));
                                return label;
                            }
                        }
                    }
                }
            });
        },
        loadReceived(){
            axios.post(process.env.BASE_URL + '/api/requests/', {
                status: 'received'
            }).then( res => {
                console.log('loaded received tips')
                this.totalTransact = res.data.length
                for(var i = 0; i < res.data.length; i++){
                    this.transactionVolume += parseFloat(res.data[i].amount);
                }
            }).catch(err => {
                console.error(err)
            })
        },
        loadPaid(){
            axios.post(process.env.BASE_URL + '/api/requests/', {
                status: 'paid'
            }).then( res => {
                console.log('loaded received tips')
                for(var i = 0; i < res.data.length; i++){
                    this.paidVolume += parseFloat(res.data[i].amount) * 0.9;
                    this.netRevenue += (parseFloat(res.data[i].amount) * 0.1) - 25; // ₦25 is transaction fee for transfer https://wallets.africa/faqs
                }
            }).catch(err => {
                console.error(err)
            })
        },
        loadRequest() {
            axios.post(process.env.BASE_URL + '/api/requests/', {
                status: 'requested'
            }).then(resp => {
                console.log('wthdrawal requests loaded')
                this.requests = resp.data
                this.requested = resp.data.length
            }).catch( err => {
                console.error(err)
            })
        },
        update(id){
            this.paid = 'paying...'
            axios.post(process.env.BASE_URL + '/api/updatetransaction/', {
                id: id,
                status: 'paid'
            }).then( resp => {
                this.paid = 'Pay'
                alert('Paid') // More UX/UI
                console.log('paid')
            }).catch(err => {
                console.error(err)
            })
        },
        deleteUser(id){
            this.deleted = 'deleting..'
            axios.post(process.env.BASE_URL + '/api/deleteuser/', {
                id: id,
            }).then( resp => {
                this.deleted = 'Delete'
                alert('Deleted')
            }).catch(err => {
                console.error(err)
            })
        },
         deleteTransaction(id){// why would we want to delete a transaction?
            this.deleted = 'deleting..'
            axios.post(process.env.BASE_URL + '/api/deletetransaction/', {
                id: id,
            }).then( resp => {
                this.deleted = 'Delete'
                alert('Deleted')
            }).catch(err => {
                console.error(err)
            })
        },
        getFeedback(){
            axios.get(process.env.BASE_URL + '/api/allfeedback/').then( res =>{
                this.allfeedback = res.data
                console.log('loaded feedback')
            }).catch(err => {
                console.error(err)
            })
        }
    },
    mounted(){
        this.loadUsers()
        this.loadRequest()
        this.loadTransactions()
        this.loadReceived()
        this.getFeedback()
        this.loadPaid()
    }, 
    computed: {
        filteresults: function (params) {
            let filtered = this.users;
            if (this.search) {
                filtered = this.users.filter(
                m => m.username.toLowerCase().indexOf(this.search.toLowerCase()) > -1
                );
            }
            return filtered;
        },
        _allFeedback: function () {
            return this.allfeedback.reverse();
        },
        _requests: function () {
            return this.requests.reverse();
        },
        _transactions: function () {
            return this.transactions.reverse()
        },
        _users: function () {
            return this.users.reverse();
        }
    }
}
</script>
<style scoped>
@media (min-width: 640px) {
 .info-card hr.uk-divider-vertical {
     display: block;
 }
 .info-card hr.horizontal {
     display: none;
 }
}

@media (max-width: 640px) {
.info-card hr.uk-divider-vertical {
     display: none;
 }
 .info-card hr.horizontal, .info-card > .uk-flex {
     display: block;
 }
}
.info-card, .chart-card {
    border-radius: 5px;
}
.uk-navbar, .uk-navbar-item {
  background: transparent !important;
  color: #c63968 !important;
}
.background {
  background-color: #ffffff;
  height: 33.5rem;
  color: #c63968 !important;
}
.uk-section {
  /* background-color: #fceedd; */
  color: #ff6870;
}
.uk-card, .uk-card-title {
    /* background-color: #fceedd; */
    color: #ff6870;
}
h2 {
    color: #c63968;
}
</style>