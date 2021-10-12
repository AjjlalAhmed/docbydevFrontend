<template>
  <!-- Wraper  -->
  <div :class="{ wraper: true }">
    <!-- SideMenu  -->
    <SideMenu />
    <!-- Docs  -->
    <ShowDocs class="show-doc" :docs="docData" />
    <!-- Additional feed  -->
    <AdditionalFeed />
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { onBeforeMount, watch } from "@vue/runtime-core";
import ShowDocs from "../../components/sub-components/ShowDocs.vue";
import SideMenu from "../../components/SideMenu.vue";
import AdditionalFeed from "../../components/AdditionalFeed.vue";
import { useStore } from "vuex";
export default {
  name: "Home",
  components: { ShowDocs, SideMenu, AdditionalFeed },
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

    const showRightMenu = async () => {
      store.commit("addSideMenu", true);
    };
    // Life cycle
    onBeforeMount(async () => {
      fetchingData();
    });
    // Watcher
    return {
      docData,
      host,
      showRightMenu,
    };
  },
};
</script>

<style lang="scss" scoped>
.wraper {
  display: flex;
  justify-content: center;
  padding: 50px 0px;
  position: relative;
  width: 100%;
}

</style>
