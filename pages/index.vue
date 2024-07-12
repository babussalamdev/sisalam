<template>
  <div class="all">
    <div class="container">
      <div class="media mx-auto">
        <div class="row">
          <div class="col-12 col-xl-5">
            <Header />
            <Card />
            <Balance />
            <Menu />
          </div>
          <div class="col-12 col-xl-7">
            <History />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "utama",
  async asyncData({ store }) {
    store.dispatch('index/renderPage')
  }
};
</script>

<style scoped>
.all {
  padding-bottom: 100px;
  padding-top: 20px;
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
