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
    <li href="#modal-center" uk-toggle>Your URL</li>
    <div id="modal-center" class="uk-flex-top" uk-modal>
    <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">

    <button class="uk-modal-close-default" type="button" uk-close></button>
  <h2 class="uk-modal-title">Hey {{username}},</h2>
        <p> 
          Your url is: <a @click="copy">http://localhost:8080/{{url}}</a>
        </p>

    </div>
</div>
    <li><router-link to="/profile">Profile</router-link></li>
<!--Feedback area start -->
    <li uk-toggle="target: #my-id">Give feedback <a uk-icon="heart"></a></li>
    <div id="my-id" uk-modal>
    <div class="uk-modal-dialog uk-modal-body">
        <h2 class="uk-modal-title">Hey, {{username}}</h2>
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
        <h3>Hello, {{username}}</h3>

   <div class="uk-child-width-1-2@m uk-grid-match" uk-grid>
    <div>
      <!-- Total tips start -->
        <div class="uk-card uk-card-default uk-card-body" uk-scrollspy="cls: uk-animation-slide-bottom; repeat: true">
          <a class="uk-card-badge uk-label" href="#modal-middle" uk-toggle>Withdraw request</a>
<!-- Withdraw request modal start -->
  <div id="modal-middle" class="uk-flex-top" uk-modal>
    <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
 <div class="uk-modal-header">
            <h3 class="uk-modal-title">Withdraw request</h3>
          </div>
        <button class="uk-modal-close-default" type="button" uk-close></button>
        <div class="uk-margin">
          <h4>Available: {{tipTotal - tipWithdrawn}}</h4>
        </div>
          <div class="uk-margin">
            <input type="number" class="uk-input" placeholder="Amount" v-model="amount">
            <span v-if="amount > (tipTotal - tipWithdrawn)" align="center">
              Cannot Withdraw beyond {{tipTotal - tipWithdrawn}}
            </span>
          </div>
          <div class="uk-margin">
            <button class="uk-button" @click="withdrawRequest()">Request</button>
          </div>
    </div>
</div>
<!-- Withdraw request modal end -->
            <h3 class="uk-card-title">{{tipTotal}}</h3>
            <p>Total tips.</p>
        </div>
    <!-- Total tips end -->
    </div>
    <div>
        <div class="uk-card uk-card-default uk-card-body" uk-scrollspy="cls: uk-animation-slide-top; repeat: true">
            <h3 class="uk-card-title">{{tipWithdrawn}}</h3>
            <p>Withdrawn.</p>
        </div>
    </div>
</div>

<ul uk-accordion>
    <li>
        <a class="uk-accordion-title" href="#">Tips information</a>
        <div class="uk-accordion-content">
            <p v-if="transactions.length == 0" align="center">No tips sent to you yet</p>

            <div v-else>
        <table class="uk-table uk-table-middle uk-table-divider">
    <thead>
        <tr>
            <th class="uk-width-small">Nickname</th>
            <th>Amount</th>
            <th>Message</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="(transaction, index) in transactions" :key="index">
            <td>{{transaction.supporter_nickname}}</td>
            <td>{{transaction.amount}}</td>
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
     feed: 'Submit'
    }
  },
  methods: {
    logout() {
        sessionStorage.clear()
        this.$router.push('/accounts')
    },
    loadTransactions(){
      var username = this.username
      axios.post('http://localhost:3000/api/findall', {
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
      axios.post('http://localhost:3000/api/findall', {
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
      this.feed = 'submitting...'
      axios.post('http://localhost:3000/api/createtransaction', {
        username: username,
        amount: amount,
        status: status
      }).then( res => {
        console.log('done')
        this.feed('Done')
        UIkit.modal('#modal-middle').hide();
        alert('thank you')
      }).catch( err => {
        console.log(err)
      })
    },
    submitFeedback(){
      var username = this.username
      var comment = this.comment

      axios.post('http://localhost:3000/api/givefeedback', {
        username: username,
        comment: comment
      }).then( res => {
        console.log(res.data)
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
    },
    copy() {
      console.log('copied')
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
.uk-navbar, .uk-navbar-item {
  background: transparent !important;
  color: #FAF8F0 !important;
}
.uk-container-expand{
  background-color: #043353;
  height: 33.5rem;
  color: #FAF8F0 !important;
}
.uk-card {
  background-color: #FAF8F0 !important;
  color: #18A4E0 !important;
}
.uk-section{
  background-color: #D3DDE6 !important;
  color: #648796 !important;
}
.uk-modal{
  background-color: #C8CEC4 !important;
}
</style>