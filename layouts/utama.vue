<template>
  <main class="position-relative">
    <nuxt />
    <Navbar />
  </main>
</template>

<script>
export default {
  // mounted() {
  //   this.$store.dispatch("loadCard");
  // },
  // async middleware({ redirect }) {
  //   const card = localStorage.getItem("card");
  //   if (!card) {
  //     redirect("/");
  //   }
  // },
};
</script>

<style scoped>
main {
  height: 100vh;
  /* border: 1px solid black; */
  max-width: 576px;
  margin-inline: auto;
}
</style>
