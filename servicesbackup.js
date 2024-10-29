sikatApp.service("pmkpService", function($http) {
  var dailyNames = {
    igd: [
      "Jumlah pasien yang mendapat pertolongan life saving",
      "Jumlah pasien yang membutuhkan penanganan life saving ",
      "Jumlah waktu yang diperlukan sejak kedatangan pasien sampai mendapat pelayanan dokter",
      "Jumlah pasien yang disampling (min n=50)",
      "Jumlah pasien yang meninggal <24 jam sejak pasien datang",
      "Jumlah seluruh pasien dihari tersebut",
      "Jumlah pasien jatuh di IGD >6jam",
      "Jumlah seluruh pasien dihari tersebut",
      "Jumlah pasien yang pulang paksa",
      "Jumlah seluruh pasien di hari tersebut (kec pasien false emergency)",
      "Jumlah pemberi pelayanan yang melakukan identifikasi pasien secara benar dalam periode observasi",
      "Jumlah pemberi pelayanan yang diobservasi dalam periode observasi"
    ],
    rawatJalan: [
      "Jumlah pelayanan rawat jalan spesialistik yang buka sesuai ketentuan",
      "Jumlah pelayanan rawat jalan spesialistik di hari tersebut",
      "Jumlah pasien rawat jalan dengan waktu tunggu ≤ 60 menit",
      "Jumlah pasien rawat jalan yang diobservasi",
      "Jumlah pemberi pelayanan yang melakukan identifikasi pasien secara benar dalam periode observasi",
      "Jumlah pemberi pelayanan yang di observasi dalam periode observasi",
      "Jumlah Kumulatif rerata penilaian kepuasan pasien di rawat jalan yang disurvey",
      "Jumlah seluruh pasien rawat jalan yang di survey"
     
    ],
    rawatInap: [
    "Jumlah pasien yang di-visite dokter pada pukul 06.00-14.00",
    "jumlah pasien yang diobservasi",
    "Angka kejadian infeksi nosokomial yang terjadi di rawat inap",
    "Jumlah pasien yang dirawat di rawat inap",
    "Jumlah kejadian kematian pasien rawat inap > 48 jam", 
    "Jumlah seluruh pasien rawat inap dalam 1 bulan",
    "Jumlah pasien pulang paksa",
    "Jumlah seluruh pasien rawat inap dalam 1 bulan",
    "Jumlah kejadian reaksi transfusi",
    "Jumlah seluruh pasien rawat inap yang mendapat transfusi dalam 1 bulan",
    "Jumlah pasien baru yang masuk rawat inap dengan assessmen medis dan keperawatan lengkap <24 jam ",
    "Jumlah seluruh pasien baru yang masuk rawat inap ",
    "Jumlah pemberi pelayanan yang melakukan identifikasi pasien secara benar dalam periode observasi",
    "Jumlah pemberi pelayanan yang di observasi dalam periode observasi",
    "Jumlah intruksi DPJP yang telah dilakukan",
    "Jumlah instruksi DPJP yang diberikan"
      ],
    kamarOperasi: [
      "Waktu tunggu operasi elektif", // 1
      "Jumlah pasien yang dioperasi dihari tersebut",
      "Kejadian kematian di meja operasi", // 2
      "Jumlah pasien yang dioperasi dihari tersebut",
      "Kejadian kematian di meja operasi", // 3
      "Jumlah pasien yang dioperasi dihari tersebut",
      "Tidak adany kejadian operasi salah orang", // 4
      "Jumlah pasien yang dioperasi dihari tersebut",
      "Tidak adanya kejadian operasi salah tindakan pada operasi", // 5
      "Jumlah pasien yang dioperasi dihari tersebut",
      "Tidak adanya kejadian tertinggal benda asing pada tubuh pasien setelah operasi", // 6
      "Jumlah pasien yang dioperasi dihari tersebut",
      "Komplikasi anastesi karena over dosis, reaksi anastesi dan salah penempatan endotracheal tube", // 7
      "Jumlah pasien yang dioperasi dihari tersebut",
      "Jumlah pasien yang jadwal operasi nya tertunda >1 jam", // 8
      "Jumlah pasien operasi elektif dihari tersebut",
      "Jumlah kejadian diskrepansi diagnosis pre dam post operasi", // 10
      "Jumlah pasien yang dioperasi dihari tersebut",
      "Jumlah Konversi tindakan anastesidari lokal, Regional menjadi general", // 11
      "Jumlah pasien yang dioperasi dihari tersebut",
      "Jumlah pemberi pelayanan yang melakukan identifikasi pasien secara benar dalam periode observasi", // 12
      "Jumlah pemberi pelayanan yang diobservasi dalam periode observasi"
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
      "Jumlah pasien baru dihari tersebut",
      "Angka keberhasilan penggunaan CPAP pada pasien Perina",
      "Jumlah seluruh pasien yang menggunakan CPAP"
    ],
    hcu: [
    "Jumlah pasien yang kembali ke perawatan intensif dengan kasus yang sama <72 jam",
    "Jumlah pasien yang dirawat di perawatan internsif dalam 1 bulan",
    "Jumlah kasus VAP",
    "Jumlah lama hari pemasangan ETT atau terpasang ventilator",
    "Jumlah pasien yangg menerima dosis obat high alert yang tepat",
    "Jumlah seluruh pasien yang menerima obat high",
    "Jumlah visite dokter spesialis antara jam 08.00 sampai dengan 14.00 yang disurvey",
    "Jumlah pelaksanaan visite dokter spesialis yang disurvey",
    "Jumlah kejadian kematian pasien ruang Intensif < 48 jam dalam satu bulan",
    "Jumlah seluruh pasien ruang Intensif dalam satu bulan",
    "Jumlah pemberi pelayanan yang melakukan identifikasi pasien secara benar dalam periode observasi",
    "Jumlah pemberi pelayanan yang di observasi dalam periode observasi"
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
      "Jumlah pasien BBL yang dilakukan IMD sesuai ketentuan",//10
      "Jumlah pasien BBL di hari tersebut",//10
      "Jumlah pasien kamar bersalin yang dilakukan identifikasi dengan tepat",//11
      "Jumlah seluruh  Pasien kamar bersalin ",//11
      "Jumlah pasien yang mendapatkan tindakan sectio cesaria <30 menit",//12
      "Jumlah pasien yang diputuskan tindakan sectio cesaria emergency",//12
      "Jumlah Instruksi DPJP yang dilaksanakan secara tepat waktu (Pelaksanaannya maksimal dalam 1 Shift)", //13
      "Jumlah Seluruh Instruksi DPJP  dalam 1 Shift" //13
    ],
    radiologi: [
      "Jumlah kumulatif waktu tunggu thorax foto",
      "Jumlah seluruh pemeriksaan thorax foto di hari tersebut",
      "Jumlah hasil yang dikirim dalam bentuk soft file dihari tersebut",
      "jumlah pemeriksaan foto rontgen dihari tersebut",
      "Jumlah Kesalahan Penyerahan Hasil Radiologi ",
      "Jumlah Pemeriksaan Radiologi",
      "Jumlah kumulatif waktu tunggu foto rontgen cito",
      "Jumlah seluruh pemeriksaan foto rontgen cito  dihari tersebut",
      "Jumlah pemberi pelayanan yang melakukan identifikasi pasien secara benar dalam periode observasi",
      "Jumlah pemberi pelayanan yang di observasi dalam periode observasi"
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
      "Semua hasil laboratorium kritis pasien covid-19 yang dilaporkan <30 menit",
      "Jumlah semua hasil laboratorium kritis pasien geriatri di hari tersebut",
     
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
      "Jumlah pemberi pelayanan yang melakukan identifikasi pasien secara benar dalam periode observasi",
      "Jumlah pemberi pelayanan yang diobservasi dalam periode observasi",
      "Berkas usulan Obat baru yang lengkap",
      "Jumlah obat baru yang diusulkan dengan berkas lengkap",
      "Jumlah seluruh pasien ranap yang diedukasi",
      "Jumlah seluruh pasien ranap",
      "Jumlah pasien rajal sesuai kriteria yang diedukasi",
      "Jumlah seluruh pasien rajal sesuai kriteria"
    ],
    gizi: [
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
      "Jumlah rekam medis unit IGD yang diisi lengkap 24 jam setelah selesai pelayanan",
      "Jumlah rekam medis unit IGD di hari tersebut",
      "Jumlah pasien yang mendapat informasi jelas dan Informed consent yang diisi lengkap",
      "Jumlah pasien yang mendapat tindakan medis di hari tersebut",
      "Jumlah kumulatif waktu penyediaan rekam medis rawat jalan",
      "Total rekam medis rawat jalan di hari tersebut",
      "Jumlah kumulatif waktu penyediaan rekam medis  rawat inap",
      "Total rekam medis rawat inap di hari tersebut",
      "Jumlah rekam medis yang hilang di hari tersebut",
      "Jumlah pasien di hari tersebut",
      "Jumlah Ketepatan penginputan pengisian E-MR",
      "Total Penginputan pengisian E-MR"
    ],
    kesling: [
      "Jumlah limbah padat yang dikelola sesuai dengan Standar Prosedur Operasional",
      "Jumlah proses pengolahan limbah padat yang diamati di hari tersebut",
      "Hasil pengukuran pencahayaan dan kelembaban disesuaikan dengan baku mutu",
      "Jumlah seluruh pengukuran pencahayaan dan kelembaban ruang di rumah sakit",
      "Jumlah Pengambilan Limbah B3 infeksius dan Limbah B3 Non infeksius yang tepat waktu dalam 1 bulan",
      "Jumlah jadwal pengambilan Limbah B3 infeksius dan Limbah B3 non infeksius yang seharusnya dalam 1 bulan",
      "Jumlah Pelanggan yang menyatakan puas terhadap pelayanan kebersihan",
      "Jumlah Pelanggan yang disurvey selama 1 bulan"
    ],
    cssdLinen: [
      "Jumlah alat steril yang didistribusikan",
      "Jumlah seluruh alat yang disterilkan",
      "Jumlah alat reuse yang ditandai dengan tepat",
      "Jumlah seluruh alat reuse yang disterilkan"
    ],
    Linen: [],
    ipsrs: [
      "Jumlah laporan kerusakan alat yang ditanggapi ≤ 15 menit",
      "Jumlah laporan kerusakan alat hari ini tersebut",
      "Jumlah CCTV yang tidak berfungsi dengan baik",
      "Jumlah seluruh CCTV"
    ],
    k3rs: [],
    kasir: [
      "jumlah kumulatif waktu sejak pasien dinyatakan boleh pulang sampai pasien mendapatkan informasi tagihan rawat inap",
      "jumlah pasien rawat inap yang pulang di hari tersebut",
      "jumlah pasien rawat jalan yang tidak membayar tagihan tindakan",
      "jumlah pasien rawat jalan (pembayaran umum) di hari tersebut"
     
    ],
    loketPendaftaran: [
      "Jumlah pasien dengan penginputan data SIMRS lengkap di hari tersebut",
      "Jumlah pasien yang diinput di SIMRS di hari tersebut",
      "Jumlah pemberi pelayanan yang melakukan identifikasi pasien secara benar dalam periode observasi",
      "Jumlah pemberi pelayanan yang diobservasi dalam periode observasi"
    ],
    ambulance: [
      "jumlah pasien yang dilayani < 30 menit",
      "jumlah pasien yang dilayani di hari tersebut"
    ],
    ppi: [
      "Jumlah unit yang menyediakan APD",
      "Jumlah seluruh unit di rumah sakit",
      "Jumlah unit yang patuh melakkukan pencatatan dan pelaporan surveilans HAIs",
      "Jumlah seluruhyang seharusnya melaporkan HAIs",
      "Jumlah pasien yang terinfeksi plebitis",
      "Jumlah hari pemasangan infuse perifer",
      "Jumlah pasien yang terinfeksi saluran nafas",
      "Jumlah hari tirah baring",
      "Jumlah pasien yang terinfeksi kateter urine",
      "Jumlah hari terpasang kateter urine",
      "Jumlah pasien yang terinfeksi IDO",
      "Jumlah pasien yang dioperasi",
      "Jumlah petugas yang patuh menggunakan APD sesuai indikasi",
      "Jumlah seluruh petugas yang terindikasi menggunakan APD ",
      "Jumlah kegiatan cuci tangan yang  dilakukan dengan tepat dan benar",
      "Jumlah peluang kebersihan tangan",
      "Jumlah pasien yang mengalami infeksi VAP",
      "Jumlah hari terpasang Ventilator"
    ],
    timKprs: [
    "Jumlah pemberi pelayanan yang melakukan identifikasi pasien secara benar dalam periode observasi",
    "Jumlah pemberi pelayanan yang di observasi dalam periode observasi.",
    "Jumlah hasil laboratorium kritis pasien yang dilaporkan < 30 menit",
    "Jumlah hasil laboratorium kritis pasien dihari tersebut",
    "Jumlah obat yang diberikan tepat sesuai ketentuan",
    "Jumlah seluruh pemberian obat high alert yang dipantau",
    "Seluruh lembar surgery safety checlist yang ditulis lengkap",
    "Seluruh pasien yang mendapat pembedahan di hari tersebut",
    "Jumlah tindakan kebersihan tangan tenaga medis yang dilakukan dengan benar ",
    "Jumlah total peluang kebersihan tangan tenaga medis yang seharusnya dilakukan dalam periode observasi",
    "Jumlah pasien rawat inap beresiko tinggi jatuh yang mendapatkan ketiga upaya pencegahan risiko jatuh",
    "Jumlah pasien rawat inap berisiko tinggi jatuh yang di observasi",
    "Jumlah pasien jatuh dalam 1 bulan",
    "Jumlah pasien rawat inap"

    ],
    komiteMedis: [],
    komiteKeperawatan: [],
    komiteNakesLain: [],
    komiteEtik: [],
    timPkrs: [
      "Jumlah pasien yang dilakukan penilaian kepuasan terhadap pelaksanaan komunikasi dan edukasi di Rumah Sakit",
      "Jumlah pasien di hari tersebut"
    ],
    timPpra: [],
    timKomplain: [],
    timPonek: [],
    timTb: [
      "Jumlah pasien TB rujukan yang tertangani",
      "Jumlah seluruh pasien TB rujukan"
    ],
    manajemenKepegawaian: [],
    keuangan: [],
    timKb: [
      "Jumlah pasien bersalin di RSUD Sawah Besar yang mendapatkan pelayanan KB  pasca Salin",
      "Jumlah seluruh pasien yang bersalin di RSUD Sawah Besar",
      "Jumlah seluruh pasien yang sudah diberi konseling KB dan terdokumentasi pada Rekam Medis pasien",
      "Jumlah seluruh pasien yang berkunjung ke RSUD Sawah Besar  dengan kriteria Ibu hamil TM 3 dan Ibu nifas( yang belum menjadi Aseptor KB)"
    ],
    pengurusBarang: [
      "Jumlah barang aset yang baru diterima dan telah diberi label nomor inventaris",
      "Jumlah barang aset yang baru diterima"
    ],
    stunting: [
      "Jumlah pasien stunting wasting yang mendapat konseling gizi",
      "Jumlah seluruh pasien stunting wasting yang ada di rawat jalan"
    ],
    casemix: [
      "Jumlah berkas klaim rawat inap pasien BPJS Kesehatan dari setiap unit yang lengkap",
      "Jumlah berkas klaim rawat inap pasien BPJS Kesehatan dari setiap unit",
      "Jumlah berkas klaim rawat jalan pasien BPJS Kesehatan dari setiap unit yang lengkap",
      "Jumlah berkas klaim rawat jalan pasien BPJS Kesehatan dari setiap unit",
    ],
    timHiv: [
      "Jumlah pasien beresiko HIV/AIDS yang dilakukan skrining HIV/AIDS",
      "Jumlah seluruh pasien beresiko HIV/AIDS di wilayah RS",
      "Jumlah promkes yang dilakukan dan terdokumentasi selama 3 bulan",
      "Jumlah promkes yang ditargetkan selama 3 bulan"
    ],
    IT: [
      "Jumlah laporan kerusakan Perangkat IT yang ditanggapi ≤ 15 menit",
      "Jumlah laporan kerusakan Perangkat IT hari ini tersebut"
    ]
  };
  var monthlyNames = {
    igd: [
      "Kemampuan menangani life saving anak dan dewasa",
      "Pemberi pelayanan kegawat daruratan yang bersertifikat BLS/PPGD/GELS/ALS",
      "Waktu tanggap Pelayanan Dokter di Gawat Darurat",
      "Kepuasan pelanggan di Gawat Darurat",
      "Kematian Pasien ≤ 24 jam di Gawat Darurat",
      "Lama observasi pasien di IGD",
      "Kejadian pulang paksa di IGD",
      "Tidak ada Penumpukan pasien di IGD",
      "Kepatuhan identifikasi pasien"
    ],
    rawatJalan: [
      "Buka pelayanan sesuai ketentuan",
      "Waktu tunggu di Rawat Jalan",
      "Kepatuhan identifikasi pasien  di rawat jalan",
      "Kepuasan Pelanggan di Rawat Jalan"
     
    ],
    rawatInap: [
      "Kepatuhan Waktu Visite Dokter",
      "Angka kejadian infeksi nosokomial",
      "Kematian pasien > 48 Jam",
      "Kejadian pulang paksa",
      "Kepuasaan pelanggan Rawat Inap",
      "Kejadian reaksi transfusi",
      "Kelengkapan pengisian asessment awal < 24 jam sesudah masuk Rumah Sakit",
      "Ketepatan identifikasi pasien",
      "Kepatuhan intruksi DPJP"
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
      "Tersedianya pelayanan anastesi sedasi moderate 24 jam",
      "Kejadian diskrepansi diagnosis pre dan post operasi",
      "Konversi tindakan anastesi dari lokal menjadi general",
      "Ketepatan identifikasi pasien"
    ],
    perinatologi: [
      "Angka kejadian infeksi nosokomial",
      "Kejadian pulang paksa",
      "Angka Bayi yang mendapatkan ASI eksklusif sepanjang perawatan diruang Perinatologi",
      "Angka keberhasilan perawatan bayi dengan BBLR  (1500 gram-2500 gram)",
      "Angka kematian > 48 jam",
      "Kelengkapan asessment awal medis dan keperawatan pasien  di perinatologi < 24 Jam",
      "Angka keberhasilan pengguanaan CPAP pada pasien Perina"
    ],
    hcu: [
      "Rata-rata pasien yang kembali ke perawatan intensif dengan kasus yang sama <72 jam",
      "Kejadian VAP",
      "Ketepatan pemberian dosis obat High Alert pada pasien",
      "Kepatuhan Visit Dokter Spesialis",
      "Kematian pasien < 48 jam sejak masuk RS",
      "Kepatuhan identifikasi pasien"

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
      "Pelaksanaan IMD", //10
      "Ketepatan identifikasi di kamar bersalin", //11
      "Rerata waktu tanggap emergency sectio cesaria", //12
      "Ketepatan Pelaksanaan Instruksi DPJP"
    ],
    radiologi: [
      "Waktu tunggu hasil pelayanan thorax foto",
      "Digitalisasi hasil radiologi pasien",
      "Kesalahan penyerahan hasil radiologi",
      "Kepuasan pelanggan",
      "Ketepatan waktu pembacaan foto cito",
      "Ketepatan identifikasi pasien"
    ],
    laboratorium: [
      "Waktu tunggu hasil pelayanan laboratorium",
      "Tidak adanya kesalahan penyerahan hasil pemeriksaan laboratorium",
      "Tidak adanya kejadian tertukar spesimen",
      "Waktu tunggu hasil pelayanan laboratorium cito",
      "Kepuasan Pelanggan",
      "Pelaporan hasil kritis laboratorium",
      "Kesesuaian baku mutu eksternal",
      "Ketepatan identifikasi pasien di laboratorium",
      "Kecepatan pelaporan hasil laboratorium kritis pasien geriatri <30 menit",
      "ketersediaan pemeriksaan gula darah, TTGO dan HbA1c",
     ],
    farmasi: [
      "Waktu tunggu pelayanan obat jadi",
      "Waktu tunggu pelayanan obat racikan",
      "Tidak adanya kejadian kesalahan pemberian obat",
      "Penulisan resep sesuai formularium nasional",
      "Kepuasan pelanggan",
      "kepatuhan identifikasi pasien",
      "Pemberian label obat high alert",
      "Kejadian obat kadaluarsa",
      "Kelengkapan berkas usulan obat baru",
      "Persentase Kesesuaian stock dengan data SIMRS",
      "Terselenggaranya farmasi klinis rawat inap",
      "Terselenggaranya farmasi klinis rawat jalan"
    ],
    gizi: [
      "Capaian EDukasi kelompok (Penyuluhan Gizi) minimal 1x/TW",
      "Sisa makanan yang tidak termakan oleh pasien",
      "Tidak adanya kesalahan dalam pemberian diet",
      "Kepuasan pelanggan Makanan Rumah Sakit"
     
    ],
    rekamMedis: [
      "Kelengkapan pengisian rekam medik 24 jam setelah selesai pelayanan unit rawat inap",
      "Kelengkapan pengisian rekam medik 24 jam setelah selesai pelayanan unit rawat jalan",
      "Kelengkapan pengisian rekam medik 24 jam setelah selesai pelayanan unit IGD",
      "Kelengkapan informed concent setelah mendapatkan informasi yang jelas",
      "Waktu penyediaan dokumen rekam medik pelayanan rawat jalan",
      "Waktu penyediaan dokumen rekam medik pelayanan rawat inap",
      "Berkas rekam medis yang hilang",
      "Kelengkapan hybridisasi SIMRS"
    ],
    kesling: [
      "Baku mutu limbah cair BOD",
      "Baku mutu limbah cair COD",
      "Baku mutu limbah cair TSS",
      "Baku mutu limbah cair PH",
      "Baku mutu limbah cair Ammonia",
      "Baku mutu limbah cair Coliform",
      "Baku mutu limbah cair Minyak",
      "Pengolahan limbah  padat berbahaya sesuai dengan aturan",
      "kelembaban dan pencahayaan ruangan sesuai dengan aturan",
      "Kelengkapan jadwal pengangkutan Limbah B3",
      "Tidak adanya Komplain terkait kebersihan rumah sakit dari pelanggan"
    ],
    cssdLinen: [
      "Ketepatan pendistribusian alat steril",
      "Kepuasan Pelanggan Unit CSSD",
      "Penandaan Frekuensi Alat reUse"
    ],
    Linen: [
      "Tidak adanya kejadian linen yang hilang",
      "Ketepatan pengelolaan linen infeksius",
      "Hasil pemeriksaan angka kuman pada linen yang dicuci memenuhi standar",
      "Ketetapan pemilahan linen infeksius dan linen non infeksius"
    ],
    ipsrs: [
      "Kecepatan waktu menanggapi kerusakan alat ≤ 15 menit",
      "Ketepatan waktu pemeliharaan alat",
      "Pemantauan kerusakan CCTV",
      "Peralatan Laboratorium (dan alat ukur yang lain) yang terkalibrasi tepat waktu sesuai dengan ketentuan kalibrasi.",
      "Ketepatan waktu pemeliharaan alat medis",
      "Terlaksananya sosialisasi perawatan ringan alat yang bisa dilakukan user oleh atem"
    ],
    k3rs: [
      "Pelaksanaan Standar Penanganan Tertusuk Jarum",
      "Pelaksanaan Standar Penanganan Kecelakaan Kerja Terkait Fasilitas",
      "Ketepatan Pengecekan Sarana Proteksi Kebakaran",
      "Ketersediaan TIM penanggulangan Bencana",
    ],
    kasir: [
      "Ketepatan waktu pemberian informasi tagihan pasien rawat inap",
      "Kejadian bad debt pada pelayanan rawat jalan"
    ],
    loketPendaftaran: [
      "Kelengkapan penginputan data di SIMRS",
      "Kepatuhan identifikasi pasien"
    ],
    ambulance: [
      "Kecepatan Pelayanan Ambulance di RS < 30 Menit",
      "Tidak Adanya Kecelakaan Ambulans Yang Menimbulkan Kecacatan atau Kematian",
      "Kepuasan pelanggan"
    ],
    ppi: [
      "Tersedianya anggota Tim PPI yang terlatih",
      "Tersedianya APD (Alat Pelindung Diri)",
      "Terlaksananya pencatatan dan pelaporan surveilans HAIS",
      "Infeksi luka infus/flebistis",
      "Hospital-acquired pneumonia (HAP)",
      "Catheter Associated Urinary Tract Infection (CAUTI) / ISK",
      "Surgical Site Infection (SSI) /IDO",
      "Pelaksanaan kegiatan PPI sesuai program",
      "Penggunaan APD saat bertugas",
      "Adanya IPCN",
      "Ketersediaan program PPI",
      "Kepatuhan kebersihan tangan",
      "Ventilator Associated Pneumonia (VAP)"
    ],
    timKprs: [
      "Kepatuhan identifikasi pasien",
      "Pelaporan hasil kritis laboratorium",
      "Ketepatan pemberian obat high alert sesuai prosedur ",
      "Kelengkapan pengisian surgery safety checklist pasien operasi",
      "Kepatuhan kebersihan tangan",
      "Kepatuhan upaya pencegahan resiko pasien jatuh",
      "Kejadian pasien jatuh",

    ],
    komiteMedis: [
      "Kepatuhan terhadap Alur Klinis (Clinical Pathway)",
      "Angka Kedensial Dokter Baru",
      "Re-kredensial Dokter",
      "Kelengkapan STR dan SIP Dokter",
      "Terselenggaranya Audit Medik",
      "Tersusunnya minimal 5 PPK penyakit terbanyak setiap SMF (PD, Anak, Obgyn, Bedah, Saraf dan Anestesi)"
    ],
    komiteKeperawatan: [
      "Angka dilakukan Kredensial Perawat dan Bidan",
      "Ketetapan Waktu dilakukan Kredensial Perawat",
      "Terlaksananya Audit keperawatan sesuai jadwal"
    ],
    komiteNakesLain: [
      "Kepatuhan tenaga kesehatan dalam pelaksanaan proses kredensial",
      "Kepatuhan pelaksanaan OPPE dam FPPE"
    ],
    komiteEtik: [
      "Dilakukannya sosialisasi mengenai etik"
    ],
    timPkrs: [
      "Keterlaksaan survey/penilaian kepuasan pasien terhadap pemberian informasi dan komunikasi oleh PPA",
      "Keterlaksanaan pendidikan kesehatan internal",
      "Keterlaksanaan pendidikan kesehatan eksternal"
    ],
    timPpra: [
      "Evaluasi kuantitas dan kualitas penggunaan antibiotik pada pasien di rawat inap",
      "Penurunan angka kejadian infeksi di rumah sakit yang disebabkan oleh mikroba multiresisten",
      "Peningkatan mutu penanganan kasus infeksi secara multidisiplin",
      "Penggunaan profilaksis pada pasien SC"
    ],
    timKomplain: [
      "Kepuasan pelanggan",
      "Kecepatan Waktu Tanggap Komplain"
    ],
    timPonek: [
      "Terselenggaranya pembahasan Audit Maternal Perintal rutin per triwulan"
    ],
    timTb: [
      "Jumlah pasien TB rujukan yang tertangani",
      "Jumlah seluruh pasien TB rujukan"
    ],
    manajemenKepegawaian: [
      "Ketepatan Waktu Pengusulan Kenaikan Pangkat", // 1
      "Pelatihan Staf Minimal 20 jam/tahun", // 2
      "Daftar Urut Kepangkatan", // 3
      "Kepatuhan absenteisme pegawai  ≤ 187,5 menit per bulan " //4
    ],
    keuangan: [
      "Kelengkapan Laporan Akuntabilitas Kinerja",
      "Cost Recovery Rate",
      "Ketepatan Waktu Penyusunan Laporan Keuangan",
      "Ketepatan Waktu Pemberian Gaji dan tunjangan pegawai non PNS Sesuai Kesepakatan Waktu"
    ],
    timKb: [
      "Pelayanan KB (Keluarga Berencana) Pasca Salin",
      "Kepatuhan dalam pemeberian Pelayanan Konseling KB (Keluarga Berencana)"
    ],
    pengurusBarang: [
      "Kepatuhan pengumpulan hasil stok opname dari unit",
      "Labelisasi barang aset",
      "Kesesuaian stok di Laporan dengan stok fisik"
    ],
    stunting: [
      "Cakupan pasien stunting wasting di rawat di jalan yang mendapatkan konseling gizi"
    ],
    casemix: [
      "Ketepatan waktu pengajuan berkas klaim JKN per bulan",
      "Kelengkapan berkas klaim rawat inap pasien BPJS Kesehatan dari setiap unit",
      "Kelengkapan berkas klaim rawat jalan pasien BPJS Kesehatan dari setiap unit"
    ],
    timHiv: [
      "Terlaksananya pelayanan kesehatan pasien dengan resiko terinfeksi penyakit HIV/AIDS",
      "Terlaksananya promkes HIV/AIDS di unit rawat jalan atau media sosial"
    ],
    IT: [
      "Terselenggaranya pemeliharaan jaringan berfungsi dengan baik di semua unit",
      "Terselenggaranya E-MR terintegrasi",
      "Waktu tanggap pelaporan kerusakan Perangkat IT",
      "Terlaksananya target bridging dengan pihak eksternal prioritas (Jak Sehat, Satu Sehat, dan JKN Mobile)",
      "Terupdate nya penginputan SIRS Online"
    ]
  };
  var monthlyTarget = {
    igd: [
      "100%",
      "100%",
      "≤ 5 menit",
      "≥ 70 %",
      "≤ 0,2 %",
      "5 %",
      "≤ 5 %",
      "0%",
      "100%"
    ],
    rawatJalan: [
      "100%",
      "≥ 80 %",
      "100%",   
      "≥ 90 %"
     ],
    rawatInap: [
    "≥ 80%",
    "≤ 1,5%",
    "≤ 2,5 %",
    "≤ 5%",
    "≥ 90%",
    "≤ 0,01%",
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
       "100%",
       "100%",
       "100%",
       "100%"
    ],
    perinatologi: [
    "≤ 1,5 %",
    "≤ 5 %",
    "100%", 
    "100%", 
    "≤ 0,25 %",
    "100%",
    "100%"
  ], 
    hcu: [
      "≤ 3 %",
      "≤ 5,8 %",
      "100%",
      "≥ 80 %",
      "≤ 0,24 %",
      "100%",
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
      "100%",
      "100%",
      "80%",
      "100%"
    ],
    radiologi: [
      "≤ 180 menit",
      "≤ 60 %",
      "0%",
      "≥ 80 %",
      "≤ 60 menit",
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
      "100%",
      "100%",
      "1%",
      "100%",
      "100%",
      "75%",
      "75%"
    ],
    gizi: [
    "100%",
    "≤ 20 %", 
    "100%",
    "≥ 80 %"
   
  ],
    rekamMedis: [
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
      "100%",
      "100%",
      "100%",
      "100%"
    ],
    cssdLinen: [
    "100%",
    "≥ 80%",
    "100%"
    ],
    Linen: [
    "100%",
    "100%",
    "100%",
    "100%"
    ],
    ipsrs: [
      "≥ 85 %",
      "100%",
      "< 5 %",
      "100%",
      "100%",
      "100%"
  ],
    k3rs: ["100%", "100%", "100%", "100%"],
    kasir: ["≤ 120 Menit", "0%"],
    loketPendaftaran: ["100%","100%"],
    ambulance: ["100%", "100%", "≥ 80 %"],
    ppi: [
      "75%",
      "75%",
      "75%",
      "≤ 1 ‰",
      "≤ 1 ‰",
      "≤ 4.7 ‰",
      "≤ 2 %",
      "100%",
      "100%",
      "1 ipcn/100-150TT",
      "100%",
      "≥ 85%",
      "< 5,8 %"
    ],
    timKprs: [
      "100%",
      "100%",
      "100%",
      "100%",
      "≥ 85%",
      "100%",
      "0%"
    ],
    komiteMedis: [
      "≥ 80%",
      "100%",
      "100%",
      "100%",
      "100%",
      "100%"
    ],
    komiteKeperawatan: [
      "100%", 
      "80%",
      "100%"
    ],
    komiteNakesLain: ["100%", "100%"],
    komiteEtik: ["100%"],
    timPkrs: ["80%", "75%", "80%"],
    timPpra: ["1 laporan", "0%", "100%", "100%"],
    timKomplain: ["88.5%", "80%"],
    timPonek: ["100%"],
    timTb: ["100%", "100%"],
    manajemenKepegawaian: [
      "100%",
      "≥ 60%",
      "100%",
    "100%"
    ],
  keuangan: ["100%", "≥40%", "100%", "100%"],
  timKb: ["50%", "80%"],
  pengurusBarang: [
    "75%", 
    "90%",
    "90%"
  ],
  stunting: [
    "80%"
  ],
  casemix: [
    "100%",
    "100%",
    "100%"
  ],
  timHiv: [
    "75%",
    "75%"
  ],
  IT: [
    "100%",
    "100%",
    "≥ 85%",
    "100%",
    "100%"
  ]
  };
  var dailyMonthlySpecialHasilCalculation = {
    hcu: [
      null,
      null,
      ["zeroDenumeratorIsHundred"],
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
      null, // 10
      null, // 11
      null, //12
      null //13
    ],
    k3rs: [
      ["zeroDenumeratorIsHundred"],
      ["zeroDenumeratorIsHundred"],
      ["zeroDenumeratorIsHundred"]
    ],
    timPonek: [
      ["zeroDenumeratorIsHundred"]
    ]
  };
  var monthlyTargetHasil = {
    igd: [
      [100, null],
      [100, null],
      [null, 5],
      [70, null],
      [null, 0.2],
      [null, 5],
      [null, 5],
      [null, 0],
      [100, null]
    ],
    rawatJalan: [
      [100, null],
      [80, null],
      [100, null],
      [90, null]     
    ],
    rawatInap: [
      [80, null], // 1
      [null, 1.5], // 2
      [null, 2.5], // 4
      [null, 5], // 5
      [90,null], // 6
      [null, 0.01], // 8
      [100, null], // 9
      [100, null], // 12
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
      [100, null],
      [100, null],
      [100, null],
      [100, null]
    ],
    perinatologi: [
      [null, 1.5],
      [null, 5],
      [100, null],
      [100, null],
      [null, 0.25],
      [100, null],
      [100, null]
    ],
    hcu: [
      [null, 3],
      [null, 5.8],
      [100, null],
      [80, null],
      [null, 0,24],
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
      [100, null],
      [100, null],
      [80, null],
      [100, null]
    ],
    radiologi: [
      [null, 180],
      [null, 60],
      [null, 0],
      [80, null],
      [null, 60],
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
      [100, null],
      [100, null],
      [1, null],
      [100, null],
      [100, null],
      [75, null],
      [75, null]
    ],
    gizi: [
      [100, null],
      [null, 20],
      [100, null],
      [80, null]    
    ],
    rekamMedis: [
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
      [100, null],
      [100, null],
      [100, null],
      [100, null]
    ],
    cssdLinen: [
      [100, null],
      [80, null],
      [100, null]
    ],
   Linen: [
      [100, null],
      [100, null],
      [100, null],
      [100, null]
    ],
    ipsrs: [
      [80, null],
      [100, null],
      [null, 5],
      [100, null],
      [100, null],
      [100, null]
    ],
    k3rs: [
      [100, null],
      [100, null],
      [100, null],
      [100, null]
    ],
    kasir: [
      [null, 120],
      [null,0]
    ],
    loketPendaftaran: [
      [100, null],
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
      [null, 1],
      [null, 1],
      [null, 4.7],
      [null, 2],
      [100, null],
      [100, null],
      [100, null],
      [100, null],
      [85, null],
      [null,5.8]
    ],
    timKprs: [
      [100, null],
      [100, null],
      [100, null],
      [100, null],
      [85, null],
      [100, null],
      [0, null]
    ],
    komiteMedis: [
      [80, null],
      [100, null],
      [100, null],
      [100, null],
      [100, null],
      [100, null]
    ],
    komiteKeperawatan: [
      [100, null],
      [80, null],
      [100, null]
    ],
    komiteNakesLain: [
      [100, null],
      [100, null]
    ],
    komiteEtik: [],
    timPkrs: [
      [80, null],
      [75, null],
      [80, null]
    ],
    timPpra: [
      [null, 1],
      [null, 0],
      [100, null],
      [100, null]
    ],
    timKomplain: [
      [88.5, null],
      [75, null]
    ],
    timPonek: [
      [100, null]
    ],
    timTb: [
      [100, null],
      [100, null]
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
    ],
    timKb: [
      [50, null],
      [80, null]
    ],
    pengurusBarang: [
      [75, null],
      [90, null],
      [90, null]
    ],
    stunting: [
      [80, null]
    ],
    casemix: [
      [100, null],
      [100, null],
      [100, null]
    ],
    timHiv: [
      [75, null],
      [75, null]
    ],
    IT: [
      [100, null],
      [100, null],
      [85, null],
      [100, null],
      [100, null]
    ]
  };
  var monthlyDisable = {
  igd: [
      [1, "numerator", "denumerator", "hasil"],
      [3, "numerator", "denumerator", "hasil"],
      [5, "numerator", "denumerator", "hasil"],
      [6, "numerator", "denumerator", "hasil"],
      [7, "numerator", "denumerator", "hasil"],
      [9, "numerator", "denumerator", "hasil"]
    ],
    rawatJalan: [
      [1, "numerator", "denumerator", "hasil"],
      [2, "numerator", "denumerator", "hasil"],
      [3, "numerator", "denumerator", "hasil"],
      [4, "numerator", "denumerator", "hasil"]
     
    ],
    rawatInap: [
      [1, "numerator", "denumerator", "hasil"],
      [2, "numerator", "denumerator", "hasil"],
      [3, "numerator", "denumerator", "hasil"],
      [4, "numerator", "denumerator", "hasil"],
      [6, "numerator", "denumerator", "hasil"],
      [7, "numerator", "denumerator", "hasil"],
      [8, "numerator", "denumerator", "hasil"],
      [9, "numerator", "denumerator", "hasil"]
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
      [10, "numerator", "denumerator", "hasil"],
      [11, "numerator", "denumerator", "hasil"],
      [12, "numerator", "denumerator", "hasil"]
    ],
    perinatologi: [
      [1, "numerator", "denumerator", "hasil"],
      [2, "numerator", "denumerator", "hasil"],
      [3, "numerator", "denumerator", "hasil"],
      [4, "numerator", "denumerator", "hasil"],
      [5, "numerator", "denumerator", "hasil"],
      [6, "numerator", "denumerator", "hasil"],
      [7, "numerator", "denumerator", "hasil"]
    ],
    hcu: [
      [1, "numerator", "denumerator", "hasil"],
      [2, "numerator", "denumerator", "hasil"],
      [3, "numerator", "denumerator", "hasil"],
      [4, "numerator", "denumerator", "hasil"],
      [5, "numerator", "denumerator", "hasil"],
      [6, "numerator", "denumerator", "hasil"]
      ],
    kamarBersalin: [
      [1, "numerator", "denumerator", "hasil"],
      [2, "numerator", "denumerator", "hasil"],
      [3, "numerator", "denumerator", "hasil"],
      [6, "numerator", "denumerator", "hasil"],
      [7, "numerator", "denumerator", "hasil"],
      [9, "numerator", "denumerator", "hasil"],
      [10, "numerator", "denumerator", "hasil"],
      [11, "numerator", "denumerator", "hasil"],
      [12, "numerator", "denumerator", "hasil"]
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
      [6, "numerator", "denumerator", "hasil"],
      [9, "numerator", "denumerator", "hasil"],
      [11, "numerator", "denumerator", "hasil"],
      [12, "numerator", "denumerator", "hasil"]
 
    ],
    gizi: [
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
      [8, "numerator", "denumerator", "hasil"]
    ],
    kesling: [
      [8, "numerator", "denumerator", "hasil"],
      [9, "numerator", "denumerator", "hasil"],
      [10, "numerator", "denumerator", "hasil"],
      [11, "numerator", "denumerator", "hasil"]
    ],
    cssdLinen: [
      [1, "numerator", "denumerator", "hasil"],
      [2, "numerator", "denumerator", "hasil"]
    ],
    Linen: [],
    ipsrs: [
      [1, "numerator", "denumerator", "hasil"],
      [3, "numerator", "denumerator", "hasil"]
    ],
    k3rs: [],
  kasir: [
      [1, "numerator", "denumerator", "hasil"],
      [2, "numerator", "denumerator", "hasil"]
  ],
    loketPendaftaran: [
      [1, "numerator", "denumerator", "hasil"],
      [2, "numerator", "denumerator", "hasil"]
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
      [12, "numerator", "denumerator", "hasil"],
      [13, "numerator", "denumerator", "hasil"]
    ],
    timKprs: [
      [1, "numerator", "denumerator", "hasil"],
      [2, "numerator", "denumerator", "hasil"],
      [3, "numerator", "denumerator", "hasil"],
      [4, "numerator", "denumerator", "hasil"],
      [5, "numerator", "denumerator", "hasil"],
      [6, "numerator", "denumerator", "hasil"],
      [7, "numerator", "denumerator", "hasil"]    
    ],
    komiteMedis: [],
    komiteKeperawatan: [],
    komiteNakesLain: [],
    komiteEtik: [],
    timPkrs: [
      [1, "numerator", "denumerator", "hasil"]
    ],
    timPpra: [],
    timKomplain: [],
    timPonek: [],
    timTb: [
      [1, "numerator", "denumerator", "hasil"]
    ],
    manajemenKepegawaian: [],
    keuangan: [],
    timKb: [
      [1, "numerator", "denumerator", "hasil"],
      [2, "numerator", "denumerator", "hasil"]
    ],
    pengurusBarang: [
      [2, "numerator", "denumerator", "hasil"]
    ],
    stunting: [
      [1, "numerator", "denumerator", "hasil"]
    ],
    casemix: [
      [2, "numerator", "denumerator", "hasil"],
      [3, "numerator", "denumerator", "hasil"]
    ],
    timHiv: [
      [1, "numerator", "denumerator", "hasil"],
      [2, "numerator", "denumerator", "hasil"]
    ],
    IT: [
      [3, "numerator", "denumerator", "hasil"]
    ]
  };
  var monthlyMapping = {
    igd: [
      [1, 1, 2],
      [3, 3, 4],
      [5, 5, 6],
      [6, 7, 8],
      [7, 9, 10],
      [9, 11, 12]
    ],
    rawatJalan: [
      [1, 1, 2],
      [2, 3, 4],
      [3, 5, 6],
      [4, 7, 8]
     
    ],
    rawatInap: [
      [1, 1, 2],
      [2, 3, 4],
      [3, 5, 6],
      [4, 7, 8],
      [6, 9, 10],
      [7, 11, 12],
      [8, 13, 14],
      [9, 15, 16]
   
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
      [10, 17, 18],
      [11, 19, 20],
      [12, 21, 22]
      
    ],
    perinatologi: [
      [1, 1, 2],
      [2, 3, 4],
      [3, 5, 6],
      [4, 7, 8],
      [5, 9, 10],
      [6, 11, 12],
      [7, 13, 14]
    ],
    hcu: [
      [1, 1, 2],
      [2, 3, 4],
      [3, 5, 6],
      [4, 7, 8],
      [5, 9, 10],
      [6, 11, 12]
      ],
    kamarBersalin: [
      [1, 1, 2],
      [2, 3, 4],
      [3, 5, 6],
      [6, 7, 8],
      [7, 9, 10],
      [9, 11, 12],
      [10, 13, 14],
      [11, 15, 16],
      [12, 17, 18]
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
      [6, 9, 10],
      [9, 11, 12],
      [11, 13, 14],
      [12, 15, 16]
     
    ],
    gizi: [
      [2, 1, 2],
      [3, 3, 4]
    ],
    rekamMedis: [
      [1, 1, 2],
      [2, 3, 4],
      [3, 5, 6],
      [4, 7, 8],
      [5, 9, 10],
      [6, 11, 12],
      [7, 13, 14],
      [8, 15, 16]
    ],
    kesling: [
      [8, 1, 2],
      [9, 3, 4],
      [10, 5, 6],
      [11, 7, 8]
    ],
    cssdLinen: [
      [1, 1, 2],
      [2, 3, 4]
    ],
    Linen: [],
    ipsrs: [
      [1, 1, 2],
      [3, 3, 4]
    ],
    k3rs: [],
    kasir: [
      [1, 1, 2],
      [2, 3, 4]
    
    ],
    loketPendaftaran: [
      [1, 1, 2],
      [2, 3, 4]
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
      [12, 15, 16],
      [13, 17, 18]
    ],
    timKprs: [
      [1, 1, 2],
      [2, 3, 4],
      [3, 5, 6],
      [4, 7, 8],
      [5, 9, 10],
      [6, 11, 12],
      [7, 13, 14]    
    ],
    komiteMedis: [],
    komiteKeperawatan: [],
    komiteNakesLain: [],
    komiteEtik: [],
    timPkrs: [
      [1, 1, 2]
    ],
    timPpra: [],
    timKomplain: [],
    timPonek: [
      [1, 1, 2]
    ],
    timTb: [
      [1, 1, 2]
    ],
    manajemenKepegawaian: [],
    keuangan: [],
    timKb: [
      [1, 1, 2],
      [2, 3, 4]
    ],
    pengurusBarang: [
      [2, 1, 2]
    ],
    stunting: [
      [1, 1, 2]
    ],
    casemix: [
      [2, 1, 2],
      [3, 3, 4]
    ],
    timHiv: [
      [1, 1, 2],
      [2, 3, 4]
    ],
    IT: [
      [3, 1, 2]
    ]
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

