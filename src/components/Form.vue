<template>
  <!-- Form-warper  -->
  <div class="form-wraper">
    <!-- sec-1  -->
    <section class="sec-1">
      <!-- form  -->
      <form class="form">
        <!-- head  -->
        <div class="head">
          <h1 v-if="routeName == 'Login'" class="logo">login</h1>
          <h1 v-if="routeName == 'Signup'" class="logo">create account</h1>
        </div>
        <!-- form-control  -->
        <div v-if="routeName == 'Signup'" class="form-control">
          <label> <i class="fa fa-user" aria-hidden="true"></i> </label>
          <input
            v-model="name"
            placeholder="Name"
            autocomplete="username"
            type="text"
          />
          <span class="error"> {{ nameError }}</span>
        </div>
        <!-- form-control  -->
        <div class="form-control">
          <label> <i class="fa fa-envelope" aria-hidden="true"></i> </label>
          <input
            v-model="email"
            placeholder="Email"
            autocomplete="email"
            type="email"
          />
          <span class="error">{{ emailError }}</span>
        </div>
        <!-- form-control  -->
        <div class="form-control">
          <label> <i class="fa fa-unlock-alt" aria-hidden="true"></i> </label>
          <input
            v-model="password"
            autocomplete="current-password"
            type="password"
            placeholder="Password"
          />
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
import { ref } from "@vue/reactivity";
import { useRoute, useRouter } from "vue-router";
import storeUserInfo from "../helpers/storeUserInfoComposable";
export default {
  name: "Signup",
  setup() {
    // Variables
    const route = useRoute();
    const router = useRouter();
    const routeName = route.name;
    const name = ref("");
    const email = ref("");
    const password = ref("");
    const nameError = ref("");
    const emailError = ref("");
    const passwordError = ref("");
    const emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
    padding: 30px;
    border: 1px solid #3333;
    .head {
      .logo {
        font-size: 2rem;
        text-transform: capitalize;
        text-align: left;
        color: $black;
        padding: 0px;
        font-weight: 700;
      }
      .title {
        font-size: 1.2rem;
        // text-transform: capitalize;
        color: $black;
        font-weight: 700;
        white-space: nowrap;
        padding: 20px 0px;
      }
    }
    .form {
      display: flex;
      flex-direction: column;
      gap: 20px;
      .form-control {
        width: 100%;
        background: #fff;
        margin: 10px 0px;
        // display: flex;
        // align-items: center;
        border-bottom: 1px solid #5555;
        label {
          color: $contrast-color;
          display: inline-block;
        }
        input {
          border: 0px;
          border-radius: 3px;
          text-indent: 15px;
          padding: 10px 0px;
          width: 90%;
          font-size: 1rem;
          background: #fff;
          font-family: FontAwesome, Poppins;
          display: inline-block;
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
// Media query
@media only screen and(max-width:830px) {
  .form-wraper {
    margin: 20px;
    margin-top: 0px;
  }
}
</style>
