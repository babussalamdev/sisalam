export default {
    async renderPage({ commit }, data) {
      const cnc = this.$auth.user.cnc
      const result = await this.$apiCard.$get(`get-card?method=&cnc=${cnc}`)
      commit('setRender', result)
    },
}
