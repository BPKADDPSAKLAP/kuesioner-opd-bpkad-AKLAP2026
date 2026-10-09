"use strict";
const STAGES=[
 {n:"Profil",t:"Profil Responden"},
 {n:"Kondisi",t:"Kondisi Pelaksanaan",intro:"Nilai setiap pernyataan berdasarkan kondisi yang benar-benar terjadi dalam pekerjaan Anda di OPD."},
 {n:"Kendala",t:"Kendala dan Akar Permasalahan"},
 {n:"Pengetahuan",t:"Pengetahuan Laporan Keuangan"},
 {n:"Penyelesaian",t:"Rekonsiliasi dan Penyelesaian Masalah"},
 {n:"Pembinaan",t:"Kebutuhan Pemahaman dan Pembinaan"},
 {n:"Prioritas",t:"Prioritas Perbaikan"}];
const S_UNDERSTAND=["Sangat Tidak Memahami","Tidak Memahami","Cukup Memahami","Memahami","Sangat Memahami"];
const S_ADEQUATE=["Sangat Tidak Memadai","Tidak Memadai","Cukup Memadai","Memadai","Sangat Memadai"];
const S_EASE=["Sangat Sulit","Sulit","Cukup Mudah","Mudah","Sangat Mudah"];
const S_CLEAR=["Sangat Tidak Jelas","Tidak Jelas","Cukup Jelas","Jelas","Sangat Jelas"];
const C9=["Kurang memahami ketentuan/peraturan","Kurang memahami prosedur","Kesulitan pencatatan transaksi","Kesulitan menentukan akun/rekening","Data atau dokumen tidak lengkap","Data terlambat diterima","Terdapat perbedaan data antar sumber","Kesulitan melakukan rekonsiliasi","Kesulitan melakukan koreksi/penyesuaian","Kesulitan menyusun laporan","Kesalahan input","Perubahan ketentuan yang cepat","Keterbatasan waktu","Keterbatasan jumlah/kemampuan SDM","Koordinasi antarunit belum optimal","Permasalahan aplikasi/sistem","Kurangnya informasi atau arahan","Lainnya"];
const CAUSES=["Kurangnya pemahaman","Ketentuan/prosedur sulit dipahami","Informasi tidak diperoleh tepat waktu","Data dari sumber berbeda tidak sama","Dokumen pendukung tidak lengkap","Kesalahan manusia/input","Koordinasi antarunit","Keterbatasan SDM","Keterbatasan waktu","Perubahan data/transaksi","Sistem/aplikasi","Kurangnya pendampingan","Lainnya"];
const MATERIALS=["Peraturan terkait akuntansi dan pelaporan","Alur dan Tahapan Penyusunan Laporan Keuangan Perangkat Daerah","Hubungan antar Jenis Laporan Keuangan yang disusun oleh Perangkat Daerah","Cara penyusunan Jurnal koreksi dan penginputan di SIPD","Penyelesaian permasalahan perbedaan data laporan antara SPJ Fungsional dan LRA","Penjelasan lebih lanjut tentang penggunaan aplikasi SIPD RI menu Akuntansi Pelaporan","Lainnya"];
const SUPPORT=["Panduan langkah demi langkah","SOP/alur proses","Contoh kasus dan penyelesaiannya","Pelatihan teknis","Sosialisasi","Pendampingan langsung","Konsultasi individual","Forum tanya jawab","Video/tutorial","FAQ atau kumpulan permasalahan yang sering terjadi","Lainnya"];
const Q=[
 {s:0,k:"opd",lab:"OPD",q:"OPD",type:"combo",help:"Klik kolom di bawah untuk melihat daftar, atau ketik sebagian nama untuk mencari."},
 {s:0,k:"peran",lab:"Peran",q:"Peran Anda dalam pelaksanaan akuntansi dan pelaporan keuangan",type:"single",opts:["PPK SKPD","Penyusun Laporan Keuangan Perangkat Daerah"]},
 {s:0,k:"lama",lab:"Lama terlibat",q:"Lama Anda terlibat dalam pelaksanaan akuntansi dan/atau pelaporan keuangan",type:"single",opts:["Kurang dari 1 tahun","1–3 tahun","4–5 tahun","Lebih dari 5 tahun"]},
 {s:1,k:"q4",lab:"Pemahaman alur",q:"Seberapa baik Anda memahami alur dan tahapan pelaksanaan akuntansi pada OPD?",type:"scale",sc:S_UNDERSTAND},
 {s:1,k:"q5",lab:"Pengetahuan Perwali",q:"Apakah Anda mengetahui Perwali tentang Kebijakan Akuntansi?",type:"single",opts:["Ya","Tidak"]},
 {s:1,k:"q6",lab:"Pengumpulan data",q:"Apakah Anda mengalami kesulitan dalam pengumpulan data dari bidang atau unit kerja?",type:"single",opts:["Ya","Tidak"]},
 {s:1,k:"q7",lab:"Jurnal koreksi di SIPD",q:"Apakah Anda memahami cara penginputan jurnal pada SIPD apabila terdapat kesalahan penginputan kode rekening?",type:"single",opts:["Ya","Tidak"]},
 {s:1,k:"q8",lab:"Penelusuran selisih SPJ dan LRA",q:"Apakah Anda mengalami kesulitan dalam penelusuran data jika terdapat selisih antara SPJ Fungsional dengan LRA?",type:"single",opts:["Ya","Tidak"]},
 {s:2,k:"q9",lab:"Kendala",q:"Kendala apa yang paling sering Anda hadapi dalam pelaksanaan akuntansi dan pelaporan?",type:"multi",max:3,opts:C9,other:"Sebutkan kendala lainnya"},
 {s:2,k:"q10",lab:"Kendala paling menghambat",q:"Dari kendala yang Anda pilih, mana yang paling menghambat penyelesaian pekerjaan Anda?",type:"single",from:"q9",help:"Pilihan mengikuti jawaban Anda pada pertanyaan sebelumnya."},
 {s:2,k:"q11",lab:"Pengulangan pekerjaan",q:"Seberapa sering pekerjaan akuntansi atau pelaporan harus diperbaiki atau diulang karena kesalahan, perbedaan, atau perubahan data?",type:"single",opts:["Tidak pernah","Jarang","Kadang-kadang","Sering","Sangat sering"]},
 {s:2,k:"q12",lab:"Penyebab utama",q:"Menurut Anda, apa penyebab utama terjadinya kendala atau kesalahan tersebut?",type:"multi",max:3,opts:CAUSES,other:"Sebutkan penyebab lainnya"},
 {s:3,k:"q13",lab:"Pengetahuan jenis laporan",q:"Apakah Anda mengetahui jenis Laporan Keuangan yang harus disusun oleh Perangkat Daerah?",type:"single",opts:["Ya","Tidak"]},
 {s:3,k:"q14",lab:"Jenis laporan keuangan",q:"Pilih jenis Laporan Keuangan yang harus disusun oleh OPD.",type:"multi",max:7,opts:["Laporan Realisasi Anggaran (LRA)","Laporan Perubahan Saldo Anggaran Lebih (LPSAL)","Neraca","Laporan Operasional (LO)","Laporan Arus Kas (LAK)","Laporan Perubahan Ekuitas (LPE)","Catatan atas Laporan Keuangan (CaLK)"],help:"Pilih semua jenis laporan yang menurut Anda harus disusun oleh OPD."},
 {s:3,k:"q15",lab:"Keterkaitan laporan keuangan",q:"Apakah Anda mengetahui keterkaitan antar Laporan Keuangan yang disusun oleh Perangkat Daerah?",type:"single",opts:["Ya","Tidak"]},
 {s:4,k:"q16",lab:"Menelusuri perbedaan data",q:"Seberapa mudah Anda mengetahui letak dan penyebab ketika terdapat perbedaan data dalam proses rekonsiliasi atau pemeriksaan?",type:"scale",sc:S_EASE,help:"Jawab berdasarkan pengalaman yang pernah Anda alami dalam pekerjaan."},
 {s:4,k:"q17",lab:"Kejelasan tindakan",q:"Seberapa jelas Anda mengetahui tindakan yang harus dilakukan ketika ditemukan perbedaan atau kesalahan data?",type:"scale",sc:S_CLEAR,help:"Jawab berdasarkan pengalaman yang pernah Anda alami dalam pekerjaan."},
 {s:4,k:"q18",lab:"Sumber bantuan",q:"Ketika mengalami permasalahan akuntansi atau pelaporan, sumber bantuan atau solusi apa yang paling sering Anda gunakan terlebih dahulu?",type:"single",opts:["Pedoman/peraturan yang tersedia","Rekan kerja dalam OPD","BPKAD","OPD lain","Contoh kasus/solusi sebelumnya","Mencoba menyelesaikan sendiri","Lainnya"],other:"Sebutkan sumber bantuan lainnya"},
 {s:5,k:"q19",lab:"Materi yang ingin dipahami",q:"Materi apa yang paling ingin Anda pahami atau kuasai lebih lanjut dalam pelaksanaan akuntansi dan pelaporan?",type:"multi",max:5,opts:MATERIALS,other:"Sebutkan materi lainnya"},
 {s:5,k:"q20",lab:"Bentuk pembinaan",q:"Bentuk pembinaan atau dukungan informasi apa yang paling membantu Anda dalam melaksanakan pekerjaan?",type:"multi",max:3,opts:SUPPORT,other:"Sebutkan bentuk lainnya"},
 {s:5,k:"q21",lab:"Waktu membutuhkan bantuan",q:"Pada kondisi apa Anda paling membutuhkan bantuan atau penjelasan dari BPKAD?",type:"multi",help:"Pilih semua kondisi yang sesuai.",opts:["Saat terdapat perubahan ketentuan","Saat menemukan transaksi/permasalahan yang tidak biasa","Saat terjadi perbedaan data","Saat melakukan rekonsiliasi","Saat melakukan koreksi/penyesuaian","Saat menyusun laporan","Saat mendekati batas waktu pelaporan","Saat menerima hasil pemeriksaan/reviu","Secara rutin sebagai pembinaan","Lainnya"],other:"Sebutkan kondisi lainnya"},
 {s:6,k:"q22",lab:"Masalah paling mendesak",q:"Menurut Anda, masalah apa yang paling perlu segera dibahas atau dijelaskan agar pelaksanaan akuntansi dan pelaporan keuangan dapat berjalan lancar pada OPD Anda?",type:"area",ph:"Tuliskan masalah yang paling perlu segera dibahas atau dijelaskan..."},
 {s:6,k:"q23",lab:"Harapan kepada BPKAD",q:"Dukungan atau perubahan apa yang paling Anda harapkan dari BPKAD agar pelaksanaan akuntansi dan pelaporan menjadi lebih mudah, tepat, dan efektif?",type:"area",ph:"Tuliskan dukungan, perubahan proses, pembinaan, pendampingan, informasi, atau bentuk bantuan lain yang paling Anda butuhkan..."}];
Q.forEach((q,i)=>q.no=i+1);
const KEY="kuesioner-opd-draft",POS=KEY+"-pos",DONE="kuesioner-opd-hasil";
let A=load(KEY,{}),i=0,mode="intro",er=null,busy=false,popping=false;
const $=s=>document.querySelector(s),app=$("#app");
function load(k,d){try{const v=JSON.parse(localStorage.getItem(k));return v==null?d:v}catch(e){return d}}
function put(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
const save=()=>put(KEY,A);
const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const p2=n=>String(n).padStart(2,"0");
const filled=()=>Object.keys(A).length>0;
const incL=v=>Array.isArray(v)?v.includes("Lainnya"):v==="Lainnya";

// Nilai akhir sebuah jawaban. "Lainnya" selalu diikuti keterangan responden, termasuk di Q10 (mengikuti Q9).
function val(q,a=A){const o=String((q.other?a[q.k+"_o"]:q.from?a[q.from+"_o"]:"")||"").trim(),v=a[q.k],f=x=>x==="Lainnya"&&o?"Lainnya — "+o:x;return Array.isArray(v)?v.map(f):f(v)}
function opts(q){if(!q.from)return q.opts;const s=A[q.from]||[];return Q.find(x=>x.k==q.from).opts.filter(o=>s.includes(o))}
function label(q,o){return o==="Lainnya"?val(q,{...A,[q.k]:o}):o}
// Q10 hanya boleh berisi pilihan yang masih dipilih pada Q9
function sanitize(){const q=Q.find(x=>x.from);if(!q)return;const s=Array.isArray(A[q.from])?A[q.from]:[];if(A[q.k]&&!s.includes(A[q.k]))delete A[q.k];if(s.length==1)A[q.k]=s[0];save()}
function miss(q){const v=A[q.k];if(v==null||v===""||(Array.isArray(v)&&!v.length)||(typeof v=="string"&&!v.trim()))return true;return !!(q.other&&incL(v)&&!String(A[q.k+"_o"]||"").trim())}

// ---------- tampilan dasar ----------
function stagesNav(){const n=$("#stages");if(mode!=="q"){n.hidden=true;return}n.hidden=false;
 if(n.children.length!=STAGES.length)n.innerHTML=STAGES.map((x,j)=>`<li class="stage"><span class="ln"><i></i></span><span class="nm"><b>${p2(j+1)}</b><span class="t">${x.n}</span></span></li>`).join("");
 const s=Q[i].s;[...n.children].forEach((li,j)=>{const ix=Q.filter(q=>q.s==j),f=ix[0].no-1;
  li.className="stage "+(j<s?"done":j==s?"now":"");j==s?li.setAttribute("aria-current","step"):li.removeAttribute("aria-current");
  li.querySelector("i").style.width=(j<s?100:j==s?Math.round((i-f+.5)/ix.length*100):0)+"%"})}
function show(html,nav=""){app.innerHTML=`<div class="pg">${html}</div>${nav}`;stagesNav();window.scrollTo(0,0);const h=app.querySelector("h1,h2");if(h){h.tabIndex=-1;h.focus({preventScroll:true})}}
const navBar=(l,r,rid="nx",bid="bk")=>`<div class="nav"><div class="wrap"><button class="btn ghost" id="${bid}">${l}</button><button class="btn" id="${rid}">${r}</button></div></div>`;
const push=s=>{if(!popping)history.pushState(s,"")};

// ---------- halaman pembuka ----------
function intro(){mode="intro";er=null;push({m:"intro"});const has=filled(),pos=load(POS,0);
 show(`<div class="eyebrow"><i></i>BPKAD · Kuesioner Internal OPD</div>
 <h1 class="ttl">Identifikasi Kebutuhan<br>dan Kendala OPD</h1>
 <p class="sub">Pelaksanaan Akuntansi<br>dan Pelaporan Keuangan</p>
 <p class="tagline">Memahami kondisi nyata.<br>Menentukan pembinaan yang tepat.</p>
 <ul class="facts"><li><b>${Q.length}</b>pertanyaan</li><li><b>8–10</b>menit</li><li>Tanpa data pribadi</li></ul>
 <div class="act"><button class="btn" id="go">${has?"Lanjutkan Mengisi":"Mulai Mengisi"}</button>${has?`<button class="btn ghost" id="reset">Mulai dari awal</button>`:""}</div>
 <div class="fine"><p>Kuesioner ini memberi gambaran mengenai pelaksanaan akuntansi dan pelaporan keuangan pada OPD: tingkat pemahaman, kendala, penyebab permasalahan, kebutuhan pembinaan, dan dukungan yang diperlukan dari BPKAD.</p><p>Tidak ada jawaban benar atau salah. Mohon menjawab sesuai kondisi yang sebenarnya Anda alami.</p></div>`);
 $("#go").onclick=()=>{if(!has)return go(0);pos==="r"?review():go(Math.min(Math.max(+pos||0,0),Q.length-1))};
 const r=$("#reset");if(r)r.onclick=()=>{if(confirm("Hapus semua jawaban yang sudah tersimpan dan mulai dari awal?")){A={};save();put(POS,0);intro()}}}

// ---------- pertanyaan ----------
function go(n){if(Q[n].from&&!opts(Q[n]).length)n=Q.findIndex(x=>x.k==Q[n].from);i=n;mode="q";push({m:"q",i:n,er});put(POS,n);draw()}
function draw(){const q=Q[i],st=STAGES[q.s];if(q.from)sanitize();
 const v=A[q.k],multi=q.type=="multi";let body="",help=q.help||"";
 if(multi&&q.max&&!help)help=`Pilih maksimal ${q.max} jawaban.`;
 if(q.from&&opts(q).length==1)help="Anda hanya memilih satu kendala pada pertanyaan sebelumnya, sehingga pilihan ini terisi otomatis.";
 if(q.type=="combo")body=`<div class="combo"><input type="text" id="cb" role="combobox" aria-expanded="false" aria-controls="lb" aria-autocomplete="list" aria-labelledby="qt" autocomplete="off" placeholder="Pilih atau ketik nama OPD" value="${esc(v||"")}"><ul id="lb" role="listbox" hidden></ul></div>`;
 else if(q.type=="scale")body=`<div class="scale" role="radiogroup" aria-labelledby="qt">${q.sc.map((l,j)=>`<button type="button" class="opt" role="radio" aria-checked="${v==j+1}" data-v="${j+1}" aria-label="${j+1} – ${l}">${j+1}<small>${l}</small></button>`).join("")}</div><div class="ends"><span>1 = ${q.sc[0]}</span><span>5 = ${q.sc[4]}</span></div>`;
 else if(q.type=="area")body=`<textarea id="ta" placeholder="${esc(q.ph)}" aria-labelledby="qt">${esc(v||"")}</textarea>`;
 else{const L=opts(q),sel=multi?(v||[]):[v];
  body=`<div class="opts ${L.length>6?"two":""}" role="${multi?"group":"radiogroup"}" aria-labelledby="qt">${L.map(o=>`<button type="button" class="opt" role="${multi?"checkbox":"radio"}" aria-checked="${sel.includes(o)}" data-v="${esc(o)}"><span class="box"></span><span>${esc(label(q,o))}</span></button>`).join("")}</div>`;
  if(multi&&q.max)body+=`<p class="count" id="cnt" aria-live="polite"></p>`;
  if(q.other)body+=`<div class="extra" id="ex" hidden><label for="ot">${q.other}</label><input type="text" id="ot" value="${esc(A[q.k+"_o"]||"")}"></div>`}
 const lastInSec=i==Q.length-1||Q[i+1].s!=q.s;
 show(`<div class="cat">Tahap ${p2(q.s+1)} · ${st.t}</div>
 <div class="${q.s==5?"reflect":""}"><div class="qn"><b>${p2(q.no)}</b> dari ${Q.length}</div><h2 id="qt">${q.q}</h2>
 ${st.intro&&q.no==4?`<p class="note">${st.intro}</p>`:""}${help?`<p class="help">${help}</p>`:""}${body}<p class="err" id="err" role="alert"></p></div>`,
 navBar("Kembali",er!=null?(lastInSec?"Simpan dan kembali ke ringkasan":"Lanjut"):i==Q.length-1?"Periksa Jawaban":"Lanjut"));
 bind(q);
 $("#bk").onclick=()=>er!=null?(i>0&&Q[i-1].s==q.s?go(i-1):review()):i==0?intro():go(i-1);
 $("#nx").onclick=next}

function err(m,f){const e=$("#err");e.textContent=m;e.classList.add("show");if(f)f.focus()}
function bind(q){
 if(q.type=="combo"){const cb=$("#cb"),lb=$("#lb");let on=-1;
  const close=()=>{lb.hidden=true;cb.setAttribute("aria-expanded","false");cb.removeAttribute("aria-activedescendant");on=-1};
  const list=()=>{const t=cb.value==A[q.k]?"":cb.value.trim().toLowerCase(),r=CONFIG.OPDS.filter(o=>o.toLowerCase().includes(t));
   lb.innerHTML=r.length?r.map((o,j)=>`<li role="option" id="o${j}" aria-selected="${o==A[q.k]}" data-v="${esc(o)}">${esc(o)}</li>`).join(""):`<li class="none">Tidak ditemukan</li>`;
   lb.hidden=false;cb.setAttribute("aria-expanded","true");on=-1;cb.removeAttribute("aria-activedescendant")};
  const pick=o=>{cb.value=o;A[q.k]=o;save();close();$("#err").classList.remove("show")};
  cb.oninput=()=>{const m=CONFIG.OPDS.find(o=>o.toLowerCase()==cb.value.trim().toLowerCase());if(m){A[q.k]=m;save()}list()};
  cb.onfocus=list;cb.onclick=()=>{if(lb.hidden)list()};cb.onblur=close;
  cb.onkeydown=e=>{if(e.key=="ArrowDown"&&lb.hidden){list();e.preventDefault();return}
   const li=[...lb.querySelectorAll("li[data-v]")];
   if(e.key=="ArrowDown"){on=Math.min(on+1,li.length-1);e.preventDefault()}else if(e.key=="ArrowUp"){on=Math.max(on-1,0);e.preventDefault()}
   else if(e.key=="Enter"&&li[on]){pick(li[on].dataset.v);e.preventDefault();return}else if(e.key=="Escape"){close();return}else return;
   li.forEach((l,j)=>l.classList.toggle("on",j==on));if(li[on]){cb.setAttribute("aria-activedescendant",li[on].id);li[on].scrollIntoView({block:"nearest"})}};
  lb.onmousedown=e=>{e.preventDefault();const l=e.target.closest("li[data-v]");if(l)pick(l.dataset.v)}}
 else if(q.type=="area"){$("#ta").oninput=e=>{A[q.k]=e.target.value;save();$("#err").classList.remove("show")}}
 else{const multi=q.type=="multi",ex=$("#ex"),ot=$("#ot"),cnt=$("#cnt"),all=()=>app.querySelectorAll(".opt");
  const sync=()=>{const v=A[q.k];if(ex)ex.hidden=!incL(v);
   if(cnt)cnt.textContent=`${(v||[]).length} dari ${q.max} dipilih`;
   if(multi&&q.max)all().forEach(b=>b.disabled=(v||[]).length>=q.max&&!(v||[]).includes(b.dataset.v));
   if(!multi){const r=[...all()],c=r.find(b=>b.getAttribute("aria-checked")=="true")||r[0];r.forEach(b=>b.tabIndex=b==c?0:-1)}};
  sync();if(ot)ot.oninput=e=>{A[q.k+"_o"]=e.target.value;save();$("#err").classList.remove("show")};
  all().forEach(b=>b.onclick=()=>{const o=b.dataset.v;$("#err").classList.remove("show");
   if(multi){const v=A[q.k]||[];A[q.k]=v.includes(o)?v.filter(x=>x!==o):[...v,o]}else A[q.k]=q.type=="scale"?+o:o;
   save();all().forEach(x=>x.setAttribute("aria-checked",multi?(A[q.k]||[]).includes(x.dataset.v):String(A[q.k])==x.dataset.v));sync();
   if(q.other&&o=="Lainnya"&&incL(A[q.k]))ot.focus()});
  if(!multi)app.querySelectorAll('[role=radiogroup]').forEach(g=>g.onkeydown=e=>{const d={ArrowDown:1,ArrowRight:1,ArrowUp:-1,ArrowLeft:-1}[e.key],b=[...g.querySelectorAll(".opt")],j=b.indexOf(document.activeElement);
   if(!d||j<0)return;e.preventDefault();const t=b[(j+d+b.length)%b.length];t.focus();t.click()})}}

function next(){const q=Q[i];
 if(q.type=="combo"){const m=CONFIG.OPDS.find(o=>o.toLowerCase()==$("#cb").value.trim().toLowerCase());if(!m)return err("Silakan pilih nama OPD dari daftar sebelum melanjutkan.",$("#cb"));A[q.k]=m}
 const v=A[q.k];
 if(q.type=="area"){if(!(v||"").trim())return err("Silakan tuliskan jawaban Anda sebelum melanjutkan.",$("#ta"))}
 else if(q.type=="multi"){if(!(v||[]).length)return err("Silakan pilih minimal satu jawaban sebelum melanjutkan.");if(q.max&&v.length>q.max)return err(`Anda dapat memilih maksimal ${q.max} pilihan.`)}
 else if(q.type!="combo"&&(v==null||v===""))return err("Silakan pilih salah satu jawaban sebelum melanjutkan.");
 if(q.other){if(incL(v)){if(!(A[q.k+"_o"]||"").trim())return err("Silakan isi keterangan pada pilihan Lainnya.",$("#ot"));A[q.k+"_o"]=A[q.k+"_o"].trim()}else delete A[q.k+"_o"]}
 if(q.type=="area")A[q.k]=v.trim();
 save();if(q.k=="q9")sanitize();
 if(er!=null){if(i<Q.length-1&&Q[i+1].s==q.s)return go(i+1);er=null;return review()}
 i==Q.length-1?review():go(i+1)}

// ---------- review ----------
function review(){mode="review";er=null;if(!filled())return intro();sanitize();push({m:"review"});put(POS,"r");
 const bad=Q.find(miss);
 const secs=STAGES.map((st,j)=>{const qs=Q.filter(q=>q.s==j);
  return `<section class="rv" aria-labelledby="h${j}"><header><h3 id="h${j}"><span>${p2(j+1)}</span>${st.t}</h3><button class="link" data-s="${j}" aria-label="Edit ${esc(st.t)}">Edit</button></header><dl>${qs.map(q=>{
   let v=val(q);v=Array.isArray(v)?v.join("\n"):q.type=="scale"&&v?`${v} — ${q.sc[v-1]}`:v;const na=!v||miss(q);
   return `<div class="it"><dt>${q.no}. ${q.lab}</dt><dd class="${na?"na":""}">${na?"Belum dijawab":esc(v)}</dd></div>`}).join("")}</dl></section>`}).join("");
 show(`<div class="cat">Langkah terakhir</div><h1 class="rt">Periksa kembali jawaban Anda</h1><p class="help">Pastikan jawaban telah menggambarkan kondisi yang sebenarnya. Gunakan Edit untuk mengubah jawaban pada setiap bagian.</p>${secs}
 <p class="err ${bad?"show":""}" id="err" role="alert">${bad?`Pertanyaan ${bad.no} belum dijawab. Tekan Kirim Jawaban untuk melengkapinya.`:""}</p>`,
 navBar("Kembali","Kirim Jawaban","sb"));
 app.querySelectorAll("[data-s]").forEach(b=>b.onclick=()=>{er=+b.dataset.s;go(Q.findIndex(q=>q.s==er))});
 $("#bk").onclick=()=>go(Q.length-1);
 $("#sb").onclick=async e=>{if(busy)return;if(bad){er=bad.s;return go(Q.indexOf(bad))}
  const b=e.currentTarget;busy=true;b.disabled=true;b.textContent="Mengirim…";const ok=await submit();busy=false;if(!ok&&b.isConnected){b.disabled=false;b.textContent="Kirim Jawaban"}}}

// ---------- kirim ----------
function record(id){const r={Timestamp:new Date().toLocaleString("sv-SE").replace("T"," "),"ID Respons":id},h={opd:"OPD",peran:"Peran",lama:"Lama Terlibat"};
 Q.forEach(q=>{let v=val(q);v=Array.isArray(v)?v.join(" | "):v;r[h[q.k]||q.k.toUpperCase()]=v});return r}
async function submit(){const n=load(DONE,[]).length+1,tmp="OPD-"+CONFIG.YEAR+"-"+String(n).padStart(6,"0");let id=tmp;
 if(CONFIG.ENDPOINT){let sent=false;const ac=new AbortController(),t=setTimeout(()=>ac.abort(),25000);
  try{const res=await fetch(CONFIG.ENDPOINT,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify(record(tmp)),signal:ac.signal});const j=await res.json();if(j&&j.ok){id=j.id;sent=true}}catch(e){}
  clearTimeout(t);
  if(!sent){const m=$("#err");if(m){m.textContent="Jawaban belum terkirim. Periksa koneksi internet Anda, lalu coba lagi. Jawaban Anda tetap tersimpan.";m.classList.add("show")}return false}}
 const all=load(DONE,[]);all.push(record(id));put(DONE,all);A={};try{localStorage.removeItem(KEY);localStorage.removeItem(POS)}catch(e){}
 mode="ok";er=null;push({m:"ok"});
 show(`<div class="ok"><div class="eyebrow"><i></i>Kuesioner selesai</div><h1>Terima kasih.</h1><p class="sub">Jawaban Anda telah berhasil dicatat.</p>
 <div class="lbl">ID Respons</div><div class="rid">${esc(id)}</div>
 <p>Jawaban Anda akan menjadi bahan evaluasi dalam menentukan prioritas perbaikan, pembinaan, pendampingan, dan dukungan bagi OPD.</p>
 <button class="btn" id="home" style="margin-top:14px">Kembali ke Halaman Awal</button></div>`);
 $("#home").onclick=intro;return true}

// ---------- riwayat browser (tombol Kembali) ----------
function route(s){if(s.m=="q"){er=s.er??null;go(s.i)}else if(s.m=="review")review();else intro()}
window.addEventListener("popstate",e=>{popping=true;try{route(e.state||{m:"intro"})}finally{popping=false}});

// ---------- ekspor CSV lokal (mode prototype): buka index.html#admin ----------
function csv(){const rows=load(DONE,[]);if(!rows.length)return alert("Belum ada data tersimpan di browser ini.");
 const H=Object.keys(rows[0]),e=v=>`"${String(v??"").replace(/"/g,'""')}"`;
 const t="\ufeff"+[H.map(e).join(","),...rows.map(r=>H.map(h=>e(r[h])).join(","))].join("\r\n");
 const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([t],{type:"text/csv"}));a.download="Hasil_Kuesioner_Akuntansi_OPD_2026.csv";a.click()}
if(location.hash=="#admin"){app.innerHTML=`<h1>Ekspor data lokal</h1><p>Hanya berisi jawaban yang dikirim dari browser ini (${load(DONE,[]).length} respons).</p><button class="btn" id="xp">Unduh CSV untuk Excel</button>`;$("#xp").onclick=csv}
else{history.replaceState(history.state||{m:"intro"},"");const s=history.state;
 if(filled()&&s&&(s.m=="q"||s.m=="review")){popping=true;try{route(s)}finally{popping=false}}else{popping=true;try{intro()}finally{popping=false}}}
