<template>
  <!-- Additional feed  -->
  <div :class="{ 'additional-feed': true, active: active }">
    <!-- Jobs list  -->
    <ul v-if="jobs.length != 0 && showJobs" class="jobs-list">
      <li v-if="route.name != 'Jobs'" class="heading">Jobs</li>
      <li v-for="job in jobs" :key="job.id">
        <div class="company">
          <div class="image">
            <img :src="job.companyImage" alt="" />
          </div>
          <div class="job-details">
            <h3 class="company">{{ job.companyName }}</h3>
            <h2 class="position">{{ job.jobPosition }}</h2>
          </div>
        </div>
        <div class="more-details">
          <h3 class="location">
            {{ job.jobLocation }}
          </h3>
          <h3 class="salary">
            {{ job.salary }}
          </h3>
        </div>
        <div class="job-tags">
          <span
            class="tag"
            v-for="(tag, tagsIndex) in job.tags.split(',')"
            :key="tagsIndex"
          >
            {{ tag }}
          </span>
        </div>
        <div class="bottom">
          <a target="blank" :href="job.applyUrl">apply</a>
          <p>
            <i class="fa fa-thumb-tack" aria-hidden="true"></i>
            {{ Moment(job.time, "YYYYMMDD").fromNow() }}
          </p>
        </div>
      </li>
    </ul>
    <!-- Loading animation  -->
    <SkeletonLoading v-if="jobs.length == 0 && route.name != 'Jobs'" />
    <!-- News list  -->
    <ul v-if="allNews.length != 0 && showNews" class="news-list">
      <li class="heading">News</li>
      <li v-for="news in allNews" :key="news.id">
        <a class="headline" target="blank" :href="news.link">
          {{ news.headline }}
        </a>
      </li>
    </ul>
    <!-- Loading animation  -->
    <SkeletonLoading v-if="allNews.length == 0 && route.name != 'News'" />
  </div>
  <!-- Addtional feed  -->
</template>

<script>
// Importing thing we need
import { ref } from "@vue/reactivity";
import { onBeforeMount, watch } from "@vue/runtime-core";
import moment from "moment";
import { useRoute } from "vue-router";
import SkeletonLoading from "../components/SkeletonLoading.vue";
export default {
  name: "AdditionalFeed",
  props: ["showJobs", "showNews", "active"],
  components: { SkeletonLoading },
  setup(props) {
    // Variables 
    const jobs = ref([]);
    const allNews = ref([]);
    const route = useRoute();
    const Moment = moment;
    const showJobs = ref(props.showJobs);
    const showNews = ref(props.showNews);
    const active = ref(props.active);
    Moment.suppressDeprecationWarnings = true;

    // Life cycle
    onBeforeMount(async () => {
      // Fetching jobs
      (async () => {
        const response = await fetch(
          "https://getremotejob.herokuapp.com/api/getjobs"
        );
        const data = await response.json();
        if (data.status == 200) {
          const filterData = ref(data.jobsList);
          if (route.name != "Jobs")
            filterData.value = filterData.value.slice(0, 5);
          filterData.value.forEach((item) => {
            jobs.value.push({
              id: item.id,
              companyName: item.company_name,
              companyImage: item.company_image,
              jobLocation: item.job_location,
              jobPosition: item.job_position,
              salary: item.job_salary,
              tags: item.job_tags,
              time: item.time,
              applyUrl: item.apply_url,
            });
          });
        }
      })();
      // Fetching news
      (async () => {
        const response = await fetch(
          "https://getfreenews.herokuapp.com/api/getnews"
        );
        const data = await response.json();
        if (data.status == 200) {
          const filterData = ref(data.news);
          if (route.name != "Jobs")
            filterData.value = filterData.value.slice(0, 25);
          filterData.value.forEach((item) => {
            allNews.value.push({
              id: item.id,
              category: item.category,
              headline: item.headline,
              link: item.link,
              summary: item.summary,
            });
          });
        }
      })();
    });

    // Watchers
    watch(
      () => props.showJobs,
      () => {
        showJobs.value = props.showJobs;
      }
    );
    watch(
      () => props.showNews,
      () => {
        showNews.value = props.showNews;
      }
    );
    return {
      jobs,
      route,
      Moment,
      allNews,
      showJobs,
      showNews,
      active,
    };
  },
};
</script>

<style lang="scss" scoped>
// additional feed
.additional-feed {
  max-width: 300px;
  margin: 0px 5px;
  margin-top: 50px;
  .jobs-list {
    list-style: none;
    li {
      display: flex;
      flex-wrap: wrap;
      border: 1px solid #3333;
      margin-bottom: 20px;
      border-radius: 3px;
      padding: 0px 10px;
      padding-top: 10px;
      background: #fff;
      .company {
        display: flex;
        gap: 5px;
        .image {
          img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: 1px solid #2222;
          }
        }
        .job-details {
          .company {
            font-size: 0.9rem;
            text-transform: capitalize;
            font-weight: 700;
            text-transform: capitalize;
            padding-bottom: 5px;
          }
          .position {
            font-size: 1rem;
            text-transform: capitalize;
            font-family: "Inconsolata", monospace;
            font-weight: 400;
          }
        }
      }
      .more-details {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
        margin: 10px 0px;
        .location,
        .salary {
          display: table;
          padding: 5px 10px;
          border-radius: 3px;
          color: #000;
          border: 1px solid #3333;
          font-size: 0.8rem;
        }
      }
      .job-tags {
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
        span {
          padding: 5px;
        }
        .tag {
          color: #000;
          border: 1px solid #3333;
          padding: 5px 10px;
          border-radius: 3px;
          text-transform: capitalize;
          font-family: "Inconsolata", monospace;
          font-weight: 400;
          letter-spacing: 1px;
          font-size: 0.8rem;
        }
      }
      .bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        a {
          padding: 5px 20px;
          background: $primary-color;
          border-radius: 3px;
          color: #fff;
          text-transform: capitalize;
          margin: 10px 0px;
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 700;
        }
        p {
          font-size: 0.9rem;
          text-transform: capitalize;
          font-family: "Inconsolata", monospace;
          font-weight: 400;
          i {
            color: $contrast-color;
          }
        }
      }
    }
    .heading {
      display: block;
      text-transform: uppercase;
      padding: 5px;
      margin: 0;
      font-size: 1.5rem;
      font-weight: 400;
      color: $black;
      border: none;
      background: transparent;
    }
  }
  .news-list {
    list-style: none;
    padding-top: 10px;
    li {
      border-radius: 3px;
      padding: 10px;
      margin-bottom: 10px;
      border-bottom: 1px solid #3333;
      .category {
        text-transform: uppercase;
        font-size: 1rem;
        color: $black;
        font-weight: 700;
      }
      .headline {
        font-size: 0.9rem;
        text-decoration: none;
        color: rgb(10, 131, 252);
        font-weight: 400;
        display: block;
      }
    }
    .heading {
      display: block;
      text-transform: uppercase;
      padding: 0px 5px;
      margin: 0;
      font-size: 1.5rem;
      font-weight: 400;
      color: $black;
      border: none;
    }
  }
}
// active
.active {
  max-width: 100%;
  margin: 10px 5px;
  .jobs-list {
    li {
      display: block;
      background: #fff;
    }
  }
}

// Media query
@media only screen and(max-width:950px) {
  .additional-feed {
    display: none;
  }
}
@media only screen and(max-width:950px) {
  .active {
    display: block;
    .news-list {
      display: none;
    }
  }
}
</style>
