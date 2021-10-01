<template>
  <!-- Footer  -->
  <footer>
    <!--Copy rigth text  -->
    <p>copyright ajjlal ahmed - 2021 &copy;</p>
  </footer>
  <!-- Footer  -->
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style lang="scss" scope>
footer {
  background: $secondary-color;
  padding: 20px;
  p {
    color: #fff;
    text-transform: capitalize;
    text-align: center;
    font-size: 1.2rem;
    font-weight: 900;
    letter-spacing: 1px;
  }
}
</style>
