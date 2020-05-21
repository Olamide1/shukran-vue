<template>
    <div>
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
        <div class="uk-card uk-card-default uk-card-hover uk-card-body">
            <h3 class="uk-card-title">{{totalUsers}}</h3>
            <p>Creators.</p>
        </div>
    </div>
    <div>
        <div class="uk-card uk-card-default uk-card-hover uk-card-body">
            <h3 class="uk-card-title">{{totalTransact}}</h3>
            <p>Transactions.</p>
        </div>
    </div>
   </div>




   <ul class="uk-subnav uk-subnav-pill" uk-switcher="animation: uk-animation-fade">
    <li><a href="#">Users</a></li>
    <li><a href="#">Transactions</a></li>
    <li><a href="#">Withdrawal requests</a></li>
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
        <tr v-for="(user, index) in users" :key="index" uk-toggle="target: #my-bo">
            <td>{{user.username}}</td>
            <td>{{user.email}}</td>
        </tr>
        <div id="my-bo" uk-modal>
    <div class="uk-modal-dialog uk-modal-body">
        <h2 class="uk-modal-title">More info</h2>

        <button class="uk-modal-close" type="button" uk-close></button>
    </div>
</div>
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
        <tr v-for="(transaction, index) in transactions" :key="index" uk-toggle="target: #my-id">
            <td>{{transaction.username}}</td>
            <td>{{transaction.amount}}</td>
            <td>{{transaction.status}}</td>
        </tr>
<div id="my-id" uk-modal>
    <div class="uk-modal-dialog uk-modal-body">
        <h2 class="uk-modal-title">More info</h2>

        <button class="uk-modal-close" type="button" uk-close></button>
    </div>
</div>
    </tbody>
</table>
    </li>
    <li>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur, sed do eiusmod.</li>
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
            totalTransact: 0
        }
    }, 
    methods: {
        loadUsers() {
            axios.get('http://localhost:3000/api/allusers').then(res => {
                console.log(res.data)
                this.users = res.data
                this.totalUsers = this.users.length
            }).catch(err => {
                console.log(err)
            })

            axios.get('http://localhost:3000/api/alltransactions').then( res=> {
                    console.log(res.data)
                    this.transactions = res.data
                    this.totalTransact = this.transactions.length
            }).catch( error => {
                console.log(error)
            })
        }
    },
    mounted(){
        this.loadUsers()
    }
}
</script>
<style scoped>

</style>