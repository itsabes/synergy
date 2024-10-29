sikatApp.controller("b3rsController", function(
  $scope,
  $rootScope,
  $http,
  $filter,
  $location,
  $routeParams,
  NgTableParams
) {
  $rootScope.currPage = "b3rs";
  $scope.jenisBahan = "";
  $scope.fasa = "";
  $scope.lokasi = "";
  $scope.tanggalDari = "";
  $scope.tanggalSampai = "";
  if ($routeParams.jenisBahan) $scope.jenisBahan = $routeParams.jenisBahan;
  if ($routeParams.fasa) $scope.fasa = $routeParams.fasa;
  if ($routeParams.lokasi) $scope.lokasi = $routeParams.lokasi;
  if ($routeParams.tanggalDari) $scope.tanggalDari = $routeParams.tanggalDari;
  if ($routeParams.tanggalSampai)
    $scope.tanggalSampai = $routeParams.tanggalSampai;

  $scope.addB3rs = () => {
    $location.url("/b3rs_new");
  };
  $scope.showB3rs = (tglKejadian, jenisBahan) => {
    $location.url(
      "/b3rs_edit?tglKejadian=" + tglKejadian + "&jenisBahan=" + jenisBahan
    );
  };

  $scope.tableParams = new NgTableParams({}, { dataset: [] });
  $scope.loadData = () => {
    $location.url(
      "/b3rs?tanggalDari=" +
        $scope.tanggalDari +
        "&tanggalSampai=" +
        $scope.tanggalSampai +
        "&jenisBahan=" +
        $scope.jenisBahan +
        "&fasa=" +
        $scope.fasa +
        "&lokasi=" +
        $scope.lokasi
    );
  };
  $scope.getData = () => {
    var url = SERVER_URL + "/api/b3rs/getByQuery?q=0";
    if ($scope.jenisBahan) url += "&jenisBahan=" + $scope.jenisBahan;
    if ($scope.fasa) url += "&fasa=" + $scope.fasa;
    if ($scope.lokasi) url += "&lokasi=" + $scope.lokasi;
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

sikatApp.controller("b3rsNewController", function($scope, $rootScope, $http) {
  $rootScope.currPage = "b3rs";
  $scope.save = () => {
    $http
      .post(
        SERVER_URL + "/api/b3rs",
        {
          tgl_kejadian: $scope.tglKejadian,
          jenis_bahan: $scope.jenisBahan,
          fasa: $scope.fasa,
          lokasi: $scope.lokasi,
          jumlah: $scope.jumlah,
          liter: $scope.liter,
          penanganan: $scope.penanganan,
          kondisi_setelah: $scope.kondisiSetelah,
          nm_pelapor: $scope.namaPelapor
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

sikatApp.controller("b3rsEditController", function(
  $scope,
  $rootScope,
  $routeParams,
  $http
) {
  $rootScope.currPage = "b3rs";
  $scope.tglKejadian = $routeParams.tglKejadian;
  $scope.jenisBahan = $routeParams.jenisBahan;
  $scope.getData = () => {
    var url =
      SERVER_URL +
      "/api/b3rs?id=" +
      $scope.tglKejadian +
      ";" +
      $scope.jenisBahan;
    $http
      .get(url, { headers: { Authorization: localStorage.getItem("token") } })
      .then(
        function(reqRes) {
          if (reqRes.data && reqRes.data != "") {
            $scope.tglKejadian =
              reqRes.data.tgl_kejadian + " " + reqRes.data.jam_kejadian;
            $scope.jenisBahan = reqRes.data.jenis_bahan;
            $scope.fasa = reqRes.data.fasa;
            $scope.lokasi = reqRes.data.lokasi;
            $scope.jumlah = reqRes.data.jumlah;
            $scope.liter = reqRes.data.liter;
            $scope.penanganan = reqRes.data.penanganan;
            $scope.kondisiSetelah = reqRes.data.kondisi_setelah;
            $scope.namaPelapor = reqRes.data.nm_pelapor;
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
        SERVER_URL + "/api/b3rs",
        {
          id: $scope.tglKejadian + ";" + $scope.jenisBahan,
          jenis_bahan: $scope.jenisBahan,
          fasa: $scope.fasa,
          lokasi: $scope.lokasi,
          jumlah: $scope.jumlah,
          liter: $scope.liter,
          penanganan: $scope.penanganan,
          kondisi_setelah: $scope.kondisiSetelah,
          nm_pelapor: $scope.namaPelapor
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
      "/api/b3rs/delete?id=" +
      $scope.tglKejadian +
      ";" +
      $scope.jenisBahan;
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
  $scope.backToList = () => {
    window.history.back();
  };
  $scope.getData();
});
