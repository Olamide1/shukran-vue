<template>
    <div>
       <nav class="uk-navbar uk-navbar-container uk-margin" uk-navbar="boundary-align: true; align: center;">
        <div class="uk-navbar-left">
     <router-link class="uk-navbar-item uk-logo" to="/">Shukran</router-link>
    </div>

    <div class="uk-navbar-right">
        <ul class="uk-navbar-nav">
            <li>
                <router-link to="/accounts" class="lead">Creators</router-link>
            </li> 
            <li>
                <a class="lead" href="#modal-sections" uk-toggle>Tip a creator</a>
            </li>
        </ul>
    </div>
</nav>
<img src="../assets/logo.png" height="150px" alt="Home" uk-img>    

<div class="uk-section uk-section-default">
    <div class="uk-container uk-container-small">
        <div class="uk-child-width-1-2@s uk-grid-match" uk-grid>
    <div>
        <div class="uk-card uk-card-default uk-card-hover uk-card-body">
            <h3 class="uk-card-title">Creators</h3>
            <p>Sign up and get a unique link in your "Get tipped" menu 
                that you can use to get support.
            </p>
           <router-link class="uk-button" to="/accounts">Get started</router-link> 
        </div>
    </div>
    <div>
        <div class="uk-card uk-card-default uk-card-hover uk-card-body">
            <h3 class="uk-card-title">Supporters</h3>
            <p>Tip your favorite content creators with as little as &#x20a6;100.</p>
            <a class="uk-button" href="#modal-sections" uk-toggle>Tip a creator</a>

    <div id="modal-sections" uk-modal>
    <div class="uk-modal-dialog" uk-overflow-auto>
        <button class="uk-modal-close-default" type="button" uk-close></button>
        <div class="uk-modal-header">
            <h4 class="uk-modal-title">Search for a creator</h4>
            <input type="text" v-model="search" placeholder="Search for your favourite creator" class="uk-input">
        </div>
            <div class="uk-modal-body" v-if="search == ''">
            <div v-for="(creator, index) in creators" :key="index">
                <router-link :to="'/cr/' + creator.username" class="uk-modal-close">{{creator.username}}</router-link>
                <p>{{creator.summary}}</p>
                <router-link :to="'/cr/' + creator.username" class="uk-button uk-modal-close" type="button">Tip</router-link>
                <hr class="uk-divider-icon">
            </div>
            </div>
            <div class="uk-modal-body" v-else>
                    <div>
                        <div v-for="result in filteresults" :key="result.id">
                            <router-link :to="'/cr/' + result.username" class="uk-modal-close">{{result.username}}</router-link>
                            <p>{{result.summary}}</p>
                            <router-link :to="'/cr/' + result.username" class="uk-button uk-modal-close" >Tip</router-link>
                <hr class="uk-divider-icon">
                        </div>
                    </div>
            </div>
        
    </div>
</div>
        </div>
    </div>
</div>
    </div>
</div>


<div class="uk-section uk-section-muted backy">
    <div class="uk-container">

        <h3 style="color: #fceedd;">Shukran</h3>

        <div class="uk-grid-match uk-child-width-1-3@m" uk-grid>
            <div>
                <p>Connect with us: <br>
                <a uk-icon="twitter" target="blank" href="https://twitter.com/useshukran"></a>
                <a uk-icon="instagram" target="blank" href="https://instagram.com/useshukran"></a>
                </p>
                
            </div>
            <div>
                <p>Location
                    <br>
                    Lagos, Nigeria
                </p>
            </div>
            <div>
                <p>Legal
                    <br>
                    Coming soon.
                </p>
            </div>
            <div>
                <p>Our pricing <br>
               <router-link to="/pricing" class="pricing">Check pricing</router-link>
               </p>
            </div>
            <div>
                <p>© 2020 Placeholder Limited
                    <br>
                    Tips are processed by Paystack.
                </p>
            </div>
        </div>

    </div>
</div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'Home',
    data(){
        return {
            creators: [],
            search: '',
            results: []
        }
    },
    methods: {
        getCreators () {
            axios.get('https://shukran-api.herokuapp.com/api/allusers/').then( res => {
                this.creators = res.data
                console.log('loaded creators')
            }).catch(err => {
                console.log(err)
                console.log('error')
            })
        },
        close(){
            UIkit.modal('#modal-sections').hide()
        }
        },
    mounted(){
        this.getCreators()
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
}
</script>

<style scoped>

.uk-navbar, .uk-navbar-item, .lead {
  background: transparent !important;
  color: #c63968 !important;
}

.uk-card, .uk-card-title {
  background-color: #fceedd !important;
  color: #ff6870 !important;
}
.uk-button{
  background-color: #c63968 !important;
  color: #fceedd;
}
.pricing{
    color: #fceedd !important;
}
img {
    max-width: 100%;
    height: auto;
    max-height: 10%;
}
.backy {
     background-color: #ff6870 !important;
  color: #fceedd !important;
}
</style>