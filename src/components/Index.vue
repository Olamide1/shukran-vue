<template>
  <div>
    <!-- Hero -->
    <div class="header">
      <div class="container">
        <div class="row is-aligned-middle is-gapless is-bottomless">
          <div class="col is-8-tablet has-text-primary">
            <a href="/">
              <h2 class>Shukran</h2>
            </a>
          </div>

          <div class="col is-8 hide-on-mobile">
            <ul class="nav has-text-right">
              <li>
                <a href="#creators">Creators</a>
              </li>
              <li>
                <a href="#services">Services</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
              <li>
                <a><router-link to="/pricing">Pricing</router-link></a>
              </li>
              <li>
                <a><router-link to="/accounts">Login/Signup</router-link></a>
              </li>
            </ul>
          </div>
          <div class="col is-4-tablet hide-on-desktop">
            <div class="hamburger2">
              <div @click="swapClass()" class="hamburger hamburger-htx" id="menu-toggle">
                <span></span>
              </div>

              <div uk-drop="mode: click">
                <div class="nav-mobile">
                  <li class="nav-close">
                    <a href="#creators">Creators</a>
                  </li>
                  <li class="nav-close">
                    <a href="#services">Services</a>
                  </li>
                  <li>
                    <a href="#contact">Contact</a>
                  </li>
                  <li>
                    <a><router-link to="/pricing">Pricing</router-link></a>
                  </li>
                  <li>
                    <a><router-link to="/accounts">Login/Signup</router-link></a>
                  </li>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      
    </div>

    <section class="hero">
      <div class="container">
        <div class="row is-centered">
          <div class="col is-8">
            <h1>Get the support you need from the audience you have.</h1>
            <p
              class="subtitle"
            >Shukran enables content creators get financial support from those who enjoy their work.</p>
            <a><router-link class="btn" to="/accounts">Try it</router-link></a>
          </div>
        </div>
      </div>
    </section>

    <!-- our slider -->

    <div class="uk-position-relative uk-visible-toggle uk-light" uk-slider>
      <div class="uk-slider-items uk-grid">
        <div class="uk-width-4-5" v-for="(creator, index) in top_creators" :key="index">
          <div class="is-split-30-70 is-section-mobile" id="creators">
            <div class="container">
              <div class="row is-aligned-middle is-gap-large">
                <div class="col is-6">
                  <div class="is-section is-not-section-mobile is-split-50-50">
                    <div class="name-container has-text-white">
                      <div class="image-caption">
                        <p>
                          <b>Joined</b>
                          {{ new Date(creator.create_date).toLocaleDateString() }}
                        </p>
                      </div>
                      
                      <!-- <img
                          :src="`https://drive.google.com/uc?export=view&id=${creator.picture_id}`" 
                          :alt="`Image of ${creator.username}`"
                        /> 
                        
                        <div
            id="image-background"
            class="uk-height-small uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light"
            v-bind:style="{ 'background-image': `url(https://drive.google.com/uc?export=view&id=${creator.picture_id})` }"
            uk-img="target: #offcanvas-usage"
            style="height: 414px; width: 414px; margin-left: auto;"
          >
          </div>
          -->
                        
                        <router-link
            id="image-background"
            class="uk-height-small uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light"
            v-lazy:background-image="{src: `https://drive.google.com/uc?export=view&id=${creator.picture_id}`, loading: '../assets/loading.gif' }"
            
            uk-img="target: #offcanvas-usage"
            style="height: 414px; width: 414px; margin-left: auto;"
          :to="'/cr/' + creator.username" tag="div">
                        </router-link>
                    </div>
                  </div>
                </div>
                <div class="col is-6">
                  <p class="has-text-white caps" uk-slider-parallax="x: 100,-100">{{creator.craft_type}}</p>
                  
                  <router-link :to="'/cr/' + creator.username" tag="h2" uk-slider-parallax="x: 200,-200">{{creator.username}}</router-link>
                  
                  <router-link :to="'/cr/' + creator.username" tag="p" uk-slider-parallax="x: 300,-300">{{creator.summary}}</router-link>
                  <a class="link is-underlined caps" href="#modal-sections" uk-toggle>Find others</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a
        class="uk-position-center-left uk-position-small uk-hidden-hover"
        href="#"
        uk-slidenav-previous
        uk-slider-item="previous"
      ></a>
      
      <a
        class="uk-position-center-right uk-position-small uk-hidden-hover"
        href="#"
        uk-slidenav-next
        uk-slider-item="next"
      ></a>
    </div>

    <!-- search modal -->
<div class="" id="modal-sections" uk-modal>
    <div class="uk-card-body uk-modal-dialog" uk-overflow-auto style="border-radius: 5px; margin-top: 15px; margin: 0 auto; max-height: 80%; padding: 30px; margin-top: 20px;">
        <button class="uk-modal-close-default" type="button" uk-close></button>
        <div class="uk-modal-header">
            <h4 class="uk-modal-title">Search for a creator</h4>
            <input type="text" v-model="search" placeholder="Search for your favourite creator" class="uk-input search-box">
        </div>
            <div class="uk-modal-body" v-if="search == ''">
            <div v-for="(creator, index) in creators" :key="index">
                <router-link style="font-size: x-large;" :to="'/cr/' + creator.username" class="uk-modal-close">{{creator.username}}</router-link>
                <p>{{creator.summary}}</p>
                <router-link :to="'/cr/' + creator.username" class="uk-button">
                  <button @click="close()" style="border-radius: 3px;background-color: #c63968; color: #fceedd; padding: 0 20px 0 20px;" class="uk-button uk-button-default">Tip {{creator.username}}</button>
                </router-link>
                <hr class="uk-divider-icon">
            </div>
            </div>
            <div class="uk-modal-body" v-else>
                    <div>
                        <div v-for="result in filteresults" :key="result.id">
                            <router-link :to="'/cr/' + result.username" class="uk-modal-close">{{result.username}}</router-link>
                            <p>{{result.summary}}</p>
                            <router-link :to="'/cr/' + result.username" class="uk-button uk-modal-close"  style="color: #c63968;">Tip</router-link>
                <hr class="uk-divider-icon">
                        </div>
                    </div>
            </div>
        
    </div>
</div>
    <!-- //search modal -->

    <!-- Services -->
    <div class="row is-split" id="services">
      <div class="col">
        <div class="split-container is-left">
          <div class="card is-section">
            <p class="caps has-text-primary">For Content Creators</p>
            <h2>Take on that next project.</h2>
            <p
              class="subtitle"
            >With support from your audience, you'll be able to move ahead in your space and keep churning our content.</p>
          </div>
        </div>
      </div>
      <div class="col is-primary has-text-white">
        <div class="split-container is-right">
          <div class="card is-section">
            <div class="flag flag-top">
              <div class="flag-fixed">
                <img
                  src="../assets/index/strategy.png"
                  class="is-left"
                  width="48"
                  alt="Clickpivot Strategy"
                />
              </div>
              <div class="flag-full">
                <h4 class="margin-bottom-small">Content Creators</h4>
                <p>Get support from your audience regardless of size or algorithm.</p>
              </div>
            </div>
            <div class="flag flag-top">
              <div class="flag-fixed">
                <img
                  src="../assets/index/branding.png"
                  class="is-left"
                  width="48"
                  alt="Clickpivot Branding"
                />
              </div>
              <div class="flag-full">
                <h4 class="margin-bottom-small">Content Consumers</h4>
                <p>Shukran means "Thank You." Say thank you to your favourite content creators by tipping them as little as you can (say ₦100) or as much as you want (think ₦100,000).</p>
              </div>
            </div>
            <div class="flag flag-top">
              <div class="flag-fixed">
                <img
                  src="../assets/index/web-design.png"
                  class="is-left"
                  width="48"
                  alt="Clickpivot Web Design"
                />
              </div>
              <div class="flag-full">
                <h4 class="margin-bottom-small">While at it</h4>
                <p>You can drop a message for your content creators. Tell them how they have impacted you or made you feel. Trust us, that goes a long way too.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Portfolio -->
    <div class="row is-split" id="portfolio">
      <div class="col is-ivory">
        <div class="split-container is-left">
          <div class="card is-section">
            <p class="caps has-text-white">Why</p>
            <h2>We see creators as partners and genuinely care about their work. Hence Shukran.</h2>
            <!-- <a class="subtitle link is-underlined is-arrow preview">View Recent work</a> --><!-- lAT3r -->
          </div>
        </div>
      </div>
      <div class="col has-background-over-shoulder">
        <div class="split-container is-right">
          <div class="card is-section is-image"></div>
        </div>
      </div>
    </div>

    <!-- <div class="preview-open">
      <img src="../assets/index/clickpivot-portfolio.gif" alt="Clickpivot Portfolio" />
      <div class="close hide-on-desktop">
        <img src="../assets/index/close.svg" alt="Close" />
      </div>
    </div> -->

    <section id="contact" class="is-primary has-text-white">
      <div class="container">
        <div class="row is-centered">
          <div class="col is-8">
            <p class="has-text-primary">Join us</p>
            <h2>Let's create something great together.</h2>
            <router-link class="btn is-white-primary" to="/accounts">Use Shukran</router-link>
          </div>
        </div>
      </div>
    </section>

    <section class="is-small has-text-centered">
      <div class="container">
        <div class="social">
          <a href="https://instagram.com/useshukran">
            <li class="instagram"></li>
          </a>
          <a href="https://twitter.com/useshukran">
            <li class="twitter"></li>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Index",
  data() {
    return {
        creators: [],
      top_creators: [ {
    craft_type: "Comedian",
create_date: "2020-07-05T09:13:28.496Z",
picture_id: "1wj0BCAi5hGN9USx6NKrMUgZ1lSuvhlX0",
summary: "Thanks for always supporting the brand and having my back. Drop your name and I will reach out to you. Bless",
username: "josh2funny"
}, {
    craft_type: "Lifestyle Blogger",
create_date: "2020-06-06T17:22:10.319Z",
picture_id: "19uuDwXVl0QYjaDzMDbrehTAwhNHYTMQK",
summary: "Thank you so much for stopping by. Please support my ministry 😀",
username: "nessytalks"
}, {
    craft_type: "Podcaster, Content Curator, Writer. We move the culture 😉",
create_date: "2020-05-25T17:21:53.109Z",
picture_id: "1Zx7j-rypTpILcOG1N75JmSLkgJteDZbB",
summary: "Heyyyy! I’m glad you dropped by. Your support will defo help my creative process be more seamless and consistent. Really appreciate you. Don’t forget to drop your name so I’d reach out personally to say “Shukran!”",
username: "obakam"
}, {
    craft_type: "Podcaster, Blogger, Poet, Photographer",
create_date: "2020-05-30T15:43:35.175Z",
picture_id: "1nGcLmFFY1XQMd5Ng9RhYl-aE2DQ5cQ9m",
summary: "You will always find a piece of yourself in these works, I hope you love them.",
username: "supreme"
}, {
    craft_type: "DIYs, Spoken Words and Short films",
create_date: "2020-06-13T17:28:03.090Z",
picture_id: "1xN-lRpk1ajNkx6mymMD11R88o8s5xTO4",
summary: "I'm passionate about creating art and reaching out. Some encouragement will really help me in creating more as I grow in my craft. ♥️♥️",
username: "phavie o.o"
}, {
    craft_type: "Bohemian visual content creator",
create_date: "2020-06-13T16:29:09.349Z",
picture_id: "1HlW4ri5rk8bh_uYAzgtHL0dxVzVG_s4o",
summary: "Thank you for appealing to my definition of aesthetics, your consistent interaction with the content i put out fuels my creativity. Please help foster my artistry by tipping me :) .",
username: "chistorm"
}, {
    craft_type: "Beauty and Lifestyle",
create_date: "2020-06-17T14:21:41.786Z",
picture_id: "18pr7b0DNE9u_9vaMPUwdeWJoIo43mXQO",
summary: "Be your own kind of beautiful....be-you-ti-full",
username: "sindyakpolo"
}, {
    craft_type: "Visual Artist (Photographer)",
create_date: "2020-05-30T15:43:49.191Z",
    picture_id: "1gvtNcm6VXHAQeKV17CayUwOmrmrSm7u0",
summary: "You made it here! Thank you for the love and support, your tip would go a long in ensuring I keep doing what I love.",
username: "sonayon thomas"
}, {
    craft_type: "Lifestyle/Fashion Blogger",
create_date: "2020-06-18T12:05:24.501Z",
picture_id: "1Szav7YluoD3SwmYoDfoZdWJ8jwRpcMXr",
summary: "Hey Lovelies, content creators put in so much work! But we are so underrated 😔 if you love what I do, then you should totally tip me💜",
username: "blairsyn"
}, {
    craft_type: "Creative Director, Video Editor, Food Explorer, Photo Editor, Apps Guru and Social Media Savvy",
create_date: "2020-06-19T05:16:21.641Z",
picture_id: "1AsUj1bfvXosbepKC4Qy87xfDGlWVgqed",
summary: "Thank You, I appreciate you. You are the best vibe squad. Your Tip means you enjoy my content.❤️",
username: "chitothelagoshustler"
}],
      search: '',
    results: []
    };
  },
  methods: {
    swapClass() {
      document.getElementById("menu-toggle").classList.toggle("is-active");
    },
    getCreators() {
      axios
        .get("https://shukran-api.herokuapp.com/api/allusers/")
        .then(res => {
          this.creators = res.data; // loaded creators
        })
        .catch(err => {
          console.log(err);
          console.log("error");
        });
    },
        close(){
            UIkit.modal('#modal-sections').hide()
        }
  },
  mounted() {
    this.getCreators(); // later...
  },
    computed: {
        filteresults: function (params) {
        let filtered = this.creators;
      if (this.search) {
        filtered = this.creators.filter(
          m => m.username.toLowerCase().indexOf(this.search.toLowerCase()) > -1
        );
      }
      return filtered;
        }
    }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=DM+Sans:400,500,700&display=swap");
/* Type
-------------------------------------------------- */
*,
:before,
:after {
  margin: 0;
  padding: 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

html {
  box-sizing: border-box;
  font-size: 18px;
  font-family: "DM Sans", sans-serif;
  text-rendering: geometricPrecision;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

@media (max-width: 980px) {
  html {
    font-size: 16px;
  }
}

body {
  line-height: 1.5;
  color: #000;
}

.search-box {
  padding: 5px;
  border-radius: 3px;
}

.uk-modal-dialog {
  margin-top: 30px !important;
}

#creators { /**put a limit on the number of words about creators? or we ellipsis after a while */
  height: 100%;
}

p,
ol,
ul {
  color: #000;
  font-weight: 400;
}

h1,
h2,
h3,
h4 {
  font-family: "DM Sans", sans-serif;
  font-weight: 700;
  color: #000;
  line-height: 1.2;
  margin: 0;
}

h1 {
  font-size: 3.25rem;
}

h2 {
  font-size: 2.5rem;
}

h3 {
  font-size: 2rem;
}

h4,
.subtitle {
  font-size: 1.25rem;
}

.max {
  max-width: 65%;
  margin: 0 auto;
  padding-top: 40px;
  padding-bottom: 40px;
}

@media (max-width: 834px) {
  h1 {
    font-size: 1.75rem;
  }
  h2 {
    font-size: 1.75rem;
  }
  h3 {
    font-size: 1.5rem;
  }
  h4,
  .subtitle {
    font-size: 1.25rem;
  }
  .max {
    max-width: 100%;
  }
}

a {
  cursor: pointer !important;
}

a.link,
.link a {
  cursor: pointer;
  color: #fbfbfb;
  text-decoration: none;
}

a.link:hover,
.link a:hover {
  text-decoration: underline;
}

a.link.is-underlined {
  border-bottom-color: #000000;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  text-decoration: none;
}

.caps {
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 500;
}

.h1.has-text-primary,
.h2.has-text-primary,
.h3.has-text-primary,
.h4.has-text-primary,
.h5.has-text-primary,
.h6.has-text-primary,
.has-text-primary h1,
.has-text-primary h2,
.has-text-primary h3,
.has-text-primary h4,
.has-text-primary h5,
.has-text-primary h6,
a.has-text-primary,
p.has-text-primary,
ol.has-text-primary,
ul.has-text-primary,
li.has-text-primary,
.has-text-primary a,
.has-text-primary p,
.has-text-primary ol,
.has-text-primary ul,
.has-text-primary li {
  color: #e43f36 !important;
}

.h1.has-text-secondary,
.h2.has-text-secondary,
.h3.has-text-secondary,
.h4.has-text-secondary,
.h5.has-text-secondary,
.h6.has-text-secondary,
.has-text-secondary h1,
.has-text-secondary h2,
.has-text-secondary h3,
.has-text-secondary h4,
.has-text-secondary h5,
.has-text-secondary h6,
a.has-text-secondary,
p.has-text-secondary,
ol.has-text-secondary,
ul.has-text-secondary,
li.has-text-secondary,
.has-text-secondary a,
.has-text-secondary p,
.has-text-secondary ol,
.has-text-secondary ul,
.has-text-secondary li {
  color: #e43f36 !important;
}

.h1.has-text-black,
.h2.has-text-black,
.h3.has-text-black,
.h4.has-text-black,
.h5.has-text-black,
.h6.has-text-black,
.has-text-black h1,
.has-text-black h2,
.has-text-black h3,
.has-text-black h4,
.has-text-black h5,
.has-text-black h6,
a.has-text-black,
p.has-text-black,
ol.has-text-black,
ul.has-text-black,
li.has-text-black,
.has-text-black a,
.has-text-black p,
.has-text-black ol,
.has-text-black ul,
.has-text-black li {
  color: #000 !important;
}

.h1.has-text-grey,
.h2.has-text-grey,
.h3.has-text-grey,
.h4.has-text-grey,
.h5.has-text-grey,
.h6.has-text-grey,
.has-text-grey h1,
.has-text-grey h2,
.has-text-grey h3,
.has-text-grey h4,
.has-text-grey h5,
.has-text-grey h6,
a.has-text-grey,
p.has-text-grey,
ol.has-text-grey,
ul.has-text-grey,
li.has-text-grey,
.has-text-grey a,
.has-text-grey p,
.has-text-grey ol,
.has-text-grey ul,
.has-text-grey li {
  color: #f6f6f6 !important;
}

.h1.has-text-white,
.h2.has-text-white,
.h3.has-text-white,
.h4.has-text-white,
.h5.has-text-white,
.h6.has-text-white,
.has-text-white h1,
.has-text-white h2,
.has-text-white h3,
.has-text-white h4,
.has-text-white h5,
.has-text-white h6,
a.has-text-white,
p.has-text-white,
ol.has-text-white,
ul.has-text-white,
li.has-text-white,
.has-text-white a,
.has-text-white p,
.has-text-white ol,
.has-text-white ul,
.has-text-white li {
  color: #fff !important;
}

.h1.has-text-dark,
.h2.has-text-dark,
.h3.has-text-dark,
.h4.has-text-dark,
.h5.has-text-dark,
.h6.has-text-dark,
.has-text-dark h1,
.has-text-dark h2,
.has-text-dark h3,
.has-text-dark h4,
.has-text-dark h5,
.has-text-dark h6,
a.has-text-dark,
p.has-text-dark,
ol.has-text-dark,
ul.has-text-dark,
li.has-text-dark,
.has-text-dark a,
.has-text-dark p,
.has-text-dark ol,
.has-text-dark ul,
.has-text-dark li {
  color: #111 !important;
}

.h1.has-text-medium,
.h2.has-text-medium,
.h3.has-text-medium,
.h4.has-text-medium,
.h5.has-text-medium,
.h6.has-text-medium,
.has-text-medium h1,
.has-text-medium h2,
.has-text-medium h3,
.has-text-medium h4,
.has-text-medium h5,
.has-text-medium h6,
a.has-text-medium,
p.has-text-medium,
ol.has-text-medium,
ul.has-text-medium,
li.has-text-medium,
.has-text-medium a,
.has-text-medium p,
.has-text-medium ol,
.has-text-medium ul,
.has-text-medium li {
  color: #757575 !important;
}

.h1.has-text-light,
.h2.has-text-light,
.h3.has-text-light,
.h4.has-text-light,
.h5.has-text-light,
.h6.has-text-light,
.has-text-light h1,
.has-text-light h2,
.has-text-light h3,
.has-text-light h4,
.has-text-light h5,
.has-text-light h6,
a.has-text-light,
p.has-text-light,
ol.has-text-light,
ul.has-text-light,
li.has-text-light,
.has-text-light a,
.has-text-light p,
.has-text-light ol,
.has-text-light ul,
.has-text-light li {
  color: #dddddd !important;
}

.h1.has-text-ivory,
.h2.has-text-ivory,
.h3.has-text-ivory,
.h4.has-text-ivory,
.h5.has-text-ivory,
.h6.has-text-ivory,
.has-text-ivory h1,
.has-text-ivory h2,
.has-text-ivory h3,
.has-text-ivory h4,
.has-text-ivory h5,
.has-text-ivory h6,
a.has-text-ivory,
p.has-text-ivory,
ol.has-text-ivory,
ul.has-text-ivory,
li.has-text-ivory,
.has-text-ivory a,
.has-text-ivory p,
.has-text-ivory ol,
.has-text-ivory ul,
.has-text-ivory li {
  color: #e6393c !important;
}

.h1.has-text-transparent,
.h2.has-text-transparent,
.h3.has-text-transparent,
.h4.has-text-transparent,
.h5.has-text-transparent,
.h6.has-text-transparent,
.has-text-transparent h1,
.has-text-transparent h2,
.has-text-transparent h3,
.has-text-transparent h4,
.has-text-transparent h5,
.has-text-transparent h6,
a.has-text-transparent,
p.has-text-transparent,
ol.has-text-transparent,
ul.has-text-transparent,
li.has-text-transparent,
.has-text-transparent a,
.has-text-transparent p,
.has-text-transparent ol,
.has-text-transparent ul,
.has-text-transparent li {
  color: transparent !important;
}

.has-text-centered {
  text-align: center !important;
}

.has-text-justified {
  text-align: justify !important;
}

.has-text-left {
  text-align: left !important;
}

.has-text-right {
  text-align: right !important;
}

hr {
  border: none;
  background-color: #dddddd;
  width: 100%;
  height: 1px;
  position: relative;
}

hr.is-centered {
  background-color: transparent;
}

hr.is-spaced {
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}

hr.is-centered:after {
  background-color: #dddddd;
  content: "";
  position: absolute;
  left: 40px;
  right: 40px;
  max-width: 1000px;
  height: 1px;
  margin: 0 auto;
}

/* Grid
-------------------------------------------------- */
.row {
  display: flex;
  flex-flow: row wrap;
  margin-left: -40px;
}

.row:last-child {
  margin-bottom: -40px;
}

.col {
  box-sizing: border-box;
  flex: 1 1 0%;
  padding-left: 40px;
  padding-bottom: 40px;
  position: relative;
}

.row.is-gap-large {
  margin-left: -80px;
}

.row.is-gap-large .col {
  padding-left: 80px;
}

@media (max-width: 980px) {
  .row.is-gap-large {
    margin-left: -40px;
  }
  .row.is-gap-large .col {
    padding-left: 40px;
  }
}

.row.is-gap-medium {
  margin-left: -40px;
}

.row.is-gap-medium .col {
  padding-left: 40px;
}

.row.is-gapless {
  margin-left: 0;
}

.row.is-gapless .col {
  padding-left: 0;
}

.row.is-bottomless {
  margin-bottom: 0;
}

.row.is-bottomless .col {
  padding-bottom: 0;
  align-self: baseline; /**aligns hamberger to Shukran logo */
}

.row.is-centered {
  justify-content: center;
}

.row.is-reversed {
  flex-direction: row-reverse;
}

.row.is-aligned-top {
  align-items: flex-start;
}

.row.is-aligned-middle {
  align-items: center;
}

.row.is-aligned-bottom {
  align-items: flex-end;
}

.row.is-spaced-between {
  justify-content: space-between;
}

.row.is-spaced-around {
  justify-content: space-around;
}

.is-equal-height .col {
  display: flex;
}

.row.is-right {
  justify-content: flex-end;
  align-self: flex-end;
}

.col.is-narrow {
  flex: none;
}

.row.is-multiline {
  flex-wrap: wrap;
}

.col.is-12 {
  flex-basis: 100%;
  max-width: 100%;
}

.col.is-11 {
  flex-basis: 91.66667%;
  max-width: 91.66667%;
}

.col.is-10 {
  flex-basis: 83.33333%;
  max-width: 83.33333%;
}

.col.is-9 {
  flex-basis: 75%;
  max-width: 75%;
}

.col.is-8 {
  flex-basis: 66.66667%;
  max-width: 66.66667%;
}

.col.is-7 {
  flex-basis: 58.33333%;
  max-width: 58.33333%;
}

.col.is-6 {
  flex-basis: 50%;
  max-width: 50%;
}

.col.is-5 {
  flex-basis: 41.66667%;
  max-width: 41.66667%;
}

.col.is-4 {
  flex-basis: 33.33333%;
  max-width: 33.33333%;
}

.col.is-3 {
  flex-basis: 25%;
  max-width: 25%;
}

.col.is-2 {
  flex-basis: 16.66667%;
  max-width: 16.66667%;
}

.col.is-1 {
  flex-basis: 8.33333%;
  max-width: 8.33333%;
}

.is-pulled-12,
.row.is-reversed .is-pushed-12 {
  margin-left: -100%;
}

.is-pulled-11,
.row.is-reversed .is-pushed-11 {
  margin-left: -91.66667%;
}

.is-pulled-10,
.row.is-reversed .is-pushed-10 {
  margin-left: -83.33333%;
}

.is-pulled-9,
.row.is-reversed .is-pushed-9 {
  margin-left: -75%;
}

.is-pulled-8,
.row.is-reversed .is-pushed-8 {
  margin-left: -66.66667%;
}

.is-pulled-7,
.row.is-reversed .is-pushed-7 {
  margin-left: -58.33333%;
}

.is-pulled-6,
.row.is-reversed .is-pushed-6 {
  margin-left: -50%;
}

.is-pulled-5,
.row.is-reversed .is-pushed-5 {
  margin-left: -41.66667%;
}

.is-pulled-4,
.row.is-reversed .is-pushed-4 {
  margin-left: -33.33333%;
}

.is-pulled-3,
.row.is-reversed .is-pushed-3 {
  margin-left: -25%;
}

.is-pulled-2,
.row.is-reversed .is-pushed-2 {
  margin-left: -16.66667%;
}

.is-pulled-1,
.row.is-reversed .is-pushed-1 {
  margin-left: -8.33333%;
}

.is-pushed-12,
.row.is-reversed .is-pulled-12 {
  margin-right: -100%;
}

.is-pushed-11,
.row.is-reversed .is-pulled-11 {
  margin-right: -91.66667%;
}

.is-pushed-10,
.row.is-reversed .is-pulled-10 {
  margin-right: -83.33333%;
}

.is-pushed-9,
.row.is-reversed .is-pulled-9 {
  margin-right: -75%;
}

.is-pushed-8,
.row.is-reversed .is-pulled-8 {
  margin-right: -66.66667%;
}

.is-pushed-7,
.row.is-reversed .is-pulled-7 {
  margin-right: -58.33333%;
}

.is-pushed-6,
.row.is-reversed .is-pulled-6 {
  margin-right: -50%;
}

.is-pushed-5,
.row.is-reversed .is-pulled-5 {
  margin-right: -41.66667%;
}

.is-pushed-4,
.row.is-reversed .is-pulled-4 {
  margin-right: -33.33333%;
}

.is-pushed-3,
.row.is-reversed .is-pulled-3 {
  margin-right: -25%;
}

.is-pushed-2,
.row.is-reversed .is-pulled-2 {
  margin-right: -16.66667%;
}

.is-pushed-1,
.row.is-reversed .is-pulled-1 {
  margin-right: -8.33333%;
}

@media (max-width: 834px) {
  .col,
  .col[class*="is-"] {
    flex-basis: 100%;
    max-width: 100%;
  }
  .col.is-8-tablet {
    flex-basis: 66.66667%;
    max-width: 66.66667%;
  }
  .col.is-6-tablet {
    flex-basis: 50%;
    max-width: 50%;
  }
  .col.is-4-tablet {
    flex-basis: 33.33333%;
    max-width: 33.33333%;
  }
  .col.is-3-tablet {
    flex-basis: 25%;
    max-width: 25%;
  }
}

@media (max-width: 480px) {
  .col.is-8-mobile {
    flex-basis: 66.66667%;
    max-width: 66.66667%;
  }
  .col.is-6-mobile {
    flex-basis: 50%;
    max-width: 50%;
  }
  .col.is-4-mobile {
    flex-basis: 33.33333%;
    max-width: 33.33333%;
  }
  .col.is-3-mobile {
    flex-basis: 25%;
    max-width: 25%;
  }
}

/* Layout
-------------------------------------------------- */
section {
  width: 100%;
  position: relative;
  padding-top: 80px;
  padding-bottom: 80px;
}

section.is-large {
  padding-top: 120px;
  padding-bottom: 120px;
}

section.is-small {
  padding-top: 40px;
  padding-bottom: 40px;
}

section.is-topless {
  padding-top: 0;
}

section.is-bottomless {
  padding-bottom: 0;
}

@media (max-width: 834px) {
  section,
  section.is-large {
    padding-top: 40px;
    padding-bottom: 40px;
  }
  section.is-topless-tablet {
    padding-top: 0;
  }
  section.is-bottomless-tablet {
    padding-bottom: 0;
  }
}

section.hero {
  padding-top: 155px;
}

section.hero.is-large {
  padding-top: 235px;
}

@media (max-width: 834px) {
  section.hero.is-large {
    padding-top: 115px;
  }
}

.container {
  position: relative;
  max-width: 1080px;
  width: 100%;
  padding: 0 40px 0 40px;
  margin: 0 auto;
}

@media (max-width: 834px) {
  .container {
    padding: 0 20px 0 20px;
  }
}

/* Header
-------------------------------------------------- */
[data-aos] {
  pointer-events: none;
}
[data-aos].aos-animate {
  pointer-events: auto;
}

.header.fixed {
  position: fixed;
  z-index: 99999;
  max-height: 100%;
}

body.fixed {
  position: fixed;
}

.header {
  height: 120px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
}

.header {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

.logo {
  background-image: url("../assets/logo.png");
  background-repeat: no-repeat;
  height: 36px;
  background-size: contain;
}

.logo {
  -webkit-mask-image: url("../assets/logo.png");
  mask-image: url("../assets/logo.png");
  -webkit-mask-repeat: no-repeat;
  mask-size: contain;
  mask-repeat: no-repeat;
  height: 36px;
  width: auto;
  background-color: #111;
  background-image: none;
}

.logo.is-centered {
  mask-position: center center;
  -webkit-mask-position: center center;
}

.nav-left ul,
.nav-right ul {
  margin-left: 0;
  list-style: none;
  display: flex;
  justify-content: space-around;
  align-items: center;
  -webkit-transition: 0.2s ease-in;
  transition: 0.2s ease-in;
}

.nav {
  margin-bottom: 0;
}

.nav li {
  list-style: none;
  display: inline-block;
  -webkit-transition: 0.2s ease-in;
  transition: 0.2s ease-in;
}

.nav li + li {
  padding-left: 40px;
}

@media (max-width: 980px) {
  .nav li + li {
    padding-left: 20px;
  }
}

.nav li a,
.nav-left li a,
.nav-right li a {
  font-family: "DM Sans", sans-serif;
  font-weight: 400;
  color: #000;
  text-decoration: none;
}

.nav li a:hover,
.nav-left li a:hover,
.nav-right li a:hover {
  color: #757575;
  text-decoration: none;
}

.nav-mobile {
  position: absolute;
  top: 30px;
  left: 0;
  font-family: "DM Sans", sans-serif;
  font-size: 2rem;
  /* display: none; */
  width: 100%;
  z-index: 2;
  list-style: none;
  text-align: center;
  padding: 20px;
  background-color: #fff;
}

.nav-mobile::before {
  content: "";
  position: fixed;
  height: 100%;
  height: 100vh;
  top: 120px;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  background-color: #fff;
}

.nav-mobile a {
  text-decoration: none;
  color: #111;
}

.nav-mobile li {
  padding: 0.5rem 0;
}

.nav-mobile li:first-child {
  padding-top: 0;
}

.nav-mobile li:last-child {
  padding-bottom: 0;
}

.hamburger {
  display: none;
  cursor: pointer;
  float: right;
}

.hamburger div {
  width: 24px;
  height: 2px;
  background-color: #111;
  margin: 6px 0;
}

@media (max-width: 834px) {
  .logo {
    height: 30px;
  }
  .logo.center {
    float: left;
  }
  .hamburger2 {
    display: block;
  }
}

/* Card
-------------------------------------------------- */
.card {
  padding: 40px;
  border-radius: 6px;
  display: inline-block;
  width: 100%;
  z-index: 1;
}

.is-section {
  padding-top: 80px;
  padding-bottom: 80px;
}

.card.is-section {
  padding-top: 80px;
  padding-bottom: 80px;
  padding-left: 40px;
  padding-right: 40px;
}

.card.is-large {
  padding: 80px;
}

@media (max-width: 834px) {
  .card.is-section {
    padding-top: 40px;
    padding-bottom: 40px;
    padding-left: 20px;
    padding-right: 20px;
  }
  .card.is-large {
    padding: 40px;
  }
  .is-not-section-mobile {
    padding-top: 0;
    padding-bottom: 0;
  }
  .is-section-mobile {
    padding-top: 40px;
    padding-bottom: 40px;
  }
}

.row.is-split {
  margin-left: 0;
  margin-bottom: 0;
}

.row.is-split .col {
  display: flex;
  padding-left: 0;
  padding-bottom: 0;
}

.row.is-split.is-aligned-middle {
  align-items: inherit;
}

.row.is-split.is-aligned-middle .split-container {
  align-items: center;
}

.split-container {
  display: flex;
  width: 100%;
  max-width: 540px;
}

.split-container.is-left {
  margin-left: auto;
}

.split-container.is-right {
  margin-right: auto;
}

@media (max-width: 834px) {
  .split {
    padding: 40px 20px 40px 20px;
    min-height: 340px;
  }
  .split-container {
    max-width: 100%;
  }
  .split-container .card.is-image {
    padding: 0;
    min-height: 340px;
  }
  .split .is-left,
  .split .is-right {
    float: none;
    max-width: 100%;
    margin: 0 auto;
  }
}

.collage {
  position: absolute;
  top: 0;
  height: 100%;
  width: 50%;
  z-index: 0;
}

.collage.is-right {
  left: 50%;
}

.collage.is-left {
  right: 50%;
}

.split-container.is-full-width {
  max-width: 100%;
}

@media (max-width: 834px) {
  section.is-collage {
    padding: 0;
  }
  section.is-collage .col:first-child {
    padding-bottom: 0;
  }
  section.is-collage .card {
    padding-top: 40px;
    padding-bottom: 40px;
  }
  section.is-collage .container {
    max-width: 100%;
    padding: 0;
  }
}

.is-split-30-70 {
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    color-stop(65%, #e6393c),
    color-stop(35%, #e43f36)
  );
  background: linear-gradient(-90deg, #e6393c 65%, #e43f36 35%);
  background-repeat: no-repeat;
  overflow: hidden;
  position: relative;
}

.is-split-50-50 {
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    color-stop(45%, #e6393c),
    color-stop(40%, #e43f36)
  );
  background: linear-gradient(-90deg, #e6393c 45%, #e43f36 40%);
  background-repeat: no-repeat;
  overflow: hidden;
  position: relative;
}

@media (max-width: 834px) {
  .is-split-50-50 {
    background: none;
    padding-bottom: 0 !important;
  }
  .is-split-30-70 {
    background: linear-gradient(180deg, #e43f36 35%, #e6393c 10%);
    background-repeat: no-repeat;
  }
}

.name-container {
  position: relative;
}

.name-container p {
  position: absolute;
  top: 0;
  left: 0;
  margin-left: 30px;
  transform: rotate(90deg);
  transform-origin: 0 0;
  white-space: nowrap;
}

.name-container img {
  max-width: 90%;
  margin-left: 10%;
}

/*	----------------------------------------
	:: Hamburger Toggle Switch
	---------------------------------------- */
.hamburger {
  position: relative;
  display: inline-table;
  vertical-align: middle;
  margin: 0;
  padding: 0;
  width: 24px;
  height: 24px;
  cursor: pointer;
  z-index: 2;
}

.hamburger span {
  display: block;
  position: absolute;
  top: 50%;
  left: 0px;
  right: 0px;
  height: 2px;
  background-color: #111;
  margin-top: -1px;
}

.hamburger span::before,
.hamburger span::after {
  position: absolute;
  display: block;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #111;
  content: "";
}

.hamburger span::before {
  top: 8px;
}

.hamburger span::after {
  bottom: 8px;
}

button.hamburger-htx {
  background-color: #fff;
}

.hamburger-htx span {
  -webkit-transition: background 0s 0.2s;
  transition: background 0s 0.2s;
}

.hamburger-htx span::before,
.hamburger-htx span::after {
  -webkit-transition-duration: 0.2s, 0.2s;
  transition-duration: 0.2s, 0.2s;
  -webkit-transition-delay: 0.2s, 0s;
  transition-delay: 0.2s, 0s;
}

.hamburger-htx span::before {
  -webkit-transition-property: top, -webkit-transform;
  transition-property: top, transform;
}

.hamburger-htx span::after {
  -webkit-transition-property: bottom, -webkit-transform;
  transition-property: bottom, transform;
}

/* active state, i.e. menu open */
.hamburger-htx.is-active {
  background-color: none;
}

.hamburger-htx.is-active span {
  background: none;
}

.hamburger-htx.is-active span::before {
  top: 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

.hamburger-htx.is-active span::after {
  bottom: 0;
  -webkit-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

.hamburger-htx.is-active span::before,
.hamburger-htx.is-active span::after {
  -webkit-transition-delay: 0s, 0.2s;
  transition-delay: 0s, 0.2s;
}

.social {
  text-align: center;
  display: block;
}

.social li {
  width: 24px;
  height: 24px;
  background-size: contain;
  display: inline-block;
  margin: 1.5rem;
}

.social li.instagram {
  background-image: url("../assets/index/instagram.svg");
}

.social li.twitter {
  background-image: url("../assets/index/twitter.jpg");
}

/* Form
-------------------------------------------------- */
.btn {
  display: inline-flex;
  padding: 2rem;
  border-radius: 3px;
  -ms-transition: all 0.2s ease-in-out 0s;
  transition: all 0.2s ease-in-out 0s;
}

.btn,
button .shopify-buy__btn {
  align-items: center;
  justify-content: center;
  text-align: center;
  text-decoration: none;
  line-height: 1rem;
  font-weight: 500;
  background-color: #e43f36;
  padding: 1rem 2rem;
  border: 1px solid #e43f36;
  color: #fff !important;
  -webkit-transform: scale(1);
  transform: scale(1);
  -webkit-transition: -webkit-transform 0.25s cubic-bezier(0.25, 0.25, 0.5, 1.9);
  transition: -webkit-transform 0.25s cubic-bezier(0.25, 0.25, 0.5, 1.9);
  transition: transform 0.25s cubic-bezier(0.25, 0.25, 0.5, 1.9);
  transition: transform 0.25s cubic-bezier(0.25, 0.25, 0.5, 1.9),
    -webkit-transform 0.25s cubic-bezier(0.25, 0.25, 0.5, 1.9);
}
.btn:hover,
button .shopify-buy__btn:hover {
  background-color: #ff4c0a;
  border-color: #ff4c0a;
  color: #fff;
  text-decoration: none;
  -webkit-transform: scale(1.02);
  transform: scale(1.02);
}

.btn.is-small {
  padding: 0.5rem 1rem;
}

.btn.is-large {
  padding: 1rem 2rem;
}

.is-full {
  width: 100%;
  padding: auto 0;
  text-align: center;
}

.btn.is-primary {
  background-color: #e43f36;
  border-color: #e43f36;
  color: #fff !important;
}
.btn.is-primary:hover {
  background-color: #ff4c0a;
  border-color: #ff4c0a;
  color: #fff;
  text-decoration: none;
}

.btn.is-secondary {
  background-color: #e43f36;
  border-color: #e43f36;
  color: #fff !important;
}
.btn.is-secondary:hover {
  background-color: #ff4c0a;
  border-color: #ff4c0a;
  color: #fff;
  text-decoration: none;
}

.btn.is-black {
  background-color: #000;
  border-color: #000;
  color: #fff !important;
}
.btn.is-black:hover {
  background-color: #050505;
  border-color: #050505;
  color: #fff;
  text-decoration: none;
}

.btn.is-grey {
  background-color: #f6f6f6;
  border-color: #f6f6f6;
  color: #fff !important;
}
.btn.is-grey:hover {
  background-color: #fbfbfb;
  border-color: #fbfbfb;
  color: #fff;
  text-decoration: none;
}

.btn.is-white {
  background-color: #fff;
  border-color: #fff;
  color: #fff !important;
}
.btn.is-white:hover {
  background-color: white;
  border-color: white;
  color: #fff;
  text-decoration: none;
}

.btn.is-dark {
  background-color: #111;
  border-color: #111;
  color: #fff !important;
}
.btn.is-dark:hover {
  background-color: #161616;
  border-color: #161616;
  color: #fff;
  text-decoration: none;
}

.btn.is-medium {
  background-color: #757575;
  border-color: #757575;
  color: #fff !important;
}
.btn.is-medium:hover {
  background-color: #7a7a7a;
  border-color: #7a7a7a;
  color: #fff;
  text-decoration: none;
}

.btn.is-light {
  background-color: #dddddd;
  border-color: #dddddd;
  color: #fff !important;
}
.btn.is-light:hover {
  background-color: #e2e2e2;
  border-color: #e2e2e2;
  color: #fff;
  text-decoration: none;
}

.btn.is-ivory {
  background-color: #e6393c;
  border-color: #e6393c;
  color: #fff !important;
}
.btn.is-ivory:hover {
  background-color: #f8f5f3;
  border-color: #f8f5f3;
  color: #fff;
  text-decoration: none;
}

.btn.is-transparent {
  background-color: transparent;
  border-color: transparent;
  color: #fff !important;
}
.btn.is-transparent:hover {
  background-color: rgba(5, 5, 5, 0);
  border-color: rgba(5, 5, 5, 0);
  color: #fff;
  text-decoration: none;
}

.btn.is-white-primary {
  background-color: #fff;
  border-color: #fff;
  color: #e43f36 !important;
}
.btn.is-white-primary:hover {
  text-decoration: none;
}

.btn.is-white-secondary {
  background-color: #fff;
  border-color: #fff;
  color: #e43f36 !important;
}
.btn.is-white-secondary:hover {
  text-decoration: none;
}

.btn.is-white-black {
  background-color: #fff;
  border-color: #fff;
  color: #000 !important;
}
.btn.is-white-black:hover {
  text-decoration: none;
}

.btn.is-white-grey {
  background-color: #fff;
  border-color: #fff;
  color: #f6f6f6 !important;
}
.btn.is-white-grey:hover {
  text-decoration: none;
}

.btn.is-white-white {
  background-color: #fff;
  border-color: #fff;
  color: #fff !important;
}
.btn.is-white-white:hover {
  text-decoration: none;
}

.btn.is-white-dark {
  background-color: #fff;
  border-color: #fff;
  color: #111 !important;
}
.btn.is-white-dark:hover {
  text-decoration: none;
}

.btn.is-white-medium {
  background-color: #fff;
  border-color: #fff;
  color: #757575 !important;
}
.btn.is-white-medium:hover {
  text-decoration: none;
}

.btn.is-white-light {
  background-color: #fff;
  border-color: #fff;
  color: #dddddd !important;
}
.btn.is-white-light:hover {
  text-decoration: none;
}

.btn.is-white-ivory {
  background-color: #fff;
  border-color: #fff;
  color: #e6393c !important;
}
.btn.is-white-ivory:hover {
  text-decoration: none;
}

.btn.is-white-transparent {
  background-color: #fff;
  border-color: #fff;
  color: transparent !important;
}
.btn.is-white-transparent:hover {
  text-decoration: none;
}

@media (max-width: 834px) {
  .is-full-tablet {
    width: 100%;
    padding: auto 0;
    text-align: center;
    margin-left: 0 !important;
  }
}

@media (max-width: 480px) {
  .is-full-mobile {
    width: 100%;
    padding: auto 0;
    text-align: center;
    margin-left: 0;
  }
}

/* List
-------------------------------------------------- */
.list {
  list-style: none;
}

.list.is-inline li {
  display: inline-block;
  padding-top: 0;
}

.list.is-inline li + li {
  padding-left: 1rem;
}

.list.is-inline.is-large li + li {
  padding-left: 2rem;
}

.list li + li {
  padding-top: 0.5rem;
}

.list.has-bullets,
.content ul {
  list-style: disc outside;
  margin-left: 2rem;
}

.list.has-dividers {
  list-style: none;
  margin-left: 0;
}

.list.has-dividers li {
  display: inline-flex;
  align-items: top;
  width: 100%;
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.list.has-dividers li:first-child {
  padding-top: 0;
}

.list.has-dividers li:last-child {
  padding-bottom: 0;
}

.list.has-dividers li + li {
  border-top: 1px solid #dddddd;
}

.list .icon.is-left {
  padding-right: 1rem;
}

.list .icon.is-right {
  margin-left: auto;
  margin-right: 0;
}

.list img {
  width: 20px;
  min-width: 20px;
}

.icon {
  width: 1rem;
  width: auto;
  line-height: inherit;
  align-items: center;
  display: inline-flex;
  justify-content: center;
}

/* Animation
-------------------------------------------------- */
.animated {
  -webkit-animation-duration: 0.5s;
  animation-duration: 0.5s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-delay: 2s;
  animation-delay: 2s;
}

@-webkit-keyframes tada {
  from {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
  10%,
  20% {
    -webkit-transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
    transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
  }
  30%,
  50%,
  70%,
  90% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
  }
  40%,
  60%,
  80% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
  }
  to {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}

@keyframes tada {
  from {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
  10%,
  20% {
    -webkit-transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
    transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
  }
  30%,
  50%,
  70%,
  90% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
  }
  40%,
  60%,
  80% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
  }
  to {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}

.tada {
  -webkit-animation-name: tada;
  animation-name: tada;
  -webkit-animation-delay: 2.2s;
  animation-delay: 2.2s;
  -webkit-animation-duration: 1.5s;
  animation-duration: 1.5s;
}

@-webkit-keyframes fadeInUp {
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, 15%, 0);
    transform: translate3d(0, 15%, 0);
  }
  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, 15%, 0);
    transform: translate3d(0, 15%, 0);
  }
  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

.fadeInUp {
  -webkit-animation-name: fadeInUp;
  animation-name: fadeInUp;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

div.loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #e6393c;
  z-index: 9;
  transition: opacity 1s;
  display: flex;
  justify-content: center;
  align-items: center;
}

div.loading img {
  animation: rotate 1s infinite linear;
}

div.loading.hidden {
  opacity: 0;
  pointer-events: none;
}

/* Package
-------------------------------------------------- */
.preview {
  cursor: pointer;
}

.preview-open {
  z-index: 1000;
  background-color: blue;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  display: none;
  cursor: url("../assets/index/close.svg"), auto;
}

.preview-open img {
  position: absolute;
  z-index: 0;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  max-width: 90%;
  max-height: 80%;
  width: auto;
  height: auto;
}

.close {
  position: absolute;
  top: 30px;
  right: 5%;
  width: 60px;
  height: 60px;
}

.number-outline {
  height: 70px;
  width: 70px;
  font-size: 1.75rem;
  border-radius: 50%;
  line-height: 66px;
  border: 2px solid #e43f36;
  background-color: transparent;
  color: #e43f36;
  margin: 0 auto 1.5rem auto;
}

.plan-panel-header {
  display: inline-block;
  margin-bottom: 1rem;
  width: 100%;
}

.plan-panel-header span {
  font-family: "DM Sans", sans-serif;
  font-weight: 700;
  float: right;
  color: #e43f36;
  line-height: 1;
  margin-top: 5px;
}

.load {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: #e6393c;
}

.modalDialog {
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s ease-in;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  overflow-y: auto;
}

.modalDialog:target {
  opacity: 1;
  pointer-events: auto;
}

.modalDialog > div {
  max-width: 500px;
  width: 90%;
  margin: 0 auto;
  position: relative;
  padding: 30px;
  border-radius: 4px;
  background: #fff;
}

.close {
  width: 40px;
  height: 40px;
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px;
  display: block;
  cursor: pointer;
}

/* Background
-------------------------------------------------- */
.css-166tz6a {
  background: #e43f36 !important;
}

.has-background-over-shoulder {
  background: url("../assets/index/the-african-creator.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.is-contained {
  background-size: contain;
}

.is-aligned-top {
  background-position: center top;
}

.is-aligned-bottom {
  background-position: center bottom;
}

.is-pattern {
  background-repeat: repeat;
  background-position: center;
  background-size: auto;
}

.is-primary {
  background-color: #e43f36 !important;
}

.is-secondary {
  background-color: #e43f36 !important;
}

.is-black {
  background-color: #000 !important;
}

.is-grey {
  background-color: #f6f6f6 !important;
}

.is-white {
  background-color: #fff !important;
}

.is-dark {
  background-color: #111 !important;
}

.is-medium {
  background-color: #757575 !important;
}

.is-light {
  background-color: #dddddd !important;
}

.is-ivory {
  background-color: #e6393c !important;
}

.is-transparent {
  background-color: transparent !important;
}

@media (max-width: 834px) {
  .is-primary-tablet {
    background-color: #e43f36 !important;
  }
  .is-secondary-tablet {
    background-color: #e43f36 !important;
  }
  .is-black-tablet {
    background-color: #000 !important;
  }
  .is-grey-tablet {
    background-color: #f6f6f6 !important;
  }
  .is-white-tablet {
    background-color: #fff !important;
  }
  .is-dark-tablet {
    background-color: #111 !important;
  }
  .is-medium-tablet {
    background-color: #757575 !important;
  }
  .is-light-tablet {
    background-color: #dddddd !important;
  }
  .is-ivory-tablet {
    background-color: #e6393c !important;
  }
  .is-transparent-tablet {
    background-color: transparent !important;
  }
}

.card.is-primary {
  background-color: #e43f36;
}

.card.is-secondary {
  background-color: #e43f36;
}

.card.is-black {
  background-color: #000;
}

.card.is-grey {
  background-color: #f6f6f6;
}

.card.is-white {
  background-color: #fff;
}

.card.is-dark {
  background-color: #111;
}

.card.is-medium {
  background-color: #757575;
}

.card.is-light {
  background-color: #dddddd;
}

.card.is-ivory {
  background-color: #e6393c;
}

.card.is-transparent {
  background-color: transparent;
}

.has-fill-primary {
  fill: #e43f36;
}

.has-fill-secondary {
  fill: #e43f36;
}

.has-fill-black {
  fill: #000;
}

.has-fill-grey {
  fill: #f6f6f6;
}

.has-fill-white {
  fill: #fff;
}

.has-fill-dark {
  fill: #111;
}

.has-fill-medium {
  fill: #757575;
}

.has-fill-light {
  fill: #dddddd;
}

.has-fill-ivory {
  fill: #e6393c;
}

.has-fill-transparent {
  fill: transparent;
}

.has-overlay-primary:before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #e43f36;
  opacity: 0.5;
}

.has-overlay-secondary:before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #e43f36;
  opacity: 0.5;
}

.has-overlay-black:before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #000;
  opacity: 0.5;
}

.has-overlay-grey:before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #f6f6f6;
  opacity: 0.5;
}

.has-overlay-white:before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #fff;
  opacity: 0.5;
}

.has-overlay-dark:before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #111;
  opacity: 0.5;
}

.has-overlay-medium:before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #757575;
  opacity: 0.5;
}

.has-overlay-light:before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #dddddd;
  opacity: 0.5;
}

.has-overlay-ivory:before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #e6393c;
  opacity: 0.5;
}

.has-overlay-transparent:before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: transparent;
  opacity: 0.5;
}

.overlay-is-1::before {
  opacity: 0.1;
}

.overlay-is-2::before {
  opacity: 0.2;
}

.overlay-is-3::before {
  opacity: 0.3;
}

.overlay-is-4::before {
  opacity: 0.4;
}

.overlay-is-5::before {
  opacity: 0.5;
}

.overlay-is-6::before {
  opacity: 0.6;
}

.overlay-is-7::before {
  opacity: 0.7;
}

.overlay-is-8::before {
  opacity: 0.8;
}

.overlay-is-9::before {
  opacity: 0.9;
}

.is-grayscale::before {
  -webkit-filter: grayscale(1);
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  filter: gray;
  filter: grayscale(100%);
}

/* Spacing
-------------------------------------------------- */
h1,
h2,
h3,
h4,
.title:not(:last-child),
.subtitle:not(:last-child),
a:not(:last-child),
p:not(:last-child),
ol:not(:last-child),
ul:not(:last-child),
blockquote:not(:last-child),
.link:not(:last-child),
.btn:not(:last-child),
img:not(:last-child),
.card:not(:last-child) {
  margin-bottom: 20px;
}

img + img {
  margin-top: 40px;
}

.heading {
  margin-bottom: 2rem;
}

.is-marginless {
  margin: 0;
}

.is-paddingless {
  padding: 0;
}

.padding-bottom-none {
  padding-bottom: 0 !important;
}

.margin-bottom-none {
  margin-bottom: 0 !important;
}

.margin-bottom-small {
  margin-bottom: 20px !important;
}

.margin-bottom-medium {
  margin-bottom: 40px !important;
}

.margin-bottom-large {
  margin-bottom: 80px !important;
}

@media (max-width: 834px) {
  .is-paddingless-tablet {
    padding: 0 !important;
  }
  .is-paddingless-mobile {
    padding: 0 !important;
  }
}

/* Image
-------------------------------------------------- */
img,
svg {
  max-width: 100%;
  height: auto;
  display: block;
  margin: auto;
}

img.thumb {
  margin-bottom: 1.5rem;
}

img.is-left {
  margin-left: 0;
}

svg.is-left {
  margin-left: 0;
}

img.is-rounded,
.rounded img {
  border-radius: 6px;
}

img.is-round,
.round img {
  border-radius: 50%;
}

.ar {
  display: block;
  width: 100%;
  height: 0;
  overflow: hidden;
}

.ar-1-1 {
  padding-top: 100%;
}

.ar-4-3 {
  padding-top: 75%;
}

.ar-3-4 {
  padding-top: 125%;
}

.ar-16-9 {
  padding-top: 50%;
}

.ar-text {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  padding: 40px;
}

.ar-text-middle {
  align-items: center;
  justify-content: center;
}

/* Flag
-------------------------------------------------- */
.flag {
  display: table;
  width: 100%;
}
.flag-fixed,
.flag-full {
  display: table-cell;
  vertical-align: middle;
}
.flag-top .flag-fixed,
.flag-top .flag-full {
  vertical-align: top;
}
.flag-bottom .flag-fixed,
.flag-bottom .flag-full {
  vertical-align: bottom;
}
.flag-fixed {
  padding-right: 40px;
}
.flag-fixed > * {
  display: block;
  white-space: nowrap;
  max-width: none;
}
.flag-rev .flag-fixed {
  padding-right: 0;
  padding-left: 40px;
}
.flag-full {
  width: 100%;
}

.flag + .flag {
  margin-top: 40px;
}

.card + .flag {
  margin-top: 1rem;
  padding-left: 40px;
}

@media (max-width: 834px) {
  .flag-fixed {
    width: 100%;
    display: block;
    padding-bottom: 40px;
  }
  .flag-full {
    width: 100%;
    display: block;
  }
}

/* Hide
-------------------------------------------------- */
.hide-on-desktop {
  display: none;
}

@media (max-width: 834px) {
  .hide-on-desktop {
    display: block;
  }
  .hide-on-mobile {
    display: none !important;
  }
}
</style>