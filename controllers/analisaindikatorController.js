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
  $rootScope.currForm = "analisaIndikator";

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
    targetPencapaian,
    id,
    analisa,
    rekomendasi,
    periodeAnalisa,
    monthSelect
  ) => {
    $location.url(
      "/analisaIndikator_edit/"+$rootScope.currPage+"?judul=" +
      judul +
      "&numerator="+ numerator +
      "&denumerator="+ denumerator +
      "&targetPencapaian="+ encodeURIComponent(targetPencapaian) +
      "&idx="+ id +
      "&analisa="+analisa +
      "&rekomendasi="+rekomendasi + 
      "&periodeAnalisa="+periodeAnalisa +
      "&monthSelect="+monthSelect
    );
  };

  $scope.showAnalisaIndikator = (
    judul,
    numerator,
    denumerator,
    target,
    periodeAnalisa,
    id,
  ) => {
    $location.url(
      "/analisaIndikator_new/"+$rootScope.currPage+"?judul=" +
      judul +
      "&numerator="+ numerator +
      "&denumerator="+ denumerator +
      "&target="+ target +
      "&periode_analisa="+ periodeAnalisa +
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
  $rootScope.currForm = "analisaIndikator";

  // Tambahkan log halaman saat ini
  console.log("Halaman saat ini:", $rootScope.currPage);
  // Jika ingin melog semua $routeParams
  console.log("Parameter URL saat ini:", $routeParams);
  
  $scope.dataId = null;
  $scope.judulIndikator = $routeParams.judul;
  $scope.numerator = $routeParams.numerator;
  $scope.denumerator = $routeParams.denumerator;
  $scope.targetPencapaian = $routeParams.targetPencapaian;
  $scope.periodeAnalisa = $routeParams.periode_analisa;
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

    if (!$scope.monthSelect) {
      Swal.fire("Error!", "Periode Analisa tidak boleh kosong.", "error");
      return;
    }
    
    $http
      .post(
        SERVER_URL + "/api/analisaIndikator",
        {
          idx: $scope.idx,
          analisa: $scope.analisa,
          rekomendasi : $scope.rekomendasi,
          monthSelect : $scope.monthSelect,
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
  $http,
  pmkpService,
  $location
) {

  $scope.monthlyNames = [];
  $scope.dataId = null;
  $scope.typeSelect = $routeParams.id;
  var today = new Date();
  $scope.yearSelect = today.getFullYear() + "";
  $scope.target = [];
  $scope.targetHasil = [];
  $scope.monthNames = pmkpService.getMonthNames();
  $scope.yearlyData = [];
  $scope.yearDynamic = [];
  const startYear = 2016;
  const currentYear = new Date().getFullYear();
  $scope.currentYear = currentYear;
  for (let year = startYear; year <= currentYear; year++) {
      $scope.yearDynamic.push(year);
  }

  $rootScope.currPage = $routeParams.id;
  $rootScope.currForm = "analisaIndikator";

  // Tambahkan log halaman saat ini
  console.log("Halaman saat ini:", $rootScope.currPage);
  // Jika ingin melog semua $routeParams
  console.log("Parameter URL saat ini:", $routeParams);
  
  $scope.dataId = null;
  $scope.judulIndikator = $routeParams.judul;
  $scope.numerator = $routeParams.numerator;
  $scope.denumerator = $routeParams.denumerator;
  $scope.targetPencapaian = $routeParams.targetPencapaian;
  $scope.analisa = $routeParams.analisa;
  $scope.rekomendasi = $routeParams.rekomendasi;
  $scope.periodeAnalisa = $routeParams.periodeAnalisa;
  $scope.monthSelect = $routeParams.monthSelect;
  $scope.idx = $routeParams.idx;
  $scope.id = $routeParams.id;

  pmkpService.getDynamicData($rootScope.currPage, (result) => {
    if (result) {
      let iterator = 1;
      Object.keys(result.data).forEach((key) => {
        if (result.data[key]["STATUS_ACC"] == 1 && result.data[key]["analisa_id"]==$scope.idx) {
          if (!$scope.monthlyNames.includes(result.data[key]["JUDUL_INDIKATOR"])) {
            $scope.monthlyNames.push(result.data[key]["JUDUL_INDIKATOR"]);
          }
          $scope.target.push(result.data[key]["TARGET_PENCAPAIAN"]);
          $scope.targetHasil.push(result.data[key]["TARGET_PENCAPAIAN"]);

          iterator++;
        }
      });
    } else {
      console.log("No data or error occurred.");
    }
  });

  $scope.filterMonthly = (monthlyData) => {
    for (var i = monthlyData.length; i < $scope.monthlyNames.length; i++) {
      monthlyData[i] = {
        numerator: "",
        denumerator: "",
        hasil: "",
        analisa: "",
      };
    }
    /*
    var mappingArr = pmkpService.getMonthlyMapping($scope.currPage);
    for (var i = 0; i < mappingArr.length; i++) {
      var mappingUnit = mappingArr[i];
      monthlyData[mappingUnit[0] - 1]["disable_hasil"] = true;
    }
    for (var i = 0; i < $scope.monthlyNames.length; i++) {
      var target = $scope.target[i].toLowerCase();
      if (target.includes("laporan")) {
        monthlyData[i]["type_hasil"] = "laporan";
      } else if (target.includes("mg/l")) {
        monthlyData[i]["type_hasil"] = "mg/l";
      } else if (target.includes("ph 6-9")) {
        monthlyData[i]["type_hasil"] = "ph69";
      } else if (target.includes("menit")) {
        monthlyData[i]["type_hasil"] = "menit";
      } else if (target.includes("jam")) {
        monthlyData[i]["type_hasil"] = "jam";
      } else if (target.includes("hari")) {
        monthlyData[i]["type_hasil"] = "hari";
      } else if (target.startsWith(" ") && target.endsWith(" ")) {
        monthlyData[i]["type_hasil"] = "number";
      } else if (target.includes("%")) {
        monthlyData[i]["type_hasil"] = "percent";
      } else if (target.includes("‰")) {
        monthlyData[i]["type_hasil"] = "permil";
      } else {
        monthlyData[i]["type_hasil"] = "ya/tidak";
      }
    }
      */
  };

  
  $scope.update = () => {

    if (!$scope.analisa) {
      Swal.fire("Error!", "Analisa tidak boleh kosong.", "error");
      return;
    }
    if (!$scope.rekomendasi) {
        Swal.fire("Error!", "Rekomendasi tidak boleh kosong.", "error");
        return;
    }

    if (!$scope.monthSelect) {
      Swal.fire("Error!", "Periode Analisa tidak boleh kosong.", "error");
      return;
    }
    
    $http
      .put(
        SERVER_URL + "/api/analisaIndikator",
        {
          idx: $scope.idx,
          analisa: $scope.analisa,
          rekomendasi : $scope.rekomendasi,
          monthSelect : $scope.monthSelect,
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

  $scope.getData = () => {
    $rootScope.loading = true;
    $http
      .get(
        SERVER_URL +
          "/api/pmkp/getByYearAndType/year/" +
          $scope.yearSelect +
          "/type/" +
          $scope.currPage,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then(
        function (reqRes) {
          $scope.yearlyData = [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
          ];
          if (reqRes.data && reqRes.data != "") {
            for (var i = 0; i < reqRes.data.length; i++) {
              var dataParsed = reqRes.data[i];
              if ($scope.yearlyData[dataParsed.month - 1] !== null) continue;
              dataParsed.dailyData = JSON.parse(dataParsed.dailyData);
              dataParsed.monthlyData = JSON.parse(dataParsed.monthlyData);
              $scope.filterMonthly(dataParsed.monthlyData);
              dataParsed.d = dataParsed.dailyData;
              dataParsed.m = dataParsed.monthlyData;
              $scope.yearlyData[dataParsed.month - 1] = dataParsed;
            }
          }
          data = [];
          for (var i = 0; i < $scope.monthlyNames.length; i++) {
            //var rowData = [$scope.monthlyNames[i], $scope.target[i]];
            let urlLink = "";
            urlLink = $location.protocol() + "://" + $location.host() + 
                          ($location.port() ? ":" + $location.port() : "") +
                          "/synergy/main.html#!/analisaIndikator_new/" + $rootScope.currPage +
                          "?judul=" + encodeURIComponent($scope.monthlyNames[i]) +
                          "&numerator=" + encodeURIComponent($scope.numerator[i] || "") +
                          "&denumerator=" + encodeURIComponent($scope.denumerator[i] || "") +
                          "&target=" + encodeURIComponent($scope.target[i] || "null") +
                          "&periode_analisa=" + encodeURIComponent($scope.periodeAnalisa[i] || "null") +
                          "&idx=" + encodeURIComponent($scope.idx[i]);

            var rowData = [
                '<a href="' + urlLink + '">' + $scope.monthlyNames[i] + '</a>',
                $scope.target[i]
            ];

            for (var j = 0; j < 12; j++) {
              if ($scope.yearlyData[j]) {
                rowData.push($scope.yearlyData[j].monthlyData[i].hasil);
              } else {
                rowData.push("");
              }
            }
            data.push(rowData);
          }
          var colHeaders = ["Name", "Standar"];
          var colWidths = [300, 150];
          var colAlignments = ["left", "center"];
          var columns = [
            {
              type: "text",
              wordWrap: true,
              readOnly: true,
            },
            {
              type: "text",
              wordWrap: true,
              readOnly: true,
            },
          ];
          for (var i = 0; i < 12; i++) {
            colHeaders.push($scope.monthNames[i]);
            colWidths.push(100);
            colAlignments.push("center");
            columns.push({
              type: "text",
              wordWrap: true,
              readOnly: true,
            });
          }
          $("#tableRekap").jexcel("destroyAll");
          $("#tableRekap").jexcel({
            data: data,
            colHeaders,
            colWidths,
            colAlignments,
            columns,
            tableOverflow: true,
            tableHeight: "500px",
          });
          $("#tableRekap").jexcel("updateSettings", {
            table: function (instance, cell, col, row, val, id) {
              if (col >= 2) {
                if (
                  $scope.yearlyData[col - 2] &&
                  val !== null &&
                  val !== ""
                ) {
                  var type =
                    $scope.yearlyData[col - 2].monthlyData[row].type_hasil;
                  switch (type) {
                    case "laporan":
                      $(cell).html(val + " Laporan");
                      break;
                    case "mg/l":
                      $(cell).html(val + " mg/l");
                      break;
                    case "ph69":
                      $(cell).html(val);
                      break;
                    case "menit":
                      $(cell).html(val + " Menit");
                      break;
                    case "jam":
                      $(cell).html(val + " Jam");
                      break;
                    case "hari":
                      $(cell).html(val + " Hari");
                      break;
                    case "number":
                      $(cell).html(val + "");
                      break;
                    case "percent":
                      $(cell).html(val + "%");
                      break;
                    case "permil":
                      $(cell).html(val + "‰");
                      break;
                    case "ya/tidak":
                      if (val === 100 || val === "100") {
                        $(cell).html("Memenuhi");
                      } else {
                        $(cell).html("Tidak Memenuhi");
                      }
                      break;
                    default:
                      $(cell).html(val);
                  }
                } else {
                  $(cell).html(val);
                }
              }
            },
          });

          $rootScope.loading = false;
          
        },
        function () {
          $rootScope.loading = false;
          $.toast({
            heading: "Error",
            text:
              "Error happen when trying to get data on " +
              yearSelect +
              ", please try again or contact support.",
            position: "top-right",
            loaderBg: "#ff6849",
            icon: "error",
            hideAfter: 4000,
            stack: 6,
          });
        }
      );
  };

  $scope.downloadPdf = (idx) => {
    const data = {
      direkturName: localStorage.getItem("nama_direktur"),
      direkturNip: localStorage.getItem("nip_direktur"),  
      rsName: localStorage.getItem("nama_rumah_sakit"),
    };
    const url = REPORT_URL + "/analisa_indikator/" + $scope.currPage + "/" + idx;
    pmkpService.postDownload(url, data, $scope.currPage + ".pdf");
  }

  $scope.downloadChart = (idx,monthSelect) => {

    for (var h = 0; h < $scope.yearlyData.length; h++) {
      let monthlyData = [];
      if ($scope.yearlyData[h]) monthlyData = $scope.yearlyData[h].m;
      for (var i = 0; i < $scope.monthlyNames.length; i++) {
        var target = $scope.target[i].toLowerCase();
        if (!monthlyData[i])
          monthlyData[i] = {
            hasil: null,
          };
        if (target.includes("laporan")) {
          monthlyData[i].hasil_text =
            monthlyData[i].hasil || monthlyData[i].hasil === 0
              ? monthlyData[i].hasil + " laporan"
              : "";
        } else if (target.includes("mg/l")) {
          monthlyData[i].hasil_text =
            monthlyData[i].hasil || monthlyData[i].hasil === 0
              ? monthlyData[i].hasil + " mg/l"
              : "";
        } else if (target.includes("ph 6-9")) {
          monthlyData[i].hasil_text = monthlyData[i].hasil;
        } else if (target.includes("menit")) {
          monthlyData[i].hasil_text =
            monthlyData[i].hasil || monthlyData[i].hasil === 0
              ? monthlyData[i].hasil + " menit"
              : "";
        } else if (target.includes("jam")) {
          monthlyData[i].hasil_text =
            monthlyData[i].hasil || monthlyData[i].hasil === 0
              ? monthlyData[i].hasil + " jam"
              : "";
        } else if (target.includes("hari")) {
          monthlyData[i].hasil_text =
            monthlyData[i].hasil || monthlyData[i].hasil === 0
              ? monthlyData[i].hasil + " hari"
              : "";
        } else if (target.startsWith(" ") && target.endsWith(" ")) {
          monthlyData[i].hasil_text =
            monthlyData[i].hasil || monthlyData[i].hasil === 0
              ? monthlyData[i].hasil + ""
              : "";
        } else if (target.includes("%")) {
          monthlyData[i].hasil_text =
            monthlyData[i].hasil || monthlyData[i].hasil === 0
              ? monthlyData[i].hasil + " %"
              : "";
        } else if (target.includes("‰")) {
          monthlyData[i].hasil_text =
            monthlyData[i].hasil || monthlyData[i].hasil === 0
              ? monthlyData[i].hasil + " ‰"
              : "";
        } else {
          monthlyData[i].hasil_text =
            monthlyData[i].hasil && monthlyData[i].hasil === 100
              ? "Memenuhi"
              : "Tidak Memenuhi";
        }
      }
    }
    const dataList = [];
    for (let i = 0; i < $scope.monthlyNames.length; i++) {
      let criteriaName = $scope.monthlyNames[i];
      let target = $scope.target[i].toLowerCase();
      let targetHasil = $scope.targetHasil[i];
      let axisName = "";
      let isYaTidak = false;
      if (target.includes("laporan")) {
        axisName = "Laporan";
      } else if (target.includes("mg/l")) {
        axisName = "mg/l";
      } else if (target.includes("ph 6-9")) {
        axisName = "PH";
      } else if (target.includes("menit")) {
        axisName = "Menit";
      } else if (target.includes("jam")) {
        axisName = "Jam";
      } else if (target.includes("hari")) {
        axisName = "Hari";
      } else if (target.startsWith(" ") && target.endsWith(" ")) {
        axisName = "Jumlah";
      } else if (target.includes("%")) {
        axisName = "Persen(%)";
      } else if (target.includes("‰")) {
        axisName = "Permil(‰)";
      } else {
        axisName = $scope.target[i];
        isYaTidak = true;
      }
      let dataPencapaian = [];
      let dataStandarBawah = [];
      let dataStandarAtas = [];
      let standarBawah = targetHasil[0];
      let standarAtas = targetHasil[1];
      let minTarget=0;
      let maxTarget=0
      
      for(let i=1;i<=12;i++){
        if(monthSelect==i)
          minTarget=0;
          maxTarget=i;
          break;
      }

      if(monthSelect=="TW_1"){
        minTarget=0;
        maxTarget=3;
      }else  if(monthSelect=="TW_2"){
        minTarget=3;
        maxTarget=6;
      }else  if(monthSelect=="TW_3"){
        minTarget=6;
        maxTarget=9;
      }else  if(monthSelect=="TW_4"){
        minTarget=9;
        maxTarget=12;
      }else  if(monthSelect=="SM_1"){
        minTarget=0;
        maxTarget=6;
      }else  if(monthSelect=="SM_2"){
        minTarget=6;
        maxTarget=12;
      }
      
      for (let monthIdx = minTarget; monthIdx < maxTarget; monthIdx++) {
        let val = $scope.yearlyData[monthIdx]
          ? $scope.yearlyData[monthIdx].m[i].hasil
            ? $scope.yearlyData[monthIdx].m[i].hasil
            : 0
          : 0;
        dataPencapaian.push({
          x: $scope.monthNames[monthIdx].toUpperCase(),
          y: val,
        });
        dataStandarBawah.push({
          x: $scope.monthNames[monthIdx].toUpperCase(),
          y: standarBawah,
        });
        dataStandarAtas.push({
          x: $scope.monthNames[monthIdx].toUpperCase(),
          y: standarAtas,
        });
      }

      let lines = [];

      lines.push({
        name: "PENCAPAIAN",
        data: dataPencapaian,
      });
      if (standarAtas !== undefined && standarAtas !== null) {
        lines.push({
          name: "STANDAR",
          data: dataStandarAtas,
        });
      }
      if (standarBawah != undefined && standarBawah != null) {
        lines.push({
          name: "STANDAR",
          data: dataStandarBawah,
        });
      }

      dataList.push({
        idx: i,
        kriteria: criteriaName,
        chart: {
          options: {
            xTitle: axisName,
          },
          lines: lines,
        },
      });
    }

    const data = {
      direkturName: localStorage.getItem("nama_direktur"),
      direkturNip: localStorage.getItem("nip_direktur"),  
      rsName: localStorage.getItem("nama_rumah_sakit"),
      dataList: dataList,
      monthSelect:monthSelect
    };
    const url = REPORT_URL + "/analisa_indikator/" + $scope.currPage + "/" + idx;
    pmkpService.postDownload(url, data, $scope.currPage + ".pdf");
  }

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

  $scope.getData();

});