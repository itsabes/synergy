sikatApp.controller("indikatorMutuListController", function(
  $scope,
  $rootScope,
  $http,
  $filter,
  $location,
  $routeParams,
  NgTableParams
) {

  $rootScope.currPage = $routeParams.id;
  $rootScope.currForm = "indikatorMutu";

  // Tambahkan log halaman saat ini
  console.log("Halaman saat ini:", $rootScope.currPage);
  // Jika ingin melog semua $routeParams
  console.log("Parameter URL saat ini:", $routeParams);

  $scope.dataId = null;
  $scope.typeSelect = $routeParams.id;
  $scope.profileType = {};

  var today = new Date();
  $scope.tahun = today.getFullYear() + "";

  // $scope.tahun = "";
  // if ($routeParams.tahun) 
  //   $scope.tahun = $routeParams.tahun;

  // $scope.unit = "";
  // if ($routeParams.unit) 
  //   $scope.unit = $routeParams.unit;

  $scope.yearDynamic = [];
  const startYear = 2016;
  const currentYear = new Date().getFullYear();
  $scope.currentYear = currentYear;
  for (let year = startYear; year <= currentYear; year++) {
      $scope.yearDynamic.push(year);
  }
  

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

  $scope.showStatusAcc = (
    id,statusAcc
  ) => {
    $location.url(
      "/indikatorMutu/"+$rootScope.currPage+"?uniqIdx=" +
      id +
      "&status_acc=" +
      statusAcc
    );

    $http
    .put(
      SERVER_URL + "/api/indikatorMutu/updateStatusAcc",
      {
        id : id,
        statusAcc: statusAcc,
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

  $scope.addIndikatorMutu = () => {
    $location.url("/indikatorMutu_new");
  };
    
  $scope.getData = () => {

    var url = SERVER_URL + "/api/dynamic/getByQuery?q=0";
    if ($scope.tahun) 
      url += "&tahun=" + $scope.tahun;

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

  $scope.getProcessTypeData = (callbackFunc) => {
    var result = { data: null };

    // Create a new XMLHttpRequest object
    var xhr = new XMLHttpRequest();

    // Open a synchronous GET request
    xhr.open("GET", SERVER_URL + "/api/dynamic/getProcessType", false); // `false` makes it synchronous

    // Set headers if needed
    xhr.setRequestHeader("Authorization", localStorage.getItem("token"));

    try {
        // Send the request
        xhr.send();

        // Check the response status
        if (xhr.status === 200) {
            // Parse the response data if it is in JSON format
            result.data = JSON.parse(xhr.responseText);
            //console.log("Received data:", result.data);

        } else {
            console.error("Error occurred: " + xhr.statusText);
        }
    } catch (error) {
        console.error("Error occurred during AJAX call: ", error);
    }

    // Call the callback function with the result
    callbackFunc(result);
  };

  $scope.getProcessTypeData(result => {
    if (result) {
      $scope.profileType = result.data;
    } else {
      console.log("No data or error occurred.");
    }
  });
  
  $scope.backToList = () => {
    window.history.back();
  };

  $scope.getData();
  console.log("Received data:", $scope.profileType);

});

sikatApp.controller("indikatorMutuNewController", function(
  $scope,
  $rootScope,
  $routeParams,
  $http
) {

  $rootScope.currPage = $routeParams.id;
  $rootScope.currForm = "indikatorMutu";

  // Tambahkan log halaman saat ini
  console.log("Halaman saat ini:", $rootScope.currPage);
  // Jika ingin melog semua $routeParams
  console.log("Parameter URL saat ini:", $routeParams);
  
  $scope.dataId = null;
  $scope.typeSelect = $routeParams.id;
  $scope.profileType = {};

  var today = new Date();
  $scope.tahun = today.getFullYear() + "";



  $scope.save = () => {

    if (!$scope.tahun) {
      Swal.fire("Error!", "Tahun tidak boleh kosong.", "error");
      return;
    }
    if (!$scope.judulIndikator) {
        Swal.fire("Error!",  $rootScope.currPage+" Judul Indikator tidak boleh kosong.", "error");
        return;
    }
    if (!$scope.dasarPemikiran) {
        Swal.fire("Error!", "Dasar Pemikiran tidak boleh kosong.", "error");
        return;
    }
    
    // Cek jika semua field tidak dipilih
    if ($scope.isEfisien == null && 
      $scope.isEfektif == null && 
      $scope.isTepatWaktu == null && 
      $scope.isAman == null && 
      $scope.isAdil == null && 
      $scope.isBerPasien == null && 
      $scope.isIntegrasi == null) {
      Swal.fire("Error!", "Dimensi Mutu tidak boleh kosong.", "error");
      return;
    }
    if (!$scope.tujuan) {
        Swal.fire("Error!", $scope.unit+" Tujuan tidak boleh kosong.", "error");
        return;
    }
    if (!$scope.defPemikiran) {
        Swal.fire("Error!", "Definisi Pemikiran tidak boleh kosong.", "error");
        return;
    }
    if (!$scope.tipeIndikator) {
        Swal.fire("Error!", "Tipe Indikator tidak boleh kosong.", "error");
        return;
    }
    if (!$scope.ukuranIndikator) {
        Swal.fire("Error!", "Ukuran Indikator tidak boleh kosong.", "error");
        return;
    }
    if (!$scope.numerator) {
        Swal.fire("Error!", "Numerator tidak boleh kosong.", "error");
        return;
    }
    if (!$scope.denumerator) {
        Swal.fire("Error!", "Denumerator tidak boleh kosong.", "error");
        return;
    }
    if (!$scope.targetPencapaian) {
        Swal.fire("Error!", "Target Pencapaian tidak boleh kosong.", "error");
        return;
    }
    if (!$scope.kriteria) {
        Swal.fire("Error!", "Kriteria tidak boleh kosong.", "error");
        return;
    }
    if (!$scope.formula) {
        Swal.fire("Error!", "Formula tidak boleh kosong.", "error");
        return;
    }
    if (!$scope.sumberData) {
        Swal.fire("Error!", "Sumber Data tidak boleh kosong.", "error");
        return;
    }
    if (!$scope.frekPengumpulan) {
        Swal.fire("Error!", "Frekuensi Pengumpulan tidak boleh kosong.", "error");
        return;
    }
    if (!$scope.periodePelaporan) {
        Swal.fire("Error!", "Periode Pelaporan tidak boleh kosong.", "error");
        return;
    }
    if (!$scope.periodeAnalisa) {
        Swal.fire("Error!", "Periode Analisa tidak boleh kosong.", "error");
        return;
    }
    if (!$scope.metodePengumpulan) {
        Swal.fire("Error!", "Metode Pengumpulan tidak boleh kosong.", "error");
        return;
    }
    if (!$scope.populasiSampel) {
        Swal.fire("Error!", "Populasi Sampel tidak boleh kosong.", "error");
        return;
    }
    if (!$scope.isiSampel) {
        Swal.fire("Error!", "Isi Sampel tidak boleh kosong.", "error");
        return;
    }
    if (!$scope.instrumenPengambilan) {
        Swal.fire("Error!", "Instrumen Pengambilan tidak boleh kosong.", "error");
        return;
    }
    if (!$scope.penanggungJawab) {
        Swal.fire("Error!", "Penanggung Jawab tidak boleh kosong.", "error");
        return;
    }

    $http
      .post(
        SERVER_URL + "/api/indikatorMutu",
        {
          tahun: $scope.tahun,
          judulIndikator: $scope.judulIndikator,
          unit : $rootScope.currPage,
          dasarPemikiran: $scope.dasarPemikiran,
          isEfisien: $scope.isEfisien != null ? $scope.isEfisien : 0,
          isEfektif: $scope.isEfektif != null ? $scope.isEfektif : 0,
          isTepatWaktu: $scope.isTepatWaktu != null ? $scope.isTepatWaktu : 0,
          isAman: $scope.isAman != null ? $scope.isAman : 0,
          isAdil: $scope.isAdil != null ? $scope.isAdil : 0,
          isBerPasien: $scope.isBerPasien != null ? $scope.isBerPasien : 0,
          isIntegrasi: $scope.isIntegrasi != null ? $scope.isIntegrasi : 0,
          tujuan: $scope.tujuan,
          defPemikiran: $scope.defPemikiran,
          tipeIndikator: $scope.tipeIndikator,
          ukuranIndikator: $scope.ukuranIndikator,
          numerator: $scope.numerator,
          denumerator: $scope.denumerator,
          targetPencapaian: $scope.targetPencapaian,
          kriteria: $scope.kriteria,
          formula: $scope.formula,
          sumberData: $scope.sumberData,
          frekPengumpulan: $scope.frekPengumpulan,
          periodePelaporan: $scope.periodePelaporan,
          periodeAnalisa: $scope.periodeAnalisa,
          metodePengumpulan: $scope.metodePengumpulan,
          populasiSampel: $scope.populasiSampel,
          isiSampel: $scope.isiSampel,
          rencanaAnalisis: $scope.rencanaAnalisis != null ? $scope.rencanaAnalisis : "",
          instrumenPengambilan: $scope.instrumenPengambilan,
          penanggungJawab: $rootScope.currPage
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

  $scope.getProcessTypeData = (callbackFunc) => {
    var result = { data: null };

    // Create a new XMLHttpRequest object
    var xhr = new XMLHttpRequest();

    // Open a synchronous GET request
    xhr.open("GET", SERVER_URL + "/api/dynamic/getProcessType", false); // `false` makes it synchronous

    // Set headers if needed
    xhr.setRequestHeader("Authorization", localStorage.getItem("token"));

    try {
        // Send the request
        xhr.send();

        // Check the response status
        if (xhr.status === 200) {
            // Parse the response data if it is in JSON format
            result.data = JSON.parse(xhr.responseText);
            //console.log("Received data:", result.data);

        } else {
            console.error("Error occurred: " + xhr.statusText);
        }
    } catch (error) {
        console.error("Error occurred during AJAX call: ", error);
    }

    // Call the callback function with the result
    callbackFunc(result);
  };

  $scope.getProcessTypeData(result => {
    if (result) {
      $scope.profileType = result.data;
    } else {
      console.log("No data or error occurred.");
    }
  });

  $scope.onSelectedPetugas = item => {
    $scope.petugas = item.nip;
  };
  
  $scope.searchPetugas = function($select) {
    if ($select.search.length > 0) {
      return $http
        .get(SERVER_URL + "/api/indikatorMutu/allPetugasByQuery", {
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

  $scope.yearDynamic = [];
  const startYear = 2023;
  const currentYear = new Date().getFullYear();
  $scope.currentYear = currentYear;
  for (let year = startYear; year <= currentYear; year++) {
      $scope.yearDynamic.push(year);
  }

  $scope.backToList = () => {
    window.history.back();
  };

});

sikatApp.controller("indikatorMutuEditController", function(
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

  $rootScope.currPage = "indikatorMutu";
  $rootScope.currPageParam = $routeParams.param;
  $scope.id = $routeParams.uniqIdx;
  console.log("$scope.id",$scope.id);
  console.log("$rootScope.currPageParam = $routeParams.param;",$rootScope.currPageParam);

  $scope.getData = () => {
    var url =
      SERVER_URL + "/api/indikatorMutu?id=" + $scope.id;
    $http
      .get(url, { headers: { Authorization: localStorage.getItem("token") } })
      .then(
        function(reqRes) {
          if (reqRes.data && reqRes.data != "") {
            $scope.tahun = reqRes.data.TAHUN,
            $scope.judulIndikator = reqRes.data.JUDUL_INDIKATOR,
            $scope.unit  = reqRes.data.UNIT,
            $scope.dasarPemikiran = reqRes.data.DASAR_PEMIKIRAN,
            $scope.isEfisien = reqRes.data.IS_EFISIEN != null ? reqRes.data.IS_EFISIEN == 1 : false;
            $scope.isEfektif = reqRes.data.IS_EFEKTIF != null ? reqRes.data.IS_EFEKTIF == 1 : false;
            $scope.isTepatWaktu = reqRes.data.IS_TEPAT_WAKTU != null ? reqRes.data.IS_TEPAT_WAKTU == 1 : false;
            $scope.isAman = reqRes.data.IS_AMAN != null ? reqRes.data.IS_AMAN == 1 : false;
            $scope.isAdil = reqRes.data.IS_ADIL != null ? reqRes.data.IS_ADIL == 1 : false;
            $scope.isBerPasien = reqRes.data.IS_BERPASIEN != null ? reqRes.data.IS_BERPASIEN == 1 : false;
            $scope.isIntegrasi = reqRes.data.IS_INTEGRASI != null ? reqRes.data.IS_INTEGRASI == 1 : false;            
            $scope.tujuan = reqRes.data.TUJUAN,
            $scope.defPemikiran = reqRes.data.DEFINISI_PEMIKIRAN,
            $scope.tipeIndikator = reqRes.data.TIPE_INDIKATOR,
            $scope.ukuranIndikator = reqRes.data.UKURAN_INDIKATOR,
            $scope.numerator = reqRes.data.NUMERATOR,
            $scope.denumerator = reqRes.data.DENUMERATOR,
            $scope.targetPencapaian = reqRes.data.TARGET_PENCAPAIAN,
            $scope.kriteria = reqRes.data.KRITERIA,
            $scope.formula = reqRes.data.FORMULA,
            $scope.sumberData = reqRes.data.SUMBER_DATA,
            $scope.frekPengumpulan = reqRes.data.FREK_PENGUMPULAN,
            $scope.periodePelaporan = reqRes.data.PERIODE_PELAPORAN,
            $scope.periodeAnalisa = reqRes.data.PERIODE_ANALISA,
            $scope.metodePengumpulan = reqRes.data.METODE_PENGUMPULAN,
            $scope.populasiSampel = reqRes.data.POPULASI_SAMPEL,
            $scope.isiSampel = reqRes.data.ISI_SAMPEL,
            $scope.rencanaAnalisis = reqRes.data.RENCANA_ANALISIS != null ? reqRes.data.RENCANA_ANALISIS  : "",
            $scope.instrumenPengambilan = reqRes.data.INSTRUMEN_PENGAMBILAN,
            $scope.penanggungJawab = reqRes.data.PENANGGUNG_JAWAB
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

    if (!$scope.tahun) {
      Swal.fire("Error!", "Tahun tidak boleh kosong.", "error");
      return;
    }
    if (!$scope.judulIndikator) {
        Swal.fire("Error!",  $rootScope.currPage+" Judul Indikator tidak boleh kosong.", "error");
        return;
    }
    if (!$scope.dasarPemikiran) {
        Swal.fire("Error!", "Dasar Pemikiran tidak boleh kosong.", "error");
        return;
    }
    
    // Cek jika semua field tidak dipilih
    if ($scope.isEfisien == null && 
      $scope.isEfektif == null && 
      $scope.isTepatWaktu == null && 
      $scope.isAman == null && 
      $scope.isAdil == null && 
      $scope.isBerPasien == null && 
      $scope.isIntegrasi == null) {
      Swal.fire("Error!", "Dimensi Mutu tidak boleh kosong.", "error");
      return;
    }
    if (!$scope.tujuan) {
        Swal.fire("Error!", $scope.unit+" Tujuan tidak boleh kosong.", "error");
        return;
    }
    if (!$scope.defPemikiran) {
        Swal.fire("Error!", "Definisi Pemikiran tidak boleh kosong.", "error");
        return;
    }
    if (!$scope.tipeIndikator) {
        Swal.fire("Error!", "Tipe Indikator tidak boleh kosong.", "error");
        return;
    }
    if (!$scope.ukuranIndikator) {
        Swal.fire("Error!", "Ukuran Indikator tidak boleh kosong.", "error");
        return;
    }
    if (!$scope.numerator) {
        Swal.fire("Error!", "Numerator tidak boleh kosong.", "error");
        return;
    }
    if (!$scope.denumerator) {
        Swal.fire("Error!", "Denumerator tidak boleh kosong.", "error");
        return;
    }
    if (!$scope.targetPencapaian) {
        Swal.fire("Error!", "Target Pencapaian tidak boleh kosong.", "error");
        return;
    }
    if (!$scope.kriteria) {
        Swal.fire("Error!", "Kriteria tidak boleh kosong.", "error");
        return;
    }
    if (!$scope.formula) {
        Swal.fire("Error!", "Formula tidak boleh kosong.", "error");
        return;
    }
    if (!$scope.sumberData) {
        Swal.fire("Error!", "Sumber Data tidak boleh kosong.", "error");
        return;
    }
    if (!$scope.frekPengumpulan) {
        Swal.fire("Error!", "Frekuensi Pengumpulan tidak boleh kosong.", "error");
        return;
    }
    if (!$scope.periodePelaporan) {
        Swal.fire("Error!", "Periode Pelaporan tidak boleh kosong.", "error");
        return;
    }
    if (!$scope.periodeAnalisa) {
        Swal.fire("Error!", "Periode Analisa tidak boleh kosong.", "error");
        return;
    }
    if (!$scope.metodePengumpulan) {
        Swal.fire("Error!", "Metode Pengumpulan tidak boleh kosong.", "error");
        return;
    }
    if (!$scope.populasiSampel) {
        Swal.fire("Error!", "Populasi Sampel tidak boleh kosong.", "error");
        return;
    }
    if (!$scope.isiSampel) {
        Swal.fire("Error!", "Isi Sampel tidak boleh kosong.", "error");
        return;
    }
    if (!$scope.instrumenPengambilan) {
        Swal.fire("Error!", "Instrumen Pengambilan tidak boleh kosong.", "error");
        return;
    }
    if (!$scope.penanggungJawab) {
        Swal.fire("Error!", "Penanggung Jawab tidak boleh kosong.", "error");
        return;
    }

    $http
      .put(
        SERVER_URL + "/api/indikatorMutu",
        {
          id : $scope.id,
          tahun: $scope.tahun,
          judulIndikator: $scope.judulIndikator,
          unit : $rootScope.currPage,
          dasarPemikiran: $scope.dasarPemikiran,
          isEfisien: $scope.isEfisien != null ? $scope.isEfisien : 0,
          isEfektif: $scope.isEfektif != null ? $scope.isEfektif : 0,
          isTepatWaktu: $scope.isTepatWaktu != null ? $scope.isTepatWaktu : 0,
          isAman: $scope.isAman != null ? $scope.isAman : 0,
          isAdil: $scope.isAdil != null ? $scope.isAdil : 0,
          isBerPasien: $scope.isBerPasien != null ? $scope.isBerPasien : 0,
          isIntegrasi: $scope.isIntegrasi != null ? $scope.isIntegrasi : 0,
          tujuan: $scope.tujuan,
          defPemikiran: $scope.defPemikiran,
          tipeIndikator: $scope.tipeIndikator,
          ukuranIndikator: $scope.ukuranIndikator,
          numerator: $scope.numerator,
          denumerator: $scope.denumerator,
          targetPencapaian: $scope.targetPencapaian,
          kriteria: $scope.kriteria,
          formula: $scope.formula,
          sumberData: $scope.sumberData,
          frekPengumpulan: $scope.frekPengumpulan,
          periodePelaporan: $scope.periodePelaporan,
          periodeAnalisa: $scope.periodeAnalisa,
          metodePengumpulan: $scope.metodePengumpulan,
          populasiSampel: $scope.populasiSampel,
          isiSampel: $scope.isiSampel,
          rencanaAnalisis: $scope.rencanaAnalisis != null ? $scope.rencanaAnalisis : "",
          instrumenPengambilan: $scope.instrumenPengambilan,
          penanggungJawab: $scope.penanggungJawab
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
      SERVER_URL + "/api/indikatorMutu/delete?id="+$scope.id;

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