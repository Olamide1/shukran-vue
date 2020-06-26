<template>
<div class="uk-container-expand background">
<nav class="uk-navbar uk-navbar-container uk-margin">
    <div class="uk-navbar-left">
     <a class="uk-navbar-item uk-logo">Shukran Admin</a>
    </div>
</nav>

<div class="uk-section uk-section-muted">
   <div class="uk-container">
       <h2>Hi, {{admin}}</h2>
       <div class="uk-child-width-1-2@s uk-grid-match" uk-grid>
        <div>
        <div class="uk-card uk-card-default uk-card-body">
            <h3 class="uk-card-title">{{totalUsers}}</h3>
            <p>Creators.</p>
        </div>
    </div>
    <div>
        <div class="uk-card uk-card-default uk-card-body">
            <h3 class="uk-card-title">{{totalTransact}}</h3>
            <p>Tips total.</p>
        </div>
    </div>
     <div>
        <div class="uk-card uk-card-default uk-card-body">
            <h3 class="uk-card-title">&#x20a6;{{transactionVolume}}</h3>
            <p>Tip volume.</p>
        </div>
    </div>
    <div>
        <div class="uk-card uk-card-default uk-card-body">
            <h3 class="uk-card-title">{{requested}}</h3>
            <p>Payout requests.</p>
        </div>
    </div>
    <div>
        <div class="uk-card uk-card-default uk-card-body">
            <h3 class="uk-card-title">&#x20a6;{{paidVolume}}</h3>
            <p>Tips Paid Out.</p>
        </div>
    </div>

    <div>
        <div class="uk-card uk-card-default uk-card-body">
            <h3 class="uk-card-title">&#x20a6;{{netRevenue}}</h3>
            <p>Revenue gotten.</p>
        </div>
    </div>

    
   </div> <br>

 <input type="text" v-model="search" placeholder="Search for a creator" class="uk-input">
 <div class="uk-modal-body" v-if="search !== ''">
     <div v-for="result in filteresults" :key="result.id">
         <p>{{result.username}}</p>
            <p>{{result.email}}</p>
            <p> {{result.fullname}}</p>
            <div class="uk-inline">
                <button class="uk-button" type="button">
                    info
                </button>
        <div uk-dropdown="mode: click">
        <ul class="uk-nav uk-dropdown-nav" >
     <li>Bank: {{result.bank}}</li>
    <li>Account name: {{result.account_name}}</li>
    <li>Account Number: {{result.account_number}}</li>
    <li>Craft type: {{result.craft_type}}</li>
    </ul>
       </div>
            </div>
     </div>
 </div>


<ul class="uk-subnav uk-subnav-pill" uk-switcher="animation: uk-animation-fade">
    <li><a href="#">Creators</a></li>
    <li><a href="#">Transactions</a></li>
    <li><a href="#">Withdrawal requests</a></li>
     <li><a href="#">Feedback</a></li>
</ul>
<ul class="uk-switcher uk-margin">
    <li class="uk-overflow-auto">
    <table class="uk-table uk-table-divider uk-table-responsive">
    <thead>
        <tr>
            <th class="uk-width-small">Username</th>
            <th>Email</th>
            <th>Fullname</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="(user, index) in users.slice().reverse()" :key="index">
            <td>{{user.username}}</td>
            <td>{{user.email}}</td>
            <td> {{user.fullname}}</td>
            <td class="uk-inline">
                <button class="uk-button" type="button">
                    info
                </button>
       <div uk-dropdown="mode: click">
        <ul class="uk-nav uk-dropdown-nav" >
     <li>Bank: {{user.bank}}</li>
    <li>Account name: {{user.account_name}}</li>
    <li>Account Number: {{user.account_number}}</li>
    <li>Craft type: {{user.craft_type}}</li>
    <button class="uk-button" @click="deleteUser(user._id)">{{deleted}}</button>
    </ul>
       </div>
    
                </td>
        </tr>
    </tbody>
</table>
    </li>
    <li class="uk-overflow-auto">
        <table class="uk-table uk-table-divider uk-table-responsive">
    <thead>
        <tr>
            <th>Username</th>
            <th>Amount</th>
            <th>Status</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="(transaction, index) in transactions.slice().reverse()" :key="index">
            <td>{{transaction.username}}</td>
            <td>{{transaction.amount}}</td>
            <td>{{transaction.status}}</td>
            <td class="uk-inline">
                <button class="uk-button uk-button-default" type="button">Info</button>
                <div uk-dropdown="mode: click">
                    <ul class="uk-nav uk-dropdown-nav">
                <li>Suppoter: {{transaction.supporter_nickname}}</li>
             <li>Date: {{transaction.transaction_date}}</li>
              <button class="uk-button" @click="deleteTransaction(transaction._id)">{{deleted}}</button>
                </ul>
                </div>
            </td>
        </tr>
    </tbody>
</table>
    </li>
    <li align="center" class="uk-overflow-auto">
        <span v-if= "requests.length == 0" align="center">No requests made yet.</span>
        <table class="uk-table uk-table-divider uk-table-responsive" v-else>
             <thead>
        <tr>
            <th>Username</th>
            <th>Amount</th>
            <th>Status</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for= "(request, index) in requests.slice().reverse()" :key="index">
            <td>{{request.username}}</td>
            <td>{{request.amount * 0.9}}</td> <!-- auto calculate how much you should pay out -->
            <td>{{request.status}}</td>
            <td>Transaction: {{request.transaction_date}}</td>
            <td><button class="uk-button uk-button-small" @click="update(request._id)">{{paid}}</button></td>
            <button class="uk-button" @click="deleteTransaction(request._id)">{{deleted}}</button>
            <hr class="uk-divider-icon">
        </tr>
    </tbody>
        </table>
    </li>
        <li align="center">
            <table class="uk-table uk-table-divider uk-table-responsive">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Comment</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(feedback, index) in allfeedback.slice().reverse()" :key="index">
                        <td>{{feedback.username}}</td>
                        <td>{{feedback.comment}}</td>
                        <hr class="uk-divider-icon">
                    </tr>
                </tbody>
            </table>
        </li>
</ul>
   </div>
</div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'admin',
    data(){
        return{
            admin: 'admin',
            users: [],
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
            deleted: 'Delete'
        }
    }, 
    methods: {
        loadUsers() {
            axios.get('https://shukran-api.herokuapp.com/api/allusers/').then(res => {
                console.log('loaded users')
                this.users = res.data
                this.totalUsers = this.users.length
            }).catch(err => {
                console.log(err)
            })
        },
        loadTransactions(){
             axios.get('https://shukran-api.herokuapp.com/api/alltransactions/').then( res=> { 
                console.log('loaded transactions')
                this.transactions = res.data
            }).catch( error => {
                console.log(error)
            })
        },
        loadReceived(){
            axios.post('https://shukran-api.herokuapp.com/api/requests/', {
                status: 'received'
            }).then( res => {
                let rec = []
                console.log('loaded received tips', res)
                rec = res.data
                this.totalTransact = rec.length
                for(var i = 0; i <= this.totalTransact; i++){
                    this.transactionVolume += parseInt(rec[i].amount);
                }
            }).catch(err => {
                console.log(err)
            })
        },
        loadPaid(){
            axios.post('https://shukran-api.herokuapp.com/api/requests/', {
                status: 'paid'
            }).then( res => {
                let rec = []
                console.log('loaded received tips')
                rec = res.data
                var transaction = rec.length
                for(var i = 0; i <= transaction; i++){
                    this.paidVolume += parseInt(rec[i].amount) * 0.9;
                    this.netRevenue += (parseInt(rec[i].amount) * 0.1) - 25; // ₦25 is transaction fee for transfer https://wallets.africa/faqs
                }
            }).catch(err => {
                console.log(err)
            })
        },
        loadRequest() {
            axios.post('https://shukran-api.herokuapp.com/api/requests/', {
                status: 'requested'
            }).then(resp => {
                console.log('wthdrawal requests loaded')
                this.requests = resp.data
                this.requested = resp.data.length
            }).catch( err => {
                console.log(err)
            })
        },
        update(id){
            this.paid = 'paying...'
            axios.post('https://shukran-api.herokuapp.com/api/updatetransaction/', {
                id: id,
                status: 'paid'
            }).then( resp => {
                this.paid = 'Pay'
                alert('Paid')
                console.log('paid')
            }).catch(err => {
                console.log(err)
            })
        },
        deleteUser(id){
            this.deleted = 'deleting..'
            axios.post('https://shukran-api.herokuapp.com/api/deleteuser/', {
                id: id,
            }).then( resp => {
                this.deleted = 'Delete'
                alert('Deleted')
            }).catch(err => {
                console.log(err)
            })
        },
         deleteTransaction(id){
            this.deleted = 'deleting..'
            axios.post('https://shukran-api.herokuapp.com/api/deletetransaction/', {
                id: id,
            }).then( resp => {
                this.deleted = 'Delete'
                alert('Deleted')
            }).catch(err => {
                console.log(err)
            })
        },
        getFeedback(){
            axios.get('https://shukran-api.herokuapp.com/api/allfeedback/').then( res =>{
                this.allfeedback = res.data
                console.log('loaded feedback')
            }).catch(err => {
                console.log(err)
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
        }
    }
}
</script>
<style scoped>
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
  background-color: #fceedd;
  color: #ff6870;
}
.uk-card, .uk-card-title {
    background-color: #fceedd;
    color: #ff6870;
}
h2 {
    color: #c63968;
}
</style>