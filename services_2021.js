sikatApp.service("pmkpService", function($http) {
  var dailyNames = {
    igd: [
      "Jumlah pasien yang mendapat pertolongan life saving",
      "Jumlah pasien yang membutuhkan penanganan life saving ",
      "Jumlah waktu yang diperlukan sejak kedatangan pasien sampai mendapat pelayanan dokter",
      "Jumlah pasien yang disampling (min n=50)",
      "Jumlah pasien yang meninggal <24 jam sejak pasien datang",
      "Jumlah seluruh pasien di hari tersebut",
      "Jumlah pasien jatuh di IGD",
      "Jumlah seluruh pasien di hari tersebut",
      "Jumlah waktu yang diperlukan sejak kedatangan pasien (kegawatdaruratan covid-19) sampai mendapat pelayanan dokter",
      "Jumlah pasien dengan diagnosa  covid-19",
      "Jumlah waktu yang diperlukan sejak kedatangan pasien di IGD sampai pasien dipulangkan/dirawat/dirujuk",
      "Jumlah seluruh pasien di hari tersebut (kec pasien false emergency)",
      "Jumlah pasien yang pulang paksa",
      "Jumlah seluruh pasien di hari tersebut (kec pasien false emergency)",
      "Jumlah pasien IGD yang dilakukan identifikasi dengan tepat",
      "Jumlah seluruh  Pasien Rawat Inap "
    ],
    rawatJalan: [
      "Jumlah pelayanan rawat jalan spesialistik yang buka sesuai ketentuan",
      "Jumlah pelayanan rawat jalan spesialistik di hari tersebut",
      "Jumlah waktu tunggu pasien rawat jalan yang disurvey",
      "Jumlah pasien rawat jalan yang disurvey di hari tersebut",
      "Jumlah pasien rawat jalan yang dilakukan identifikasi dengan tepat",
      "Jumlah pasien di hari tersebut",
      "Jumlah pasien rajal TB yang ditangani dengan strategi DOTS di hari tersebut",
      "Jumlah pasien rajal TB  di hari tersebut"
     
    ],
    rawatInap: [
    "Jumlah visite dokter spesialis yang terlaksana sesuai ketentuan",
    "Jumlah visite dokter spesialis di hari tersebut (sesuai jadwal)",
    "Angka kejadian infeksi nosokomial yang terjadi di rawat inap",
    "Jumlah pasien yang dirawat di rawat inap",
    "Jumlah kejadian kematian pasien rawat inap > 48 jam", 
    "Jumlah seluruh pasien rawat inap dalam 1 bulan",
    "Jumlah pasien pulang paksa ",
    "Jumlah seluruh pasien rawat inap dalam 1 bulan",
    "Jumlah kejadian reaksi transfusi",
    "Jumlah seluruh pasien rawat inap yang mendapat trasfusi dalam 1 bulan",
    "Jumlah pasien baru yang masuk rawat inap dengan assessmen medis dan keperawatan lengkap <24 jam ",
    "Jumlah seluruh pasien baru yang masuk rawat inap ",
    "Jumlah pasien baru diagnosis covid-19  dengan assessmen medis dan keperawatan lengkap <24 jam ",
    "Jumlah seluruh pasien baru diagnosis covid-19 yang masuk rawat inap ",
    "Jumlah pasien rawat inap yang dilakukan identifikasi dengan tepat",
    "Jumlah seluruh  Pasien Rawat Inap ",
    "Jumlah pasien covid-19 dengan EWS 1-6 yang diberikan penanganan sesuai ketentuan",
    "Jumlah seluruh pasien covid-19 dengan EWS 1-6"

      ],
    kamarOperasi: [
      "Waktu tunggu operasi elektif", // 1
      "Jumlah pasien yang dioperasi di hari tersebut",
      "Kejadian kematian di meja operasi", // 2
      "Jumlah pasien yang dioperasi di hari tersebut",
	  "Kejadian kematian di meja operasi", // 3
      "Jumlah pasien yang dioperasi di hari tersebut",
	  "Tidak adany kejadian operasi salah orang", // 4
      "Jumlah pasien yang dioperasi di hari tersebut",
      "Tidak adanya kejadian operasi salah tindakan pada operasi", // 5
      "Jumlah pasien yang dioperasi di hari tersebut",
      "Tidak adanya kejadian tertinggal benda asing pada tubuh pasien setelah operasi", // 6
      "Jumlah pasien yang dioperasi di hari tersebut",
      "Komplikasi anastesi karena over dosis, reaksi anastesi dan salah penempatan endotracheal tube", // 7
      "Jumlah pasien yang dioperasi di hari tersebut",
      "Penundaan Operasi Elektif", // 8
      "Jumlah pasien yang dioperasi di hari tersebut",
      "Kelengkapan pengisian surgery safety checklist", // 9
      "Jumlah pasien yang dioperasi di hari tersebut"
    ],
    perinatologi: [
      "Jumlah pasien perina  yang terkena infeksi nosokomial dalam satu bulan",
      "Jumlah pasien  Perina dalam satu bulan",
      "Jumlah pasien pulang paksa dalam satu bulan",
      "Jumlah seluruh pasien yang dirawat dalam satu bulan",
      "Jumlah pasien bayi yang diberikan  ASI eksklusif dari awal lahir sampai masuk perawatan di Perina",
      "Jumlah seluruh pasien  perina  yang dirawat dalam 1 bulan",
      "Jumlah pasien dengan BBLR yang mengalami peningkatan BB (25-30g/hr) dan pulang sesuai dengan standard kenaikan BB",
      "Jumlah seluruh pasien yang dirawat dengan BBLR  dalam 1 bulan",
      "Jumlah pasien yang meninggal > 48 jam",
      "Jumlah pasien dalam 1 bulan",
      "Jumlah pasien dengan assessment awal lengkap < 24 jam",
      "Jumlah pasien baru di hari tersebut"
    ],
    hcu: [
	  "Jumlah pasien baru yang masuk rawat inap dengan assessmen medis dan keperawatan lengkap <24 jam ",
	  "Jumlah seluruh pasien baru yang masuk rawat inap ",
	  "Jumlah pasien HCU yang dilakukan identifikasi dengan tepat ",
	  "Jumlah pasien HCU dalam 1 bulan "
    ],
    kamarBersalin: [
      "Jumlah Ibu Meninggal Karena Pre eklampsia", //1
      "Jumlah Ibu Dengan Pre eklampsia di hari tersebut", //1
      "Jumlah Ibu Meninggal Karena Perdarahan", //2
      "Jumlah Ibu Melahirkan Dengan Perdarahan di hari tersebut",//2
      "Jumlah Ibu melahirkan yang meninggal karena sepsis",//3
      "Jumlah Ibu melahirkan dengan sepsis di hari tersebut tersebut",//3
      "Jumlah bayi dengan asfiksia yang berhasil ditangani",//6
      "Jumlah bayi dengan asfiksia di hari tersebut",//6
      "Jumlah persalinan dengan sectio caesaria di hari tersebut",//7
      "Jumlah seluruh persalinan di hari tersebut",//7
      "Jumlah pasien yang jatuh",//9
      "Jumlah pasien kamar bersalin di hari tersebut",//9
      "Jumlah pasien BBL yang dilakukan IMD sesuai ketentuan",//10
      "Jumlah pasien BBL di hari tersebut",//10
      "Jumlah pasien kamar bersalin yang dilakukan identifikasi dengan tepat",//11
      "Jumlah seluruh  Pasien kamar bersalin "//11
    ],
    radiologi: [
      "Jumlah kumulatif waktu tunggu thorax foto",
      "Jumlah seluruh pemeriksaan thorax foto di hari tersebut",
      "Jumlah foto rusak yang tidak dapat dibaca",
      "Jumlah pemeriksaan foto rontgen di hari tersebut",
      "Jumlah Kesalahan Penyerahan Hasil Radiologi ",
      "Jumlah Pemeriksaan Radiologi",
      "Jumlah kumulatif waktu tunggu foto rontgen cito",
      "Jumlah seluruh pemeriksaan foto rontgen cito  di hari tersebut",
      "Jumlah pasien radiologi yang dilakukan identifikasi dengan tepat",
      "Jumlah seluruh  Pasien"
    ],
    laboratorium: [
      "Jumlah kumulatif waktu tunggu pelayanan laboratorium",
      "Jumlah pasien yang disurvey di hari tersebut",
      "jumlah seluruh pasien yang diperiksa di hari tersebut dikurangi jumlah penyerahan hasil laboratorium salah orang",
      "Jumlah pasien pemeriksaan laboratorium di hari tersebut",
      "jumlah seluruh spesimen yang diperiksa di hari tersebut dikurangi jumlah spesimen yang tertukar",
      "jumlah spesimen di hari tersebut",
      "Jumlah kumulatif waktu tunggu pelayanan laboratorium cito",
      "Jumlah pemeriksaan cito di hari tersebut",
      "Semua hasil laboratorium kritis yang dilaporkan < 30 menit ",
      "Jumlah semua hasil laboratorium kritis di hari tersebut",
      "Jumlah pasien laboratorium yang dilakukan identifikasi dengan tepat",
      "Jumlah seluruh  Pasien",
      "Semua hasil laboratorium kritis pasien covid-19 yang dilaporkan < 30 menit ",
      "Jumlah semua hasil laboratorium kritis pasien covid-19 di hari tersebut"
     
    ],
    farmasi: [
      "Jumlah kumulatif waktu tunggu obat jadi pasien yang disurvey",
      "Jumlah  pasien yang disurvey di hari tersebut",
      "Jumlah kumulatif waktu tunggu obat racikan pasien yang disurvey",
      "Jumlah  pasien yang disurvey di hari tersebut",
      "Jumlah Kesalahan pemberian obat",
      "Jumlah seluruh permintaan resep",
      "Jumlah resep yang  yang sesuai formularium",
      "Jumlah resep yang disurvey",
      "Jumlah pasien yang dilakukan identifikasi dengan tepat",
      "Jumlah seluruh pasien"
    ],
    gizi: [
      "Jumlah pemberian makan pasien yang  tepat waktu",
      "Jumlah pemberian makan pasien di hari tersebut",
      "Jumlah Pasien Yang Menyisakan Makan",
      "Jumlah Pasien Rawat Inap Yang Bisa Makan di hari tersebut",
      "Jumlah pemberian makan yang sesuai dengan jenis diet",
      "Jumlah pemberian makan pasien di hari tersebut"
    ],
    rekamMedis: [
      "Jumlah rekam medis unit rawat inap yang diisi lengkap 24 jam setelah selesai pelayanan",
      "Jumlah rekam medis unit rawat inap di hari tersebut",
      "Jumlah rekam medis unit rawat jalan yang diisi lengkap 24 jam setelah selesai pelayanan",
      "Jumlah rekam medis unit rawat jalan di hari tersebut",
      "Jumlah rekam medis unit kamar operasi yang diisi lengkap 24 jam setelah selesai pelayanan",
      "Jumlah rekam medis unit kamar operasi di hari tersebut",
      "Jumlah rekam medis unit kamar bersalin yang diisi lengkap 24 jam setelah selesai pelayanan",
      "Jumlah rekam medis unit kamar bersalin di hari tersebut",
      "Jumlah rekam medis unit IGD yang diisi lengkap 24 jam setelah selesai pelayanan",
      "Jumlah rekam medis unit IGD di hari tersebut",
      "Jumlah rekam medis unit HCU yang diisi lengkap 24 jam setelah selesai pelayanan",
      "Jumlah rekam medis unit HCU di hari tersebut",
      "Jumlah rekam medis unit Perinatologi yang diisi lengkap 24 jam setelah selesai pelayanan",
      "Jumlah rekam medis unit perinatologi di hari tersebut",
      "Jumlah pasien yang mendapat informasi jelas dan Informed consent yang diisi lengkap",
      "Jumlah pasien yang mendapat tindakan medis di hari tersebut",
      "Jumlah kumulatif waktu penyediaan rekam medis rawat jalan",
      "Total rekam medis rawat jalan di hari tersebut",
      "Jumlah kumulatif waktu penyediaan rekam medis  rawat inap",
      "Total rekam medis rawat inap di hari tersebut",
      "Jumlah rekam medis yang hilang di hari tersebut",
      "Jumlah pasien di hari tersebut",
      "Jumlah pasien yang dilakukan identifikasi dengan tepat",
      "Jumlah seluruh pasien"
    ],
    kesling: [
      "Jumlah limbah padat yang dikelola sesuai dengan Standar Prosedur Operasional",
      "Jumlah proses pengolahan limbah padat yang diamati di hari tersebut"
    ],
    cssdLinen: [],
    Linen: [],
    ipsrs: [
      "Jumlah kerusakan alat yang ditangani ≤ 15 menit",
      "Jumlah laporan kerusakan alat di hari tersebut "
    ],
    k3rs: [],
    kasir: [
      "jumlah kumulatif waktu sejak pasien dinyatakan boleh pulang sampai pasien mendapatkan informasi tagihan rawat inap",
      "jumlah pasien rawat inap yang pulang di hari tersebut",
      "jumlah pasien rawat jalan yang tidak membayar tagihan tindakan",
      "jumlah pasien rawat jalan (pembayarn umum) di hari tersebut"
     
    ],
    loketPendaftaran: [
      "Jumlah pasien dengan penginputan data SIMRS lengkap di hari tersebut",
      "Jumlah pasien yang diinput di SIMRS di hari tersebut"
    ],
    ambulance: [
      "jumlah pasien yang dilayani < 30 menit",
      "jumlah pasien yang dilayani di hari tersebut"
    ],
    ppi: [
      "Jumlah unit yang menyediakan APD",
      "Jumlah seluruh unit di rumah sakit",
      "Jumlah unit yang melakkukan pencatatan dan pelaporan surveilans HAIs",
      "Jumlah seluruh unit di rumah sakit",
      "Jumlah pasien yang terinfeksi plebitis",
      "Jumlah hari pemasangan infuse perifer",
      "Jumlah pasien yang terinfeksi saluran nafas",
      "Jumlah hari tirah baring",
      "Jumlah pasien yang terinfeksi kateter urine",
      "Jumlah hari terpasang kateter urine",
      "Jumlah pasien yang terinfeksi IDO",
      "Jumlah pasien yang dioperasi",
      "Jumlah unit yang patuh dalam menggunakan APD",
      "Jumlah seluruh unit  di rumah sakit",
      "Jumlah kegiatan cuci tangan yang  dilakukan dengan tepat dan benar",
      "Jumlah peluang kebersihan tangan",
    ],
    timKprs: [
    "Jumlah pasien  yang dilakukan identifikasi dengan tepat",
    "Jumlah seluruh  Pasien ",
   

    "Jumlah hasil laboratorium kritis pasien yang dilaporkan < 30 menit",
    "Jumlah hasil laboratorium kritis pasien di hari tersebut",
    "Semua hasil laboratorium kritis pasien covid-19 yang dilaporkan < 30 menit ",
    "Jumlah semua hasil laboratorium kritis pasien covid-19 di hari tersebut",
    "Jumlah obat yang diberikan tepat sesuai ketentuan",
    "Jumlah seluruh pemberian obat high alert yang dipantau ",
    "Seluruh lembar surgery safety checlist yang ditulis lengkap ",
    "Seluruh pasien yang mendapat pembedahan di hari tersebut",
    "Jumlah seluruh tenaga medis yang melakukan kebersihan tangan dengan benar",
    "Jumlah seluruh tenaga medis yang diamati",
    "Jumlah pasien yang dilakukan tindakan pengelolaan resiko jatuh dengan tepat",
    "jumlah pasien Rawat inap dalam 1 bulan",
    "Jumlah kejadian pasien jatuh",
    "Jumlah  seluruh pasien "

    ],
    komiteMedis: [],
    komiteKeperawatan: [],
    komiteNakesLain: [],
    timPkrs: [
      "Jumlah pasien rawat inap yang diberi edukasi secara lengkap oleh setiap PPA",
      "Jumlah pasien di hari tersebut",
      "Jumlah pasien rawat jalan yang diberi edukasi secara lengkap oleh setiap PPA",
      "Jumlah pasien disurvey",
      "Jumlah kegiatan penyuluhan kelompok yang dilakukan dalam satu bulan",
      "Jumlah penyuluhan kelompok yang dijadwalkan"
    ],
    timPpra: [],
    timKomplain: [],
    manajemenKepegawaian: [],
  keuangan: []
  };
  var monthlyNames = {
    igd: [
      "Kemampuan menangani life saving anak dan dewasa",
      "Pemberi pelayanan kegawat daruratan yang bersertifikat BLS/PPGD/GELS/ALS",
      "Ketersediaan tim penanggulangan bencana",
      "Waktu tanggap Pelayanan Dokter di Gawat Darurat",
      "Kepuasan Pelanggan di Gawat Darurat",
      "Kematian Pasien ≤ 24 jam di Gawat Darurat",
      "Angka kejadian pasien jatuh di IGD",
      "Waktu tanggap Penanganan kegawatdaruratan pasien covid-19 di IGD",
      "Ketersediaan tim code blue",
      "Lama observasi pasien di IGD",
      "Kejadian pulang paksa di IGD",
      "Tidak ada Penumpukan pasien di IGD",
      "Ketepatan identifikasi pasien di IGD"
    ],
    rawatJalan: [
      "Buka pelayanan sesuai ketentuan",
      "Waktu tunggu di Rawat Jalan",
      "Kepuasan Pelanggan di Rawat Jalan",
      "Ketepatan identifikasi pasien  di rawat jalan",
      "Pasien rawat jalan TB yang ditangani dengan strategi DOTS"
     
    ],
    rawatInap: [
      "Jam visite dokter spesialis",
      "Angka kejadian infeksi nosokomial",
      "Adanya kejadian pasien jatuh yang berakibat kecacatan atau kematian",
      "Kematian pasien > 48 Jam",
      "Kejadian pulang paksa",
      "Kepuasaan pelanggan Rawat Inap",
      "Kejadian reaksi transfusi",
      "Kelengkapan pengisian asessment awal < 24 jam sesudah masuk Rumah Sakit",
      "Kelengkapan asessment awal medis dan keperawatan pasien covid-19 di Rawat Inap <24 Jam",
      "ketepatan identifikasi pasien di rawat inap",
      "Ketepatan Penanganan Pasien Covid-19 dengan EWS 1-6 sesuai Ketentuan di Rawat Inap"


    ],
    kamarOperasi: [
      "Waktu tunggu operasi elektif",
      "Kejadian kematian dimeja operasi",
      "Tidak adanya kejadian operasi salah sisi",
      "Tidak adanya kejadian operasi salah orang",
      "Tidak adanya kejadian salah tindakan pada operasi",
      "Tidak adanya kejadian tertinggalnya benda asing pada tubuh pasien setelah operasi",
      "Komplikasi anastesi karena over dosis, reaksi anantesi dan salah penempatan endotracheal tube",
      "Penundaan Operasi Elektif",
      "Kelengkapan pengisian surgery safety checklist"
    ],
    perinatologi: [
      "Angka kejadian infeksi nosokomial",
      "Kejadian pulang paksa",
      "Angka Bayi yang mendapatkan ASI eksklusif sepanjang perawatan diruang Perinatologi",
      "Angka keberhasilan perawatan bayi dengan BBLR  (1500 gram-2500 gram)",
      "Angka kematian > 48 jam",
      "Kelengkapan asessment awal medis dan keperawatan pasien  di perinatologi < 24 Jam"
    ],
    hcu: [
      "Assesment awal pasien rawat inap <24 jam ",
      "Ketepatan identifikasi pasien di HCU "

     ],
    kamarBersalin: [
      "Kejadian kematian ibu karena persalinan akibat perdarahan", //1
      "Kejadian kematian ibu karena persalinan akibat pre eklampsia", //2
      "Kejadian kematian ibu karena persalinan akibat sepsis", //3
      "Pemberi pelayanan persalinan normal", //4
      "Pemberi pelayanan persalinan dengan penyulit", //5
      "Kemampuan menangani bayi dengan asfiksia", //6
      "Pertolongan persalinan melalui seksio cesaria", //7
      "Kepuasan Pelanggan", //8
      "Angka kejadian pasien jatuh di kamar bersalin", //9
      "Pelaksanaan IMD", //10
      "Ketepatan identifikasi di kamar bersalin" //11
    ],
    radiologi: [
      "Waktu tunggu hasil pelayanan thorax foto",
      "Kejadian kegagalan pelayanan rontgen",
      "Kesalahan penyerahan hasil radiologi",
      "Kepuasan pelanggan",
      "Waktu tunggu hasil pelayanan foto rontgen cito",
      "Ketepatan Identifikasi Pasien di Radiologi"
    ],
    laboratorium: [
      "Waktu tunggu hasil pelayanan laboratorium",
      "Tidak adanya kesalahan penyerahan hasil pemeriksaan laboratorium",
      "Tidak adanya kejadian tertukar spesimen",
      "Waktu tunggu hasil pelayanan laboratorium cito",
      "Kepuasan Pelanggan",
      "Waktu lapor hasil kritis laboratorium < 30 menit",
      "Kesesuaian baku mutu eksternal",
      "Ketepatan identifikasi pasien di laboratorium",
      "Ketersediaan Reagen Covid 19 (RDT Antigen dan RDT Antibodi)",
      "Waktu lapor hasil kritis laboratorium pasien Covid 19  <30 menit"
     ],
    farmasi: [
      "Waktu tunggu pelayanan obat jadi",
      "Waktu tunggu pelayanan obat racikan",
      "Tidak adanya kejadian kesalahan pemberian obat",
      "Penulisan resep sesuai formularium nasional",
      "Kepuasan pelanggan",
      "Kekosongan obat covid-19",
      "Ketepatan identifikasi pasien di farmasi",
      "Pemberian label obat high alert"
    ],
    gizi: [
      "Ketepatan waktu pemberian makanan kepada pasien",
      "Sisa makanan yang tidak termakan oleh pasien",
      "Tidak adanya kesalahan dalam pemberian diet",
      "Kepuasan pelanggan"
     
    ],
    rekamMedis: [
      "Kelengkapan pengisian rekam medik 24 jam setelah selesai pelayanan unit rawat inap",
      "Kelengkapan pengisian rekam medik 24 jam setelah selesai pelayanan unit rawat jalan",
      "Kelengkapan pengisian rekam medik 24 jam setelah selesai pelayanan unit kamar operasi",
      "Kelengkapan pengisian rekam medik 24 jam setelah selesai pelayanan unit kamar bersalin",
      "Kelengkapan pengisian rekam medik 24 jam setelah selesai pelayanan unit IGD",
      "Kelengkapan pengisian rekam medik 24 jam setelah selesai pelayanan unit HCU",
      "Kelengkapan pengisian rekam medik 24 jam setelah selesai pelayanan unit perinatologi",
      "Kelengkapan informed concent setelah mendapatkan informasi yang jelas",
      "Waktu penyediaan dokumen rekam medik pelayanan rawat jalan",
      "Waktu penyediaan dokumen rekam medik pelayanan rawat inap",
      "Berkas rekam medis yang hilang",
      "Ketepatan identifikasi pasien di rekam medis"
    ],
    kesling: [
      "Baku mutu limbah cair BOD",
      "Baku mutu limbah cair COD",
      "Baku mutu limbah cair TSS",
      "Baku mutu limbah cair PH",
      "Baku mutu limbah cair Ammonia",
      "Baku mutu limbah cair Coliform",
      "Baku mutu limbah cair Minyak",
      "Pengolahan limbah  padat berbahaya sesuai dengan aturan"
    ],
    cssdLinen: [
      "Ketepatan pendistribusian alat steril",
      "Kepuasan Pelanggan Unit CSSD"
    ],
    Linen: [
      "Tidak adanya kejadian linen yang hilang",
      "Ketepatan pengelolaan linen infeksius",
      "Ketersediaaan linen"
    ],
    ipsrs: [
      "Kecepatan waktu menanggapi kerusakan alat < 15 menit",
      "Ketepatan waktu pemeliharaan alat utilitas",
      "Peralatan Laboratorium (dan alat ukur yang lain) yang terkalibrasi tepat waktu sesuai dengan ketentuan kalibrasi.",
      "Ketepatan waktu pemeliharaan alat medis"
    ],
    k3rs: [
      "Pelaksanaan Standar Penanganan Tertusuk Jarum",
      "Pelaksanaan Standar Penanganan Kecelakaan Kerja Terkait Fasilitas",
      "Ketepatan Pengecekan Sarana Proteksi Kebakaran"
    ],
    kasir: [
      "Ketepatan waktu pemberian informasi tagihan pasien rawat inap",
      "Kepatuhan pasien rawat jalan  dalam membayar tagihan tindakan"
    ],
    loketPendaftaran: [
      "Kelengkapan penginputan data di SIMRS"
    ],
    ambulance: [
      "Kecepatan Pelayanan Ambulance di RS < 30 Menit",
      "Tidak Adanya Kecelakaan Ambulans Yang Menimbulkan Kecacatan atau Kematian",
      "Kepuasan pelanggan"
    ],
    ppi: [
      "Tersedianya anggota Tim PPI yang terlatih",
      "Tersedianya APD (Alat Pelindung Diri)",
      "Terlaksananya kegiatan pencatatan dan pelaporan infeksi nosokomial di rumah sakit",
      "Infeksi luka infus/flebistis",
      "Hospital-acquired pneumonia (HAP)",
      "Infeksi saluran kemih (ISK)",
      "Infeksi Daerah Operasi (IDO)",
      "Pelaksanaan kegiatan PPI sesuai program",
      "Penggunaan APD saat bertugas",
      "Adanya IPCN",
      "Ketersediaan program PPI",
      "Kepatuhan Cuci Tangan"
    ],
    timKprs: [
      "Ketepatan identifikasi pasien ",
   
      "Waktu lapor hasil kritis laboratorium < 30 menit",
      "Waktu lapor hasil kritis laboratorium pasien covid-19 < 30 menit",
      "Ketepatan pemberian obat high alert sesuai prosedur ",
      "Kelengkapan pengisian surgery safety checklist pasien operasi",
      "Kepatuhan kebersihan tangan",
      "Kepatuhan pengelolaan pasien resiko jatuh sesuai prosedur di rawat inap",
      "Kejadian pasien jatuh",
      "Ketepatan identifikasi pasien covid-19 di rawat inap"

    ],
    komiteMedis: ["Angka kepatuhan pelaksanaan PPK dan CP oleh DPJP"],
    komiteKeperawatan: [
      "Setiap perawat mempunyai sertifikat BTCLS",
      "Kehadiran paramedis dalam mengikuti temu ilmiah",
      "Kepatuhan pelaksanaan Asuhan Keperawatan Covid-19 di rawat inap"
    ],
    komiteNakesLain: [
      "Kepatuhan pelaksanaan asuhan gizi covid-19 di rawat inap",
      "Kepatuhan pelaksanaan asuhan kefarmasian covid-19 di rawat inap"
    ],
    timPkrs: [
      "Kepatuhan komunikasi dan edukasi kepada pasien dan atau keluarga oleh PPA di rawat inap",
      "Kepatuhan komunikasi dan edukasi kepada pasien dan atau keluarga oleh PPA di rawat jalan",
      "Keterlaksanaan pendidikan kesehatan internal (penyuluhan kelompok)"
    ],
    timPpra: [
      "Evaluasi kuantitas dan kualitas penggunaan antibiotik pada pasien di rawat inap",
      "Penurunan angka kejadian infeksi di rumah sakit yang disebabkan oleh mikroba multiresisten",
      "Peningkatan mutu penanganan kasus infeksi secara multidisiplin",
      "Penggunaan profilaksis pada pasien SC"
    ],
    timKomplain: [
      "Kepuasan pelanggan",
      "Kecepatan respon terhadap komplain"
    ],
    manajemenKepegawaian: [
      "Ketepatan Waktu Pengusulan Kenaikan Pangkat", // 1
      "Pelatihan Staf Minimal 20 jam/tahun", // 2
      "Daftar Urut Kepangkatan", // 3
      "Kepatuhan absenteisme pegawai   ≤ 185 menit per bulan " //4
    ],
	keuangan: [
      "Kelengkapan Laporan Akuntabilitas Kinerja",
      "Cost Recovery Rate",
      "Ketepatan Waktu Penyusunan Laporan Keuangan",
      "Ketepatan Waktu Pemberian Gaji dan tunjangan pegawai non PNS Sesuai Kesepakatan Waktu"
  ]
  };
  var monthlyTarget = {
    igd: [
      "100%",
      "100%",
      "1 tim",
      "≤ 5 menit",
      "≥ 70 %",
      "≤ 0,2 %",
    "0%",
      "≤ 5 menit",
      "1 tim",
      "≤ 8 jam",
      "≤ 5 %",
      "100%",
      "100%"
    ],
    rawatJalan: [
      "100%",
      "≤ 60 menit",
      "≥ 90 %",
      "100%",
      "100%"     
     ],
    rawatInap: [
	  "100%",
	  "≤ 1,5%",
	  "100%",
	  "≤ 2,5 %",
	  "≤ 5%",
	  "≥ 90%",
	  "≤ 0,01%",
	  "100%",
	  "100%",
	  "100%",
	  "100%"
     
    ],
    kamarOperasi: [
      "≤ 2 hari",
      "≤ 1 %",
      "100%",
      "100%",
      "100%",
      "100%",
      "≤ 6 %",
      "≤ 5 %",
       "100%"
    ],
    perinatologi: [
	  "≤ 1,5 %",
	  "≤ 5 %",
	  "100%", 
	  "100%", 
	  "≤ 0,25 %",
	  "100%"
	], 
    hcu: [
      "100%",
      "100%"
	],
    kamarBersalin: [
      "≤ 1 %",
      "≤ 30 %",
      "≤ 0,2 %",
      "100%",
      "1 tim",
      "100%",
      "≤ 20 %",
      "≥ 80 %",
      "0%",
      "100%",
      "100%"
    ],
    radiologi: [
      "≤ 180 menit",
    "≤ 2 %",
      "0%",
      "≥ 80 %",
      "≤ 120 menit",
      "100%"
    ],
    laboratorium: [
      "≤ 140 menit",
      "100%",
      "100%",
      "< 60 Menit",
      "≥ 80 %",
      "100%",
      "100%",
      "100%",
      "100%",
      "100%"
	],
    farmasi: [
      "≤ 30 menit",
      "≤ 60 menit",
      "100%",
      "≥ 80 %",
      "≥ 80 %",
      "<15 %",
      "100%",
      "100%"
    ],
    gizi: [
	  "≥ 90 %",
	  "≥ 20 %", 
	  "100%",
	  "≥ 80 %"
	 
	],
    rekamMedis: [
      "100%",
      "100%",
      "100%",
      "100%",
      "100%",
      "100%",
      "100%",
      "100%",
      "≤ 10 menit",
      "≤ 15 menit",
      "0%",
      "100%"
    ],
    kesling: [
      "BOD ≤ 30 mg/l",
      "COD ≤ 100 mg/l",
      "TSS ≤ 30 mg/l",
      "PH 6-9",
      "Ammonia ≤ 10 mg/l",
      " Total coliform ≤ 3000 jumlah/100 ml ",
      "Minyak dan lemak ≤ 5 mg/l",
      "100%"
    ],
    cssdLinen: [
	  "100%",
    "≥ 80%"
    ],
    Linen: [
	  "100%",
	  "100%",
	  "100%"
    ],
    ipsrs: [
      "≥ 80 %",
      "100%",
      "100%",
      "100%"
	],
    k3rs: ["100%", "100%", "100%"],
    kasir: ["≤ 120 Menit", "100%"],
    loketPendaftaran: ["100%"],
    ambulance: ["100%", "100%", "≥ 80 %"],
    ppi: [
      "75%",
      "75%",
      "75%",
      "≤ 5 %",
      "≤ 1 ‰",
      "≤ 4.7 ‰",
      "≤ 2 %",
      "100%",
      "100%",
      "1 ipcn/100-150TT",
      "Tersedia",
      "80%"
    ],
    timKprs: [
      "100%",
      
      "100%",
      "100%",
      "100%",
      "100%",
      "100%",
      "100%",
      "100%",
      "100%"
    ],
    komiteMedis: ["80%"],
    komiteKeperawatan: ["100%", "100%", "100%"],
    komiteNakesLain: ["100%", "100%"],
    timPkrs: ["80%", "80%", "80%"],
    timPpra: ["1 laporan", "0%", "100%", "100%"],
    timKomplain: ["80%", "75%"],
    manajemenKepegawaian: [
      "100%",
      "≥ 60%",
      "100%",
    "100%"
    ],
	keuangan: ["100%", "≥40%", "100%", "100%"]
  };
  var dailyMonthlySpecialHasilCalculation = {
    hcu: [
      null,
      null,
      null,
      ["zeroDenumeratorIsHundred"],
      null,
      null,
      null,
      null,
      null
    ],
    kamarBersalin: [
      null, // 1
      null, // 2
      null, // 3
      null, // 4
      null, // 5
      ["zeroDenumeratorIsHundred"], // 6
      ["zeroDenumeratorIsHundred"], // 7
      ["zeroDenumeratorIsHundred"], // 8
      null, // 9
      null, // 10
      null // 11
    ],
    k3rs: [
      ["zeroDenumeratorIsHundred"],
      ["zeroDenumeratorIsHundred"],
      ["zeroDenumeratorIsHundred"]
    ],
    timKomplain: [
      null,
      ["zeroDenumeratorIsHundred"]
    ]
  };
  var monthlyTargetHasil = {
    igd: [
      [100, null],
      [100, null],
      [null, 1],
      [null, 5],
      [70, null],
      [null, 0.2],
      [null, 100],
    [null, 5],
      [null, 1],
      [null, 8],
      [null, 5],
      [100, null],
      [100, null]
    ],
    rawatJalan: [
      [100, null],
      [null, 60],
      [90, null],
      [100, null],
      [100, null]
      
     
    ],
    rawatInap: [
      [100, null], // 1
      [null, 1.5], // 2
      [null, 100], // 3
      [null, 2.5], // 4
      [null, 5], // 5
      [null, 90], // 6
      [null, 0.01], // 8
      [100, null], // 9
      [100, null], // 10
      [100, null], // 11
      [100, null] // 12
     
    ],
    kamarOperasi: [
      [null, 2],
      [null, 1],
      [100, null],
      [100, null],
      [100, null],
      [100, null],
      [null, 6],
      [null, 5],
      [100, null]
    ],
    perinatologi: [
      [null, 1.5],
      [null, 5],
      [100, null],
      [100, null],
      [null, 0.25],
      [100, null]
    ],
    hcu: [
      [100, null],
      [100, null]
     ],
    kamarBersalin: [
      [null, 1],
      [null, 30],
      [null, 0.2],
      [100, null],
      [null, 1],
      [100, null],
      [null, 20],
      [80, null],
      [null, 0],
      [100, null],
      [100, null]
    ],
    radiologi: [
      [null, 180],
    [null, 2],
      [null, 0],
      [80, null],
      [null, 120],
      [100, null]
    ],
    laboratorium: [
      [null, 140],
      [100, null],
      [100, null],
      [null, 60],
      [80, null],
      [100, null],
      [100, null],
      [100, null],
      [100, null],
      [100, null]
    ],
    farmasi: [
      [null, 30],
      [null, 60],
      [100, null],
      [80, null],
      [80, null],
      [null, 15],
      [100, null],
      [100, null]
    ],
    gizi: [
      [90, null],
      [20, null],
      [100, null],
      [80, null]
      
    ],
    rekamMedis: [
      [100, null],
      [100, null],
      [100, null],
      [100, null],
      [100, null],
      [100, null],
      [100, null],
      [100, null],
      [null, 10],
      [null, 15],
      [null, 0],
      [100, null]
    ],
    kesling: [
      [null, 30],
      [null, 100],
      [null, 30],
      [6, 9],
      [null, 10],
      [null, 3000],
      [null, 5],
      [100, null]
    ],
    cssdLinen: [
      [100, null],
      [80, null]
    ],
   Linen: [
      [100, null],
      [100, null],
      [100, null]
    ],
    ipsrs: [
      [80, null],
      [100, null],
      [100, null],
      [100, null]
    ],
    k3rs: [
      [100, null],
      [100, null],
      [100, null]
    ],
    kasir: [
      [null, 120],
      [100, null]
    ],
    loketPendaftaran: [
      [100, null]
    ],
    ambulance: [
      [100, null],
      [100, null],
      [80, null]
    ],
    ppi: [
      [75, null],
      [75, null],
      [75, null],
      [null, 5],
      [null, 1],
      [null, 4.7],
      [null, 2],
      [100, null],
      [100, null],
      [100, null],
      [100, null],
      [80, null]
    ],
    timKprs: [
      [100, null],
      
      [100, null],
      [100, null],
      [100, null],
      [100, null],
      [100, null],
      [100, null],
      [100, null],
      [100, null]
    ],
    komiteMedis: [[80, null]],
    komiteKeperawatan: [
      [100, null],
      [100, null],
      [100, null]
    ],
    komiteNakesLain: [
      [100, null],
      [100, null]
    ],
    timPkrs: [
      [80, null],
      [80, null],
      [80, null]
    ],
    timPpra: [
      [null, 1],
      [null, 0],
      [100, null],
      [100, null]
    ],
    timKomplain: [
      [80, null],
      [75, null]
    ],
    manajemenKepegawaian: [
      [100, null],
      [60, null],
      [100, null],
      [100, null]
    ],
  keuangan: [
    [100, null],
      [40, null],
      [100, null],
      [100, null]
  ]
  };
  var monthlyDisable = {
  igd: [
      [1, "numerator", "denumerator", "hasil"],
      [4, "numerator", "denumerator", "hasil"],
      [6, "numerator", "denumerator", "hasil"],
      [7, "numerator", "denumerator", "hasil"],
      [8, "numerator", "denumerator", "hasil"],
      [10, "numerator", "denumerator", "hasil"],
      [11, "numerator", "denumerator", "hasil"],
      [13, "numerator", "denumerator", "hasil"]
    ],
    rawatJalan: [
      [1, "numerator", "denumerator", "hasil"],
      [2, "numerator", "denumerator", "hasil"],
      [4, "numerator", "denumerator", "hasil"],
      [5, "numerator", "denumerator", "hasil"]
     
    ],
    rawatInap: [
      [1, "numerator", "denumerator", "hasil"],
      [2, "numerator", "denumerator", "hasil"],
      [4, "numerator", "denumerator", "hasil"],
      [5, "numerator", "denumerator", "hasil"],
      [7, "numerator", "denumerator", "hasil"],
      [8, "numerator", "denumerator", "hasil"],
      [9, "numerator", "denumerator", "hasil"],
      [10, "numerator", "denumerator", "hasil"],
      [11, "numerator", "denumerator", "hasil"]
    ],
    kamarOperasi: [
      [1, "numerator", "denumerator", "hasil"],
      [2, "numerator", "denumerator", "hasil"],
      [3, "numerator", "denumerator", "hasil"],
      [4, "numerator", "denumerator", "hasil"],
      [5, "numerator", "denumerator", "hasil"],
      [6, "numerator", "denumerator", "hasil"],
      [7, "numerator", "denumerator", "hasil"],
      [8, "numerator", "denumerator", "hasil"],
      [9, "numerator", "denumerator", "hasil"]
    ],
    perinatologi: [
      [1, "numerator", "denumerator", "hasil"],
      [2, "numerator", "denumerator", "hasil"],
      [3, "numerator", "denumerator", "hasil"],
      [4, "numerator", "denumerator", "hasil"],
      [5, "numerator", "denumerator", "hasil"],
      [6, "numerator", "denumerator", "hasil"]
    ],
    hcu: [
      [1, "numerator", "denumerator", "hasil"],
      [2, "numerator", "denumerator", "hasil"]
      ],
    kamarBersalin: [
      [1, "numerator", "denumerator", "hasil"],
      [2, "numerator", "denumerator", "hasil"],
      [3, "numerator", "denumerator", "hasil"],
      [6, "numerator", "denumerator", "hasil"],
      [7, "numerator", "denumerator", "hasil"],
      [9, "numerator", "denumerator", "hasil"],
      [10, "numerator", "denumerator", "hasil"],
      [11, "numerator", "denumerator", "hasil"]
    ],
    radiologi: [
      [1, "numerator", "denumerator", "hasil"],
      [2, "numerator", "denumerator", "hasil"],
      [3, "numerator", "denumerator", "hasil"],
      [5, "numerator", "denumerator", "hasil"],
      [6, "numerator", "denumerator", "hasil"]
    ],
    laboratorium: [
      [1, "numerator", "denumerator", "hasil"],
      [2, "numerator", "denumerator", "hasil"],
      [3, "numerator", "denumerator", "hasil"],
      [4, "numerator", "denumerator", "hasil"],
      [6, "numerator", "denumerator", "hasil"],
      [8, "numerator", "denumerator", "hasil"],
      [10, "numerator", "denumerator", "hasil"]
    ],
    farmasi: [
      [1, "numerator", "denumerator", "hasil"],
      [2, "numerator", "denumerator", "hasil"],
      [3, "numerator", "denumerator", "hasil"],
      [4, "numerator", "denumerator", "hasil"],
      [7, "numerator", "denumerator", "hasil"]
 
    ],
    gizi: [
      [1, "numerator", "denumerator", "hasil"],
      [2, "numerator", "denumerator", "hasil"],
      [3, "numerator", "denumerator", "hasil"]
     
    ],
    rekamMedis: [
      [1, "numerator", "denumerator", "hasil"],
      [2, "numerator", "denumerator", "hasil"],
      [3, "numerator", "denumerator", "hasil"],
      [4, "numerator", "denumerator", "hasil"],
      [5, "numerator", "denumerator", "hasil"],
      [6, "numerator", "denumerator", "hasil"],
      [7, "numerator", "denumerator", "hasil"],
      [8, "numerator", "denumerator", "hasil"],
      [9, "numerator", "denumerator", "hasil"],
      [10, "numerator", "denumerator", "hasil"],
      [11, "numerator", "denumerator", "hasil"],
      [12, "numerator", "denumerator", "hasil"]
    ],
    kesling: [[8, "numerator", "denumerator", "hasil"]],
    cssdLinen: [],
    Linen: [],
    ipsrs: [
      [1, "numerator", "denumerator", "hasil"]
    ],
    k3rs: [],
	kasir: [
      [1, "numerator", "denumerator", "hasil"],
      [2, "numerator", "denumerator", "hasil"]
	],
    loketPendaftaran: [
      [1, "numerator", "denumerator", "hasil"]
    ],
    ambulance: [
      [1, "numerator", "denumerator", "hasil"]
    ],
    ppi: [
      [2, "numerator", "denumerator", "hasil"],
      [3, "numerator", "denumerator", "hasil"],
      [4, "numerator", "denumerator", "hasil"],
      [5, "numerator", "denumerator", "hasil"],
      [6, "numerator", "denumerator", "hasil"],
      [7, "numerator", "denumerator", "hasil"],
      [9, "numerator", "denumerator", "hasil"],
      [12, "numerator", "denumerator", "hasil"]
    ],
    timKprs: [
      [1, "numerator", "denumerator", "hasil"],
      [2, "numerator", "denumerator", "hasil"],
      [3, "numerator", "denumerator", "hasil"],
      [4, "numerator", "denumerator", "hasil"],
      [5, "numerator", "denumerator", "hasil"],
      [6, "numerator", "denumerator", "hasil"],
      [7, "numerator", "denumerator", "hasil"],
      [8, "numerator", "denumerator", "hasil"]
    
    ],
    komiteMedis: [],
    komiteKeperawatan: [],
    komiteNakesLain: [],
    timPkrs: [
      [1, "numerator", "denumerator", "hasil"],
      [2, "numerator", "denumerator", "hasil"],
      [3, "numerator", "denumerator", "hasil"]
    ],
    timPpra: [],
    timKomplain: [],
    manajemenKepegawaian: [],
	keuangan: []
  };
  var monthlyMapping = {
    igd: [
      [1, 1, 2],
      [4, 3, 4],
      [6, 5, 6],
      [7, 7, 8],
      [8, 9, 10],
      [10, 11, 12],
      [11, 13, 14],
      [13, 15, 16]
    ],
    rawatJalan: [
      [1, 1, 2],
      [2, 3, 4],
      [4, 5, 6],
      [5, 7, 8]
     
    ],
    rawatInap: [
      [1, 1, 2],
      [2, 3, 4],
      [4, 5, 6],
      [5, 7, 8],
      [7, 9, 10],
      [8, 11, 12],
      [9, 13, 14],
      [10, 15, 16],
      [11, 17, 18]
   
    ],
    kamarOperasi: [
      [1, 1, 2],
      [2, 3, 4],
      [3, 5, 6],
      [4, 7, 8],
      [5, 9, 10],
      [6, 11, 12],
      [7, 13, 14],
      [8, 15, 16],
      [9, 17, 18]
      
    ],
    perinatologi: [
      [1, 1, 2],
      [2, 3, 4],
      [3, 5, 6],
      [4, 7, 8],
      [5, 9, 10],
      [6, 11, 12]
    ],
    hcu: [
      [1, 1, 2],
      [2, 3, 4]
      ],
    kamarBersalin: [
      [1, 1, 2],
      [2, 3, 4],
      [3, 5, 6],
      [6, 7, 8],
      [7, 9, 10],
      [9, 11, 12],
      [10, 13, 14],
      [11, 15, 16]
     
    ],
    radiologi: [
      [1, 1, 2],
      [2, 3, 4],
      [3, 5, 6],
      [5, 7, 8],
      [6, 9, 10]
    ],
    laboratorium: [
      [1, 1, 2],
      [2, 3, 4],
      [3, 5, 6],
      [4, 7, 8],
      [6, 9, 10],
      [8, 11, 12],
      [10, 13, 14]
    ],
    farmasi: [
      [1, 1, 2],
      [2, 3, 4],
      [3, 5, 6],
      [4, 7, 8],
      [7, 9, 10]
     
    ],
    gizi: [
      [1, 1, 2],
      [2, 3, 4],
      [3, 5, 6]
    ],
    rekamMedis: [
      [1, 1, 2],
      [2, 3, 4],
      [3, 5, 6],
      [4, 7, 8],
      [5, 9, 10],
      [6, 11, 12],
      [7, 13, 14],
      [8, 15, 16],
      [9, 17, 18],
      [10, 19, 20],
      [11, 21, 22],
      [12, 23, 24]
    ],
    kesling: [[8, 1, 2]],
    cssdLinen: [],
    Linen: [],
    ipsrs: [
      [1, 1, 2]
    ],
    k3rs: [],
    kasir: [
      [1, 1, 2],
      [2, 3, 4]
    
    ],
    loketPendaftaran: [
      [1, 1, 2]
     
    ],
    ambulance: [
      [1, 1, 2]
    ],
    ppi: [
      [2, 1, 2],
      [3, 3, 4],
      [4, 5, 6],
      [5, 7, 8],
      [6, 9, 10],
      [7, 11, 12],
      [9, 13, 14],
      [12, 15, 16]
    ],
    timKprs: [
      [1, 1, 2],
      [2, 3, 4],
      [3, 5, 6],
      [4, 7, 8],
      [5, 9, 10],
      [6, 11, 12],
      [7, 13, 14],
      [8, 15, 16]
    
    ],
    komiteMedis: [],
    komiteKeperawatan: [],
    komiteNakesLain: [],
    timPkrs: [
      [1, 1, 2],
      [2, 3, 4],
      [3, 5, 6]
    ],
    timPpra: [],
    timKomplain: [],
    manajemenKepegawaian: [],
    keuangan: []
  };
  var monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember"
  ];
  this.initDailyData = function(currPage) {
    var dailyDataList = [];
    for (var i = 0; i < dailyNames[currPage].length; i++) {
      var dailyData = [];
      for (var day = 0; day < 31; day++) {
        dailyData.push("");
      }
      dailyDataList.push(dailyData);
    }
    return dailyDataList;
  };
  this.initMonthlyData = function(currPage) {
    var monthlyDataList = [];
    for (var i = 0; i < monthlyNames[currPage].length; i++) {
      monthlyDataList.push({
        numerator: "",
        denumerator: "",
        hasil: "",
        analisa: ""
      });
    }
    return monthlyDataList;
  };
  this.getDailyNames = function(currPage) {
    return dailyNames[currPage];
  };
  this.getMonthlyNames = function(currPage) {
    return monthlyNames[currPage];
  };
  this.getMonthlyTarget = function(currPage) {
    return monthlyTarget[currPage];
  };
  this.getDailyMonthlySpecialHasilCalculation = function(currPage) {
    return dailyMonthlySpecialHasilCalculation[currPage];
  };
  this.getMonthlyTargetHasil = function(currPage) {
    return monthlyTargetHasil[currPage];
  };
  this.getMonthlyDisable = function(currPage) {
    return monthlyDisable[currPage];
  };
  this.getMonthlyMapping = function(currPage) {
    return monthlyMapping[currPage];
  };
  this.getMonthNames = function() {
    return monthNames;
  };

  this.getData = function(
    currPage,
    yearSelect,
    monthSelect,
    callbackFunc,
    errorFunc
  ) {
    var result = { dataId: null, dailyData: null, monthlyData: null };
    var instance = this;
    $http
      .get(
        SERVER_URL +
          "/api/pmkp/getByYearAndMonthAndType/year/" +
          yearSelect +
          "/month/" +
          monthSelect +
          "/type/" +
          currPage,
        { headers: { Authorization: localStorage.getItem("token") } }
      )
      .then(
        function(reqRes) {
          if (reqRes.data && reqRes.data != "") {
            result.dataId = reqRes.data.id;
            result.dailyData = JSON.parse(reqRes.data.dailyData);
            if (result.dailyData.length == 0) {
              result.dailyData = instance.initDailyData(currPage);
            }
            result.monthlyData = JSON.parse(reqRes.data.monthlyData);
            if (result.monthlyData.length == 0) {
              result.monthlyData = instance.initMonthlyData(currPage);
            }
          } else {
            result.dataId = null;
            result.dailyData = instance.initDailyData(currPage);
            result.monthlyData = instance.initMonthlyData(currPage);
          }
          callbackFunc(result);
        },
        function() {
          errorFunc();
          $.toast({
            heading: "Error",
            text:
              "Error happen when trying to get data on " +
              monthSelect +
              "-" +
              yearSelect +
              ", please try again or contact support.",
            position: "top-right",
            loaderBg: "#ff6849",
            icon: "error",
            hideAfter: 4000,
            stack: 6
          });
        }
      );
  };

  this.save = function(
    dataId,
    typeSelect,
    yearSelect,
    monthSelect,
    dailyData,
    monthlyData
  ) {
    if (dataId) {
      $http
        .put(
          SERVER_URL + "/api/pmkp/" + dataId,
          {
            type: typeSelect,
            year: yearSelect,
            month: monthSelect,
            dailyData: JSON.stringify(dailyData),
            monthlyData: JSON.stringify(monthlyData)
          },
          { headers: { Authorization: localStorage.getItem("token") } }
        )
        .then(
          function(data) {
            swal("Success!", "Data is successfully updated.", "success");
          },
          function(data) {
            swal("Error!", "Data is failed to be updated.", "error");
          }
        );
    } else {
      $http
        .post(
          SERVER_URL + "/api/pmkp",
          {
            type: typeSelect,
            year: yearSelect,
            month: monthSelect,
            dailyData: JSON.stringify(dailyData),
            monthlyData: JSON.stringify(monthlyData)
          },
          { headers: { Authorization: localStorage.getItem("token") } }
        )
        .then(
          function(data) {
            swal("Success!", "Data is successfully saved.", "success");
          },
          function(data) {
            swal("Error!", "Data is failed to be saved.", "error");
          }
        );
    }
  };

  this.downloadExcel = function(currPage, reportMapping) {
    var today = new Date();
    var req = new XMLHttpRequest();
    req.open("GET", SERVER_URL + "/public-files/" + currPage + ".xlsx", true);
    req.responseType = "arraybuffer";
    req.onreadystatechange = function() {
      if (req.readyState === 4 && req.status === 200) {
        XlsxPopulate.fromDataAsync(req.response).then(function(workbook) {
          // process workbook
          for (var i = 0; i < reportMapping.length; i += 1) {
            workbook.find(reportMapping[i].regex, reportMapping[i].replacer);
          }
          // download workbook
          workbook.outputAsync("base64").then(function(base64) {
            location.href =
              "data:" + XlsxPopulate.MIME_TYPE + ";base64," + base64;
          });
        });
      }
    };

    req.send();
  };

  this.postDownload = function(url, data, filename) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      var a;
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        a = document.createElement("a");
        a.href = window.URL.createObjectURL(xhttp.response);
        a.download = filename;
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
      }
    };
    xhttp.open("POST", url);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.responseType = "blob";
    xhttp.send(JSON.stringify(data));
  };
});

sikatApp.service("utils", function() {
  this.sumArray = function(numArray, limit) {
    var total = 0;
    for (var i = 0; i < numArray.length; i++) {
      if (limit !== null && i >= limit) break;
      var num = numArray[i];
      total += parseInt(num) || 0;
    }
    return total;
  };
});

