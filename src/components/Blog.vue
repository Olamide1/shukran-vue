<template>
<div class="terms ">
    <nav class="uk-container uk-navbar uk-margin">
    <div class="uk-navbar-left">
     <router-link class="uk-navbar-item logo uk-padding-remove-left" to="/">Shukran</router-link>
    </div>
    </nav>

    

        <div class="uk-container">
            <h1 class="uk-heading">Blog</h1>

            <div class="uk-margin-medium-bottom uk-card uk-card-default uk-card-body">
    <article class="uk-article">

        <p class="uk-text-lead">
            The Shukran blog is coming soon.
        </p>
        

</article>
</div>
        </div>
</div>
    
</template>

<script>
export default {
    name: 'Blog'
}
</script>

<style scoped>
.terms {
  background-image: linear-gradient(135deg, #c63968 0%, #ff746c 100%);

  position: fixed;
  bottom: 0;
  right: 0;
  top: 0;
  left: 0;
  overflow: auto;
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