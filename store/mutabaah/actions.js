import Swal from "sweetalert2";
export default {
  // Main function to fetch data based on the current state
  async fetchMutabaah({ commit, state }) {
    try {
      const program = this.$auth.user.profile;
      const subject = state.selectedSubject; // Dynamically grab subject from state

      const result = await this.$apiBase.$get(`get-santri?subject=${subject}&program=${program}&method=mutabaah`);
      commit("SET_DATAS", result);
    } catch (error) {
      Swal.fire({
        icon: "warning",
        text: error,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  },

  // Function called by the UI when clicking a new tab
  async changeSubject({ commit, dispatch }, subject) {
    commit("SET_SUBJECT", subject);
    dispatch("fetchMutabaah"); // Re-fetch API when subject changes
  },
};
