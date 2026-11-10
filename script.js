'use strict';
/* BALIK STORY: THE CURATION — Episode 1 | Vanilla JS */
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],KEY='balikstory_v1';
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* ===== PSIKOEDUKASI: [nama, jenis, penjelasan, hubungan dgn Rian, pertanyaan refleksi] ===== */
const TYPE={asli:'Konsep asli Kawruh Jiwa',teori:'Teori psikologi/sosiologi',adap:'Interpretasi & adaptasi mekanik game'};
const EDU={
dramaturgi:['Dramaturgi (Erving Goffman)','teori','Dramaturgi memandang interaksi sosial seperti panggung: orang mengelola kesan di “panggung depan” dan lebih longgar di “panggung belakang”.','Akun utama Rian adalah panggung depan yang dikurasi; second account berpotensi menjadi panggung belakang. Keduanya tidak otomatis palsu atau jujur.','Kesan apa yang biasa kamu jaga di akun utamamu, dan untuk siapa?'],
discrepancy:['Self-Discrepancy Theory (Higgins)','teori','Teori ini membedakan Actual Self (diri yang benar-benar dialami), Ideal Self (diri yang diidamkan), dan Ought Self (diri yang dirasa harus dipenuhi). Jarak di antara ketiganya dapat berkaitan dengan cemas, malu, atau kecewa.','Actual Self Rian: lelah dan cemas. Ideal Self: mahasiswa berprestasi. Ought Self: sosok yang diharapkan Maya dan followers. Kabar kegagalan membuat jarak itu terasa.','Di mana kamu merasakan jarak antara dirimu yang sekarang dan yang kamu kira harus kamu tampilkan?'],
lookingglass:['Looking-Glass Self (Charles Horton Cooley)','teori','Gagasan bahwa kita membayangkan bagaimana orang lain melihat kita, membayangkan penilaian mereka, lalu merasakan sesuatu karenanya.','Maya melihat Rian lewat “cermin” postingannya, sementara Rian membayangkan penilaian Maya jika ia gagal.','Lewat “cermin” siapa kamu sering menilai dirimu sendiri?'],
kramadangsa:['Kramadangsa','asli','Dalam Kawruh Jiwa, Kramadangsa adalah “aku” bentukan dari catatan-catatan pengalaman yang dianggap sebagai diri kita. Catatan: “Indikator Naratif Kramadangsa” adalah adaptasi game, bukan skor kesehatan mental atau alat ukur gangguan.','Naik-turunnya indikator menggambarkan seberapa kuat Rian melekat pada citra dirinya yang dibentuk pujian dan ekspektasi.','Catatan apa tentang dirimu yang paling sering kamu bela?'],
mulur:['Mulur-Mungkret','asli','Keinginan cenderung mulur (memanjang) ketika terpenuhi dan mungkret (menyusut) ketika terancam, sehingga rasa senang dan susah silih berganti (gek bungah gek susah).','Pujian membuat Rian senang, tetapi keinginan untuk terus dipuji ikut membesar dan menjadi rapuh saat hasil belum pasti.','Kapan terakhir kali senangmu cepat berubah jadi cemas?'],
reribet:['Reribet','asli','Reribet adalah kekusutan batin ketika keinginan, prasangka, dan kenyataan saling berbenturan.','Pujian yang diterima Rian justru menimbulkan kekhawatiran untuk mempertahankan citra tersebut.','Simpul apa yang sedang kamu rasakan akhir-akhir ini?'],
sumelang:['Sumelang','asli','Sumelang adalah rasa khawatir terhadap hal yang belum terjadi.','Rian sumelang soal pengumuman beasiswa dan penilaian orang jika ia gagal.','Apa yang kamu khawatirkan padahal belum terjadi?'],
getun:['Getun','asli','Getun adalah rasa menyesal terhadap hal yang sudah terjadi.','Setelah email penolakan, Rian menyesali postingan yang terlanjur terunggah.','Apa yang kamu sesali, dan apakah penyesalan itu masih bisa diubah?'],
nyawang:['Nyawang Karep','asli','Nyawang karep berarti mengamati keinginan sendiri: mengenali karep yang muncul sambil tetap menjadi pengamat, tanpa langsung menghakimi atau menuruti.','Rian diajak melihat keinginan dipuji dan rasa malunya dari “pinggir lapangan”.','Keinginan apa yang sedang muncul dalam dirimu sekarang?'],
mawas:['Mawas Diri','asli','Mawas diri adalah kesadaran mengamati diri sendiri dengan awas. Catatan: di game ini ia “terbuka” sebagai mekanik naratif setelah Nyawang Karep, bukan penilaian kemampuan pemain.','Setelah refleksi, Rian dapat melihat dorongan dan perasaannya dengan lebih jernih.','Apa yang kamu sadari tentang dirimu hari ini?'],
sds:['Semat-Drajat-Kramat','adap','Dalam Kawruh Jiwa ketiganya dipahami sebagai keinginan pokok manusia: harta/kenikmatan, kedudukan, dan kekuasaan/kehormatan. Adaptasi game: Semat = estetika & materi, Drajat = status sosial digital, Kramat = pengakuan dan reputasi publik.','Konten estetik dan pujian publik menaikkan ketiganya, tetapi tidak otomatis membuat Rian tenang.','Dari ketiganya, mana yang paling sering menggodamu di media sosial?']
};
const EMO={sumelang:'sumelang',getun:'getun',reribet:'reribet',mulur:'mulur'};

/* ===== VISUAL PLACEHOLDER (ganti dengan gambar di assets/) ===== */
const PAL={rian:{h:'#252b58',h2:'#6a86e0',e:'#3fb9dc',c:'#2f6fcf',L:0},maya:{h:'#7b3a28',h2:'#e0985a',e:'#f2b441',c:'#f08fb0',L:1}};
const MM={'wajah lelah':'tired','kurang tidur':'tired','memegang dada':'worry','ramah':'happy','mulai rileks':'calm'};
/* Sprite anime (SVG). Ganti dengan PNG: assets/characters/<nama>_<mood>.png atau <nama>.png */
const sprite=(n,m='neutral',cls='')=>{
 const p=PAL[n],sk='#ffe6d6',sd='#f4c3aa',ln='#1d1838',hp=m==='happy',td=m==='tired',wr=m==='worry'||m==='sad',cm=m==='calm';
 const st=`stroke="${ln}" stroke-width="3.5" stroke-linecap="round"`;
 const eye=x=>hp?`<path d="M${x-12} 128q12-15 24 0" fill="none" ${st}/>`
  :`<g class="blink"><ellipse cx="${x}" cy="126" rx="12.5" ry="${td?10:15}" fill="#fff"/><ellipse cx="${x}" cy="128" rx="9.5" ry="${td?9:13.5}" fill="${p.e}"/><ellipse cx="${x}" cy="129" rx="5.5" ry="${td?5.5:8.5}" fill="#141a36"/><circle cx="${x-3.5}" cy="122" r="3.4" fill="#fff"/><circle cx="${x+4}" cy="132" r="1.7" fill="#fff"/>${td?`<path d="M${x-14} 113h28v10q-14 4-28 0z" fill="${sk}"/><path d="M${x-14} 123q14 4 28 0" fill="none" ${st}/>`:`<path d="M${x-14} 117q14-8 28 0" fill="none" ${st}/>`}</g>`;
 const br=wr?`<path d="M54 110l22-7M126 110l-22-7" stroke="${p.h}" stroke-width="4" stroke-linecap="round"/>`:`<path d="M56 106q11-${hp?8:5} 22-${hp?2:1}M124 106q-11-${hp?8:5} -22-${hp?2:1}" fill="none" stroke="${p.h}" stroke-width="4" stroke-linecap="round"/>`;
 const mo=hp?`<path d="M78 152q12 14 24 0z" fill="#9b2f4a" stroke="${ln}" stroke-width="2" stroke-linejoin="round"/>`:wr?`<path d="M81 158q9-7 18 0" fill="none" ${st}/>`:cm?`<path d="M80 153q10 7 20 0" fill="none" ${st}/>`:`<path d="M83 156h14" fill="none" ${st}/>`;
 const back=p.L?'M34 118Q26 36 90 28Q154 36 146 118L152 232Q132 222 126 160L54 160Q48 222 28 232Z':'M38 118Q32 40 90 32Q148 40 142 118L140 152Q126 142 126 128L54 128Q54 142 40 152Z';
 const bang=p.L?'M40 116Q40 52 90 42Q140 52 140 116Q134 96 118 88Q104 104 90 82Q76 104 62 88Q46 96 40 116ZM42 100Q36 140 46 176Q56 150 52 108ZM138 100Q144 140 134 176Q124 150 128 108Z':'M40 116Q40 50 90 40Q140 50 140 116Q128 92 112 84L104 102L92 80L80 102L70 84Q52 92 40 116Z';
 const ex=(wr?`<path d="M140 92q7 11 0 18q-7-7 0-18z" fill="#8fd8ff" stroke="#3a8fc0" stroke-width="1.5"/>`:'')+(hp?`<path d="M152 66l3 8 8 3-8 3-3 8-3-8-8-3 8-3z" fill="#ffe27a"/><path d="M26 90l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" fill="#fff6c0"/>`:'')+(td?`<path d="M56 141q12 5 24 0M100 141q12 5 24 0" stroke="#a98bc8" stroke-width="2" fill="none" opacity=".7"/>`:'');
 const body=`<path d="M16 260Q16 204 58 196L90 212L122 196Q164 204 164 260Z" fill="${p.c}"/><path d="M66 197L90 224L114 197Z" fill="${sk}"/>`+(p.L?`<path d="M90 216l-15-8v17zM90 216l15-8v17z" fill="#fff"/>`:`<path d="M80 224v28M100 224v28" stroke="#fff" stroke-width="3"/>`);
 return `<div class="spr ${n} ${cls}"><svg viewBox="0 0 180 260" role="img" aria-label="${n}"><g stroke="${ln}" stroke-width="2.4" stroke-linejoin="round"><path d="${back}" fill="${p.h}"/><path d="M78 166h24v32H78z" fill="${sd}"/>${body}<ellipse cx="90" cy="122" rx="46" ry="52" fill="${sk}"/></g>
 <ellipse cx="58" cy="146" rx="9" ry="5" fill="#ff8fa3" opacity="${hp?.55:.3}"/><ellipse cx="122" cy="146" rx="9" ry="5" fill="#ff8fa3" opacity="${hp?.55:.3}"/>
 <path d="${bang}" fill="${p.h}" stroke="${ln}" stroke-width="2.4" stroke-linejoin="round"/>${p.L?'<rect x="108" y="58" width="16" height="6" rx="3" fill="#ffd54a" transform="rotate(-20 116 61)"/>':'<path d="M88 42Q78 14 100 8Q92 26 102 42Z" fill="'+p.h+'" stroke="'+ln+'" stroke-width="2.4"/>'}
 <path d="M58 68q32-18 66 0" fill="none" stroke="${p.h2}" stroke-width="6" stroke-linecap="round" opacity=".6"/>${eye(68)}${eye(112)}${br}<path d="M90 140l-2 4h4" fill="none" stroke="#c98d78" stroke-width="2" stroke-linecap="round"/>${mo}${ex}</svg>
 <img src="assets/characters/${n}_${m}.png" alt="" onload="this.parentNode.classList.add('hasimg')" onerror="if(!this.dataset.f){this.dataset.f=1;this.src='assets/characters/${n}.png'}else this.remove()"></div>`};
const av=(n,m)=>sprite(n,MM[m]||m||'neutral');
const tiles=n=>Array.from({length:n},(_,i)=>`<span style="--h:${(i*53+170)%360}"></span>`).join('');
const ig=(u,f,x='')=>`<div class="ig"><div class="igh"><span class="dot"></span><div><b>${u}</b><small>${f}</small></div></div><div class="grid">${tiles(9)}</div>${x}</div>`;
const VIS={
split:()=>`<div class="row">${av('rian','tired')}${ig('@rian.lifestyle','3.420 followers · organisasi & kehidupan kampus')}</div>`,
editor:()=>`<div class="row">${av('rian','worry')}<div class="ig ed"><div class="photo"></div><div class="pills"><span>Estetik</span><span>Sederhana</span><span>Draft</span></div><small>Foto seminar organisasi · pilih caption dan gaya visual</small></div></div>`,
insight:()=>`<div class="row">${av('rian','worry')}<div class="ig"><b>Insight foto lama</b><ul class="ins"><li>♥ 238 likes</li><li>41 komentar</li><li>1.2K jangkauan</li></ul><small>Rian membuka angka yang sama lagi…</small></div></div>`,
notif:()=>`<div class="row">${av('rian','happy')}<div class="stack"><div class="nt">♥ Likes mencapai 142</div><div class="nt"><b>maya.s</b> Rian emang gak pernah gagal! Best student!</div></div></div>`,
wave:()=>`<div class="row"><div class="waves">${av('rian','worry')}</div><div class="alert">RERIBET ALERT</div></div>`,
canteen:()=>`<div class="row">${sprite('maya','happy')}${sprite('rian','tired','flip')}</div>`,
close:()=>`<div class="row big">${sprite('maya','calm')}${sprite('rian','worry','flip')}</div>`,
email:()=>`<div class="row">${av('rian','sad')}<div class="mail"><small>Dari: Biro Kemahasiswaan</small><b>Mohon Maaf, Anda Belum Lolos Seleksi Beasiswa Prestasi Tahun Ini.</b></div></div>`,
profile:()=>`<div class="row">${av('rian','sad')}${ig('@rian.lifestyle','Postingan semalam masih dikomentari','<div class="cm">Selamat ya Rian! · Inspiratif banget</div>')}</div>`,
sw:()=>`<div class="row"><div class="acc">${sprite('rian','neutral')}<b>@rian.lifestyle</b><small>Akun utama</small></div><div class="acc on">${sprite('rian','calm')}<b>@sisi.lain.rian</b><small>12 Close Friends</small></div></div>`
};

/* ===== DATA 12 SCENE =====
 L: baris dialog [pembicara,teks]; ch: pilihan {l,s,fx,c(dampak),m(modal),to}; n: notifikasi emosi; edu: tombol info */
const SC={
'02':{th:'front',v:'split',edu:['dramaturgi','kramadangsa'],
 L:[['n','Pukul 23.15 WIB. Rian memandangi profil Instagram utamanya. Semua tampak sempurna, teratur, dan menginspirasi.'],['b','Semua orang kenal aku sebagai Rian yang selalu berprestasi dan berenergi. Tapi kenapa dadaku terasa sesak ya?']],
 ch:[{l:'Unggah foto kegiatan kampus baru',c:'Rian menuju proses kurasi konten baru.',to:'03'},
     {l:'Cek ulang insight & likes foto lama',fx:{kr:5},c:'Rian kembali terikat pada ingatan tentang validasi digital.',to:'03B'}]},
'03':{th:'front',v:'editor',edu:['discrepancy','sds'],
 L:[['b','Esok ada pengumuman hasil seleksi beasiswa prestisius. Malam ini aku harus unggah foto kegiatan kemarin. Tapi caption mana yang harus kupilih?']],
 ch:[{l:'Unggah foto estetik',s:'“Pantang menyerah, hasil tidak akan mengkhianati proses!”',fx:{kr:15,semat:10,kramat:10},c:'Indeks Semat dan Kramat meningkat.',to:'04'},
     {l:'Unggah foto sederhana dan jujur',s:'“Hari yang melelahkan, tapi semoga hasilnya memuaskan.”',fx:{kr:-5,autentik:10},c:'Indikator autentisitas naratif meningkat.',to:'04'},
     {l:'Batal unggah',s:'Simpan foto ke Draft karena takut dinilai pamer.',fx:{sumelang:10},c:'Kramadangsa Meter tetap. Indikator Sumelang +10.',n:['sumelang'],to:'04'}]},
'03B':{th:'front',v:'insight',edu:['lookingglass'],
 L:[['b','Kenapa aku masih terus melihat angka ini? Apa aku sedang mencari kepastian bahwa orang lain masih menganggapku hebat?']],
 ch:[{l:'Kembali ke profil',c:'Angka likes terasa seperti cermin yang menenangkan, tetapi ketenangannya cepat pudar dan mengajak kita mengecek lagi. Ketergantungan pada umpan balik sosial dapat membuat rasa cukup bergantung pada layar.',to:'03'},
     {l:'Berhenti melihat insight dan melanjutkan cerita',c:'Memberi jeda dari angka bisa membuka ruang untuk bertanya: apa yang sebenarnya sedang kucari? Itu bukan berarti angka itu salah, hanya tidak harus menjadi penentu rasa cukup.',to:'03'}]},
'04':{th:'front',v:'notif',edu:['mulur','lookingglass'],n:['mulur'],
 L:[['n','Notifikasi membanjiri layar. Rasa senang menyergap seketika. Namun, berapa lama kebahagiaan ini bertahan?'],['b','Maya dan teman-teman menganggapku tanpa celah. Tapi kalau besok aku gagal seleksi... apa kata mereka?']],
 ch:[{l:'Membalas komentar Maya dengan penuh percaya diri',fx:{kr:10,kramat:5},c:'Keinginan mendapatkan pujian bertambah.',to:'05'},
     {l:'Hanya memberikan like pada komentar Maya',c:'Kramadangsa Meter stabil. Rian menjaga jarak emosional.',to:'05'}]},
'05':{th:'back',v:'wave',edu:['reribet'],n:['reribet'],
 L:[['n','Di balik tumpukan pujian digital, ada simpul benang kusut di dalam dada Rian.'],['b','Kenapa semakin banyak pujian yang kuterima, aku makin takut membuat kesalahan?']],
 ch:[{l:'Lanjut ke aktivitas besok pagi',to:'06'},
     {l:'Apa itu Reribet?',m:{t:'Reribet',x:'Reribet menggambarkan kekusutan batin ketika keinginan, prasangka, dan kenyataan saling berbenturan. Dalam situasi Rian, pujian yang diterimanya justru menimbulkan kekhawatiran untuk mempertahankan citra tersebut.',b:'TUTUP DAN LANJUTKAN'},to:'06'}]},
'06':{th:'front',v:'canteen',edu:['lookingglass'],
 L:[['m','Yan! Postingan kamu semalam keren banget. Aku proud banget sama kamu. Besok pengumuman beasiswa pasti namamu paling atas!'],['b','Maya melihatku lewat cermin postinganku. Dia tidak tahu semalam aku tidak bisa tidur karena cemas.']],
 ch:[{l:'Lanjutkan percakapan',go:1,to:'07'}]},
'07':{th:'front',v:'close',edu:['discrepancy'],
 L:[['m','Kamu kok agak diam hari ini, Yan? Ada yang dipikirin?']],
 ch:[{l:'Tampil sempurna',s:'“Ah enggak kok, May! Aku 100% siap dan yakin besok pasti lolos!”',fx:{kr:10},c:'Diskrepansi antara perasaan dan ekspektasi meningkat.',to:'08'},
     {l:'Mengakui rasa lelah',s:'“Jujur aku agak deg-degan dan lelah sih, May. Persaingannya ketat banget.”',fx:{kr:-10,autentik:10},c:'Hubungan sosial menjadi lebih autentik.',to:'08'},
     {l:'Mengalihkan pembicaraan',s:'“Bahas yang lain aja yuk, May. Proyek kelompok kita gimana?”',c:'Kramadangsa Meter tetap. Rian belum mengungkapkan perasaannya.',to:'08'}]},
'08':{th:'back',v:'email',edu:['sumelang','getun'],n:['sumelang','getun'],
 L:[['n','Kenyataan tidak selalu berjalan searah dengan keinginan. Pengumuman itu menghantam keras ego Rian.'],['b','Gagal... aku gagal. Bagaimana dengan postinganku kemarin? Apa kata Maya? Apa kata followers-ku di Instagram?']],
 ch:[{l:'Tentukan respons',go:1,fx:{sumelang:10,getun:10},to:'09'}]},
'09':{th:'front',v:'profile',edu:['discrepancy'],
 L:[['b','Postingan semalam masih ramai dikomentari orang-orang yang mengucapkan selamat. Aku harus bagaimana di akun utama ini?']],
 ch:[{l:'Menutupi kebenaran',s:'Unggah Instagram Story seolah tidak terjadi apa-apa dan tetap tampil sebagai motivator.',fx:{kr:20},to:'10'},
     {l:'Arsipkan postingan',s:'Menghilangkan jejak unggahan karena malu dinilai gagal.',fx:{kr:10},to:'10'},
     {l:'Matikan notifikasi',s:'Menjauh sementara dari HP karena kewalahan secara emosional.',fx:{kr:5},to:'10'}]},
'10':{th:'reflect',custom:'r10',next:'11',edu:['nyawang','mawas']},
'11':{th:'back',v:'sw',edu:['dramaturgi'],
 L:[['n','Rian membuka sakelar akun di ponselnya. Ada sebuah ruang digital lain yang selama ini ia kunci rapat-rapat — sebuah ruang tempat ia bisa mengekspresikan sisi dirinya yang berbeda.'],['b','Di akun kedua ini, tidak ada dosen, tidak ada publik, hanya ada 12 sahabat terdekat. Haruskah aku menumpahkan keluh kesahku di sini?']],
 ch:[{l:'Pindah ke second account',s:'Unggah curhatan jujur tentang kegagalan.',c:'Rian menempuh jalur Second Account sebagai ruang keterbukaan diri.',m:{t:'Renungkan',x:'Apakah ruang digital yang privat selalu membuat seseorang merasa aman? Apa yang menentukan kenyamanan sebuah ruang digital?',b:'LANJUTKAN'},to:'12'},
     {l:'Unggah meme atau humor',s:'Menggunakan humor untuk mengekspresikan dan menghadapi rasa sedih.',c:'Rian menempuh jalur Second Account sebagai salah satu bentuk coping.',m:{t:'Renungkan',x:'Apakah ruang digital yang privat selalu membuat seseorang merasa aman? Apa yang menentukan kenyamanan sebuah ruang digital?',b:'LANJUTKAN'},to:'12'},
     {l:'Tetap di main account',s:'Bertahan dengan citra publik demi menjaga reputasi.',c:'Menjaga citra terus-menerus dapat berujung pada kelelahan digital. Ini bukan vonis bahwa pilihanmu salah; kamu bisa menjelajahi pilihan lain jika mau.',to:'11W'}]},
'11W':{th:'back',v:'sw',edu:['dramaturgi'],
 L:[['s','Menjaga citra mungkin terasa penting bagi Rian. Namun, bagaimana jika ia tidak memiliki ruang untuk mengakui apa yang sebenarnya dirasakan?']],
 ch:[{l:'Kembali mempertimbangkan pilihan',to:'11'},
     {l:'Tetap melanjutkan keputusan',c:'Keputusan ini tetap menjadi bagian ceritamu. Tidak ada pilihan yang salah; yang terpenting adalah kamu menyadari alasan di baliknya.',to:'12'}]},
'12':{th:'reflect',custom:'r12',end:true,edu:['sds','mawas']}
};
const BG={'02':'room','03':'room','03B':'room','04':'room','05':'roomd','06':'canteen','07':'canteen','08':'roomd','09':'room','10':'dream','11':'roomd','11W':'roomd','12':'dream'};
const NAMES={n:'NARATOR',b:'BATIN RIAN',m:'MAYA',r:'RIAN',s:'REFLEKSI',k:'DAMPAK'};

/* ===== STATE & SAVE ===== */
let G=null,typing=null,snd=false,AC=null,bgOsc=null;
const fresh=()=>({scene:'02',s:{kr:50,semat:20,drajat:20,kramat:20,sumelang:0,getun:0,autentik:0,mawas:false},ch:[],hist:[],refl:'',adj:false,done:false});
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(G))}catch(e){}};
const load=()=>{try{const g=JSON.parse(localStorage.getItem(KEY));return g&&g.s&&SC[g.scene]?g:null}catch(e){return null}};
const clamp=v=>Math.max(0,Math.min(100,v));

/* ===== AUDIO (sintesis, opsional, default mati) ===== */
const ctx=()=>{AC=AC||new (window.AudioContext||window.webkitAudioContext)();AC.resume&&AC.resume();return AC};
function tone(f,d=.12,v=.05,t=0){if(!snd)return;const a=ctx(),o=a.createOscillator(),g=a.createGain(),s=a.currentTime+t;o.frequency.value=f;g.gain.setValueAtTime(v,s);g.gain.exponentialRampToValueAtTime(.0001,s+d);o.connect(g).connect(a.destination);o.start(s);o.stop(s+d)}
const SFX={click:()=>tone(520),notif:()=>{tone(880,.15);tone(1175,.2,.04,.13)},trans:()=>tone(220,.4,.04)};
function toggleSnd(){snd=!snd;$$('.snd').forEach(b=>b.textContent=b.classList.contains('ib')?(snd?'♪':'×'):(snd?'♪ ON':'♪ OFF'));
 if(snd){const a=ctx();bgOsc=[110,165,220].map(f=>{const o=a.createOscillator(),g=a.createGain();o.frequency.value=f;g.gain.value=.01;o.connect(g).connect(a.destination);o.start();return o})}
 else if(bgOsc){bgOsc.forEach(o=>o.stop());bgOsc=null}}

/* ===== UI HELPERS ===== */
function screen(id){$$('.screen').forEach(s=>s.classList.toggle('active',s.id===id));const s=$('#'+id);document.body.dataset.theme=s.dataset.theme||document.body.dataset.theme;if(id==='s-intro')refreshIntro()}
function fade(fn){SFX.trans();const v=$('#veil');v.classList.add('on');setTimeout(()=>{fn();v.classList.remove('on')},350)}
function toast(t,x){const d=document.createElement('div');d.className='toast';d.innerHTML=`<b>${esc(t)}</b>${x?esc(x):''}`;$('#toasts').appendChild(d);SFX.notif();setTimeout(()=>d.remove(),4000)}
let onClose=null;
function modal(html,cb){$('#mc').innerHTML=html;$('#modal').hidden=false;onClose=cb||null}
function closeModal(){if($('#modal').hidden)return;$('#modal').hidden=true;const f=onClose;onClose=null;if(f)f()}
function openEdu(k){const e=EDU[k];modal(`<h3>${e[0]}</h3><span class="tg">${TYPE[e[1]]}</span><h4>Penjelasan sederhana</h4><p>${e[2]}</p><h4>Hubungan dengan pengalaman Rian</h4><p>${e[3]}</p><h4>Pertanyaan refleksi</h4><p>${e[4]}</p>`)}
function emo(k){const e=EDU[EMO[k]];toast(e[0],e[2])}

/* ===== HUD ===== */
function buildHud(){$('#hud').innerHTML=`<div class="kr"><span>Indikator Naratif Kramadangsa</span><div class="bar"><b id="h-kr"></b></div><em id="h-krn">50%</em><button class="ib" data-edu="kramadangsa" aria-label="Info Kramadangsa">i</button></div>
${['semat','drajat','kramat'].map(k=>`<div class="s"><span>${k[0].toUpperCase()+k.slice(1)}</span><div class="bar"><b id="h-${k}"></b></div></div>`).join('')}
<button class="ib" data-edu="sds" aria-label="Info Semat Drajat Kramat">i</button>
<span class="chip" id="h-su">Sumelang 0</span><span class="chip" id="h-ge">Getun 0</span><span class="chip" id="h-ma">Mawas Diri: terkunci</span>
<button class="ib fsb" aria-label="Layar penuh">⤢</button><button class="ib snd" aria-label="Suara">×</button><button class="ib" id="b-menu" aria-label="Menu">☰</button>`}
let shown=50;function tweenKr(to){const from=shown,t0=performance.now();(function f(t){const k=Math.min(1,(t-t0)/700),e=1-Math.pow(1-k,3);shown=Math.round(from+(to-from)*e);$('#h-krn').textContent=shown+'%';if(k<1)requestAnimationFrame(f)})(t0)}
function hud(){const s=G.s;$('#h-kr').style.width=s.kr+'%';tweenKr(s.kr);['semat','drajat','kramat'].forEach(k=>$('#h-'+k).style.width=s[k]+'%');
 $('#h-su').textContent='Sumelang '+s.sumelang;$('#h-su').classList.toggle('on',s.sumelang>0);$('#h-ge').textContent='Getun '+s.getun;$('#h-ge').classList.toggle('on',s.getun>0);
 $('#h-ma').textContent='Mawas Diri: '+(s.mawas?'terbuka':'terkunci');$('#h-ma').classList.toggle('on',s.mawas)}
function apply(fx){if(!fx)return;for(const k in fx){const v=fx[k];G.s[k]=k==='mawas'?v:clamp(G.s[k]+v);
 if(k==='kr')toast('Indikator Naratif Kramadangsa',(v>0?'+':'')+v+' → '+G.s.kr+'%');
 else if(k==='semat'||k==='drajat'||k==='kramat')toast(k[0].toUpperCase()+k.slice(1),'meningkat');
 else if(k==='autentik')toast('Autentisitas naratif','meningkat');
 else if(k==='sumelang'||k==='getun'){/* ditampilkan lewat notifikasi emosi */}}hud()}

/* ===== ENGINE SCENE ===== */
function go(id){fade(()=>{G.scene=id;save();render(id)})}
function render(id){const s=SC[id];clearInterval(typing);
 document.body.dataset.theme=s.th;const fr=$('.frame');fr.dataset.bg=BG[id]||'room';fr.style.setProperty('--bgimg',`url(assets/backgrounds/${id}.jpg)`);fr.classList.remove('speed');void fr.offsetWidth;fr.classList.toggle('speed',id==='08');$('#vis').dataset.sp='';const dl=$('#dlg');dl.classList.remove('in');void dl.offsetWidth;dl.classList.add('in');$('#vis').innerHTML=s.v?VIS[s.v]():'';$('#choices').innerHTML='';$('#panel').hidden=true;$('#dlg').hidden=false;$('#dlg').dataset.w='n';
 $('#chips').innerHTML=(s.edu||[]).map(k=>`<button data-edu="${k}">ⓘ ${EDU[k][0]}</button>`).join('');
 hud();
 if(s.n)setTimeout(()=>s.n.forEach((k,i)=>setTimeout(()=>emo(k),i*600)),900);
 if(s.custom){window[s.custom](s);return}
 play(s.L,()=>choices(s))}
function play(L,done){let i=0;const box=$('#dlg'),tx=$('#txt');
 const next=()=>{if(i>=L.length)return;const [w,t]=L[i++],last=i>=L.length;box.dataset.w=w;$('#vis').dataset.sp=w;$('#who').textContent=NAMES[w];$('#tap').hidden=true;
  let n=0;clearInterval(typing);tx.textContent='';
  const fin=()=>{clearInterval(typing);tx.textContent=t;box.onclick=null;if(last)done();else{$('#tap').hidden=false;box.onclick=next}};
  box.onclick=fin;typing=setInterval(()=>{tx.textContent=t.slice(0,++n);if(n>=t.length)fin()},16)};
 next()}
function choices(s){const c=$('#choices');c.innerHTML='';s.ch.forEach((o,i)=>{const b=document.createElement('button');b.className='ch'+(o.go?' go':'');b.style.animationDelay=i*.1+'s';
 b.innerHTML=`<b>${o.go?'':`<i class="k">${String.fromCharCode(65+i)}</i>`}${esc(o.go?o.l.toUpperCase():o.l)}</b>${o.s?`<span>${esc(o.s)}</span>`:''}`;b.onclick=()=>pick(o,b);c.appendChild(b)})}
function pick(o,b){SFX.click();$$('.ch').forEach(x=>{x.disabled=true;x.classList.add(x===b?'sel':'out')});setTimeout(()=>pick2(o),320)}
function pick2(o){$('#choices').innerHTML='';apply(o.fx);G.ch.push({scene:G.scene,pilihan:o.l});G.hist.push({scene:G.scene,kr:G.s.kr});save();
 const after=()=>{if(o.m)modal(`<h3>${o.m.t}</h3><p>${o.m.x}</p><div class="btns"><button class="btn pri" id="mok">${o.m.b}</button></div>`,()=>go(o.to));else go(o.to)};
 const nn=o.n||[];nn.forEach((k,i)=>setTimeout(()=>emo(k),300+i*600));
 if(o.c){$('#dlg').dataset.w='k';$('#who').textContent=NAMES.k;$('#txt').textContent=o.c;$('#tap').hidden=true;$('#dlg').onclick=null;
  const b=document.createElement('button');b.className='ch go';b.innerHTML='<b>LANJUT</b>';b.onclick=()=>{SFX.click();after()};$('#choices').appendChild(b)}
 else after()}

/* ===== SCENE 10: NYAWANG KAREP ===== */
window.r10=function(){const p=$('#panel');p.hidden=false;$('#dlg').hidden=true;$('#vis').innerHTML='';
 const K=[['Keinginan dipuji adalah salah satu bentuk karep yang dapat muncul dalam diriku.','Keinginan dipuji itu wajar muncul. Mengenalinya sebagai karep membantu Rian melihat bahwa ia sedang menginginkan sesuatu, bukan bahwa ia “buruk” karena menginginkannya.'],
 ['Rasa malu ketika gagal merupakan pengalaman emosi yang dapat aku amati.','Rasa malu bisa diamati seperti cuaca batin: datang, terasa, lalu bergeser. Mengamatinya tidak sama dengan menyangkalnya.'],
 ['Aku dapat mengamati perasaan dan keinginanku tanpa harus langsung mengikuti semuanya.','Mengamati tidak harus berarti menuruti. Ada jarak antara merasakan dorongan dan memutuskan tindakan; di jarak itu Rian punya pilihan.']];
 let open=0;
 p.innerHTML=`<div id="pts"></div><h2>NYAWANG KAREP</h2><p class="lead"><i>Sebelum melangkah lebih jauh, mari sejenak menjadi pelatih bagi batinmu sendiri. Amatilah gejolak rasa itu dari pinggir lapangan tanpa menghakiminya.</i></p>
 <p class="lead"><b>Kenali mana keinginan, mana perasaan, dan bagaimana kamu mengamati keduanya.</b> Klik setiap kartu.</p>
 <div class="rc">${K.map((k,i)=>`<button class="rcard" data-i="${i}"><small>Kartu ${i+1}</small><br>${k[0]}<p hidden>${k[1]}</p></button>`).join('')}</div>
 <div id="after" hidden><ol><li>Apa yang sebenarnya sedang diinginkan Rian?</li><li>Perasaan apa yang muncul ketika harapannya tidak terpenuhi?</li><li>Apakah Rian harus selalu mengikuti keinginan tersebut?</li><li>Bagaimana Rian dapat melihat perasaannya tanpa menghakimi diri sendiri?</li></ol>
 <label for="rf"><b>Jika aku berada di posisi Rian, hal apa yang ingin aku pahami dari diriku sendiri?</b></label><textarea id="rf" placeholder="Tidak ada jawaban benar atau salah."></textarea><div id="fb"></div>
 <div class="btns"><button class="btn" id="rs">SIMPAN REFLEKSI</button><button class="btn pri" id="rn">LANJUTKAN PERJALANAN</button></div></div>`;
 $('#rf').value=G.refl||'';
 for(let i=0;i<24;i++){const d=document.createElement('i');d.className='pt';d.style.cssText=`left:${Math.random()*100}%;animation-delay:${-Math.random()*8}s`;$('#pts').appendChild(d)}
 $$('.rcard').forEach(c=>c.onclick=()=>{if(!c.classList.contains('open')){c.classList.add('open');c.querySelector('p').hidden=false;open++;SFX.click();if(open===3)$('#after').hidden=false}});
 $('#rs').onclick=()=>{G.refl=$('#rf').value;save();$('#fb').innerHTML='<div class="fb">Refleksimu tersimpan. Terima kasih sudah meluangkan waktu untuk memperhatikan batinmu. Apa pun yang kamu tulis, itu adalah pengamatan, bukan penilaian.</div>'};
 $('#rn').onclick=()=>{G.refl=$('#rf').value;if(!G.adj){G.adj=true;apply({mawas:true,kr:-10});toast('Mawas Diri terbuka','Kamu mulai mengamati keinginan tanpa harus menuruti.')}save();SFX.click();go('11')}}

/* ===== SCENE 12: OUTRO ===== */
window.r12=function(){const p=$('#panel');p.hidden=false;$('#dlg').hidden=true;G.done=true;save();
 const pts=[50,...G.hist.map(h=>h.kr)],W=400,H=100,sx=W/Math.max(1,pts.length-1),poly=pts.map((v,i)=>`${(i*sx).toFixed(1)},${(H-v*H/100).toFixed(1)}`).join(' ');
 const T=[['Identitas digital dan kurasi diri','dramaturgi'],['Validasi sosial','lookingglass'],['Mulur-Mungkret','mulur'],['Reribet','reribet'],['Nyawang Karep','nyawang'],['Refleksi penggunaan second account','dramaturgi']];
 p.innerHTML=`<div class="twocol"><div><h2>Episode 1: The Curation selesai</h2><p class="lead">Kamu telah melihat bagaimana citra digital terbentuk dan bagaimana tuntutan untuk mempertahankannya dapat memengaruhi pengalaman batin.</p></div><div class="badge">PENJELAJAH IDENTITAS DIGITAL</div></div>
 <ul class="sum">${T.map(t=>`<li><button data-edu="${t[1]}">${t[0]}</button></li>`).join('')}</ul>
 <svg class="chart" viewBox="-6 -8 ${W+12} ${H+16}" role="img" aria-label="Grafik Indikator Naratif Kramadangsa"><line x1="0" x2="${W}" y1="${H/2}" y2="${H/2}" stroke="currentColor" opacity=".2"/><polyline points="${poly}" fill="none" stroke="var(--acc)" stroke-width="3"/></svg>
 <p class="note">Grafik perjalanan Indikator Naratif Kramadangsa (akhir: ${G.s.kr}%). Ini bukan ukuran kondisi psikologis.</p>
 <p class="lead" style="margin-top:10px"><i>Apakah second account akan menjadi ruang penyembuhan yang sejati, atau justru melahirkan kekusutan baru?</i><br><b>Temukan jawabannya di Episode 2: The Sanctuary.</b></p>
 <div class="btns"><button class="btn pri" id="e2">LANJUT KE EPISODE 2</button><button class="btn" id="rp">ULANGI EPISODE 1</button><button class="btn" id="rh">LIHAT HASIL PERMAINAN</button></div>`;
 $('#e2').onclick=()=>screen('s-ep2');$('#rp').onclick=()=>{if(confirm('Ulangi Episode 1 dari awal? Progres saat ini akan diganti.'))startNew(true)};
 $('#rh').onclick=()=>{const s=G.s;modal(`<h3>Hasil Permainan</h3><p>Indikator Naratif Kramadangsa: <b>${s.kr}%</b> · Semat ${s.semat} · Drajat ${s.drajat} · Kramat ${s.kramat}<br>Sumelang ${s.sumelang} · Getun ${s.getun} · Autentisitas naratif ${s.autentik} · Mawas Diri ${s.mawas?'terbuka':'terkunci'}</p><h4>Pilihanmu</h4><ol>${G.ch.map(c=>`<li>Scene ${c.scene}: ${esc(c.pilihan)}</li>`).join('')}</ol><h4>Refleksimu</h4><p>${G.refl?esc(G.refl):'<i>Belum ada tulisan.</i>'}</p><p class="note">Hasil ini adalah rangkuman perjalanan cerita, bukan diagnosis atau asesmen klinis.</p>`)}}

/* ===== ALUR APLIKASI ===== */
function startNew(skipIntro){G=fresh();save();buildHud();screen('s-game');fade(()=>render('02'));setTimeout(()=>toast('Tips','F = layar penuh · 1–3 = pilih · Spasi = lanjut'),2200)}
function refreshIntro(){$('#b-cont').hidden=!load()}
function resumeGame(){const g=load();if(!g)return;G=g;buildHud();screen('s-game');render(G.scene)}
function resetAll(){if(!confirm('Hapus seluruh progres permainan?'))return;localStorage.removeItem(KEY);G=null;screen('s-intro')}
function menu(){modal(`<h3>Menu</h3><div class="btns"><button class="btn pri" id="m-c">LANJUTKAN</button><button class="btn" id="m-n">MULAI BARU</button><button class="btn" id="m-r">RESET PROGRES</button><button class="btn" id="m-t">UJI ALUR</button><button class="btn" id="m-h">MENU UTAMA</button></div><h4>Glosarium psikoedukasi</h4><div class="gl">${Object.keys(EDU).map(k=>`<button data-edu="${k}">${EDU[k][0]}</button>`).join('')}</div>`)}

/* ===== PENGUJIAN INTERNAL ===== */
function runTests(){const out=[],seen=new Set(['02']),q=['02'];
 while(q.length){const id=q.shift(),s=SC[id];const ts=(s.ch||[]).map(c=>c.to).concat(s.next?[s.next]:[]);
  if(!ts.length&&!s.end)out.push('✗ halaman buntu: '+id);
  ts.forEach(t=>{if(!SC[t])out.push(`✗ target tidak ada: ${id} → ${t}`);else if(!seen.has(t)){seen.add(t);q.push(t)}})}
 Object.keys(SC).forEach(i=>{if(!seen.has(i))out.push('✗ tidak terjangkau: '+i);const s=SC[i];(s.edu||[]).forEach(k=>{if(!EDU[k])out.push(`✗ materi ${k} hilang (${i})`)});if(s.v&&!VIS[s.v])out.push('✗ visual hilang: '+s.v);if(s.custom&&!window[s.custom])out.push('✗ fungsi custom hilang: '+s.custom)});
 ['dramaturgi','discrepancy','lookingglass','kramadangsa','mulur','reribet','sumelang','getun','nyawang','mawas','sds'].forEach(k=>{if(!EDU[k])out.push('✗ konsep wajib hilang: '+k)});
 const ok=!out.length;out.unshift(ok?`✓ Lulus: ${seen.size} scene terjangkau dari Scene 02 (+ Scene 01 = layar intro), tanpa halaman buntu.`:'Ada masalah:');console.log(out.join('\n'));
 modal(`<h3>Uji Alur Internal</h3>${out.map(l=>`<p class="${l[0]==='✓'?'t-ok':'t-bad'}">${esc(l)}</p>`).join('')}<p class="note">Scene: ${Object.keys(SC).join(', ')}</p>`);return ok}

/* ===== LAYAR PENUH ===== */
const FS=()=>document.fullscreenElement||document.webkitFullscreenElement;
function toggleFS(){const d=document.documentElement;if(FS()){(document.exitFullscreen||document.webkitExitFullscreen).call(document)}
 else{const q=d.requestFullscreen||d.webkitRequestFullscreen;if(q){const p=q.call(d);p&&p.catch&&p.catch(()=>{})}else toast('Layar penuh tidak tersedia','Di iPhone: Bagikan → Tambah ke Layar Utama untuk tampilan tanpa bilah browser.')}}

/* ===== INIT ===== */
document.addEventListener('DOMContentLoaded',()=>{
 $('#phones').innerHTML=`${av('rian','calm')}<div class="phone p1"><b>@rian.lifestyle</b><div class="grid">${tiles(9)}</div></div><div class="phone p2"><b>@sisi.lain.rian</b><div class="grid">${tiles(6)}</div></div>`;
 $('#c-rian').innerHTML=`${av('rian','calm')}<h3>Rian</h3><small>19 tahun · Mahasiswa</small><ul><li>Punya akun utama Instagram dan second account.</li><li>Akun utama menampilkan organisasi, prestasi, dan kehidupan kampus.</li><li>Second account diikuti 12 teman dekat.</li><li>Khawatir pada ekspektasi sosial dan penilaian orang lain.</li></ul>`;
 $('#c-maya').innerHTML=`${av('maya','happy')}<h3>Maya</h3><small>19 tahun · Sahabat Rian</small><ul><li>Ramah, komunikatif, dan suportif.</li><li>Tidak sepenuhnya tahu tekanan yang sedang dialami Rian.</li></ul>`;
 $('#b-start').onclick=()=>screen('s-how');$('#b-how').onclick=()=>screen('s-how');$('#b-play').onclick=()=>screen('s-chars');
 $('#b-ep1').onclick=()=>startNew();$('#b-cont').onclick=resumeGame;$('#b-reset').onclick=resetAll;$('#b-test').onclick=runTests;
 $('#b-about').onclick=()=>modal(`<h3>Tentang BALIK STORY</h3><p>Media psikoedukasi interaktif untuk membantu Generasi Z memahami second account, identitas digital, kebutuhan validasi sosial, dan kesadaran diri melalui pendekatan Kawruh Jiwa Ki Ageng Suryomentaram.</p><p class="note">Bukan alat diagnosis atau asesmen klinis. Tidak ada pilihan yang benar atau salah; second account tidak otomatis sehat atau tidak sehat. Istilah seperti “Kramadangsa Meter” adalah adaptasi mekanik game, dibedakan dari konsep aslinya di tiap materi.</p>`);
 $('#b-back12').onclick=()=>{const g=load();if(g){G=g;buildHud();screen('s-game');render('12')}else screen('s-intro')};
 document.addEventListener('click',e=>{const t=e.target.closest('[data-edu],[data-go],.snd,.fsb,#b-menu,#mok,#m-c,#m-n,#m-r,#m-t,#m-h');if(!t)return;
  if(t.dataset.edu){SFX.click();openEdu(t.dataset.edu)}else if(t.dataset.go)screen(t.dataset.go);else if(t.classList.contains('snd'))toggleSnd();
  else if(t.classList.contains('fsb'))toggleFS();else if(t.id==='b-menu')menu();else if(t.id==='mok')closeModal();else if(t.id==='m-c')closeModal();
  else if(t.id==='m-n'){closeModal();if(confirm('Mulai baru? Progres saat ini akan diganti.'))startNew()}
  else if(t.id==='m-r'){closeModal();resetAll()}else if(t.id==='m-t')runTests();else if(t.id==='m-h'){closeModal();screen('s-intro')}});
 $('#mx').onclick=closeModal;$('#modal').onclick=e=>{if(e.target.id==='modal')closeModal()};
 document.addEventListener('keydown',e=>{const tg=e.target.tagName;if(e.key==='Escape')closeModal();if(/TEXTAREA|INPUT/.test(tg)||e.ctrlKey||e.metaKey)return;
  if(e.key==='f'||e.key==='F')toggleFS();
  if($('#modal').hidden){const n=+e.key;if(n>=1&&n<=9){const b=$$('.ch')[n-1];if(b)b.click()}
   if((e.key===' '||e.key==='Enter')&&tg!=='BUTTON'&&!$('#dlg').hidden&&$('#dlg').onclick){e.preventDefault();$('#dlg').onclick()}}});
 document.addEventListener('mousemove',e=>{const x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;document.documentElement.style.setProperty('--mx',x.toFixed(3));$$('.orb').forEach((o,i)=>o.style.transform=`translate(${x*(i+1)*22}px,${y*(i+1)*22}px)`)});
 $('.frame').insertAdjacentHTML('afterbegin','<div id="fx"></div><div id="sl"></div>');for(let i=0;i<16;i++){const d=document.createElement('i');d.style.cssText=`left:${Math.random()*100}%;animation-delay:${-Math.random()*10}s;animation-duration:${8+Math.random()*6}s`;$('#fx').appendChild(d)}
 refreshIntro();if(location.search.includes('test'))runTests();
});