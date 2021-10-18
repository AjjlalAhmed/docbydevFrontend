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
import AdditionalFeed from "../components/AdditionalFeed.vue";
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
  padding: 20px ;
  background: #f9f9f9;
  border: 1px solid #3333;
  .intro-heading {
    font-size: max(1.5rem,2.5rem);
    color: $black;
    text-transform: capitalize;
  }
  .intro-text {
    font-size: 1.2rem;
    color: $black;
    text-transform: capitalize;
    padding: 10px 0px;
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
