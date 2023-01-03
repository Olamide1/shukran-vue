<template>
  <div class="wrapper">
    <h1>Book me</h1>

    <div class="central">
      <section class="uk-padding">

        <div class="uk-margin">
          <v-calendar
            color="red"
            @dayclick="onDayClick"
            v-model="date"
            title-position="right"
            is-expanded
          />
        </div>


        <!-- should we filt uk-flex-between with uk-flex-around? -->
        <div class="uk-margin">
          <span class="uk-text-emphasis">Select time</span>
          <div class="uk-grid-small uk-grid-match uk-flex-between" uk-grid>
          <!--
            Toggle will help https://getuikit.com/docs/toggle

            :uk-toggle="`target: #time-${index}; cls: uk-card-primary`"
          -->
          <div
            @click="chooseTime(_time, index)"
            v-for="(_time, index) in availableTimes"
            :key="index"
          >
            <div
              :id="`time-${index}`"
              class="uk-padding-small a-time uk-border-rounded uk-width-auto uk-card uk-card-default uk-card-body uk-grid-margin"
            >
              {{ _time }}
            </div>
          </div>
        </div>
        </div>
        
      </section>

      <section class="uk-padding">
        <div class="uk-margin">
          <input
            name="fullname"
            type="text"
            class="uk-input uk-border-rounded"
            placeholder="Fullname"
            v-model="fullname"
          />
        </div>

        <div class="uk-margin">
          <input
            name="email"
            type="email"
            class="uk-input uk-border-rounded"
            placeholder="Email"
            v-model="email"
          />
        </div>

        <div class="uk-margin">
          <textarea
            name="message"
            id="mgs"
            class="uk-textarea uk-border-rounded"
            v-model="message"
            rows="5"
            placeholder="Optional message"
            aria-label="Message textarea"
          ></textarea>
        </div>

        <div class="uk-margin">
          <button class="uk-button uk-button-default uk-border-rounded uk-align-right">Book</button>
        </div>
      </section>
    </div>
  </div>

  <!-- 
        https://madewithvuejs.com/calendars 

        Like https://calendly.com/aoyeoka/resolve-issues?month=2023-01&date=2023-01-18, https://vcalendar.io/
        
        Check out others:
        https://dribbble.com/shots/9389632-Figma-calendar-app-template-for-mobile-and-desktop
        https://mengxiong10.github.io/vue2-datepicker/index.html & https://mengxiong10.github.io/vue-datepicker-next/
  -->
</template>

<script>
export default {
  name: "Booking",
  data() {
    return {
      date: new Date(),
      message: "",
      fullname: "",
      selectedTimeIndex: -1,
      email: "",
      availableTimes: [
        "7:00 AM",
        "7:30 AM",
        "7:00 AM",
        "7:30 AM",
        "7:00 AM",
        "7:30 AM",
        "7:00 AM",
        "7:30 AM",
        "7:00 AM",
        "7:30 AM",
        "7:00 AM",
        "7:30 AM",
      ],
    };
  },
  methods: {
    onDayClick(day) {
      console.log("selected date", day);
    },
    chooseTime(_time, index) {
      /**
       * very first time, selectedIndexTime is -1.
       */

      if (this.selectedTimeIndex == -1 || this.selectedTimeIndex == index) {
        console.log("same or start");

        // untoggle selectedIndex
        let f = UIkit.toggle();
        console.log("f", f);

        if (this.selectedTimeIndex == -1) {
          this.selectedTimeIndex = index;
        } else {
          this.selectedTimeIndex = -1;
        }
      } else {
        // untoggle selectedIndex, and toggle index
        console.log("not same");
        if (this.selectedTimeIndex > -1) {
          console.log("untoggleing selectedIndex", this.selectedTimeIndex);
          let ff = UIkit.toggle(`#time-${this.selectedTimeIndex}`, {
            cls: "uk-card-primary",
          }).toggle(); // the extra .toggle is a hot fix
          console.log("ff", ff);
        }

        let fff = UIkit.toggle(`#time-${index}`);
        console.log("fff", fff);

        this.selectedTimeIndex = index;
      }

      console.log(
        "selcected time",
        _time,
        index,
        "this.selectedTimeIndex",
        this.selectedTimeIndex
      );
    },
  },
  mounted() {
    // we need to shorten this
    // all these initializes toggle on the elements
    UIkit.toggle("#time-0", {
      cls: "uk-card-primary",
    });
    UIkit.toggle("#time-1", {
      cls: "uk-card-primary",
    });
    UIkit.toggle("#time-2", {
      cls: "uk-card-primary",
    });
    UIkit.toggle("#time-3", {
      cls: "uk-card-primary",
    });
    UIkit.toggle("#time-4", {
      cls: "uk-card-primary",
    });
    UIkit.toggle("#time-5", {
      cls: "uk-card-primary",
    });
    UIkit.toggle("#time-6", {
      cls: "uk-card-primary",
    });
    UIkit.toggle("#time-7", {
      cls: "uk-card-primary",
    });
    UIkit.toggle("#time-8", {
      cls: "uk-card-primary",
    });
    UIkit.toggle("#time-9", {
      cls: "uk-card-primary",
    });
    UIkit.toggle("#time-10", {
      cls: "uk-card-primary",
    });
    UIkit.toggle("#time-11", {
      cls: "uk-card-primary",
    });
  },
};
</script>

<style scoped>
.wrapper {
  background-image: linear-gradient(135deg, #c63968 0%, #ff746c 100%);
  position: fixed;
  bottom: 0;
  right: 0;
  top: 0;
  left: 0;
  overflow: auto;
}
.central {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.a-time {
  cursor: pointer;
}

.centeral * {
  margin: 0 auto;
}

section {

}
</style>
