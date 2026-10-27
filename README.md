# Yasin & Tahlil

Aplikasi web ringan untuk membaca Surah Yasin, menghitung bacaan Tahlil, dan melihat jadwal sholat & imsak.
Vanilla HTML + CSS + JavaScript (ES modules) — tanpa build step dan tanpa dependensi npm.

## Menjalankan

ES modules butuh server HTTP (tidak bisa dibuka langsung via `file://`):

```bash
cd "Aplikasi Yasin & Tahlil"
python3 -m http.server 8000
```

Lalu buka <http://localhost:8000>.

## Deploy ke GitHub Pages

Unggah isi folder ini ke repositori, lalu aktifkan **Settings → Pages → Deploy from a branch** (root).
Semua path bersifat relatif dan routing memakai hash (`#/`, `#/yasin`, `#/tahlil`, `#/jadwal`, `#/menu`), jadi tidak perlu konfigurasi tambahan.

## Struktur

```
index.html               kerangka halaman + font
manifest.webmanifest     PWA manifest, ikon di icons/
css/theme.css            token warna tema (terang + gelap)
css/app.css              gaya komponen, tata letak, animasi
js/app.js                router hash + drawer menu
js/prayer.js             perhitungan waktu sholat (Kemenag RI)
js/store.js, js/ui.js    localStorage aman, toast, tema
js/icons.js              ikon SVG
js/data/*.js             data Yasin (API + cadangan), tahlil, menu, fitur
js/views/*.js            layar Beranda, Yasin, Tahlil, Jadwal, Menu
```

## Catatan

- Teks lengkap Surah Yasin diambil dari `https://equran.id/api/v2/surat/36` lalu disimpan di localStorage.
  Saat luring tanpa cache, hanya 7 ayat pertama yang tampil.
- Waktu sholat dihitung secara astronomis; selisih 1–2 menit dari jadwal resmi bisa terjadi.

## Lokasi & jadwal sholat

Lokasi selalu otomatis, tanpa pilihan kota: setiap kali aplikasi dibuka (atau kembali
dibuka setelah lebih dari 1 menit), aplikasi meminta posisi GPS akurasi tinggi, lalu
menghitung jadwal dari koordinat itu dan zona waktu perangkat. Nama daerah
(kecamatan, kota) diambil dari BigDataCloud; koordinat dibulatkan ±100 m sebelum
dikirim. Bila izin lokasi ditolak, layar Jadwal menampilkan alasannya dan tombol
"Coba lagi"; sampai lokasi pertama terdeteksi, jadwal sementara memakai Jakarta.
Deteksi lokasi butuh HTTPS atau `localhost`.
