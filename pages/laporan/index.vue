<template>
  <div>hallo laporan</div>
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
  };
</script>

<style lang="scss" scoped></style>
