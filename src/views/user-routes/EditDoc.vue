<template>
  <!-- DocInsert  -->
  <DocInsert :docdata="docdata" />
  <!-- DocInsert  -->
</template>

<script>
// Importing thing we need
// Components
import DocInsert from "../../components/DocInsert.vue";
// Vue 
import { onBeforeMount, ref } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
export default {
  name: "EditDoc",
  components: { DocInsert },
  setup() {
    //   Variables
    const route = useRoute();
    const store = useStore();
    const host = process.env.VUE_APP_HOST;
    const docid = route.query.docid;
    const docdata = ref(null);

    // Life cycle
    onBeforeMount(async () => {
      // Fetching old doc data
      const response = await fetch(`${host}user/getdoc/${docid}`, {
        method: "GET",
        headers: new Headers({
          Authorization: store.getters.currentToken,
          "Content-Type": "application/x-www-form-urlencoded",
        }),
      });
      const data = await response.json();
      // Checking if error
      if (data.error == null) {
        docdata.value = data.doc;
      }
    });

    return { docdata };
  },
};
</script>

<style lang="scss" scoped></style>
