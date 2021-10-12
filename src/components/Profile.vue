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
    <!-- User details  -->
    <UserDetails v-if="user" :details="user" />
    <!-- More details  -->
    <div v-if="user" class="more-details">
      <div class="about">
        <h1 class="about-heading">about</h1>
        <p v-if="user.bio && user.bio != 'null'" class="about-text">
          <router-link v-if="route.name != 'Profile'" to="/user/editprofile"
            ><i class="fa fa-pencil" aria-hidden="true"></i>
          </router-link>
          {{ user.bio }}
        </p>
        <p v-else class="about-text">
          <router-link v-if="route.name != 'Profile'" to="/user/editprofile"
            ><i class="fa fa-pencil" aria-hidden="true"></i>
          </router-link>
          Hi my name is {{ user.name }} and i'm new here
        </p>
      </div>
      <div class="skills">
        <h1 class="skills-heading">skills</h1>
        <ul v-if="user.skills && user.skills != 'null'">
          <li v-for="(skill, index) in user.skills.split(',')" :key="index">
            #{{ skill }}
          </li>
        </ul>
        <p v-else>N/A</p>
        <router-link v-if="route.name != 'Profile'" to="/user/editprofile">
          <i class="fa fa-plus" aria-hidden="true"></i> add skills
        </router-link>
      </div>
    </div>
    <!-- Docs  -->
    <div class="docs">
      <ShowDocs v-if="docs" :docs="docs" />
    </div>
  </div>
  <!-- Wraper  -->
</template>

<script>
import { ref } from "@vue/reactivity";
import ShowDocs from "./sub-components/ShowDocs.vue";
import UserDetails from "./sub-components/UserDetails.vue";
import { watch } from "@vue/runtime-core";
import { useRoute } from "vue-router";
export default {
  name: "Profile",
  props: ["docs", "user"],
  components: { ShowDocs, UserDetails },
  setup(props) {
    // Variables
    const route = useRoute();
    const docs = ref(null);
    const user = ref(props.user);
    // Checking if docs 
    if (props.docs == "Empty") {
      docs.value = props.docs;
    } else {
      docs.value = props.docs;
    }
    // Watchers
    watch(
      () => props.docs,
      () => {
        if (props.docs == "Empty") {
          docs.value = props.docs;
        } else {
          docs.value = props.docs;
        }
      }
    );
    watch(
      () => props.user,
      () => {
        user.value = props.user;
      }
    );
    return { route, docs, user };
  },
};
</script>

<style lang="scss" scoped>
.wraper {
  padding: 50px;
  .back {
    max-width: 1000px;
    margin: auto;
    .back-btn {
      font-size: 1rem;
      color: rgb(88, 87, 87);
      text-transform: capitalize;
      text-decoration: none;
    }
  }
  .more-details {
    max-width: 1000px;
    column-width: 1000px;
    border: 1px solid #2222;
    background: #fff;
    padding: 20px;
    margin: 50px auto;
    .about {
      border-bottom: 1px solid #3333;
      padding-bottom: 30px;
      .about-heading {
        font-size: 1.5rem;
        text-transform: capitalize;
        font-weight: 700;
        padding: 10px 0px;
      }
      .about-text {
        font-size: 0.9rem;
        color: rgb(85, 84, 84);
        line-height: 1.6rem;
        i {
          font-size: 1.2rem;
          padding: 5px;
        }
      }
    }
    .skills {
      padding-top: 20px;
      padding-bottom: 10px;
      .skills-heading {
        font-size: 1.5rem;
        text-transform: capitalize;
        font-weight: 700;
        padding: 15px 0px;
      }
      ul {
        display: flex;
        gap: 15px;
        flex-wrap: wrap;
        list-style: none;
        padding: 10px 0px;
        @mixin random-bgr() {
          background: rgb(random(100), random(100), random(100));
        }
        li {
          color: #fff;
          padding: 5px 10px;
          border-radius: 3px;
          text-transform: uppercase;
          font-size: 0.8rem;
          $num-colors: 100;
          $base-color: #996b4d;
          $spectrum: 360deg;
          $offset: 50deg;
          @for $i from 0 to $num-colors {
            &:nth-child(#{$i}) {
              @include random-bgr();
            }
          }
        }
      }
      a {
        text-transform: capitalize;
        font-size: 1rem;
        text-decoration: none;
        color: rgb(112, 111, 111);
      }
    }
  }
  .docs {
    max-width: 1000px;
    margin: auto;
    .show-docs__heading {
      font-size: 1.5rem;
      text-transform: capitalize;
      font-weight: 700;
      padding: 10px 0px;
    }
  }
}
// Media query
@media only screen and(max-width:500px) {
  .wraper {
    padding: 10px;
  }
}
</style>
