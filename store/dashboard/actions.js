export default {
  async changeUnit({ commit, dispatch }, data) {
    const program = this.$auth.user.profile
    try {
      const result = await this.$apiBase.$get(`get-santri?program=${program}&method=home`)
      if ( result ) {
        commit('SET_DATAS', result)
      }
    } catch (error) {
      Swal.fire({
        icon: "warning",
        text: error,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
}
