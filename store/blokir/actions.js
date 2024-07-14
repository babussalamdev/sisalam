export default {
    async renderPage({ commit }, data) {
      const cnc = this.$auth.user.cnc
      const result = await this.$apiCard.$get(`get-card?method=&cnc=${cnc}`)
      commit('setRender', result)
    },
    async setStatus({ commit }, value) {
      const cnc = this.$auth.user.cnc
      const result = await this.$apiCard.$put(`put-card?method=status&cnc=${cnc}`, { Status: value})
      commit('setStatus', result)
  }
}
