<template>
  <div class="wraper">
    <div class="profile">
      <div class="user">
        <div class="profile-img">
          <img v-if="profileImage != 'null'" :src="profileImage" alt="" />
          <img
            v-else
            src="@/assets/images/undraw_male_avatar_323b.svg"
            alt=""
          />
        </div>
        <p class="user-name">{{ username }}</p>
        <p v-if="userBio != 'null'" class="user-bio">{{ userBio }}</p>
        <p v-else class="user-bio">Hi my name is  {{ username }}</p>
        <p class="joined">
          <i class="fa fa-birthday-cake" aria-hidden="true"></i>
          join on
          {{
            new Date(userJoined)
              .toISOString()
              .slice(0, 10)
              .replace(/-/g, "-")
          }}
        </p>
        <router-link class="edit-btn" to="" > edit profile </router-link>
      </div>
      <div class="user-doc">
        <div class="search">
          <!-- Search input  -->
          <input type="search" v-model="search" class="search-input" />
          <!-- Search butoon  -->
          <button class="search-btn">
            <i class="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
        <ShowDocs :docs="docs" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { onBeforeMount } from "@vue/runtime-core";
import { useStore } from "vuex";
import ShowDocs from "../../components/ShowDocs.vue";
export default {
  name: "UserProfile",
  components: { ShowDocs },
  setup() {
    // Variables
    const docs = ref(null);
    const search = ref("");
    const store = useStore();
    const profileImage = store.getters.currentProfileimage;
    const username = store.getters.currentUsername;
    const userBio = store.getters.currentBio;
    const userSkills = store.getters.currentSkills;
    const userJoined = store.getters.currentJoined;
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
      }
    };
    // Life cycle
    onBeforeMount(() => {
      fetchData();
    });
    return {
      docs,
      search,
      profileImage,
      username,
      userBio,
      userSkills,
      userJoined,
    };
  },
};
</script>

<style lang="scss" scoped>
.wraper {
  padding: 0;
  .profile {
    max-width: 850px;
    margin: 30px auto;
    .user {
      background: #fff;
      border: 1px solid #2222;
      padding: 20px;
      .profile-img {
        text-align: center;
        img {
          max-width: 150px;
        }
      }
      .user-name {
        font-size: 1.5rem;
        text-transform: capitalize;
        font-weight: 900;
        text-align: center;
        padding: 5px;
      }
      .user-bio {
        padding: 10px;
        color: rgb(110, 109, 109);
        text-align: center;
        font-size: 1rem;
        border: 1px solid #2222;
        border-radius: 3px;
        margin: 10px;
      }
      .joined {
        text-align: center;
        padding: 20px 10px;
        text-transform: capitalize;
        border-radius: 3px;
        font-size: 0.8rem;
        color: rgb(110, 109, 109);
        i {
          color: rgb(110, 109, 109);
        }
      }
      .edit-btn{
        font-size: 1rem;
        text-transform: capitalize;
        padding: 3px 15px;
        background: yellow;
        text-decoration: none;
        color: #000;
        font-weight: 400;
        border-radius: 3px;
        border: 1px solid #2222;
      }
    }
  }
}
</style>
