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
    <li>
    <table class="uk-table uk-table-divider">
    <thead>
        <tr>
            <th class="uk-width-small">Username</th>
            <th>Email</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="(user, index) in users" :key="index">
            <td uk-toggle="target: #my-bo">{{user.username}}</td>
            <td>{{user.email}}</td>
    <div id="my-bo" uk-modal>
    <div class="uk-modal-dialog uk-modal-body">
    <h2 class="uk-modal-title">More info</h2>
    <ul class="uk-list uk-list-divider">
    <li>Fullname: {{user.fullname}}</li>
     <li>Bank: {{user.bank}}</li>
    <li>Account name: {{user.account_name}}</li>
    <li>Account Number: {{user.account_number}}</li>
    <li>Craft type: {{user.craft_type}}</li>
    <button class="uk-button" @click="deleteUser(user._id)">{{deleted}}</button>
    </ul>
        <button class="uk-modal-close" type="button" uk-close></button>
    </div>
</div>
        </tr>
    </tbody>
</table>
    </li>
    <li class="uk-container">
        <table class="uk-table uk-table-divider">
    <thead>
        <tr>
            <th>Username</th>
            <th>Amount</th>
            <th>Status</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="(transaction, index) in transactions" :key="index">
            <td uk-toggle="target: #my-id">{{transaction.username}}</td>
            <td>{{transaction.amount}}</td>
            <td>{{transaction.status}}</td>
            <div id="my-id" uk-modal>
    <div class="uk-modal-dialog uk-modal-body">
        <h2 class="uk-modal-title">Transaction info.</h2>
    <ul class="uk-list uk-list-divider">
    <li>Fullname: {{transaction.supporter_nickname}}</li>
     <li>Bank: {{transaction.transaction_date}}</li>
    </ul>
        <button class="uk-modal-close" type="button" uk-close></button>
    </div>
</div>
        </tr>
    </tbody>
</table>
    </li>
    <li align="center">
        <span v-if= "requests.length == 0" align="center">No requests made yet.</span>
        <table class="uk-table uk-table-divider" v-else>
             <thead>
        <tr>
            <th>Username</th>
            <th>Amount</th>
            <th>Status</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for= "(request, index) in requests" :key="index">
            <td uk-toggle="target: #my-req">{{request.username}}</td>
            <td>{{request.amount}}</td>
            <td>{{request.status}}</td>
               <div id="my-req" uk-modal>
    <div class="uk-modal-dialog uk-modal-body">
        <h2 class="uk-modal-title">Transaction info.</h2>
    <ul class="uk-list uk-list-divider">
    <li>Nickname: {{request.username}}</li>
     <li>Transaction: {{request.transaction_date}}</li>
     <button class="uk-button" @click="update(request._id)">{{paid}}</button>
    </ul>
        <button class="uk-modal-close" type="button" uk-close></button>
    </div>
</div>
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