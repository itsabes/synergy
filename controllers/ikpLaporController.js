sikatApp.controller("ikpLaporController", function(
  $scope,
  $rootScope,
  $http,
  $filter,
  $location,
  $routeParams,
  NgTableParams
) {
  $rootScope.currPage = "ikpLapor";
  $rootScope.currPageParam = $routeParams.param;
  $scope.noRawat = "";
  $scope.noRekamMedis = "";
  $scope.namaPasien = "";
  $scope.namaDokter = "";
  $scope.tanggalDari = "";
  $scope.tanggalSampai = "";
  if ($routeParams.noRawat) $scope.noRawat = $routeParams.noRawat;
  if ($routeParams.noRekamMedis)
    $scope.noRekamMedis = $routeParams.noRekamMedis;
  if ($routeParams.namaPasien) $scope.namaPasien = $routeParams.namaPasien;
  if ($routeParams.namaDokter) $scope.namaDokter = $routeParams.namaDokter;
  if ($routeParams.tanggalDari) $scope.tanggalDari = $routeParams.tanggalDari;
  if ($routeParams.tanggalSampai)
    $scope.tanggalSampai = $routeParams.tanggalSampai;

  $scope.addIkpLapor = (
    noRawat,
    noRekamMedis,
    namaPasien,
    namaDokter,
    kodeKamar,
    namaBangsal,
    umur,
    jenisKelamin,
    caraBayar,
    tglRegistrasi
  ) => {
    $location.url(
      "/ikpLapor_new?noRawat=" +
        noRawat +
        "&noRekamMedis=" +
        noRekamMedis +
        "&namaPasien=" +
        namaPasien +
        "&namaDokter=" +
        namaDokter +
        "&kodeKamar=" +
        kodeKamar +
        "&namaBangsal=" +
        namaBangsal +
        "&umur=" +
        umur +
        "&jenisKelamin=" +
        jenisKelamin +
        "&caraBayar=" +
        caraBayar +
        "&tglRegistrasi=" +
        tglRegistrasi +
        "&param=" +
        $rootScope.currPageParam
    );
  };
  $scope.showIkpLapor = (
    tanggal,
    noRawat,
    noRekamMedis,
    namaPasien,
    namaDokter,
    kodeKamar,
    namaBangsal,
    umur,
    jenisKelamin,
    caraBayar,
    tglRegistrasi
  ) => {
    $location.url(
      "/ikpLapor_edit?tanggal=" +
        tanggal +
        "&noRawat=" +
        noRawat +
        "&noRekamMedis=" +
        noRekamMedis +
        "&namaPasien=" +
        namaPasien +
        "&namaDokter=" +
        namaDokter +
        "&kodeKamar=" +
        kodeKamar +
        "&namaBangsal=" +
        namaBangsal +
        "&umur=" +
        umur +
        "&jenisKelamin=" +
        jenisKelamin +
        "&caraBayar=" +
        caraBayar +
        "&tglRegistrasi=" +
        tglRegistrasi +
        "&param=" +
        $rootScope.currPageParam
    );
  };

  $scope.tableParams = new NgTableParams({}, { dataset: [] });
  $scope.loadData = () => {
    $location.url(
      "/ikpLapor?tanggalDari=" +
        $scope.tanggalDari +
        "&tanggalSampai=" +
        $scope.tanggalSampai +
        "&noRawat=" +
        $scope.noRawat +
        "&noRekamMedis=" +
        $scope.noRekamMedis +
        "&namaPasien=" +
        $scope.namaPasien +
        "&namaDokter=" +
        $scope.namaDokter +
        "&param=" +
        $rootScope.currPageParam
    );
  };
  $scope.getData = () => {
    var url = SERVER_URL + "/api/ikpLapor/getByQuery?q=0";
    url += "&isRanap=" + ($rootScope.currPageParam == "ranap");
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
  $scope.getData();
});

sikatApp.controller("ikpLaporNewController", function(
  $scope,
  $rootScope,
  $routeParams,
  $http
) {
  $rootScope.currPage = "ikpLapor";
  $scope.noRawat = $routeParams.noRawat;
  $scope.noRekamMedis = $routeParams.noRekamMedis;
  $scope.namaPasien = $routeParams.namaPasien;
  $scope.namaDokter = $routeParams.namaDokter;
  $scope.kodeKamar =
    $routeParams.kodeKamar != "null" ? $routeParams.kodeKamar : "";
  $scope.umur = $routeParams.umur;
  $scope.jenisKelamin = $routeParams.jenisKelamin;
  $scope.caraBayar = $routeParams.caraBayar;
  $scope.tglRegistrasi = $routeParams.tglRegistrasi;
  $scope.petugasList = [];
  $scope.insidenList = [];
  $scope.lokasi = $routeParams.kodeKamar + " " + $routeParams.namaBangsal;
  $scope.kejadianSebelumnya = "TIDAK";
  $scope.insiden = "IK001";
  $scope.save = () => {
    $http
      .post(
        SERVER_URL + "/api/ikpLapor",
        {
          no_rawat: $scope.noRawat,
          nip: $scope.petugas,
          lokasi: $scope.lokasi,
          unit_terkait: $scope.unitTerkait,
          pertama_melaporkan: $scope.pertamaMelaporkan,
          unit_penyebab: $scope.unitPenyebab,
          kejadian_sebelumnya: $scope.kejadianSebelumnya,
          pencegahan_terulang: $scope.pencegahanTerulang,
          tgl_kejadian: $scope.tanggal,
          tgl_lapor: $scope.tanggalLapor,
          kode_insiden: $scope.insiden,
          identifikasi_masalah: $scope.identifikasi,
          akibat: $scope.akibat,
          tindakan_insiden: $scope.tindakanInsiden,
          rtl: $scope.rtl,
          nm_penerima: $scope.namaPenerima,
          tgl_terima: $scope.tanggalTerima,
          grading_risiko: $scope.gradingRisiko,
          jenis_insiden: $scope.jenisInsiden,
          nama_insiden: $scope.namaInsiden,
          skor_dampak: $scope.skorDampak,
          tipe_insiden: $scope.tipeInsiden,
          subtipe_insiden: $scope.subtipeInsiden,
          frekuensi_kejadian: $scope.frekuensiKejadian,
          tindakan_oleh: $scope.tindakanOleh
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
  $scope.onSelectedPetugas = item => {
    $scope.petugas = item.nip;
  };
  $scope.searchPetugas = function($select) {
    if ($select.search.length > 0) {
      return $http
        .get(SERVER_URL + "/api/ikpLapor/allPetugasByQuery", {
          params: {
            searchstr: $select.search
          },
          headers: { Authorization: localStorage.getItem("token") }
        })
        .then(function(response) {
          $scope.petugasList = response.data;
        });
    }
    return false;
  };
  $scope.onSelectedInsiden = item => {
    $scope.insiden = item.kode_insiden;
  };
  $scope.searchInsiden = function($select) {
    if ($select.search.length > 0) {
      return $http
        .get(SERVER_URL + "/api/ikpLapor/allInsidenByQuery", {
          params: {
            searchstr: $select.search
          },
          headers: { Authorization: localStorage.getItem("token") }
        })
        .then(function(response) {
          $scope.insidenList = response.data;
        });
    }
    return false;
  };
  $scope.backToList = () => {
    window.history.back();
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
});

sikatApp.controller("ikpLaporEditController", function(
  $scope,
  $rootScope,
  $routeParams,
  $http,
  pmkpService
) {
  $rootScope.currPage = "ikp";
  $scope.tanggal = $routeParams.tanggal;
  $scope.noRawat = $routeParams.noRawat;
  $scope.noRekamMedis = $routeParams.noRekamMedis;
  $scope.namaPasien = $routeParams.namaPasien;
  $scope.namaDokter = $routeParams.namaDokter;
  $scope.kodeKamar =
    $routeParams.kodeKamar != "null" ? $routeParams.kodeKamar : "";
  $scope.umur = $routeParams.umur;
  $scope.jenisKelamin = $routeParams.jenisKelamin;
  $scope.caraBayar = $routeParams.caraBayar;
  $scope.tglRegistrasi = $routeParams.tglRegistrasi;
  $scope.petugasList = [];
  $scope.insidenList = [];
  $scope.petugasObj = {};
  $scope.insidenObj = {};
  $scope.insiden = "IK001";

  $scope.getData = () => {
    var url =
      SERVER_URL + "/api/ikpLapor?id=" + $scope.tanggal + ";" + $scope.noRawat;
    $http
      .get(url, { headers: { Authorization: localStorage.getItem("token") } })
      .then(
        function(reqRes) {
          if (reqRes.data && reqRes.data != "") {
            $scope.noRawat = reqRes.data.no_rawat;
            $scope.petugas = reqRes.data.nip;
            $scope.lokasi = reqRes.data.lokasi;
            $scope.unitTerkait = reqRes.data.unit_terkait;
            $scope.pertamaMelaporkan = reqRes.data.pertama_melaporkan;
            $scope.unitPenyebab = reqRes.data.unit_penyebab;
            $scope.kejadianSebelumnya = reqRes.data.kejadian_sebelumnya;
            $scope.pencegahanTerulang = reqRes.data.pencegahan_terulang;
            $scope.tanggal =
              reqRes.data.tgl_kejadian + " " + reqRes.data.jam_kejadian;
            $scope.tanggalLapor =
              reqRes.data.tgl_lapor + " " + reqRes.data.jam_lapor;
            $scope.insiden = reqRes.data.kode_insiden;
            $scope.identifikasi = reqRes.data.identifikasi_masalah;
            $scope.akibat = reqRes.data.akibat;
            $scope.tindakanInsiden = reqRes.data.tindakan_insiden;
            $scope.rtl = reqRes.data.rtl;
            $scope.namaPenerima = reqRes.data.nm_penerima;
            $scope.tanggalTerima = reqRes.data.tgl_terima;
            $scope.gradingRisiko = reqRes.data.grading_risiko;
            $scope.petugasObj.selected = {
              nip: reqRes.data.nip,
              nama: reqRes.data.nama
            };
            $scope.insidenObj.selected = {
              kode_insiden: reqRes.data.kode_insiden,
              nama_insiden: reqRes.data.nama_insiden,
              jenis_insiden: reqRes.data.jenis_insiden,
              dampak: reqRes.data.dampak
            };
            $scope.jenisInsiden = reqRes.data.jenis_insiden;
            $scope.namaInsiden = reqRes.data.nama_insiden;
            $scope.skorDampak = reqRes.data.skor_dampak;
            $scope.tipeInsiden = reqRes.data.tipe_insiden;
            $scope.subtipeInsiden = reqRes.data.subtipe_insiden;
            $scope.frekuensiKejadian = reqRes.data.frekuensi_kejadian;
            $scope.tindakanOleh = reqRes.data.tindakan_oleh;
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
        SERVER_URL + "/api/ikpLapor",
        {
          id: $scope.tanggal + ";" + $scope.noRawat,
          no_rawat: $scope.noRawat,
          nip: $scope.petugas,
          lokasi: $scope.lokasi,
          unit_terkait: $scope.unitTerkait,
          pertama_melaporkan: $scope.pertamaMelaporkan,
          unit_penyebab: $scope.unitPenyebab,
          kejadian_sebelumnya: $scope.kejadianSebelumnya,
          pencegahan_terulang: $scope.pencegahanTerulang,
          tgl_kejadian: $scope.tanggal,
          tgl_lapor: $scope.tanggalLapor,
          kode_insiden: $scope.insiden,
          identifikasi_masalah: $scope.identifikasi,
          akibat: $scope.akibat,
          tindakan_insiden: $scope.tindakanInsiden,
          rtl: $scope.rtl,
          nm_penerima: $scope.namaPenerima,
          tgl_terima: $scope.tanggalTerima,
          grading_risiko: $scope.gradingRisiko,
          jenis_insiden: $scope.jenisInsiden,
          nama_insiden: $scope.namaInsiden,
          skor_dampak: $scope.skorDampak,
          tipe_insiden: $scope.tipeInsiden,
          subtipe_insiden: $scope.subtipeInsiden,
          frekuensi_kejadian: $scope.frekuensiKejadian,
          tindakan_oleh: $scope.tindakanOleh
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
      "/api/ikpLapor/delete?id=" +
      $scope.tanggal +
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
      noRawat: $scope.noRawat,
      lokasi: $scope.lokasi,
      unitTerkait: $scope.unitTerkait,
      pertamaMelaporkan: $scope.pertamaMelaporkan,
      unitPenyebab: $scope.unitPenyebab,
      kejadianSebelumnya: $scope.kejadianSebelumnya,
      pencegahanTerulang: $scope.pencegahanTerulang,
      tanggal: $scope.tanggal,
      tanggalLapor: $scope.tanggalLapor,
      insiden: $scope.insiden,
      identifikasi: $scope.identifikasi,
      akibat: $scope.akibat,
      tindakanInsiden: $scope.tindakanInsiden,
      rtl: $scope.rtl,
      namaPenerima: $scope.namaPenerima,
      tanggalTerima: $scope.tanggalTerima,
      gradingRisiko: $scope.gradingRisiko,
      petugas: $scope.petugasObj.selected
        ? $scope.petugasObj.selected.nip +
          " - " +
          $scope.petugasObj.selected.nama
        : "", // nip nama
      jenisInsiden: $scope.jenisInsiden,
      namaInsiden: $scope.namaInsiden,
      skorDampak: $scope.skorDampak,
      tipeInsiden: $scope.tipeInsiden,
      subtipeInsiden: $scope.subtipeInsiden,
      frekuensiKejadian: $scope.frekuensiKejadian,
      tindakanOleh: $scope.tindakanOleh,

      noRekamMedis: $scope.noRekamMedis,
      namaPasien: $scope.namaPasien,
      namaDokter: $scope.namaDokter,
      kodeKamar: $scope.kodeKamar,
      umur: $scope.umur,
      jenisKelamin: $scope.jenisKelamin,
      caraBayar: $scope.caraBayar,
      tglRegistrasi: $scope.tglRegistrasi
    };
    for (let i = 0; i < $scope.jenisInsidenList.length; i += 1) {
      if ($scope.jenisInsidenList[i].id === $scope.jenisInsiden) {
        data.jenisInsiden =
          $scope.jenisInsidenList[i].id +
          " - " +
          $scope.jenisInsidenList[i].nama;
        break;
      }
    }
    for (let i = 0; i < $scope.namaInsidenList.length; i += 1) {
      if ($scope.namaInsidenList[i].id === $scope.namaInsiden) {
        data.namaInsiden =
          $scope.namaInsidenList[i].id + " - " + $scope.namaInsidenList[i].nama;
        break;
      }
    }
    for (let i = 0; i < $scope.skorDampakList.length; i += 1) {
      if ($scope.skorDampakList[i].id === $scope.skorDampak) {
        data.skorDampak =
          $scope.skorDampakList[i].id + " - " + $scope.skorDampakList[i].nama;
        break;
      }
    }
    for (let i = 0; i < $scope.tipeInsidenList.length; i += 1) {
      if ($scope.tipeInsidenList[i].id === $scope.tipeInsiden) {
        data.tipeInsiden =
          $scope.tipeInsidenList[i].id + " - " + $scope.tipeInsidenList[i].nama;
        break;
      }
    }
    for (let i = 0; i < $scope.subtipeInsidenList.length; i += 1) {
      if ($scope.subtipeInsidenList[i].id === $scope.subtipeInsiden) {
        data.subtipeInsiden =
          $scope.subtipeInsidenList[i].id +
          " - " +
          $scope.subtipeInsidenList[i].nama;
        break;
      }
    }
    for (let i = 0; i < $scope.frekuensiKejadianList.length; i += 1) {
      if ($scope.frekuensiKejadianList[i].id === $scope.frekuensiKejadian) {
        data.frekuensiKejadian =
          $scope.frekuensiKejadianList[i].id +
          " - " +
          $scope.frekuensiKejadianList[i].nama;
        break;
      }
    }
    for (let i = 0; i < $scope.tindakanOlehList.length; i += 1) {
      if ($scope.tindakanOlehList[i].id === $scope.tindakanOleh) {
        data.tindakanOleh =
          $scope.tindakanOlehList[i].id +
          " - " +
          $scope.tindakanOlehList[i].nama;
        break;
      }
    }
    const url = REPORT_URL + "/xlsx/ikpLapor";
    pmkpService.postDownload(url, data, "ikpLapor.xlsx");
  };
  $scope.onSelectedPetugas = item => {
    $scope.petugas = item.nip;
  };
  $scope.onTaggingPetugas = namaPetugas => {
    return {
      nip: namaPetugas,
      nama: ""
    };
  };
  $scope.searchPetugas = function($select) {
    if ($select.search.length > 0) {
      return $http
        .get(SERVER_URL + "/api/ikpLapor/allPetugasByQuery", {
          params: {
            searchstr: $select.search
          },
          headers: { Authorization: localStorage.getItem("token") }
        })
        .then(function(response) {
          $scope.petugasList = response.data;
        });
    }
    return false;
  };
  $scope.onSelectedInsiden = item => {
    $scope.insiden = item.kode_insiden;
  };
  $scope.searchInsiden = function($select) {
    if ($select.search.length > 0) {
      return $http
        .get(SERVER_URL + "/api/ikpLapor/allInsidenByQuery", {
          params: {
            searchstr: $select.search
          },
          headers: { Authorization: localStorage.getItem("token") }
        })
        .then(function(response) {
          $scope.insidenList = response.data;
        });
    }
    return false;
  };
  $scope.backToList = () => {
    window.history.back();
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

sikatApp.controller("ikpLaporReportHarianController", function(
  $scope,
  $rootScope,
  $http,
  $filter,
  $location,
  $routeParams
) {
  $rootScope.currPage = "ikpLaporReportHarian";
  $scope.noRawat = "";
  $scope.noRekamMedis = "";
  $scope.namaPasien = "";
  $scope.namaDokter = "";
  $scope.tanggalDari = "";
  $scope.tanggalSampai = "";
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
      "/ikpLapor_report_harian?tanggalDari=" +
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
    $("#tableIkpLaporHarian").jexcel("download", "IKP Laporan Harian", "IKP");
  };
  $scope.getData = () => {
    $rootScope.loading = true;
    var url = SERVER_URL + "/api/ikpLapor/reportHarianByQuery?q=0";
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
                datum.no_rawat,
                datum.tgl_kejadian,
                datum.jam_kejadian,
                datum.no_rkm_medis,
                datum.nm_pasien,
                datum.umur,
                datum.jenis_kelamin,
                datum.kd_dokter
                  ? datum.kd_dokter + " - " + datum.nm_dokter
                  : "",
                datum.kd_kamar ? datum.kd_kamar + " " + datum.nm_bangsal : "",
                datum.tgl_registrasi ? datum.tgl_registrasi : "",
                datum.cara_bayar ? datum.cara_bayar : "",
                datum.petugas ? datum.petugas : "",
                datum.lokasi ? datum.lokasi : "",
                datum.unit_terkait ? datum.unit_terkait : "",
                datum.pertama_melaporkan ? datum.pertama_melaporkan : "",
                datum.unit_penyebab ? datum.unit_penyebab : "",
                datum.kejadian_sebelumnya ? datum.kejadian_sebelumnya : "",
                datum.pencegahan_terulang ? datum.pencegahan_terulang : "",
                datum.jenis_insiden ? datum.jenis_insiden_d : "",
                datum.nama_insiden ? datum.nama_insiden_d : "",
                datum.skor_dampak ? datum.skor_dampak_d : "",
                datum.tgl_lapor ? datum.tgl_lapor : "",
                datum.jam_lapor ? datum.jam_lapor : "",
                datum.frekuensi_kejadian ? datum.frekuensi_kejadian_d : "",
                datum.identifikasi_masalah ? datum.identifikasi_masalah : "",
                datum.akibat ? datum.akibat : "",
                datum.tindakan_insiden ? datum.tindakan_insiden : "",
                datum.rtl ? datum.rtl : "",
                datum.tindakan_oleh ? datum.tindakan_oleh_d : "",
                datum.nm_penerima ? datum.nm_penerima : "",
                datum.tgl_terima ? datum.tgl_terima : ""
              ]);
            }
          }
          var colHeaders = [
            "No Rawat",
            "Tgl Kejadian",
            "Jam Kejadian",
            "No R.M",
            "Nama Pasien",
            "Umur",
            "Jenis Kelamin",
            "Nama Dokter",
            "Kamar/Bangsal",
            "Tgl Registrasi",
            "Cara Bayar",
            "Petugas",
            "Lokasi Insiden",
            "Unit Terkait",
            "Orang Pertama yg Melaporkan",
            "Unit Kerja Penyebab",
            "Pernah Terjadi di Unit Kerja Lain?",
            "Kapan? dan langkah apa yang telah diambil untuk mencegah terulang?",
            "Jenis Insiden",
            "Nama Insiden",
            "Skor Dampak",
            "Tanggal Lapor",
            "Jam Lapor",
            "Frekuensi Kejadian",
            "Kronologis",
            "Akibat Insiden",
            "Tindakan yang dilakukan setelah Insiden",
            "Tindak Lanjut",
            "Tindakan Oleh",
            "Nama Penerima",
            "Tgl Terima"
          ];
          var colWidths = [
            250,
            100,
            100,
            90,
            300,
            200,
            90,
            300,
            300,
            100,
            100,
            200,
            200,
            200,
            200,
            200,
            200,
            400,
            200,
            200,
            200,
            200,
            200,
            200,
            400,
            400,
            400,
            400,
            200,
            200,
            200
          ];
          var colAlignments = [
            "left",
            "left",
            "left",
            "left",
            "left",
            "left",
            "left",
            "left",
            "left",
            "left",
            "left",
            "left",
            "left",
            "left",
            "left",
            "left",
            "left",
            "left",
            "left",
            "left",
            "left",
            "left",
            "left",
            "left",
            "left",
            "left",
            "left",
            "left",
            "left",
            "left",
            "left"
          ];
          var columns = [
            { type: "text", wordWrap: true, readOnly: true },
            { type: "text", wordWrap: true, readOnly: true },
            { type: "text", wordWrap: true, readOnly: true },
            { type: "text", wordWrap: true, readOnly: true },
            { type: "text", wordWrap: true, readOnly: true },
            { type: "text", wordWrap: true, readOnly: true },
            { type: "text", wordWrap: true, readOnly: true },
            { type: "text", wordWrap: true, readOnly: true },
            { type: "text", wordWrap: true, readOnly: true },
            { type: "text", wordWrap: true, readOnly: true },
            { type: "text", wordWrap: true, readOnly: true },
            { type: "text", wordWrap: true, readOnly: true },
            { type: "text", wordWrap: true, readOnly: true },
            { type: "text", wordWrap: true, readOnly: true },
            { type: "text", wordWrap: true, readOnly: true },
            { type: "text", wordWrap: true, readOnly: true },
            { type: "text", wordWrap: true, readOnly: true },
            { type: "text", wordWrap: true, readOnly: true },
            { type: "text", wordWrap: true, readOnly: true },
            { type: "text", wordWrap: true, readOnly: true },
            { type: "text", wordWrap: true, readOnly: true },
            { type: "text", wordWrap: true, readOnly: true },
            { type: "text", wordWrap: true, readOnly: true },
            { type: "text", wordWrap: true, readOnly: true },
            { type: "text", wordWrap: true, readOnly: true },
            { type: "text", wordWrap: true, readOnly: true },
            { type: "text", wordWrap: true, readOnly: true },
            { type: "text", wordWrap: true, readOnly: true },
            { type: "text", wordWrap: true, readOnly: true },
            { type: "text", wordWrap: true, readOnly: true },
            { type: "text", wordWrap: true, readOnly: true }
          ];
          $("#tableIkpLaporHarian").jexcel("destroyAll");
          $("#tableIkpLaporHarian").jexcel({
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
