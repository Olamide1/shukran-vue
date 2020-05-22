<template>
    <div>
    <nav class="uk-navbar-container uk-margin" uk-navbar>
        <div class="uk-navbar-center">
            <a class="uk-navbar-item uk-logo" href="#" style="color: #208cb7;">Shukran</a>
        </div>

          <div class="uk-navbar-right">

            <ul class="uk-navbar-nav">
                <li>
                    <router-link to="/accounts" style="color: #208cb7;">creators</router-link>
                </li>
            </ul>

        </div>
    </nav>

<div class="uk-height-medium uk-container uk-background-cover uk-flex" uk-parallax="bgy: -100" style="background: #208cb7 !important;" uk-img>
    <div class="uk-width-1-2@m uk-text-justify uk-text-break uk-margin-auto uk-margin-auto-vertical">
        <h2 style="color: #ffffff !important" class="uk-text-top">Shukran means thank you</h2>
        <p style="color: #ffffff !important">Say thanks to your favorite 
            content creators by tipping them.</p>
    </div>

</div>
        

<div class="uk-section uk-container" style="background: #ffffff !important; color: #ee7155 !important">
    <div class="uk-child-width-1-2@s" uk-grid>
    <div>
        <div class="uk-light uk-background-secondary uk-padding">
            <h3>For content creators</h3>
            <p>Earn some money regardless of the size of your audience. </p>
            <router-link class="uk-button uk-button-default" to="/accounts">Get started</router-link>
        </div>
    </div>
    <div>
        <div class="uk-dark uk-card-default uk-padding">
            <h3>Dark</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <button class="uk-button uk-button-default">Button</button>
        </div>
    </div>
</div>
</div>

<div class="uk-section" style="background: #ee7155 !important; color: #ffffff;">
    <div class="uk-container">

        <h3 style="color: #ffffff;">Section Primary</h3>

        <div class="uk-grid-match uk-child-width-1-3@m" uk-grid>
            <div>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
            </div>
            
        </div>

    </div>
</div>

<div class="uk-section" style="background: #ffffff !important; color: #ee7155 !important;">
    <div class="uk-container">

        <h3 style="color: #ee7155;">Section Secondary</h3>

        <div class="uk-grid-match uk-child-width-1-3@m" uk-grid>
            <div>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
            </div>
            <div>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
            </div>
            <div>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
            </div>
        </div>

    </div>
</div>


<div class="uk-section" style="background: #208cb7 !important; color: #ffffff !important;">
    <div class="uk-container">

        <h3 style="color: #ffffff;">Section Secondary</h3>

        <div class="uk-grid-match uk-child-width-1-3@m" uk-grid>
            <div>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
            </div>
            <div>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
            </div>
            <div>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
            </div>
        </div>
    </div>
</div>
    </div>
</template>
<script>
export default {
    
}
</script>

<style scoped>
.uk-navbar-container {
    background: transparent !important;
    color: #516784;
}


</style>