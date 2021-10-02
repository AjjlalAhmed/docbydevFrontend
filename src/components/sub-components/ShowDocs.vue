<template>
  <!-- Wraper  -->
  <div :class="{ showdoc: true, 'bg-active': route.name == 'Home' }">
    <!-- Docs  -->
    <section class="docs">
      <!-- Doc top  -->
      <div
        :class="{
          'doc-top': true,
          'on-home': route.name == 'Home',
          'doc-top__userprofile': route.name == 'UserProfile',
        }"
      >
        <!-- Search  -->
        <div class="search">
          <!-- Search input  -->
          <input
            type="search"
            v-model="search"
            placeholder="Search "
            class="search-input"
          />
          <!-- Search butoon  -->
          <button class="search-btn">
            <i class="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
        <!-- Category  -->
        <div class="category">
          <!-- Category ul  -->
          <ul>
            <li @click="changeCategory('feed')" :ref="categoryItemArray">
              feed
            </li>
            <li @click="changeCategory('latest')" :ref="categoryItemArray">
              latest
            </li>
            <li @click="changeCategory('top')" :ref="categoryItemArray">top</li>
          </ul>
        </div>
      </div>
      <!-- Doc ul  -->
      <ul
        v-if="docData != 'Empty'"
        :class="{ 'doc-ul': true, 'on-home': route.name == 'Home' }"
      >
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
            <div
              :class="{
                auther: true,
                'user-profile__active': route.name == 'UserProfile',
              }"
            >
              <router-link
                v-if="route.name != 'UserProfile'"
                :to="`/profile?id=${doc.userid}`"
                class="name"
                >{{ doc.username }}</router-link
              >
              <span class="date">{{ Moment(doc.date).format("llll") }}</span>
              <ul v-if="route.name == 'UserProfile'" class="more-option">
                <li @click="showEllipsis(index)" ref="ellipsis">
                  <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                  <ul :ref="ellipsisArray">
                    <li
                      @click="showDeleteDocModel(doc.id, doc.doctitle, index)"
                    >
                      <i class="fa fa-trash" aria-hidden="true"></i> delete
                    </li>
                    <router-link :to="`/user/editdoc?docid=${doc.id}`">
                      <i class="fa fa-pencil" aria-hidden="true"></i>
                      edit</router-link
                    >
                  </ul>
                </li>
              </ul>
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
      <div v-if="errorMessage || docData == 'Empty'" class="error-message">
        <h1>Docs not found</h1>
        <div class="not-found__img">
          <img src="@/assets/images/undraw_No_data_re_kwbl.svg" alt="" />
        </div>
      </div>
      <!-- Login model  -->

      <!-- Layer  -->
      <div v-if="loginModel || deleteModel" @click="cancelModel" class="layer">
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
        <div v-if="deleteModel" class="delete-model">
          <div class="img">
            <img
              v-if="store.getters.currentProfileimage"
              :src="store.getters.currentProfileimage"
              alt=""
            />
            <img
              v-else
              src="@/assets/images/undraw_male_avatar_323b.svg"
              alt=""
            />
          </div>

          <p class="question">
            This action cannot be undone. This will permanently delete the
            <b v-if="deletingDocName.length >= 30"
              ><abbr :title="deletingDocName"
                >{{ deletingDocName.slice(0, 30) }}...</abbr
              ></b
            >
            doc.Are you sure about
            <b v-if="deletingDocName.length < 30"
              ><abbr :title="deletingDocName">{{
                deletingDocName.slice(0, 30)
              }}</abbr></b
            >
            doc.Are you sure about deleting
          </p>
          <div class="btn">
            <span @click="deleteDoc" class="exits-model">delete</span>
            <span @click="cancelModel" class="exits-model">Cancel</span>
          </div>
        </div>
      </div>
    </section>
  </div>
  <!-- Wraper  -->
</template>

<script>
import { ref, watch } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import moment from "moment";
export default {
  name: "ShowDocs",
  props: ["docs"],
  setup(props) {
    //   Variables
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const likeBtn = ref([]);
    const ellipsis = ref([]);
    const categoryItem = ref([]);
    const docData = ref(props.docs);
    const docid = ref(null);
    const host = process.env.VUE_APP_HOST;
    const loginModel = ref(null);
    const deleteModel = ref(null);
    const deletingDocName = ref(null);
    const search = ref(null);
    const errorMessage = ref(null);
    const Moment = moment;
    Moment.suppressDeprecationWarnings = true;
    //   Function
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
          e.target.firstElementChild.style.color = "#ec4d37";
          e.target.nextElementSibling.textContent =
            Number(e.target.nextElementSibling.textContent) + 1;
        } else if (
          data.error == null &&
          data.message == "Like deleted to doc"
        ) {
          e.target.firstElementChild.className = "";
          e.target.firstElementChild.classList.add("fa", "fa-heart-o");
          e.target.firstElementChild.style.color = "#000";
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
      loginModel.value = false;
      deleteModel.value = false;
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
          const likedPostIds = ref([]);
          data.liked.forEach((item) => {
            likedPostIds.value.push(item.postid);
          });
          likeBtn.value.forEach((item, index) => {
            item.firstElementChild.className = "";
            item.firstElementChild.classList.add("fa", "fa-heart-o");
            item.firstElementChild.style.color = "#000";
          });
          likeBtn.value.forEach((item, index) => {
            if (
              likedPostIds.value.includes(Number(item.getAttribute("data-id")))
            ) {
              item.firstElementChild.className = "";
              item.firstElementChild.classList.add("fa", "fa-heart");
              item.firstElementChild.style.color = "#ec4d37";
            }
          });
        }
      } else {
        likeBtn.value.forEach((item) => {
          item.firstElementChild.className = "";
          item.firstElementChild.classList.add("fa", "fa-heart-o");
          item.firstElementChild.style.color = "#000";
        });
      }
    };
    // This collect all span tags
    const likeBtnArray = (el) => {
      if (el) {
        likeBtn.value.push(el);
      }
    };
    // This collect all ul tags
    const ellipsisArray = (el) => {
      if (el) {
        ellipsis.value.push(el);
      }
    };
    // This collect all ul tags
    const categoryItemArray = (el) => {
      if (el) {
        categoryItem.value.push(el);
      }
    };
    // This show & hide ellipsis
    const showEllipsis = (index) => {
      // close dropdown if open and stop function execution
      if (ellipsis.value[index].classList.contains("ellipsis")) {
        ellipsis.value[index].classList.remove("ellipsis");
        return;
      }
      // close all dropdown if open
      ellipsis.value.forEach((item, itemIndex) => {
        item.className = "";
      });
      // finally open dropdown if dropdown was not open
      if (!ellipsis.value[index].classList.contains("ellipsis")) {
        ellipsis.value[index].classList.add("ellipsis");
      }
    };
    // This function delete doc
    const deleteDoc = async () => {
      const response = await fetch(`${host}user/deletedoc?id=${docid.value}`, {
        method: "Delete",
        headers: new Headers({
          Authorization: store.getters.currentToken,
          "Content-Type": "application/x-www-form-urlencoded",
        }),
      });
      const data = await response.json();
      if (data.error == null) {
        router.go();
      }
    };
    // This function show and hide delete doc model
    const showDeleteDocModel = async (id, name, index) => {
      deletingDocName.value = name;
      deleteModel.value = !deleteModel.value;
      docid.value = id;
    };
    const changeCategory = async (category) => {
      const response = await fetch(`${host}getdoc?category=${category}`);
      const data = await response.json();
      if (data.error == null) {
        likeBtn.value = [];
        docData.value = null;
        docData.value = data.docs;
        checkIfLiked(data.docs);
      } else {
        errorMessage.value = props.docs;
      }
    };
    if (
      docData.value != null &&
      docData.value != "null" &&
      docData.value != "Empty"
    ) {
      checkIfLiked(docData.value);
    }
    // Checkinh if docs
    if (props.docs == "Empty") {
      errorMessage.value = props.docs;
    }
    // Watcher
    watch(
      () => props.docs,
      () => {
        if (props.docs == "Empty") {
          errorMessage.value = props.docs;
        } else {
          docData.value = props.docs;
          checkIfLiked(props.docs);
        }
      }
    );
    return {
      docData,
      errorMessage,
      search,
      host,
      loginModel,
      likeBtnArray,
      like,
      cancelModel,
      checkIfLiked,
      route,
      Moment,
      store,
      ellipsisArray,
      showEllipsis,
      showDeleteDocModel,
      deleteModel,
      deletingDocName,
      deleteDoc,
      categoryItemArray,
      changeCategory,
    };
  },
};
</script>

<style lang="scss" scoped>
.showdoc {
  .docs {
    .doc-top {
      display: flex;
      flex-direction: column;
      max-width: 1000px;
      margin: 50px auto;
      .search {
        display: inline-block;
        border: 1px solid #2222;
        border-radius: 3px;
        max-width: 1000px;
        column-width: 1000px;
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
            color: $secondary-color;
          }
        }
      }
      .category {
        ul {
          display: flex;
          align-items: center;
          text-align: center;
          gap: 20px;
          list-style: none;
          padding: 10px 0px;
          li {
            font-size: 1rem;
            color: $secondary-color;
            text-transform: capitalize;
            cursor: pointer;
          }
          .active {
            font-weight: 700;
          }
        }
      }
      .show-docs__heading {
        font-size: 1.5rem;
        text-transform: capitalize;
        font-weight: 700;
        padding: 10px 0px;
      }
    }
    .doc-top__userprofile {
      background: #fff;
      border: 1px solid #2222;
      border-radius: 3px;
      padding: 20px;
    }
    .doc-ul {
      list-style: none;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      .doc-item {
        display: inline-block;
        max-width: 1000px;
        column-width: 1000px;
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
            display: flex;
            flex-direction: column;
            span {
              display: block;
            }
            .name {
              font-size: 1rem;
              text-transform: capitalize;
              font-weight: 700;
              padding-bottom: 5px;
              text-decoration: none;
              display: block;
              color: $secondary-color;
            }
            .date {
              font-size: 0.8rem;
            }
          }
          .user-profile__active {
            width: 100%;
            flex-direction: row;
            justify-content: space-between;
            .date {
              padding: 10px 0px;
            }
            .more-option {
              padding: 0px;
              margin: 0;
              list-style: none;
              position: relative;
              li {
                color: $primary-color;
                cursor: pointer;
                padding: 10px;
                i {
                  font-size: 1.2rem;
                  pointer-events: none;
                }
                ul {
                  display: none;
                  list-style: none;
                  background: #fff;
                  border: 1px solid #2222;
                  border-radius: 3px;
                  padding: 5px;
                  position: absolute;
                  right: 10px;
                  width: 150px;
                  z-index: 5;
                  li,
                  a {
                    font-size: 1rem;
                    color: $secondary-color;
                    text-transform: capitalize;
                    font-weight: 900;
                    letter-spacing: 1px;
                    transition: 0.1s ease-in-out;
                    text-decoration: none;
                    display: block;
                    padding: 10px;
                    &:hover {
                      background: rgba(94, 93, 93, 0.067);
                    }
                    i {
                      font-size: 0.9rem;
                    }
                  }
                  li:first-child {
                    border-bottom: 1px solid #2222;
                  }
                }
                .ellipsis {
                  display: block;
                }
              }
            }
          }
        }
        .title {
          a {
            text-decoration: none;
            h1 {
              font-size: 1.5rem;
              text-transform: capitalize;
              color: $secondary-color;
              padding: 10px 0px;
              line-height: 2rem;
              font-weight: 900;
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
            font-weight: 700;
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
            padding: 10px 5px;
            font-size: 1rem;
            text-transform: capitalize;
            font-weight: 900;
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
      border: 1px solid #1111;
      background: #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 20px;
      max-width: 1000px;
      margin: auto;
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
    .login-model,
    .delete-model {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      text-align: center;
      max-width: 350px;
      padding: 50px 10px;
      margin: auto;
      background: #fff;
      border: 1px solid #5555;
      border-radius: 3px;
      position: absolute;
      top: 30vh;
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
        b {
          color: $primary-color;
        }
      }
      .btn {
        margin-top: 30px;
        a,
        span {
          text-decoration: none;
          background: $primary-color;
          color: #fff;
          font-size: 1rem;
          font-weight: 700;
          text-transform: capitalize;
          padding: 5px 20px;
          margin: 10px;
          border: 0px;
          border-radius: 3px;
          cursor: pointer;
        }
      }
    }
    .layer {
      width: 200%;
      height: 100%;
      position: fixed;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      top: 0;
      right: -50%;
      z-index: 2;
    }
  }
}
.on-home {
  align-items: center;
}
@media only screen and(max-width:360px) {
  .showdoc {
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
