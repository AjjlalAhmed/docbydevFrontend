<template>
  <!-- Form-warper  -->
  <div class="form-wraper">
    <!-- sec-1  -->
    <section class="sec-1">
      <!-- Img  -->
      <div class="img">
        <img :src="image" alt="" />
      </div>
      <!-- form  -->
      <form class="form">
        <!-- head  -->
        <div class="head">
          <h1 class="logo">{ docbydev }</h1>
          <h3 v-if="routeName == 'Signup'" class="title">
            create your new account
          </h3>
          <h3 v-if="routeName == 'Login'" class="title">
            sign into your account
          </h3>
        </div>
        <!-- form-control  -->
        <div v-if="routeName == 'Signup'" class="form-control">
          <div class="input">
            <label> <i class="fa fa-user" aria-hidden="true"></i> </label>
            <input
              v-model="name"
              placeholder="Name"
              autocomplete="username"
              type="text"
            />
          </div>
          <span class="error"> {{ nameError }}</span>
        </div>
        <!-- form-control  -->
        <div class="form-control">
          <div class="input">
            <label> <i class="fa fa-envelope" aria-hidden="true"></i> </label>
            <input
              v-model="email"
              placeholder="Email"
              autocomplete="email"
              type="email"
            />
          </div>
          <span class="error">{{ emailError }}</span>
        </div>
        <!-- form-control  -->
        <div class="form-control">
          <div class="input">
            <label> <i class="fa fa-unlock-alt" aria-hidden="true"></i> </label>
            <input
              v-model="password"
              autocomplete="current-password"
              :type="passwordState"
              placeholder="Password"
            />
            <span
              @click="passwordTogglar"
              v-html="passwordIcon"
              class="hide-show"
            >
            </span>
          </div>
          <span class="error">{{ passwordError }}</span>
        </div>
        <!-- form-control-  -->
        <div v-if="routeName == 'Signup'" class="form-control">
          <button @click.prevent="submitSignupForm" class="submit-btn">
            submit
          </button>
        </div>
        <!-- form-control  -->
        <div v-else class="form-control">
          <button @click.prevent="submitLoginForm" class="submit-btn">
            submit
          </button>
        </div>
      </form>
    </section>
  </div>
  <!-- Form-warper  -->
</template>

<script>
// Importing thing we need
// Helper
import storeUserInfo from "../helpers/storeUserInfoComposable";
// Image
import image from "../assets/images/undraw_Access_account_re_8spm.svg";
// Vue
import { ref } from "@vue/reactivity";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  name: "Signup",
  setup() {
    // Variables
    const route = useRoute();
    const router = useRouter();
    const routeName = route.name;
    const store = useStore();
    const name = ref("");
    const email = ref("");
    const password = ref("");
    const nameError = ref("");
    const emailError = ref("");
    const passwordError = ref("");
    const emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordState = ref("Password");
    const passwordIcon = ref(
      `<i class="fa fa-eye-slash" aria-hidden="true"></i>`
    );

    // Functions
    // This function submit form to server
    const submit = async (payload, to) => {
      const response = await fetch(`${process.env.VUE_APP_HOST}${to}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (data.error == null) {
        try {
          storeUserInfo(data);
          store.commit("addAlertPopupMessage", `${data.username} logged in.`);
          store.commit("addShowAlertPopupMessage", true);
          router.push({ path: "/user/userprofile" });
        } catch (e) {
          console.log(e);
        }
      } else if (data.error == "Email") {
        emailError.value = data.errorMessage;
      } else if (data.error == "Password") {
        passwordError.value = data.errorMessage;
      } else if (data.error == "Username") {
        nameError.value = data.errorMessage;
      }
    };
    // This function display errors to client
    const displayError = () => {
      if (name.value == "") {
        name.value == "";
        nameError.value = "Please enter valid name";
      }
      if (password.value.length < 8) {
        password.value = "";
        passwordError.value = "Password value must be 8 character long";
      }
      if (!emailValidator.test(email.value)) {
        email.value = "";
        emailError.value = "Please enter valid email";
      }
    };
    // This function is listen to signup submit button
    const submitSignupForm = async () => {
      if (
        name.value != "" &&
        password.value.length >= 8 &&
        emailValidator.test(email.value)
      ) {
        const requestBody = {
          name: name.value,
          email: email.value.toLowerCase(),
          password: password.value,
        };
        submit(requestBody, "signup");
      } else {
        displayError();
      }
    };
    // This function is listen to signup submit button
    const submitLoginForm = async () => {
      if (password.value.length >= 8 && emailValidator.test(email.value)) {
        const requestBody = {
          email: email.value.toLowerCase(),
          password: password.value,
        };
        submit(requestBody, "login");
      } else {
        displayError();
      }
    };
    // This function show & hide password value
    const passwordTogglar = () => {
      if (passwordState.value == "Password") {
        passwordState.value = "Text";
        passwordIcon.value = `<i class="fa fa-eye" aria-hidden="true"></i>`;
      } else {
        passwordState.value = "Password";
        passwordIcon.value = `<i class="fa fa-eye-slash" aria-hidden="true"></i>`;
      }
    };

    return {
      routeName,
      submitSignupForm,
      submitLoginForm,
      name,
      email,
      password,
      nameError,
      emailError,
      passwordError,
      image,
      passwordState,
      passwordTogglar,
      passwordIcon,
    };
  },
};
</script>

<style lang="scss" scope>
// form wraper
.form-wraper {
  display: block;
  max-width: 1000px;
  column-width: 1000px;
  margin-top: 50px;
  gap: 10px;
  border-radius: 3px;
  // sec 1
  .sec-1 {
    background: #fff;
    border: 1px solid #3333;
    border-radius: 10px;
    display: flex;
    align-items: center;
    gap: 50px;
    justify-content: left;
    margin: 0px 20px;
    overflow: hidden;
    .img {
      background: #f9f9f9;
      height: max(400px, 600px);
      display: flex;
      align-items: center;
      padding: 10px;
      width: 30%;
      img {
        width: 100%;
      }
    }
    .form {
      display: flex;
      flex-direction: column;
      gap: 20px;
      padding: 20px;
      .head {
        .logo {
          font-size: 2rem;
          text-transform: capitalize;
          text-align: left;
          color: $black;
          padding: 0px;
          font-weight: 900;
          padding: 10px 0px;
        }
        .title {
          font-size: 1.5rem;
          text-transform: capitalize;
          color: $black;
          font-weight: 400;
          white-space: nowrap;
          padding: 10px 0px;
        }
      }
      .form-control {
        width: 100%;
        background: #fff;
        margin: 10px 0px;
        .input {
          display: flex;
          align-items: center;
          border: 1px solid #2222;
          padding: 0px 10px;
          label {
            color: $contrast-color;
            display: inline-block;
            min-width: 25px;
            border-right: 1px solid #2222;
            padding: 10px 0px;
            padding-right: 10px;
          }
          input {
            border: 0px;
            border-radius: 3px;
            text-indent: 15px;
            padding: 10px 0px;
            width: 80%;
            font-size: 1rem;
            background: #fff;
            font-family: FontAwesome, "Raleway";
            display: inline-block;
            border-left: 0px;
            &:focus {
              border: 0px;
              background: transparent;
              outline: none;
            }
          }
          input:-webkit-autofill,
          input:-webkit-autofill:hover,
          input:-webkit-autofill:focus,
          input:-webkit-autofill:active {
            -webkit-box-shadow: 0 0 0 30px white inset !important;
          }
          .hide-show {
            display: inline-block;
            color: rgba(110, 110, 110, 0.747);
            cursor: pointer;
            i {
              pointer-events: none;
            }
          }
        }
        .error {
          font-size: 0.8rem;
          color: crimson;
          text-transform: capitalize;
          padding: 5px 0px;
          display: block;
        }
        .submit-btn {
          width: 100%;
          background: $primary-color;
          color: #fff;
          font-size: 1rem;
          text-transform: capitalize;
          border: 0px;
          border-radius: 3px;
          padding: 10px;
          cursor: pointer;
          font-weight: 700;
        }
      }
    }
  }
}
// Media queries
@media only screen and(max-width:1195px) {
  .form-wraper {
    .sec-1 {
      justify-content: center;
      .img {
        display: none;
      }
      .form {
        padding: 50px 20px;
      }
    }
  }
}
@media only screen and(max-width:830px) {
  .form-wraper {
    margin: 20px;
    margin-top: 0px;
  }
}
@media only screen and(max-width:600px) {
  .form-wraper {
    background: #fff;
    margin: 0;
    .sec-1 {
      border: 0px;
      .form {
        padding: 0px;
      }
    }
  }
}
</style>
