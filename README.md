# Kuesioner OPD BPKAD 2026 — Revisi Excel

Paket ini memperbarui pertanyaan dan pilihan berdasarkan file `perbaikan kuisioner.xlsx`, dengan mempertahankan tampilan dan alur website.

## File
- `index.html`: halaman website.
- `app.js`: pertanyaan dan alur pengisian (23 pertanyaan).
- `style.css`: tampilan.
- `config.js`: daftar OPD dan URL Apps Script.
- `Code.gs`: backend Google Apps Script dengan kolom DATA RESPONDEN dan ANALISIS SKOR yang diperbarui.

## Penting sebelum dipublikasikan
1. Buka `config.js` dan isi `ENDPOINT` dengan URL Web App Google Apps Script yang aktif. Paket ini sengaja tidak menyertakan URL karena tidak tersedia pada salinan proyek yang digunakan untuk revisi.
2. Di Google Sheets, pastikan akun Anda memiliki akses ke spreadsheet tujuan.
3. Buka Extensions > Apps Script, ganti isi `Code.gs` dengan file `Code.gs` dari paket ini, lalu simpan.
4. Klik Deploy > Manage deployments. Edit deployment Web App yang digunakan, pilih versi baru, lalu Deploy. Jika memilih New deployment, salin URL terbaru dan masukkan ke `config.js`.
5. Upload seluruh isi folder ke GitHub Pages/hosting, bukan hanya `index.html`.
6. Tes satu respons melalui link publik dan pastikan masuk ke `DATA RESPONDEN` serta `ANALISIS SKOR`.

## Perhatian data lama
Saat ada respons pertama setelah revisi, Apps Script akan memindahkan tab `DATA RESPONDEN` dan/atau `ANALISIS SKOR` yang header-nya berbeda ke tab arsip berjudul `... - ARSIP SEBELUM REVISI`, lalu membuat tab baru dengan struktur yang cocok. Respons tes versi lama tetap tersimpan di arsip dan tidak tercampur dengan format revisi.

## Pertanyaan baru
- Peran responden: PPK SKPD atau Penyusun Laporan Keuangan Perangkat Daerah.
- Pertanyaan pengetahuan Perwali, kesulitan pengumpulan data, jurnal koreksi di SIPD, dan penelusuran selisih SPJ Fungsional dengan LRA.
- Pengetahuan jenis laporan, pilihan tujuh jenis laporan keuangan, dan pengetahuan keterkaitan laporan.
- Materi kebutuhan pembinaan dirinci sesuai Excel.
