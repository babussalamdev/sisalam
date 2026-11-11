import Swal from "sweetalert2";

const compressImageToBase64 = (file, maxDim = 1200, quality = 0.8) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
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

      // 1. Kompres dan Convert Image ke Base64 (Otomatis ringan ~200KB)
      const base64Evidence = await compressImageToBase64(file);
      const cleanBase64 = base64Evidence.replace(/^data:image\/\w+;base64,/, "");

      // 2. Kirim ke Google Apps Script Laundry
      // Ganti URL di bawah dengan URL Deployment Apps Script aktif Anda
      const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzfuLykTYx4tqhjQ_rTZjf8TDnvo81aJuxB_H3aXkkp0acZBpCwekYRmGZpht2fYjtYuw/exec";

      const gasPayload = {
        action: "upload_bukti_bayar",
        shortKey: SK,
        namaSantri: Name,
        asrama: Asrama,
        nominal: amount,
        fileName: (file.name || "struk.jpg").replace(/\.[^/.]+$/, "") + ".jpg",
        fileBase64: cleanBase64,
      };

      const gasResponse = await fetch(SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(gasPayload),
      });

      const gasResult = await gasResponse.json();

      // Validasi fleksibel (lolos jika success: true atau status: 'success')
      if (!gasResult.success && gasResult.status !== "success") {
        throw new Error(gasResult.message || "Gagal mengupload bukti transfer ke server.");
      }

      // 3. Simpan ke Backend AWS DynamoDB
      const awsBody = {
        Amount: amount,
        Name: Name,
        CNC: CNC,
        Email: Email,
        SK: SK,
        // Otomatis mengambil link foto Google Drive asli yang dikembalikan oleh Apps Script
        EvidenceUrl: gasResult.url || gasResult.idKonfirmasi || "Uploaded via App Script",
      };
      await this.$apiBase.$post("/input-santri-laundry?type=bill-laundry-transfer", awsBody);

      commit("changeLoad");

      // 4. Alert Sukses
      await Swal.fire({
        icon: "success",
        title: "Bukti Terkirim!",
        text: `Bukti transfer berhasil diupload (ID: ${gasResult.idKonfirmasi || "-"}). Menunggu verifikasi admin.`,
        timer: 3000,
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
