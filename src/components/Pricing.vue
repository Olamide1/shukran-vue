<template>
  <div class="uk-container">
    <nav class="uk-navbar uk-navbar-container uk-margin">
      <div class="uk-navbar-left">
        <router-link class="uk-navbar-item uk-logo" to="/">Shukran</router-link>
      </div>
    </nav>

    <section>
        <h1 class="uk-heading-divider">How the money goes</h1>
      <div class="uk-child-width-1-3@m uk-grid-small uk-grid-match" uk-grid>
        <div>
          <div class="uk-card uk-card-default uk-card-body">
            <h3 class="uk-card-title">Less than &#x20a6;1000</h3>
            <p>Nah. You can't withdraw it. And we don't touch it.</p>
          </div>
        </div>
        <div>
          <div class="uk-card uk-card-primary uk-card-body">
            <h3 class="uk-card-title">Greater than &#x20a6;1000</h3>
            <p>Yep. You can withdraw. But we take a 10% fee charge.</p>
          </div>
        </div>
      </div>
      <h1 class="uk-heading-line uk-text-center"><span>That's it</span></h1>
    </section>
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
  color: #2f1a35 !important;
}
.uk-card,
.uk-card-title {
  color: #2f1a35 !important;
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