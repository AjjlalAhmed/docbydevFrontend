<template>
  <div class="alert-popup">
    <ul>
      <li class="title">
        notifications
        <span @click="closeAlert"
          ><i class="fa fa-times-circle" aria-hidden="true"></i>
        </span>
      </li>
      <li v-for="(message, index) in alertMessage" :key="index" class="message">
        <i class="fa fa-bell" aria-hidden="true"></i> | {{ message }}
      </li>
    </ul>
  </div>
</template>

<script>
// Vue 
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { watch } from "@vue/runtime-core";
export default {
  name: "AlertPopup",
  setup() {
    // Variables
    const store = useStore();
    const alertMessage = ref(store.getters.currentAlertPopupMessage);

    // Functions
    // This function close alert box
    const closeAlert = () => {
      store.commit("addShowAlertPopupMessage", false);
    };
    // Watcher
    watch(
      () => store.getters.currentAlertPopupMessage,
      () => {
        alertMessage.value = store.getters.currentAlertPopupMessage;
      }
    );

    // Timeout
    setTimeout(() => {
      store.commit("addShowAlertPopupMessage", false);
    }, 5000);
    return {
      alertMessage,
      closeAlert,
    };
  },
};
</script>

<style lang="scss" scoped>
// alert popup 
.alert-popup {
  background: #fff;
  border: 1px solid #3333;
  border-radius: 4px;
  width: 300px;
  text-align: center;
  position: fixed;
  top: 20px;
  z-index: 10;
  right: 0;
  margin:0px 10px;
  min-height: 150px;
  box-shadow: 1px 1px 10px #2222;
  // ul 
  ul {
    list-style: none;
    text-align: left;
    li {
      font-size: 1rem;
      border-bottom: 1px solid #2222;
      padding: 10px;
      margin: 10px;
      text-transform: capitalize;
      i{
        color: $contrast-color;
      }
    }
    .title {
      background: $primary-color;
      color: #fff;
      margin: 0px;
      font-size: 1.2rem;
      text-transform: capitalize;
      border-bottom: 1px solid #3333;
      font-weight: 400;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        display: block;
        cursor: pointer;
        padding: 5px;
        i {
          pointer-events: none;
          font-size: 1.2rem;
        }
      }
    }
    li:last-child{
      border-bottom: 0px !important;
    }
  }
}
</style>
