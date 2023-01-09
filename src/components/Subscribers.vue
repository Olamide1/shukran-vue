<template subscribers-body>
  <div class="wrapper">
    <top-side-header v-on:change-rates="rates"></top-side-header>

    <div class="uk-section">
      <div class="uk-container">
        <h3 class="h3">
          Hello,
          <span class="capitalize">{{ username }}</span>
        </h3>
        <!--<div uk-alert>
          <a class="uk-alert-close" uk-close></a>
          <h3>Notice</h3>
          <p>
            Hi {{username}}, our 10% charge will take effect on payout requests from hence forth, find the breakdown
            <router-link to="/pricing">here.</router-link> Shukran!😊
          </p>
        </div>-->

        <div
          class="uk-child-width-1-2@m uk-grid-match"
          uk-grid
          uk-height-match="row: false"
        >
          <!-- Total revenue start -->
          <div>
            <div
              class="uk-card uk-card-default uk-card-body"
              uk-scrollspy="cls: uk-animation-slide-bottom; repeat: true"
            >
              <div class="sub-list-header">
                <h3 class="uk-card-title">
                  <span
                    uk-tooltip="We like to call people who subscribe to paying you recurringly every month 'Shuclans'"
                    >Shuclans</span
                  >
                  list
                </h3>
                <!-- The button toggling the message modal -->
                <a
                  class="uk-icon-button send-message-all"
                  uk-icon="file-edit"
                  data-uk-tooltip
                  title="Send an email message to all your subscribers. Make an announcement or send your love!"
                  href="#send-message"
                  uk-toggle
                ></a>
              </div>
              <div class="total-revenue">
                <h4 class="uk-heading-small">
                  {{ currencySymbol }}{{ totalRevenue.toFixed(2) }}
                </h4>
                <small>Total revenue</small>
              </div>
              <!-- This is the modal -->
              <div id="send-message" uk-modal>
                <div class="uk-modal-dialog uk-modal-body">
                  <button class="uk-modal-close-default" type="button" uk-close></button>
                  <h2 class="uk-modal-title">Compose message</h2>
                  <div class="uk-margin">
                    <input
                      class="uk-input"
                      type="text"
                      v-model="message_subject"
                      placeholder="Subject"
                    />
                  </div>
                  <div class="uk-margin">
                    <textarea
                      class="uk-textarea"
                      v-model="message"
                      rows="5"
                      placeholder="Type your message. All your shuclans will receive this message."
                    ></textarea>
                  </div>
                  <p class="uk-text-right">
                    <button
                      class="uk-button uk-button-default uk-modal-close"
                      type="button"
                    >
                      Cancel
                    </button>
                    <button
                      class="uk-button uk-button-primary"
                      @click="sendMsg"
                      type="button"
                    >
                      {{ message_status }}
                    </button>
                  </p>
                </div>
              </div>

              <!-- Calculate total revenue from subscribers and uncomment later -->
              <!-- <span>
                    Total revenue from subscribers.
                    <a class="uk-card-badge uk-label" href="#modal-middle" uk-toggle>Request payout</a>
                  </span>
                  <h1 class="uk-heading-small">{{currencySymbol}}{{tipTotal.toFixed(2)}}</h1> -->

              <div class="">
                <ul uk-accordion v-if="this.subscribing_amounts.length > 0">
                  <li
                    class="uk-open"
                    v-for="(sub_amount, index) in this.subscribing_amounts"
                    :key="index"
                  >
                    <a class="uk-accordion-title" href="#">
                      <span
                        uk-tooltip="We like to call people who subscribe to paying you recurringly every month 'Shuclans'"
                        >shuclans</span
                      >
                      paying {{ currencySymbol }}{{ sub_amount.toFixed(2) }}
                    </a>
                    <div class="uk-accordion-content">
                      <ul class="uk-list uk-list-striped">
                        <li
                          v-for="(sub, index) in subscribers.filter(
                            (s) => s.amount == sub_amount
                          )"
                          :key="index"
                        >
                          {{ sub.customer.customer_email }}
                          <p>
                            <small
                              >Subscribed
                              {{
                                new Date(sub.created_at).toLocaleDateString("en-GB", {
                                  year: "2-digit",
                                  month: "short",
                                  day: "2-digit",
                                })
                              }}</small
                            >
                          </p>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <!-- <li>
                            <a class="uk-accordion-title" href="#">Item 3</a>
                            <div class="uk-accordion-content">
                                <ul class="uk-list uk-list-striped">
                                    <li>List item 1</li>
                                    <li>List item 2</li>
                                    <li>List item 3</li>
                                </ul>
                            </div>
                        </li> -->
                </ul>
                <div v-else>
                  No
                  <span
                    uk-tooltip="We like to call people who subscribe to paying you recurringly every month 'Shuclans'"
                    >shuclans</span
                  >
                  yet
                </div>
              </div>
            </div>
          </div>
          <!-- Total revenue end -->

          <!-- Uncomment for next feature -->
          <div>
            <div
              class="uk-card uk-card-default uk-card-body"
              uk-scrollspy="cls: uk-animation-slide-top; repeat: true"
            >
              <div class="sub-list-header cont-list-header">
                <h3 class="uk-card-title">Content list</h3>
                <div uk-form-custom>
                  <input ref="addFileInput" type="file" @change="addFile" />
                  <button class="uk-button uk-button-default" type="button" tabindex="1">
                    <span id="addfile-button-text">Add file</span>
                  </button>
                </div>
              </div>

              <div class="">
                <ul
                  class="uk-list uk-list-striped"
                  v-if="this.profile.content && this.profile.content.length > 0"
                >
                  <!-- we should make currency a drop down to include other currency too, so creators can use the $ for when their native currency drops -->

                  <!-- // delete the li up // -->
                  <li v-for="content in this.profile.content" :key="content.created_at">
                    <div>
                      <div class="">
                        <!-- we should make currency a drop down to include other currency too, so creators can use the $ for when their native currency drops -->

                        <div>
                          <div class="uk-width-expand">
                            <div
                              class="uk-grid-small uk-flex-middle uk-flex-between"
                              uk-grid
                            >
                              <h4
                                class="uk-margin-remove-bottom uk-text-truncate content-name"
                              >
                                {{ content.filename.split(".").slice(0, -1).join(".") }}
                              </h4>

                              <div class="uk-width-auto uk-margin-remove-top">
                                <a
                                  class="uk-icon-button"
                                  uk-icon="trash"
                                  uk-tooltip="Delete this content"
                                  v-on:click="deleteContent(content._id)"
                                ></a>

                                <a
                                  class="uk-icon-button uk-margin-auto-left@m"
                                  uk-icon="pencil"
                                  :data-index="content.created_at"
                                  v-on:click="
                                    changeProductDescription(
                                      content._id,
                                      content.created_at
                                    )
                                  "
                                  uk-tooltip="Tell your Shuclans what this content is about. Give a hint or full description, tell a story."
                                ></a>
                              </div>
                            </div>
                            <div class="th-price uk-text-small">
                              <span class="uk-label">{{
                                contentType(content.file_type)
                              }}</span>
                              &mdash; Added
                              <span class="uk-text-meta uk-margin-remove-top">
                                {{ new Date(content.created_at).toDateString() }}
                              </span>
                              for shuclans paying
                              <div class="uk-inline">
                                <label :for="content.created_at">
                                  {{ thresholdCurrSym(content.threshold.currency) }}
                                </label>

                                <input
                                  @change="changeThresholdPrice(content._id)"
                                  uk-tooltip="Click to edit"
                                  class="uk-input uk-text-meta uk-form-blank threshold-price"
                                  :value="content.threshold.amount"
                                  :id="content.created_at"
                                  :data-index="content.created_at"
                                  type="number"
                                  placeholder="0.00"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div
                          class="uk-margin-remove-top uk-margin-remove-bottom the-what"
                          :data-index="content.created_at"
                          contenteditable="false"
                        >
                          {{
                            content.description == undefined ||
                            content.description.trim().length == 0
                              ? `*Add a description for ${content.filename
                                  .split(".")
                                  .slice(0, -1)
                                  .join(".")}. Click the edit icon to do that.`
                              : content.description.trim()
                          }}
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
                <div v-else>
                  No
                  <span
                    uk-tooltip="You can upload materials that'll only be accessible to your Shuklans"
                    >uploads</span
                  >
                  yet
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// inspiration https://uidesigndaily.com/posts/sketch-dashboard-ui-components-upgrade-stats-statistics-admin-panel-day-1076
import axios from "axios";
import TopSideHeader from "./TopSideHeader.vue";
import sharedMixin from "../mixins/sharedMixin";
export default {
  name: "Subscribers",
  components: { TopSideHeader },
  mixins: [sharedMixin],
  data() {
    return {
      username: JSON.parse(sessionStorage.getItem("profile")).username,
      transactions: [],
      allTips: [], // optimise this later
      tipsDates: [],
      currency: !sessionStorage.getItem("shukran-country-currency")
        ? "NGN"
        : sessionStorage.getItem("shukran-country-currency"), // optimse later, use country's currency
      tempCurr: "",
      payoutGuard: 1000, // 1000 naira
      url:
        "https://useshukran.com/cr/" +
        encodeURIComponent(JSON.parse(sessionStorage.getItem("profile")).username.trim()),
      copied: "",
      files: [],
      amount: 0,
      message: "",
      message_subject: "",
      message_status: "Send",
      subscribers: [],
      subscribing_amounts: [],
      tipTotal: 0,
      tipWithdrawn: 0,
      withdrawals: [],
      profile: JSON.parse(sessionStorage.getItem("profile")),
      balance: 0,
      comment: "",
      feed: "Send",
      request: "Request",
      uniqueSupporters: 0,
      totalRevenue: 0,
    };
  },
  computed: {
    availableBalance() {
      return this.tipTotal - this.tipWithdrawn;
    },
    currencySymbol() {
      switch (this.currency) {
        case "NGN":
          return "₦";
          break;
        case "USD":
          return "$";
          break;
        case "KES":
          return "Ksh";
          break;
        default:
          return "₦";
          break;
      }
    },
  },
  watch: {
    profile: {
      handler(val, oldVal) {},
      deep: true,
    },
  },
  methods: {
    copyShukranLink(evt) {
      // console.log('tryna copy');
      let copyText = document.getElementById("shukran-link"); // 'https://useshukran.com/cr/' + this.username;
      copyText.select();
      document.execCommand("copy");
      evt.target.innerText = "COPIED!";
      setTimeout(function () {
        // kinda too fast... we should delay a bit
        evt.target.innerText = "COPY LINK";
      }, 5000);
    },
    thresholdCurrSym: function (c) {
      // seems this should be in the shared mixin
      switch (c) {
        case "NGN":
          return "₦";
          break;
        case "USD":
          return "$";
          break;
        case "KES":
          return "Ksh";
          break;
        default:
          return this.thresholdCurrSym(
            sessionStorage.getItem("shukran-country-currency")
          );
          break;
      }
    },
    deleteContent(_id) {
      axios
        .post(process.env.BASE_URL + "/api/deletecontent/", {
          id: this.profile._id,
          content_id: _id,
        })
        .then((res) => {
          console.log("updated delete content", res);
          if (res.data.nModified == 1) {
            this.$set(
              this.profile,
              "content",
              this.profile.content.filter((c) => c._id !== _id)
            );

            this.$nextTick(function () {
              // maybe notify that it's been successfully deleted?
            });
            sessionStorage.setItem("profile", JSON.stringify(this.profile)); // TODO: update session differently, update the files that creators have deleted...
          }
        })
        .catch((error) => {
          console.log("error occured deleting", error);
        });
    },
    changeThresholdPrice(_id, event) {
      console.log(_id, event.target.value);

      // console.log(event.srcElement.getAttribute('data-index'));
      // update product price
      axios
        .post(process.env.BASE_URL + "/api/updatecontentmetadata/", {
          id: this.profile._id,
          content_id: _id,
          updateData: {
            price: event.target.value,
            // "currency": 'NGN' // sessionStorage.getItem("shukran-country-currency") // this.currency
          },
        })
        .then((res) => {
          console.log("updated!", res);
          sessionStorage.setItem("profile", JSON.stringify(res.data));
          if (res.status == 200) {
            console.log("yes");
          } else {
            console.log("no");
          }
        })
        .catch((error) => {
          console.log("error occured updating", error);
        });
    },
    changeProductDescription(_id, _ref) {
      let _prgrph = document.querySelector(`div[data-index='${_ref}']`);
      let _price = document.querySelector(`input[data-index='${_ref}']`);
      if (_prgrph.isContentEditable) {
        // Disable Editing
        _prgrph.contentEditable = "false";

        document
          .querySelector(`input[data-index='${_ref}']`)
          .classList.add("uk-form-blank");
        document
          .querySelector(`a[data-index='${_ref}']`)
          .setAttribute("uk-icon", "pencil");
        console.log(_price.value);

        // update product description, TODO, if no change in text, don't make http request
        axios
          .post(process.env.BASE_URL + "/api/updatecontentmetadata/", {
            id: this.profile._id,
            content_id: _id,
            updateData: {
              description: _prgrph.innerText,
              price: _price.value,
              currency: sessionStorage.getItem("shukran-country-currency"),
            },
          })
          .then((res) => {
            console.log("updated!", res);
            sessionStorage.setItem("profile", JSON.stringify(res.data));
          })
          .catch((error) => {
            console.log("error occured updating", error);
          });
      } else {
        // Enable editing
        _prgrph.contentEditable = "true";
        this.moveCursorToEnd(_prgrph);

        document
          .querySelector(`input[data-index='${_ref}']`)
          .classList.remove("uk-form-blank");
        document
          .querySelector(`a[data-index='${_ref}']`)
          .setAttribute("uk-icon", "check");
      }
    },
    moveCursorToEnd(target) {
      // https://stackoverflow.com/a/48384974
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(target);
      range.collapse(false);
      sel.removeAllRanges();
      sel.addRange(range);
      target.focus();
      range.detach(); // optimization

      // set scroll to the end if multiline
      target.scrollTop = target.scrollHeight;
    },
    addFile(event) {
      // this.selectedFile = event.target.files[0]
      let formData = new FormData();
      formData.append("creator_id", this.profile._id);
      formData.append("username", this.profile.username);
      formData.append("folder_id", this.profile.folder_id); // done ?
      formData.append("file", event.target.files[0]);

      axios
        .post(process.env.BASE_URL + "/api/createcontent/", formData, {
          onUploadProgress: (progressEvent) => {
            console.log(
              progressEvent.loaded / progressEvent.total,
              `${progressEvent.loaded} / ${progressEvent.total}`
            );
            document.getElementById("addfile-button-text").innerText =
              "Uploading — " +
              parseInt((progressEvent.loaded / progressEvent.total) * 100) +
              "%";
            if (progressEvent.loaded == progressEvent.total) {
              console.log("done", progressEvent.loaded, progressEvent.total);
              document.getElementById("addfile-button-text").innerText = "Add file";
            }
          },
        })
        .then((res) => {
          console.log("new content", res);
          this.$set(this.profile, "content", res.data.content);

          this.$nextTick(function () {
            let newContent = res.data.content[0];
            console.log(newContent);
            // https://stackoverflow.com/a/22506053 // we def don't need https://stackoverflow.com/a/63123264
            this.$refs.addFileInput.value = null;
            this.changeProductDescription(newContent._id, newContent.created_at);
          });
          sessionStorage.setItem("profile", JSON.stringify(res.data)); // TODO: update session differently, update the files that creators have uploaded...
        })
        .then(() => {})
        .catch((error) => {
          console.log("error occured uploading", error);
        });
    },
    contentType: function (mime) {
      switch (mime) {
        case "image/jpeg":
        case "image/gif":
        case "image/jpg":
        case "image/png":
        case "image/tiff":
        case "image/vnd.wap.wbmp":
        case "image/x-icon":
        case "image/x-jng":
        case "image/x-ms-bmp":
        case "image/svg+xml":
        case "image/webp":
          return "IMAGE";
          break;
        case "application/msword":
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":

        case "application/rtf":
          return "DOC";
          break;
        case "application/pdf":
          return "PDF";
          break;
        case "video/webm":
        case "video/3gpp2":
        case "video/3gpp":
        case "video/mp2t":
        case "video/ogg":
        case "video/x-msvideo":
        case "video/mpeg":
          return "VIDEO";
          break;
        case "audio/mpeg":
        case "audio/3gpp2":
        case "audio/3gpp":
        case "audio/webm":
        case "audio/wav":
        case "audio/acc":
        case "audio/ogg":
        case "audio/opus":
          return "AUDIO";
          break;
        case "application/zip":
        case "application/x-7z-compressed":
        case "application/vnd.rar":
        case "application/x-bzip2":
        case "application/x-bzip":
          return "ZIP";
          break;
        default:
          return "FILE";
          break;
      }
    },
    contentIcon: function (mime) {
      switch (mime) {
        case "image/jpeg":
        case "image/gif":
        case "image/jpg":
        case "image/png":
        case "image/tiff":
        case "image/vnd.wap.wbmp":
        case "image/x-icon":
        case "image/x-jng":
        case "image/x-ms-bmp":
        case "image/svg+xml":
        case "image/webp":
          return "icon: image";
          break;
        case "application/msword":
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":

        case "application/rtf":
          return "icon: file-text";
          break;
        case "application/pdf":
          return "icon: file-pdf";
          break;
        case "video/webm":
        case "video/3gpp2":
        case "video/3gpp":
        case "video/mp2t":
        case "video/ogg":
        case "video/x-msvideo":
        case "video/mpeg":
          return "icon: play-circle";
          break;
        case "audio/mpeg":
        case "audio/3gpp2":
        case "audio/3gpp":
        case "audio/webm":
        case "audio/wav":
        case "audio/acc":
        case "audio/ogg":
        case "audio/opus":
          return "icon: play";
          break;
        case "application/zip":
        case "application/x-7z-compressed":
        case "application/vnd.rar":
        case "application/x-bzip2":
        case "application/x-bzip":
          return "icon: album";
          break;
        default:
          return "icon: file";
          break;
      }
    },
    sendMsg() {
      this.message_status = "Sending...";
      axios
        .post(process.env.BASE_URL + "/api/sendmessage/", {
          username: this.username,
          subscribers: [
            ...new Set(this.subscribers.map((s) => s.name.split("-", 1)[0])),
          ].join(";"), // get emails, seperate with ';'
          message: this.message,
          message_subject: this.message_subject,
        })
        .then((res) => {
          this.message_status = "Sent";
          // console.log("message sent?", res);
          (this.message = ""), (this.message_subject = "");
          UIkit.modal("#send-message").hide();
          alert("Message sent!");
        })
        .catch((err) => {
          // tell them to try again later // later on, we'll be trying for them
          // console.log("send message err", err);
        });
    },
    getSupporters() {
      // Optionally the request above could also be done as
      // we really don't need this end point, because we can just count the number of tips they've gotten, the table length
      axios
        .get(process.env.BASE_URL + "/api/yoursupporters/", {
          params: {
            username: this.username,
          },
        })
        .then((response) => {
          // console.log('how many', response.data.length);
          this.uniqueSupporters = response.data.length;
        })
        .catch((error) => {
          // console.log('baddd', error);
        })
        .then(() => {
          // always executed
        });
    },
    getTotalRevenue() {
      axios
        .get(process.env.BASE_URL + "/api/gettotalrevenue/", {
          params: {
            id: this.profile._id,
          },
        })
        .then((response) => {
          // when we pay out someone, how are we do we balance?
          // same logic for subscription
          console.log("how many revenue", response);
          for (let index = 0; index < response.data.length; index++) {
            const element = response.data[index];
            this.totalRevenue += this.fx(element.data.amount) // convert all other amounts
              .from("NGN")
              .to(this.currency);
          }
        })
        .catch((error) => {
          console.log("not gtr", error);
        });
    },
    getSubscribers() {
      // here also gets total revenue
      axios
        .get(process.env.BASE_URL + "/api/getsubscribers/", {
          params: {
            id: this.profile._id,
            username: this.profile.username,
          },
        })
        .then((response) => {
          // when we pay out someone, how are we do we balance?
          // same logic for subscription?
          console.log("how many subscribers", response);
          for (let index = 0; index < response.data.length; index++) {
            const element = response.data[index];

            element.amount = this.fx(element.amount) // convert all other amounts
              .from("NGN")
              .to(this.currency);
          }
          this.subscribers = response.data;

          this.subscribing_amounts = [
            ...new Set(this.subscribers.map((sub) => sub.amount)),
          ];
        })
        .catch((error) => {
          console.log("bad get subscribers", error);
        })
        .then(() => {});
    },
    rates(_currency) {
      this.totalRevenue = this.fx(this.totalRevenue) // convert tip total
        .from(
          this.tempCurr
            ? this.tempCurr
            : sessionStorage.getItem("shukran-country-currency")
        )
        .to(_currency);

      this.subscribing_amounts = this.subscribing_amounts.map((amt) =>
        this.fx(amt) // convert all other tips
          .from(
            this.tempCurr
              ? this.tempCurr
              : sessionStorage.getItem("shukran-country-currency")
          )
          .to(_currency)
      );

      for (let index = 0; index < this.subscribers.length; index++) {
        let element = this.subscribers[index];
        console.log("old amount", element.amount);
        console.log("p.c", this.tempCurr, "c.c", _currency);
        element.amount = this.fx(element.amount) // convert all other tips
          .from(
            this.tempCurr
              ? this.tempCurr
              : sessionStorage.getItem("shukran-country-currency")
          )
          .to(_currency);
        console.log("new amount", element.amount);
        this.$set(this.subscribers, index, element);
      }

      this.tempCurr = _currency; // must be last
    },
    onFileChanged(event) {
      // this.selectedFile = event.target.files[0]
      let formData = new FormData();
      formData.append("id", this.profile._id);
      formData.append("pic", event.target.files[0]);
      // console.log(event.target.files);

      let bar1 = document.getElementById("snpb");
      let bar2 = document.getElementById("js-progressbar");

      let loader1 = document.getElementById("wait");
      let loader2 = document.getElementById("chill");
      bar1.style.display = "block";
      bar2.style.display = "flex";
      axios
        .post(process.env.BASE_URL + "/api/update/", formData, {
          onUploadProgress: (progressEvent) => {
            // console.log(progressEvent.loaded / progressEvent.total, `${progressEvent.loaded} / ${progressEvent.total}`);
            bar1.value = bar2.value = parseInt(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            if (progressEvent.loaded / progressEvent.total == 1) {
              bar1.style.display = bar2.style.display = "none";
              loader1.style.display = loader2.style.display = "block";
            }
          },
        })
        .then((res) => {
          loader1.style.display = loader2.style.display = "none";
          this.profile.picture_id = res.data;
          sessionStorage.setItem("profile", JSON.stringify(this.profile)); // update session too
        })
        .catch((error) => {
          // console.log("error occured", error);
        });
    },
    getBalance() {
      this.balance = this.tipTotal - this.tipWithdrawn;
    },
    checkUser() {
      if (this.username == null) {
        this.$router.push("/accounts");
      }
    },
    getId() {
      let username = this.username;
      axios
        .post(process.env.BASE_URL + "/api/creatorprofile/", {
          username: username,
        })
        .then((res) => {
          console.log("me", res.data[0]);
          this.profile = res.data[0];
        })
        .catch((err) => {
          // console.log(err);
        });
    },
  },
  mounted() {
    this.checkUser();
    this.getBalance();
    this.getSupporters(); // should we call this? peep comment in it's definitino
    this.getSubscribers();
    this.getTotalRevenue();
  },
  beforeMount() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a.router-link-exact-active {
  color: #333;
}

.uk-button.white-bg-button {
  background-color: white;
  color: #000;
}



@media (min-width: 640px) {
  textarea {
    height: 50px;
  }
}

div[contenteditable] {
  min-height: 25px;
}

div[contenteditable]:empty::before {
  content: "*Add a description";
  color: rgba(0, 0, 0, 0.2);
}

div[contenteditable="true"] {
  outline: auto;
}

.threshold-price {
  height: 30px;
  width: 70px;
  margin-bottom: 5px;
  padding: 2px 0 2px 0;
}

.the-what {
  /** https://css-tricks.com/line-clampin/ */
  /* width: 250px; */
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.content-name {
  width: 75%;
  /* white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; */
}

@media (max-width: 960px) {
  .content-name {
    width: 50%;
  }
}

.uk-icon-button.send-message-all {
  background: #e46067;
  color: #212121;
}

.total-revenue {
  display: flex;
  align-items: baseline;
}

.total-revenue small {
  padding-left: 5px;
}

#send-message > .uk-modal-body {
  border-radius: 5px;
}

#send-message button,
#send-message textarea.uk-textarea,
#send-message input.uk-input {
  border-radius: 3px;
}

.sub-list-header {
  display: inline-flex;
  width: 100%;
  justify-content: space-between;
}

.cont-list-header {
  align-items: baseline;
}

.cont-list-header button {
  border-radius: 3px;
}

.uk-form-custom input[type="file"] {
  cursor: pointer;
}

/** circle progress bar https://stackoverflow.com/a/48441688/9259701 */
.top-nav-progress-bar {
  display: none;
  z-index: 1;
  margin-left: -5px;

  position: absolute;
  height: 46px;
  width: 46px;
  /* display: flex; */
  align-items: center;
  justify-content: center;
  color: blue;
  /* margin:30px 30px; */
  float: left;
}

.top-nav-progress-bar:before {
  content: "";
  background: white;
  position: absolute;
  z-index: 100;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: auto auto;
}

progress.top-nav-progress-bar::-moz-progress-bar {
  background: transparent;
}

progress.top-nav-progress-bar::-webkit-progress-bar {
  background: transparent;
}

progress.top-nav-progress-bar::-moz-progress-value {
  background: blue;
}

progress.top-nav-progress-bar::-webkit-progress-value {
  background: blue;
}

.top-nav-progress-bar {
  border-radius: 100%;
  overflow: hidden;
  padding: 0;
}

.side-nav-progress-bar {
  width: 29.5%;
  position: absolute;
  margin-top: -7.5px;
  height: 10px;
  display: none;
}

#wait {
  display: none;
  margin-top: -70px;
  margin-left: 10px;
  position: absolute;
}

#chill {
  display: none;
  margin-left: -35px;
  z-index: 20;
}

.wrapper {
  background-image: linear-gradient(135deg, #c63968 0%, #ff746c 100%);

  position: fixed;
  bottom: 0;
  right: 0;
  top: 0;
  left: 0;
  overflow: auto;
}

.lead {
  background: transparent !important;
  color: #ffffff !important;
}

.uk-accordion-content {
  color: #ff6870 !important;
}

.show {
  color: #c63968;
}

.h3 {
  color: #ffffff;
}

.uk-offcanvas-bar {
  color: #fceedd;
}

.uk-card,
.uk-card-title,
.uk-heading-small {
  color: #666 !important;
  margin-top: 0px;
}

.uk-card,
.uk-alert,
.payout-modal {
  border-radius: 5px;
}

.payout-input,
.payout-button {
  border-radius: 3px;
}

.payout-button[disabled="disabled"] {
  cursor: not-allowed;
}

.uk-alert {
  text-align: left;
}

.capitalize {
  text-transform: capitalize;
}

.uk-section {
  /* background-color: #fceedd !important; */
  color: #ff6870 !important;
}

.uk-label {
  background: #ff6870;
  color: #fceedd;
}

.uk-modal {
  background-color: #ff6870 !important;
  color: #fceedd;
}

#modal-middle {
  /* background-color: #fceedd; */
  color: #ff6870;
}

.uk-button {
  background-color: #c63968;
  color: #fceedd;
}

.request-button.uk-button-primary {
  border-radius: 5px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
}

#image-background {
  width: 80px;
  height: 80px;
  border-radius: 5px;
}

#add-image {
  opacity: 0;
}

#add-image:hover {
  opacity: 1;
}

div[data-src][src*="data:image"] {
  background: rgba(0, 0, 0, 0.1);
}

.uk-modal-dialog.uk-modal-body.uk-margin-auto-vertical.uk-width-auto {
  border-radius: 5px;
  box-shadow: 0 5px 15px rgba(4, 4, 4, 0.45);
}

.us {
  z-index: 10;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-left: -10px;
}

/**https://stackoverflow.com/a/32186894 */

ul.metrics {
  margin-bottom: 25px;
}

ul.metrics > li {
  list-style: none;
}

li.li-available:before {
  content: "•";
  font-size: 450%;
  line-height: 0;
  margin: 0 0.3rem 0 -2rem;
  position: relative;
  top: 1.2rem;
  bottom: 0;
  color: rgb(79, 192, 116);
}

li.li-withdrawn:before {
  content: "•";
  font-size: 450%;
  line-height: 0;
  margin: 0 0.3rem 0 -2rem;
  position: relative;
  top: 1.2rem;
  bottom: 0;
  color: #329ba6;
}

.progress {
  height: 15px;
  width: 100%;
  display: flex;
  background-color: #329ba6;
  position: relative;
  border-radius: 500px;
}

.progress .value:before {
  content: attr(data-label);
  font-size: 0.8em;
  position: relative;
  text-align: center;
  top: -25px;
  left: 0;
}

.progress .value:nth-child(1) {
  color: rgb(79, 192, 116);
}

.progress .value:nth-child(2) {
  color: #329ba6;
}

.progress .value:nth-child(1) {
  background-color: rgb(79, 192, 116);
  border-radius: 500px 0 0 500px;
}

.progress .value:nth-child(2) {
  background-color: #329ba6;
  border-radius: 0 500px 500px 0;
}

.progress .value {
  display: block;
  height: 100%;
}

/**good spot */

@media (min-width: 960px) {
  .uk-card-badge.uk-label[href] {
    display: none;
  }
}

@media (max-width: 960px) {
  .request-button.uk-button-primary {
    display: none;
  }

  .uk-card-body {
    padding: 20px 20px;
  }
}
</style>
