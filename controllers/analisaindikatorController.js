sikatApp.controller("analisaIndikatorController", function(
  $scope,
  $rootScope,
  $http,
  $filter,
  $location,
  $routeParams,
  NgTableParams
) {

  $rootScope.currPage = $routeParams.id;
  $rootScope.currForm = "lembarPdsa";

  // Tambahkan log halaman saat ini
  console.log("Halaman saat ini:", $rootScope.currPage);
  // Jika ingin melog semua $routeParams
  console.log("Parameter URL saat ini:", $routeParams);

  $scope.dataId = null;

  $scope.tableParams = new NgTableParams({}, { dataset: [] });
  $scope.loadData = () => {
    $location.url(
      "/indikatorMutu?tahun=" +
        ($scope.tahun ? $scope.tahun : "") +
        "&unit=" +
        ($scope.unit ? $scope.unit : "")
    );
  };

  $scope.showIndikatorMutu = (
    id
  ) => {
    $location.url(
      "/indikatorMutu_edit/"+$rootScope.currPage+"?uniqIdx=" +
      id
    );
  };

  $scope.addIndikatorMutu = () => {
    $location.url("/indikatorMutu_new");
  };

  $scope.showAnalisaIndikatorEdit = (
    judul,
    numerator,
    denumerator,
    target,
    id,
    analisa,
    rekomendasi
  ) => {
    $location.url(
      "/lembarPdsa_edit/"+$rootScope.currPage+"?judul=" +
      judul +
      "&numerator="+ numerator +
      "&denumerator="+ denumerator +
      "&target="+ target +
      "&idx="+ id +
      "&analisa="+analisa +
      "&rekomendasi="+rekomendasi
    );
  };

  $scope.showAnalisaIndikator = (
    judul,
    numerator,
    denumerator,
    target,
    id,
  ) => {
    $location.url(
      "/lembarPdsa_new/"+$erootScope.currPage+"?judul=" +
      judul +
      "&numerator="+ numerator +
      "&denumerator="+ denumerator +
      "&target="+ target +
      "&idx="+ id
    );
  };
    
  $scope.getData = () => {

    var url = SERVER_URL + "/api/analisaIndikator/getByQuery?q=0";
    url += "&unit=" + $rootScope.currPage;
    
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
  
  $scope.backToList = () => {
    window.history.back();
  };

  $scope.getData();

});

sikatApp.controller("analisaIndikatorNewController", function(
  $scope,
  $rootScope,
  $routeParams,
  $http
) {

  $rootScope.currPage = $routeParams.id;
  $rootScope.currForm = "lembarPdsa";

  // Tambahkan log halaman saat ini
  console.log("Halaman saat ini:", $rootScope.currPage);
  // Jika ingin melog semua $routeParams
  console.log("Parameter URL saat ini:", $routeParams);
  
  $scope.dataId = null;
  $scope.judulIndikator = $routeParams.judul;
  $scope.numerator = $routeParams.numerator;
  $scope.denumerator = $routeParams.denumerator;
  $scope.targetPencapaian = $routeParams.target;
  $scope.idx = $routeParams.idx;
  $scope.id = $routeParams.id;

  $scope.save = () => {

    if (!$scope.analisa) {
      Swal.fire("Error!", "Analisa tidak boleh kosong.", "error");
      return;
    }
    if (!$scope.rekomendasi) {
        Swal.fire("Error!", "Rekomendasi tidak boleh kosong.", "error");
        return;
    }
    
    $http
      .post(
        SERVER_URL + "/api/analisaIndikator",
        {
          idx: $scope.idx,
          analisa: $scope.analisa,
          rekomendasi : $scope.rekomendasi,
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

sikatApp.controller("analisaIndikatorEditController", function(
  $scope,
  $rootScope,
  $routeParams,
  $http
) {

  var today = new Date();
  $scope.tahun = today.getFullYear() + "";

  $scope.yearDynamic = [];
  const startYear = 2016;
  const currentYear = new Date().getFullYear();
  $scope.currentYear = currentYear;
  for (let year = startYear; year <= currentYear; year++) {
      $scope.yearDynamic.push(year);
  }

  $rootScope.currPage = $routeParams.id;
  $rootScope.currForm = "lembarPdsa";

  // Tambahkan log halaman saat ini
  console.log("Halaman saat ini:", $rootScope.currPage);
  // Jika ingin melog semua $routeParams
  console.log("Parameter URL saat ini:", $routeParams);
  
  $scope.dataId = null;
  $scope.judulIndikator = $routeParams.judul;
  $scope.numerator = $routeParams.numerator;
  $scope.denumerator = $routeParams.denumerator;
  $scope.targetPencapaian = $routeParams.target;
  $scope.analisa = $routeParams.analisa;
  $scope.rekomendasi = $routeParams.rekomendasi;
  $scope.idx = $routeParams.idx;
  $scope.id = $routeParams.id;
  
  $scope.update = () => {

    if (!$scope.analisa) {
      Swal.fire("Error!", "Analisa tidak boleh kosong.", "error");
      return;
    }
    if (!$scope.rekomendasi) {
        Swal.fire("Error!", "Rekomendasi tidak boleh kosong.", "error");
        return;
    }
    
    $http
      .put(
        SERVER_URL + "/api/analisaIndikator",
        {
          idx: $scope.idx,
          analisa: $scope.analisa,
          rekomendasi : $scope.rekomendasi,
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

  $scope.delete = () => {
    var url =
      SERVER_URL + "/api/analisaIndikator/delete?id="+$scope.idx;

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

});