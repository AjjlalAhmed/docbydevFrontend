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
        <li v-if="user" class="nav-item ">
          <router-link class="nav-link action-btn" to="/user/adddoc">
            add doc
          </router-link>
        </li>
        <!-- nav item -->
        <li v-if="user" class="nav-item nav-user__item select">
          <img
            v-if="img && img != 'null'"
            :src="'https://res.cloudinary.com/dktrjemao/image/upload/v1634911696/' + img"
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
        <li class=" nav-item menu-btn">
          <i @click="showRightMenu" class="fa fa-bars" aria-hidden="true"></i>
        </li>
        <!-- nav item -->
        <li v-if="!user" class="nav-item">
          <router-link class="nav-link" to="/login">log in</router-link>
        </li>
        <!-- nav item -->
        <li v-if="!user" class="nav-item">
          <router-link class="nav-link action-btn" to="/signup">
            create account
          </router-link>
        </li>
      </ul>
      <!-- <div class="menu-btn">
        <i @click="showRightMenu" class="fa fa-bars" aria-hidden="true"></i>
      </div> -->
    </nav>
  </header>
  <!-- Header  -->
</template>

<script>
// Vue 
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
    
    // Function
    // This function toggle side menu 
    const showRightMenu = async () => {
      store.commit("addSideMenu", true);
    };
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
      showRightMenu,
    };
  },
};
</script>

<style lang="scss" scope>
// heaer 
header {
  position: relative;
  width: 100%;
  z-index: 5;
  // nav 
  .nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    background: $secondary-color;
    border-bottom: 1px solid #2222;
    position: fixed;
    width: 100%;
    .logo {
      padding: 5px;
      a {
        text-decoration: none;
        color: $black;
        font-size: 1.3rem;
        text-transform: uppercase;
        font-weight: 700;
        padding: 5px;
        letter-spacing: 1px;
        display: block;
      }
    }
    .nav-ul {
      padding: 5px;
      display: flex;
      align-items: center;
      .nav-item {
        display: inline-block;
        padding: 10px;
        margin: 0px 5px;
        .nav-link {
          text-transform: capitalize;
          font-size: 1rem;
          color: $black;
          text-decoration: none;
          cursor: pointer;
          padding: 5px 10px;
          &:hover {
            background: $primary-color;
            border-radius: 3px;
            color: #fff;
          }
        }
        .action-btn {
          background: $primary-color;
          padding: 5px 20px;
          color: #fff;
          border: 0px;
          border-radius: 3px;
          font-weight: 700;
          text-transform: capitalize;
          font-size: 1rem;
        }
      }
      .menu-btn {
        display: none;
      }
      .select {
        position: relative;
        padding: 0px;
        cursor: pointer;
        img {
          width: 30px;
          height: 30px;
          object-fit: cover;
          border-radius: 50%;
        }
        &:hover .inner-ul {
          display: block;
        }
        .inner-ul {
          display: none;
          position: absolute;
          right: 0px;
          top: 30px;
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
                color: $contrast-color;
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
// Media query 
@media only screen and(max-width:950px) {
  header {
    .nav {
      .logo {
        a {
          font-size: 1.2rem;
        }
      }
      .nav-ul {
        .nav-item {
          display: none;
        }
        .nav-user__item {
          display: block;
        }
        .menu-btn {
          display: block;
        }
      }
      .menu-btn {
        display: block;
        i {
          color: $primary-color;
        }
      }
    }
  }
}
</style>
