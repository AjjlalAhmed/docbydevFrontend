<template>
  <!-- Skeleton loading  -->
  <div>
    <ul v-if="isDoc" class="o-vertical-spacing o-vertical-spacing--l">
      <li v-for="(item, index) in 5" :key="index" class="o-media">
        <div class="o-media__body">
          <div class="o-vertical-spacing">
            <h3 class="blog-post__headline">
              <span class="skeleton-box" style="width:55%;"></span>
            </h3>
            <p>
              <span class="skeleton-box" style="width:80%;"></span>
              <span class="skeleton-box" style="width:90%;"></span>
              <span class="skeleton-box" style="width:83%;"></span>
              <span class="skeleton-box" style="width:80%;"></span>
            </p>
            <div v-if="index == 0" class="o-media__figure">
              <span class="skeleton-box"></span>
            </div>
            <div class="blog-post__meta">
              <span class="skeleton-box" style="width:90%;height:200px;"></span>
            </div>
          </div>
        </div>
      </li>
    </ul>

    <ul v-else class="o-vertical-spacing o-vertical-spacing--l">
      <li
        class="blog-post o-media"
        v-for="(skeleton, index) in 10"
        :key="index"
      >
        <div v-if="route.name != 'News'" class="o-media__figure">
          <span class="skeleton-box"></span>
        </div>
        <div class="o-media__body">
          <div class="o-vertical-spacing">
            <h3 v-if="route.name != 'News'" class="blog-post__headline">
              <span class="skeleton-box" style="width:55%;"></span>
            </h3>
            <p>
              <span class="skeleton-box" style="width:80%;"></span>
              <span class="skeleton-box" style="width:90%;"></span>
              <span class="skeleton-box" style="width:83%;"></span>
              <span class="skeleton-box" style="width:80%;"></span>
            </p>
            <div v-if="route.name != 'News'" class="blog-post__meta">
              <span class="skeleton-box" style="width:70px;"></span>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <!-- Skeleton loading  -->
</template>

<script>
// Importing thing we need
import { useRoute } from "vue-router";
import { useStore } from "vuex";
export default {
  name: "SkeletonLoading",
  props: ["isDoc"],
  setup(props) {
    // Variables
    const route = useRoute();
    const store = useStore();
    const isDoc = props.isDoc;

    return {
      route,
      isDoc,
    };
  },
};
</script>

<style lang="scss" scoped>
.skeleton-box {
  display: inline-block;
  height: 1em;
  position: relative;
  overflow: hidden;
  background-color: #dddbdd;

  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background-image: linear-gradient(
      90deg,
      rgba(#fff, 0) 0,
      rgba(#fff, 0.2) 20%,
      rgba(#fff, 0.5) 60%,
      rgba(#fff, 0)
    );
    animation: shimmer 2s infinite;
    content: "";
  }

  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }
}

.blog-post {
  background: #fff;
  padding: 10px;
  border-radius: 3px;
  border: 1px solid #3333;
  &__headline {
    font-size: 1.25em;
    font-weight: bold;
  }

  &__meta {
    font-size: 0.85em;
    color: #6b6b6b;
  }
}

// OBJECTS

.o-media {
  display: flex;

  &__body {
    flex-grow: 1;
    margin-left: 1em;
  }
}

.o-vertical-spacing {
  > * + * {
    margin-top: 0.75em;
  }

  &--l {
    > * + * {
      margin-top: 2em;
    }
  }
}

// MISC

* {
  box-sizing: border-box;
}

.o-media__figure {
  span {
    border-radius: 50%;
    width: 40px;
    height: 40px;
  }
}
</style>
