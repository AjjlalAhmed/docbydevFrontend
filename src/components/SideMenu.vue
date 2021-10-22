<template>
  <!-- Side menu  -->
  <div :class="{ 'side-bar__right': true, 'show-right__side': showRightSide }">
    <!-- Close button  -->
    <div class="close-menu">
      <h1>{ docbydev }</h1>
      <div class="close-btn">
        <i @click="showRightMenu" class="fa fa-times" aria-hidden="true"></i>
      </div>
    </div>
    <!-- Side ul   -->
    <ul>
      <!-- Side li  -->
      <li v-for="(item, index) in items" :key="index">
        <router-link
          :class="{ active: route.path == item.path }"
          :to="item.path"
          v-html="`${item.text}`"
        >
        </router-link>
      </li>
    </ul>
  </div>
  <!-- Side menu  -->
</template>

<script>
// Importing thing we need
// Vue 
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { watch } from "@vue/runtime-core";
import { useRoute } from "vue-router";
export default {
  name: "SideMenu",
  setup() {
    // Variables
    const store = useStore();
    const route = useRoute();
    const showRightSide = ref(store.getters.currentMenuValue);
    const items = ref([]);

    // Functions
    // This function creating list items
    const createItems = () => {
      items.value = [];
      if (store.getters.currentUsername) {
        items.value.push(
          {
            path: "/",
            text: `<span><i class="fa fa-home" aria-hidden="true"></i> home</span>`,
          },
          {
            path: "/jobs",
            text: `<span><i class="fa fa-briefcase" aria-hidden="true"></i> jobs</span>`,
          },
          {
            path: "/news",
            text: `<span><i class="fa fa-newspaper-o" aria-hidden="true"></i> news</span>`,
          },
          {
            path: "/user/userprofile",
            text: `<span><i class="fa fa-user" aria-hidden="true"></i> profile</span>`,
          },
          {
            path: "/user/logout",
            text: `<span><i class="fa fa-sign-out" aria-hidden="true"></i> logout</span>`,
          }
        );
      } else {
        items.value.push(
          {
            path: "/",
            text: `<span><i class="fa fa-home" aria-hidden="true"></i> home</span>`,
          },
          {
            path: "/jobs",
            text: `<span><i class="fa fa-briefcase" aria-hidden="true"></i> jobs</span>`,
          },
          {
            path: "/news",
            text: `<span><i class="fa fa-newspaper-o" aria-hidden="true"></i> news</span>`,
          },
          {
            path: "/login",
            text: `<span><i class="fa fa-sign-in" aria-hidden="true"></i> login</span>`,
          },
          {
            path: "/signup",
            text: `<span><i class="fa fa-plus" aria-hidden="true"></i> create account</span>`,
          }
        );
      }
    };
    // This function toggle side menu
    const showRightMenu = async () => {
      store.commit("addSideMenu", true);
    };
    // Calling createItems 
    createItems();

    // Watchers
    watch(
      () => store.getters.currentMenuValue,
      () => {
        showRightSide.value = store.getters.currentMenuValue;
      }
    );
    watch(
      () => store.getters.currentUsername,
      () => {
        createItems();
      }
    );
    watch(
      () => route.name,
      () => {
        createItems();
      }
    );
    
    return {
      showRightMenu,
      showRightSide,
      items,
      route,
      store,
    };
  },
};
</script>

<style lang="scss" scoped>
// side bar right
.side-bar__right {
  position: relative;
  min-width: 200px;
  margin-top: 50px;
  // close menu 
  .close-menu {
    display: none;
  }
  // ul 
  ul {
    position: fixed;
    list-style: none;
    li {
      display: block;
      margin-bottom: 30px;
      a {
        color: $black;
        font-size: 1rem;
        text-transform: capitalize;
        padding: 10px;
        text-decoration: none;
        i {
          padding: 0px 5px;
        }
      }
    }
  }
}
// active 
.active :deep(span) {
  color: $contrast-color;
}
// Media queries 
@media only screen and(max-width:950px) {
  .side-bar__right {
    display: none;
  }
  .show-right__side {
    display: block;
    position: fixed;
    background: $secondary-color;
    border: 1px solid #2222;
    left: 0;
    top: -50px;
    z-index: 10;
    height: 100%;
    padding: 5px 0px;
    min-width: 250px;
    .close-menu {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 20px;
      padding-bottom: 20px;
      border-bottom: 1px solid #6666;
      h1 {
        font-size: 1.3rem;
        text-transform: uppercase;
        color: $primary-color;
      }
      .close-btn {
        i {
          font-size: 1.5rem;
          color: $primary-color;
        }
      }
    }
    ul {
      padding: 30px 10px;
      li {
        margin-bottom: 10px;
        a {
          color: $primary-color;
          font-size: 1rem;
          text-transform: capitalize;
          padding: 10px;
          display: block;
          text-decoration: none;
          i {
            padding: 0px 5px;
          }
        }
      }
    }
  }
}
</style>
