export default {
    async renderPage({ commit }, data) {
      const result = await this.$apiBase.$get('get-card?method=single&cnc=CNC-5499431604')
      commit('setRender', result)
    },
}
