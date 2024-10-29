sikatApp.controller("settingsController", function($scope, $rootScope, $http) {
  $rootScope.currPage = "settings";
  $scope.user_name = localStorage.getItem("user_name");
  $scope.user_role = localStorage.getItem("user_role");
  $scope.user_email = localStorage.getItem("user_email");
  $scope.getData = () => {
    var url = SERVER_URL + "/api/settings";
    $http
      .get(url, { headers: { Authorization: localStorage.getItem("token") } })
      .then(
        function(reqRes) {
          if (reqRes.data && reqRes.data != "") {
            var settings = reqRes.data;
            $scope.namaDirektur = settings.nama_direktur;
            $scope.nipDirektur = settings.nip_direktur;
            $scope.namaRumahSakit = settings.nama_rumah_sakit;
            $scope.waktuKunciPmkp = settings.waktu_kunci_pmkp;
            $scope.waktuSembunyiIkp = settings.waktu_sembunyi_ikp;
            $scope.notifEmailIkp = settings.notif_email_ikp;
            $scope.notifEmailK3rs = settings.notif_email_k3rs;
          } else {
            $scope.settings = {};
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
        SERVER_URL + "/api/settings",
        {
          nama_direktur: $scope.namaDirektur,
          nip_direktur: $scope.nipDirektur,
          nama_rumah_sakit: $scope.namaRumahSakit,
          waktu_kunci_pmkp: $scope.waktuKunciPmkp,
          waktu_sembunyi_ikp: $scope.waktuSembunyiIkp,
          notif_email_ikp: $scope.notifEmailIkp,
          notif_email_k3rs: $scope.notifEmailK3rs
        },
        { headers: { Authorization: localStorage.getItem("token") } }
      )
      .then(
        function(data) {
          swal("Success!", "Data berhasil di Perbaharui", "success");
        },
        function(data) {
          swal("Error!", "Data gagal di Perbaharui", "error");
        }
      );
  };
  $scope.getData();
});
