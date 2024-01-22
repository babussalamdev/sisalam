<template>
  <div class="all">
    <div class="container">
      <div class="media mx-auto">
        <Header />
        <Card />
        <Balance />
        <Menu />
        <History />
      </div>
    </div>
  </div>
</template>

<script>
import Balance from "~/components/home/Balance.vue";
import Header from "~/components/home/Header.vue";
import History from "~/components/home/History.vue";

export default {
  layout: "utama",
};
</script>

<style scoped>
.all {
  padding-bottom: 100px;
  padding-top: 20px;
}
.media {
  width: 40%;
}

@media screen and (max-width: 576px) {
  .media {
    width: 100% !important;
  }
}
/* tablet */
@media screen and (max-width: 991px) {
  .media {
    width: 70%;
  }
}
</style>
