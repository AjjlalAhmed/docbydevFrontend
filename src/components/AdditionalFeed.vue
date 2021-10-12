<template>
  <div class="additional-feed">
    <ul>
      <li v-for="(job, index) in jobData" :key="index">
        <div class="image">
          <img :src="job.companyImageSrc" alt="" />
        </div>
        <div class="job-details">
          <h3 class="company">{{ job.comapnyName }}</h3>
          <h2 class="position">{{ job.jobPosition }}</h2>
          <div class="more-details">
            <h3 class="location">
              {{ job.jobLocation }}
            </h3>
            <h3 class="salary">
              {{ job.jobSalary }}
            </h3>
          </div>
          <div class="job-tags">
            <span
              class="tag"
              v-for="(tag, tagsIndex) in job.jobTags"
              :key="tagsIndex"
            >
              #{{ tag }}
            </span>
          </div>
          <a target="blank" :href="job.jobLink">apply</a>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  name: "AdditionalFeed",
  setup() {
    const jobData = ref([
      {
        companyImageSrc:
          "https://remoteok.io/cdn-cgi/image/format=auto,fit=contain,width=100,height=100,quality=50/https://remoteOK.io/assets/img/jobs/9c6e73630d56045a3b5db21ec40fff161633446470.png?1633446470",
        comapnyName: "toptal",
        jobPosition: "Senior Android Developer",
        jobLocation: "🌏 Worldwide",
        jobSalary: "$50k - $300k",
        jobTags: ["dev", "android", "full stack", "Mobile app development"],
        jobLink: "https://remoteok.io/l/106392",
      },
    ]);
    return {
      jobData,
    };
  },
};
</script>

<style lang="scss" scoped>
.additional-feed {
  max-width: 300px;
  margin:0px 5px;
  margin-top: 50px;
  ul {
    list-style: none;
    li {
      display: flex;
      flex-wrap: wrap;
      border: 1px solid #3333;
      padding: 20px 5px;
      .image {
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 1px solid #2222;
        }
      }
      .job-details {
        .company {
          font-size: 0.9rem;
          text-transform: capitalize;
        }
        .position {
          font-size: 1rem;
          text-transform: capitalize;
        }
        .more-details {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin: 5px 0px;
          .location,
          .salary {
            display: table;
            padding: 5px 10px;
            border-radius: 3px;
            background: #2222;
            font-size: 0.8rem;
          }
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
      a {
        padding: 5px 20px;
        background: $secondary-color;
        border-radius: 3px;
        color: #fff;
        text-transform: capitalize;
        margin: 10px 0px;
        display: table;
        text-decoration: none;
        font-size: 0.9rem;
      }
    }
  }
}
@media only screen and(max-width:750px) {
  .additional-feed {
    display: none;
  }
}
</style>
