export default {
  async changeUnit({ commit, dispatch }, data) {
    dispatch('load/submitLoad', null, { root: true })
    const program = this.$auth.user.profile
    try {
      const result = await this.$apiBase.$get(`get-santri?program=${program}&method=home`)
      if ( result ) {
        commit('SET_DATAS', result)
        dispatch('load/submitLoad', null, { root: true })
      }
    } catch (error) {
      dispatch('load/submitLoad', null, { root: true })
      Swal.fire({
        icon: "warning",
        text: error,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
}
