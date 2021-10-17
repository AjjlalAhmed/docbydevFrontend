<template>
  <!-- News  -->
  <div class="news">
    <!-- Intro  -->
    <div class="intro">
      <h1 class="intro-heading">
        latest news
      </h1>
    </div>
    <!-- News ul  -->
    <ul v-if="allNews.length != 0" class="news-ul">
      <li v-for="news in allNews" :key="news.id">
        <div class="headline">
          <a target="blank" :href="news.link">{{ news.headline }}</a>
        </div>
        <div class="summary">
          <p>{{ news.summary }}</p>
        </div>
      </li>
    </ul>
    <!-- Loading animation  -->
    <SkeletonLoading class="loading" v-if="allNews.length == 0" />
  </div>
  <!-- News  -->
</template>

<script>
// Importing thing we need
import { ref } from "@vue/reactivity";
import { onBeforeMount } from "@vue/runtime-core";
import SkeletonLoading from "../../components/SkeletonLoading.vue";
import { useRoute } from "vue-router";
export default {
  name: "Jobs",
  components: { SkeletonLoading },
  setup() {
    // Variables
    const allNews = ref([]);
    const route = useRoute();

    //   Life cycle
    onBeforeMount(async () => {
      // Fetching news
      const response = await fetch(
        "https://getfreenews.herokuapp.com/api/getnews"
      );
      const data = await response.json();
      // Checking id error
      if (data.status == 200) {
        data.news.forEach((item) => {
          allNews.value.push({
            id: item.id,
            category: item.category,
            headline: item.headline,
            link: item.link,
            summary: item.summary,
          });
        });
      }
    });
    return { allNews };
  },
};
</script>

<style lang="scss" scoped>
// news
.news {
  max-width: 1000px;
  column-width: 1000px;
  margin-top: 50px;
  // intro
  .intro {
    margin: 0px 10px;
    padding: 10px;
    background: #d9eaf5;
    .intro-heading {
      font-size: 2rem;
      color: $black;
      text-transform: capitalize;
    }
  }
  // news ul
  .news-ul {
    list-style: none;
    background: #fff;
    padding: 10px;
    margin: 20px 10px;
    border: 1px solid #3333;
    border-radius: 3px;
    li {
      border-bottom: 1px solid #3333;
      border-radius: 3px;
      padding: 10px;
      margin: 10px;
      .headline {
        a {
          text-decoration: none;
          font-size: 1.2rem;
          color: $black;
          font-weight: 700;
        }
      }
      .summary {
        p {
          font-size: 1rem;
        }
      }
    }
  }
  // Loading
  .loading {
    background: #fff;
    margin: 20px;
    padding: 20px;
  }
}
// feed
.feed {
  max-width: 300px;
}

// Mediad query 
@media only screen and(max-width:750px) {
  .news {
    margin-top: 25px;
    .intro {
      margin-top: 0px;
    }
  }
  .feed {
    margin: 0 auto;
  }
}
</style>
