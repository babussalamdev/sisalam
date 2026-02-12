import Swal from "sweetalert2";
export default {
  async loadForm({ commit, dispatch }) {
    dispatch("load/submitLoad", null, { root: true });
    const cnc = this.$auth.user.cnc;
    const result = await this.$apiFlip.$get(`get-topup?cnc=${cnc}`);
    commit("loadForm", result);
    dispatch("load/submitLoad", null, { root: true });
  },

  async nextStep({ commit, state }) {
    commit("changeLoad");
    const status = parseInt(state.user.Status) + 1;
    const result = await this.$apiBase.$put(`/update-user`, {
      Status: status,
    });
    if (result) {
      commit("changeLoad");
      commit("updateStatus", status);
    } else {
      commit("changeLoad");
    }
  },

  async submitFormulir({ commit, state }, event) {
    commit("changeLoad");
    const data = Object.fromEntries(new FormData(event.target));
    data["Status"] = parseInt(state.user.Status) + 1;
    const result = await this.$apiBase.$put(`/update-user`, data);
    if (result) {
      commit("changeLoad");
      commit("updateStatus", data.Status);
    } else {
      commit("changeLoad");
    }
  },

  async submitAgreement({ commit, state }) {
    commit("changeLoad");
    const data = {
      Agreement: "Yes",
    };
    data["Status"] = parseInt(state.user.Status) + 1;
    const result = await this.$apiBase.$put(`/update-user`, data);
    if (result) {
      commit("changeLoad");
      commit("updateStatus", data.Status);
    } else {
      commit("changeLoad");
    }
  },

  async uploadImage({ commit, state }) {
    commit("changeLoad");
    if (!state.selectedFile) return;
    const Status = parseInt(state.user.Status) + 1;
    const Picture = state.selectedFile.split(",")[1];
    try {
      const result = await this.$apiBase.$put(`/image-user`, {
        Picture,
        Status,
      });
      if (result) {
        commit("changeLoad");
        commit("updateStatus", Status);
      }
    } catch (error) {
      commit("changeLoad");
      console.log(error);
    }
  },

  async matchVoucher({ commit, state }) {
    commit("changeLoad");
    try {
      const result = await this.$apiBase.$put(`/match-voucher`, {
        code: state.code,
      });
      if (!result.message) {
        commit("changeLoad");
        Swal.fire({
          text: "Done",
          icon: "success",
          timer: 1000,
          timerProgressBar: false,
          showConfirmButton: false,
        }).then((res) => {
          commit("matchVoucher", result);
        });
      } else {
        commit("changeLoad");
        Swal.fire({
          text: result.message,
          icon: "warning",
          timer: 1500,
          timerProgressBar: false,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      commit("changeLoad");
      console.log(error);
    }
  },

  async requestFlip({ commit, state }) {
    commit("changeLoad");
    const Amount = state.bank === "qris" ? state.amount + state.feeQris : state.amount + state.feeBank;
    const Name = this.$auth.user.Nama;
    const Bank = state.bank;
    const Base_Amount = state.amount;
    const CNC = this.$auth.user.cnc;
    const Email = this.$auth.user.email;
    const body = {
      Amount,
      Name,
      Bank,
      CNC,
      Email,
      Base_Amount,
    };
    try {
      const value = await this.$apiFlip.$post("/flip-topup", body);
      commit("setPayment", value);
      commit("changeLoad");
    } catch (error) {
      commit("changeLoad");
      console.log(error);

      // --- NEW CODE START ---
      // Check if there is a response and the status is 422
      if (error.response && error.response.status === 422) {
        const responseData = error.response.data;

        // Check if the 'errors' array exists and contains code 8501
        const isQrisError = responseData.errors && responseData.errors.some((e) => e.code === 8501);

        if (isQrisError) {
          Swal.fire({
            icon: "error",
            title: "Maaf",
            text: "Sedang ada gangguan dalam metode pembayaran ini, silahkan pilih metode pembayaran lain.",
            confirmButtonText: "Oke",
            confirmButtonColor: "#d33",
          });
          return; // Stop here so other error handlers don't run
        }
      }
      // --- NEW CODE END ---

      // Optional: Generic error fallback for other issues
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Terjadi kesalahan, silakan coba lagi nanti.",
      });
    }
  },

  startCountdown({ commit, state, dispatch }, targetDateTime) {
    if (state.isCountdownActive) return; // Cegah memulai countdown lebih dari satu kali

    const countDownDate = new Date(targetDateTime).getTime();

    commit("SET_COUNTDOWN_DATE", countDownDate);
    commit("SET_COUNTDOWN_ACTIVE", true);

    const intervalId = setInterval(() => {
      const now = new Date().getTime();
      const remainingTime = countDownDate - now;

      commit("SET_REMAINING_TIME", remainingTime);

      if (remainingTime < 0) {
        dispatch("stopCountdown");
      }
    }, 1000);

    commit("SET_INTERVAL_ID", intervalId);
  },

  stopCountdown({ commit }) {
    commit("CLEAR_INTERVAL");
  },

  resetTopup({ commit }, { page, router }) {
    commit("resetTopup");
    router.push(page);
  },
};
