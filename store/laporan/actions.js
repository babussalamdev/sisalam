import Swal from "sweetalert2";

export default {
  async changeUnit({ commit, state }) {
    try {
      const user = this.$auth.user;
      const kelas = this.$auth.user.Kelas;

      // Add type1=PTS and type2=UTS for the mid-semester report
      const result = await this.$apiBase.$get(`get-santri?method=laporan&kelas=${kelas}&type1=PTS&type2=UTS`);

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
};
