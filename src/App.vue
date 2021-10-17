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
      <AdditionalFedd
        class="feed"
        :active="false"
        :showNews="showNews"
        :showJobs="showJobs"
      />
    </main>
    <!-- Footer  -->
    <Footer />
  </div>
  <!-- Container  -->
</template>
<script>
// Importing thing we need 
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import SideMenu from "./components/SideMenu.vue";
import AdditionalFedd from "./components/AdditionalFeed.vue";
import { useRoute } from "vue-router";
import { ref, watch } from "@vue/runtime-core";
export default {
  name: "App",
  components: { Navbar, Footer, SideMenu, AdditionalFedd },
  setup() {
    // Variables
    const route = useRoute();
    const showJobs = ref(true);
    const showNews = ref(true);

    // Watcher
    watch(
      () => route.name,
      () => {
        // Additional feed filter 
        if (route.name == "Jobs") showJobs.value = false;
        else showJobs.value = true
        if (route.name == "News") showNews.value = false;
        else showNews.value = true
        // Setting up title to route name
        document.title = route.name;
      }
    );

    return {
      showNews,
      showJobs,
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
  @import url("https://fonts.googleapis.com/css2?family=Inconsolata:wght@200;300;400;500;600;700;800;900&display=swap");
  // Default font family
  font-family: "Inconsolata", sans-serif;
}
.container {
  min-height: 100vh;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  background: #f9f9f9;
  main {
    flex: 2;
    display: flex;
    justify-content: center;
    padding: 50px 0px;
    margin-top: 10px;
    position: relative;
    width: 100%;
    .view {
      width: max(100px, 1000px);
    }
    .feed {
      width: max(100px, 300px);
      margin-top: 50px;
    }
  }
}
</style>
