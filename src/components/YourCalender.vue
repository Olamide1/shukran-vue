<template>
  <div>
    <!--
            What scope we need https://developers.google.com/drive/api/guides/api-specific-auth
            for calendar https://developers.google.com/calendar/api/guides/overview
            also https://stackoverflow.com/q/62629629/9259701

            Load <script src="https://accounts.google.com/gsi/client" async defer></script>
            Set the Referrer-Policy: no-referrer-when-downgrade header when testing using http and localhost.

            google drive permission scope: https://stackoverflow.com/a/23696493/9259701


            <div id="g_id_onload"
              data-client_id="90078709057-sbh7j7u20gep4f8jo1knadpqpcpi6bpp.apps.googleusercontent.com"
              data-context="signin"
              data-ux_mode="popup"
              data-callback="saveGoogleSignSuccess"
              data-auto_prompt="false">
          </div>

          <div class="g_id_signin"
              data-type="standard"
              data-shape="rectangular"
              data-theme="outline"
              data-text="signin_with"
              data-size="large"
              data-logo_alignment="left">
          </div>
    -->

    <div class="uk-padding uk-text-center uk-margin-large-top">
      <h3>Let's manage event scheduling for you.</h3>
      <p>
        Add consultations or bookings to your google calendar &#8212;
        <i>like the professional you are</i> .
      </p>
      <p>For free.</p>
    </div>
    <div class="center">
      <div
        id="g_id_onload"
        data-client_id="90078709057-sbh7j7u20gep4f8jo1knadpqpcpi6bpp.apps.googleusercontent.com"
        data-context="signin"
        data-ux_mode="popup"
        data-callback="saveGoogleSignSuccess"
        data-auto_prompt="false"
      ></div>

      <div
        class="g_id_signin"
        data-type="standard"
        data-shape="rectangular"
        data-theme="outline"
        data-text="signin_with"
        data-size="large"
        data-logo_alignment="left"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "YourCalender",
  data() {
    return {};
  },
  mounted() {
    // from https://stackoverflow.com/a/47002863/9259701,
    // also borrowed from https://stackoverflow.com/a/49893418/9259701 [should even use more of it.]
    let googleSignInScript = document.createElement("script");
    googleSignInScript.async = true;
    googleSignInScript.defer = true;
    googleSignInScript.setAttribute("src", "https://accounts.google.com/gsi/client");
    document.head.appendChild(googleSignInScript);
  },
  methods: {
    saveGoogleSignSuccess(evt) {
      console.log("from goodle", evt);
    },
  },
};
</script>

<style scoped>
.center {
  margin: 0 auto;
  width: min-content;
}
</style>
