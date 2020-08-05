<template>
  <div class="terms">
    <nav class="uk-navbar-container top-nav" uk-navbar>
      <div class="uk-navbar-left">
        <ul class="uk-navbar-nav">
          <li class="uk-active">
            <router-link to="/">Home</router-link>
          </li>
          <li>
            <router-link to="/accounts">Login/Signup</router-link>
          </li>
        </ul>
      </div>
    </nav>

    <div class="uk-container">

      <div class="blog-post">
        <article class="uk-article uk-margin-large-bottom">

            <h1 class="uk-article-title"><a class="uk-link-reset" href="">How Shukran works for you</a></h1>

            <p class="uk-article-meta">Written by <a href="#">Nwachukwu</a> on 01 August 2020.</p>

            <p class="uk-text-lead">Shurkran provides you with means to get the support you need.</p>

            <p>As a creative, in any space, when you open an account on Shukran we provide you with a tipping link. Much like your twitter handle link, <a href="https://twitter.com/wachuks" target="_blank">https://twitter.com/wachuks</a>. So with Shukran, it's <a href="https://useshukran.com/cr/chuks" target="_blank" rel="noopener noreferrer">https://useshukran.com/cr/chuks</a>. /cr/ for <b>cr</b>eative by the way 😉</p>

            <p class="uk-text-lead">How to see your link.</p>

            <p>Click "Get tipped" from the navigation bar, and a pop shows with your tipping link. Please copy it if you need to and plug it shamelessly along with your content when you post them.</p>

            <p class="uk-text-lead">What does your link show? What will your supporters see when they open it? What message does it tell your supporters?</p>

            <p>It tells your supporter what you do and why you need their tip. So sell yourself (to your supporters, and just about everyone). We implore you to open your link yourself and see what shows... Are you okay with that? Is that what you want everyone else to see?</p>

            <p>Your tipping link is how you can let your supporters know and give you better. Edit your profile</p>

            <p class="uk-text-lead">What does your link do for you?</p>

            <p>We love to think it shows you're a professional. On your part it shows you're committed to deliver. Watch this <a href="https://www.youtube.com/watch?v=xMj_P_6H69g" target="_blank" rel="noopener noreferrer">YouTube video</a> for what we mean, and what you should understand about your craft.</p>

            <p class="uk-text-lead">Okay, so I've been getting tipped, what next?</p>

            <p>When you're logged in, on your dashboard, you can see all the tips you've recieved so far. A chart shows you when you were tipped what.</p>

            <p>On your dashboard, you can also place a redrawal request if your tips have exceeded $2.62 (₦1000) or (Ksh282.20)</p>
            <!-- <div class="uk-grid-small uk-child-width-auto" uk-grid>
                <div>
                    <a class="uk-button uk-button-text" href="#">Read more</a>
                </div>
                <div>
                    <a class="uk-button uk-button-text" href="#">5 Comments</a>
                </div>
            </div> -->

        </article>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "HowItWorks",
};
</script>

<style scoped>
.top-nav {
  margin: 30px;
  border-radius: 5px;
  background: #edf4f0 !important;
  color: #111011 !important;
}

.uk-article-title {
  font-size: 1.625rem;
}

.uk-card.uk-card-default.uk-card-body {
  border-radius: 5px;
}

.logo {
  color: #ffffff;
  font-size: 1.5rem;
}

.uk-heading {
  text-align: center;
  color: #ffffff;
  font-weight: 900;
}
</style>