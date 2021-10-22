<template>
  <!-- Home  -->
  <div class="home">
    <!-- Hero  -->
    <div class="hero">
      <h1>Break the code barrier</h1>
      <p>Collaborate and share your knowledge with others.</p>
    </div>
    <!-- Docs  -->
    <ShowDocs class="show-doc" :docs="docData" />
  </div>
  <!-- Home  -->
</template>

<script>
// Importing thing we need
// Components 
import ShowDocs from "../components/sub-components/ShowDocs.vue";
// Vue 
import { ref } from "@vue/reactivity";
import { onBeforeMount, watch } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
  name: "Home",
  components: { ShowDocs },
  setup() {
    // Variables
    const store = useStore();
    const host = process.env.VUE_APP_HOST;
    const docData = ref(null);

    // Functions
    // This function fetch docs from server
    const fetchingData = async () => {
      // Fetching docs
      const response = await fetch(
        `${process.env.VUE_APP_HOST}getdoc?category=latest`
      );
      const data = await response.json();
      // Checking if error
      if (data.error == null) {
        docData.value = data.docs;
      } else {
        docData.value = data.error;
      }
    };
    // Side menu togglar
    const showRightMenu = async () => {
      store.commit("addSideMenu", true);
    };

    // Life cycle
    onBeforeMount(async () => {
      // Calling fetch data function 
      fetchingData();
    });

    return {
      docData,
      host,
      showRightMenu,
    };
  },
};
</script>

<style lang="scss" scoped>
// home
.home {
  margin-top: 50px;
  // hero
  .hero {
    background: #f9f9f9;
    margin: 10px;
    border-radius: 4px;
    padding: 20px;
    border: 1px solid #3333;
    h1 {
      color: $black;
      font-size: clamp(0.9rem, calc(1vw + 1rem), 2.5rem);
    }
    p {
      font-size: clamp(0.8rem, calc(1vw + .5rem), 2.5rem);
      padding: 10px 0px;
    }
  }
}
// Media query
@media only screen and(max-width:750px) {
  .home{
    margin-top: 0px;
  }
}
</style>
