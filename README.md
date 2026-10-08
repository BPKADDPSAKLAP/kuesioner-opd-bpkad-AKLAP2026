# Kuesioner OPD – BPKAD

## Menjalankan (prototype)
Buka `index.html` di browser. Tanpa pengaturan lain, jawaban tersimpan di browser itu saja; unduh CSV lewat `index.html#admin`.
Untuk pemakaian sebenarnya, unggah folder ini ke hosting statis apa pun (Netlify, GitHub Pages, server OPD).

## Menghubungkan ke Google Sheets (disarankan)
1. Buat Google Sheet baru, misalnya "Hasil Kuesioner OPD 2026".
2. Menu **Extensions > Apps Script**, hapus isi bawaan, tempel isi `Code.gs`, simpan.
3. **Deploy > New deployment > Web app**. Execute as: *Me*. Who has access: *Anyone*. Klik Deploy, izinkan akses, salin **Web app URL**.
4. Buka `config.js`, tempel URL ke `ENDPOINT`, dan ganti daftar `OPDS` dengan nama OPD yang benar.
5. Setiap kali `Code.gs` diubah, buat **New deployment** lagi (URL berubah).
6. Ekspor: di Google Sheet pilih **File > Download > Microsoft Excel (.xlsx)**.

Alur: Website → Apps Script → Google Sheets → unduh XLSX. Satu pengisian = satu baris. Jawaban pilihan ganda dipisah dengan " | ".

## Struktur data
Kolom: Timestamp, ID Respons, OPD, Peran, Lama Terlibat, Q4–Q20. Pertanyaan skala berisi angka 1–5, sehingga rata-rata dapat dihitung langsung (`=AVERAGE(F:F)`) dan siap dikembangkan menjadi dashboard.
