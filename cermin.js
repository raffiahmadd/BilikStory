'use strict';
/* CERMIN RASA: modul tambahan untuk BALIK STORY (dimuat SETELAH script.js).
   Prototipe lokal: tidak ada server, AI, atau enkripsi. Data disimpan di localStorage (kunci terpisah). */
const CRK='cerminrasa_v1';
const crLoad=()=>{try{return Object.assign({ok:false,j:[],k:[],tab:'jurnal'},JSON.parse(localStorage.getItem(CRK))||{})}catch(e){return{ok:false,j:[],k:[],tab:'jurnal'}}};
let CR=crLoad();const crSave=()=>{try{localStorage.setItem(CRK,JSON.stringify(CR))}catch(e){toast('Gagal menyimpan','Penyimpanan lokal tidak tersedia.')}};
const E=s=>typeof esc==='function'?esc(s):String(s);
const TEMA=['Ingin diakui','Ingin diterima','Ingin mengekspresikan diri','Ingin merasa aman','Ingin terhubung'];
const TABS=[['jurnal','Jurnal Dua Wajah'],['pandu','Pemandu Mawas Diri'],['mulur','Peta Mulur-Mungkret'],['jeda','Jeda Rasa'],['satu','Peta Satu Rasa'],['kandha','Ruang Kandha'],['imersif','Kandha Imersif'],['jaring','Jaring Rasa']];
const PANDU={'02':'Apa yang kamu cari ketika membuka profil sebelum tidur?','03':'Apa yang sebenarnya kamu harapkan dari sebuah unggahan?','04':'Berapa lama rasa senang karena notifikasi bertahan bagimu?','05':'Simpul apa yang paling terasa di dadamu sekarang?','06':'Seperti apa dirimu terlihat di mata sahabatmu, dan seperti apa yang kamu rasakan?','07':'Apa yang kamu sembunyikan, dan apa yang ingin kamu bagikan?','08':'Apa yang kamu rasakan sebelum dan sesudah menerima kabar?','09':'Apa yang ingin kamu lakukan, dan apa yang sebenarnya kamu butuhkan?','10':'Langkah kecil apa yang ingin kamu lakukan setelah memahami ini?','11':'Apa yang berubah ketika audiens berubah, dan apa yang tetap sama?','11W':'Apa yang membuatmu bertahan pada pilihan itu?','12':'Apa yang ingin kamu bawa dari perjalanan ini?','03B':'Apa yang sedang kamu cari dari angka itu?'};
const SIGNAL=/(bunuh diri|mengakhiri hidup|menyakiti diri|tidak ingin hidup|ingin mati)/i;
const SIM=t=>`<span class="cr-sim">SIMULASI LOKAL</span> <small>${t}</small>`;
const cur=()=>(typeof G!=='undefined'&&G)?G.scene:'02';
function help(){return `<div class="cr-help"><b>Butuh bantuan sekarang?</b><br>Hubungi orang yang kamu percaya, konselor kampus, atau tenaga profesional. Jika ada bahaya langsung, hubungi layanan darurat setempat (di Indonesia, 119 ext. 8 dari Kemenkes dikenal sebagai layanan kesehatan jiwa; mohon pastikan nomor terbaru di situs resmi). Pesan ini berasal dari pencocokan kata sederhana, bukan diagnosis, dan tidak menilai kondisimu.</div>`}
function crOpen(tab){if(tab)CR.tab=tab;crSave();modal(`<div class="cr-box"><h3>CERMIN RASA</h3><small>Ruang refleksi pendamping cerita. Semuanya sukarela dan boleh dilewati.</small><div class="cr-tabs">${TABS.map(t=>`<button data-cr-tab="${t[0]}" class="${t[0]===CR.tab?'on':''}">${t[1]}</button>`).join('')}</div><div id="cr-v"></div></div>`);crView()}
function crView(){const v=$('#cr-v');if(!v)return;const t=CR.tab,V={jurnal:vJ,pandu:vP,mulur:vM,jeda:vD,satu:vS,kandha:vK,imersif:vI,jaring:vR};
 if(!CR.ok&&t!=='jaring'){v.innerHTML=`<h4>Persetujuan privasi</h4><p>Catatanmu disimpan hanya di peramban ini (localStorage). Ini bukan enkripsi dan bukan sistem keamanan server; siapa pun yang memakai perangkat ini bisa membacanya. Kamu bisa menghapusnya kapan saja di tab Jaring Rasa.</p><button class="btn pri" data-cr="agree">SAYA MENGERTI DAN SETUJU</button> <button class="btn" data-cr-tab="jaring">LIHAT INFO PRIVASI</button>`;return}
 v.innerHTML=V[t]()}
function vJ(){return `<h4>Jurnal Dua Wajah</h4><label>Akun<select id="cj-a"><option value="utama">Akun utama</option><option value="kedua">Akun kedua</option></select></label><label>Tema keinginan<select id="cj-t">${TEMA.map(x=>`<option>${x}</option>`).join('')}</select></label><label>Catatan (opsional)<textarea id="cj-x" placeholder="Tulis apa yang kamu alami. Tidak ada jawaban benar atau salah."></textarea></label><button class="btn pri" data-cr="jsave">SIMPAN CATATAN</button><div id="cj-m"></div><h4>Catatanmu (${CR.j.length})</h4>${CR.j.map((e,i)=>`<div class="cr-item"><span class="cr-tag">${e.a}</span><span class="cr-tag">${E(e.t)}</span><br>${E(e.x)||'<i>tanpa catatan</i>'} <button class="lnk" data-cr="jdel" data-i="${i}">hapus</button></div>`).join('')||'<p class="note">Belum ada catatan.</p>'}`}
function vP(){const s=cur();return `<h4>Pemandu Mawas Diri</h4><p class="note">Pertanyaan terbuka berbasis aturan (bukan AI) mengikuti scene ${s}. Tidak ada kesimpulan tentang kepribadianmu.</p><div class="cr-help">${E(PANDU[s]||PANDU['02'])}</div><button class="btn" data-cr-tab="jurnal">TULIS DI JURNAL</button>`}
function vM(){const h=(typeof G!=='undefined'&&G)?G.hist.map(x=>x.kr):[],p=[50,...h],W=360,H=90,sx=W/Math.max(1,p.length-1),pl=p.map((x,i)=>`${(i*sx).toFixed(1)},${(H-x*H/100).toFixed(1)}`).join(' ');
 const c={};CR.j.forEach(e=>c[e.t]=(c[e.t]||0)+1);
 return `<h4>Peta Mulur-Mungkret</h4><p class="note">Perubahan Indikator Naratif Kramadangsa sepanjang ceritamu dan tema keinginan di jurnal. Bukan skor kepribadian atau ukuran kesehatan mental.</p><svg class="chart" viewBox="-6 -6 ${W+12} ${H+12}" role="img" aria-label="Grafik perubahan indikator"><polyline points="${pl}" fill="none" stroke="var(--acc)" stroke-width="3"/></svg>${Object.keys(c).map(k=>`<span class="cr-tag">${E(k)} · ${c[k]}</span>`).join('')||'<p class="note">Tema keinginan akan muncul setelah kamu mengisi jurnal.</p>'}`}
let jt=null;
function vD(){return `<h4>Jeda Rasa</h4><p>Ambil jeda sebelum merespons. Jawab di dalam hati:</p><ol><li>Apa yang sedang kamu rasakan?</li><li>Apa yang sebenarnya ingin kamu sampaikan?</li><li>Apa yang kamu harapkan setelah merespons?</li><li>Lanjutkan, ubah, tunda, atau batalkan?</li></ol><div class="cr-timer" id="cd-t">10</div><button class="btn pri" data-cr="jgo">MULAI JEDA 10 DETIK</button><button class="btn" data-cr="jskip">LEWATI JEDA</button><div id="cd-m"></div>`}
function jedaEnd(m){clearInterval(jt);const e=$('#cd-m');if(e)e.innerHTML=`<div class="fb">${m}</div>`}
function vS(){const A=new Set(CR.j.filter(e=>e.a==='utama').map(e=>e.t)),B=new Set(CR.j.filter(e=>e.a==='kedua').map(e=>e.t)),both=[...A].filter(x=>B.has(x));
 const L=(s)=>[...s].map(x=>`<span class="cr-tag">${E(x)}</span>`).join('')||'<i class="note">belum ada</i>';
 return `<h4>Peta Satu Rasa</h4><p class="note">Menghubungkan tema dari kedua akun. Tidak ada akun yang dianggap lebih asli.</p><div class="cr-item"><b>Akun utama</b><br>${L(A)}</div><div class="cr-item"><b>Akun kedua</b><br>${L(B)}</div><div class="cr-item"><b>Tema yang sama di keduanya</b><br>${L(new Set(both))}</div><p class="note">Pengalaman di dua akun bisa saling terkait sebagai bagian dari satu orang.</p>`}
function vK(){return `<h4>Ruang Kandha</h4>${SIM('Belum ada server atau pengguna nyata. Contoh cerita di bawah ditulis sebagai ilustrasi.')}<div class="cr-item">“Aku sering menghapus caption berkali-kali sebelum mengunggah.” <small>(contoh anonim)</small></div><div class="cr-item">“Di akun kedua pun aku masih memikirkan respons teman.” <small>(contoh anonim)</small></div><h4>Aturan komunitas (rancangan)</h4><ul><li>Anonim dan sukarela.</li><li>Dimoderasi manusia.</li><li>Tidak menghakimi atau memberi diagnosis.</li></ul><label>Tulis ceritamu (hanya tersimpan di perangkat ini)<textarea id="ck-x"></textarea></label><button class="btn pri" data-cr="ksave">SIMPAN SEBAGAI SIMULASI</button><h4>Pencocokan teman sebaya atau fasilitator</h4>${SIM('Pencocokan nyata belum tersedia.')}<p class="note">Alur rancangan: pilih tema secara sukarela, setuju dibagikan, lalu manusia (fasilitator) meninjau rekomendasi.</p><button class="btn" data-cr="kmatch">LIHAT CONTOH ALUR</button><div id="ck-m"></div>${CR.k.map((s,i)=>`<div class="cr-item">${E(s)} <button class="lnk" data-cr="kdel" data-i="${i}">hapus</button></div>`).join('')}`}
function vI(){return `<h4>Kandha Imersif</h4>${SIM('Versi 2D. VR/AR belum aktif.')}<p>Amati satu unggahan yang sama di dua audiens.</p><button class="btn" data-cr="im" data-a="0">Audiens luas</button><button class="btn" data-cr="im" data-a="1">Teman dekat</button><div id="ci-m"></div><p class="note">Apa yang berubah ketika audiens berubah? Apa yang tetap menjadi bagian dari dirimu?</p>`}
function vR(){return `<h4>Jaring Rasa</h4><div class="cr-item"><b>Pemrosesan Privat.</b> Data tersimpan di localStorage perangkat ini, tanpa enkripsi dan tanpa server. Refleksi tidak pernah ditampilkan ke komunitas.</div><div class="cr-item"><b>Persetujuan.</b> Status: ${CR.ok?'disetujui':'belum disetujui'}.</div><div class="cr-item"><b>Deteksi Sinyal Krisis.</b> Hanya pencocokan kata sederhana untuk menampilkan info bantuan. Bukan diagnosis dan tidak mengambil keputusan otomatis.</div>${help()}<div class="cr-item"><b>Dashboard Agregat.</b> ${SIM('Belum ada data pengguna.')} Catatan lokalmu: ${CR.j.length} jurnal. Isi jurnal tidak pernah masuk dashboard.</div><div class="cr-item"><b>Audit Ahli.</b> Berstatus rancangan. Belum ada audit yang dilakukan.</div><button class="btn" data-cr="agree2">${CR.ok?'CABUT PERSETUJUAN':'SETUJUI'}</button><button class="btn" data-cr="wipe">HAPUS SEMUA DATA CERMIN RASA</button>`}
document.addEventListener('click',e=>{const b=e.target.closest('[data-cr],[data-cr-tab],#b-cr');if(!b)return;
 if(b.id==='b-cr')return crOpen();if(b.dataset.crTab){CR.tab=b.dataset.crTab;crSave();return crOpen(CR.tab)}
 const a=b.dataset.cr,i=+b.dataset.i;
 if(a==='agree'){CR.ok=true;crSave();crView()}
 else if(a==='agree2'){CR.ok=!CR.ok;crSave();crView()}
 else if(a==='wipe'){if(confirm('Hapus semua catatan CERMIN RASA?')){CR={ok:false,j:[],k:[],tab:'jaring'};try{localStorage.removeItem(CRK)}catch(x){}crView()}}
 else if(a==='jsave'){const x=($('#cj-x').value||'').trim().slice(0,1000);CR.j.push({a:$('#cj-a').value,t:$('#cj-t').value,x,d:Date.now()});crSave();const sig=SIGNAL.test(x);crView();if(sig)$('#cr-v').insertAdjacentHTML('afterbegin',help())}
 else if(a==='jdel'){CR.j.splice(i,1);crSave();crView()}
 else if(a==='jgo'){let n=10;clearInterval(jt);jt=setInterval(()=>{n--;const t=$('#cd-t');if(!t)return clearInterval(jt);t.textContent=n;if(n<=0)jedaEnd('Jeda selesai. Kamu boleh melanjutkan, mengubah, menunda, atau membatalkan.')},1000)}
 else if(a==='jskip')jedaEnd('Jeda dilewati. Kamu bisa kembali kapan saja.');
 else if(a==='ksave'){const x=($('#ck-x').value||'').trim().slice(0,600);if(!x)return;CR.k.push(x);crSave();$('#ck-m').innerHTML=SIGNAL.test(x)?help():'';if(!SIGNAL.test(x))crView()}
 else if(a==='kdel'){CR.k.splice(i,1);crSave();crView()}
 else if(a==='kmatch'){$('#ck-m').innerHTML='<div class="fb">1. Pilih tema. 2. Setuju dibagikan. 3. Fasilitator manusia meninjau. 4. Kamu boleh menolak kapan saja. (Contoh alur, bukan pencocokan nyata.)</div>'}
 else if(a==='im'){$('#ci-m').innerHTML=`<div class="fb">${['Unggahan tampil rapi dan penuh pertimbangan, seolah ditonton banyak orang.','Unggahan yang sama terasa lebih santai, tetapi rasa ingin dipahami tetap ada.'][+b.dataset.a]}</div>`}
});
/* Sambungkan ke engine tanpa mengubah script.js */
const _bh=buildHud;buildHud=function(){_bh();const h=$('#hud');if(h&&!$('#b-cr'))h.insertAdjacentHTML('beforeend','<button class="ib" id="b-cr" aria-label="Buka CERMIN RASA">CR</button>')};
const _rn=render;render=function(id){_rn(id);const c=$('#chips');if(c){c.insertAdjacentHTML('beforeend',`<button data-cr-tab="pandu">Pemandu Mawas Diri</button>`);if(['06','07','10'].includes(id))c.insertAdjacentHTML('beforeend','<button data-cr-tab="jeda">Jeda Rasa</button>');if(['08','09'].includes(id))c.insertAdjacentHTML('beforeend','<button data-cr-tab="kandha">Ruang Kandha</button>');if(id==='11')c.insertAdjacentHTML('beforeend','<button data-cr-tab="satu">Peta Satu Rasa</button>');if(id==='12')c.insertAdjacentHTML('beforeend','<button data-cr-tab="jaring">Jaring Rasa</button>')}};

/* ===== V2: integrasi kontekstual per scene + Jaring Rasa lintas scene ===== */
CR.log=CR.log||{};
const SCN={
'02':{t:['1.1 Jurnal Dua Wajah','3.2 Pemrosesan Privat'],tab:'jurnal',h:'Rian menatap akun utamanya yang tampak sempurna.',q:'Apa tujuan Rian mengunggah foto ke akun utama?',o:['Membagikan pengalaman','Menunjukkan pencapaian','Mendapat respons orang lain','Mengabadikan momen pribadi'],r:'Tidak ada pilihan benar atau salah. Pilihanmu dicatat sebagai bahan Jurnal Dua Wajah.'},
'03':{t:['1.2 Pemandu Mawas Diri'],tab:'pandu',h:'Rian memilih caption dan gaya visual di tengah kecemasan.',q:'Siapa yang paling kamu bayangkan akan melihat unggahan ini?',o:['Teman dekat','Dosen dan publik','Orang yang belum kukenal','Diriku sendiri'],r:'Cara orang lain memengaruhi caption sering terjadi tanpa disadari. Coba tulis di jurnal bagaimana perasaanmu saat memilih.'},
'03B':{t:['1.3 Peta Mulur-Mungkret'],tab:'mulur',h:'Rian membuka insight lama berulang kali.',q:'Apa yang paling terasa saat melihat angka itu?',o:['Tenang sebentar','Ingin cek lagi','Merasa belum cukup','Biasa saja'],r:'Keinginan bisa mulur dan mungkret. Perubahannya tampak di Peta Mulur-Mungkret.'},
'04':{t:['1.3 Peta Mulur-Mungkret','3.3 Dashboard Agregat'],tab:'mulur',h:'Notifikasi membanjir dan rasa senang muncul seketika.',q:'Pengalaman mana yang paling dekat dengan Rian sekarang?',o:['Senang karena diakui','Kecewa bila tak ada respons','Ingin terus membagikan pencapaian','Tidak terlalu butuh respons'],r:'Pilihanmu menjadi titik awal peta keinginan. Hitungan penggunaan fitur hanya disimpan lokal (demo dashboard).'},
'05':{t:['1.3 Peta Mulur-Mungkret','2.2 Pencocokan (simulasi)'],tab:'kandha',h:'Di balik pujian ada simpul yang kusut di dada Rian.',q:'Keinginan apa yang paling terasa di balik simpul itu?',o:['Ingin diakui','Ingin diterima','Ingin merasa aman','Ingin terhubung'],r:'Kamu bisa memilih kelompok refleksi berdasarkan tema ini. Pencocokan nyata belum tersedia, hanya contoh alur.'},
'06':{t:['1.2 Pemandu Mawas Diri','2.1 Ruang Kandha (simulasi)'],tab:'kandha',h:'Maya melihat Rian lewat cermin postingannya.',q:'Siapa audiens akun kedua Rian, dan bedanya dengan akun utama?',o:['Lebih sedikit dan akrab','Sama saja','Masih ada rasa dinilai','Belum yakin'],r:'Ruang Kandha (simulasi) memuat cerita anonim sebagai ilustrasi bahwa pengalaman serupa banyak dialami.'},
'07':{t:['1.4 Jeda Rasa','1.2 Pemandu Mawas Diri'],tab:'jeda',h:'Maya bertanya, Rian harus memilih bagaimana merespons.',q:'Sebelum menjawab Maya, apa yang ingin Rian lakukan?',o:['Melanjutkan respons','Mengubah respons','Menunda respons','Membatalkan respons'],r:'Jeda Rasa tidak melarang keputusan. Cobalah jeda 10 detik sebelum memilih di cerita.'},
'08':{t:['1.4 Jeda Rasa','3.1 Deteksi Sinyal Krisis'],tab:'jeda',h:'Kabar penolakan beasiswa menghantam Rian.',q:'Apa yang kamu rasakan di tubuh dan pikiranmu saat membayangkan kabar ini?',o:['Cemas','Malu','Marah','Sedih'],r:'Perasaan itu wajar. Jika terasa berat, Jaring Rasa menyediakan info bantuan yang bisa dibuka kapan saja.'},
'09':{t:['1.4 Jeda Rasa','1.1 Jurnal Dua Wajah'],tab:'jurnal',h:'Rian memutuskan apa yang ditampilkan di akun utama.',q:'Setelah jeda, apa yang paling mendekati kebutuhan Rian?',o:['Ditenangkan','Didengar','Menyendiri sebentar','Jujur kepada seseorang'],r:'Catat kebutuhan ini di Jurnal Dua Wajah bila mau.'},
'10':{t:['1.2 Pemandu Mawas Diri','1.1 Jurnal Dua Wajah','1.4 Jeda Rasa'],tab:'pandu',h:'Nyawang Karep: Rian mengamati keinginannya.',q:'Langkah kecil apa yang ingin kamu lakukan?',o:['Berhenti sejenak sebelum mengunggah','Menulis jurnal','Bercerita ke teman','Belum ingin melakukan apa pun'],r:'Semua pilihan sah. Refleksimu di kolom tulis tidak dikirim ke mana pun.'},
'11':{t:['2.1 Ruang Kandha','2.2 Pencocokan','2.3 Kandha Imersif (2D)'],tab:'imersif',h:'Rian memutuskan memakai second account sebagai ruang terbuka.',q:'Ruang seperti apa yang terasa aman bagi Rian?',o:['Kecil dan akrab','Anonim','Dengan pendamping','Tidak yakin'],r:'Coba Kandha Imersif 2D untuk membandingkan satu unggahan di dua audiens. VR/AR belum aktif.'},
'11W':{t:['2.3 Kandha Imersif (2D)'],tab:'imersif',h:'Rian bertahan pada citra publik.',q:'Apa yang berubah ketika audiens berubah?',o:['Cara bicara','Isi unggahan','Perasaan setelahnya','Tidak ada'],r:'Perubahan konteks tidak menghapus keterkaitan pengalamanmu.'},
'12':{t:['1.5 Peta Satu Rasa','3.3 Dashboard Agregat','3.4 Audit Ahli'],tab:'satu',h:'Perjalanan refleksi berlanjut setelah cerita.',q:'Satu langkah kecil apa yang ingin kamu bawa?',o:['Mengambil jeda','Melanjutkan jurnal','Menghubungi orang tepercaya','Kembali ke Ruang Kandha'],r:'Lihat Peta Satu Rasa. Perbedaan akun tidak membuat salah satunya lebih asli.'}};
function crCard(id,pick){const s=SCN[id];if(!s)return;const d=CR.log[id];
 modal(`<div class="cr-box"><h3>CERMIN RASA</h3><p><i>${E(s.h)}</i></p>${s.t.map(x=>`<span class="cr-tag">${E(x)}</span>`).join('')}<h4>Refleksi</h4><p>${E(s.q)}</p>${s.o.map((o,i)=>`<button class="btn${d&&d.i===i?' pri':''}" data-cr="pick" data-s="${id}" data-i="${i}">${E(o)}</button>`).join('')}${d?`<div class="fb">${E(s.r)}</div><button class="btn" data-cr-tab="${s.tab}">BUKA ALAT LENGKAP</button><button class="btn pri" id="mok">LANJUT CERITA</button>`:''}<p class="note">Jaring Rasa aktif: data hanya di perangkat ini, boleh dilewati. <button class="lnk" data-cr-tab="jaring">Privasi dan bantuan</button></p></div>`)}
document.addEventListener('click',e=>{const b=e.target.closest('[data-cr-card],[data-cr="pick"]');if(!b)return;
 if(b.dataset.crCard)return crCard(b.dataset.crCard);
 const id=b.dataset.s;CR.log[id]={i:+b.dataset.i,o:SCN[id].o[+b.dataset.i],d:Date.now()};crSave();crCard(id)});
document.addEventListener('input',e=>{if(e.target.id!=='rf')return;const f=$('#fb');if(f&&SIGNAL.test(e.target.value)&&!f.querySelector('.cr-help'))f.insertAdjacentHTML('beforeend',help())});
const _bh2=buildHud;buildHud=function(){_bh2();const h=$('#hud');if(h&&!$('#b-jr'))h.insertAdjacentHTML('beforeend','<button class="chip" id="b-jr" data-cr-tab="jaring">Jaring Rasa: lokal</button>')};
const _rn2=render;render=function(id){_rn2(id);const s=SCN[id];if(!s)return;const done=!!CR.log[id];
 const c=$('#chips');if(c)c.insertAdjacentHTML('afterbegin',`<button data-cr-card="${id}">CR: ${E(s.t[0])}${done?' (selesai)':''}</button>`);
 const p=$('#panel');if(p&&!p.hidden){const bt=p.querySelector('.btns');if(bt)bt.insertAdjacentHTML('afterbegin',`<button class="btn" data-cr-card="${id}">CERMIN RASA: ${E(s.t[0])}</button>`)}
 };

/* ===== V3: NYAWANG KAREP (bagian Pemandu Mawas Diri, 1.2) =====
   Aktivitas 5 tahap, tanpa skor/label/diagnosis. Disimpan lokal hanya setelah persetujuan dan tombol Simpan. */
const NKS=[
['NYAWANG','Apa pengalaman atau kejadian yang sedang ingin kamu pahami?','Contoh: rasa gelisah setelah mengunggah sesuatu.'],
['NGENALI','Apa keinginan atau dorongan yang muncul dalam dirimu?','Amati dari “pinggir lapangan”, tanpa menghakimi.'],
['NGGOLEKI','Apa yang sebenarnya ingin kamu dapatkan dari keinginan tersebut?','Motif atau kebutuhan di baliknya: diakui, diterima, aman, terhubung, dan seterusnya.'],
['NGRUMANGSANI','Bagaimana perasaanmu ketika keinginan tersebut terpenuhi atau tidak terpenuhi?','Boleh menulis keduanya.'],
['NEMTUKE','Setelah memahami pengalaman tersebut, respons apa yang ingin kamu pilih?','Satu langkah kecil sudah cukup.']];
const NKC=['Berhenti sejenak sebelum merespons','Menulis di jurnal','Bercerita ke orang tepercaya','Mengamati dulu tanpa bertindak'];
let NK={s:0,a:['','','','',''],j:false};
if(CR.nk&&CR.nk.a)NK.a=CR.nk.a.slice(0,5);
TABS.splice(2,0,['nyawang','Nyawang Karep']);
const nkKeep=()=>{const t=$('#nk-x');if(t)NK.a[NK.s]=t.value.slice(0,1200)};
function vN(){const s=NK.s;
 const bar=`<div class="nk-p">${NKS.map((x,i)=>`<i class="${i<=Math.min(s,4)?'on':''}"></i>`).join('')}</div>`;
 if(s>=5){return `<h4>Nyawang Karep</h4>${bar}<p class="note">Ringkasan pengamatanmu. Bukan tes, tanpa skor, label, atau diagnosis.</p><dl class="nk-sum">${NKS.map((x,i)=>`<dt>${i+1}. ${x[0]}</dt><dd>${E(NK.a[i])||'<i>dilewati</i>'}</dd>`).join('')}</dl><label><input type="checkbox" id="nk-j" ${NK.j?'checked':''}> Salin ringkasan ke Jurnal Dua Wajah (opsional, tetap hanya di perangkat ini)</label><select id="nk-a" style="width:100%;margin:6px 0"><option value="utama">Akun utama</option><option value="kedua">Akun kedua</option></select><div id="nk-m"></div><button class="btn" data-nk="back">KEMBALI</button><button class="btn pri" data-nk="save">SIMPAN REFLEKSI</button><button class="btn" data-nk="del">HAPUS REFLEKSI</button><button class="btn" data-nk="new">ULANGI DARI AWAL</button>`}
 const q=NKS[s];
 return `<h4>Nyawang Karep</h4>${bar}<p class="nk-st">TAHAP ${s+1} DARI 5 · ${q[0]}</p><p class="nk-q">${q[1]}</p><small class="note">${q[2]} Tidak ada jawaban benar atau salah, dan boleh dilewati.</small><textarea id="nk-x" placeholder="Tulis dengan bebas...">${E(NK.a[s])}</textarea>${s===4?`<div class="nk-chips">${NKC.map((c,i)=>`<button data-nk="chip" data-i="${i}">${c}</button>`).join('')}</div>`:''}<div id="nk-m"></div><button class="btn" data-nk="back" ${s?'':'disabled'}>KEMBALI</button><button class="btn pri" data-nk="next">${s===4?'LIHAT RINGKASAN':'LANJUT'}</button>`}
const _cv=crView;crView=function(){if(CR.tab==='nyawang'&&CR.ok){const v=$('#cr-v');if(v)v.innerHTML=vN()}else _cv()};
const _vp=vP;vP=function(){return _vp()+'<button class="btn pri" data-cr-tab="nyawang">BUKA NYAWANG KAREP (5 TAHAP)</button>'};
SCN['10'].tab='nyawang';SCN['10'].r='Di sini cerita Rian dan refleksimu bertemu. Nyawang Karep lengkap (5 tahap) siap dipakai, dan semua jawaban tetap di perangkat ini.';
document.addEventListener('click',e=>{const b=e.target.closest('[data-nk]');if(!b)return;nkKeep();const a=b.dataset.nk;
 if(a==='next'){NK.s++;crView()}else if(a==='back'){NK.s=Math.max(0,NK.s-1);crView()}
 else if(a==='chip'){const t=$('#nk-x');t.value=(t.value?t.value+'\n':'')+NKC[+b.dataset.i];nkKeep()}
 else if(a==='new'){NK={s:0,a:['','','','',''],j:false};crView()}
 else if(a==='del'){if(!confirm('Hapus refleksi Nyawang Karep yang tersimpan?'))return;delete CR.nk;NK={s:0,a:['','','','',''],j:false};crSave();crView();const m=$('#nk-m');if(m)m.innerHTML='<div class="fb">Refleksi dihapus dari perangkat ini.</div>'}
 else if(a==='save'){CR.nk={a:NK.a.slice(),d:Date.now()};NK.j=$('#nk-j')&&$('#nk-j').checked;
  if(NK.j){const x=NKS.map((q,i)=>q[0]+': '+(NK.a[i]||'-')).join(' | ').slice(0,1000);CR.j.push({a:$('#nk-a').value,t:'Nyawang Karep',x,d:Date.now()})}
  crSave();const all=NK.a.join(' ');$('#nk-m').innerHTML='<div class="fb">Tersimpan di perangkat ini. Terima kasih sudah memperhatikan batinmu; ini pengamatan, bukan penilaian.</div>'+(SIGNAL.test(all)?help():'')}});
document.addEventListener('input',e=>{if(e.target.id!=='nk-x')return;NK.a[NK.s]=e.target.value.slice(0,1200);const m=$('#nk-m');if(m&&SIGNAL.test(e.target.value)&&!m.querySelector('.cr-help'))m.innerHTML=help()});
const _rn3=render;render=function(id){_rn3(id);if(id!=='10')return;const bt=$('#panel .btns');if(bt&&!bt.querySelector('[data-cr-tab="nyawang"]'))bt.insertAdjacentHTML('afterbegin','<button class="btn pri" data-cr-tab="nyawang">NYAWANG KAREP LENGKAP</button>')};

/* ===== V4: CERMIN RASA sebagai momen cerita =====
   Setiap scene punya "momen" (Pemandu CERMIN RASA) yang muncul saat pilihan cerita tampil. Opsional, tidak memblokir.
   Setelah alat dipakai dan ditutup, muncul gema "Batin Rian" yang sesuai pemakaianmu, lalu pemain kembali ke scene yang sama. */
const NOT='Rian melanjutkan tanpa memakainya. Kamu bisa kembali kapan saja lewat chip CR.';
const BT={
'02':{k:'jurnal',l:'Rian merasa sesak di balik profil yang tampak sempurna. Catat bagaimana akun utama membuatnya merasa.',b:'Buka Jurnal Dua Wajah',u:'Rian menuliskan perasaannya di akun utama dan mulai melihat jarak antara apa yang tampil dan apa yang ia rasakan.'},
'03':{k:'card',l:'Rian bimbang soal caption. Siapa yang ia bayangkan sedang melihat unggahan ini?',b:'Jawab pertanyaan Pemandu',u:'Rian menyadari captionnya sebagian ditulis untuk penonton yang ia bayangkan, bukan hanya untuk dirinya.'},
'03B':{k:'mulur',l:'Rian kembali mengecek angka. Lihat bagaimana keinginannya naik dan turun.',b:'Lihat Peta Mulur-Mungkret',u:'Rian melihat keinginannya mulur saat dipuji dan mungkret saat sepi. Angka itu tidak harus menentukan rasa cukup.'},
'04':{k:'card',l:'Notifikasi membuat Rian senang, dan ingin lebih. Tandai keinginan yang muncul.',b:'Tandai keinginan',u:'Rian mengenali dorongan untuk dipuji sebagai karep yang sedang naik, bukan sebagai kebenaran tentang dirinya.'},
'05':{k:'card',l:'Simpul di dada Rian terasa kusut. Beri nama keinginan di baliknya.',b:'Pilih tema keinginan',u:'Rian menamai simpulnya. Ia tahu mungkin ada orang lain yang merasakan hal serupa (kelompok refleksi masih contoh simulasi).'},
'06':{k:'card',l:'Maya melihat Rian lewat postingannya. Apa bedanya audiens di dua akun?',b:'Bandingkan dua audiens',u:'Rian membandingkan audiensnya. Sebagian orang melihat hasil kurasi, bukan keseluruhan dirinya.'},
'07':{k:'jeda',l:'Maya bertanya, dan Rian ingin langsung menjawab dengan sempurna. Ambil Jeda Rasa sebelum merespons.',b:'Ambil Jeda Rasa',u:'Rian berhenti sebentar, bernapas, lalu memilih jawaban dengan lebih sadar.',fx:{kr:-3}},
'08':{k:'jeda',l:'Kabar itu menghantam Rian. Sebelum ia bereaksi, ambil jeda. Info bantuan ada di Jaring Rasa.',b:'Ambil Jeda Rasa',u:'Rian memberi jeda pada reaksinya. Perasaannya tetap ada, tetapi ia tidak langsung bertindak karenanya.',fx:{kr:-3}},
'09':{k:'jeda',l:'Rian ingin menutupi, mengarsipkan, atau menghilang. Apa yang sebenarnya ia butuhkan?',b:'Ambil Jeda Rasa',u:'Rian menunda dorongan impulsifnya dan melihat bahwa ia lelah, bukan hanya malu.',fx:{kr:-3}},
'10':{k:'nyawang',l:'Rian mulai mengamati karepnya dari pinggir lapangan. Jalani Nyawang Karep bersamanya.',b:'Mulai Nyawang Karep',u:'Rian menuliskan pengamatannya sendiri dan mengenali keinginannya tanpa langsung menurutinya.'},
'11':{k:'imersif',l:'Second account tampak seperti ruang aman. Lihat satu unggahan yang sama di dua audiens.',b:'Buka Kandha Imersif 2D',u:'Rian melihat bahwa ruang yang lebih kecil pun tetap punya penonton dan harapan.'},
'11W':{k:'imersif',l:'Rian bertahan di akun utama. Amati bagaimana perubahan audiens memengaruhi unggahannya.',b:'Buka Kandha Imersif 2D',u:'Rian melihat bahwa menjaga citra dan merasakan sesuatu bisa berjalan bersamaan.'},
'12':{k:'satu',l:'Episode 1 selesai. Hubungkan pengalaman Rian di dua akun.',b:'Lihat Peta Satu Rasa',u:'Rian melihat benang yang sama di kedua akunnya. Ia tidak harus memilih akun mana yang paling asli.'}};
let CRS={view:{},jeda:null,j0:0,nk0:''};
const _vm=vM;vM=function(){CRS.view.mulur=1;return _vm()};
const _vs=vS;vS=function(){CRS.view.satu=1;return _vs()};
const _jx=jedaEnd;jedaEnd=function(m){CRS.jeda=/selesai/.test(m)?'done':'skip';_jx(m)};
document.addEventListener('click',e=>{if(e.target.closest('[data-cr="im"]'))CRS.view.imersif=1});
const _mo=modal;modal=function(h,cb){_mo(h,cb||(String(h).includes('cr-box')?()=>crAfter(cur()):null))};
function crUsed(id){const b=BT[id];if(CR.log[id])return true;
 return b.k==='jurnal'?CR.j.length>CRS.j0:b.k==='jeda'?CRS.jeda==='done':b.k==='nyawang'?(NK.a.join('|')!==CRS.nk0||(CR.nk&&Date.now()-CR.nk.d<36e5&&NK.a.join('').trim()!=='')):!!CRS.view[b.k]}
function crEcho(id){const b=BT[id];let t=b.u;
 if(id==='12'){const o=CR.log['02'],n=NK.a[4]&&NK.a[4].trim();if(o)t+=` Di awal, kamu memilih bahwa tujuan unggahan Rian adalah: ${E(o.o).toLowerCase()}.`;if(n)t+=` Langkah kecil yang kamu tulis: “${E(n.slice(0,120))}”.`}
 if(b.fx&&crUsed(id))t+=' Indikator Kramadangsa turun sedikit karena jeda itu.';
 return `<small class="cr-who">BATIN RIAN</small><p>${t}</p><small class="note">Kamu kembali ke scene yang sama. Progres dan pilihan ceritamu tidak berubah.</small>`}
function crPut(html,on){let x=$('#cr-beat');if(!x){x=document.createElement('div');x.id='cr-beat';const p=$('#panel');if(p&&!p.hidden&&p.querySelector('h2'))p.querySelector('h2').after(x);else $('#choices').before(x)}
 x.className='cr-beat'+(on?' on':'');x.innerHTML=html}
function crBeat(id){const b=BT[id];if(!b||typeof G==='undefined'||!G)return;
 if(G.cr&&G.cr[id])return crPut(crEcho(id),1);
 crPut(`<small class="cr-who">PEMANDU CERMIN RASA</small><p>${E(b.l)}</p><button class="btn pri" data-beat="${id}">${b.b}</button> <small class="note">Opsional. Ceritamu tidak menunggu.</small>`)}
function crAfter(id){const b=BT[id];if(!b||!G||(G.cr&&G.cr[id]))return;
 if(!crUsed(id)){if($('#cr-beat'))toast('CERMIN RASA','Kamu bisa kembali kapan saja lewat chip CR.');return}
 G.cr=G.cr||{};G.cr[id]=1;if(b.fx&&CRS.jeda==='done')apply(b.fx);save();crPut(crEcho(id),1)}
document.addEventListener('click',e=>{const b=e.target.closest('[data-beat]');if(!b)return;const id=b.dataset.beat,k=BT[id].k;
 if(k==='card')crCard(id);else{CR.tab=k==='nyawang'?'nyawang':k;crOpen(CR.tab)}});
const _ch2=choices;choices=function(s){_ch2(s);if(G)crBeat(G.scene)};
const _rn4=render;render=function(id){const x=$('#cr-beat');if(x)x.remove();CRS={view:{},jeda:null,j0:CR.j.length,nk0:NK.a.join('|')};_rn4(id);if(SC[id]&&SC[id].custom)crBeat(id)};