<template>
  <Profile v-if="docs && user" :docs="docs" :user="user" />
</template>

<script>
import { onBeforeMount, ref } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import Profile from "../../components/Profile.vue";
export default {
  name: "UserPublicProfile",
  components: { Profile },
  setup() {
    // Variables
    const routes = useRoute();
    const userid = routes.query.id;
    const user = ref(null);
    const docs = ref(null);
    // Life cycle
    onBeforeMount(async () => {
      const response = await fetch(
        `${process.env.VUE_APP_HOST}userprofile/${userid}`
      );
      const data = await response.json();
      if (data.error == null) {
        user.value = {
          profileimage: data.profileimage,
          name: data.username,
          email: data.useremail,
          joined: data.oined,
          address: data.address,
          birthday: data.birthday,
          gender: data.gender,
          phone: data.phone,
          profession: data.profession,
          site: data.site,
          bio:data.bio,
          skills:data.skills
        };
        docs.value = data.docs;
      }
    });
    return { user, docs };
  },
};
</script>

<style lang="scss"></style>
