import Swal from "sweetalert2";

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
  async renderPageBillPay({ commit, dispatch }, payload) {
    dispatch("load/submitLoad", null, { root: true });

    const sk = this.$auth.user.SK;

    try {
      const url = `get-santri-laundry?type=bill-pay&sk=${sk.replace("#", "%23")}`;
      const result = await this.$apiBase.$get(url);

      if (result) {
        commit("setRenderBill", result);
      }
    } catch (error) {
      console.error("Failed to fetch laundry bill:", error);
    } finally {
      // Turn off loading state regardless of success or failure
      dispatch("load/submitLoad", null, { root: true });
    }
  },
  async requestPay({ commit, state }) {
    const Amount = state.bill.DendaLaundry;
    if (!Amount || Amount <= 0) {
      return Swal.fire({
        icon: "info",
        title: "Tidak Ada Tagihan",
        text: "Jumlah tagihan Anda adalah Rp 0. Tidak ada pembayaran yang diperlukan.",
      });
    }

    // 2. Proceed with API call if Amount > 0
    commit("changeLoad");
    const Name = this.$auth.user.Nama;
    const CNC = this.$auth.user.cnc;
    const Email = this.$auth.user.email;
    const SK = this.$auth.user.SK;

    const body = { Amount, Name, CNC, Email, SK };

    try {
      // 1. Send the request
      const value = await this.$apiBase.$post("/input-santri-laundry?type=bill-laundry", body);

      // 2. Stop loading state
      commit("changeLoad");

      // 3. Show success alert
      await Swal.fire({
        icon: "success",
        title: "Pembayaran Berhasil",
        text: "Tagihan laundry Anda telah dibayar.",
        timer: 2000,
        showConfirmButton: false,
      });

      // 4. Redirect to /laundry page
      this.$router.push("/laundry");
    } catch (error) {
      commit("changeLoad");

      // 5. Handle specific error cases (like Insufficient Balance)
      let errorMessage = "Terjadi kesalahan, silakan coba lagi nanti.";

      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }

      Swal.fire({
        icon: "error",
        title: "Gagal Membayar",
        text: errorMessage, // Displays "Insufficient balance" if sent by backend
      });

      console.error("Payment Error:", error);
    }
  },
};
