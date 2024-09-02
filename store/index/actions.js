export default {
    async renderPage({ commit, dispatch }, data) {
      dispatch('load/submitLoad', null, { root: true })
      const cnc = this.$auth.user.cnc
      const result = await this.$apiCard.$get(`get-card?method=&cnc=${cnc}`)
      if ( result ) {
        commit('setRender', result)
        dispatch('load/submitLoad', null, { root: true })
      }
    },
}
