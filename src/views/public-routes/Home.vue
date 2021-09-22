<template>
  <!-- Wraper  -->
  <div :class="{ wraper: true, 'wraper-active': loginModel }">
    <!-- Left side  -->
    <section class="left-side">
      <div class="news">
        <ul class="news-ul">
          <li v-for="(news, index) in newsData" :key="index">
            <img :src="newsData.media" class="poster" alt="" />
          </li>
        </ul>
      </div>
    </section>
    <!-- Docs  -->
    <section class="docs">
      <!-- Doc top  -->
      <div class="doc-top">
        <!-- Search  -->
        <div class="search">
          <!-- Search input  -->
          <input type="search" v-model="search" class="search-input" />
          <!-- Search butoon  -->
          <button class="search-btn">
            <i class="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
        <!-- Category  -->
        <div class="category">
          <!-- Category ul  -->
          <ul>
            <li class="active">feed</li>
            <li>latest</li>
            <li>top</li>
          </ul>
        </div>
      </div>
      <!-- Doc ul  -->
      <ul v-if="docData" class="doc-ul">
        <!-- Doc item -->
        <li class="doc-item" v-for="(doc, index) in docData" :key="index">
          <!-- Post top  -->
          <div class="post-top">
            <!-- Auther profile image  -->
            <div class="auther-pic">
              <img v-if="doc.profileimage" :src="doc.profileimage" alt="" />
              <img
                v-else
                src="@/assets/images/undraw_male_avatar_323b.svg"
                alt=""
              />
            </div>
            <!-- Auther  name & doc upload date  -->
            <div class="auther">
              <span class="name">{{ doc.username }}</span>
              <span class="date">{{
                new Date(doc.date)
                  .toISOString()
                  .slice(0, 10)
                  .replace(/-/g, "-")
              }}</span>
            </div>
          </div>
          <!-- Doc title  -->
          <div class="title">
            <router-link :to="`/doc?id=${doc.id}`"
              ><h1 class="doc-title">{{ doc.doctitle }}</h1></router-link
            >
          </div>
          <!-- Tags  -->
          <div class="tags">
            <span
              class="tag"
              v-for="(tag, index) in doc.doctags
                .substring(0, doc.doctags.length - 1)
                .split(',')"
              :key="index"
            >
              #{{ tag }}
            </span>
          </div>
          <!-- Post bottom  -->
          <div class="post-bottom">
            <!-- Reaction  -->
            <div class="reaction">
              <span
                :ref="likeBtnArray"
                @click="like"
                class="like"
                :data-id="doc.id"
                ><i class="fa fa-heart-o" aria-hidden="true"></i
              ></span>
              <span class="total-like">{{ doc.totallikes }}</span>
              <span>reaction</span>
            </div>
          </div>
        </li>
      </ul>
      <!-- Error message  -->
      <div v-if="errorMessage" class="error-message">
        <h1>{{ errorMessage }}</h1>
        <div class="not-found__img">
          <img src="@/assets/images/undraw_No_data_re_kwbl.svg" alt="" />
        </div>
      </div>
      <!-- Login model  -->
      <div v-if="loginModel" class="login-model">
        <div class="img">
          <img src="@/assets/images/undraw_male_avatar_323b.svg" alt="" />
        </div>
        <p class="question">please login first add your reaction</p>
        <div class="btn">
          <router-link to="/login">login</router-link>
          <span @click="cancelModel" class="exits-model">Cancel</span>
        </div>
      </div>
      <!-- Layer  -->
      <div v-if="loginModel" @click="cancelModel" class="layer"></div>
    </section>
    <!-- Right side  -->
    <section class="right-side"></section>
  </div>
</template>

<script>
import { computed, ref } from "@vue/reactivity";
import { onBeforeMount } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
  name: "Home",
  setup() {
    // Variables
    const store = useStore();
    const host = process.env.VUE_APP_HOST;
    const docData = ref(null);
    const newsData = ref(null);
    const search = ref(null);
    const errorMessage = ref(null);
    const loginModel = ref(null);
    const likeBtn = ref([]);
    // Functions
    // This function add like to doc
    const like = async (e) => {
      if (store.getters.currentToken != null) {
        const id = e.target.getAttribute("data-id");
        // Adding like to respected doc
        const response = await fetch(`${host}user/like?id=${id}`, {
          method: "GET",
          headers: new Headers({
            Authorization: store.getters.currentToken,
            "Content-Type": "application/x-www-form-urlencoded",
          }),
        });
        const data = await response.json();
        if (data.error == null && data.message == "Like added to doc") {
          e.target.firstElementChild.className = "";
          e.target.firstElementChild.classList.add("fa", "fa-heart");
          e.target.nextElementSibling.textContent =
            Number(e.target.nextElementSibling.textContent) + 1;
        } else if (
          data.error == null &&
          data.message == "Like deleted to doc"
        ) {
          e.target.firstElementChild.className = "";
          e.target.firstElementChild.classList.add("fa", "fa-heart-o");
          e.target.nextElementSibling.textContent =
            Number(e.target.nextElementSibling.textContent) - 1;
        } else {
          alert(data.errorMessage);
        }
      } else {
        loginModel.value = true;
      }
    };
    // This function cancel login model
    const cancelModel = async () => {
      loginModel.value = null;
    };
    // This function check if user liked any doc
    const checkIfLiked = async (docs) => {
      // Checking if user logged in
      if (store.getters.currentUserid != null) {
        // Extracting docs id
        const docids = ref([]);
        docs.forEach((doc) => {
          docids.value.push(doc.id);
        });
        // Fetching liked info
        const response = await fetch(
          `${process.env.VUE_APP_HOST}user/liked/${store.getters.currentUserid}?docids=${docids.value}`
        );
        const data = await response.json();
        docids.value = [];
        // Checking if error
        if (data.error == null) {
          likeBtn.value.forEach((item) => {
            if (
              data.liked.some(
                (like) => like["postid"] == item.getAttribute("data-id")
              )
            ) {
              item.firstElementChild.className = "";
              item.firstElementChild.classList.add("fa", "fa-heart");
            }
            docids.value = [];
          });
        }
      } else {
        likeBtn.value.forEach((item) => {
          item.firstElementChild.className = "";
          item.firstElementChild.classList.add("fa", "fa-heart-o");
        });
      }
    };
    // This function fetch docs from server
    const fetchingData = async () => {
      // Fetching docs
      const response = await fetch(`${process.env.VUE_APP_HOST}getdata`);
      const data = await response.json();
      // Checking if error
      if (data.error == null) {
        docData.value = data.docs;
        checkIfLiked(data.docs);
      } else {
        errorMessage.value = data.errorMessage;
      }
    };
    // This collect all span tags
    const likeBtnArray = (el) => {
      if (el) {
        likeBtn.value.push(el);
      }
    };
    // Life cycle
    onBeforeMount(async () => {
      fetchingData();
    });
    return {
      docData,
      newsData,
      errorMessage,
      search,
      host,
      loginModel,
      like,
      cancelModel,
      likeBtnArray,
    };
  },
};
</script>

<style lang="scss" scope>
.wraper {
  display: flex;
  justify-content: space-between;
  background: #f9f9f9;
  .left-side {
  }
  .docs {
    margin: 20px;
    margin-top: 50px;
    .doc-top {
      .search {
        display: inline-block;
        border: 1px solid #2222;
        border-radius: 3px;
        column-width: 750px;
        background: #fff;
        .search-input {
          padding: 10px;
          border: 0px;
          width: 95%;
          display: inline-block;
          &:focus {
            outline: 0px;
          }
        }
        .search-btn {
          border: 0px;
          background: #fff;
          display: inline-block;
          cursor: pointer;
          i {
            color: #000;
          }
        }
      }
      .category {
        ul {
          display: flex;
          gap: 20px;
          list-style: none;
          padding: 10px 0px;
          li {
            font-size: 1rem;
            color: #000;
            text-transform: capitalize;
          }
          .active {
            font-weight: 700;
          }
        }
      }
    }
    .doc-ul {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 20px;
      .doc-item {
        display: inline-block;
        max-width: 750px;
        column-width: 750px;
        background: #fff;
        padding: 10px;
        border: 1px solid #2222;
        .post-top {
          display: flex;
          gap: 10px;
          .auther-pic {
            img {
              width: 50px;
              border-radius: 50%;
            }
          }
          .auther {
            span {
              display: block;
            }
            .name {
              font-size: 1rem;
              text-transform: capitalize;
              font-weight: 700;
              padding-bottom: 5px;
            }
            .date {
              font-size: 0.8rem;
            }
          }
        }
        .title {
          a {
            text-decoration: none;
            h1 {
              font-size: 1rem;
              text-transform: capitalize;
              color: #000;
              padding: 10px 0px;
              line-height: 2rem;
              font-weight: 700;
            }
          }
        }
        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          padding: 5px 0px;
          .tag {
            @mixin random-bgr() {
              background: rgb(random(100), random(100), random(100));
            }
            color: #fff;
            padding: 5px 10px;
            border-radius: 3px;
            text-transform: capitalize;
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
        .post-bottom {
          .reaction {
            display: flex;
            gap: 5px;
            padding: 10px 5px;
            font-size: 0.8rem;
            span {
              display: block;
              padding: 5px;
            }
            .like {
              cursor: pointer;
              i {
                pointer-events: none;
              }
            }
          }
        }
      }
    }
    .error-message {
      border: 1px solid #2222;
      background: #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 20px;
      h1 {
        text-align: center;
        font-size: 2rem;
        text-transform: capitalize;
        font-weight: 700;
        padding: 10px;
      }
      .not-found__img {
        padding: 20px;
        max-width: 500px;
        img {
          width: 100%;
        }
      }
    }
    .login-model {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      text-align: center;
      max-width: 300px;
      padding: 50px 10px;
      margin: auto;
      background: #fff;
      border: 1px solid #5555;
      border-radius: 3px;
      position: absolute;
      top: 10vh;
      right: 5vw;
      left: 5vw;
      z-index: 3;
      .img {
        img {
          width: 100px;
        }
      }
      .question {
        text-transform: capitalize;
        font-size: 1rem;
        padding: 10px;
      }
      .btn {
        margin-top: 30px;
        a,
        span {
          text-decoration: none;
          background: yellow;
          color: #000;
          font-size: 1rem;
          font-weight: 400;
          text-transform: capitalize;
          padding: 5px 20px;
          margin: 10px;
          border: 1px solid #2222;
          cursor: pointer;
        }
      }
    }
    .layer {
      width: 200%;
      height: 100%;
      position: absolute;
      background: rgba(0, 0, 0, 0.5);
      display: block;
      top: 0;
      right: -50%;
      z-index: 2;
    }
  }
  .right-side {
  }
}
.wraper-active {
  position: relative;
  overflow: hidden;
}
// Media query
@media only screen and(max-width:360px) {
  .wraper {
    .docs {
      .doc-ul {
        .doc-item {
          .title {
            a {
              h1 {
                font-size: 0.9rem;
                line-height: 1.6rem;
              }
            }
          }
          .tags {
          }
        }
      }
    }
  }
}
</style>
