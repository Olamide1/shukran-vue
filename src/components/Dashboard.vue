<template>
  <div class="uk-container-expand">
  <nav class="uk-navbar uk-navbar-container uk-margin">
    <div class="uk-navbar-left">
      <a class="uk-navbar-toggle" 
     uk-toggle="target: #offcanvas-usage">
     <span uk-navbar-toggle-icon></span> <span class="uk-margin-small-left"></span>
     </a>

     <a class="uk-navbar-item uk-logo">Shukran</a>
    </div>
</nav>
  <div class="uk-section uk-section-muted">
   <!-- sidebar -->     
<div id="offcanvas-usage" uk-offcanvas>
    <div class="uk-offcanvas-bar">

        <button class="uk-offcanvas-close" type="button" uk-close></button>

        <h3>Shukran</h3>
<ul class="uk-list uk-list-divider">
  <li><router-link to="/dash">Home</router-link></li>
    <li href="#modal-center" uk-toggle>Get tipped</li>
    <div id="modal-center" class="uk-flex-top" uk-modal>
    <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical uk-width-auto" uk-overflow-auto>

    <button class="uk-modal-close-default" type="button" uk-close></button>
  <h2 class="uk-modal-title">Hey {{username}},</h2>
  <div class="uk-modal-body">
    <p style="color: #c63968;">Share this link to get tipped.</p>
    <router-link :to="'/cr/' + username">https://useshukran.com/{{url}}</router-link>
    </div> 
    </div> 
</div>
    <li><router-link to="/profile">Profile</router-link></li>
<!--Feedback area start -->
    <li uk-toggle="target: #my-id">Give feedback <a uk-icon="heart"></a></li>
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
    <li  @click="logout">Logout</li>
</ul>    
    </div>
</div>
<!-- Sidebar end -->
    <div class="uk-container">
        <h3 class="h3">Hello, {{username}}</h3>

   <div class="uk-child-width-1-2@m uk-grid-match" uk-grid>
    <div>
      <!-- Total tips start -->
        <div class="uk-card uk-card-default uk-card-body" uk-scrollspy="cls: uk-animation-slide-bottom; repeat: true">
          <a class="uk-card-badge uk-label" href="#modal-middle" uk-toggle>Withdraw request</a>
<!-- Withdraw request modal start -->
  <div id="modal-middle" class="uk-flex-top" uk-modal>
    <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
 <div class="uk-modal-header">
            <h4 class="uk-modal-title">Withdrawal request</h4>
          </div>
        <button class="uk-modal-close-default" type="button" uk-close></button>
        <div class="uk-margin">
          <h4>Available: &#x20a6;{{tipTotal - tipWithdrawn}}</h4>
        </div>
          <div class="uk-margin" align="center">
            <input type="number" class="uk-input" placeholder="Amount" v-model="amount">
            <span v-if="amount > (tipTotal - tipWithdrawn)">
              Available balance insufficient.
            </span>
          </div>
          <div class="uk-margin">
            <button class="uk-button" v-if= "amount <= (tipTotal - tipWithdrawn) & amount != 0" @click="withdrawRequest()">{{request}}</button>
          </div>
    </div>
</div>
<!-- Withdraw request modal end -->
            <h3 class="uk-card-title">&#x20a6;{{tipTotal}}</h3>
            <p>Total tips.</p>
        </div>
    <!-- Total tips end -->
    </div>
    <div>
        <div class="uk-card uk-card-default uk-card-body" uk-scrollspy="cls: uk-animation-slide-top; repeat: true">
            <h3 class="uk-card-title">&#x20a6;{{tipWithdrawn}}</h3>
            <p>Withdrawn.</p>
        </div>
    </div>
</div>

<ul uk-accordion>
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
        <tr v-for="(transaction, index) in transactions" :key="index">
            <td>{{transaction.supporter_nickname}}</td>
            <td>&#x20a6;{{transaction.amount}}</td>
            <td>{{transaction.message}}</td>
        </tr>
    </tbody>
</table>
            </div>
        </div>
    </li>
</ul>

</div>
</div>
  </div>
  
</template>

<script>
import axios from 'axios'
export default {
  name: 'dashboard',
  data () {
    return {
     username: sessionStorage.getItem('username'),
     transactions: [], 
     url: 'cr/' + sessionStorage.getItem('username'),
     copied: '',
     amount: 0,
     tipTotal: 0,
     tipWithdrawn: 0,
     withdrawals: [],
     balance: 0,
     comment: '',
     feed: 'Submit',
     request: 'Request'
    }
  },
  methods: {
    logout() {
        sessionStorage.clear()
        this.$router.push('/accounts')
    },
    loadTransactions(){
      var username = this.username
      axios.post('https://shukran-api.herokuapp.com/api/findall/', {
        username: username,
        status: 'received'
      }).then( res => {
        this.transactions = res.data
        for(var i = 0; i <= this.transactions.length; i++){
          this.tipTotal += parseInt(this.transactions[i].amount);
        }
      }).catch(err => {
        console.log(err)
      })
      console.log(username)
    },
    loadWithdrawn(){
      var username = this.username
      axios.post('https://shukran-api.herokuapp.com/api/findall/', {
        username: username,
        status: 'paid'
      }).then(res => {
        this.withdrawals = res.data
        for(var i = 0; i <= this.withdrawals.length; i++){
          this.tipWithdrawn += parseInt(this.withdrawals[i].amount);
        }
      }).catch(err => {
        console.log(err)
      })
    },
    withdrawRequest(){
      var username = this.username
      var amount = this.amount
      var status = 'requested'
      this.request = 'loading...'
      axios.post('https://shukran-api.herokuapp.com/api/createtransaction/', {
        username: username,
        amount: amount,
        status: status
      }).then( res => {
        console.log('done')
        this.request = 'Done'
        UIkit.modal('#modal-middle').hide();
        alert('thank you')
      }).catch( err => {
        console.log(err)
      })
    },
    submitFeedback(){
      var username = this.username
      var comment = this.comment
      this.feed = 'loading...'
      axios.post('https://shukran-api.herokuapp.com/api/givefeedback/', {
        username: username,
        comment: comment
      }).then( res => {
        console.log('feedback submitted')
        UIkit.modal('#my-id').hide();
        alert('Thank you for your feedback!')
      }).catch(err => {
        console.log(err)
      })
    }, 
    getBalance(){
      this.balance = this.tipTotal - this.tipWithdrawn
    },
    checkUser() {
      if (this.username == null) {
      this.$router.push('/accounts')
    }
    }
  }, 
  mounted() {
    this.loadTransactions();
    this.checkUser()
    this.loadWithdrawn()
    this.getBalance()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.uk-navbar, .uk-navbar-item, .lead {
  background: transparent !important;
  color: #c63968 !important;
}
.uk-container-expand{
  background-color: #ffffff;
  height: 33.5rem;
  color: #EBEBE7 !important;
}
.uk-accordion-content {
   background-color: #fceedd !important;
  color: #ff6870 !important;
}
.h3 {
  color: #c63968;
}
.uk-offcanvas-bar {
background-color: #c63968 !important;
color: #fceedd;
}
.uk-card, .uk-card-title {
  background-color: #fceedd !important;
  color: #ff6870 !important;
}
.uk-section{
  background-color: #fceedd !important;
  color: #ff6870 !important;
}
.uk-label {
  background: #ff6870;
  color: #fceedd;
}
.uk-modal{
  background-color: #ff6870 !important;
  color: #fceedd;
}
#modal-middle, #my-id {
  background-color: #fceedd;
  color: #ff6870;
}
.uk-button{
  background-color: #c63968 !important;
  color: #fceedd;
}
</style>