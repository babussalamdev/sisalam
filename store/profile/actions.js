import Swal from "sweetalert2";
import Cookies from "js-cookie";

export default {
  async submitEmail({ dispatch, commit }, event) {
    commit("btn");
    const data = Object.fromEntries(new FormData(event.target));
    const username = this.$auth.user.preferred_username;
    try {
      const datas = await this.$apiBase.$put(`update-account?username=${username}`, data);
      if (datas) {
        const userToUpdate = { ...this.$auth.user };
        userToUpdate["email"] = datas;
        userToUpdate["email_verified"] = "false";
        this.$auth.setUser(userToUpdate);
        $("#profileUpdate")[0].reset();
        commit("btn");
        Swal.fire({
          icon: "success",
          text: "Perubahan Email Berhasil!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      commit("btn");
      Swal.fire({
        icon: "warning",
        text: error,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  },

  async removeEmail({ dispatch, commit }, event) {
    commit("btn");
    try {
      const userToUpdate = { ...this.$auth.user };
      delete userToUpdate["email"];
      delete userToUpdate["email_verified"];
      this.$auth.setUser(userToUpdate);
      commit("btn");
    } catch (error) {
      commit("btn");
      Swal.fire({
        icon: "warning",
        text: error,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  },

  async resetCode({ commit, state }) {
    if (state.cooldown > 0) {
      return; // prevent clicking while cooldown is active
    }

    commit("btn");

    const accessToken = Cookies.get("AccessToken");
    try {
      const datas = await this.$apiBase.$post(`resend-code`, { accessToken });

      if (datas) {
        commit("btn");
        Swal.fire({
          icon: "success",
          text: "Kode verifikasi berhasil dikirim ulang!",
          showConfirmButton: false,
          timer: 1500,
        });

        // start 5 min cooldown
        // inside resetCode action after success
        const expireAt = Date.now() + 300 * 1000; // 5 minutes from now
        localStorage.setItem("resetCodeExpireAt", expireAt);

        commit("setCooldown", 300);

        const interval = setInterval(() => {
          const remaining = Math.max(0, Math.floor((expireAt - Date.now()) / 1000));
          commit("setCooldown", remaining);
          if (remaining === 0) clearInterval(interval);
        }, 1000);
      }
    } catch (error) {
      commit("btn");
      let errorMessage = "An unexpected error occurred. Please try again.";

      if (error.response) {
        if (error.response.data && error.response.data.error) {
          errorMessage = error.response.data.error;
        } else if (error.response.status === 500) {
          errorMessage = "Server error. Please try again later.";
        }
      } else {
        errorMessage = error.message;
      }

      Swal.fire({
        text: errorMessage,
        icon: "error",
        showConfirmButton: true,
      });
    }
  },

  async submitCode({ dispatch, commit }, event) {
    commit("btn");
    const data = Object.fromEntries(new FormData(event.target));
    const accessToken = Cookies.get("AccessToken");
    data["accessToken"] = accessToken;

    try {
      const datas = await this.$apiBase.$post(`verify-email`, data);
      if (datas) {
        const userToUpdate = { ...this.$auth.user };
        userToUpdate["email_verified"] = "true";
        this.$auth.setUser(userToUpdate);
        $("#profileUpdate")[0].reset();
        commit("btn");
        Swal.fire({
          icon: "success",
          text: "Perubahan Email Berhasil!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      commit("btn"); // Re-enable button after error

      let errorMessage = "An unexpected error occurred. Please try again.";

      if (error.response) {
        if (error.response.data && error.response.data.error) {
          errorMessage = error.response.data.error;
        } else if (error.response.status === 500) {
          errorMessage = "Server error. Please try again later.";
        }
      } else {
        errorMessage = error.message;
      }

      Swal.fire({
        text: errorMessage,
        icon: "error",
        showConfirmButton: true,
      });
    }
  },

  async initCooldown({ commit }) {
    const expireAt = localStorage.getItem("resetCodeExpireAt");
    if (expireAt) {
      const remaining = Math.max(0, Math.floor((expireAt - Date.now()) / 1000));
      if (remaining > 0) {
        commit("setCooldown", remaining);
        const interval = setInterval(() => {
          const r = Math.max(0, Math.floor((expireAt - Date.now()) / 1000));
          commit("setCooldown", r);
          if (r === 0) {
            localStorage.removeItem("resetCodeExpireAt");
            clearInterval(interval);
          }
        }, 1000);
      }
    }
  },
};
