sikatApp.controller("k3rsLaporController", function(
  $scope,
  $rootScope,
  $http,
  $filter,
  $location,
  $routeParams,
  NgTableParams
) {
  $rootScope.currPage = "k3rsLapor";
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

  $scope.addK3rsLapor = () => {
    $location.url("/k3rsLapor_new");
  };
  $scope.showK3rsLapor = (tglKejadian, noRkmMedis, nmPasien) => {
    $location.url(
      "/k3rsLapor_edit?tglKejadian=" +
        tglKejadian +
        "&noRkmMedis=" +
        noRkmMedis +
        "&nmPasien=" +
        nmPasien
    );
  };

  $scope.tableParams = new NgTableParams({}, { dataset: [] });
  $scope.loadData = () => {
    $location.url(
      "/k3rsLapor?tanggalDari=" +
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
    var url = SERVER_URL + "/api/k3rsLapor/getByQuery?q=0";
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

sikatApp.controller("k3rsLaporNewController", function(
  $scope,
  $rootScope,
  $http
) {
  $rootScope.currPage = "k3rsLapor";
  $scope.pasienList = [];
  $scope.save = () => {
    $http
      .post(
        SERVER_URL + "/api/k3rsLapor",
        {
          tgl_kejadian: $scope.tglKejadian,
          no_rkm_medis: $scope.noRkmMedis,
          lokasi: $scope.lokasi,
          pekerjaan: $scope.pekerjaan,
          kronologi: $scope.kronologi,
          kerusakan_aset: $scope.kerusakanAset,
          cidera: $scope.cidera,
          nm_saksi: $scope.namaSaksi,
          penanganan: $scope.penanganan,
          nm_pelapor: $scope.namaPelapor,
          penanggung_jawab: $scope.penanggungJawab
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
  $scope.onSelectedPasien = item => {
    $scope.noRkmMedis = item.no_rkm_medis;
  };
  $scope.onTaggingPasien = namaPasien => {
    return {
      no_rkm_medis: namaPasien,
      nm_pasien: ""
    };
  };
  $scope.searchPasien = function($select) {
    if ($select.search.length > 0) {
      return $http
        .get(SERVER_URL + "/api/k3rsLapor/allPasienByQuery", {
          params: {
            searchstr: $select.search
          },
          headers: { Authorization: localStorage.getItem("token") }
        })
        .then(function(response) {
          $scope.pasienList = response.data;
        });
    }
    return false;
  };
  $scope.backToList = () => {
    window.history.back();
  };
});

sikatApp.controller("k3rsLaporEditController", function(
  $scope,
  $rootScope,
  $routeParams,
  $http,
  pmkpService
) {
  $rootScope.currPage = "k3rsLapor";
  $scope.tglKejadian = $routeParams.tglKejadian;
  $scope.noRkmMedis = $routeParams.noRkmMedis;
  $scope.noRkmMedisNmPasien =
    $scope.noRkmMedis +
    ($rootScope.isNumeric($scope.noRkmMedis)
      ? " - " + $routeParams.nmPasien
      : "");
  $scope.pasienList = [];
  $scope.getData = () => {
    var url =
      SERVER_URL +
      "/api/k3rsLapor?id=" +
      $scope.tglKejadian +
      ";" +
      $scope.noRkmMedis;
    $http
      .get(url, { headers: { Authorization: localStorage.getItem("token") } })
      .then(
        function(reqRes) {
          if (reqRes.data && reqRes.data != "") {
            $scope.tglKejadian =
              reqRes.data.tgl_kejadian + " " + reqRes.data.jam_kejadian;
            $scope.noRkmMedis = reqRes.data.no_rkm_medis;
            $scope.lokasi = reqRes.data.lokasi;
            $scope.pekerjaan = reqRes.data.pekerjaan;
            $scope.kronologi = reqRes.data.kronologi;
            $scope.kerusakanAset = reqRes.data.kerusakan_aset;
            $scope.cidera = reqRes.data.cidera;
            $scope.namaSaksi = reqRes.data.nm_saksi;
            $scope.penanganan = reqRes.data.penanganan;
            $scope.namaPelapor = reqRes.data.nm_pelapor;
            $scope.penanggungJawab = reqRes.data.penanggung_jawab;
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
        SERVER_URL + "/api/k3rsLapor",
        {
          id: $scope.tglKejadian + ";" + $scope.noRkmMedis,
          no_rkm_medis: $scope.noRkmMedis,
          lokasi: $scope.lokasi,
          pekerjaan: $scope.pekerjaan,
          kronologi: $scope.kronologi,
          kerusakan_aset: $scope.kerusakanAset,
          cidera: $scope.cidera,
          nm_saksi: $scope.namaSaksi,
          penanganan: $scope.penanganan,
          nm_pelapor: $scope.namaPelapor,
          penanggung_jawab: $scope.penanggungJawab
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
      "/api/k3rsLapor/delete?id=" +
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
      id: $scope.tglKejadian + ";" + $scope.noRkmMedis,
      tgl_kejadian,
      waktu_kejadian,
      no_rkm_medis: $scope.noRkmMedis ? $scope.noRkmMedis : "",
      lokasi: $scope.lokasi ? $scope.lokasi : "",
      pekerjaan: $scope.pekerjaan ? $scope.pekerjaan : "",
      kronologi01: $scope.kronologi ? $scope.kronologi : "",
      kronologi02: "",
      kronologi03: "",
      kronologi04: "",
      kronologi05: "",
      kronologi06: "",
      kronologi07: "",
      kronologi08: "",
      kerusakan_aset: $scope.kerusakanAset ? $scope.kerusakanAset : "",
      cidera: $scope.cidera ? $scope.cidera : "",
      nm_korban: "",
      usia: "",
      jenis_kelamin: "",
      jabatan: "",
      nm_saksi: $scope.namaSaksi ? $scope.namaSaksi : "",
      penanganan01: $scope.penanganan ? $scope.penanganan : "",
      penanganan02: "",
      penanganan03: "",
      penanganan04: "",
      penanganan05: "",
      penanganan06: "",
      penanganan07: "",
      penanganan08: "",
      penanganan09: "",
      penanganan10: "",
      nm_pelapor: $scope.namaPelapor ? $scope.namaPelapor : "",
      penanggung_jawab: $scope.penanggungJawab ? $scope.penanggungJawab : ""
    };
    const url = REPORT_URL + "/docx/k3rsLapor";
    pmkpService.postDownload(url, data, $scope.currPage + "-report.docx");
  };
  $scope.backToList = () => {
    window.history.back();
  };
  $scope.getData();
});
