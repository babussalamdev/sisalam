import Swal from "sweetalert2"
export default {
  async submit({dispatch, commit}, event) {
    commit('btn')
    const data = Object.fromEntries(new FormData(event.target))
    const username = this.$auth.user.preferred_username
    try {
      const datas = await this.$apiBase.$put(`update-account?username=${username}`, data)
      if ( datas ) {
        const userToUpdate = { ...this.$auth.user };
        userToUpdate['email'] = datas;
        this.$auth.setUser(userToUpdate);
        $('#profileUpdate')[0].reset()
        commit('btn')
        Swal.fire({
          icon: "success",
          text: 'Perubahan Email Berhasil!',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      commit('btn')
      Swal.fire({
        icon: "warning",
        text: error,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
}
