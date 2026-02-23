<template>
  <div class="all">
    <div class="container pt-0">
      <div class="media mx-auto">
        <div class="row">
          <div class="col-12">
            <div class="d-flex justify-content-end p-2">
              <small class="fw-bold">v{{ version }}</small>
            </div>
            <MutabaahTable />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    layout: "utama",
    data() {
      return {
        version: 0,
      };
    },
    created() {
      this.version = process.env.version;
    },
    async asyncData({ store }) {
      store.dispatch("mutabaah/changeUnit");
    },
  };
</script>

<style>
  section {
    font-family: "Poppins", sans-serif;
  }

  .total-wrapper p {
    font-size: 10px;
  }

  .total-wrapper h1 {
    font-size: 32px;
  }

  .total-wrapper h6 {
    font-size: 12px;
  }

  .widgets {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  .widgets p {
    font-size: 10px;
  }

  .widgets h1 {
    font-size: 20px;
  }

  .widgets h6 {
    font-size: 10px;
  }

  .widgets .line-bottom {
    height: 5px;
    width: 60px;
  }

  .history h1 {
    font-family: "Noto Kufi Arabic", sans-serif;
    font-weight: 600;
    font-size: 16px;
  }

  .history p {
    font-size: 10px;
  }
  .all {
    padding-bottom: 100px;
    /* padding-top: 20px; */
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
