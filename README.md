# 🌶️ Website Seblak Juara UMKM

Website pemesanan online modern, responsif, dan siap pakai khusus untuk pelaku **UMKM Kuliner Seblak Nusantara**.

---

## 🌟 Fitur Utama Website

1. **Katalog Menu Interaktif**:
   - Menu Seblak Komplit, Seblak Ceker, Seafood, Mie Jebew, Jamur Enoki, Topping Prasmanan, dan Minuman Segar.
   - Filter kategori (Semua, Paket Seblak, Topping Tambahan, Minuman).
   - Fitur pencarian menu otomatis (Search Bar).

2. **Kustomisasi Level Pedas & Catatan**:
   - Pilihan Level 0 (Manja) sampai Level 5 (Sultan Pedas).
   - Catatan khusus setiap porsi (misal: kuah dipisah, tambah kencur).

3. **Keranjang Belanja Real-Time**:
   - Tambah, kurang, dan hapus pesanan.
   - Perhitungan total biaya otomatis tersimpan di browser (*localStorage*).

4. **Checkout Otomatis ke WhatsApp**:
   - Pelanggan mengisi Nama, Tipe Pesanan (Bungkus / Dine-In / Delivery), dan Alamat.
   - Tombol **"Pesan Langsung via WhatsApp"** otomatis menyusun pesan format pemesanan rapi dan membuka chat WhatsApp penjual.

---

## 🚀 Cara Menjalankan Website

### Opsi 1: Menggunakan Script Python (Rekomendasi)
Buka terminal dan jalankan:
```bash
cd /home/adit/seblak_umkm
python3 server.py
```
Website akan otomatis terbuka di browser pada alamat:  
👉 **http://localhost:8000**

---

### Opsi 2: Buka Langsung File HTML
Anda juga bisa langsung membuka file `index.html` dengan klik ganda di file manager atau jalankan:
```bash
firefox /home/adit/seblak_umkm/index.html
```

---

## ⚙️ Cara Mengubah Nomor WhatsApp & Alamat Toko

Buka file `app.js` dan ubah bagian teratas:
```javascript
const SHOP_CONFIG = {
    name: "Seblak Juara UMKM",
    whatsappNumber: "6281234567890", // Ganti dengan nomor WhatsApp pemilik toko
    address: "Jl. Kuliner Raya No. 45, Sentra Kuliner UMKM",
};
```
