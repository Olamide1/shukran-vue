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
        <tr v-for="(user, index) in users" :key="index">
            <td >{{user.username}}</td>
            <td>{{user.email}}</td>
            <td> {{user.fullname}}</td>
            <td class="uk-inline">
                <button class="uk-button uk-button-default" type="button">
                    info
                </button>
        <ul uk-dropdown="mode: click">
     <li>Bank: {{user.bank}}</li>
    <li>Account name: {{user.account_name}}</li>
    <li>Account Number: {{user.account_number}}</li>
    <li>Craft type: {{user.craft_type}}</li>
    <button class="uk-button" @click="deleteUser(user._id)">{{deleted}}</button>
    </ul>
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
        <tr v-for="(transaction, index) in transactions" :key="index">
            <td>{{transaction.username}}</td>
            <td>{{transaction.amount}}</td>
            <td>{{transaction.status}}</td>
            <td class="uk-inline">
                <button class="uk-button uk-button-default" type="button">Info</button>
                <ul uk-dropdown="mode: click">
                <li>Fullname: {{transaction.supporter_nickname}}</li>
             <li>Date: {{transaction.transaction_date}}</li>
                </ul>
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
        <tr v-for= "(request, index) in requests" :key="index">
            <td>{{request.username}}</td>
            <td>{{request.amount}}</td>
            <td>{{request.status}}</td>
            <td>Transaction: {{request.transaction_date}}</td>
            <td><button class="uk-button uk-button-small" @click="update(request._id)">{{paid}}</button></td>
        </tr>
    </tbody>
        </table>
    </li>
        <li align="center">
            <table class="uk-table uk-table-divider">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Comment</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(feedback, index) in allfeedback" :key="index">
                        <td>{{feedback.username}}</td>
                        <td>{{feedback.comment}}</td>
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
            allfeedback: [],
            deleted: 'Delete'
        }
    }, 
    methods: {
        loadUsers() {
            axios.get('https://shukran-api.herokuapp.com/api/allusers/').then(res => {
                console.log('loaded users')
                this.users = res.data
                console.log(res.data)
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
                console.log('loaded received tips')
                rec = res.data
                this.totalTransact = rec.length
                for(var i = 0; i <= this.totalTransact; i++){
                    this.transactionVolume += parseInt(rec[i].amount);
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
                this.paid = 'Paid'
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
                this.deleted = 'Done'
                console.log('deleted')
                UIkit.modal('#my-bo').hide();
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