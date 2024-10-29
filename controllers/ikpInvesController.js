sikatApp.controller("ikpInvesController", function(
  $scope,
  $rootScope,
  $http,
  $filter,
  $location,
  $routeParams,
  NgTableParams
) {
  $rootScope.currPage = "ikpInves";
  $rootScope.currPageParam = $routeParams.param;
  $scope.noRawat = "";
  $scope.namaInsiden = "";
  $scope.namaPetugas = "";
  $scope.namaPasien = "";
  $scope.namaDokter = "";
  $scope.tanggalDari = "";
  $scope.tanggalSampai = "";
  if ($routeParams.noRawat) $scope.noRawat = $routeParams.noRawat;
  if ($routeParams.namaInsiden) $scope.namaInsiden = $routeParams.namaInsiden;
  if ($routeParams.namaPetugas) $scope.namaPetugas = $routeParams.namaPetugas;
  if ($routeParams.namaPasien) $scope.namaPasien = $routeParams.namaPasien;
  if ($routeParams.namaDokter) $scope.namaDokter = $routeParams.namaDokter;
  if ($routeParams.tanggalDari) $scope.tanggalDari = $routeParams.tanggalDari;
  if ($routeParams.tanggalSampai)
    $scope.tanggalSampai = $routeParams.tanggalSampai;

  $scope.showIkpLapor = row => {
    var tanggal = row.tgl_kejadian;
    var noRawat = row.no_rawat;
    $scope.ikpLapor_noRekamMedis = row.no_rkm_medis;
    $scope.ikpLapor_namaPasien = row.nm_pasien;
    $scope.ikpLapor_namaDokter = row.nm_dokter;
    $scope.ikpLapor_kodeKamar = row.kd_kamar != "null" ? row.kd_kamar : "";
    $scope.ikpLapor_lokasi = row.kd_kamar + " " + row.nm_bangsal;
    $scope.ikpLapor_tglRegistrasi = row.tgl_registrasi;
    $scope.ikpLapor_umur = row.umur;
    $scope.ikpLapor_jenisKelamin = row.jenis_kelamin;
    $scope.ikpLapor_caraBayar = row.cara_bayar;
    var url = SERVER_URL + "/api/ikpLapor?id=" + tanggal + ";" + noRawat;
    $http
      .get(url, { headers: { Authorization: localStorage.getItem("token") } })
      .then(
        function(reqRes) {
          if (reqRes.data && reqRes.data != "") {
            $scope.ikpLapor_noRawat = reqRes.data.no_rawat;
            $scope.ikpLapor_lokasi = reqRes.data.lokasi;
            $scope.ikpLapor_unitTerkait = reqRes.data.unit_terkait;
            $scope.ikpLapor_pertamaMelaporkan = reqRes.data.pertama_melaporkan;
            $scope.ikpLapor_unitPenyebab = reqRes.data.unit_penyebab;
            $scope.ikpLapor_kejadianSebelumnya =
              reqRes.data.kejadian_sebelumnya;
            $scope.ikpLapor_pencegahanTerulang =
              reqRes.data.pencegahan_terulang;
            $scope.ikpLapor_tanggal =
              reqRes.data.tgl_kejadian + " " + reqRes.data.jam_kejadian;
            $scope.ikpLapor_tanggalLapor =
              reqRes.data.tgl_lapor + " " + reqRes.data.jam_lapor;
            $scope.ikpLapor_identifikasi = reqRes.data.identifikasi_masalah;
            $scope.ikpLapor_akibat = reqRes.data.akibat;
            $scope.ikpLapor_tindakanInsiden = reqRes.data.tindakan_insiden;
            $scope.ikpLapor_rtl = reqRes.data.rtl;
            $scope.ikpLapor_namaPenerima = reqRes.data.nm_penerima;
            $scope.ikpLapor_tanggalTerima = reqRes.data.tgl_terima;
            $scope.ikpLapor_gradingRisiko = reqRes.data.grading_risiko;
            $scope.ikpLapor_petugas =
              reqRes.data.nip + " - " + reqRes.data.nama;
            $scope.ikpLapor_jenisInsiden = reqRes.data.jenis_insiden;
            $scope.ikpLapor_namaInsiden = reqRes.data.nama_insiden;
            $scope.ikpLapor_skorDampak = reqRes.data.skor_dampak;
            $scope.ikpLapor_tipeInsiden = reqRes.data.tipe_insiden;
            $scope.ikpLapor_subtipeInsiden = reqRes.data.subtipe_insiden;
            $scope.ikpLapor_frekuensiKejadian = reqRes.data.frekuensi_kejadian;
            $scope.ikpLapor_tindakanOleh = reqRes.data.tindakan_oleh;
          }
        },
        function() {
          $.toast({
            heading: "Error",
            text:
              "Error happen when trying to get data on " +
              url +
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
  $scope.addIkpInves = (tanggal, noRawat) => {
    $location.url(
      "/ikpInves_new?tanggal=" +
        tanggal +
        "&noRawat=" +
        noRawat +
        "&param=" +
        $rootScope.currPageParam
    );
  };
  $scope.showIkpInves = (tanggal, noRawat) => {
    $location.url(
      "/ikpInves_edit?tanggal=" +
        tanggal +
        "&noRawat=" +
        noRawat +
        "&param=" +
        $rootScope.currPageParam
    );
  };

  $scope.tableParams = new NgTableParams({}, { dataset: [] });
  $scope.loadData = () => {
    $location.url(
      "/ikpInves?tanggalDari=" +
        $scope.tanggalDari +
        "&tanggalSampai=" +
        $scope.tanggalSampai +
        "&noRawat=" +
        $scope.noRawat +
        "&namaInsiden=" +
        $scope.namaInsiden +
        "&namaPetugas=" +
        $scope.namaPetugas +
        "&namaPasien=" +
        $scope.namaPasien +
        "&namaDokter=" +
        $scope.namaDokter +
        "&param=" +
        $rootScope.currPageParam
    );
  };
  $scope.getData = () => {
    var url = SERVER_URL + "/api/ikpInves/getByQuery?q=0";
    url += "&isRanap=" + ($rootScope.currPageParam == "ranap");
    if ($scope.noRawat) url += "&noRawat=" + $scope.noRawat;
    if ($scope.namaInsiden) url += "&namaInsiden=" + $scope.namaInsiden;
    if ($scope.namaPetugas) url += "&namaPetugas=" + $scope.namaPetugas;
    if ($scope.namaPasien) url += "&namaPasien=" + $scope.namaPasien;
    if ($scope.namaDokter) url += "&namaDokter=" + $scope.namaDokter;
    if ($scope.tanggalDari)
      url +=
        "&tanggalDari=" + $filter("date")($scope.tanggalDari, "yyyy-MM-dd");
    if ($scope.tanggalSampai)
      url +=
        "&tanggalSampai=" + $filter("date")($scope.tanggalSampai, "yyyy-MM-dd");

    $http
      .get(url, { headers: { Authorization: localStorage.getItem("token") } })
      .then(
        function(reqRes) {
          if (reqRes.data && reqRes.data != "") {
            $scope.tableParams = new NgTableParams(
              {},
              { dataset: reqRes.data }
            );
          } else {
            $scope.tableParams = new NgTableParams({}, { dataset: [] });
          }
        },
        function() {
          $.toast({
            heading: "Error",
            text:
              "Error happen when trying to get data on " +
              url +
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
  $scope.getAllJenisInsiden = function() {
    return $http
      .get(SERVER_URL + "/api/ikpLapor/allJenisInsiden", {
        headers: { Authorization: localStorage.getItem("token") }
      })
      .then(function(response) {
        $scope.jenisInsidenList = response.data;
      });
  };
  $scope.getAllNamaInsiden = function() {
    return $http
      .get(SERVER_URL + "/api/ikpLapor/allNamaInsiden", {
        headers: { Authorization: localStorage.getItem("token") }
      })
      .then(function(response) {
        $scope.namaInsidenList = response.data;
      });
  };
  $scope.getAllSkorDampak = function() {
    return $http
      .get(SERVER_URL + "/api/ikpLapor/allSkorDampak", {
        headers: { Authorization: localStorage.getItem("token") }
      })
      .then(function(response) {
        $scope.skorDampakList = response.data;
      });
  };
  $scope.getAllTipeInsiden = function() {
    return $http
      .get(SERVER_URL + "/api/ikpLapor/allTipeInsiden", {
        headers: { Authorization: localStorage.getItem("token") }
      })
      .then(function(response) {
        $scope.tipeInsidenList = response.data;
      });
  };
  $scope.getAllSubtipeInsiden = function() {
    return $http
      .get(SERVER_URL + "/api/ikpLapor/allSubtipeInsiden", {
        headers: { Authorization: localStorage.getItem("token") }
      })
      .then(function(response) {
        $scope.subtipeInsidenList = response.data;
      });
  };
  $scope.getAllFrekuensiKejadian = function() {
    return $http
      .get(SERVER_URL + "/api/ikpLapor/allFrekuensiKejadian", {
        headers: { Authorization: localStorage.getItem("token") }
      })
      .then(function(response) {
        $scope.frekuensiKejadianList = response.data;
      });
  };
  $scope.getAllTindakanOleh = function() {
    return $http
      .get(SERVER_URL + "/api/ikpLapor/allTindakanOleh", {
        headers: { Authorization: localStorage.getItem("token") }
      })
      .then(function(response) {
        $scope.tindakanOlehList = response.data;
      });
  };
  $scope.getAllJenisInsiden();
  $scope.getAllNamaInsiden();
  $scope.getAllSkorDampak();
  $scope.getAllTipeInsiden();
  $scope.getAllSubtipeInsiden();
  $scope.getAllFrekuensiKejadian();
  $scope.getAllTindakanOleh();
  $scope.getData();
});

sikatApp.controller("ikpInvesNewController", function(
  $scope,
  $rootScope,
  $routeParams,
  $http
) {
  $rootScope.currPage = "ikpInves";
  $scope.tglKejadian = $routeParams.tanggal;
  $scope.noRawat = $routeParams.noRawat;
  $scope.save = () => {
    $http
      .post(
        SERVER_URL + "/api/ikpInves",
        {
          no_rawat: $scope.noRawat,
          tgl_kejadian: $scope.tglKejadian,
          penyebab_langsung: $scope.penyebabLangsung,
          latar_belakang: $scope.latarBelakang,
          rekomendasi: $scope.rekomendasi,
          tindakan_akan: $scope.tindakanAkan,
          tgl_mulai: $scope.tglMulai,
          tgl_selesai: $scope.tglSelesai,
          penanggung_jawab: $scope.penanggungJawab,
          lengkap: $scope.lengkap,
          inves_lanjut: $scope.invesLanjut,
          grading_risiko: $scope.gradingRisiko
        },
        { headers: { Authorization: localStorage.getItem("token") } }
      )
      .then(
        function(data) {
          swal("Success!", "Data is successfully saved.", "success");
          window.history.back();
        },
        function(data) {
          swal("Error!", "Data is failed to be saved.", "error");
        }
      );
  };
  $scope.backToList = () => {
    window.history.back();
  };
});

sikatApp.controller("ikpInvesEditController", function(
  $scope,
  $rootScope,
  $routeParams,
  $http,
  pmkpService
) {
  $rootScope.currPage = "ikpInves";
  $scope.tglKejadian = $routeParams.tanggal;
  $scope.noRawat = $routeParams.noRawat;
  $scope.getData = () => {
    var url =
      SERVER_URL +
      "/api/ikpInves?id=" +
      $scope.tglKejadian +
      ";" +
      $scope.noRawat;
    $http
      .get(url, { headers: { Authorization: localStorage.getItem("token") } })
      .then(
        function(reqRes) {
          if (reqRes.data && reqRes.data != "") {
            $scope.lokasi = reqRes.data.lokasi;
            $scope.noRawat = reqRes.data.no_rawat;
            $scope.tglKejadian =
              reqRes.data.tgl_kejadian + " " + reqRes.data.jam_kejadian;
            $scope.penyebabLangsung = reqRes.data.penyebab_langsung;
            $scope.latarBelakang = reqRes.data.latar_belakang;
            $scope.rekomendasi = reqRes.data.rekomendasi;
            $scope.tindakanAkan = reqRes.data.tindakan_akan;
            $scope.tglMulai = reqRes.data.tgl_mulai;
            $scope.tglSelesai = reqRes.data.tgl_selesai;
            $scope.penanggungJawab = reqRes.data.penanggung_jawab;
            $scope.lengkap = reqRes.data.lengkap;
            $scope.invesLanjut = reqRes.data.inves_lanjut;
            $scope.gradingRisiko = reqRes.data.grading_risiko;
          }
        },
        function() {
          $.toast({
            heading: "Error",
            text:
              "Error happen when trying to get data on " +
              url +
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
  $scope.update = () => {
    $http
      .put(
        SERVER_URL + "/api/ikpInves",
        {
          id: $scope.tglKejadian + ";" + $scope.noRawat,
          no_rawat: $scope.noRawat,
          tgl_kejadian: $scope.tglKejadian,
          penyebab_langsung: $scope.penyebabLangsung,
          latar_belakang: $scope.latarBelakang,
          rekomendasi: $scope.rekomendasi,
          tindakan_akan: $scope.tindakanAkan,
          tgl_mulai: $scope.tglMulai,
          tgl_selesai: $scope.tglSelesai,
          penanggung_jawab: $scope.penanggungJawab,
          lengkap: $scope.lengkap,
          inves_lanjut: $scope.invesLanjut,
          grading_risiko: $scope.gradingRisiko
        },
        { headers: { Authorization: localStorage.getItem("token") } }
      )
      .then(
        function(data) {
          swal("Success!", "Data is successfully updated.", "success");
          window.history.back();
        },
        function(data) {
          swal("Error!", "Data is failed to be updated.", "error");
        }
      );
  };
  $scope.delete = () => {
    var url =
      SERVER_URL +
      "/api/ikpInves/delete?id=" +
      $scope.tglKejadian +
      ";" +
      $scope.noRawat;
    $http
      .get(url, { headers: { Authorization: localStorage.getItem("token") } })
      .then(
        function(reqRes) {
          if (reqRes.data && reqRes.data != "") {
            swal("Success!", "Data is successfully updated.", "success");
            window.history.back();
          }
        },
        function() {
          $.toast({
            heading: "Error",
            text:
              "Error happen when trying to delete data on " +
              url +
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
  $scope.downloadExcel = () => {
    const data = {
      direkturName: localStorage.getItem("nama_direktur"),
      direkturNip: localStorage.getItem("nip_direktur"),
      rsName: localStorage.getItem("nama_rumah_sakit"),
      lokasi: $scope.lokasi,
      noRawat: $scope.noRawat,
      tglKejadian: $scope.tglKejadian,
      penyebabLangsung: $scope.penyebabLangsung,
      latarBelakang: $scope.latarBelakang,
      rekomendasi: $scope.rekomendasi,
      tindakanAkan: $scope.tindakanAkan,
      tglMulai: $scope.tglMulai,
      tglSelesai: $scope.tglSelesai,
      penanggungJawab: $scope.penanggungJawab,
      lengkap: $scope.lengkap,
      invesLanjut: $scope.invesLanjut,
      gradingRisiko: $scope.gradingRisiko
    };
    const url = REPORT_URL + "/xlsx/ikpInves";
    pmkpService.postDownload(url, data, "ikpInves.xlsx");
  };
  $scope.backToList = () => {
    window.history.back();
  };
  $scope.getData();
});

sikatApp.controller("ikpInvesReportHarianController", function(
  $scope,
  $rootScope,
  $http,
  $filter,
  $location,
  $routeParams
) {
  $rootScope.currPage = "ikpInvesReportHarian";
  $scope.noRekamMedis = "";
  $scope.namaPasien = "";
  $scope.namaDokter = "";
  $scope.tanggalDari = "";
  $scope.tanggalSampai = "";
  $scope.noRawat = "";
  if ($routeParams.noRawat) $scope.noRawat = $routeParams.noRawat;
  if ($routeParams.noRekamMedis)
    $scope.noRekamMedis = $routeParams.noRekamMedis;
  if ($routeParams.namaPasien) $scope.namaPasien = $routeParams.namaPasien;
  if ($routeParams.namaDokter) $scope.namaDokter = $routeParams.namaDokter;
  if ($routeParams.tanggalDari) $scope.tanggalDari = $routeParams.tanggalDari;
  if ($routeParams.tanggalSampai)
    $scope.tanggalSampai = $routeParams.tanggalSampai;

  $scope.loadData = () => {
    $location.url(
      "/ppi_report_harian?tanggalDari=" +
        ($scope.tanggalDari ? $scope.tanggalDari : "") +
        "&tanggalSampai=" +
        ($scope.tanggalSampai ? $scope.tanggalSampai : "") +
        "&noRekamMedis=" +
        $scope.noRekamMedis +
        "&namaPasien=" +
        $scope.namaPasien +
        "&namaDokter=" +
        $scope.namaDokter +
        "&noRawat=" +
        $scope.noRawat
    );
  };
  $scope.downloadData = () => {
    $("#tableIkpInvesHarian").jexcel("download");
  };
  $scope.getData = () => {
    $rootScope.loading = true;
    var url = SERVER_URL + "/api/ikpInves/reportHarianByQuery?q=0";
    if ($scope.noRawat) url += "&noRawat=" + $scope.noRawat;
    if ($scope.noRekamMedis) url += "&noRekamMedis=" + $scope.noRekamMedis;
    if ($scope.namaPasien) url += "&namaPasien=" + $scope.namaPasien;
    if ($scope.namaDokter) url += "&namaDokter=" + $scope.namaDokter;
    if ($scope.tanggalDari)
      url +=
        "&tanggalDari=" + $filter("date")($scope.tanggalDari, "yyyy-MM-dd");
    if ($scope.tanggalSampai)
      url +=
        "&tanggalSampai=" + $filter("date")($scope.tanggalSampai, "yyyy-MM-dd");

    $http
      .get(url, { headers: { Authorization: localStorage.getItem("token") } })
      .then(
        function(reqRes) {
          var dataList = reqRes.data;
          data = [];
          if (dataList && dataList != "") {
            for (var i = 0; i < dataList.length; i += 1) {
              var datum = dataList[i];
              data.push([
                datum.no_rkm_medis,
                datum.nm_pasien,
                datum.kd_dokter
                  ? datum.kd_dokter + " - " + datum.nm_dokter
                  : "",
                datum.tanggal,
                datum.kd_kamar ? datum.kd_kamar + " " + datum.nm_bangsal : ""
              ]);
            }
          }
          var colHeaders = [
            "No R.M",
            "Nama Pasien",
            "Nama Dokter",
            "Tanggal",
            "Kamar/Bangsal"
          ];
          var colWidths = [90, 250, 200, 100, 250];
          var colAlignments = ["left", "left", "center", "center", "left"];
          var columns = [
            { type: "text", wordWrap: true, readOnly: true },
            { type: "text", wordWrap: true, readOnly: true },
            { type: "text", wordWrap: true, readOnly: true },
            { type: "text", wordWrap: true, readOnly: true },
            { type: "text", wordWrap: true, readOnly: true }
          ];
          $("#tableIkpInvesHarian").jexcel("destroyAll");
          $("#tableIkpInvesHarian").jexcel({
            data: data,
            colHeaders,
            colWidths,
            colAlignments,
            columns,
            tableOverflow: true,
            tableHeight: "500px",
            csvHeaders: true
          });
          $rootScope.loading = false;
        },
        function() {
          $.toast({
            heading: "Error",
            text:
              "Error happen when trying to get data on " +
              url +
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
  $scope.getData();
});
