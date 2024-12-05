export default {
  data() {
    return {
      buttonText: 'Copy'
    }
  },
  methods: {
    formatDate(dateString) {
      // Periksa apakah dateString terdefinisi
      if (!dateString || typeof dateString !== 'string') {
        return ""; // Atau tangani sesuai kebutuhan Anda
      }

      const months = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
      ];

      // Pastikan dateString sesuai format yang diharapkan sebelum dibagi (split)
      if (dateString.indexOf('-') !== -1) {
        const [year, month, day] = dateString.split('-');
        // Pastikan year, month, dan day merupakan bilangan bulat yang valid sebelum digunakan
        const formattedDate = `${parseInt(day, 10)} ${months[parseInt(month, 10) - 1]} ${year}`;

        return formattedDate;
      } else {
        return ""; // Atau tangani sesuai kebutuhan jika format tidak sesuai
      }
    },
    nominal(a) {
      const data = new Intl.NumberFormat('id-ID', {
        currency: 'IDR',
        minimumFractionDigits: 0
      }).format(a)

      return data
    },
    rupiah(a) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(a);
    },
    async copyToClipboard(text) {
      try {
        await navigator.clipboard.writeText(text);
        this.buttonText = 'Copied!';
        setTimeout(() => {
          this.buttonText = 'Copy';
        }, 2000);
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    }
  },
}
