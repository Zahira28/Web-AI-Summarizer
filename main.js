// Fungsi untuk menampilkan riwayat ringkasan dan menambahkan tombol delete
function renderHistory() {
    const riwayatList = document.getElementById("riwayatRingkasan");
    riwayatList.innerHTML = "";
    let history = JSON.parse(localStorage.getItem("summaryHistory")) || [];
  
    if (history.length === 0) {
      riwayatList.innerHTML =
        "<p class='text-gray-700'>Tidak ada riwayat ringkasan.</p>";
      return;
    }
  
    history.forEach((item, index) => {
      let li = document.createElement("li");
      li.className = "flex justify-between items-center";
      li.innerText = item;
  
      // Tombol delete untuk tiap riwayat
      let delBtn = document.createElement("button");
      delBtn.innerText = "Delete";
      delBtn.className =
        "ml-4 px-2 py-1 bg-red-400 text-white rounded hover:bg-red-500 transition";
      delBtn.onclick = function () {
        deleteHistory(index);
      };
  
      li.appendChild(delBtn);
      riwayatList.appendChild(li);
    });
  }
  
  // Fungsi untuk menghapus item riwayat berdasarkan index
  function deleteHistory(index) {
    let history = JSON.parse(localStorage.getItem("summaryHistory")) || [];
    history.splice(index, 1);
    localStorage.setItem("summaryHistory", JSON.stringify(history));
    renderHistory();
  }
  
  // Fungsi untuk event tombol "Ringkas"
  function ringkas() {
    var input = document.getElementById("inputText").value.trim(); // value.trim utk Hapus spasi di awal dan akhir
    if (input === "") return;
  
    // Simulasi ringkasan: output sama dengan input (karena belum terhubung ke model AI)
    var summary = input;
    document.getElementById("summaryText").value = summary;
  
    // Simpan ringkasan ke localStorage dan render riwayat
    let history = JSON.parse(localStorage.getItem("summaryHistory")) || [];
    history.push(summary);
    localStorage.setItem("summaryHistory", JSON.stringify(history));
    renderHistory();
  }
  
  // Fungsi untuk event tombol "Reset"
  function reset() {
    document.getElementById("inputText").value = "";
    document.getElementById("summaryText").value =
      "Hasil ringkasan teks akan muncul di sini setelah proses ringkasan selesai.";
    // Riwayat tetap tersimpan di localStorage
  }
  
  function toggleTheme() {
    const html = document.documentElement;
    const isDark = html.classList.contains('dark');
  
    if (isDark) {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const html = document.documentElement;
    const savedTheme = localStorage.getItem('theme');
    const switchInput = document.getElementById('themeSwitch');
  
    // Atur tema berdasarkan localStorage
    if (savedTheme === 'dark') {
      html.classList.add('dark');
      if (switchInput) switchInput.checked = true;
    } else {
      html.classList.remove('dark');
      if (switchInput) switchInput.checked = false;
    }
  
    // Event listener ketika checkbox diubah
    if (switchInput) {
      switchInput.addEventListener('change', toggleTheme);
    }
  });
  
  
  
  // Render riwayat saat halaman dimuat
  window.onload = renderHistory;