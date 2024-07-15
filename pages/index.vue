<template>
  <div class="home">
    <div class="text-center">
      <h3>
        Selamat Datang <b class="text-capitalize">{{ $auth.user.name }}</b> di Aplikasi Santri Babussalam
      </h3>
      <p>Halaman saat ini sedang dalam pengembangan, silahkan pergi ke halaman <b>Kartu</b> melalui navigasi di bawah</p>
    </div>
  </div>
</template>

<script>
export default {
  layout: "utama",
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
.home {
  height: 100vh;
  display: flex;
  align-items: center;
  font-family: 'Poppins', sans-serif
}
.text-center {
  width: 340px;
  margin-inline: auto;
}
p {
  font-size: 12px;
}
</style>
