<template>
  <div>
    <HeaderOpsi :pageTitle="pageTitle" />
    <div class="text-center">
      <CardSaldo />
      <!-- histori transaksi -->
      <div class="mt-5 text-start">
        <h4 class="mb-3">Histori Transaksi Bulan Ini</h4>
        <!-- looping histori -->
        <OutTransaksi />
        <InTransaksi />
        <OutTransaksi />
        <OutTransaksi />
        <InTransaksi />
        <!-- looping histori end -->
      </div>
      <!-- histori transaksi end -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pageTitle: "Saldo Anda",
    };
  },
};
</script>

<style scoped></style>
