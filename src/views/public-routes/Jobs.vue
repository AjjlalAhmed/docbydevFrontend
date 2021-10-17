<template>
  <!-- Jobs  -->
  <div class="jobs">
    <!-- Intro  -->
    <div class="intro">
      <h1 class="intro-heading">
        Find Remote Jobs
      </h1>
      <p class="intro-text">
        apply for new remote job opportunities. Find professionals that best
        match your job requirements.
      </p>
    </div>
    <!-- Additional feed  -->
    <AdditionalFeed :active="true" :showJobs="true" :showNews="false" />
  </div>
  <!-- Jobs  -->
</template>

<script>
// Importing thing we need
import AdditionalFeed from "../../components/AdditionalFeed.vue";
export default {
  name: "News",
  components: { AdditionalFeed },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>

// Intro
.intro {
  margin: 20px 5px;
  margin-top: 50px;
  padding: 20px;
  background: #d9eaf5;
  .intro-heading {
    font-size: 2rem;
    color: $black;
  }
  .intro-text {
    font-size: 1rem;
    color: $black;
    text-transform: capitalize;
  }
}
// Jobs
.jobs {
  max-width: 1000px;
  column-width: 1000px;
}
// Feed
.feed {
  max-width: 300px;
}

// Media query
@media only screen and(max-width:750px) {
  .intro {
    margin-top: 0px;
  }
  .feed {
    margin: 0 auto;
  }
}
</style>
