sikatApp.service("pmkpService", function($http) {
  var dailyNames = {
    igd: [
      "Jumlah pasien yang mendapat pertolongan life saving", 
      "Jumlah  pasien yang membutuhkan penanganan life saving", 
      "Jumlah Pemberi pelayanan kegawatdaruratan yang bersertifikat BLS/GELS/ALS/BTCLS",
      "Jumlah Pemberi pelayanan kegawatdaruratan di UGD",
      "Jumlah waktu yang diperlukan sejak kedatangan pasien sampai mendapat pelayanan dokter",
      "Jumlah pasien yang disampling (min n=50)",
      "Jumlah pasien yang meninggal <24 jam sejak pasien datang",
      "Jumlah seluruh pasien di hari tersebut",
      "Jumlah pasien observasi di UGD > 6 jam",
      "Jumlah seluruh pasien di hari tersebut",
      "Jumlah pasien jatuh di IGD",
      "Jumlah seluruh pasien di hari tersebut",
      "Jumlah pasien yang pulang paksa",
      "Jumlah seluruh pasien di hari tersebut (kec pasien false emergency)",
      "Jumlah waktu yang diperlukan sejak kedatangan pasien (kegawatan pada geriatri) sampai mendapat pelayanan dokter",
      "Jumlah pasien geriatri di hari tersebut",
      "Jumlah hari ada penumpukan pasien di IGD",
      "Jumlah hari dalam periode observasi",
      "Jumlah pemberi pelayanan yang melakukan identifikasi pasien secara benar dalam periode observasi",
      "Jumlah pemberi pelayanan yang diobservasi dalam periode obervasi",
      "Jumlah pasien yang puas terhadap pelayanan pelayanan Gawat Darurat",
      "Jumlah seluruh pasien di hari tersebut"
    ],
    rawatJalan: [
      "Jumlah pelayanan rawat jalan spesialistik yang buka sesuai jadwal yang sudah di tentukan",
      "Jumlah pelayanan rawat jalan spesialistik di hari tersebut",
      "Jumlah pasien rawat jalan dengan waktu tunggu ≤ 60 menit",
      "Jumlah pasien rawat jalan yang diobservasi",
      "Jumlah pemberi pelayanan yang melakukan identifikasi pasien secara benar dalam periode observasi",
      "Jumlah pemberi pelayanan yang di observasi dalam periode observasi"
    ],
    rawatInap: [
      "Jumlah pasien yang divisite dokter pada pukul 06.00-14.00",
      "Jumlah seluruh pasien rawat inap",
      "Jumlah pasien rawat inap yang terkena infeksi nosokomial dalam satu bulan",
      "Jumlah pasien rawat inap dalam satu bulan",
      "Jumlah kejadian kematian pasien rawat inap > 48 jam dalam satu bulan",
      "Jumlah seluruh pasien yang dirawat dalam satu bulan",
      "Jumlah pasien pulang paksa dalam satu bulan",
      "Jumlah seluruh pasien yang dirawat dalam satu bulan",
      "Jumlah kejadian reaksi tranfusi dalam 1 bulan",
      "Jumlah seluruh pasien yang mendapat tranfusi dalam 1 bulan",
      "Jumlah pasien rawat inap dengan assessment awal medis dan keperawatan lengkap di EMR dalam waktu 24 jam",
      "Jumlah seluruh pasien yang dirawat dalam satu bulan",
      "Jumlah instruksi DPJP yang telah dilakukan oleh petugas medis dan paramedis (Pelaksanaannya maksimal 1 Shift)",
      "Jumlah seluruh instruksi DPJP yang harus dilakukan sesuai dengan waktunya",
      "Jumlah pasien rawat inap yang dilakukan identifikasi dengan tepat",
      "Jumlah seluruh Pasien Rawat Inap"
      ],
      rawatInapAnak: [
        "Jumlah pasien yang divisite dokter pada pukul 06.00-14.00",
        "Jumlah seluruh pasien rawat inap",
        "Jumlah pasien rawat inap yang terkena infeksi nosokomial dalam satu bulan",
        "Jumlah pasien rawat inap dalam satu bulan",
        "Jumlah kejadian kematian pasien rawat inap > 48 jam dalam satu bulan",
        "Jumlah seluruh pasien yang dirawat dalam satu bulan",
        "Jumlah pasien pulang paksa dalam satu bulan",
        "Jumlah seluruh pasien yang dirawat dalam satu bulan",
        "Jumlah kejadian reaksi tranfusi dalam 1 bulan",
        "Jumlah seluruh pasien yang mendapat tranfusi dalam 1 bulan",
        "Jumlah pasien rawat inap dengan assessment awal medis dan keperawatan lengkap di EMR dalam waktu 24 jam",
        "Jumlah seluruh pasien yang dirawat dalam satu bulan",
        "Jumlah instruksi DPJP yang telah dilakukan oleh petugas medis dan paramedis (Pelaksanaannya maksimal 1 Shift)",
        "Jumlah seluruh instruksi DPJP yang harus dilakukan sesuai dengan waktunya",
        "Jumlah pasien rawat inap yang dilakukan identifikasi dengan tepat",
        "Jumlah seluruh Pasien Rawat Inap"
        ],
    kamarOperasi: [
      "Waktu tunggu operasi",
      "Jumlah Pasien yang dioperasi di hari tersebut",
      "Kejadian Kematian di meja Operasi",
      "Jumlah Pasien yang dioperasi di hari tersebut",
      "Tidak adanya kejadian operasi salah Sisi",
      "Jumlah Pasien yang dioperasi di hari tersebut",
      "Tidak adanya kejadian Operasi salah Orang",
      "Jumlah Pasien yang dioperasi di hari tersebut",
      "Tidak adanya kejadian salah tindakan pada operasi",
      "Jumlah Pasien yang dioperasi di hari tersebut",
      "Tidak adanya kejadian tertinggalnya benda asing/lain pada tubuh pasien setelah operasi",
      "Jumlah Pasien yang dioperasi di hari tersebut",
      "Komplikasi anestesi karena overdosis, reaksi anestesi, dan salah penempatan anestesi endotracheal tube",
      "Jumlah Pasien yang dioperasi di hari tersebut",
      "Penundaan Operasi Elektif", 
      "Jumlah Pasien yang dioperasi di hari tersebut",
      "Tersedianya pelayanan anastesi sedasi moderate 24 jam",
      "Jumlah Pasien yang dioperasi di hari tersebut",
      "Kejadian diskrepansi diagnosis pre dan post operasi", 
      "Jumlah Pasien yang dioperasi di hari tersebut",
      "Konversi tindakan anastesi dari lokal , Regional menjadi general",
      "Jumlah Pasien yang dioperasi di hari tersebut",
      "Jumlah pemberi pelayanan yang melakukan identifikasi pasien secara benar dalam periode observasi",
      "Jumlah pemberi pelayanan yang di observasi dalam periode observasi"
    ],
    perinatologi: [
      "Jumlah pasien perina  yang terkena infeksi nosokomial dalam satu bulan",
      "Jumlah pasien  Perina dalam satu bulan", 
      "Jumlah pasien pulang paksa dalam satu bulan", 
      "Jumlah seluruh pasien yang dirawat dalam satu bulan",  
      "Jumlah pasien dengan BBLR yang mengalami peningkatan BB (25-30g/hr) dan pulang sesuai dengan standard kenaikan BB",
      "Jumlah seluruh pasien yang dirawat dengan BBLR  dalam 1 bulan",
      "Jumlah pasien dengan assessment awal lengkap < 24 jam",
      "Jumlah pasien baru di hari tersebut",
      "Jumlah pasien dengan perbaikan saturasi",
      "Jumlah seluruh pasien yang menggunakan CPAP"
    ],
    hcu: [
      "Jumlah pasien yang kembali keperawatan intensif dengan kasus yang sama < 72 jam",
      "Jumlah seluruh pasien yang di rawat di perawatan intensif dalam 1 bulan",
      "Jumlah kasus infeksi Ventilator Associated Pneumonia (VAP)",
      "Jumlah pasien yang dirawat  dengan ventilator > 48 jam",
      "Jumlah pasien yang menerima dosis obat high alert yang tepat",
      "Jumlah seluruh pasien yang menerima obat high alert",
      "Jumlah pemberi pelayanan yang melakukan identifikasi pasien secara benar dalam periode observasi",
      "Jumlah pemberi pelayanan yang diobservasi dalam periode obervasi",
      "Jumlah visite dokter spesialis antara jam 08.00 sampai dengan 14.00 yang disurvey",
      "Jumlah pelaksanaan visite dokter spesialis yang disurvey",
      "Jumlah kejadian kematian pasien ruang Intensif < 48 jam dalam satu bulan",
      "Jumlah seluruh pasien ruang Intensif dalam satu bulan"
    ],
    kamarBersalin: [
      "Jumlah Ibu Meninggal Karena Perdarahan",
      "Jumlah Ibu Melahirkan Dengan Perdarahan di hari tersebut",
      "Jumlah Ibu Meninggal Karena Pre eklampsia",
      "Jumlah Ibu Dengan Pre eklampsia di hari tersebut",
      "Jumlah Ibu melahirkan yang meninggal karena sepsis",
      "Jumlah Ibu melahirkan dengan sepsis di hari tersebut tersebut",
      "Jumlah bayi dengan asfiksia yang berhasil ditangani",
      "Jumlah bayi dengan asfiksia di hari tersebut",
      "Jumlah persalinan dengan sectio caesaria di hari tersebut",
      "Jumlah seluruh persalinan di hari tersebut",
      "Jumlah pemberi pelayanan yang melakukan identifikasi pasien secara benar dalam periode observasi",
      "Jumlah pemberi pelayanan yang di observasi dalam periode observasi",
      "Jumlah pasien yang mendapatkan tindakan sectio cesaria < 30 menit",
      "Jumlah pasien yang diputuskan tindakan sectio cesaria emergency",
      "Jumlah Instruksi DPJP yang dilaksanakan secara tepat waktu (Pelaksanaannya maksimal dalam 1 Shift)",
      "Jumlah Seluruh Instruksi DPJP dalam 1 Shift"
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
      "jumlah seluruh pasien yang diperiksa di hari tersebut dikurangi jumlah penyerahan laboratorium salah orang",
      "Jumlah pasien pemeriksaan laboratorium di hari tersebut",
      "jumlah seluruh spesimen yang diperiksa di hari tersebut dikurangi jumlah spesimen yang tertukar",
      "jumlah spesimen di hari tersebut",
      "Jumlah kumulatif waktu tunggu pelayanan laboratorium cito",
      "Jumlah pemeriksaan cito di hari tersebut",
      "Semua hasil laboratorium kritis yang dilaporkan < 30 menit",
      "Jumlah semua hasil laboratorium kritis di hari tersebut",
      "Jumlah kesesuaian pemeriksaan baku mutu eksternal",
      "Jumlah pemeriksaan baku mutu eksternal",
      "Jumlah pasien laboratorium yang dilakukan identifikasi dengan tepat",
      "Jumlah seluruh  Pasien",
      "Jumlah Kumulatif Waktu tunggu hasil pemeriksaan laboratorium yang dirujuk",
      "jumlah sampel yang dirujuk" 
     
    ],
    farmasi: [
      "Jumlah kumulatif waktu tunggu obat jadi pasien yang disurvey",
      "Jumlah  pasien yang disurvey di hari tersebut",
      "Jumlah kumulatif waktu tunggu obat racikan pasien yang disurvey",
      "Jumlah  pasien yang disurvey di hari tersebut",
      "Jumlah Kesalahan pemberian obat",
      "Jumlah seluruh permintaan resep",
      "Jumlah pasien yang dilakukan identifikasi dengan tepat",
      "Jumlah seluruh pasien",
      "Jumlah resep polifamasi yang dikaji sesuai standar",
      "Jumlah seluruh resep polifamasi yang dikaji"
    ],
    gizi: [
      "Jumlah pasien rawat inap yang disurvei yang mendapat makanan tepat waktu dalam satu bulan",
      "Jumlah seluruh pasien rawat inap yang disurvei",
      "Jumlah pemberian makan yang sesuai dengan jenis diet",
      "Jumlah pemberian makan pasien di hari tersebut",
      "Jumlah Pasien Yang Menyisakan Makan",
      "Jumlah Pasien Rawat Inap Yang Bisa Makan di hari tersebut",
      "Jumlah pelaksanaan edukasi kelompok (penyuluhan gizi)",
      "Jumlah jadwal penyuluhan kelompok yang telah ditetapkan selama satu TW",
      "Jumlah paien yang di survey dikurangin jumlah pasien yang tidak puas",
      "Jumlah pasien yang di survey dalam satu bulan"
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
      "Jumlah rekam medis yang hilang di hari tersebut",
      "Jumlah berkas rekam medis",
      "Jumlah berkas rekam medis in aktif yang dipilah",
      "Jumlah target rekam medis inaktif 150 berkas rm /minggu",
      "Jumlah berkas rekam medis yg discan", 
      "Jumlah Berkas Rerkam Medis Manual yang tersedia pada hari tersebut"
    ],
    kesling: [
      "Jumlah limbah padat yang dikelola sesuai dengan Standar Prosedur Operasional", 
      "Jumlah proses pengolahan limbah padat yang diamati di hari tersebut",
      "Hasil pengukuran pencahayaan dan kelembaban disesuaikan dengan baku mutu",
      "Jumlah seluruh pengukuran pencahayaan dan kelembaban ruang di rumah sakit"
    ],
    cssdLinen: [
      "Jumlah seluruh alat yang disterilkan",
      "Jumlah alat steril yang didistribusikan",
      "Jumlah alat reuse yang ditandai dengan tepat",
      "Jumlah seluruh alat reuse yang disterilkan"
    ],
    Linen: [],
    ipsrs: [
      "Jumlah laporan kerusakan alat yang ditanggapi ≤ 15 menit",
      "Jumlah laporan kerusakan alat hari ini tersebut"
    ],
    k3rs: [
      "Pelaksanaan Standar Penanganan Tertusuk Jarum",
      "Jumlah seluruh kejadian tertusuk jarum", 
      "Pelaksanaan Standar Penanganan Kecelakaan Kerja Terkait Fasilitas",
      "Jumlah seluruh kejadian kecelakaan kerja", 
      "Ketepatan Pengecekan Sarana Proteksi Kebakaran",
      "Jumlah sarana prasarana yang di dilakukan pengecekan", 
      "Ketersediaan TIM penanggulangan Bencana",
      "TIM penanggulangan Bencana"
    ],
    kasir: [
      "Kecepatan waktu pemberian informasi tentang tagihan pasien rawat inap",
      "jumlah pasien rawat inap yang pulang di hari tersebut",
      "Kejadian bad debt pada pelayanan rawat jalan",
      "Jumlah pasien rawat jalan yang berobat di tanggal tersebut",
      "Kesesuaian antara pasien yang bayar dengan yang seharusnya membayar",
      "Jumlah pasien rawat jalan (pembayaran umum) di hari terebut",
      "Kesesuaian input dari unit dengan billing pembayaran",
      "Jumlah semua billingan pembayaran dihari tersebut",
      "Presentase bilingan yang belum close dihari yang sama",
      "Jumlah pasien rawat jalan di hari tersebut"
    ],
    loketPendaftaran: [
      "Jumlah pasien dengan penginputan data simRS lengkap dan tepat  di hari tersebut",
      "Jumlah pasien yang diinput di simRS di hari tersebut",
      "Jumlah pemberi pelayanan yang melakukan identifikasi pasien secara benar dalam periode observasi",
      "Jumlah pemberi pelayanan yang di observasi dalam periode observasi",
      "Jumlah Pasien yang terdaftar pada pukul 06.30 - 08.30",
      "Jumlah pasien yang telah ditentukan sampai pukul 08.30 (40 Pasien/hari)"
    ],
    ambulance: [
      "jumlah pasien yang dilayani < 30 menit",
      "jumlah pasien yang dilayani di hari tersebut"
    ],
    ppi: [
      "Jumlah pasien yang terinfeksi plebitis",
      "Jumlah hari pemasangan infuse perifer", 
      "Jumlah pasien yang terinfeksi saluran nafas",
      "Jumlah hari tirah baring",
      "Jumlah pasien yang terinfeksi kateter urine",
      "Jumlah hari terpasang kateter urine",
      "Jumlah pasien yang terinfeksi IDO",
      "Jumlah pasien yang dioperasi",
      "Jumlah petugas yang patuh menggunakan APD sesuai indikasi", 
      "Jumlah seluruh petugas yang terindikasi menggunakan APD", 
      "Jumlah kegiatan cuci tangan yang  dilakukan dengan tepat dan benar",
      "Jumlah peluang kebersihan tangan", 
      "Jumlah pasien yang mengalami infeksi VAP",
      "Jumlah hari pemasangan ventilator", 
      "Jumlah pasien yang terinfeksi clabsi", 
      "Jumlah hari pemasangan Central Vena line"
    ],
    timKprs: [
      "Jumlah pasien  yang dilakukan identifikasi dengan tepat",
      "Jumlah seluruh  Pasien",
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
    komiteKeperawatan: [
      "Angka di Lakukan Kredensial Perawat dan Bidan", 
      "Jumlah Perawat dan Bidan  yang akan di lakukan Kredensial", 
      "Kelengkapan Asuhan Keperawatan Berbasis EMR", 
      "Jumlah Kelengkapan Status EMR yang di Isi Pada setiap Unit", 
      "Angka Pelangaran Etik, disiplin perawat dan Bidan", 
      "Jumlah Perawat dan Bidan yang Melakukan Pelangaran Etik, disiplin Perawat dan Bidan"   
    ],
    komiteNakesLain: [],
    komiteEtik: [],
    timPkrs: [],
    timPpra: [
      "Jumlah pemakaian antibiotik lini ketiga pada pasien rawat inap yang sesuai prosedur",
      "Jumlah seluruh pemakaian antibiotik lini ketiga pada pasien rawat inap"
      ],
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
      "Jumlah pasien stunting wasting yang mengalami kenaiakan status gizi",
      "Jumlah seluruh pasien stunting wasting yang ada di rawat jalan",
      "Jumlah pasien rujukan dari PKM Sawah Besar yang mendapatkan PKMK",
      "Jumlah pasien rujukan dari PKM sawah besar"
    ],
    casemix: [
      "Jumlah berkas klaim rawat inap pasien BPJS Kesehatan dari setiap unit yang lengkap",
      "Jumlah berkas klaim rawat inap pasien BPJS Kesehatan dari setiap unit",
      "Jumlah berkas klaim rawat jalan pasien BPJS Kesehatan dari setiap unit yang lengkap",
      "Jumlah berkas klaim rawat jalan pasien BPJS Kesehatan dari setiap unit",
      "Jumlah berkas pengajuan klaim Rawat Jalan & Rawat Inap yang dipending oleh BPJS yang lengkap",
      "Jumlah berkas pengajuan klaim Rawat Jalan & Rawat Inap yang dipending oleh BPJS",
    ],
    timHiv: [
      "Jumlah pasien beresiko HIV/AIDS yang dilakukan skrining HIV/AIDS",
      "Jumlah seluruh pasien beresiko HIV/AIDS di wilayah RS",
      "Jumlah promkes yang dilakukan dan terdokumentasi selama 3 bulan",
      "Jumlah promkes yang ditargetkan selama 3 bulan"
    ],
    it: [
      "Jumlah laporan kerusakan Perangkat IT yang ditanggapi ≤ 15 menit",
      "Jumlah laporan kerusakan Perangkat IT hari ini tersebut"
    ],
    pengadaan: []
  };
  var monthlyNames = {
    igd: [
      "Kemampuan menangani life saving anak dan dewasa",
      "Pemberi pelayanan kegawat daruratan yang bersertifikat BLS/PPGD/GELS/ALS",
      "Waktu tanggap Pelayanan Dokter di Gawat Darurat",
      "Kematian Pasien ≤ 24 jam di Gawat Darurat",
      "Lama observasi pasien di IGD",
      "Jumlah pasien jatuh di IGD",
      "Kejadian pulang paksa di IGD",
      "Respon time penanganan kegawatdaruratan pasien geriatri di gawat darurat",
      "Tidak ada Penumpukan pasien di IGD",
      "Ketepatan identifikasi pasien",
      "Kepatuhan identifikasi pasien"
    ],
    rawatJalan: [
      "Buka pelayanan sesuai ketentuan",
      "Waktu tunggu di Rawat Jalan",
      "Kepuasan Pelanggan di Rawat Jalan",
      "Ketepatan identifikasi pasien"
    ],
    rawatInap: [
      "Kepatuhan Waktu Visite Dokter",
      "Angka kejadian infeksi nosokomial",
      "Kematian pasien > 48 jam",
      "Kejadian Pulang Paksa",
      "Kejadian Reaksi infeksi setelah tranfusi",
      "Kelengkapan pengisian assessment awal sesudah masuk Rawat Inap",
      "Ketepatan Pelaksanaan Instruksi DPJP",
      "Ketepatan Identifikasi Pasien",
      "Kepuasan Pelanggan"
    ],
    rawatInapAnak: [
      "Kepatuhan Waktu Visite Dokter",
      "Angka kejadian infeksi nosokomial",
      "Kematian pasien > 48 jam",
      "Kejadian Pulang Paksa",
      "Kejadian Reaksi infeksi setelah tranfusi",
      "Kelengkapan pengisian assessment awal sesudah masuk Rawat Inap",
      "Ketepatan Pelaksanaan Instruksi DPJP",
      "Ketepatan Identifikasi Pasien",
      "Kepuasan Pelanggan"
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
      "Ketepatan identifikasi pasien",
      "Kepuasan Pelanggan"
    ],
    perinatologi: [
      "Angka kejadian infeksi nosokomial",
      "Angka Kejadian pulang paksa",
      "Angka keberhasilan perawatan bayi dengan BBLR  (1500 gram-2500 gram)",
      "Kelengkapan asessment awal medis dan keperawatan pasien  di perinatologi < 24 Jam",
      "Angka keberhasilan pengguanaan CPAP pada pasien Perina",
      "Kepuasan Pelanggan"
    ],
    hcu: [
      "Rata-rata pasien yang kembali ke perawatan intensif dengan kasus yang sama <72 jam",
      "Kejadian VAP",
      "Ketepatan pemberian dosis obat High Alert pada pasien",
      "Kepatuhan Visit Dokter Spesialis",
      "Kepatuhan identifikasi pasien",
      "Kematian pasien < 48 jam sejak masuk RS",
      "Kepuasan Pelanggan"
     ],
    kamarBersalin: [
      "Kejadian kematian ibu karena persalinan akibat perdarahan",
      "Kejadian kematian ibu karena persalinan akibat pre eklampsia",
      "Kejadian kematian ibu karena persalinan akibat sepsis",
      "Pemberi pelayanan persalinan normal",
      "Pemberi pelayanan persalinan dengan penyulit",
      "Kemampuan menangani bayi dengan asfiksia",
      "Pertolongan persalinan melalui seksio caesaria",
      "Kepuasan pelanggan",
      "Kepatuhan Identifikasi Pasien",
      "Rerata waktu tanggap emergency sectio casaria",
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
      "Tidak adanya kesalahan pemberian hasil pemeriksaan laboratorium",
      "Tidak adanya kejadian tertukar spesimen",
      "Waktu tunggu hasil pelayanan laboratorium cito",
      "Pelaporan hasil kritis laboratorium",
      "Kesesuaian baku mutu eksternal",
      "Ketepatan identifikasi pasien di laboratorium",
      "Ketepatan Hasil Pemeriksaan yang Dirujuk"
     ],
    farmasi: [
      "Waktu tunggu pelayanan obat jadi",
      "Waktu tunggu pelayanan obat racikan",
      "Tidak adanya kejadian kesalahan pemberian obat",
      "Penulisan resep sesuai formularium nasional untuk pasien JKN",
      "Kepuasan pelanggan",
      "Ketepatan identifikasi pasien di farmasi",
      "Pemberian label obat high alert",
      "Persentase Ketersediaan Bahan Medis Habis Pakai Sesuai Standar",
      "Persentase Ketersediaan Obat Sesuai Standar",
      "Persentase Pengkajian Resep Polifarmasi Sesuai Standar",
      "Persentase Laporan Konseling Sesuai Standar",
      "Persentase Pelayanan Informasi Obat Sesuai Standar"

    ],
    gizi: [
      "Ketepatan Waktu Pemberian Makanan Kepada Pasien",
      "Tidak Adanya Kesalahan Dalam Pemberian Diet Pasien",
      "Sisa Makanan Yang Tidak Termakan Oleh Pasien",
      "Capaian Edukasi Kelompok (Penyuluhan Gizi) Minimal 1x/TW",
      "Kepuasan Pelanggan Makanan Rumah Sakit"
    ],
    rekamMedis: [
      "Kelengkapan pengisian rekam medik 24 jam setelah selesai pelayanan unit rawat inap",
      "Kelengkapan pengisian rekam medik 24 jam setelah selesai pelayanan unit rawat jalan",
      "Kelengkapan pengisian rekam medik 24 jam setelah selesai pelayanan unit igd",
      "Kelengkapan informed concent setelah mendapatkan informasi yang jelas",
      "Berkas rekam medis yang hilang",
      "Retensi berkas rekam medis",
      "Hybrid rekam medis",
      "Kepuasan Pelanggan"
    ],
    kesling: [
      "Baku mutu limbah cair BOD",
      "Baku mutu limbah cair COD",
      "Baku mutu limbah cair TSS",
      "Baku mutu limbah cair PH",
      "Baku mutu limbah cair Ammonia",
      "Baku mutu limbah cair Coliform",
      "Baku mutu limbah cair Minyak",
      "Pengolahan limbah padat berbahaya sesuai dengan aturan",
      "Kelembaban Ruangan Sesuai Dengan Aturan"
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
      "Ketetapan pemilahan linen infeksius dan linen non infeksius",
      "Kepuasan Pelanggan"
    ],
    ipsrs: [
      "Kecepatan waktu menanggapi kerusakan sarana dan prasarana Rumah Sakit",
      "Peralatan Laboratorium (dan alat ukur yang lain) yang terkalibrasi tepat waktu sesuai dengan ketentuan kalibrasi"
    ],
    k3rs: [
      "Pelaksanaan Standar Penanganan Tertusuk Jarum",
      "Pelaksanaan Standar Penanganan Kecelakaan Kerja Terkait Fasilitas",
      "Ketepatan Pengecekan Sarana Proteksi Kebakaran",
      "Ketersediaan TIM penanggulangan Bencana"
    ],
    kasir: [
      "Kecepatan waktu pemberian informasi tentang tagihan pasien rawat inap",
      "Kejadian bad debt pada pelayanan rawat jalan",
      "Kesesuaian antara pasien yang bayar dengan yang seharusnya membayar",
      "Kesesuaian input layanan dari unit dengan billing pembayaran",
      "Presentase billing yang belum close dihari yang sama",
      "Kepuasan Pelanggan"
    ],
    loketPendaftaran: [
      "Kelengkapan Penginputan Data di SIMRS",
      "Kepatuhan identifikasi pasien", 
      "Kecepatan Petugas dalam melakukan pendafataran pasien di SIMRS  (06.30 - 08.30)",
      "Kepuasan Pelanggan"
    ],
    ambulance: [
      "Kecepatan Pelayanan Ambulance di RS < 30 Menit",
      "Tidak Adanya Kecelakaan Ambulans Yang Menimbulkan Kecacatan atau Kematian",
      "Kepuasan pelanggan"
    ],
    ppi: [
      "Tersedianya anggota Tim PPI yang terlatih",
      "Infeksi luka infus/flebistis",
      "Hospital-acquired pneumonia (HAP)",
      "Catheter Associated Urinary Tract Infection (CAUTI) / ISK",
      "Surgical Site Infection (SSI) /IDO",
      "Penggunaan Penggunaan APD",
      "Kepatuhan kebersihan tangan", 
      "Ventilator Associated Pneumonia ( VAP)",
      "central line bloodstream infection (CLABSI)"
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
      "Angka di Lakukan Kredensial Perawat dan Bidan", 
      "Kelengkapan Asuhan Keperawatan Berbasis EMR", 
      "Angka Pelangaran Etik, disiplin perawat dan Bidan" 
    ],
    komiteNakesLain: [
      "Kepatuhan tenaga kesehatan dalam pelaksanaan proses kredensial",
      "Kepatuhan pelaksanaan OPPE dam FPPE"
    ],
    komiteEtik: [
      "Dilakukannya sosialisasi mengenai etik"
    ],
    timPkrs: [
      "Penilaian kepuasan pasien terhadap pelaksanaan komunikasi dan edukasi di Rawat Jalan",
      "Penilaian kepuasan pasien terhadap pelaksanaan komunikasi dan edukasi di Rawat Inap",
      "Keterlaksanaan Pendidikan Kesehatan Internal (Penyuluhan Kelompok)",
      "Keterlaksanaan Pendidikan Kesehatan Eksternal (Penyuluhan Kelompok)"
    ],
    timPpra: [
      "Pemakaian Antibiotik Lini Ketiga Sesuai Prosedur"
    ],
    timKomplain: [
      "Kepuasan pelanggan",
      "Kecepatan Waktu Tanggap Komplain"
    ],
    timPonek: [
      "Terselenggaranya pembahasan Audit Maternal Perinatal per tahun dan atau by case"
    ],
    timTb: [
      "Jejaring pelayanan TB di wilayah Sawah Besar dengan penyakit penyerta"
    ],
    manajemenKepegawaian: [
      "Pelatihan Staf Minimal 20 jam/tahun",
      "Kepatuhan Administrasi Cuti Pegawai",
      "Pegawai Kesehatan yang melakukan pelayanan kesehatan memiliki STR",
      "Kepatuhan pegawai terhadap peraturan jam kerja",
      "Kepuasan Pelanggan"
    ],
    keuangan: [
      "Kelengkapan Laporan Akuntabilitas Kinerja",
      "Cost Recovery Rate",
      "Ketepatan Waktu Penyusunan Laporan Keuangan",
      "Ketepatan Waktu Pemberian Gaji dan tunjangan pegawai non PNS Sesuai Kesepakatan Waktu",
      "Kepuasan Pelanggan"
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
      "Cakupan pasien stunting wasting di rawat jalan Yang Mengalami Peningkatan Status Gizi",
      "Cakupan Rujukan Pasien Stunting yang mendapatkan PKMK"
    ],
    casemix: [
      "Ketepatan waktu pengajuan berkas klaim JKN per bulan",
      "Kelengkapan berkas klaim rawat inap pasien BPJS Kesehatan dari setiap unit",
      "Kelengkapan berkas klaim rawat jalan pasien BPJS Kesehatan dari setiap unit",
      "Jumlah berkas pengajuan klaim Rawat Jalan & Rawat Inap yang diajukan ke BPJS"
    ],
    timHiv: [
      "Terlaksananya pelayanan kesehatan pasien dengan resiko terinfeksi penyakit HIV/AIDS",
      "Terlaksananya promkes HIV/AIDS di unit rawat jalan atau media sosial"
    ],
    it: [
      "Terselenggaranya pemeliharaan jaringan berfungsi dengan baik di semua unit",
      "Waktu tanggap pelaporan kerusakan Perangkat IT",
      "Terlaksananya target bridging dengan pihak eksternal prioritas (Satu Sehat)"
    ],
    pengadaan: [
      "Ketepatan Waktu Pembayaran Dokumen SPJ",
      "Kesesuaian Pembayaran dengan Target SPS Pengadaan"
    ]
  };
  var monthlyTarget = {
    igd: [
      "100%",
      "100%",
      "≤ 5 menit",
      "≤ 0,2 %",
      "5 %",
      "0 %",
      "≤ 5 %",
      "≤ 5 menit",
      "0%",
      "100%",
      "80%"
    ],
    rawatJalan: [
      "100%",
      "≥ 80 %",  
      "≥ 90 %",
      "100%"
     ],
    rawatInap: [
	  "≥ 80%",
	  "≤ 1,5%",
	  "≤ 2,5 %",
	  "≤ 5%",
	  "≤ 0,01%",
	  "100%",
	  "100%",
    "100%",
    "80%"
    ],
    rawatInapAnak: [
	  "≥ 80%",
	  "≤ 1,5%",
	  "≤ 2,5 %",
	  "≤ 5%",
	  "≤ 0,01%",
	  "100%",
	  "100%",
    "100%",
    "80%"
    ],
    kamarOperasi: [
      "≤ 2 hari",
      "≤ 1 %",
      "100%",
      "100%",
      "100%",
      "100%",
      "≤ 6 %",
      "< 5 %",
       "100%",
       "100%",
       "< 5 %",
       "100%",
       "80%"
    ],
    perinatologi: [
	  "≤ 1,5 %",
	  "≤ 5 %",
	  "100%", 
	  "100%",
    "100%",
    "80%"
	], 
    hcu: [
      "≤ 3 %",
      "≤ 5,8 %",
      "100%",
      "≥ 80 %",
      "100%",
      "≤ 0,24 %",
      "80%"
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
      "< 48 jam"
	],
    farmasi: [
      "≤ 30 menit",
      "≤ 60 menit",
      "100%",
      "≥ 80 %",
      "≥ 80 %",
      "100%",
      "100%",
      "≥ 10%",
      "≥ 75%",
      "≥ 75%",
      "≥ 10%",
      "≥ 25%"
    ],
    gizi: [
      "> 90 %",
      "100 %",
      "≤ 20 %",
      "100 %",
      "> 80 %"
	],
    rekamMedis: [
      "100%",
      "100%",
      "100%",
      "100%",
      "0%",
      "100%",
      "100%",
      "80%"
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
	  "100%",
    "80%"
    ],
    ipsrs: [
      "80%",
      "100%"
	],
    k3rs: ["100%", "100%", "100%", "100%"],
    kasir: [
      "≤ 120 Menit", 
      "0%",
      "100",
      "100",
      "0",
      "80%"
    ],
    loketPendaftaran: [
      "100%",
      "100%",
      "100%",
      "80%"
  ],
    ambulance: ["100%", "100%", "≥ 80 %"],
    ppi: [
      "75%",
      "≤ 1 ‰",
      "≤ 1 ‰",
      "≤ 4.7 ‰",
      "≤ 2 %",
      "100%",
      "≥ 85%",
      "< 5,8 ‰",
      "< 5 ‰"
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
      "100%",
      "0%"
    ],
    komiteNakesLain: ["100%", "100%"],
    komiteEtik: ["100%"],
    timPkrs: [
      "≥ 75%", 
      "≥ 75%", 
      "≥ 80%",
      "≥ 80%"
    ],
    timPpra: ["100%"],
    timKomplain: ["88.5%", "80%"],
    timPonek: ["100%"],
    timTb: ["100%"],
    manajemenKepegawaian: [
      "190 orang",
      "95%",
      "95%",
      "95%",
      "80%"
    ],
	keuangan: [
    "100%", 
    "≥40%", 
    "100%", 
    "100%",
    "80%"
  ],
  timKb: ["50%", "80%"],
  pengurusBarang: [
    "75%", 
    "90%",
    "90%"
  ],
  stunting: [
    "50 %",
    "50 %"
  ],
  casemix: [
    "100%",
    "100%",
    "100%",
    "100%"
  ],
  timHiv: [
    "75%",
    "75%"
  ],
  it: [
    "100%",
    "≥ 85%",
    "100%"
  ],
  pengadaan: [
    "80%",
    "≥ 90%"
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
      null // 11
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
      [null, 0.2],
      [null, 5],
      [null, 0],
      [null, 5],
      [null, 5],
      [null, 0],
      [100, null],
      [80, null]
    ],
    rawatJalan: [
      [100, null],
      [80, null],
      [90, null],
      [100, null]   
    ],
    rawatInap: [
      [80, null], // 1
      [null, 1.5], // 2
      [null, 2.5], // 3
      [null, 5], // 4
      [null, 0.01], // 5
      [100, null], // 6
      [100, null], // 7
      [100, null], // 8
      [80, null]
     
    ],
    rawatInapAnak: [
      [80, null], // 1
      [null, 1.5], // 2
      [null, 2.5], // 3
      [null, 5], // 4
      [null, 0.01], // 5
      [100, null], // 6
      [100, null], // 7
      [100, null], // 8
      [80, null]
     
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
      [null, 5],
      [100, null],
      [80, null]
    ],
    perinatologi: [
      [null, 1.5],
      [null, 5],
      [100, null],
      [100, null],
      [100, null],
      [80, null]
    ],
    hcu: [
      [null, 3],
      [null, 5.8],
      [100, null],
      [80, null],
      [100, null],
      [null, 0,24],
      [80, null]
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
      [null, 48]
    ],
    farmasi: [
      [null, 30],
      [null, 60],
      [100, null],
      [80, null],
      [80, null],
      [100, null],
      [100, null],
      [10, null],
      [75, null],
      [75, null],
      [10, null],
      [25, null]
    ],
    gizi: [
      [90, null],
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
      [null, 0],
      [100, null],
      [100, null],
      [80, null]
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
      [100, null],
      [80, null]
    ],
    ipsrs: [
      [80, null],
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
      [null,0],
      [100,null],
      [100,null],
      [null,0],
      [80,null]
    ],
    loketPendaftaran: [
      [100, null],
      [100, null],
      [100, null],
      [80, null]
    ],
    ambulance: [
      [100, null],
      [100, null],
      [80, null]
    ],
    ppi: [
      [75, null],
      [null, 1],
      [null, 1],
      [null, 4.7],
      [null, 2],
      [100, null],
      [85, null],
      [null,5.8],
      [null,5]
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
      [100, null],
      [0, null]
    ],
    komiteNakesLain: [
      [100, null],
      [100, null]
    ],
    komiteEtik: [],
    timPkrs: [
      [75, null],
      [75, null],
      [80, null],
      [80, null]
    ],
    timPpra: [
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
      [100, null]
    ],
    manajemenKepegawaian: [
      [190, null],
      [95, null],
      [95, null],
      [95, null],
      [80, null]
    ],
    keuangan: [
      [100, null],
      [40, null],
      [100, null],
      [100, null],
      [80, null]
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
      [50, null],
      [50, null]
    ],
    casemix: [
      [100, null],
      [100, null],
      [100, null],
      [100, null]
    ],
    timHiv: [
      [75, null],
      [75, null]
    ],
    it: [
      [100, null],
      [85, null],
      [100, null]
    ],
    pengadaan: [
      [80, null],
      [90, null]
    ]
  };
  var monthlyDisable = {
  igd: [
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
      [11, "numerator", "denumerator", "hasil"]
    ],
    rawatJalan: [
      [1, "numerator", "denumerator", "hasil"],
      [2, "numerator", "denumerator", "hasil"],
      [4, "numerator", "denumerator", "hasil"]
     
    ],
    rawatInap: [
      [1, "numerator", "denumerator", "hasil"],
      [2, "numerator", "denumerator", "hasil"],
      [3, "numerator", "denumerator", "hasil"],
      [4, "numerator", "denumerator", "hasil"],
      [5, "numerator", "denumerator", "hasil"],
      [6, "numerator", "denumerator", "hasil"],
      [7, "numerator", "denumerator", "hasil"],
      [8, "numerator", "denumerator", "hasil"]
    ],
    rawatInapAnak: [
      [1, "numerator", "denumerator", "hasil"],
      [2, "numerator", "denumerator", "hasil"],
      [3, "numerator", "denumerator", "hasil"],
      [4, "numerator", "denumerator", "hasil"],
      [5, "numerator", "denumerator", "hasil"],
      [6, "numerator", "denumerator", "hasil"],
      [7, "numerator", "denumerator", "hasil"],
      [8, "numerator", "denumerator", "hasil"]
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
      [5, "numerator", "denumerator", "hasil"]
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
      [5, "numerator", "denumerator", "hasil"],
      [6, "numerator", "denumerator", "hasil"],
      [7, "numerator", "denumerator", "hasil"],
      [8, "numerator", "denumerator", "hasil"]
    ],
    farmasi: [
      [1, "numerator", "denumerator", "hasil"],
      [2, "numerator", "denumerator", "hasil"],
      [3, "numerator", "denumerator", "hasil"],
      [6, "numerator", "denumerator", "hasil"],
      [10, "numerator", "denumerator", "hasil"]
 
    ],
    gizi: [
      [1, "numerator", "denumerator", "hasil"],
      [2, "numerator", "denumerator", "hasil"],
      [3, "numerator", "denumerator", "hasil"],
      [4, "numerator", "denumerator", "hasil"],
      [5, "numerator", "denumerator", "hasil"]
     
    ],
    rekamMedis: [
      [1, "numerator", "denumerator", "hasil"],
      [2, "numerator", "denumerator", "hasil"],
      [3, "numerator", "denumerator", "hasil"],
      [4, "numerator", "denumerator", "hasil"],
      [5, "numerator", "denumerator", "hasil"],
      [6, "numerator", "denumerator", "hasil"],
      [7, "numerator", "denumerator", "hasil"]
    ],
    kesling: [
      [8, "numerator", "denumerator", "hasil"],
      [9, "numerator", "denumerator", "hasil"]
    ],
    cssdLinen: [
      [1, "numerator", "denumerator", "hasil"],
      [2, "numerator", "denumerator", "hasil"]
    ],
    Linen: [],
    ipsrs: [
      [1, "numerator", "denumerator", "hasil"]
    ],
    k3rs: [
      [1, "numerator", "denumerator", "hasil"],
      [2, "numerator", "denumerator", "hasil"],
      [3, "numerator", "denumerator", "hasil"],
      [4, "numerator", "denumerator", "hasil"]
    ],
    kasir: [
        [1, "numerator", "denumerator", "hasil"],
        [2, "numerator", "denumerator", "hasil"],
        [3, "numerator", "denumerator", "hasil"],
        [4, "numerator", "denumerator", "hasil"],
        [5, "numerator", "denumerator", "hasil"]
    ],
    loketPendaftaran: [
      [1, "numerator", "denumerator", "hasil"],
      [2, "numerator", "denumerator", "hasil"],
      [3, "numerator", "denumerator", "hasil"]
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
      [8, "numerator", "denumerator", "hasil"],
      [9, "numerator", "denumerator", "hasil"]
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
    komiteKeperawatan: [
      [1, "numerator", "denumerator", "hasil"],
      [2, "numerator", "denumerator", "hasil"],
      [3, "numerator", "denumerator", "hasil"]
    ],
    komiteNakesLain: [],
    komiteEtik: [],
    timPkrs: [],
    timPpra: [
      [1, "numerator", "denumerator", "hasil"]
    ],
    timKomplain: [],
    timPonek: [],
    timTb: [],
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
      [1, "numerator", "denumerator", "hasil"],
      [2, "numerator", "denumerator", "hasil"]
    ],
    casemix: [
      [2, "numerator", "denumerator", "hasil"],
      [3, "numerator", "denumerator", "hasil"],
      [4, "numerator", "denumerator", "hasil"]
    ],
    timHiv: [
      [1, "numerator", "denumerator", "hasil"],
      [2, "numerator", "denumerator", "hasil"]
    ],
    it: [
      [2, "numerator", "denumerator", "hasil"]
    ],
    pengadaan: []
  };
  var monthlyMapping = {
    igd: [
      [1, 1, 2],//0,1
      [2, 3, 4],//2,3
      [3, 5, 6],//4,5
      [4, 7, 8],//6,7
      [5, 9, 10],
      [6, 11, 12],
      [7, 13, 14],
      [8, 15, 16],
      [9, 17, 18],
      [10, 19, 20],
      [11, 21, 22]
    ],
    rawatJalan: [ [1, 1, 2],[2, 3, 4],[4, 5, 6]],
    rawatInap: [
      [1, 1, 2],
      [2, 3, 4],
      [3, 5, 6],
      [4, 7, 8],
      [5, 9, 10],
      [6, 11, 12],
      [7, 13, 14],
      [8, 15, 16]
   
    ],
    rawatInapAnak: [
      [1, 1, 2],
      [2, 3, 4],
      [3, 5, 6],
      [4, 7, 8],
      [5, 9, 10],
      [6, 11, 12],
      [7, 13, 14],
      [8, 15, 16]
   
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
      [9, 17, 18],
      [10, 19, 20],
      [11, 21, 22],
      [12, 23, 24]
      
    ],
    perinatologi: [
      [1, 1, 2],
      [2, 3, 4],
      [3, 5, 6],
      [4, 7, 8],
      [5, 9, 10]
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
      [5, 9, 10],
      [6, 11, 12],
      [7, 13, 14],
      [8, 15, 16]
    ],
    farmasi: [
      [1, 1, 2],
      [2, 3, 4],
      [3, 5, 6],
      [6, 7, 8],
      [10, 9, 10]
     
    ],
    gizi: [
      [1, 1, 2],
      [2, 3, 4],
      [3, 5, 6],
      [4, 7, 8],
      [5, 9, 10]
    ],
    rekamMedis: [
      [1, 1, 2],
      [2, 3, 4],
      [3, 5, 6],
      [4, 7, 8],
      [5, 9, 10],
      [6, 11, 12],
      [7, 13, 14]
    ],
    kesling: [
      [8, 1, 2],
      [9, 3, 4],
    ],
    cssdLinen: [
      [1, 1, 2],
      [2, 3, 4]
    ],
    Linen: [],
    ipsrs: [
      [1, 1, 2]
    ],
    k3rs: [
      [1, 1, 2],
      [2, 3, 4],
      [3, 5, 6],
      [4, 7, 8]
    ],
    kasir: [
      [1, 1, 2],
      [2, 3, 4],
      [3, 5, 6],
      [4, 7, 8],
      [5, 9, 10]
    ],
    loketPendaftaran: [
      [1, 1, 2],
      [2, 3, 4],
      [3, 5, 6]
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
      [8, 13, 14],
      [9, 15, 16]
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
    komiteKeperawatan: [
      [1, 1, 2],
      [2, 3, 4],
      [3, 5, 6]
    ],
    komiteNakesLain: [],
    komiteEtik: [],
    timPkrs: [],
    timPpra: [
      [1, 1, 2]
    ],
    timKomplain: [],
    timPonek: [],
    timTb: [],
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
      [3, 3, 4],
      [4, 5, 6]
    ],
    timHiv: [
      [1, 1, 2],
      [2, 3, 4]
    ],
    it: [
      [2, 1, 2]
    ],
    pengadaan: []
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
    var monthlyDataList   = [];
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

  this.getDailyNamesDynamic = function(currPage){
    console.log("this-->"+currPage);
    return this.getDynamicData(currPage,1);
  }

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

  this.getDynamicData2 = function(
    process_type,
    type,
    callbackFunc
  ) {
    var result = { data: null };
    var instance = this;
    $http
      .get(
        SERVER_URL +
          "/api/dynamic/getHeaderData/proc_type/" +
          process_type +
          "/type/" +
          type,
        { headers: { Authorization: localStorage.getItem("token") } }
      )
      .then(
        function(reqRes) {
          console.log(reqRes.data);
          if (reqRes.data && reqRes.data != "") {
            result.data = reqRes.data;
          }
          callbackFunc(result);
        },
        function() {
          //errorFunc();
          $.toast({
            heading: "Error",
            text:
              "Error happen when trying to get data on " +
              process_type +
              "-" +
              type +
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

  this.getDynamicData = function(process_type, type, callbackFunc) {
    var result = { data: null };

    // Create a new XMLHttpRequest object
    var xhr = new XMLHttpRequest();

    // Open a synchronous GET request
    xhr.open("GET", SERVER_URL + "/api/dynamic/getHeaderData/proc_type/" + process_type + "/type/" + type, false); // `false` makes it synchronous

    // Set headers if needed
    xhr.setRequestHeader("Authorization", localStorage.getItem("token"));

    try {
        // Send the request
        xhr.send();

        // Check the response status
        if (xhr.status === 200) {
            // Parse the response data if it is in JSON format
            result.data = JSON.parse(xhr.responseText);
        } else {
            console.error("Error occurred: " + xhr.statusText);
        }
    } catch (error) {
        console.error("Error occurred during AJAX call: ", error);
    }

    // Call the callback function with the result
    callbackFunc(result);
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

