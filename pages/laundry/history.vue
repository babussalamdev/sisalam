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

            <div class="date-filter-container mt-4 p-3 bg-light rounded">
              <div class="row align-items-end">
                <div class="col-5">
                  <label class="small fw-bold">Start Date</label>
                  <input type="date" v-model="filter.start" class="form-control" />
                </div>
                <div class="col-5">
                  <label class="small fw-bold">End Date</label>
                  <input type="date" v-model="filter.end" class="form-control" />
                </div>
                <div class="col-2">
                  <button @click="updateHistory" class="btn btn-primary w-100">
                    <i class="bi bi-search"></i>
                  </button>
                </div>
              </div>
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
  import moment from "moment";
  import "moment-timezone";

  export default {
    layout: "utama",
    data() {
      return {
        filter: {
          // Using your specific timezone logic
          start: moment().tz("Asia/Jakarta").format("YYYY-MM-DD"),
          end: moment().tz("Asia/Jakarta").format("YYYY-MM-DD"),
        },
      };
    },
    async asyncData({ store }) {
      // Initial fetch using Jakarta time
      const today = moment().tz("Asia/Jakarta").format("YYYY-MM-DD");
      await store.dispatch("laundry/renderPageHistory", {
        startdate: today,
        enddate: today,
      });
    },
    methods: {
      updateHistory() {
        this.$store.dispatch("laundry/renderPageHistory", {
          startdate: this.filter.start,
          enddate: this.filter.end,
        });
      },
    },
  };
</script>
