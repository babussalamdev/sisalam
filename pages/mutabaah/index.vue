<template>
  <section>
    <MutabaahTable />
  </section>
</template>

<script>
export default {
  layout: "utama",
  async asyncData({ store }) {
    store.dispatch('mutabaah/changeUnit')
  }
}
</script>

<style>
section {
  font-family: 'Poppins', sans-serif;
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
  font-family: 'Noto Kufi Arabic', sans-serif;
  font-weight: 600;
  font-size: 16px;
}

.history p {
  font-size: 10px;
}
</style>
