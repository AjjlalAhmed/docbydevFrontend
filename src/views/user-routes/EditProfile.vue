<template>
  <!-- Wraper  -->
  <div class="wraper">
    <!-- Go back btn  -->
    <div class="back">
      <router-link class="back-btn" to="/">
        <i class="fa fa-angle-left" aria-hidden="true"></i>
        back to explore
      </router-link>
    </div>
    <!-- Form  -->
    <form class="form">
      <!-- Heading  -->
      <section class="heading">
        <div class="form-control">
          <h1 class="form-heading">
            edit profile
          </h1>
        </div>
      </section>
      <!-- User setting  -->
      <section class="user">
        <div class="form-control">
          <label>name</label>
          <input type="text" autocomplete="name" :value="name" />
        </div>
        <div class="form-control">
          <label>bio</label>
          <textarea
            v-model="bioModel"
            v-if="bioModel && bioModel != 'null'"
            type="text"
          />
          <textarea v-model="bioModel" v-else type="text" />
        </div>
        <div class="form-control">
          <label>skills</label>
          <span>separate skills by {,} comma</span>
          <input
            v-model="skillsModel"
            v-if="skillsModel && skillsModel != 'null'"
            type="text"
          />
          <input v-model="skillsModel" v-else type="text" />
        </div>
        <div class="form-control">
          <label>profile image</label>
          <input @change="getImage" type="file" />
        </div>
        <div class="form-control">
          <label>profession</label>
          <input
            v-model="professionModel"
            v-if="professionModel && professionModel != 'null'"
            type="text"
          />
          <input v-model="professionModel" v-else type="text" />
        </div>
        <div class="form-control">
          <label>address</label>
          <input
            v-model="addressModel"
            v-if="addressModel && addressModel != 'null'"
            type="text"
          />
          <input v-model="addressModel" v-else type="text" />
        </div>
        <div class="form-control">
          <label>birthday</label>
          <input
            v-model="birthdayModel"
            v-if="birthdayModel && birthdayModel != 'null'"
            type="date"
          />
          <input v-model="birthdayModel" v-else type="date" />
        </div>
        <div class="form-control">
          <label>phone</label>
          <input
            v-model="phoneModel"
            v-if="phoneModel && phoneModel != 'null'"
            type="text"
          />
          <input v-model="phoneModel" v-else type="text" />
        </div>
        <div class="form-control">
          <label>site</label>
          <input
            v-model="siteModel"
            v-if="siteModel && siteModel != 'null'"
            type="text"
          />
          <input v-model="siteModel" v-else type="text" />
        </div>
        <div class="form-control">
          <p>gender</p>
          <div class="radio">
            <div v-for="(answer, index) in ['male', 'female']" :key="index">
              <p>
                <input
                  type="radio"
                  name="answer"
                  :value="answer"
                  v-model="genderModel"
                />
                {{ answer }}
              </p>
            </div>
          </div>
        </div>
      </section>
      <!-- Submit  -->
      <section class="user">
        <div class="form-control">
          <button class="submit" @click.prevent="submit">submit</button>
        </div>
      </section>
    </form>
  </div>
  <!-- Wraper  -->
</template>

<script>
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import storeUserInfo from "../../composable/storeUserInfoComposable";
import { useRouter } from 'vue-router';
export default {
  name: "EditProfile",
  setup() {
    // Variables
    const store = useStore();
    const router = useRouter()
    const img = ref(store.getters.currentimg);
    const name = ref(store.getters.currentUsername);
    const bioModel = ref(store.getters.currentBio);
    const skillsModel = ref(store.getters.currentSkills);
    const addressModel = ref(store.getters.currentAddress);
    const birthdayModel = ref('');
    const genderModel = ref(store.getters.currentGender);
    const phoneModel = ref(store.getters.currentPhone);
    const professionModel = ref(store.getters.currentProfession);
    const siteModel = ref(store.getters.currentSite);
    // Functions
    const getImage = (e) => {
      const files = e.target.files || e.dataTransfer.files;
      if (files && files[0]) {
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = function(e) {
          img.value = e.target.result;
        };
      }
    };
    const submit = async () => {
      if(birthdayModel.value = ""){
        birthdayModel.value = store.getters.currentBirthday
      }
      const response = await fetch(
        `${process.env.VUE_APP_HOST}user/editprofile`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: store.getters.currentToken,
            name: name.value,
            bio: bioModel.value,
            img: img.value,
            skills: skillsModel.value,
            address: addressModel.value,
            birthday: birthdayModel.value,
            gender: genderModel.value,
            phone: phoneModel.value,
            profession: professionModel.value,
            site: siteModel.value,
          }),
        }
      );
      const data = await response.json();
      if(data.error == null){
         storeUserInfo(data);
         router.push({ path: "/user/userprofile" });
      }
    };
    return {
      name,
      bioModel,
      skillsModel,
      img,
      addressModel,
      birthdayModel,
      genderModel,
      phoneModel,
      professionModel,
      siteModel,
      submit,
      getImage,
    };
  },
};
</script>

<style lang="scss" scoped>
.wraper {
  .back {
    max-width: 1000px;
    margin: auto;
    margin-top: 50px;
    .back-btn {
      font-size: 1rem;
      color: rgb(88, 87, 87);
      text-transform: capitalize;
      text-decoration: none;
    }
  }
  .form {
    max-width: 1000px;
    column-width: 1000px;
    margin: 20px auto;
    background: #fff;
    border: 1px solid #2222;
    padding: 20px;
    .heading {
      .form-control {
        .form-heading {
          font-size: 2rem;
          text-transform: uppercase;
          color: $primary-color;
          text-align: center;
          font-weight: 900;
        }
      }
    }
    section {
      width: 100%;
      .form-control {
        margin: 20px 10px;
        width: 100%;
        label {
          display: block;
          text-transform: capitalize;
          font-size: 1rem;
          padding: 5px 0px;
        }
        span {
          font-size: 0.9rem;
          text-transform: capitalize;
          font-weight: 700;
        }
        input {
          width: 90%;
          border: 1px solid #2222;
          padding: 10px;
          border-radius: 3px;
        }
        textarea {
          width: 90%;
          min-height: 100px;
          padding: 10px;
          border: 1px solid #2222;
          border-radius: 3px;
        }
        p {
          display: block;
          text-transform: capitalize;
          font-size: 1rem;
          padding: 5px 0px;
        }
        .submit {
          padding: 5px 30px;
          font-size: 1rem;
          text-transform: capitalize;
          background: $primary-color;
          color: #fff;
          border: 1px solid #2222;
          border-radius: 3px;
          font-weight: 700;
          cursor: pointer;
        }
      }
      .radio {
        label {
          display: inline-block;
          font-size: 0.8rem;
          padding: 0px 10px;
        }
        input {
          display: inline-block;
          width: auto;
        }
      }
    }
  }
}
</style>
