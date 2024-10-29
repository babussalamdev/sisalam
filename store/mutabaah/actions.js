import Swal from "sweetalert2"
export default {
  async changeUnit({ commit, dispatch }) {
    try {
      const program = this.$auth.user.profile
      const result = await this.$apiBase.$get(`get-santri?subject=ziyadah&program=${program}&method=mutabaah`)
      commit('SET_DATAS', result )
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
