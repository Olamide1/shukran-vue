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

            <h1 class="uk-article-title">How Shukran works for you</h1>

            <p class="uk-article-meta">Written by <a href="https://useshukran.com/cr/chuks">Chuks</a> on 01 August 2020.</p>

            <p class="uk-text-lead">Shukran provides you with means to get the support you need.</p>

            <img data-loading="/static/img/placeholder-image.png" data-src="/static/img/login & signup shukran.jpg" width="630px" height="486px" alt="how to login and signup on shukran" uk-img>

            <p>
              <ul>
                <li>
                  As a creator in any space, when you open an account on Shukran, <b>we provide you with a unique tipping link.</b>
                </li>
                <li>
                  Your unique tipping link looks somewhat like this <a href="https://useshukran.com/cr/chuks" target="_blank" rel="noopener noreferrer">https://useshukran.com/cr/chuks</a>.
                </li>
                <li>
                  /cr/ for <b>cr</b>eator by the way 😉
                </li>
              </ul>
            </p>

            <p class="uk-text-lead">How to see your link.</p>

            <img data-loading="/static/img/placeholder-image.png" data-src="/static/img/your tipping link on shukran.jfif" width="430px" height="286px" alt="how to login and signup on shukran" uk-img>

            <p>
              <ul>
                <li>
                  Click "Get tipped" from the navigation bar, and a pop up shows with your tipping link.
                </li>
                <li>
                  Please copy it if you need to and <b>PLUG YOUR LINK SHAMELESSLY</b> along with your content when you post them.
                </li>
              </ul>
                </p>

            <p class="uk-text-lead">What does your link show? What will your supporters see when they open the link? <br> What message does it tell your supporters?</p>

            <img data-loading="/static/img/placeholder-image.png" data-src="/static/img/your craft shukran.jpg" width="630px" height="486px" alt="How to edit your craft and profile on shukran" uk-img>

            <p>
              <ul>
                <li>
                  Your tipping link shows them what you do i.e your craft. So make your supporters know you and give you better
                </li>
                <li>
                  Your primary content link leads them to main source of your content.
                </li>
                <li>
                  So sell yourself (to your supporters, and just about everyone).
                </li>
                <li>
                  We implore you to open your link yourself and see what shows...
                </li>
                <li>
                  Are you okay with that? Is that what you want everyone else to see?
                </li>
                <li>
                  So <router-link to="/accounts">edit your profile</router-link> as often as needed. To fill these details on your dashboard, see the reference graphic above
                </li>
              </ul>
            </p>


            <p class="uk-text-lead">What does your link do for you?</p>

            <p>
              <ul>
                <li>
                  We love to think it shows you're a professional.
                </li>
                <li>
                  On your part it shows you're committed to deliver.
                </li>
                <li>
                   Watch this <a href="https://www.youtube.com/watch?v=xMj_P_6H69g" target="_blank" rel="noopener noreferrer">YouTube video</a> for what we mean, and what you should understand about your craft.
                </li>
              </ul>
            </p>

            <p class="uk-text-lead">Okay, so I've been getting tipped, what next?</p>

            <p>
              <ul>
                <li>
                  When you're logged in, on your dashboard, you can see all the tips you've recieved so far.
                </li>
                <li>
                  A chart shows you when you were tipped what.
                </li>
                <li>
                  On your dashboard, you <b>can also place a withdrawal request if</b> your tips have exceeded $2.78 / ₦1000 / Ksh299 <!-- used the central banks' conversion rates -->
                </li>
              </ul>
            </p>

            <p class="uk-text-lead">We shouldn't have to say this but...</p>

            <img data-loading="/static/img/placeholder-image.png" data-src="/static/img/your bank info shukran.jpg" width="630px" height="486px" alt="how to edit your bank information on shukran" uk-img>

            <p>
              <ul>
                <li>
                  It's really important that you fill out your bank information correctly and completely.
                </li>
                <li>
                  Aside from the <i>Know Your Customer</i> goals it helps us meet at Shukran,
                </li>
                <li>
                  How are we gonna pay you your mooonnnnneeeeyyyyyyy?!
                </li>
                <li>
                  Cruise through our dashboard to see all that Shukran offers.
                </li>
                <li>
                  Please <a href="mailto:support@shukran.com">email us</a> if you have any questions at all or wanna give us feedback.
                </li>
                <li>
                  We love to hear from you.
                </li>
              </ul>
            </p>


            <div class="uk-child-width-auto" uk-grid>
                <div class="middle uk-padding-remove-left">
                    <a class="uk-button uk-button-text" href="/">Shukran!</a>
                </div>
            </div>

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
.middle {
  margin: 0 auto;
}
.middle > a {
  color: red;
}
.top-nav {
  margin: 30px;
  border-radius: 5px;
  background: #edf4f0 !important;
  color: #111011 !important;
}
@media (max-width: 960px) {
  .top-nav {
    margin: 30px 15px 30px 15px;
  }
}
.uk-article-title {
  font-size: 1.625rem;
}

</style>