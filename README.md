# DompetKu PWA — Catatan Keuangan Pribadi + Google Sheets

Aplikasi web **mobile-first (PWA)** untuk mencatat pemasukan dan pengeluaran dalam hitungan detik langsung dari HP, terhubung ke Google Sheets eksisting milikmu.

## Struktur File
- `index.html` — Antarmuka utama aplikasi (mobile-first, bottom navigation, modal input cepat, dashboard, riwayat, analitik, pengaturan)
- `styles.css` — Desain bersih dominan putih dengan aksen gradasi indigo–teal dan efek glassmorphism halus
- `app.js` — Logika aplikasi, format Rupiah, grafik Chart.js, insight otomatis, sinkronisasi ke Google Apps Script
- `manifest.json` & `sw.js` — Konfigurasi PWA agar bisa di-install ke layar utama HP
- `icon-192.png` & `icon-512.png` — Ikon aplikasi untuk Android & iOS
- `apps-script/Code.gs` — Backend API Google Apps Script yang terhubung ke sheet `"Pemasukan"` dan `"Pengeluaran"`

---

## Panduan Setup Langkah demi Langkah

### Bagian 1: Deploy Backend Google Apps Script
1. Buka Google Sheets **Keuangan** milikmu.
2. Klik menu **Ekstensi (Extensions)** > **Apps Script**.
3. Hapus seluruh kode contoh di `Code.gs`, lalu salin-tempel seluruh isi file `apps-script/Code.gs` dari paket ini.
4. Klik ikon **Simpan** (Ctrl+S / Cmd+S).
5. **Atur Token Keamanan (Wajib agar hanya kamu yang bisa akses):**
   - Klik ikon **Setelan Proyek (Project Settings / roda gigi)** di panel kiri Apps Script.
   - Gulir ke bagian **Properti Skrip (Script Properties)** > klik **Tambahkan properti skrip (Add script property)**.
   - Properti: `API_TOKEN`
   - Nilai: buat PIN atau kata sandi rahasia pilihanmu (misalnya: `KeuanganEndang2026!`). Simpan.
6. **Deploy sebagai Web App:**
   - Klik tombol biru **Terapkan (Deploy)** di kanan atas > **Deployment baru (New deployment)**.
   - Klik ikon roda gigi di samping "Pilih jenis" > pilih **Aplikasi web (Web app)**.
   - Deskripsi: `DompetKu API v1`
   - Jalankan sebagai (Execute as): **Saya (Me)**
   - Yang memiliki akses (Who has access): **Siapa saja (Anyone)** *(aman karena setiap request tetap wajib membawa `API_TOKEN` rahasia milikmu)*.
   - Klik **Terapkan (Deploy)**, lalu izinkan akses Google Sheets jika diminta.
   - **Salin URL Web App** yang muncul (berakhiran `/exec`).

### Bagian 2: Upload ke GitHub & Aktifkan GitHub Pages
1. Buat akun atau login ke [GitHub](https://github.com).
2. Buat repository baru bernama `dompetku-pwa` (pilih **Public** agar GitHub Pages gratis aktif).
3. Upload semua file dari folder utama (`index.html`, `styles.css`, `app.js`, `manifest.json`, `sw.js`, `icon-192.png`, `icon-512.png`) ke repository tersebut (jangan masukkan folder `apps-script` ke halaman publik jika tidak perlu, atau biarkan saja karena `Code.gs` tidak menyimpan token).
4. Buka tab **Settings** > **Pages** di repository GitHub.
5. Pada bagian **Build and deployment** > **Source**, pilih **Deploy from a branch** > pilih branch `main` dan folder `/ (root)` > klik **Save**.
6. Tunggu 1–2 menit hingga muncul link website seperti `https://username.github.io/dompetku-pwa/`.

### Bagian 3: Hubungkan & Install ke Layar Utama HP
1. Buka link GitHub Pages tersebut di browser HP (**Chrome** untuk Android, **Safari** untuk iPhone).
2. Buka tab **Pengaturan** (ikon roda gigi di navigasi bawah) > masukkan **URL Web App Apps Script** dan **API Token** yang kamu buat tadi > klik **Simpan & Tes Koneksi**.
3. **Install ke Layar Utama:**
   - **Android (Chrome):** Ketuk menu titik tiga (⋮) di kanan atas > pilih **Tambahkan ke Layar utama (Add to Home screen)** / **Install app**.
   - **iPhone (Safari):** Ketuk ikon **Share** (kotak dengan panah ke atas) > pilih **Add to Home Screen (Tambahkan ke Layar Utama)**.

---

## Checklist Pengujian
- [ ] Koneksi di tab **Pengaturan** menampilkan status **Terhubung ke Google Sheets**.
- [ ] Input transaksi **Pengeluaran** selesai dalam < 10 detik dan langsung muncul sebagai baris baru di tab `Pengeluaran` Google Sheets.
- [ ] Input transaksi **Pemasukan** masuk ke tab `Pemasukan` tanpa merusak header atau data lama.
- [ ] Nominal kosong, `0`, atau negatif ditolak dengan pesan validasi yang jelas.
- [ ] Filter periode (*Hari Ini*, *Minggu Ini*, *Bulan Ini*, *Custom*) mengubah angka ringkasan dan grafik secara akurat.
- [ ] Pencarian dan filter kategori di tab **Riwayat** berfungsi lancar.
- [ ] Edit transaksi dan Hapus transaksi (dengan modal konfirmasi) memperbarui baris di Google Sheets.
- [ ] Aplikasi bisa dibuka langsung dari ikon di layar utama HP dalam mode layar penuh (*standalone*).
