// Google Apps Script untuk Kuesioner OPD BPKAD 2026.
// Tempel seluruh isi file ini ke Extensions > Apps Script.

const YEAR = 2026;
const SHEET_RESPONDEN = "DATA RESPONDEN";
const SHEET_ANALISIS = "ANALISIS SKOR";

// Kolom utama dibuat menggunakan uraian pertanyaan agar mudah dibaca.
const HEAD_RESPONDEN = [
  "Timestamp",
  "ID Respons",
  "OPD",
  "Peran Responden",
  "Lama Terlibat dalam Akuntansi/Pelaporan",
  "Pemahaman Alur dan Tahapan Akuntansi",
  "Pemahaman Ketentuan dan Peraturan",
  "Ketersediaan dan Kelengkapan Data/Dokumen",
  "Ketepatan Waktu Penerimaan Data dari Unit Kerja",
  "Kemudahan Melakukan Koreksi/Penyelesaian Perbedaan Data",
  "Kendala yang Paling Sering Dihadapi",
  "Kendala yang Paling Menghambat Pekerjaan",
  "Frekuensi Pengerjaan Ulang akibat Kesalahan/Perbedaan/Perubahan Data",
  "Penyebab Utama Kendala atau Kesalahan",
  "Kemudahan Mengetahui Letak dan Penyebab Perbedaan Data",
  "Kejelasan Tindakan Saat Ditemukan Kesalahan/Perbedaan Data",
  "Sumber Bantuan yang Paling Sering Digunakan",
  "Materi yang Paling Ingin Dipahami/Dikuasai",
  "Bentuk Pembinaan/Dukungan Informasi yang Paling Membantu",
  "Kondisi yang Paling Membutuhkan Bantuan BPKAD",
  "Masalah yang Paling Perlu Segera Diperbaiki",
  "Dukungan/Perubahan yang Paling Diharapkan dari BPKAD"
];

// Sheet kedua menyimpan skor numerik agar analisis/rata-rata tetap mudah dilakukan.
const HEAD_ANALISIS = [
  "Timestamp", "ID Respons", "OPD",
  "Q4 Skor Pemahaman Alur", "Q5 Skor Pemahaman Ketentuan",
  "Q6 Skor Ketersediaan Data/Dokumen", "Q7 Skor Ketepatan Waktu Data",
  "Q8 Skor Kemudahan Koreksi", "Q11 Skor Frekuensi Pengerjaan Ulang",
  "Q13 Skor Kemudahan Menelusuri Perbedaan", "Q14 Skor Kejelasan Tindakan"
];

const UNDERSTAND = ["Sangat Tidak Memahami", "Tidak Memahami", "Cukup Memahami", "Memahami", "Sangat Memahami"];
const ADEQUATE = ["Sangat Tidak Memadai", "Tidak Memadai", "Cukup Memadai", "Memadai", "Sangat Memadai"];
const EASE = ["Sangat Sulit", "Sulit", "Cukup Mudah", "Mudah", "Sangat Mudah"];
const CLEAR = ["Sangat Tidak Jelas", "Tidak Jelas", "Cukup Jelas", "Jelas", "Sangat Jelas"];
const FREQUENCY = ["Tidak pernah", "Jarang", "Kadang-kadang", "Sering", "Sangat sering"];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = getOrCreateSheet_(ss, SHEET_RESPONDEN, HEAD_RESPONDEN);
    migrateReadableHeaders_(sh);
    const an = getOrCreateSheet_(ss, SHEET_ANALISIS, HEAD_ANALISIS);

    const d = JSON.parse(e.postData.contents || "{}");
    const nextNumber = Math.max(1, sh.getLastRow());
    const id = "OPD-" + YEAR + "-" + ("000000" + nextNumber).slice(-6);
    const timestamp = new Date();

    d["ID Respons"] = id;
    d["Timestamp"] = timestamp;

    const row = [
      timestamp, id, d.OPD || "", d.Peran || "", d["Lama Terlibat"] || "",
      scaleText_(d.Q4, UNDERSTAND),
      scaleText_(d.Q5, UNDERSTAND),
      scaleText_(d.Q6, ADEQUATE),
      scaleText_(d.Q7, ADEQUATE),
      scaleText_(d.Q8, EASE),
      text_(d.Q9),
      text_(d.Q10),
      frequencyText_(d.Q11),
      text_(d.Q12),
      scaleText_(d.Q13, EASE),
      scaleText_(d.Q14, CLEAR),
      text_(d.Q15),
      text_(d.Q16),
      text_(d.Q17),
      text_(d.Q18),
      text_(d.Q19),
      text_(d.Q20)
    ];
    sh.appendRow(row);

    an.appendRow([
      timestamp, id, d.OPD || "",
      score_(d.Q4), score_(d.Q5), score_(d.Q6), score_(d.Q7), score_(d.Q8),
      score_(d.Q11), score_(d.Q13), score_(d.Q14)
    ]);

    return out_({ ok: true, id: id });
  } catch (err) {
    return out_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return out_({ ok: true, status: "aktif" });
}

function getOrCreateSheet_(ss, name, headers) {
  let sh = ss.getSheetByName(name);
  if (!sh) sh = ss.insertSheet(name);

  // Hanya membuat header bila sheet benar-benar kosong.
  if (sh.getLastRow() === 0) {
    sh.getRange(1, 1, 1, headers.length).setValues([headers]);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, headers.length).setFontWeight("bold");
    sh.getRange(1, 1, 1, headers.length).setWrap(true);
    sh.setRowHeight(1, 54);
  }
  return sh;
}

function migrateReadableHeaders_(sh) {
  if (sh.getLastRow() < 1) return;
  const current = sh.getRange(1, 1, 1, Math.min(sh.getLastColumn(), HEAD_RESPONDEN.length)).getValues()[0];
  // Versi lama menggunakan Q4, Q5, ... sebagai nama kolom.
  if (String(current[5] || "") !== "Q4") return;

  const lastRow = sh.getLastRow();
  if (lastRow > 1) {
    const rows = sh.getRange(2, 1, lastRow - 1, HEAD_RESPONDEN.length).getValues();
    rows.forEach(r => {
      r[5] = scaleText_(r[5], UNDERSTAND);
      r[6] = scaleText_(r[6], UNDERSTAND);
      r[7] = scaleText_(r[7], ADEQUATE);
      r[8] = scaleText_(r[8], ADEQUATE);
      r[9] = scaleText_(r[9], EASE);
      r[12] = frequencyText_(r[12]);
      r[14] = scaleText_(r[14], EASE);
      r[15] = scaleText_(r[15], CLEAR);
    });
    sh.getRange(2, 1, rows.length, HEAD_RESPONDEN.length).setValues(rows);
  }
  sh.getRange(1, 1, 1, HEAD_RESPONDEN.length).setValues([HEAD_RESPONDEN]);
  sh.setFrozenRows(1);
  sh.getRange(1, 1, 1, HEAD_RESPONDEN.length).setFontWeight("bold");
  sh.getRange(1, 1, 1, HEAD_RESPONDEN.length).setWrap(true);
  sh.setRowHeight(1, 54);
}

function score_(value) {
  const n = Number(value);
  return Number.isInteger(n) && n >= 1 && n <= 5 ? n : "";
}

function scaleText_(value, labels) {
  const n = score_(value);
  return n ? n + " — " + labels[n - 1] : text_(value);
}

function frequencyText_(value) {
  const n = score_(value);
  return n ? n + " — " + FREQUENCY[n - 1] : text_(value);
}

function text_(value) {
  if (Array.isArray(value)) return value.join(" | ");
  return value == null ? "" : String(value);
}

function out_(o) {
  return ContentService.createTextOutput(JSON.stringify(o))
    .setMimeType(ContentService.MimeType.JSON);
}
