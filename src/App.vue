<template>
  <!-- Container  -->
  <div class="container">
    <!-- Navbar  -->
    <Navbar />
    <!-- Main  -->
    <main>
      <!-- Side menu  -->
      <SideMenu class="show-side__menu" />
      <!-- View  -->
      <router-view class="view" />
      <!-- Additional feed  -->
      <AdditionalFeed
        class="feed"
        :active="false"
        :showNews="showNews"
        :showJobs="showJobs"
      />
    </main>
    <!-- Footer  -->
    <AlertPopup v-if="alertPopup" />
    <Footer />
  </div>
  <!-- Container  -->
</template>
<script>
// Importing thing we need
// Components
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import SideMenu from "./components/SideMenu.vue";
import AdditionalFeed from "./components/AdditionalFeed.vue";
import AlertPopup from "./components/AlertPopup.vue";
// Packages
import moment from "moment";
// Images
import banner from "./assets/images/undraw_project_team_lc5a.svg";
// Vue
import { useRoute, useRouter } from "vue-router";
import { ref, watch } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
  name: "App",
  components: { Navbar, Footer, SideMenu, AdditionalFeed, AlertPopup },
  setup() {
    // Variables
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const showJobs = ref(true);
    const showNews = ref(true);
    const alertPopup = ref(store.getters.currentShowAlertPopupMessage);
    const Moment = moment;
    Moment.suppressDeprecationWarnings = true;

    // Watchers
    // Route watcher
    watch(
      () => route.name,
      () => {
        // Additional feed filter
        if (route.name == "Jobs") showJobs.value = false;
        else showJobs.value = true;
        if (route.name == "News") showNews.value = false;
        else showNews.value = true;
      }
    );
    // Alert popup watcher
    watch(
      () => store.getters.currentShowAlertPopupMessage,
      () => {
        alertPopup.value = store.getters.currentShowAlertPopupMessage;
      }
    );

    // Timeinterval
    setInterval(() => {
      // Checking if token
      if (store.getters.currentToken) {
        // Extraction expiration time for token
        const expTime = JSON.parse(
          atob(store.getters.currentToken.split(".")[1])
        );
        // Checking if token has been expired
        if (
          Moment(Moment().format()).isBefore(
            Moment(expTime.exp * 1000).format()
          )
        )
          return;
        else {
          // Clear user token
          clearInterval();
          router.push({ path: "/user/logout" });
          store.commit("addAlertPopupMessage", "Your token has been expired.");
          store.commit("addShowAlertPopupMessage", true);
        }
      }
    }, 2000);

    return {
      showNews,
      showJobs,
      banner,
      store,
      route,
      alertPopup,
    };
  },
};
</script>
<style lang="scss">
* {
  // Deafult styles
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  //  Fontawesome cdn
  @import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");
  // Google font cdn
  @import url("https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
  // Default font family
  font-family: "Raleway", sans-serif;
}
// container
.container {
  min-height: 100vh;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  background: #f0efef;
  // main
  main {
    flex: 2;
    display: flex;
    justify-content: center;
    padding: 50px 10px;
    margin-top: 10px;
    position: relative;
    width: 100%;
    // view
    .view {
      width: max(100px, 1000px);
    }
    // feed
    .feed {
      width: 300px;
      margin-top: 50px;
    }
  }
}
</style>
