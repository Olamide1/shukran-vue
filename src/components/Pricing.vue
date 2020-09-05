<template>
  <div class="ten-percent">
    <nav class="uk-container uk-navbar uk-margin">
    <div class="uk-navbar-left">
     <router-link class="uk-navbar-item logo" to="/">Shukran</router-link>
    </div>
    </nav>

   <div align="center" class="uk-margin-medium-bottom">
      <h1 class="uk-heading">Pricing</h1>
      <div class="uk-card fit uk-box-shadow-large uk-padding login-card" >
    <h3 class="uk-card-title uk-margin-remove-bottom">
      <p class="percent uk-margin-remove-bottom">10%</p> 
      Flat fee for all payouts.</h3>
    <div class="pricing-body">
        <div>
          <p>Signing up on Shukran is completely free! We only receive a small percentage of 10% flat fee once you start earning on Shukran.</p>
          This fee covers;
          <ul>
            <li>
              Transaction fees for processing which covers the cost of all the things we do to ensure that tips gotten from supporters are processed through an efficient payment gateway.
            </li>
            <li>Full access to all features on Shukran.</li>
          </ul>
        </div>
    <router-link to="/accounts">
    <button class="uk-button">Continue</button>
    </router-link>
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

<!-- Add "scoped" attribute to limit CSS to this component only #f8f8f8-->
<style scoped>
@media (min-width: 1200px) {
  .pricing-body {
    padding: 40px 40px 0 40px;
  }
}

.pricing-body {
    padding: 30px 30px 0 30px;
}
.percent {
  font-size: xxx-large;
    font-weight: 900;
}
.uk-button {
      border-radius: 3px;
    color: white;
    background: #d44d62;
}
.ten-percent {
  background-image: linear-gradient(135deg, #d44d62 0%, #ff746c 100%);

  position: fixed;
  bottom: 0;
  right: 0;
  top: 0;
  left: 0;
  overflow: auto;
}
h1 {
  font-weight: 900;
}
.logo {
  color: #ffffff;
  font-size: 1.5rem;
}
.uk-grid {
  flex-wrap: initial;
  justify-content: center;
}

.fit {
  width: 400px;
  border-radius: 5px;

  background: #383030;
  color: #fff;
}
h3, h1 {
  color: #fff;
}
@media screen and (max-device-width: 1000px) {
  .uk-grid {
    flex-wrap: wrap;
  }
}
</style>