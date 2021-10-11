<template>
  <!-- Container  -->
  <div class="container">
    <!-- Navbar  -->
    <Navbar />
    <!-- Main  -->
    <router-view class="view" />
    <!-- Footer  -->
    <Footer />
  </div>
  <!-- Container  -->
</template>
<script>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
export default {
  name: "App",
  components: { Navbar, Footer },
  setup() {},
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
  font-family: "Open-Dyslexic Roman";
}
@font-face {
  font-family: "Open-Dyslexic Roman";
  font-style: normal;
  font-weight: normal;
  src: url("./assets/fonts/open-dyslexic.woff") format("woff");
}
.container {
  min-height: 100vh;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  .view {
    flex: 2;
  }
}
</style>
