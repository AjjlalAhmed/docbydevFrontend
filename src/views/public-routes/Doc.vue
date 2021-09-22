<template>
  <div class="wraper">
    <section class="left"></section>
    <section v-if="docData" class="doc">
      <div class="doc-top">
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
            #{{ tag }}
          </span>
        </div>
        <div class="auther">
          <div class="auther-pic">
            <img
              v-if="docData.profileimage"
              :src="docData.profileimage"
              alt=""
            />
            <img
              v-else
              src="@/assets/images/undraw_male_avatar_323b.svg"
              alt=""
            />
          </div>
          <p class="name">{{ docData.username }}</p>
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
      <div class="doc-html" v-html="converter.makeHtml(docData.docdata)"></div>
    </section>
    <section class="right"></section>
  </div>
</template>

<script>
import { onBeforeMount, ref } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import showdown from "showdown";
import higlightJS from "highlight.js";
export default {
  name: "Doc",
  setup() {
    const ShowdownService = showdown;
    const HljsService = higlightJS;
    const converter = new ShowdownService.Converter();
    const route = useRoute();
    const router = useRouter();
    const docData = ref(null);
    const id = ref(route.query.id);
    onBeforeMount(async () => {
      const response = await fetch(
        `${process.env.VUE_APP_HOST}getdata/${id.value}`
      );
      const data = await response.json();
      if (data.error == null) {
        docData.value = data.docs[0];
        console.log(data.docs[0]);
        setTimeout(() => {
          const aCodes = document.getElementsByTagName("pre");
          for (var i = 0; i < aCodes.length; i++) {
            HljsService.highlightBlock(aCodes[i]);
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

<style lang="scss" scope>
.wraper {
  display: flex;
  justify-content: space-between;
  .left {
  }
  .doc {
    flex: 2;
    max-width: 850px;
    margin: 20px auto;
    border: 1px solid #2222;
    padding: 50px;
    border-radius: 5px;
    .doc-top {
      .title {
        font-size: 2rem;
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
          @mixin random-bgr() {
            background: rgb(random(100), random(100), random(100));
          }
          color: #fff;
          padding: 5px;
          border-radius: 3px;
          text-transform: capitalize;
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
      .auther {
        display: flex;
        align-items: center;
        gap: 20px;
        flex-wrap: wrap;
        .auther-pic {
          img {
            width: 50px;
          }
        }
        .name {
          text-transform: capitalize;
          font-size: 1rem;
          font-weight: 700;
        }
        .date {
          text-transform: capitalize;
          font-size: 0.8rem;
          font-weight: 400;
        }
      }
    }
    .doc-html {
      p {
        padding: 5px 0px;
        font-size: 1rem;
        color: #000;
        line-height: 1.5rem;
        code{
          display: inline-block;
          white-space: normal;
          word-break: break-all;
          word-wrap: break-word;
        }
      }
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        padding: 10px 0px;
        font-weight: 900;
      }
      img {
        width: 100%;
      }
      pre {
        padding: 10px;
        border-radius: 5px;
        overflow: auto;
        width: 100%;
      }
      iframe{
        width: 100%;
      }
      strong{
        display: inline-block;
      }
      a{
        display: inline-block;
      }
    }
  }
  .right {
  }
}
@media only screen and(max-width:1320px) {
  .wraper {
    .left {
      display: none;
    }
    .right {
      display: none;
    }
  }
}
@media only screen and(max-width:790px) {
  .wraper {
    .doc {
      padding: 30px;
      max-width: 100%;
    }
  }
}
@media only screen and(max-width:520px) {
  .wraper {
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
}
</style>
