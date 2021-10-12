<template>
  <div class="user-profiles">
    <!-- SideMenu  -->
    <SideMenu />
    <!-- Profile  -->
    <Profile :docs="docs" :user="user" />
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { onBeforeMount, watch } from "@vue/runtime-core";
import { useStore } from "vuex";
import Profile from "../../components/Profile.vue";
import SideMenu from "../../components/SideMenu.vue";
export default {
  name: "UserProfile",
  components: { Profile, SideMenu },
  setup() {
    // Variables
    const docs = ref(null);
    const store = useStore();
    const profileimage = ref(store.getters.currentProfileimage);
    const name = ref(store.getters.currentUsername);
    const email = ref(store.getters.currentUseremail);
    const bio = ref(store.getters.currentBio);
    const skills = ref(store.getters.currentSkills);
    const joined = ref(store.getters.currentJoined);
    const address = ref(store.getters.currentAddress);
    const birthday = ref(store.getters.currentBirthday);
    const gender = ref(store.getters.currentGender);
    const phone = ref(store.getters.currentPhone);
    const profession = ref(store.getters.currentProfession);
    const site = ref(store.getters.currentSite);
    const user = ref({
      profileimage,
      name,
      email,
      joined,
      address,
      birthday,
      gender,
      phone,
      profession,
      site,
      bio,
      skills,
    });
    // Functions
    // Fetching profileData & user docData
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.VUE_APP_HOST}user/getuserdata/${store.getters.currentUserid}`,
        {
          method: "GET",
          headers: new Headers({
            Authorization: store.getters.currentToken,
            "Content-Type": "application/x-www-form-urlencoded",
          }),
        }
      );
      const data = await response.json();
      if (data.error == null) {
        docs.value = data.docs;
      } else {
        docs.value = data.error;
      }
    };
    // Life cycle
    onBeforeMount(() => {
      fetchData();
    });
    return {
      docs,
      user,
    };
  },
};
</script>

<style lang="scss" scoped>
.user-profiles {
  display: flex;
  justify-content: center;
  padding: 50px 0px;
  position: relative;
  width: 100%;
  margin-top:50px ;
}
</style>
