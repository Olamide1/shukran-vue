<template>
<div class="terms">
    <nav class="uk-container uk-navbar uk-margin">
        <div class="uk-navbar-left">
            <router-link class="uk-navbar-item logo uk-padding-remove-left" to="/">Shukran</router-link>
        </div>
    </nav>

    <div class="uk-container">
        <h1 class="uk-heading">The 2020 Shukran Highlight</h1>

        <div class="uk-margin-medium-bottom uk-card uk-card-default uk-card-body">
            <article class="uk-article">

                <h1 class="uk-article-title"><a class="uk-link-reset" href="">To you,</a></h1>

                <p class="uk-article-meta">Written by <a href="https://useshukran.com/cr/chuks">chuks</a> on 31st December, 2020.</p>

                <p class="uk-text-lead">2020 has been so many things, it's a bit daunting to sum it up for everyone. Still we must reflect on it so we can, at least, try to make 2021 better. Right?</p>

                <p>We started Shukran to make creators earn better. So far, just a handful of creators really earned something worth while this year. We want to change that, so that a greater percentage of us earn so much that they can solely become their own media companies. That's our over-arching goal by the way. It's only fair.</p>
                
                <p>We sent out highlights for 2020, please do check your email. You could respond to us and tell us what you think about it. We'd really love to hear what you think. We're determined to make Shukran a better platform for you to earn. 2021 is really gonna be a bang! Expect a lot from us to you.</p>

                <p>Shukran.</p>

            </article>
        </div>
    </div>
</div>
    
</template>

<script>
export default {
    name: 'Year2020'
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