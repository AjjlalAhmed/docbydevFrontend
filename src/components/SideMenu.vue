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
      <li>
        <router-link to="/">
          <i class="fa fa-home" aria-hidden="true"></i> home
        </router-link>
      </li>
      <li>
        <router-link to="#">
          <i class="fa fa-briefcase" aria-hidden="true"></i> jobs
        </router-link>
      </li>
      <li>
        <router-link to="#">
          <i class="fa fa-newspaper-o" aria-hidden="true"></i> news
        </router-link>
      </li>
      <li>
        <router-link to="/login">
          <i class="fa fa-sign-in" aria-hidden="true"></i> login
        </router-link>
      </li>
      <li>
        <router-link to="/signup">
          <i class="fa fa-plus" aria-hidden="true"></i> create account
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { watch } from "@vue/runtime-core";
export default {
  name: "SideMenu",
  setup() {
    // Variables
    const store = useStore();
    const showRightSide = ref(store.getters.currentMenuValue);
    // Function
    const showRightMenu = async () => {
      store.commit("addSideMenu", true);
    };
    // Watcher
    watch(
      () => store.getters.currentMenuValue,
      () => {
        showRightSide.value = store.getters.currentMenuValue;
      }
    );
    return {
      showRightMenu,
      showRightSide,
    };
  },
};
</script>

<style lang="scss" scoped>
.side-bar__right {
  position: relative;
  min-width: 200px;
  margin-top: 50px;
  .close-menu {
    display: none;
  }
  ul {
    position: fixed;
    list-style: none;
    li {
      display: block;
      margin-bottom: 30px;
      a {
        color: $secondary-color;
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
@media only screen and(max-width:750px) {
  .side-bar__right {
    display: none;
  }
  .show-right__side {
    display: block;
    position: fixed;
    background: $primary-color;
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
        color: $secondary-color;
      }
      .close-btn {
        i {
          font-size: 1.5rem;
          color: $secondary-color;
        }
      }
    }
    ul {
      padding: 30px 10px;
      li {
        margin-bottom: 30px;
      }
    }
  }
}
</style>
