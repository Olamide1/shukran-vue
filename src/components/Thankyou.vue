<template>
    <div>
    <div class="uk-container">
    <div class="uk-flex uk-height-medium uk-background-muted uk-margin uk-text-center">
         
    <div class="uk-margin-auto uk-margin-auto-vertical uk-width-1-2@s uk-card uk-card-default uk-card-body">
       <h3 class="uk-card-title">Shukran, <br> {{nickname}}</h3>
    </div>

    <p>Find more creators to tip: <router-link to="/index">here</router-link> </p>
            
    </div>

   <a href="https://twitter.com/intent/tweet?url=http%3A%2F%2Fuseshukran.com%2F&text=I+just+tipped+someone+on+@useshukran.+It's+amazingly+simple+to+use.+Find+creators+to+tip+here:
&hashtags=saythanks,shukran" class="uk-button">Tweet about it</a>
        </div>
    </div>
</template>
<script>
export default {
    name: "ThankYou",
    data () {
        return {
            nickname: localStorage.getItem('shukran-supporter-nickname')
        }
    }
}
</script>
<style>

</style>