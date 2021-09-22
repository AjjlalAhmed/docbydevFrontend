<template>
  <div class="wraper">
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
  </div>
</template>

<script>
import { ref, watch } from "@vue/runtime-core";
export default {
  name: "ShowDocs",
  props: ["docs"],
  setup(props) {
    //   Variables
    const docData = ref(props.docs);
    const likeBtn = ref([]);
    //   Function
    // This collect all span tags
    const likeBtnArray = (el) => {
      if (el) {
        likeBtn.value.push(el);
      }
    };
    // Watcher
    watch(
      () => props.docs,
      () => {
        docData.value = props.docs;
      }
    );
    return { docData,likeBtnArray };
  },
};
</script>

<style lang="scss">
.wraper {
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
}
@media only screen and(max-width:360px) {
  .wraper {
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
</style>
