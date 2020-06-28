<template>
  <div class="uk-container">
    <nav class="uk-navbar uk-navbar-container uk-margin">
      <div class="uk-navbar-left">
        <router-link class="uk-navbar-item uk-logo" to="/">Shukran</router-link>
      </div>
    </nav>

   <div align="center">
      <h1 class="uk-heading">Pricing</h1>
      <div class="uk-card uk-card-default padding uk-width-1-2@m">
    <div class="uk-card-header">
        <div class="uk-grid-small uk-flex-middle" uk-grid>
            <div class="uk-width-expand">
                <h3 class="uk-card-title uk-margin-remove-bottom">10% Flat fee for total payouts/withdrawals.</h3>
            </div>
        </div>
    </div>
    <div class="uk-card-body">
        <ul>
           This covers:
          <li>Transaction fees for processing.</li>
          <li>Full access to all features on Shukran.</li>
        </ul>
    </div>
    <div class="uk-card-footer">
        <router-link to="/accounts" class="uk-button uk-button-text">Continue</router-link>
    </div>
</div>
   </div>

  
  </div>
</template>

<script>
export default {
  name: 'pricing'
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  height: 100vh;
}
.uk-navbar,
.uk-navbar-item,
.lead {
  background: transparent !important;
  color: #c63968 !important;
}
.uk-container {
  background-color: #ffffff !important;
  color: #c63968 !important;
}
.uk-card,
.uk-card-title, .uk-button-text {
  color: #c63968 !important;
}
li {
  display: inherit;
}
.uk-grid {
  flex-wrap: initial;
  justify-content: center;
}

@media screen and (max-device-width: 1000px) {
  .uk-grid {
    flex-wrap: wrap;
  }
}
</style>