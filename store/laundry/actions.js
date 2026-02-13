export default {
  async renderPage({ commit, dispatch }, data) {
    dispatch("load/submitLoad", null, { root: true });
    const sk = this.$auth.user.SK;
    const result = await this.$apiBase.$get(`get-santri-laundry?type=home-santri&sk=${sk.replace("#", "%23")}`);
    if (result) {
      commit("setRender", result);
      dispatch("load/submitLoad", null, { root: true });
    }
  },

  // actions.js
  async renderPageHistory({ commit, dispatch }, payload) {
    dispatch("load/submitLoad", null, { root: true });

    const sk = this.$auth.user.SK;

    try {
      const url = `get-santri-laundry?type=history-page&sk=${sk.replace("#", "%23")}`;
      const result = await this.$apiBase.$get(url);

      if (result) {
        commit("setRender", result);
      }
    } catch (error) {
      console.error("Failed to fetch laundry history:", error);
    } finally {
      // Turn off loading state regardless of success or failure
      dispatch("load/submitLoad", null, { root: true });
    }
  },
};
