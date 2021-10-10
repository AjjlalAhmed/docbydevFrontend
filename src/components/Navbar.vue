<template>
  <!-- Header  -->
  <header>
    <!-- Navbar  -->
    <nav class="nav">
      <!-- Logo & home route -->
      <h1 class="logo"><router-link to="/">{ docbydev }</router-link></h1>
      <!-- Main ul -->
      <ul class="nav-ul">
        <!-- nav item -->
        <li v-if="user" class="nav-item" @click="changeBorder">
          <router-link class="nav-link action-btn" to="/user/adddoc">
            add doc
          </router-link>
        </li>
        <!-- nav item -->
        <li v-if="user" class="nav-item select" @click="changeBorder">
          <img
            v-if="img && img != 'null'"
            :src="'https://drive.google.com/uc?export=view&id=' + img"
            alt=""
          />
          <img
            v-else
            src="@/assets/images/undraw_male_avatar_323b.svg"
            alt=""
          />
          <ul class="inner-ul">
            <li>
              <router-link class="nav-link username" to="/user/userprofile">
                {{ username }}
              </router-link>
              <router-link class="nav-link" to="/user/userprofile">
                <i class="fa fa-user" aria-hidden="true"></i> profile
              </router-link>
              <router-link class="nav-link" to="/user/adddoc">
                <i class="fa fa-plus" aria-hidden="true"></i>
                add doc
              </router-link>
              <router-link class="nav-link" to="/">
                <i class="fa fa-file-text" aria-hidden="true"></i>
                docs
              </router-link>
              <router-link class="nav-link logout" to="/user/logout">
                <i class="fa fa-sign-out" aria-hidden="true"></i>
                logout
              </router-link>
            </li>
          </ul>
        </li>
        <!-- nav item -->
        <li v-if="!user" class="nav-item" @click="changeBorder">
          <router-link class="nav-link" to="/login">log in</router-link>
        </li>
        <!-- nav item -->
        <li v-if="!user" class="nav-item" @click="changeBorder">
          <router-link class="nav-link action-btn" to="/signup">
            create account
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
  <!-- Header  -->
</template>

<script>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
export default {
  name: "Navbar",
  setup() {
    // Variables
    const active = ref(window.location.pathname);
    const routes = useRoute();
    const store = useStore();
    const user = ref(store.getters.currentToken);
    const img = ref(store.getters.currentProfileimage);
    const username = ref(store.getters.currentUsername);
    // Watchers
    watch(routes, () => {
      user.value = store.getters.currentToken;
    });
    watch(
      [
        () => store.getters.currentToken,
        () => store.getters.currentProfileimage,
        () => store.getters.currentUsername,
      ],
      () => {
        user.value = store.getters.currentToken;
        img.value = store.getters.currentProfileimage;
        username.value = store.getters.currentUsername;
      }
    );
    return {
      active,
      user,
      img,
      username,
    };
  },
};
</script>

<style lang="scss" scope>
header {
  background: $secondary-color;
  .nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    border-bottom: 1px solid #2222;
    .logo {
      padding: 5px;
      a {
        text-decoration: none;
        color: $primary-color;
        font-size: 1.5rem;
        text-transform: uppercase;
        font-weight: 900;
        padding: 15px 10px;
        letter-spacing: 1px;
      }
    }
    .nav-ul {
      padding: 5px;
      display: flex;
      align-items: center;
      .nav-item {
        display: inline-block;
        padding: 20px 10px;
        margin: 0px 5px;
        .nav-link {
          text-transform: capitalize;
          font-size: 1rem;
          color: #fff;
          text-decoration: none;
          cursor: pointer;
          padding: 5px 10px;
          &:hover {
            background: $primary-color;
            color: $black;
            border-radius: 3px;
          }
        }
        .action-btn {
          background: $primary-color;
          padding: 5px 20px;
          color: $black;
          border: 0px;
          border-radius: 3px;
          font-weight: 900;
          text-transform: uppercase;
          font-size: 1rem;
        }
      }
      .select {
        position: relative;
        padding: 5px;
        cursor: pointer;
        img {
          width: 40px;
          height: 40px;
          object-fit: cover;
          border-radius: 50%;
        }
        &:hover .inner-ul {
          display: block;
        }
        .inner-ul {
          display: none;
          position: absolute;
          right: 30px;
          li {
            display: flex;
            flex-direction: column;
            width: 200px;
            background: #fff;
            border: 1px solid #2222;
            border-radius: 5px;
            a {
              color: $black;
              font-size: 1rem;
              padding: 10px 20px;
              font-weight: 700;
              i {
                // color: $primary-color;
                padding: 0px 5px;
              }
              &:hover {
                background: rgba(182, 182, 182, 0.067);
                color: $black;
                border-radius: 3px;
              }
            }
            .username {
              padding: 10px;
              border-bottom: 1px solid #5555;
              font-weight: 900;
              font-size: 1.2rem;
              text-align: center;
            }
            .logout {
              padding: 10px;
              border-top: 1px solid #5555;
              font-weight: 400;
              font-size: 1rem;
            }
          }
        }
      }
    }
  }
}
</style>
