<template>
  <div>
    <!-- Case 1: email exists but not verified -->
    <UnverifyEmail v-if="this.$auth.user.email && this.$auth.user.email_verified === 'false'" />

    <!-- Case 2: email exists and verified -->
    <VerifiedEmail v-else-if="this.$auth.user.email && this.$auth.user.email_verified === 'true'" />

    <!-- Case 3: no email -->
    <EmptyEmail v-else />
  </div>
</template>

<script>
  import { mapState, mapGetters, mapActions } from "vuex";

  export default {
    computed: {
      ...mapState("profile", ["btn"]),
    },
    methods: {
      ...mapActions("profile", ["submit"]),
    },
  };
</script>

<style scoped>
  @media screen and (max-width: 576px) {
    .container {
      height: 100vh;
    }

    .all {
      height: 100%;
    }
  }

  .fake-image {
    opacity: 0;
  }

  /* judul */
  h1 {
    font-size: 24px;
  }

  p {
    font-size: 14px;
  }

  /* form */
  input {
    height: 50px;
  }

  button {
    width: 100%;
    height: 50px;
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
