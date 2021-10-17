<template>
  <!-- Details  -->
  <div v-if="details" class="user-details">
    <!-- Details left  -->
    <div class="details-left">
      <div class="user-img">
        <img
          v-if="details.profileimage && details.profileimage != 'null'"
          :src="
            'https://drive.google.com/uc?export=view&id=' + details.profileimage
          "
          alt=""
        />
        <img v-else src="@/assets/images/undraw_male_avatar_323b.svg" alt="" />
      </div>
      <div class="user-basic__info">
        <div class="name">@{{ details.name }}</div>
        <div
          v-if="details.profession && details.profession != 'null'"
          class="profession"
        >
          {{ details.profession }}
        </div>
        <div v-else>N/A</div>
        <div class="email">{{ details.email }}</div>
        <div class="btn">
          <router-link
            v-if="route.name != 'Profile'"
            to="/user/editprofile"
            class="edit-btn"
            >edit profile</router-link
          >
        </div>
      </div>
    </div>
    <!-- Details right  -->
    <div class="details-right">
      <div class="user-more__info">
        <div v-if="details.gender && details.gender != 'null'" class="gender">
          <b>gender :</b> {{ details.gender }}
        </div>
        <div v-else><b>gender :</b> N/A</div>
        <div
          v-if="details.address && details.address != 'null'"
          class="address"
        >
          <b>address :</b> {{ details.address }}
        </div>
        <div v-else><b>address :</b> N/A</div>
        <div
          v-if="details.birthday && details.birthday != 'null'"
          class="birthday"
        >
          <b>birthday :</b> {{ Moment(details.birthday).format("ll") }}
        </div>
        <div v-else><b>birthday :</b> N/A</div>
        <div
          v-if="details.phone && details.phone != 'null'"
          class="phone-number"
        >
          <b>phone :</b> {{ details.phone }}
        </div>
        <div v-else><b>phone :</b> N/A</div>
        <div v-if="details.site && details.site != 'null'" class="site">
          <a target="blank" :href="details.site"
            ><b>site :</b> {{ details.site }}</a
          >
        </div>
        <div v-else><b>site :</b> N/A</div>
      </div>
    </div>
  </div>
  <!-- Details  -->
</template>

<script>
// Importing thing we need
import { ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
import moment from "moment";
import { useRoute } from "vue-router";
export default {
  name: "UserDetails",
  props: ["details"],
  setup(props) {
    // Variables
    const details = ref(props.details);
    const route = useRoute();
    const Moment = moment;
    Moment.suppressDeprecationWarnings = true;

    // Wacther
    watch(
      () => props.details,
      () => {
        details.value = props.details;
      }
    );
    return { details, Moment, route };
  },
};
</script>

<style lang="scss" scoped>
// user details 
.user-details {
  padding: 30px;
  border: 1px solid #2222;
  border-radius: 3px;
  background: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
  gap: 30px;
  max-width: 1000px;
  margin: 30px auto;
  // details left 
  .details-left {
    display: flex;
    align-items: flex-start;
    gap: 30px;
    .user-img {
      img {
        width: 150px;
        height: 150px;
        object-fit: cover;
        border-radius: 50%;
      }
    }
    .user-basic__info {
      .name {
        color: rgb(68, 68, 68);
        text-transform: capitalize;
        font-size: 1.5rem;
        font-weight: 400px;
      }
      .profession {
        font-weight: 700;
        font-size: 1rem;
        padding: 5px 0px;
      }
      .email {
        font-weight: 400;
        font-size: 0.9rem;
      }
      .btn {
        margin: 15px 0px;
        a {
          background: $contrast-color;
          padding: 5px 20px;
          border: 0px;
          border-radius: 3px;
          color: #fff;
          text-transform: capitalize;
          font-size: 1rem;
          text-decoration: none;
          font-weight: 700;
        }
      }
    }
  }
  // details right 
  .details-right {
    border-left: 1px solid #1111;
    padding: 20px;
    max-width: 300px;
    .user-more__info {
      b {
        text-transform: capitalize;
        color: rgb(85, 84, 84);
      }
      div {
        padding: 5px 0px;
      }
    }
  }
}

// Media queries 
@media only screen and(max-width:950px) {
  .user-details {
    flex-wrap: wrap;
    .details-left {
      align-items: center;
      flex-wrap: wrap;
      justify-content: center;
      text-align: center;
    }
    .details-right {
      border: 0px;
      border-top: 1px solid #2222;
    }
  }
}
@media only screen and(max-width:500px) {
  .user-details {
    flex-wrap: wrap;
    .details-left {
      align-items: center;
      flex-wrap: wrap;
      justify-content: center;
      text-align: center;
    }
    .details-right {
      border: 0px;
      border-top: 1px solid #2222;
    }
  }
}
</style>
