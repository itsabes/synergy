sikatApp.controller("ppiController", function(
  $scope,
  $rootScope,
  $http,
  $filter,
  $location,
  $routeParams,
  NgTableParams
) {
  $rootScope.currPage = "ppi";
  $rootScope.currPageParam = $routeParams.param;

  $scope.noRawat = "";
  $scope.noRekamMedis = "";
  $scope.namaPasien = "";
  $scope.namaDokter = "";
  $scope.tanggalDari = "";
  $scope.tanggalSampai = "";
  if ($routeParams.noRawat) $scope.noRawat = $routeParams.noRawat;
  if ($routeParams.noRawat) $scope.noRawat = $routeParams.noRawat;
  if ($routeParams.noRekamMedis)
    $scope.noRekamMedis = $routeParams.noRekamMedis;
  if ($routeParams.namaPasien) $scope.namaPasien = $routeParams.namaPasien;
  if ($routeParams.namaDokter) $scope.namaDokter = $routeParams.namaDokter;
  if ($routeParams.tanggalDari) $scope.tanggalDari = $routeParams.tanggalDari;
  if ($routeParams.tanggalSampai)
    $scope.tanggalSampai = $routeParams.tanggalSampai;

  $scope.addPpi = (
    noRawat,
    noRekamMedis,
    namaPasien,
    namaDokter,
    kodeKamar
  ) => {
    $location.url(
      "/ppi_new?noRawat=" +
        noRawat +
        "&noRekamMedis=" +
        noRekamMedis +
        "&namaPasien=" +
        namaPasien +
        "&namaDokter=" +
        namaDokter +
        "&kodeKamar=" +
        kodeKamar +
        "&param=" +
        $rootScope.currPageParam
    );
  };
  $scope.showPpi = (
    tanggal,
    noRawat,
    noRekamMedis,
    namaPasien,
    namaDokter,
    kodeKamar
  ) => {
    $location.url(
      "/ppi_edit?tanggal=" +
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
        "&param=" +
        $rootScope.currPageParam
    );
  };

  $scope.tableParams = new NgTableParams({}, { dataset: [] });
  $scope.loadData = () => {
    $location.url(
      "/ppi?tanggalDari=" +
        ($scope.tanggalDari ? $scope.tanggalDari : "") +
        "&tanggalSampai=" +
        ($scope.tanggalSampai ? $scope.tanggalSampai : "") +
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
    var url = SERVER_URL + "/api/ppi/getByQuery?q=0";
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

sikatApp.controller("ppiNewController", function(
  $scope,
  $rootScope,
  $routeParams,
  $http
) {
  $rootScope.currPage = "ppi";
  $rootScope.currPageParam = $routeParams.param;
  $scope.noRawat = $routeParams.noRawat;
  $scope.noRekamMedis = $routeParams.noRekamMedis;
  $scope.namaPasien = $routeParams.namaPasien;
  $scope.namaDokter = $routeParams.namaDokter;
  $scope.kodeKamar =
    $routeParams.kodeKamar != "null" ? $routeParams.kodeKamar : "";
  $scope.deku = "TIDAK";
  $scope.save = () => {
    $http
      .post(
        SERVER_URL + "/api/ppi",
        {
          tanggal: $scope.tanggal,
          no_rawat: $scope.noRawat,
          ett: $scope.ett,
          cvl: $scope.cvl,
          ivl: $scope.ivl,
          uc: $scope.uc,
          vap: $scope.vap,
          iad: $scope.iad,
          pleb: $scope.pleb,
          isk: $scope.isk,
          ilo: $scope.ilo,
          hap: $scope.hap,
          tinea: $scope.tinea,
          scabies: $scope.scabies,
          deku: $scope.deku,
          sputum: $scope.sputum,
          darah: $scope.darah,
          urine: $scope.urine,
          antibiotik: $scope.antibiotik,
          kd_kamar: $scope.kodeKamar != "" ? $scope.kodeKamar : null,
          tgl_sampel: $scope.tanggalSampel,
          tgl_kirim: $scope.tanggalKirim,
          tgl_hasil: $scope.tanggalHasil,
          mdr: $scope.mdr,
          difteri: $scope.difteri,
          konsentrat: $scope.konsentrat
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

sikatApp.controller("ppiEditController", function(
  $scope,
  $rootScope,
  $routeParams,
  $http
) {
  $rootScope.currPage = "ppi";
  $rootScope.currPageParam = $routeParams.param;
  $scope.tanggal = $routeParams.tanggal;
  $scope.noRawat = $routeParams.noRawat;
  $scope.noRekamMedis = $routeParams.noRekamMedis;
  $scope.namaPasien = $routeParams.namaPasien;
  $scope.namaDokter = $routeParams.namaDokter;
  $scope.kodeKamar =
    $routeParams.kodeKamar != "null" ? $routeParams.kodeKamar : "";
  $scope.getData = () => {
    var url =
      SERVER_URL + "/api/ppi?id=" + $scope.tanggal + ";" + $scope.noRawat;
    $http
      .get(url, { headers: { Authorization: localStorage.getItem("token") } })
      .then(
        function(reqRes) {
          if (reqRes.data && reqRes.data != "") {
            $scope.ett = reqRes.data.ETT - 0;
            $scope.cvl = reqRes.data.CVL - 0;
            $scope.ivl = reqRes.data.IVL - 0;
            $scope.uc = reqRes.data.UC - 0;
            $scope.vap = reqRes.data.VAP - 0;
            $scope.iad = reqRes.data.IAD - 0;
            $scope.pleb = reqRes.data.PLEB - 0;
            $scope.isk = reqRes.data.ISK - 0;
            $scope.ilo = reqRes.data.ILO - 0;
            $scope.hap = reqRes.data.HAP - 0;
            $scope.tinea = reqRes.data.Tinea - 0;
            $scope.scabies = reqRes.data.Scabies - 0;
            $scope.deku = reqRes.data.DEKU;
            $scope.sputum = reqRes.data.SPUTUM;
            $scope.darah = reqRes.data.DARAH;
            $scope.urine = reqRes.data.URINE;
            $scope.antibiotik = reqRes.data.ANTIBIOTIK;
            $scope.kd_kamar = reqRes.data.kd_kamar;
            $scope.tanggalSampel = reqRes.data.tgl_sampel;
            $scope.tanggalKirim = reqRes.data.tgl_kirim;
            $scope.tanggalHasil = reqRes.data.tgl_hasil;
            $scope.mdr = reqRes.data.MDR - 0;
            $scope.difteri = reqRes.data.DIFTERI - 0;
            $scope.konsentrat = reqRes.data.KONSENTRAT;
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
        SERVER_URL + "/api/ppi",
        {
          id: $scope.tanggal + ";" + $scope.noRawat,
          ett: $scope.ett,
          cvl: $scope.cvl,
          ivl: $scope.ivl,
          uc: $scope.uc,
          vap: $scope.vap,
          iad: $scope.iad,
          pleb: $scope.pleb,
          isk: $scope.isk,
          ilo: $scope.ilo,
          hap: $scope.hap,
          tinea: $scope.tinea,
          scabies: $scope.scabies,
          deku: $scope.deku,
          sputum: $scope.sputum,
          darah: $scope.darah,
          urine: $scope.urine,
          antibiotik: $scope.antibiotik,
          kd_kamar: $scope.kodeKamar != "" ? $scope.kodeKamar : null,
          tgl_sampel: $scope.tanggalSampel,
          tgl_kirim: $scope.tanggalKirim,
          tgl_hasil: $scope.tanggalHasil,
          mdr: $scope.mdr,
          difteri: $scope.difteri,
          konsentrat: $scope.konsentrat
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
      "/api/ppi/delete?id=" +
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
  $scope.backToList = () => {
    window.history.back();
  };
  $scope.getData();
});

sikatApp.controller("ppiReportHarianController", function(
  $scope,
  $rootScope,
  $http,
  $filter,
  $location,
  $routeParams
) {
  $rootScope.currPage = "ppiReportHarian";
  $scope.noRekamMedis = "";
  $scope.namaPasien = "";
  $scope.namaDokter = "";
  $scope.kodeKamar = "";
  $scope.tanggalDari = "";
  $scope.tanggalSampai = "";
  $scope.isRanap = "true";
  if ($routeParams.isRanap) $scope.isRanap = $routeParams.isRanap;
  if ($routeParams.kodeKamar) $scope.kodeKamar = $routeParams.kodeKamar;
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
        "&kodeKamar=" +
        $scope.kodeKamar +
        "&noRekamMedis=" +
        $scope.noRekamMedis +
        "&namaPasien=" +
        $scope.namaPasien +
        "&namaDokter=" +
        $scope.namaDokter +
        "&isRanap=" +
        $scope.isRanap
    );
  };
  $scope.downloadData = () => {
    $('#tablePpiHarian').jexcel('download');
  }
  $scope.getData = () => {
    $rootScope.loading = true;
    var url = SERVER_URL + "/api/ppi/reportHarianByQuery?q=0";
    url += "&isRanap=" + ($scope.isRanap == "true");
    if ($scope.kodeKamar) url += "&kodeKamar=" + $scope.kodeKamar;
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
            for (var i = 0; i < dataList.length; i+=1) {
              var datum = dataList[i];
              data.push([
                datum.no_rkm_medis,
                datum.nm_pasien, 
                datum.kd_dokter?datum.kd_dokter + " - " + datum.nm_dokter:"",
                datum.tanggal,
                datum.ETT?datum.ETT:0,
                datum.CVL?datum.CVL:0, 
                datum.IVL?datum.IVL:0, 
                datum.UC?datum.UC:0,
                datum.VAP?datum.VAP:0,
                datum.IAD?datum.IAD:0,
                datum.PLEB?datum.PLEB:0,
                datum.ISK?datum.ISK:0,
                datum.ILO?datum.ILO:0,
                datum.HAP?datum.HAP:0,
                datum.Tinea?datum.Tinea:0,
                datum.Scabies?datum.Scabies:0,
                datum.DEKU, 
                datum.SPUTUM?datum.SPUTUM:"-",
                datum.DARAH?datum.DARAH:"-",
                datum.URINE?datum.URINE:"-",
                datum.ANTIBIOTIK?datum.ANTIBIOTIK:"-",
                datum.KONSENTRAT?datum.KONSENTRAT:"-",
                datum.kd_kamar?datum.kd_kamar + " " + datum.nm_bangsal:""
              ]);
            }
          }
          var colHeaders = ["No R.M", "Nama Pasien", "Nama Dokter", "Tanggal", "ETT", "CVL", 
          "IVL", "UC", "VAP", "IAD", "PLEB", "ISK", "ILO", "HAP", "Tinea", "Scabies",
        "DEKU", "Sputum", "Darah", "Urine", "Antibiotik", "Cairan Konsentrat", "Kamar/Bangsal"];
            var colWidths = [90, 250, 200, 100, 50, 50, 50, 50, 50, 50, 
              50, 50, 50, 50, 65, 70, 60, 70, 65, 60, 250, 250, 250];
            var colAlignments = ["left", "left", "center", "center", "center", "center", 
            "center", "center", "center", "center", "center", "center", "center", "center", 
            "center", "center", "center", "center", "center", "center", "left", "left", "left"];
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
              { type: "text", wordWrap: true, readOnly: true }
            ];
            $("#tablePpiHarian").jexcel("destroyAll");
            $("#tablePpiHarian").jexcel({
              data: data,
              colHeaders,
              colWidths,
              colAlignments,
              columns,
              tableOverflow: true,
              tableHeight: "500px",
              csvHeaders:true,
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

sikatApp.controller("ppiReportBulananController", function(
  $scope,
  $rootScope,
  $http,
  $location,
  $routeParams
) {
  $rootScope.currPage = "ppiReportBulanan";
  $scope.noRekamMedis = "";
  $scope.namaPasien = "";
  $scope.namaDokter = "";
  $scope.kodeKamar = "";
  $scope.bulan = "";
  $scope.isRanap = "true";
  var today = new Date();
  $scope.bulan = today.getMonth() + 1 + "";
  $scope.tahun = today.getFullYear() + "";
  if ($routeParams.isRanap) $scope.isRanap = $routeParams.isRanap;
  if ($routeParams.kodeKamar) $scope.kodeKamar = $routeParams.kodeKamar;
  if ($routeParams.noRekamMedis)
    $scope.noRekamMedis = $routeParams.noRekamMedis;
  if ($routeParams.namaPasien) $scope.namaPasien = $routeParams.namaPasien;
  if ($routeParams.namaDokter) $scope.namaDokter = $routeParams.namaDokter;
  if ($routeParams.bulan) $scope.bulan = $routeParams.bulan;
  if ($routeParams.tahun) $scope.tahun = $routeParams.tahun;  

  $scope.loadData = () => {
    $location.url(
      "/ppi_report_bulanan?bulan=" +
        ($scope.bulan ? $scope.bulan : "") +
        "&tahun=" +
        $scope.tahun +
        "&kodeKamar=" +
        $scope.kodeKamar +
        "&noRekamMedis=" +
        $scope.noRekamMedis +
        "&namaPasien=" +
        $scope.namaPasien +
        "&namaDokter=" +
        $scope.namaDokter +
        "&isRanap=" +
        $scope.isRanap
    );
  };
  $scope.downloadData = () => {
    $('#tablePpiBulanan').jexcel('download');
  }
  $scope.getData = () => {
    $rootScope.loading = true;
    var url = SERVER_URL + "/api/ppi/reportBulananByQuery?q=0";
    url += "&isRanap=" + ($scope.isRanap == "true");
    if ($scope.kodeKamar) url += "&kodeKamar=" + $scope.kodeKamar;
    if ($scope.noRekamMedis) url += "&noRekamMedis=" + $scope.noRekamMedis;
    if ($scope.namaPasien) url += "&namaPasien=" + $scope.namaPasien;
    if ($scope.namaDokter) url += "&namaDokter=" + $scope.namaDokter;
    if ($scope.bulan) url += "&bulan=" + $scope.bulan;
    if ($scope.tahun) url += "&tahun=" + $scope.tahun;

    $http
      .get(url, { headers: { Authorization: localStorage.getItem("token") } })
      .then(
        function(reqRes) {
          var dataList = reqRes.data;
          data = [];
          if (dataList && dataList != "") {
            for (var i = 0; i < dataList.length; i+=1) {
              var datum = dataList[i];
              data.push([
                datum.tanggal,
                datum.jml_pasien,
                datum.jml_ETT?datum.jml_ETT:0,
                datum.jml_CVL?datum.jml_CVL:0, 
                datum.jml_IVL?datum.jml_IVL:0, 
                datum.jml_UC?datum.jml_UC:0,
                datum.jml_VAP?datum.jml_VAP:0,
                datum.jml_IAD?datum.jml_IAD:0,
                datum.jml_PLEB?datum.jml_PLEB:0,
                datum.jml_ISK?datum.jml_ISK:0,
                datum.jml_ILO?datum.jml_ILO:0,
                datum.jml_HAP?datum.jml_HAP:0,
                datum.jml_Tinea?datum.jml_Tinea:0,
                datum.jml_Scabies?datum.jml_Scabies:0,
                datum.jml_DEKU?datum.jml_DEKU:0, 
                datum.jml_SPUTUM?datum.jml_SPUTUM:0,
                datum.jml_DARAH?datum.jml_DARAH:0,
                datum.jml_URINE?datum.jml_URINE:0,
                datum.jml_ANTIBIOTIK?datum.jml_ANTIBIOTIK:0,
                datum.jml_MDR?datum.jml_MDR:0,
                datum.jml_DIFTERI?datum.jml_DIFTERI:0,
                datum.jml_KONSENTRAT?datum.jml_KONSENTRAT:0,
              ]);
            }
          }
          var colHeaders = ["Tanggal", "Jumlah Pasien", "ETT", "CVL", 
          "IVL", "UC", "VAP", "IAD", "PLEB", "ISK", "ILO", "HAP", "Tinea", "Scabies",
        "DEKU", "Sputum", "Darah", "Urine", "Antibiotik", "MDR", "DIFTERI", "KONSENTRAT"];
            var colWidths = [100, 130, 50, 50, 50, 50, 50, 50, 
              50, 50, 50, 50, 65, 70, 60, 70, 65, 60, 100, 60, 100, 120];
            var colAlignments = ["left", "center", "center", "center", "center", "center", 
            "center", "center", "center", "center", "center", "center", "center", "center", 
            "center", "center", "center", "center", "center", "center", "center", "center"];
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
              { type: "text", wordWrap: true, readOnly: true }
            ];
            $("#tablePpiBulanan").jexcel("destroyAll");
            $("#tablePpiBulanan").jexcel({
              data: data,
              colHeaders,
              colWidths,
              colAlignments,
              columns,
              tableOverflow: true,
              tableHeight: "500px",
              csvHeaders:true,
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

sikatApp.controller("ppiReportKamarController", function(
  $scope,
  $rootScope,
  $http,
  $filter,
  $location,
  $routeParams
) {
  $rootScope.currPage = "ppiReportKamar";
  $scope.noRekamMedis = "";
  $scope.namaPasien = "";
  $scope.namaDokter = "";
  $scope.tanggalDari = "";
  $scope.tanggalSampai = "";
  $scope.isRanap = "true";
  if ($routeParams.isRanap) $scope.isRanap = $routeParams.isRanap;
  if ($routeParams.noRekamMedis)
    $scope.noRekamMedis = $routeParams.noRekamMedis;
  if ($routeParams.namaPasien) $scope.namaPasien = $routeParams.namaPasien;
  if ($routeParams.namaDokter) $scope.namaDokter = $routeParams.namaDokter;
  if ($routeParams.tanggalDari) $scope.tanggalDari = $routeParams.tanggalDari;
  if ($routeParams.tanggalSampai)
    $scope.tanggalSampai = $routeParams.tanggalSampai;

  $scope.loadData = () => {
    $location.url(
      "/ppi_report_kamar?tanggalDari=" +
        ($scope.tanggalDari ? $scope.tanggalDari : "") +
        "&tanggalSampai=" +
        ($scope.tanggalSampai ? $scope.tanggalSampai : "") +
        "&noRekamMedis=" +
        $scope.noRekamMedis +
        "&namaPasien=" +
        $scope.namaPasien +
        "&namaDokter=" +
        $scope.namaDokter +
        "&isRanap=" +
        $scope.isRanap
    );
  };
  $scope.downloadData = () => {
    $('#tablePpiKamar').jexcel('download');
  }
  $scope.getData = () => {
    $rootScope.loading = true;
    var url = SERVER_URL + "/api/ppi/reportKamarByQuery?q=0";
    url += "&isRanap=" + ($scope.isRanap == "true");
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
            for (var i = 0; i < dataList.length; i+=1) {
              var datum = dataList[i];
              data.push([
                datum.kd_kamar + " - " + datum.nm_bangsal,
                datum.jml_pasien,
                datum.jml_ETT?datum.jml_ETT:0,
                datum.jml_CVL?datum.jml_CVL:0, 
                datum.jml_IVL?datum.jml_IVL:0, 
                datum.jml_UC?datum.jml_UC:0,
                datum.jml_VAP?datum.jml_VAP:0,
                datum.jml_IAD?datum.jml_IAD:0,
                datum.jml_PLEB?datum.jml_PLEB:0,
                datum.jml_ISK?datum.jml_ISK:0,
                datum.jml_ILO?datum.jml_ILO:0,
                datum.jml_HAP?datum.jml_HAP:0,
                datum.jml_Tinea?datum.jml_Tinea:0,
                datum.jml_Scabies?datum.jml_Scabies:0,
                datum.jml_DEKU?datum.jml_DEKU:0, 
                datum.jml_SPUTUM?datum.jml_SPUTUM:0,
                datum.jml_DARAH?datum.jml_DARAH:0,
                datum.jml_URINE?datum.jml_URINE:0,
                datum.jml_ANTIBIOTIK?datum.jml_ANTIBIOTIK:0,
                datum.jml_MDR?datum.jml_MDR:0,
                datum.jml_DIFTERI?datum.jml_DIFTERI:0,
                datum.jml_KONSENTRAT?datum.jml_KONSENTRAT:0,
              ]);
            }
          }
          var colHeaders = ["Kamar/Bangsal", "Jumlah Pasien", "ETT", "CVL", 
          "IVL", "UC", "VAP", "IAD", "PLEB", "ISK", "ILO", "HAP", "Tinea", "Scabies",
        "DEKU", "Sputum", "Darah", "Urine", "Antibiotik", "MDR", "DIFTERI", "KONSENTRAT"];
            var colWidths = [300, 130, 50, 50, 50, 50, 50, 50, 
              50, 50, 50, 50, 65, 70, 60, 70, 65, 60, 100, 60, 100, 120];
            var colAlignments = ["left", "center", "center", "center", "center", "center", 
            "center", "center", "center", "center", "center", "center", "center", "center", 
            "center", "center", "center", "center", "center", "center", "center", "center"];
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
              { type: "text", wordWrap: true, readOnly: true }
            ];
            $("#tablePpiKamar").jexcel("destroyAll");
            $("#tablePpiKamar").jexcel({
              data: data,
              colHeaders,
              colWidths,
              colAlignments,
              columns,
              tableOverflow: true,
              tableHeight: "600px",
              csvHeaders:true,
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