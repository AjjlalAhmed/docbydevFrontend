<template>
  <div class="container">
    <Navbar />
    <router-view class="view" />
    <Footer />
  </div>
</template>
<script>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import { ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  name: "App",
  components: { Navbar, Footer },
  setup() {
    const store = useStore();
    const router = useRouter();
    return {};
  },
};
</script>
<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;700;900&display=swap");
  @import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");
  font-family: "Poppins", sans-serif;
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
