<template>
  <div class="d-flex">
    <div
      class="userprofile d-flex align-items-center bg-secondary justify-content-center me-3"
    >
      <i class="bi bi-person-fill pt-1 h1 text-white fw-bold"></i>
    </div>
    <div class="d-flex flex-column justify-content-center gap-1">
      <h6 class="text-secondary mb-0">Welcome back</h6>
      <h5 class="fw-semibold mb-0 text-capitalize">
        {{
          card.Name
            ? card.Name.split(" ").slice(0, 2).join(" ")
            : ""
        }}
      </h5>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('index', ['card'])
  },
};
</script>

<style scoped>
.userprofile {
  width: 48px;
  height: 48px;
  border-radius: 30px;
  padding-top: 5px;
}
h6 {
  font-size: 14px;
}
h5 {
  font-size: 18px;
}
</style>
