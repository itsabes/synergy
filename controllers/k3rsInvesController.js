sikatApp.controller("k3rsInvesController", function(
  $scope,
  $rootScope,
  $http,
  $filter,
  $location,
  $routeParams,
  NgTableParams
) {
  $rootScope.currPage = "k3rsInves";
  $scope.noRkmMedis = "";
  $scope.lokasi = "";
  $scope.pekerjaan = "";
  $scope.namaPasien = "";
  $scope.tanggalDari = "";
  $scope.tanggalSampai = "";
  if ($routeParams.noRkmMedis) $scope.noRkmMedis = $routeParams.noRkmMedis;
  if ($routeParams.lokasi) $scope.lokasi = $routeParams.lokasi;
  if ($routeParams.pekerjaan) $scope.pekerjaan = $routeParams.pekerjaan;
  if ($routeParams.namaPasien) $scope.namaPasien = $routeParams.namaPasien;
  if ($routeParams.tanggalDari) $scope.tanggalDari = $routeParams.tanggalDari;
  if ($routeParams.tanggalSampai)
    $scope.tanggalSampai = $routeParams.tanggalSampai;

  $scope.addK3rsInves = (tanggal, noRkmMedis, namaSaksi, pekerjaan) => {
    $location.url(
      "/k3rsInves_new?tanggal=" +
        tanggal +
        "&noRkmMedis=" +
        noRkmMedis +
        "&namaSaksi=" +
        namaSaksi +
        "&pekerjaan=" +
        pekerjaan
    );
  };
  $scope.showK3rsInves = (tanggal, noRkmMedis, namaSaksi, pekerjaan) => {
    $location.url(
      "/k3rsInves_edit?tanggal=" +
        tanggal +
        "&noRkmMedis=" +
        noRkmMedis +
        "&namaSaksi=" +
        namaSaksi +
        "&pekerjaan=" +
        pekerjaan
    );
  };

  $scope.tableParams = new NgTableParams({}, { dataset: [] });
  $scope.loadData = () => {
    $location.url(
      "/k3rsInves?tanggalDari=" +
        $scope.tanggalDari +
        "&tanggalSampai=" +
        $scope.tanggalSampai +
        "&noRkmMedis=" +
        $scope.noRkmMedis +
        "&lokasi=" +
        $scope.lokasi +
        "&pekerjaan=" +
        $scope.pekerjaan +
        "&namaPasien=" +
        $scope.namaPasien
    );
  };
  $scope.getData = () => {
    var url = SERVER_URL + "/api/k3rsInves/getByQuery?q=0";
    if ($scope.noRkmMedis) url += "&noRkmMedis=" + $scope.noRkmMedis;
    if ($scope.lokasi) url += "&lokasi=" + $scope.lokasi;
    if ($scope.pekerjaan) url += "&pekerjaan=" + $scope.pekerjaan;
    if ($scope.namaPasien) url += "&namaPasien=" + $scope.namaPasien;
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

sikatApp.controller("k3rsInvesNewController", function(
  $scope,
  $rootScope,
  $routeParams,
  $http
) {
  $rootScope.currPage = "k3rsInves";
  $scope.tglKejadian = $routeParams.tanggal;
  $scope.noRkmMedis = $routeParams.noRkmMedis;
  $scope.namaSaksi = $routeParams.namaSaksi;
  $scope.pekerjaan = $routeParams.pekerjaan;
  $scope.save = () => {
    $http
      .post(
        SERVER_URL + "/api/k3rsInves",
        {
          no_rkm_medis: $scope.noRkmMedis,
          tgl_kejadian: $scope.tglKejadian,
          kondisi: $scope.kondisi,
          tindakan: $scope.tindakan,
          pribadi: $scope.pribadi,
          kurang_prosedur: $scope.kurangProsedur,
          kurang_sarana: $scope.kurangSarana,
          kurang_taat: $scope.kurangTaat,
          rencana_tindakan1: $scope.rencanaTindakan1,
          rencana_tindakan2: $scope.rencanaTindakan2,
          rencana_tindakan3: $scope.rencanaTindakan3,
          rencana_tindakan4: $scope.rencanaTindakan4,
          rencana_tindakan5: $scope.rencanaTindakan5,
          rencana_tindakan6: $scope.rencanaTindakan6,
          rencana_tindakan7: $scope.rencanaTindakan7,
          target1: $scope.target1,
          target2: $scope.target2,
          target3: $scope.target3,
          target4: $scope.target4,
          target5: $scope.target5,
          target6: $scope.target6,
          target7: $scope.target7,
          wewenang1: $scope.wewenang1,
          wewenang2: $scope.wewenang2,
          wewenang3: $scope.wewenang3,
          wewenang4: $scope.wewenang4,
          wewenang5: $scope.wewenang5,
          wewenang6: $scope.wewenang6,
          wewenang7: $scope.wewenang7,
          nm_penanggung: $scope.namaPenanggung,
          nm_kasir: $scope.namaKasir,
          tgl_paraf_saksi: $scope.tglParafSaksi,
          tgl_paraf_penanggung: $scope.tglParafPenanggung,
          tgl_paraf_kasir: $scope.tglParafKasir
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

sikatApp.controller("k3rsInvesEditController", function(
  $scope,
  $rootScope,
  $routeParams,
  $http,
  pmkpService
) {
  $rootScope.currPage = "k3rsInves";
  $scope.tglKejadian = $routeParams.tanggal;
  $scope.noRkmMedis = $routeParams.noRkmMedis;
  $scope.namaSaksi = $routeParams.namaSaksi;
  $scope.pekerjaan = $routeParams.pekerjaan;
  $scope.getData = () => {
    var url =
      SERVER_URL +
      "/api/k3rsInves?id=" +
      $scope.tglKejadian +
      ";" +
      $scope.noRkmMedis;
    $http
      .get(url, { headers: { Authorization: localStorage.getItem("token") } })
      .then(
        function(reqRes) {
          if (reqRes.data && reqRes.data != "") {
            $scope.noRkmMedis = reqRes.data.no_rkm_medis;
            $scope.tglKejadian =
              reqRes.data.tgl_kejadian + " " + reqRes.data.jam_kejadian;
            $scope.kondisi = reqRes.data.kondisi;
            $scope.tindakan = reqRes.data.tindakan;
            $scope.pribadi = reqRes.data.pribadi;
            $scope.kurangProsedur = reqRes.data.kurang_prosedur;
            $scope.kurangSarana = reqRes.data.kurang_sarana;
            $scope.kurangTaat = reqRes.data.kurang_taat;
            $scope.rencanaTindakan1 = reqRes.data.rencana_tindakan1;
            $scope.rencanaTindakan2 = reqRes.data.rencana_tindakan2;
            $scope.rencanaTindakan3 = reqRes.data.rencana_tindakan3;
            $scope.rencanaTindakan4 = reqRes.data.rencana_tindakan4;
            $scope.rencanaTindakan5 = reqRes.data.rencana_tindakan5;
            $scope.rencanaTindakan6 = reqRes.data.rencana_tindakan6;
            $scope.rencanaTindakan7 = reqRes.data.rencana_tindakan7;
            $scope.target1 = reqRes.data.target1;
            $scope.target2 = reqRes.data.target2;
            $scope.target3 = reqRes.data.target3;
            $scope.target4 = reqRes.data.target4;
            $scope.target5 = reqRes.data.target5;
            $scope.target6 = reqRes.data.target6;
            $scope.target7 = reqRes.data.target7;
            $scope.wewenang1 = reqRes.data.wewenang1;
            $scope.wewenang2 = reqRes.data.wewenang2;
            $scope.wewenang3 = reqRes.data.wewenang3;
            $scope.wewenang4 = reqRes.data.wewenang4;
            $scope.wewenang5 = reqRes.data.wewenang5;
            $scope.wewenang6 = reqRes.data.wewenang6;
            $scope.wewenang7 = reqRes.data.wewenang7;
            $scope.namaPenanggung = reqRes.data.nm_penanggung;
            $scope.namaKasir = reqRes.data.nm_kasir;
            $scope.tglParafSaksi = reqRes.data.tgl_paraf_saksi;
            $scope.tglParafPenanggung = reqRes.data.tgl_paraf_penanggung;
            $scope.tglParafKasir = reqRes.data.tgl_paraf_kasir;
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
        SERVER_URL + "/api/k3rsInves",
        {
          id: $scope.tglKejadian + ";" + $scope.noRkmMedis,
          no_rkm_medis: $scope.noRkmMedis,
          tgl_kejadian: $scope.tglKejadian,
          kondisi: $scope.kondisi,
          tindakan: $scope.tindakan,
          pribadi: $scope.pribadi,
          kurang_prosedur: $scope.kurangProsedur,
          kurang_sarana: $scope.kurangSarana,
          kurang_taat: $scope.kurangTaat,
          rencana_tindakan1: $scope.rencanaTindakan1,
          rencana_tindakan2: $scope.rencanaTindakan2,
          rencana_tindakan3: $scope.rencanaTindakan3,
          rencana_tindakan4: $scope.rencanaTindakan4,
          rencana_tindakan5: $scope.rencanaTindakan5,
          rencana_tindakan6: $scope.rencanaTindakan6,
          rencana_tindakan7: $scope.rencanaTindakan7,
          target1: $scope.target1,
          target2: $scope.target2,
          target3: $scope.target3,
          target4: $scope.target4,
          target5: $scope.target5,
          target6: $scope.target6,
          target7: $scope.target7,
          wewenang1: $scope.wewenang1,
          wewenang2: $scope.wewenang2,
          wewenang3: $scope.wewenang3,
          wewenang4: $scope.wewenang4,
          wewenang5: $scope.wewenang5,
          wewenang6: $scope.wewenang6,
          wewenang7: $scope.wewenang7,
          nm_penanggung: $scope.namaPenanggung,
          nm_kasir: $scope.namaKasir,
          tgl_paraf_saksi: $scope.tglParafSaksi,
          tgl_paraf_penanggung: $scope.tglParafPenanggung,
          tgl_paraf_kasir: $scope.tglParafKasir
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
      "/api/k3rsInves/delete?id=" +
      $scope.tglKejadian +
      ";" +
      $scope.noRkmMedis;
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
  $scope.report = () => {
    var tglWaktuKejadian = $scope.tglKejadian.split(" ");
    var tgl_kejadian = tglWaktuKejadian[0];
    var waktu_kejadian = "";
    if (tglWaktuKejadian.length > 1) {
      waktu_kejadian = tglWaktuKejadian[1];
    }
    const data = {
      unit: $scope.currPage,
      no_rkm_medis: $scope.noRkmMedis ? $scope.noRkmMedis : "",
      tgl_kejadian,
      nm_korban: "",
      usia: "",
      jenis_kelamin: "",
      jabatan: "",
      waktu_kejadian,
      kondisi: $scope.kondisi ? $scope.kondisi : "",
      tindakan: $scope.tindakan ? $scope.tindakan : "",
      pribadi: $scope.pribadi ? $scope.pribadi : "",
      pekerjaan: $scope.pekerjaan ? $scope.pekerjaan : "",
      kurang_prosedur: $scope.kurangProsedur ? $scope.kurangProsedur : "",
      kurang_sarana: $scope.kurangSarana ? $scope.kurangSarana : "",
      kurang_taat: $scope.kurangTaat ? $scope.kurangTaat : "",
      rencana_tindakan1: $scope.rencanaTindakan1 ? $scope.rencanaTindakan1 : "",
      rencana_tindakan2: $scope.rencanaTindakan2 ? $scope.rencanaTindakan2 : "",
      rencana_tindakan3: $scope.rencanaTindakan3 ? $scope.rencanaTindakan3 : "",
      rencana_tindakan4: $scope.rencanaTindakan4 ? $scope.rencanaTindakan4 : "",
      rencana_tindakan5: $scope.rencanaTindakan5 ? $scope.rencanaTindakan5 : "",
      rencana_tindakan6: $scope.rencanaTindakan6 ? $scope.rencanaTindakan6 : "",
      rencana_tindakan7: $scope.rencanaTindakan7 ? $scope.rencanaTindakan7 : "",
      target1: $scope.target1 ? $scope.target1 : "",
      target2: $scope.target2 ? $scope.target2 : "",
      target3: $scope.target3 ? $scope.target3 : "",
      target4: $scope.target4 ? $scope.target4 : "",
      target5: $scope.target5 ? $scope.target5 : "",
      target6: $scope.target6 ? $scope.target6 : "",
      target7: $scope.target7 ? $scope.target7 : "",
      wewenang1: $scope.wewenang1 ? $scope.wewenang1 : "",
      wewenang2: $scope.wewenang2 ? $scope.wewenang2 : "",
      wewenang3: $scope.wewenang3 ? $scope.wewenang3 : "",
      wewenang4: $scope.wewenang4 ? $scope.wewenang4 : "",
      wewenang5: $scope.wewenang5 ? $scope.wewenang5 : "",
      wewenang6: $scope.wewenang6 ? $scope.wewenang6 : "",
      wewenang7: $scope.wewenang7 ? $scope.wewenang7 : "",
      nm_penanggung: $scope.namaPenanggung ? $scope.namaPenanggung : "",
      nm_kasir: $scope.namaKasir ? $scope.namaKasir : "",
      tgl_paraf_saksi: $scope.tglParafSaksi ? $scope.tglParafSaksi : "",
      tgl_paraf_penanggung: $scope.tglParafPenanggung
        ? $scope.tglParafPenanggung
        : "",
      tgl_paraf_kasir: $scope.tglParafKasir ? $scope.tglParafKasir : ""
    };
    const url = REPORT_URL + "/docx/k3rsInves";
    pmkpService.postDownload(url, data, $scope.currPage + "-report.docx");
  };
  $scope.backToList = () => {
    window.history.back();
  };
  $scope.getData();
});
