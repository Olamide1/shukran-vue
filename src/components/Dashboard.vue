<template>
  <div>
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
    <li>Give feedback <a uk-icon="heart"></a></li>
    <li  @click="logout">Logout</li>
</ul>
        

    </div>
</div>

<!-- Sidebar -->
    <div class="uk-container">
        <h3>Hello, {{username}}</h3>

   <div class="uk-child-width-1-2@m uk-grid-match" uk-grid>
    <div>
        <div class="uk-card uk-card-default uk-card-body" uk-scrollspy="cls: uk-animation-slide-bottom; repeat: true">
          <div class="uk-card-badge uk-label">Withdraw request</div>
            <h3 class="uk-card-title">{{tipTotal}}</h3>
            <p>Total tips.</p>
        </div>
    </div>
    <div>
        <div class="uk-card uk-card-default uk-card-body" uk-scrollspy="cls: uk-animation-slide-top; repeat: true">
            <h3 class="uk-card-title">45,000</h3>
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
     tipTotal: 0
    }
  },
  methods: {
    logout() {
        sessionStorage.clear()
        this.$router.push('/')
    },
    loadTransactions(){
      var username = this.username
      axios.post('http://localhost:3000/api/findall', {
        username: username
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>