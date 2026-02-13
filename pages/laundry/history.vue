<template>
  <section id="history">
    <div class="media mx-auto">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="d-flex justify-content-between align-items-center">
              <nuxt-link to="/laundry">
                <img src="~/assets/image/icon/Left.png" alt="" />
              </nuxt-link>
              <h4>Laundry Activity History</h4>
              <div class="fake-image" style="width: 24px"></div>
            </div>

            <div class="history mt-4">
              <PageHistory />
            </div>
          </div>

          <div class="col-12">
            <div class="d-flex justify-content-between align-items-center my-4">
              <h5>Last Laundry Activity</h5>
            </div>
            <PageHistoryList />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    layout: "utama",
    data() {
      return {};
    },
    async asyncData({ store }) {
      // Initial fetch using Jakarta time
      await store.dispatch("laundry/renderPageHistory");
    },
  };
</script>
