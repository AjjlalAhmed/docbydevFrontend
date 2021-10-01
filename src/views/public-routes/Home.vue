<template>
  <!-- Wraper  -->
  <div :class="{ wraper: true }">
    <!-- Docs  -->
    <ShowDocs :docs="docData" />
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { onBeforeMount } from "@vue/runtime-core";
import ShowDocs from "../../components/sub-components/ShowDocs.vue";
export default {
  name: "Home",
  components: { ShowDocs },
  setup() {
    // Variables
    const host = process.env.VUE_APP_HOST;
    const docData = ref(null);
    // Functions
    // This function fetch docs from server
    const fetchingData = async () => {
      // Fetching docs
      const response = await fetch(`${process.env.VUE_APP_HOST}getdata`);
      const data = await response.json();
      // Checking if error
      if (data.error == null) {
        docData.value = data.docs;
      } else {
        errorMessage.value = data.errorMessage;
      }
    };
    // Life cycle
    onBeforeMount(async () => {
      fetchingData();
    });
    return {
      docData,
      host,
    };
  },
};
</script>

<style lang="scss" scoped>
.wraper {
  padding: 50px 10px;
}
</style>
