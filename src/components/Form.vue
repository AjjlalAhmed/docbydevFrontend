<template>
  <!-- form-warper  -->
  <div class="form-wraper">
    <!-- sec-1  -->
    <section class="sec-1">
      <!-- form  -->
      <form class="form">
        <!-- head  -->
        <div class="head">
          <h1 class="logo">{ docbydev }</h1>
          <h1 v-if="routeName == 'Signup'" class="title">
            create your account
          </h1>
          <h1 v-else class="title">login to your account</h1>
        </div>
        <!-- form-control  -->
        <div v-if="routeName == 'Signup'" class="form-control">
          <label>name</label>
          <input v-model="name" autocomplete="username" type="text" />
          <span class="error"> {{ nameError }}</span>
        </div>
        <!-- form-control  -->
        <div class="form-control">
          <label>email</label>
          <input v-model="email" autocomplete="email" type="email" />
          <span class="error">{{ emailError }}</span>
        </div>
        <!-- form-control  -->
        <div class="form-control">
          <label>password</label>
          <input
            v-model="password"
            autocomplete="current-password"
            type="password"
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
    <!-- se-2  -->
    <section class="sec-2">
      <!-- img  -->
      <div class="img">
        <img src="@/assets/images/undraw_Mobile_login_re_9ntv.svg" alt="" />
      </div>
    </section>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import storeUserInfo from "../composable/storeUserInfoComposable";
export default {
  name: "Signup",
  setup() {
    // Variables
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
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
        body: JSON.stringify({
          payload,
        }),
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
.form-wraper {
  display: flex;
  max-width: 800px;
  margin: 80px auto;
  align-items: center;
  border: 1px solid #2222;
  padding: 30px 30px;
  gap: 10px;
  border-radius: 3px;
  .sec-1 {
    .head {
      .logo {
        font-size: 1.2rem;
        text-transform: uppercase;
        color: #000;
        padding: 20px 0px;
        font-weight: 900;
      }
      .title {
        font-size: 1rem;
        text-transform: capitalize;
        color: #000;
        font-weight: 400;
        white-space: nowrap;
      }
    }
    .form {
      display: flex;
      flex-direction: column;
      gap: 20px;
      .form-control {
        label {
          text-transform: capitalize;
          font-size: 0.8rem;
          display: block;
          padding: 5px 0px;
        }
        input {
          border: 1px solid #5555;
          border-radius: 3px;
          text-indent: 5px;
          padding: 5px 0px;
          width: 250px;
          min-width: 100px;
          &:focus {
            border: 1px solid #000;
            outline: none;
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
          background: #000;
          color: #fff;
          font-size: 1rem;
          text-transform: capitalize;
          border: 0px;
          border-radius: 3px;
          padding: 5px 10px;
          cursor: pointer;
        }
      }
    }
  }
  .sec-2 {
    .img {
      img {
        width: 100%;
      }
    }
  }
}
// Media queries
@media only screen and(max-width:830px) {
  .form-wraper {
    margin: 20px;
    margin-top: 10vh;
  }
}
@media only screen and(max-width:650px) {
  .form-wraper {
    display: block;
    padding: 20px;
    margin: 20px;
    margin-top: 10vh;
    .sec-1 {
      .head {
        text-align: center;
      }
      .form {
        display: block;
        .form-control {
          padding: 20px 0px;
          max-width: 450px;
          margin: auto;
          label {
            display: block;
          }
          input {
            width: 100%;
            padding: 5px 0px;
          }
        }
      }
    }
    .sec-2 {
      display: none;
    }
  }
}
</style>
