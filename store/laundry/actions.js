import Swal from "sweetalert2";

const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

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
    const Amount = this.$auth.user.DendaLaundry || 0;
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
      this.$auth.setUser({
        ...this.$auth.user,
        DendaLaundry: 0,
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
  async submitTransferPay({ commit }, payload) {
    commit("changeLoad");

    try {
      const { file, amount } = payload;
      const Name = this.$auth.user.Nama;
      const CNC = this.$auth.user.cnc;
      const Email = this.$auth.user.email;
      const SK = this.$auth.user.SK;
      const Asrama = this.$auth.user.Asrama || "-";

      // 1. Convert Image to Base64
      const base64Evidence = await fileToBase64(file);
      const cleanBase64 = base64Evidence.replace(/^data:image\/\w+;base64,/, "");

      // 2. Kirim ke Google Apps Script
      const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw8-q43epHLdUS7glqMMaMG3vdA9SxRLcOku5Jx4SFVarDp5j4hDw4BGYkWFB4CJ4fmzA/exec";
      const gasPayload = {
        action: "upload_bukti_bayar",
        shortKey: SK,
        namaSantri: Name,
        asrama: Asrama,
        nominal: amount,
        fileName: file.name,
        fileBase64: cleanBase64,
      };

      const gasResponse = await fetch(SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(gasPayload),
      });

      const gasResult = await gasResponse.json();

      // GANTI BAGIAN INI:
      // if (!gasResult.success) {
      if (gasResult.status !== "success") {
        throw new Error(gasResult.message || "Gagal upload ke Google Drive");
      }

      // 3. Kirim ke Backend AWS DynamoDB
      const awsBody = {
        Amount: amount,
        Name: Name,
        CNC: CNC,
        Email: Email,
        SK: SK,
        // Ini akan otomatis mengambil gasResult.url karena idKonfirmasi tidak ada di JSON
        EvidenceUrl: gasResult.idKonfirmasi || gasResult.url || "Uploaded via App Script",
      };
      await this.$apiBase.$post("/input-santri-laundry?type=bill-laundry-transfer", awsBody);
      // 4. Kirim Notifikasi WhatsApp via Fonnte API
      const formatRupiah = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(amount);
      const pesanWa = `Assalamu'alaikum Admin, saya sudah transfer manual untuk tagihan laundry ananda *${Name}* (Asrama: ${Asrama}) sebesar *${formatRupiah}*.\n\nBukti transfer sudah diupload via web (ID: ${
        gasResult.idKonfirmasi || "-"
      }). Mohon diverifikasi. Terima kasih.`;

      const fonnteData = new FormData();
      fonnteData.append("target", "6285156575710");
      fonnteData.append("message", pesanWa);

      await fetch("https://api.fonnte.com/send", {
        method: "POST",
        headers: {
          Authorization: "JM3pexhRKQu9h5DHQ7Cg", // Ganti dengan Token Fonnte aktif Anda
        },
        body: fonnteData,
      }).catch((err) => console.warn("Fonnte WA notification failed:", err)); // Prevent WA failure from crashing the app

      commit("changeLoad");

      // 5. Sukses Alert
      await Swal.fire({
        icon: "success",
        title: "Bukti Terkirim",
        text: "Bukti transfer berhasil diupload dan notifikasi WhatsApp telah dikirim ke Admin.",
        timer: 2500,
        showConfirmButton: false,
      });

      this.$router.push("/laundry");
    } catch (error) {
      commit("changeLoad");

      let errorMessage = "Terjadi kesalahan saat mengupload bukti transfer.";
      if (error.message) {
        errorMessage = error.message;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      Swal.fire({
        icon: "error",
        title: "Gagal Upload",
        text: errorMessage,
      });
      console.error("Transfer Upload Error:", error);
    }
  },
};
