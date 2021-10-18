<template>
  <!-- Doc  -->
  <section class="doc">
    <!-- Back  -->
    <div class="back">
      <router-link class="back-btn" to="/">
        <i class="fa fa-angle-left" aria-hidden="true"></i>
        back to explore
      </router-link>
    </div>
    <!-- Doc top  -->
    <div v-if="docData" class="doc-top">
      <h1 class="title">
        {{ docData.doctitle }}
      </h1>
      <div class="tags">
        <span
          class="tag"
          v-for="(tag, index) in docData.doctags
            .substring(0, docData.doctags.length - 1)
            .split(',')"
          :key="index"
        >
          {{ tag }}
        </span>
      </div>
      <div class="auther">
        <div class="auther-pic">
          <img
            v-if="docData.profileimage"
            :src="
              'https://drive.google.com/uc?export=view&id=' +
                docData.profileimage
            "
            alt=""
          />
          <img
            v-else
            src="@/assets/images/undraw_male_avatar_323b.svg"
            alt=""
          />
        </div>
        <p class="name">
          <router-link :to="`profile?id=${docData.userid}`">{{
            docData.username
          }}</router-link>
        </p>
        <p class="date">
          {{
            new Date(docData.date)
              .toISOString()
              .slice(0, 10)
              .replace(/-/g, "-")
          }}
        </p>
      </div>
    </div>
    <!-- Doc data  -->
    <div
      v-if="docData"
      class="doc-html"
      v-html="converter.makeHtml(docData.docdata)"
    ></div>
        <!-- Loading animation  -->
    <SkeletonLoading :isDoc="true" v-if="!docData" />
  </section>
  
  <!-- Doc  -->
</template>

<script>
// Importing thing we need  
import { onBeforeMount, ref } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import showdown from "showdown";
import Loading from "../components/Loading.vue";
import SkeletonLoading from "../components/SkeletonLoading.vue" 
import higlightJS from "highlight.js";
export default {
  name: "Doc",
  components: { Loading,SkeletonLoading },
  setup() {
    // Variables
    const ShowdownService = showdown;
    const HljsService = higlightJS;
    const converter = new ShowdownService.Converter();
    const route = useRoute();
    const router = useRouter();
    const docData = ref(null);
    const id = ref(route.query.id);

    //  Life cycle
    onBeforeMount(async () => {
      // Fetching doc data 
      const response = await fetch(
        `${process.env.VUE_APP_HOST}getdoc/${id.value}`
      );
      const data = await response.json();
      // Checking if error 
      if (data.error == null) {
        docData.value = data.docs[0];
        setTimeout(() => {
          const pre = document.getElementsByTagName("pre");
          for (var i = 0; i < pre.length; i++) {
            HljsService.highlightBlock(pre[i]);
          }
        }, 200);
      } else {
        router.push("/");
      }
    });
    return { docData, converter };
  },
};
</script>

<style lang="scss" scoped>
// doc 
.doc {
  max-width: 1000px;
  column-width: 1000px;
  margin: 50px 10px;
  border: 1px solid #2222;
  padding: 50px;
  border-radius: 5px;
  background: #fff;
  // Back  
  .back {
    max-width: 1000px;
    margin: auto;
    margin-bottom: 20px;
    .back-btn {
      font-size: 1rem;
      color: rgb(88, 87, 87);
      text-transform: capitalize;
      text-decoration: none;
    }
  }
  // doc top 
  .doc-top {
    .title {
      font-size: 2.5rem;
      font-weight: 900;
      text-transform: capitalize;
      line-height: 2.8rem;
    }
    .tags {
      display: flex;
      gap: 10px;
      padding: 10px 0px;
      flex-wrap: wrap;
      .tag {
        color: $black;
        padding: 5px;
        border-radius: 3px;
        text-transform: capitalize;
        text-transform: capitalize;
        font-size: 0.9rem;
        border: 1px solid #3333;
        font-family: "Inconsolata", monospace;
      }
    }
    .auther {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
      .auther-pic {
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
        }
      }
      .name {
        a {
          text-transform: capitalize;
          font-size: 1rem;
          font-weight: 700;
          text-decoration: none;
          color: $black;
        }
      }
      .date {
        text-transform: capitalize;
        font-size: 0.8rem;
        font-weight: 400;
      }
    }
  }
  // doc html 
  .doc-html :deep(p) {
    padding: 5px 0px;
    font-size: 1.1rem;
    line-height: 1.9rem;
    letter-spacing: 1px;
    word-wrap: break-word;
    white-space: normal;
  }
  .doc-html :deep(pre) {
    padding: 10px;
    overflow: auto;
    font-family: "Inconsolata", monospace;
    font-weight: 400;
    line-height: 1.8rem;
    letter-spacing: 1px;
  }
  .doc-html :deep(code) {
    padding: 10px;
    overflow: scroll;
  }
  @for $i from 1 through 6 {
    .doc-html :deep(h#{$i}) {
      padding: 10px 0px;
      font-weight: 900;
    }
  }
  .doc-html :deep(img) {
    width: 100%;
  }
  .doc-html :deep(iframe) {
    width: 100%;
  }
  .doc-html :deep(strong) {
    display: inline-block;
  }
  .doc-html :deep(a) {
    display: inline-block;
    font-size: 1.1rem;
    line-height: 1.9rem;
  }
  .doc-html :deep(li) {
    padding: 5px 0px;
    font-size: 1.1rem;
  }
}
// Loading 
.loading {
  margin-top: 200px;
}

// Media queries
@media only screen and(max-width:790px) {
  .doc {
    padding: 30px;
    max-width: 100%;
  }
}
@media only screen and(max-width:520px) {
  .doc {
    padding: 10px;
    max-width: 100%;
    .doc-top {
      .title {
        font-size: 1.5rem;
        line-height: 2rem;
      }
      .tags {
        flex-wrap: wrap;
      }
      .auther {
        flex-wrap: wrap;
      }
    }
  }
}
</style>
