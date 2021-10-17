<template>
  <!-- Docs  -->
  <ShowDocs class="show-doc" :docs="docData" />
  <!-- Docs  -->
</template>

<script>
// Importing thing we need
import { ref } from "@vue/reactivity";
import { onBeforeMount, watch } from "@vue/runtime-core";
import ShowDocs from "../../components/sub-components/ShowDocs.vue";
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

<style lang="scss" scoped></style>
