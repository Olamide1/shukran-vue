<template>
  <div class="uk-container-expand">
    <nav class="uk-navbar  uk-margin mobile-nav">
      <div class="uk-navbar-left">
        <a class="uk-navbar-toggle" uk-toggle="target: #offcanvas-usage">
          <span uk-navbar-toggle-icon></span>
          <span class="uk-margin-small-left"></span>
        </a>

        <a class="uk-navbar-item uk-logo">Shukran</a>
      </div>
    </nav>

    <nav class=" desktop-nav" uk-navbar>
    <div class="uk-navbar-left">

        <ul class="uk-navbar-nav">
            <li class="uk-active"><router-link to="/dash">Dashboard</router-link></li>
            <li id="get-tipped" href="#modal-center" uk-toggle><a>Get tipped</a></li>
            <li>
              <a><router-link to="/profile">Profile</router-link></a>
            </li>
            <li id="give-feedback" uk-toggle="target: #my-id">
              <a>Give feedback</a>
            </li>
        </ul>

    </div>

    <div class="uk-navbar-right">

        <ul class="uk-navbar-nav">
            <li>
              <a class="" href="#modal-middle" uk-toggle><button class="uk-button request-button uk-button-primary">Request payout</button></a>
            </li>
            <li>
              <a>
                  <div class="us uk-height-small uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light"
            v-bind:style="{ 'background-image': `url(https://drive.google.com/uc?export=view&id=${profiles[0].picture_id})` }" uk-img>
        
    </div>
              </a>
            </li>
        </ul>
    </div>
</nav>

    <div id="offcanvas-usage" uk-offcanvas>
      <div class="uk-offcanvas-bar">
        <button class="uk-offcanvas-close" type="button" uk-close></button>
        <h3>Shukran</h3>
        <!-- -->
            <div ref="file" class="image-background uk-height-small uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light"
            v-bind:style="{ 'background-image': `url(https://drive.google.com/uc?export=view&id=${profiles[0].picture_id})` }" uk-img>
        <div id="add-image" uk-form-custom="target: true">
            <input type="file" @change="onFileChanged">
            <span uk-icon="icon: plus; ratio: 2"></span>
        </div>
    </div>
        <ul class="uk-list uk-list-divider">
          <li>
            <router-link to="/dash">Home</router-link>
          </li>
          <li id="get-tipped" href="#modal-center" uk-toggle>Get tipped</li>
          <div id="modal-center" class="uk-flex-top" uk-modal>
            <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical uk-width-auto"
              uk-overflow-auto>
              <button class="uk-modal-close-default" type="button" uk-close></button>
              <h2 class="uk-modal-title">Hey {{username}},</h2>
              <p class="show">Share this link to get tipped.</p>
              <router-link
                :to="'/cr/' + username"
                class="uk-modal-close"
              >https://useshukran.com/{{url}}</router-link>
            </div>
          </div>
          <li>
            <router-link to="/profile">Profile</router-link>
          </li>
          <!--Feedback area start -->
          <li id="give-feedback" uk-toggle="target: #my-id">
            Give feedback
            <a uk-icon="heart"></a>
          </li>
          <div id="my-id" uk-modal>
            <div class="uk-modal-dialog uk-modal-body">
              <h2 class="uk-modal-title">Hey <span class="capitalize">{{username}}</span>,</h2>
              <p class="show">Show some love or raise an issue</p>
              <div class="uk-margin">
                <textarea class="uk-textarea" placeholder="message" v-model="comment"></textarea>
              </div>
              <div class="uk-margin">
                <button class="uk-button" @click="submitFeedback">{{feed}}</button>
              </div>
              <button class="uk-modal-close-default" type="button" uk-close></button>
            </div>
          </div>
          <!--Feebdack area end -->
          <li id="logout" @click="logout">Logout</li>
        </ul>
      </div>
    </div>
    <div class="uk-section uk-padding" align="center">
      <div class="uk-card uk-width-2-3@m">
        <div class="uk-card-header">
          <h3 class="uk-card-title">User Profile</h3>
        </div>

        <div class="uk-position-relative uk-visible-toggle uk-light" tabindex="-1" uk-slider>
          <ul class="uk-slider-items uk-child-width-1-2@s uk-child-width-1-3@m uk-grid " uk-switcher="connect: .switch-class">  
          <li>
            <a href="#" style="color: #208cb7">Personal Info</a>   
          </li>
          <li>
            <a href="#" style="color: #208cb7">Banking info</a> 
          </li>
          <li>
            <a href="#" style="color: #208cb7">Brand Info</a>
          </li>
          <li>
            <a href="#" style="color: #208cb7">Add redirect link</a>
          </li>
        </ul>
          <a style="background-color: #12496961;" class="uk-position-center-left uk-position-small " uk-switcher-item="previous" href="#" uk-slidenav-previous uk-slider-item="previous"></a>
        <a style="background-color: #12496961;" class="uk-position-center-right uk-position-small" uk-switcher-item="next" href="#" uk-slidenav-next uk-slider-item="next"></a>

        </div>

        <ul class="uk-switcher uk-margin switch-class">
          <li>
            <div
              class="uk-card-body"
              v-for="(profile, index) in profiles"
              :key="index"
              align="center"
            >
              <div class="uk-margin">
                <label for="fn" class="to-the-left">
                  Full name
                </label>
                <input
                  name="fn"
                  type="text"
                  class="uk-input"
                  placeholder="Fullname"
                  v-model="profile.fullname"
                />
              </div>
              <div class="uk-margin">
                <label for="e" class="to-the-left">
                  Email
                </label>
                <input name="e" type="text" class="uk-input" v-model="profile.email" placeholder="Email" />
              </div>

              <div class="uk-margin">
                <label for="un" class="to-the-left">
                  Username
                </label>
                <input
                  name="un"
                  type="text"
                  class="uk-input"
                  v-model="profile.username"
                  placeholder="Username"
                />
              </div>
              <div class="uk-margin">
                <label for="pn" class="to-the-left">
                  Phone number
                </label>
                <input
                  name="pn"
                  type="text"
                  class="uk-input"
                  v-model="profile.phone"
                  placeholder="Phone number"
                />
              </div>
              <button class="uk-button" @click="personalInfo">{{savebtnOne}}</button>
            </div>

          </li>
          <li>
            <div
              class="uk-card-body"
              v-for="(profile, index) in profiles"
              :key="index"
              align="center"
            >
              <div class="uk-margin">
                <label for="bn" class="to-the-left">
                  Bank name
                </label>
                <input
                  name="bn"
                  type="text"
                  data-uk-tooltip
                  title="What Nigerian bank do you wanna receive your payouts?"
                  class="uk-input"
                  placeholder="Bank (e.g GTBank etc)"
                  v-model="profile.bank"
                />
              </div>
              <div class="uk-margin">
                <label for="an" class="to-the-left">
                  Account name
                </label>
                <input
                  name="an"
                  type="text"
                  class="uk-input"
                  data-uk-tooltip
                  title="This is for us to vet that we are paying out the correct person."
                  placeholder="Account Name"
                  v-model="profile.account_name"
                />
              </div>

              <div class="uk-margin">
                <label for="anub" class="to-the-left">
                  Account number
                </label>
                <input
                  name="anub"
                  type="text"
                  data-uk-tooltip
                  title="Your account number so we can pay you"
                  class="uk-input"
                  placeholder="Account Number"
                  v-model="profile.account_number"
                />
              </div>
              <button class="uk-button" @click="bankUpdate">{{savebtnTwo}}</button>
            </div> 
            
          </li>
          <li>
            <div
              class="uk-card-body"
              v-for="(profile, index) in profiles"
              :key="index"
              align="center">
              <div class="uk-margin">
                <label for="c" class="to-the-left">
                  Craft
                </label>
                <input
                  name="c"
                  type="text"
                  data-uk-tooltip
                  title="What do your content consumers know you for? You can fill as many as possible and seperate them with a comma."
                  class="uk-input"
                  placeholder="What Do You Do? (Podcaster, Videographer)"
                  v-model="profile.craft_type"
                />
              </div>
              <div class="uk-margin">
                <label for="f" class="to-the-left">
                  Following
                </label>
                <input
                  name="f"
                  type="text"
                  data-uk-tooltip
                  title="The approximate number of followers + listeners + subscribers (It does not have to be 100% accurate, we'll take 80%)"
                  class="uk-input"
                  placeholder="Approximate Audience Size (listeners, subs etc)"
                  v-model="profile.audience_size"
                />
              </div>

              <div class="uk-margin">
                <label for="pl" class="to-the-left">
                  Primary link
                </label>
                <input
                  name="pl"
                  type="text"
                  data-uk-tooltip
                  title="This link can be your disha, website or podcast link, It is for outsiders to find your content and learn about you"
                  class="uk-input"
                  placeholder="Link to your content e.g. (https://youtube.com/username)"
                  v-model="profile.primary_link"
                />
              </div>
              <div class="uk-margin">
                <label for="tm" class="to-the-left">
                  Thank you message
                </label>
                <textarea
                  name="tm"
                  data-uk-tooltip
                  title="Say something nice, witty, sweet etc., to get people to relate and tip you."
                  class="uk-textarea"
                  placeholder="Heartfelt Message To Audience"
                  v-model="profile.summary"
                maxlength="150"></textarea>
              </div>
              <button class="uk-button uk-button-default" @click="messageUpdate">{{savebtnThree}}</button>
              
            </div>
          </li>

          <li>

            <div
              class="uk-card-body"
              align="center">
              <div class="uk-margin">
                <p class="digital-link-text">
              Have exclusive content you want to share to only those that tip you? Fill in your link here.
              This link let's people access a certain content only after they have tipped you.
              That means you don't have to sell anything completely free anymore.
            </p>
              </div>
              <div class="uk-margin" v-for="(profile, index) in profiles" :key="index">
              <label for="dpl" class="to-the-left">
                  Digital product link
                </label>
              <input
                name="dpl"
                type="url"
                data-uk-tooltip
                title="Input a valid URL. https://downloadmystuff.com/link"
                class="uk-input"
                placeholder="Redirect link (https://downloadmybook.com)"
                v-model="profile.redirect"
              />
            </div>
            <button id="link-btn" v-bind:disabled="checkURL" class="uk-button show-warning" @click="updateRef">{{savebtnFour}}</button>
            <br> <br>
              <a
                href="https://twitter.com/intent/tweet?url=http%3A%2F%2Fuseshukran.com%2F&text=I+just+signed+up+to+@useshukran.+It's+amazingly+simple+to+use.+Find+creators+to+tip+here:&hashtags=saythanks,shukran"
                class="uk-button tweet-it"
                target="blank"
              >Tell others</a>
            
            </div>
            
            
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// `https://drive.google.com/uc?id=${data.post.m edia[i]}`
import axios from "axios";
export default {
  name: "profile",
  data() {
    return {
      username: sessionStorage.getItem("username"),
      id: sessionStorage.getItem("id"),
      profiles: [JSON.parse(sessionStorage.getItem('profile'))],
      savebtnOne: "Save",
      savebtnTwo: "Save",
      savebtnThree: "Save",
      savebtnFour: "Save",
      url: "cr/" + encodeURIComponent(sessionStorage.getItem("username").trim()),
      comment: "",
      feed: "Submit",
      profile_picture: ''
    };
  },
  computed: {
    checkURL() { // modified regEx from https://regexr.com/39nr7
      return !/(http(s)?):\/\/[(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(this.profiles[0].redirect);
    },
  },
  methods: {
    logout() {
      sessionStorage.clear();
      this.$router.push("/");
    },
    scroll(){
      window.scrollBy(100, 0);
    },
    getId() {
      var username = this.username;
      axios
        .post("https://shukran-api.herokuapp.com/api/myprofile/", {
          username: username
        })
        .then(res => {
          this.id = res.data[0]._id
          console.log("id");
          this.profiles = res.data;
          /*if (this.profiles[0].primary_link.slice(0,7) == 'https://'){
            this.profiles[0].primary_link = this.profiles[0].primary_link
          }*/
        })
        .catch(err => {
          console.log(err);
        });
    },
    checkUser() {
      if (this.username == null) {
        this.$router.push("/accounts");
      }
    },
    handlePictureUpload(){
      console.log('this.$refs', this.$refs)
      this.file = this.$refs.file[0].files[0];
    },
    messageUpdate() {
      this.savebtnThree = "saving...";
      var id = this.id;
      var summary = this.profiles[0].summary;
      var craft_type = this.profiles[0].craft_type;
      var audience_size = this.profiles[0].audience_size;
      var primary_link = this.profiles[0].primary_link
      /*if (primary_link == '' || primary_link == undefined){
        primary_link = ''
      } else if(primary_link.slice(0, 7) !== "https://") {
        primary_link = "https://" + this.profiles[0].primary_link;
      } else {
        console.log('issue')
      }*/
      axios.post("https://shukran-api.herokuapp.com/api/update/", 
       {
          summary: summary,
          craft_type: craft_type,
          audience_size: audience_size,
          primary_link: primary_link,
          id: id
        }).then(res => {
          console.log("updated");                             
          this.savebtnThree = "Saved!";
          setTimeout(() => { this.savebtnThree = "Save"; }, 3000)
        })
        .catch(err => {
          console.log("update err", err);
          this.savebtnThree = "Please try again!";
          setTimeout(() => { this.savebtnThree = "Save"; }, 3000)
        });
    },
    updateRef() {
      var id = this.id;
      var redirect = this.profiles[0].redirect
      /* if (redirect.slice(0, 7) !== "https://"){
        redirect = "https://" + this.profiles[0].redirect;
      } */
      this.savebtnFour = "saving...";
      axios.post("https://shukran-api.herokuapp.com/api/update/", {
          redirect: redirect,
          id: id
        })
        .then(res => {
          console.log("updated");
          this.savebtnFour = "Saved!";
          setTimeout(() => { this.savebtnFour = "Save"; }, 3000)
        })
        .catch(err => {
          console.log(err);
          this.savebtnFour = "Please try again!";
          setTimeout(() => { this.savebtnFour = "Save"; }, 3000)
        });
    },
    submitFeedback() {
      var username = this.username;
      var comment = this.comment;
      axios
        .post("https://shukran-api.herokuapp.com/api/givefeedback/", {
          username: username,
          comment: comment
        })
        .then(res => {
          console.log("feedback submited");
          UIkit.modal("#my-id").hide();
          alert("Thank you for your feedback!");
        })
        .catch(err => {
          console.log(err);
        });
    },
    
    bankUpdate() {
      var id = this.id;
      var bank = this.profiles[0].bank;
      var account_name = this.profiles[0].account_name;
      var account_number = this.profiles[0].account_number;
      this.savebtnTwo = "saving...";
      axios
        .post("https://shukran-api.herokuapp.com/api/update/", {
          id: id,
          bank: bank,
          account_name: account_name,
          account_number: account_number
        })
        .then(res => {
          console.log("updated");
          this.savebtnTwo = "Saved!";
          setTimeout(() => { this.savebtnTwo = "Save"; }, 5000)
        })
        .catch(error => {
          console.log("error occured", error);
          this.savebtnTwo = "Please try again!";
          setTimeout(() => { this.savebtnTwo = "Save"; }, 5000)
        });
    },
    onFileChanged (event) {
      let formData = new FormData();
      formData.append('id', this.id)
      formData.append('pic', event.target.files[0])
  console.log(event.target.files)
      axios
        .post("https://shukran-api.herokuapp.com/api/update/", formData, {
          onUploadProgress: progressEvent => {
            console.log(progressEvent.loaded / progressEvent.total)
          }
        })
        .then(res => {
          this.profiles[0].picture_id = res.data;
        })
        .catch(error => {
          console.log("error occured", error);
        })
    },
    personalInfo() {
      var id = this.id;
      var fullname = this.profiles[0].fullname;
      var email = this.profiles[0].email;
      var username = this.profiles[0].username.toLowerCase().trim();
      var phone = this.profiles[0].phone;
      this.savebtnOne = "saving...";
      axios
        .post("https://shukran-api.herokuapp.com/api/update/", {
          id: id,
          fullname: fullname,
          email: email,
          username: username,
          phone: phone
        })
        .then(res => {
          console.log("updated");
          this.savebtnOne = "Saved!";
          setTimeout(() => { this.savebtnOne = "Save"; }, 5000)
        })
        .catch(error => {
          console.log("error occured", error);
          this.savebtnOne = "Try again!";
          setTimeout(() => { this.savebtnOne = "Save"; }, 5000)
        });
    }
  },
  mounted() {
    this.getId(); /// shouldn't be...
    this.checkUser();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.uk-navbar,
.uk-navbar-item {
  color: #ffffff;
}
.uk-modal {
  background-color: #ff6870 !important;
  color: #fceedd;
}
.show {
  color: #c63968;
}
.capitalize {
    text-transform: capitalize;   
  }
.uk-container-expand {
  background-color: transparent;
  color: #ebebe7 !important;
}
.uk-offcanvas-bar {
  /* background-color: #c63968 !important; */
  color: #fceedd;
}
.uk-button {
  background-color: #c63968 !important;
  color: #fceedd;
}
.uk-card, .uk-card-title{
  background-color: #fff;
  color: #ff6870;
  border-radius: 5px;
}
.uk-card-title{
  color: #ff6870;
}

.uk-tab::before{
  left: 0px;
}

li#give-feedback, li#get-tipped, li#logout {
  cursor: pointer;
}
li#give-feedback:hover, li#get-tipped:hover, li#logout:hover {
  text-decoration: underline;
}
.image-background {
  width: 80px;
  height: 80px;
  border-radius: 5px;
}

 .us {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-left: -10px;
}
#add-image {
  opacity: 0;
}

#add-image:hover {
  opacity: 1;
}

div[data-src][src*='data:image'] { background: rgba(0,0,0,0.1); }

#link-btn:disabled {
  cursor: not-allowed;
}

.request-button.uk-button-primary {
  border-radius: 5px;
  box-shadow: 0 5px 15px rgba(0,0,0,.08);
}

.desktop-nav {
  margin: 30px;
  border-radius: 5px;
  background: #edf4f0 !important;
  color: #111011 !important;
}

.to-the-left {
  float: left;
}

.digital-link-text {
  text-align: left;
}
.uk-navbar-toggle {
    color: #ffffff;
}
.uk-margin input, .uk-card-body button, .tweet-it {
  border-radius: 3px;
}

#my-id > .uk-modal-body {
  border-radius: 5px;
}

.uk-textarea, .uk-modal-dialog.uk-modal-body div.uk-margin > button  {
  border-radius: 3px;
}
.uk-container-expand {
  background-image: linear-gradient(135deg, #c63968 0%, #ff746c 100%);

  position: fixed;
  bottom: 0;
  right: 0;
  top: 0;
  left: 0;
  overflow: auto;
}

@media (min-width:960px) {
  .mobile-nav{
    display: none;
  }
  
}

@media (max-width:960px) {
  .desktop-nav {
    display: none;
  }
  .uk-tab{
    flex-wrap: nowrap;
    overflow-x: auto;
    flex-direction: row;
    margin-left: 0px;
  }

  .uk-tab li a {
    width: max-content;
  }

  .uk-child-width-expand > :not([class*="uk-width"]) {
    min-width: auto;
  }
}
</style>