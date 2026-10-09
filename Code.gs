// Google Apps Script — Kuesioner OPD BPKAD 2026 (revisi berdasarkan Excel)
// Tempel seluruh isi file ini ke Extensions > Apps Script, lalu buat deployment baru.
const YEAR = 2026;
const SHEET_RESPONDEN = "DATA RESPONDEN";
const SHEET_ANALISIS = "ANALISIS SKOR";
const HEAD_RESPONDEN = [
 "Timestamp","ID Respons","OPD","Peran Responden","Lama Terlibat dalam Akuntansi/Pelaporan",
 "Pemahaman Alur dan Tahapan Akuntansi","Pengetahuan Perwali Kebijakan Akuntansi",
 "Kesulitan Pengumpulan Data dari Bidang/Unit","Pemahaman Input Jurnal Koreksi Kode Rekening di SIPD",
 "Kesulitan Menelusuri Selisih SPJ Fungsional dengan LRA","Kendala yang Paling Sering Dihadapi",
 "Kendala yang Paling Menghambat Pekerjaan","Frekuensi Pengerjaan Ulang","Penyebab Utama Kendala/Kesalahan",
 "Pengetahuan Jenis Laporan Keuangan OPD","Jenis Laporan Keuangan yang Dipilih","Pengetahuan Keterkaitan Antar Laporan Keuangan",
 "Kemudahan Mengetahui Letak/Penyebab Perbedaan Data","Kejelasan Tindakan Saat Ada Kesalahan/Perbedaan",
 "Sumber Bantuan yang Paling Sering Digunakan","Materi yang Paling Ingin Dipahami/Dikuasai",
 "Bentuk Pembinaan/Dukungan yang Paling Membantu","Kondisi yang Membutuhkan Bantuan BPKAD",
 "Masalah yang Perlu Segera Dibahas/Dijelaskan","Dukungan/Perubahan yang Diharapkan dari BPKAD"
];
const HEAD_ANALISIS = ["Timestamp","ID Respons","OPD","Q4 Skor Pemahaman Alur","Q11 Frekuensi Pengerjaan Ulang (1-5)","Q16 Skor Kemudahan Menelusuri Perbedaan","Q17 Skor Kejelasan Tindakan","Q5 Mengetahui Perwali (Ya=1)","Q6 Kesulitan Mengumpulkan Data (Ya=1)","Q7 Memahami Jurnal Koreksi SIPD (Ya=1)","Q8 Kesulitan Menelusuri Selisih (Ya=1)","Q13 Mengetahui Jenis Laporan (Ya=1)","Q15 Mengetahui Keterkaitan Laporan (Ya=1)"];
const UNDERSTAND=["Sangat Tidak Memahami","Tidak Memahami","Cukup Memahami","Memahami","Sangat Memahami"];
const EASE=["Sangat Sulit","Sulit","Cukup Mudah","Mudah","Sangat Mudah"];
const CLEAR=["Sangat Tidak Jelas","Tidak Jelas","Cukup Jelas","Jelas","Sangat Jelas"];
const FREQUENCY=["Tidak pernah","Jarang","Kadang-kadang","Sering","Sangat sering"];
function doPost(e){
 const lock=LockService.getScriptLock(); lock.waitLock(20000);
 try{
  const ss=SpreadsheetApp.getActiveSpreadsheet();
  const sh=getCompatibleSheet_(ss,SHEET_RESPONDEN,HEAD_RESPONDEN,"DATA RESPONDEN - ARSIP SEBELUM REVISI");
  const an=getCompatibleSheet_(ss,SHEET_ANALISIS,HEAD_ANALISIS,"ANALISIS SKOR - ARSIP SEBELUM REVISI");
  const d=JSON.parse(e.postData.contents||"{}");
  const id="OPD-"+YEAR+"-"+("000000"+(sh.getLastRow())).slice(-6);
  const timestamp=new Date();
  const val=k=>text_(d[k]);
  const row=[timestamp,id,val("OPD"),val("Peran"),val("Lama Terlibat"),scaleText_(d.Q4,UNDERSTAND),val("Q5"),val("Q6"),val("Q7"),val("Q8"),val("Q9"),val("Q10"),frequencyText_(d.Q11),val("Q12"),val("Q13"),val("Q14"),val("Q15"),scaleText_(d.Q16,EASE),scaleText_(d.Q17,CLEAR),val("Q18"),val("Q19"),val("Q20"),val("Q21"),val("Q22"),val("Q23")];
  sh.appendRow(row);
  an.appendRow([timestamp,id,val("OPD"),score_(d.Q4),frequencyScore_(d.Q11),score_(d.Q16),score_(d.Q17),yes_(d.Q5),yes_(d.Q6),yes_(d.Q7),yes_(d.Q8),yes_(d.Q13),yes_(d.Q15)]);
  return out_({ok:true,id:id});
 }catch(err){return out_({ok:false,error:String(err)});}finally{lock.releaseLock();}
}
function doGet(){return out_({ok:true,status:"aktif"});}
function getCompatibleSheet_(ss,name,headers,archiveName){
 let sh=ss.getSheetByName(name);
 if(sh && sh.getLastRow()>0){
  const old=sh.getRange(1,1,1,Math.max(1,sh.getLastColumn())).getDisplayValues()[0];
  const same=old.length===headers.length && headers.every((h,i)=>old[i]===h);
  if(!same){let archive=archiveName,idx=2;while(ss.getSheetByName(archive))archive=archiveName+" "+(idx++);sh.setName(archive);sh=null;}
 }
 if(!sh)sh=ss.insertSheet(name);
 if(sh.getLastRow()===0){sh.getRange(1,1,1,headers.length).setValues([headers]);sh.setFrozenRows(1);sh.getRange(1,1,1,headers.length).setFontWeight("bold").setWrap(true);sh.setRowHeight(1,60);sh.getRange(1,1,1,headers.length).setBackground("#e9eee7");}
 return sh;
}
function score_(v){const n=Number(v);return Number.isInteger(n)&&n>=1&&n<=5?n:"";}
function frequencyScore_(v){if(typeof v==="string"){const i=FREQUENCY.indexOf(v);return i>=0?i+1:score_(v);}return score_(v);}
function scaleText_(v,labels){const n=score_(v);return n?n+" — "+labels[n-1]:text_(v);}
function frequencyText_(v){const n=frequencyScore_(v);return n?n+" — "+FREQUENCY[n-1]:text_(v);}
function yes_(v){return String(v||"").toLowerCase()==="ya"?1:String(v||"").toLowerCase()==="tidak"?0:"";}
function text_(v){return Array.isArray(v)?v.join(" | "):v==null?"":String(v);}
function out_(o){return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);}
