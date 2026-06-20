# 🚀 Welcome to My Repository

[![Follow](https://img.shields.io/github/followers/riyankhamdani?label=Follow%20Me&style=for-the-badge&color=0078d4&logo=github)](https://github.com/riyankhamdani)&nbsp;&nbsp;[![Ko-fi](https://img.shields.io/badge/Ko--fi-F16061?style=for-the-badge&logo=ko-fi&logoColor=white)](https://ko-fi.com/muchamatriyankhamdani)

---

# 🛠️ GitHub Repository Badge Injector

Script sederhana berbasis JavaScript untuk menyisipkan Badge **GitHub Follow** dan **Ko-fi Support** ke seluruh repository GitHub Anda secara massal (otomatis) lewat Browser Console.

## ✨ Fitur
- 🚀 Otomatis mendeteksi semua repository publik/privat milik Anda.
- 🛡️ **Anti-Overwrite:** Tidak menghapus isi `README.md` lama Anda, melainkan menyisipkannya di baris paling atas.
- 🔄 **Auto-Create:** Jika ada repository yang belum punya `README.md`, script akan otomatis membuatkannya baru.
- 🧹 **Smart Replace:** Jika dijalankan ulang, tidak akan membuat badge menjadi dobel.

## 🚀 Cara Penggunaan

1. **Buat GitHub PAT (Personal Access Token):**
   - Pergi ke **Settings** > **Developer Settings** > **Personal Access Tokens**.
   - Berikan izin (scopes) `repo` (untuk mengupdate README).
2. **Copy Script:**
   - Buka file `script.js` di repository ini, lalu salin seluruh kodenya.
3. **Jalankan di Browser:**
   - Buka halaman GitHub Anda.
   - Tekan `F12` atau `Ctrl + Shift + I` untuk membuka **Developer Tools**, lalu pilih tab **Console**.
   - Ubah variabel `TOKEN`, `GITHUB_USERNAME`, dan `KOFI_USERNAME` di bagian atas kode dengan data Anda sendiri.
   - Paste kode ke Console dan tekan **Enter**.
   - Tunggu sampai muncul pesan `🎉 Selesai semua!`.

> ⚠️ **PENTING:** Setelah selesai digunakan, segera **Delete/Revoke** GitHub PAT Anda demi keamanan akun!
