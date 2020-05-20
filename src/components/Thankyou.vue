<template>
    <div>
        <div class="uk-container">
    <div class="uk-flex uk-height-medium uk-background-muted uk-margin uk-text-center">
         
    <div class="uk-margin-auto uk-margin-auto-vertical uk-width-1-2@s uk-card uk-card-default uk-card-body">
       <h3 class="uk-card-title">Shukran, <br> {{nickname}}</h3>
    </div>
            
</div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'thank you',
    data () {
        return {
            nickname: localStorage.getItem('shukran_nickname')
        }
    }
}
</script>
<style>

</style>