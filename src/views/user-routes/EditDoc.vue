<template>
  <div>
    <DocInsert :docdata="docdata" />
  </div>
</template>

<script>
import { onBeforeMount, ref } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import DocInsert from "../../components/DocInsert.vue";
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
      const response = await fetch(`${host}user/getdoc/${docid}`, {
        method: "GET",
        headers: new Headers({
          Authorization: store.getters.currentToken,
          "Content-Type": "application/x-www-form-urlencoded",
        }),
      });
      const data = await response.json();
      if (data.error == null) {
        docdata.value = data.doc;
      }
    });
    return { docdata };
  },
};
</script>

<style lang="scss" scoped></style>
