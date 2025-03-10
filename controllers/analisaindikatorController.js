sikatApp.controller(
  "analisaIndikatorController",
  function (
    $scope,
    $rootScope,
    $http,
    $filter,
    $location,
    $routeParams,
    pmkpService,
    NgTableParams
  ) {
    $rootScope.currPage = $routeParams.id;
    $rootScope.currForm = "analisaIndikator";

    $scope.monthlyNames = [];
    $scope.dataId = null;
    var today = new Date();
    $scope.yearSelect = today.getFullYear() + "";
    $scope.target = [];
    $scope.targetHasil = [];
    $scope.monthNames = pmkpService.getMonthNames();
    $scope.yearlyData = [];
    $scope.listChart = "";
    $scope.periode = "";
    $scope.tahun = $routeParams.tahun || $scope.yearSelect;

    // Tambahkan log halaman saat ini
    console.log("Halaman saat ini:", $rootScope.currPage);
    // Jika ingin melog semua $routeParams
    console.log("Parameter URL saat ini:", $routeParams);

    $scope.yearDynamic = [];
    const currentYear = new Date().getFullYear();
    $scope.currentYear = currentYear;
    const startYear = currentYear; // Tahun awal tetap
    const endYear = new Date().getFullYear() + 1; // Tahun berjalan + 1 (tahun depan)
    for (let year = startYear; year <= endYear; year++) {
      $scope.yearDynamic.push(year);
    }

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

    $scope.showIndikatorMutu = (id) => {
      $location.url(
        "/indikatorMutu_edit/" + $rootScope.currPage + "?uniqIdx=" + id
      );
    };

    $scope.addIndikatorMutu = () => {
      $location.url("/indikatorMutu_new");
    };

    $scope.downloadPerUnit = (periode, tahun) => {
      $scope.periode = periode;
      $scope.tahun = tahun;
      console.log("periode:" + periode + " tahun:" + tahun);

      pmkpService.getDynamicData(
        $rootScope.currPage,
        $scope.tahun,
        (result) => {
          if (result) {
            Object.keys(result.data).forEach((key) => {
              if (
                result.data[key]["STATUS_ACC"] == "1" &&
                !$scope.monthlyNames.includes(
                  result.data[key]["JUDUL_INDIKATOR"]
                )
              ) {
                const {
                  JUDUL_INDIKATOR,
                  TARGET_PENCAPAIAN,
                  NUMERATOR,
                  DENUMERATOR,
                } = result.data[key];
                $scope.monthlyNames.push(JUDUL_INDIKATOR);
                $scope.target.push(TARGET_PENCAPAIAN);
                $scope.targetHasil.push(TARGET_PENCAPAIAN);

                console.log(
                  "status_acc:" + result.data[key]["STATUS_ACC"],
                  " , indikator:" + result.data[key]["JUDUL_INDIKATOR"]
                );
              }
            });
          } else {
            console.log("No data or error occurred.");
          }
        }
      );

      $scope.downloadChart($scope.periode, $scope.tahun);
    };

    $scope.getDataChartUnit = () => {
      $rootScope.loading = true;
      $http
        .get(
          SERVER_URL +
            "/api/pmkp/getByYearAndType/year/" +
            $scope.tahun +
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
                dataParsed.monthData = JSON.parse(dataParsed.month);
                $scope.filterMonthly(dataParsed.monthlyData);
                dataParsed.d = dataParsed.dailyData;
                dataParsed.m = dataParsed.monthlyData;
                $scope.yearlyData[dataParsed.month - 1] = dataParsed;

                //console.log("year"+JSON.stringify($scope.yearlyData));
              }
            }
            data = [];
            for (var i = 0; i < $scope.monthlyNames.length; i++) {
              var rowData = [$scope.monthlyNames[i], $scope.target[i]];
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

    $scope.validateTarget = (target) => {
      // Daftar satuan yang valid
      const units = ["%", "menit", "jam", "hari", "laporan", "mg/l", "‰", ""];

      // Membersihkan spasi tambahan di sekitar angka dan simbol
      const cleanedTarget = target.trim();

      // Menghapus satuan menggunakan regex untuk mencocokkan daftar satuan
      const unit = units.find((u) => cleanedTarget.includes(u)) || null;

      // Menghapus satuan dari target untuk mendapatkan angka
      const valueWithoutUnit = unit
        ? cleanedTarget.replace(unit, "").trim()
        : cleanedTarget;

      let value = null;

      // Ekstrak angka berdasarkan simbol
      if (valueWithoutUnit.includes("<")) {
        value = valueWithoutUnit.replace(/[<>=]/g, "").trim();
        return [null, parseFloat(value)];
      } else if (valueWithoutUnit.includes(">")) {
        value = valueWithoutUnit.replace(/[<>=]/g, "").trim();
        return [parseFloat(value), null];
      } else if (valueWithoutUnit.includes("=")) {
        value = valueWithoutUnit.replace(/[=]/g, "").trim();
        return [parseFloat(value), null];
      } else {
        // Jika tidak ada simbol
        value = valueWithoutUnit.replace(/[%]/g, "").trim();
        return [parseFloat(value), null];
      }
    };

    $scope.downloadChart = (part, tahun) => {
      let monthlyData = [];
      let monthDataIndex = [];
      let arrayPeriod;
      switch ($scope.periode) {
        case "0":
          arrayPeriod = [1, 2, 3];
          break;
        case "1":
          arrayPeriod = [1, 2, 3, 4, 5, 6];
          break;
        case "2":
          arrayPeriod = [1, 2, 3, 4, 5, 6, 7, 8, 9];
          break;
        case "3":
          arrayPeriod = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
          break;
        default:
          arrayPeriod = []; // default kosong jika nilai $scope.periode tidak valid
      }

      for (var h = 0; h < $scope.yearlyData.length; h++) {
        if ($scope.yearlyData[h]) {
          monthlyData = $scope.yearlyData[h].m;
          let monthData = $scope.yearlyData[h].monthData;
          if (arrayPeriod.includes(monthData)) {
            monthDataIndex = monthlyData;
          }
        }

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
        let targetHasil = $scope.validateTarget(target);
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
        console.log("standarAtas:" + standarAtas);
        console.log("standarBawah:" + standarBawah);
        for (
          let monthIdx = 0;
          monthIdx < (parseInt(part, 10) + 1) * 3;
          monthIdx++
        ) {
          let val = $scope.yearlyData[monthIdx]
            ? $scope.yearlyData[monthIdx].m[i].hasil
              ? $scope.yearlyData[monthIdx].m[i].hasil
              : 0
            : 0;
          dataPencapaian.push({
            x:
              part > 1
                ? $scope.monthNames[monthIdx].substr(0, 3).toUpperCase()
                : $scope.monthNames[monthIdx].toUpperCase(),
            y: val,
          });
          dataStandarBawah.push({
            x:
              part > 1
                ? $scope.monthNames[monthIdx].substr(0, 3).toUpperCase()
                : $scope.monthNames[monthIdx].toUpperCase(),
            y: standarBawah,
          });
          dataStandarAtas.push({
            x:
              part > 1
                ? $scope.monthNames[monthIdx].substr(0, 3).toUpperCase()
                : $scope.monthNames[monthIdx].toUpperCase(),
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

      var partString = "";
      switch (part) {
        case 0:
          partString = "Januari-Maret";
          break;
        case 1:
          partString = "Januari-Juni";
          break;
        case 2:
          partString = "Januari-September";
          break;
        case 3:
          partString = "Januari-Desember";
          break;
      }

      const data = {
        direkturName: localStorage.getItem("nama_direktur"),
        direkturNip: localStorage.getItem("nip_direktur"),
        rsName: localStorage.getItem("nama_rumah_sakit"),
        unit: $scope.currPage,
        tahun: tahun,
        part: partString,
        dataList: dataList,
        unit: $rootScope.currPage,
      };

      const url =
        REPORT_CURRENT_URL + "/analisa_indikator_pdf/" + $scope.currPage + "/" + tahun;
      pmkpService.postDownload(
        url,
        data,
        "Report Analisa Indikator " +
          $scope.formatString($scope.currPage) +
          ".pdf"
      );
    };

    $scope.formatString = (input) => {
      return input
        .replace(/([a-z])([A-Z])/g, "$1 $2") // Tambahkan spasi sebelum huruf kapital
        .split(" ") // Pisahkan kata-kata berdasarkan spasi
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Kapitalisasi huruf pertama tiap kata
        .join(" "); // Gabungkan kembali dengan spasi
    };

    $scope.filterMonthly = (monthlyData) => {
      for (var i = monthlyData.length; i < $scope.monthlyNames.length; i++) {
        monthlyData[i] = {
          numerator: "",
          denumerator: "",
          hasil: "",
          analisa: "",
          month: "",
        };
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
    };

    /*
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
  */
    $scope.showAnalisaIndikatorEdit = (id, periode) => {
      $location.url(
        "/analisaIndikator_edit/" +
          $rootScope.currPage +
          "?idAnalisaUnit=" +
          id +
          "&periodeAnalisa=" +
          periode
      );
    };

    $scope.showAnalisaIndikator = (
      judul,
      numerator,
      denumerator,
      target,
      periodeAnalisa,
      id
    ) => {
      $location.url(
        "/analisaIndikator_new/" +
          $rootScope.currPage +
          "?judul=" +
          judul +
          "&numerator=" +
          numerator +
          "&denumerator=" +
          denumerator +
          "&target=" +
          target +
          "&periode_analisa=" +
          periodeAnalisa +
          "&idx=" +
          id
      );
    };

    $scope.getData = () => {
      var url = SERVER_URL + "/api/analisaIndikator/getByQueryUnit?q=0";
      url += "&unit=" + $rootScope.currPage + "&tahun=" + $scope.tahun;

      $http
        .get(url, { headers: { Authorization: localStorage.getItem("token") } })
        .then(
          function (reqRes) {
            if (reqRes.data && reqRes.data != "") {
              $scope.tableParams = new NgTableParams(
                {},
                { dataset: reqRes.data }
              );
            } else {
              $scope.tableParams = new NgTableParams({}, { dataset: [] });
            }
          },
          function () {
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
              stack: 6,
            });
          }
        );
    };

    $scope.getPeriodeAnalisa = function (periodeAnalisa) {
      switch (periodeAnalisa) {
        case "0":
          return "Januari-Maret";
        case "1":
          return "Januari-Juni";
        case "2":
          return "Januari-September";
        case "3":
          return "Januari-Desember";
        default:
          return "Periode tidak valid";
      }
    };

    $scope.backToList = () => {
      window.history.back();
    };

    $scope.getData();
    $scope.getDataChartUnit();
  }
);

sikatApp.controller(
  "analisaIndikatorNewController",
  function ($scope, $rootScope, $routeParams, $http, pmkpService) {
    $rootScope.currPage = $routeParams.id;
    $rootScope.currForm = "analisaIndikator";

    // Tambahkan log halaman saat ini
    console.log("Halaman saat ini:", $rootScope.currPage);
    // Jika ingin melog semua $routeParams
    console.log("Parameter URL saat ini:", $routeParams);

    $scope.dataId = null;
    $scope.judulIndikator = "";
    $scope.numerator = "";
    $scope.denumerator = "";
    $scope.targetPencapaian = "";
    $scope.periodeAnalisa = "";
    $scope.idx = "";
    $scope.id = $routeParams.id;
    $scope.periode = $routeParams.periode;
    $scope.units = [];
    $scope.monthlyNames = [];
    $scope.monthlyNamesSelected = "";
    $scope.dataId = null;
    $scope.typeSelect = $routeParams.id;
    var today = new Date();
    $scope.yearSelect = today.getFullYear() + "";
    $scope.target = [];
    $scope.targetHasil = [];
    $scope.monthNames = pmkpService.getMonthNames();
    $scope.yearlyData = [];
    $scope.listChart = "";

    $scope.tahun =
      typeof $routeParams.tahun === "undefined"
        ? $scope.yearSelect
        : $routeParams.tahun;
    console.log("tahun::" + $scope.tahun);

    $scope.yearDynamic = [];
    const currentYear = new Date().getFullYear();
    $scope.currentYear = currentYear;
    const startYear = currentYear; // Tahun awal tetap
    const endYear = new Date().getFullYear() + 1; // Tahun berjalan + 1 (tahun depan)
    for (let year = startYear; year <= endYear; year++) {
      $scope.yearDynamic.push(year);
    }

    $scope.getPeriodeAnalisa = function (periodeAnalisa) {
      switch (periodeAnalisa) {
        case "0":
          return "Januari-Maret";
        case "1":
          return "Januari-Juni";
        case "2":
          return "Januari-September";
        case "3":
          return "Januari-Desember";
        default:
          return "Periode tidak valid";
      }
    };

    console.log("Parameter URL saat ini:", $scope.periode);

    $scope.getDynamicData = () => {

      $scope.units = [];
      $scope.monthlyNames = [];
      $scope.target = [];
      $scope.targetHasil = [];

      pmkpService.getDynamicData(
        $rootScope.currPage,
        $scope.tahun,
        (result) => {
          if (result) {
            Object.keys(result.data).forEach((key) => {
              if (
                result.data[key]["STATUS_ACC"] == "1" &&
                !$scope.monthlyNames.includes(
                  result.data[key]["JUDUL_INDIKATOR"]
                )
              ) {
                const {
                  JUDUL_INDIKATOR,
                  TARGET_PENCAPAIAN,
                  NUMERATOR,
                  DENUMERATOR,
                } = result.data[key];
                $scope.units.push(JUDUL_INDIKATOR);
                $scope.monthlyNames.push(JUDUL_INDIKATOR);
                $scope.target.push(TARGET_PENCAPAIAN);
                $scope.targetHasil.push(TARGET_PENCAPAIAN);

                console.log(
                  "status_acc:" + result.data[key]["STATUS_ACC"],
                  " , indikator:" + result.data[key]["JUDUL_INDIKATOR"]
                );
              }
            });
          } else {
            console.log("No data or error occurred.");
          }
        }
      );
    };

    $scope.onUnitChange = function (selectedUnit, year) {
      if (selectedUnit) {
       
        console.log("Unit yang dipilih:", selectedUnit);
        pmkpService.getDynamicData($rootScope.currPage, year, (result) => {
          if (result) {
            for (const key of Object.keys(result.data)) {
              if (
                result.data[key]["STATUS_ACC"] == 1 &&
                result.data[key]["JUDUL_INDIKATOR"] === selectedUnit &&
                result.data[key]["PROCESS_TYPE"] === $rootScope.currPage
              ) {
                $scope.judulIndikator = result.data[key]["JUDUL_INDIKATOR"];
                $scope.numerator = result.data[key]["NUMERATOR"];
                $scope.denumerator = result.data[key]["DENUMERATOR"];
                $scope.targetPencapaian = result.data[key]["TARGET_PENCAPAIAN"];
                $scope.periodeAnalisa = result.data[key]["PERIODE_ANALISA"];
                $scope.idx = result.data[key]["ID"];

                $scope.monthlyNamesSelected = "";
                //$scope.target = [];
                //$scope.targetHasil = [];
                $scope.monthlyNamesSelected = 
                  result.data[key]["JUDUL_INDIKATOR"];
                $scope.target.push(result.data[key]["TARGET_PENCAPAIAN"]);
                $scope.targetHasil.push(result.data[key]["TARGET_PENCAPAIAN"]);
                $scope.rekomendasi = "";
                $scope.analisa = "";

                console.log(
                  "status_acc:" + result.data[key]["STATUS_ACC"],
                  " , indikator:" + result.data[key]["JUDUL_INDIKATOR"]
                );

                $scope.getData();
                $scope.showChart($scope.periode, $scope.tahun);

                break; // Keluar dari loop setelah ditemukan
              }
            }
          } else {
            console.log("No data or error occurred.");
          }
        });
      } else {
        $scope.listChart = "";
        console.log("Tidak ada unit yang dipilih.");
      }
    };

    $scope.save = () => {
      if (!$scope.unit) {
        Swal.fire("Error!", "Indikator tidak boleh kosong.", "error");
        return;
      }

      if (!$scope.analisa) {
        Swal.fire("Error!", "Analisa tidak boleh kosong.", "error");
        return;
      }
      if (!$scope.rekomendasi) {
        Swal.fire("Error!", "Rekomendasi tidak boleh kosong.", "error");
        return;
      }

      if (!$scope.tahun) {
        Swal.fire("Error!", "Tahun tidak boleh kosong.", "error");
        return;
      }

      /*
    if (!$scope.monthSelect) {
      Swal.fire("Error!", "Periode Analisa tidak boleh kosong.", "error");
      return;
    }
    */

      $http
        .post(
          SERVER_URL + "/api/analisaIndikator",
          {
            idx: $scope.idx,
            analisa: $scope.analisa,
            rekomendasi: $scope.rekomendasi,
            periode: $scope.periode,
            tahun: $scope.tahun,
            unit: $rootScope.currPage,
          },
          { headers: { Authorization: localStorage.getItem("token") } }
        )
        .then(
          function (data) {
            swal("Success!", "Data is successfully saved.", "success");
            //window.history.back();
            window.location.href = window.location.href;
            //$scope.rekomendasi = "";
            //$scope.analisa = "";
          },
          function (data) {
            swal("Error!", data.data.message, "error");
          }
        );
    };

    $scope.backToList = () => {
      window.history.back();
    };

    $scope.getData = () => {

      $scope.getDynamicData();
      $rootScope.loading = true;
      $http
        .get(
          SERVER_URL +
            "/api/pmkp/getByYearAndType/year/" +
            $scope.tahun +
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
                dataParsed.monthData = JSON.parse(dataParsed.month);
                $scope.filterMonthly(dataParsed.monthlyData);
                dataParsed.d = dataParsed.dailyData;
                dataParsed.m = dataParsed.monthlyData;
                $scope.yearlyData[dataParsed.month - 1] = dataParsed;

                //console.log("year"+JSON.stringify($scope.yearlyData));
              }
            }
            data = [];
            for (var i = 0; i < $scope.monthlyNames.length; i++) {
              var rowData = [$scope.monthlyNames[i], $scope.target[i]];
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

    $scope.filterMonthly = (monthlyData) => {
      for (var i = monthlyData.length; i < $scope.monthlyNames.length; i++) {
        monthlyData[i] = {
          numerator: "",
          denumerator: "",
          hasil: "",
          analisa: "",
          month: "",
        };
      }

      /*
    var mappingArr = pmkpService.getMonthlyMapping($scope.currPage);
    for (var i = 0; i < mappingArr.length; i++) {
      var mappingUnit = mappingArr[i];
      monthlyData[mappingUnit[0] - 1]["disable_hasil"] = true;
    }
    */
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
    };

    $scope.validateTarget = (target) => {
      // Daftar satuan yang valid
      const units = ["%", "menit", "jam", "hari", "laporan", "mg/l", "‰", ""];

      // Membersihkan spasi tambahan di sekitar angka dan simbol
      const cleanedTarget = target.trim();

      // Menghapus satuan menggunakan regex untuk mencocokkan daftar satuan
      const unit = units.find((u) => cleanedTarget.includes(u)) || null;

      // Menghapus satuan dari target untuk mendapatkan angka
      const valueWithoutUnit = unit
        ? cleanedTarget.replace(unit, "").trim()
        : cleanedTarget;

      let value = null;

      // Ekstrak angka berdasarkan simbol
      if (valueWithoutUnit.includes("<")) {
        value = valueWithoutUnit.replace(/[<>=]/g, "").trim();
        return [null, parseFloat(value)];
      } else if (valueWithoutUnit.includes(">")) {
        value = valueWithoutUnit.replace(/[<>=]/g, "").trim();
        return [parseFloat(value), null];
      } else if (valueWithoutUnit.includes("=")) {
        value = valueWithoutUnit.replace(/[<>=]/g, "").trim();
        return [parseFloat(value), null];
      } else {
        // Jika tidak ada simbol
        value = valueWithoutUnit.replace(/[%]/g, "").trim();
        return [parseFloat(value), null];
      }
    };

    $scope.showChart = (part, tahun) => {
      let monthlyData = [];
      let monthDataIndex = [];
      let arrayPeriod;
      switch ($scope.periode) {
        case "0":
          arrayPeriod = [1, 2, 3];
          break;
        case "1":
          arrayPeriod = [1, 2, 3, 4, 5, 6];
          break;
        case "2":
          arrayPeriod = [1, 2, 3, 4, 5, 6, 7, 8, 9];
          break;
        case "3":
          arrayPeriod = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
          break;
        default:
          arrayPeriod = []; // default kosong jika nilai $scope.periode tidak valid
      }

      for (var h = 0; h < $scope.yearlyData.length; h++) {
        if ($scope.yearlyData[h]) {
          monthlyData = $scope.yearlyData[h].m;
          let monthData = $scope.yearlyData[h].monthData;
          /*console.log("monthData:"+monthData);
          console.log("iterator:"+h);
          console.log("arrayPeriod"+arrayPeriod);
          console.log("arrayPeriodincludes"+arrayPeriod.includes(monthData));*/
          if (arrayPeriod.includes(monthData)) {
            monthDataIndex = monthlyData;
            //console.log("monthlyDataOri"+JSON.stringify(monthlyData));
          }
        }

        for (var i = 0; i < $scope.monthlyNames.length; i++) {
          //console.log("$scope.monthlyNames"+$scope.monthlyNames[i]);
          //console.log("$scope.numerator"+monthlyData[i].numerator);
          //console.log("$scope.denumerator"+monthlyData[i].denumerator);
          //console.log(JSON.stringify(monthlyData));
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
        let targetHasil = $scope.validateTarget(target);
        let axisName = "";
        let isYaTidak = false;

        /*console.log("monthlyData:"+monthDataIndex);
        console.log("arrayPeriod:"+arrayPeriod);
        console.log("$scope.periode:"+$scope.periode);*/

        if (
          $scope.monthlyNamesSelected != null &&
          criteriaName == $scope.monthlyNamesSelected
        ) {
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
          console.log("standarAtas:" + standarAtas);
          console.log("standarBawah:" + standarBawah);
          /*console.log('standarBawah'+standarBawah);
          console.log('standarAtas'+standarAtas);
          console.log("monthlyDAta"+JSON.stringify(monthlyData));*/
          for (
            let monthIdx = 0;
            monthIdx < (parseInt(part, 10) + 1) * 3;
            monthIdx++
          ) {
            let val = $scope.yearlyData[monthIdx]
              ? $scope.yearlyData[monthIdx].m[i].hasil
                ? $scope.yearlyData[monthIdx].m[i].hasil
                : 0
              : 0;
            dataPencapaian.push({
              x:
                part > 1
                  ? $scope.monthNames[monthIdx].substr(0, 3).toUpperCase()
                  : $scope.monthNames[monthIdx].toUpperCase(),
              y: val,
            });
            dataStandarBawah.push({
              x:
                part > 1
                  ? $scope.monthNames[monthIdx].substr(0, 3).toUpperCase()
                  : $scope.monthNames[monthIdx].toUpperCase(),
              y: standarBawah,
            });
            dataStandarAtas.push({
              x:
                part > 1
                  ? $scope.monthNames[monthIdx].substr(0, 3).toUpperCase()
                  : $scope.monthNames[monthIdx].toUpperCase(),
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
      }
      var partString = "";
      switch (part) {
        case 0:
          partString = "Januari-Maret";
          break;
        case 1:
          partString = "Januari-Juni";
          break;
        case 2:
          partString = "Januari-September";
          break;
        case 3:
          partString = "Januari-Desember";
          break;
      }

      $http
        .post(
          REPORT_CURRENT_URL + "/analisa_indikator/" + $scope.currPage,
          {
            direkturName: localStorage.getItem("nama_direktur"),
            direkturNip: localStorage.getItem("nip_direktur"),
            rsName: localStorage.getItem("nama_rumah_sakit"),
            unit: $scope.currPage,
            tahun: tahun,
            part: partString,
            dataList: dataList,
            unit: $rootScope.currPage,
          },
          { headers: { Authorization: localStorage.getItem("token") } }
        )
        .then((response) => {
          // Ambil data dari respons
          const result = response.data;
          console.log("get chart..." + result.listChart);
          $scope.listChart = result.listChart;
        })
        .catch((error) => {
          // Tangani error
          $.toast({
            heading: "Error",
            text: "Error terjadi saat mencoba mendapatkan data. Silakan coba lagi atau hubungi tim dukungan.",
            position: "top-right",
            loaderBg: "#ff6849",
            icon: "error",
            hideAfter: 4000,
            stack: 6,
          });
        });
    };

    $scope.getData();
  }
);

sikatApp.controller(
  "analisaIndikatorEditController",
  function ($scope, $rootScope, $routeParams, $http, pmkpService, $location) {
    $scope.monthlyNames = [];
    $scope.dataId = null;
    $scope.typeSelect = $routeParams.id;
    var today = new Date();
    $scope.yearSelect = today.getFullYear() + "";
    $scope.target = [];
    $scope.targetHasil = [];
    $scope.monthNames = pmkpService.getMonthNames();
    $scope.yearlyData = [];
    /*$scope.yearDynamic = [];
    const startYear = 2016;
    const currentYear = new Date().getFullYear();
    $scope.currentYear = currentYear;
    for (let year = startYear; year <= currentYear; year++) {
      $scope.yearDynamic.push(year);
    }*/

    $rootScope.currPage = $routeParams.id;
    $rootScope.currForm = "analisaIndikator";

    // Tambahkan log halaman saat ini
    console.log("Halaman saat ini:", $rootScope.currPage);
    // Jika ingin melog semua $routeParams
    console.log("Parameter URL saat ini:", $routeParams);

    $scope.yearDynamic = [];
    const currentYear = new Date().getFullYear();
    $scope.currentYear = currentYear;
    const startYear = currentYear; // Tahun awal tetap
    const endYear = new Date().getFullYear() + 1; // Tahun berjalan + 1 (tahun depan)
    for (let year = startYear; year <= endYear; year++) {
      $scope.yearDynamic.push(year);
    }

    $scope.getPeriodeAnalisa = function (periodeAnalisa) {
      switch (periodeAnalisa) {
        case "0":
          return "Januari-Maret";
        case "1":
          return "Januari-Juni";
        case "2":
          return "Januari-September";
        case "3":
          return "Januari-Desember";
        default:
          return "Periode tidak valid";
      }
    };

    $scope.dataId = null;
    $scope.judulIndikator = "";
    $scope.numerator = "";
    $scope.denumerator = "";
    $scope.targetPencapaian = "";
    $scope.analisa = "";
    $scope.rekomendasi = "";
    $scope.periodeAnalisa = "";
    $scope.monthSelect = $routeParams.monthSelect;
    $scope.idx = $routeParams.idx;
    $scope.id = $routeParams.id;
    $scope.analisa = "";
    $scope.rekomendasi = "";
    $scope.idAnalisa = "";

    $scope.id = $routeParams.id;
    $scope.periode = $routeParams.periodeAnalisa;
    $scope.idAnalisaUnit = $routeParams.idAnalisaUnit;

    console.log("periode:" + $scope.periode);

    $scope.units = [];
    $scope.monthlyNames = [];
    $scope.monthlyNamesSelected = "";
    $scope.dataId = null;
    $scope.typeSelect = $routeParams.id;
    var today = new Date();
    $scope.yearSelect = today.getFullYear() + "";
    $scope.target = [];
    $scope.targetHasil = [];
    $scope.monthNames = pmkpService.getMonthNames();
    $scope.yearlyData = [];
    $scope.listChart = "";

    $scope.tahun =
    typeof $routeParams.tahun === "undefined"
      ? $scope.yearSelect
      : $routeParams.tahun;
    console.log("tahun::" + $scope.tahun);

    $scope.getDynamicData = () => {

      $scope.units = [];
      $scope.monthlyNames = [];
      $scope.target = [];
      $scope.targetHasil = [];

      pmkpService.getDynamicData(
        $rootScope.currPage,
        $scope.tahun,
        (result) => {
          if (result) {
            Object.keys(result.data).forEach((key) => {
              if (
                result.data[key]["STATUS_ACC"] == "1" &&
                !$scope.monthlyNames.includes(
                  result.data[key]["JUDUL_INDIKATOR"]
                )
              ) {
                const {
                  JUDUL_INDIKATOR,
                  TARGET_PENCAPAIAN,
                  NUMERATOR,
                  DENUMERATOR,
                } = result.data[key];
                $scope.units.push(JUDUL_INDIKATOR);
                $scope.monthlyNames.push(JUDUL_INDIKATOR);
                $scope.target.push(TARGET_PENCAPAIAN);
                $scope.targetHasil.push(TARGET_PENCAPAIAN);

                console.log(
                  "status_acc:" + result.data[key]["STATUS_ACC"],
                  " , indikator:" + result.data[key]["JUDUL_INDIKATOR"]
                );
              }
            });
          } else {
            console.log("No data or error occurred.");
          }
        }
      );
    };

    /*
    pmkpService.getDynamicData($rootScope.currPage, (result) => {
      if (result) {
        let iterator = 1;
        Object.keys(result.data).forEach((key) => {
          if (
            result.data[key]["STATUS_ACC"] == 1 &&
            result.data[key]["analisa_id"] == $scope.idx
          ) {
            if (
              !$scope.monthlyNames.includes(result.data[key]["JUDUL_INDIKATOR"])
            ) {

              $scope.monthlyNames.push(result.data[key]["JUDUL_INDIKATOR"]);
              $scope.target.push(result.data[key]["TARGET_PENCAPAIAN"]);
              $scope.targetHasil.push(result.data[key]["TARGET_PENCAPAIAN"]);
            }
            
            iterator++;
          }
        });
      } else {
        console.log("No data or error occurred.");
      }
    });
    */

    $scope.onUnitChange = function (selectedUnit,year) {
      if (selectedUnit) {
        console.log("Unit yang dipilih:", selectedUnit);
        $scope.listChart = "";

        var url = SERVER_URL + "/api/analisaIndikator/getByQuery?q=0";
        url += "&unit=" + $rootScope.currPage + "&tahun=" + year;

        $http
          .get(url, {
            headers: { Authorization: localStorage.getItem("token") },
          })
          .then(
            function (result) {
              if (result.data && result.data != "") {
                for (const key of Object.keys(result.data)) {
                  if (
                    result.data[key]["STATUS_ACC"] == 1 &&
                    result.data[key]["JUDUL_INDIKATOR"] == selectedUnit &&
                    result.data[key]["PROCESS_TYPE"] == $rootScope.currPage &&
                    result.data[key]["period"] == $scope.periode
                  ) {
                    $scope.judulIndikator = result.data[key]["JUDUL_INDIKATOR"];
                    $scope.numerator = result.data[key]["NUMERATOR"];
                    $scope.denumerator = result.data[key]["DENUMERATOR"];
                    $scope.targetPencapaian =
                      result.data[key]["TARGET_PENCAPAIAN"];
                    $scope.periodeAnalisa = result.data[key]["PERIODE_ANALISA"];
                    $scope.idx = result.data[key]["ID"];
                    $scope.idAnalisa = result.data[key]["id"];
                    $scope.analisa = result.data[key]["analisa"];
                    $scope.rekomendasi = result.data[key]["rekomendasi"];

                    $scope.monthlyNamesSelected = "";
                    $scope.monthlyNamesSelected =
                      result.data[key]["JUDUL_INDIKATOR"];
                    $scope.target.push(result.data[key]["TARGET_PENCAPAIAN"]);
                    $scope.targetHasil.push(
                      result.data[key]["TARGET_PENCAPAIAN"]
                    );

                    console.log(
                      "status_acc:" + result.data[key]["STATUS_ACC"],
                      " , indikator:" + result.data[key]["JUDUL_INDIKATOR"]
                    );

                    $scope.getData();
                    $scope.showChart($scope.periode, $scope.tahun);

                    break;
                  } else {
                    pmkpService.getDynamicData(
                      $rootScope.currPage,
                      year,
                      (result) => {
                        if (result) {
                          for (const key of Object.keys(result.data)) {
                            if (
                              result.data[key]["STATUS_ACC"] == 1 &&
                              result.data[key]["JUDUL_INDIKATOR"] ==
                                selectedUnit &&
                              result.data[key]["PROCESS_TYPE"] ==
                                $rootScope.currPage
                            ) {
                              $scope.judulIndikator =
                                result.data[key]["JUDUL_INDIKATOR"];
                              $scope.numerator = result.data[key]["NUMERATOR"];
                              $scope.denumerator =
                                result.data[key]["DENUMERATOR"];
                              $scope.targetPencapaian =
                                result.data[key]["TARGET_PENCAPAIAN"];
                              $scope.periodeAnalisa =
                                result.data[key]["PERIODE_ANALISA"];
                              $scope.idx = result.data[key]["ID"];

                              $scope.analisa = "";
                              $scope.rekomendasi = "";
                              $scope.idAnalisa = "";
                              $scope.monthlyNamesSelected = "";

                              $scope.monthlyNamesSelected =
                                result.data[key]["JUDUL_INDIKATOR"];
                              $scope.target.push(
                                result.data[key]["TARGET_PENCAPAIAN"]
                              );
                              $scope.targetHasil.push(
                                result.data[key]["TARGET_PENCAPAIAN"]
                              );

                              console.log(
                                "status_acc:" + result.data[key]["STATUS_ACC"],
                                " , indikator:" +
                                  result.data[key]["JUDUL_INDIKATOR"]
                              );

                              $scope.getData();
                              $scope.showChart($scope.periode, $scope.tahun);

                              break; // Keluar dari loop setelah ditemukan
                            }
                          }
                        } else {
                          console.log("No data or error occurred.");
                        }
                      }
                    );
                  }
                }
              }
            },
            function () {
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
                stack: 6,
              });
            }
          );
      }
    };

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
      */
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
    };

    $scope.update = () => {
      if (!$scope.unit) {
        Swal.fire("Error!", "Indikator tidak boleh kosong.", "error");
        return;
      }

      if (!$scope.analisa) {
        Swal.fire("Error!", "Analisa tidak boleh kosong.", "error");
        return;
      }
      if (!$scope.rekomendasi) {
        Swal.fire("Error!", "Rekomendasi tidak boleh kosong.", "error");
        return;
      }

      if (!$scope.tahun) {
        Swal.fire("Error!", "Tahun tidak boleh kosong.", "error");
        return;
      }

      /*if (!$scope.monthSelect) {
      Swal.fire("Error!", "Periode Analisa tidak boleh kosong.", "error");
      return;
    }*/

      $http
        .put(
          SERVER_URL + "/api/analisaIndikator",
          {
            idx: $scope.idAnalisaUnit,
            idProfileIndikator: $scope.idx,
            idAnalisa: $scope.idAnalisa,
            analisa: $scope.analisa,
            rekomendasi: $scope.rekomendasi,
            tahun: $scope.tahun,
            periode: $scope.periode,
            unit: $rootScope.currPage,
          },
          { headers: { Authorization: localStorage.getItem("token") } }
        )
        .then(
          function (data) {
            swal("Success!", "Data is successfully saved.", "success");
            //window.history.back();
            window.location.href = window.location.href;
            //$scope.rekomendasi = "";
            //$scope.analisa = "";
          },
          function (data) {
            swal("Error!", data.data.message, "error");
          }
        );
    };

    $scope.getData = () => {

      $scope.getDynamicData();
      $rootScope.loading = true;
      $http
        .get(
          SERVER_URL +
            "/api/pmkp/getByYearAndType/year/" +
            $scope.tahun +
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
                dataParsed.monthData = JSON.parse(dataParsed.month);
                $scope.filterMonthly(dataParsed.monthlyData);
                dataParsed.d = dataParsed.dailyData;
                dataParsed.m = dataParsed.monthlyData;
                $scope.yearlyData[dataParsed.month - 1] = dataParsed;

                //console.log("year"+JSON.stringify($scope.yearlyData));
              }
            }
            data = [];
            for (var i = 0; i < $scope.monthlyNames.length; i++) {
              var rowData = [$scope.monthlyNames[i], $scope.target[i]];
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

    $scope.filterMonthly = (monthlyData) => {
      for (var i = monthlyData.length; i < $scope.monthlyNames.length; i++) {
        monthlyData[i] = {
          numerator: "",
          denumerator: "",
          hasil: "",
          analisa: "",
          month: "",
        };
      }

      /*
    var mappingArr = pmkpService.getMonthlyMapping($scope.currPage);
    for (var i = 0; i < mappingArr.length; i++) {
      var mappingUnit = mappingArr[i];
      monthlyData[mappingUnit[0] - 1]["disable_hasil"] = true;
    }
    */
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
    };

    $scope.downloadPdf = (idx) => {
      const data = {
        direkturName: localStorage.getItem("nama_direktur"),
        direkturNip: localStorage.getItem("nip_direktur"),
        rsName: localStorage.getItem("nama_rumah_sakit"),
      };
      const url =
        REPORT_CURRENT_URL + "/analisa_indikator/" + $scope.currPage + "/" + idx;
      pmkpService.postDownload(url, data, $scope.currPage + ".pdf");
    };

    $scope.validateTarget = (target) => {
      // Daftar satuan yang valid
      const units = ["%", "menit", "jam", "hari", "laporan", "mg/l", "‰", ""];

      // Membersihkan spasi tambahan di sekitar angka dan simbol
      const cleanedTarget = target.trim();

      // Menghapus satuan menggunakan regex untuk mencocokkan daftar satuan
      const unit = units.find((u) => cleanedTarget.includes(u)) || null;

      // Menghapus satuan dari target untuk mendapatkan angka
      const valueWithoutUnit = unit
        ? cleanedTarget.replace(unit, "").trim()
        : cleanedTarget;

      let value = null;

      // Ekstrak angka berdasarkan simbol
      if (valueWithoutUnit.includes("<")) {
        value = valueWithoutUnit.replace(/[<>=]/g, "").trim();
        return [null, parseFloat(value)];
      } else if (valueWithoutUnit.includes(">")) {
        value = valueWithoutUnit.replace(/[<>=]/g, "").trim();
        return [parseFloat(value), null];
      } else if (valueWithoutUnit.includes("=")) {
        value = valueWithoutUnit.replace(/[=]/g, "").trim();
        return [parseFloat(value), null];
      } else {
        // Jika tidak ada simbol
        value = valueWithoutUnit.replace(/[%]/g, "").trim();
        return [parseFloat(value), null];
      }
    };

    $scope.showChart = (part, tahun) => {
      let monthlyData = [];
      let monthDataIndex = [];
      let arrayPeriod;
      console.log("period" + $scope.periode);
      switch ($scope.periode) {
        case "0":
          arrayPeriod = [1, 2, 3];
          break;
        case "1":
          arrayPeriod = [1, 2, 3, 4, 5, 6];
          break;
        case "2":
          arrayPeriod = [1, 2, 3, 4, 5, 6, 7, 8, 9];
          break;
        case "3":
          arrayPeriod = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
          break;
        default:
          arrayPeriod = []; // default kosong jika nilai $scope.periode tidak valid
      }

      for (var h = 0; h < $scope.yearlyData.length; h++) {
        if ($scope.yearlyData[h]) {
          monthlyData = $scope.yearlyData[h].m;
          let monthData = $scope.yearlyData[h].monthData;
          if (arrayPeriod.includes(monthData)) {
            monthDataIndex = monthlyData;
          }
        }

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
        let targetHasil = $scope.validateTarget(target);
        let axisName = "";
        let isYaTidak = false;

        if (
          $scope.monthlyNamesSelected != null &&
          criteriaName == $scope.monthlyNamesSelected
        ) {
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
          console.log("standarAtas:" + standarAtas);
          console.log("standarBawah:" + standarBawah);
          for (
            let monthIdx = 0;
            monthIdx < (parseInt(part, 10) + 1) * 3;
            monthIdx++
          ) {
            console.log("monthindx" + monthIdx);
            let val = $scope.yearlyData[monthIdx]
              ? $scope.yearlyData[monthIdx].m[i].hasil
                ? $scope.yearlyData[monthIdx].m[i].hasil
                : 0
              : 0;
            dataPencapaian.push({
              x:
                part > 1
                  ? $scope.monthNames[monthIdx].substr(0, 3).toUpperCase()
                  : $scope.monthNames[monthIdx].toUpperCase(),
              y: val,
            });
            dataStandarBawah.push({
              x:
                part > 1
                  ? $scope.monthNames[monthIdx].substr(0, 3).toUpperCase()
                  : $scope.monthNames[monthIdx].toUpperCase(),
              y: standarBawah,
            });
            dataStandarAtas.push({
              x:
                part > 1
                  ? $scope.monthNames[monthIdx].substr(0, 3).toUpperCase()
                  : $scope.monthNames[monthIdx].toUpperCase(),
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
      }

      var partString = "";
      switch (part) {
        case 0:
          partString = "Januari-Maret";
          break;
        case 1:
          partString = "Januari-Juni";
          break;
        case 2:
          partString = "Januari-September";
          break;
        case 3:
          partString = "Januari-Desember";
          break;
      }

      $http
        .post(
          REPORT_CURRENT_URL + "/analisa_indikator/" + $scope.currPage,
          {
            direkturName: localStorage.getItem("nama_direktur"),
            direkturNip: localStorage.getItem("nip_direktur"),
            rsName: localStorage.getItem("nama_rumah_sakit"),
            unit: $scope.currPage,
            tahun: tahun,
            part: partString,
            dataList: dataList,
            unit: $rootScope.currPage,
          },
          { headers: { Authorization: localStorage.getItem("token") } }
        )
        .then((response) => {
          // Ambil data dari respons
          const result = response.data;
          console.log("get chart..." + result.listChart);
          $scope.listChart = result.listChart;
        })
        .catch((error) => {
          // Tangani error
          $.toast({
            heading: "Error",
            text: "Error terjadi saat mencoba mendapatkan data. Silakan coba lagi atau hubungi tim dukungan.",
            position: "top-right",
            loaderBg: "#ff6849",
            icon: "error",
            hideAfter: 4000,
            stack: 6,
          });
        });
    };

    $scope.delete = () => {
      var url = SERVER_URL + "/api/analisaIndikator/delete?id=" + $scope.idx;

      $http
        .get(url, { headers: { Authorization: localStorage.getItem("token") } })
        .then(
          function (reqRes) {
            if (reqRes.data && reqRes.data != "") {
              swal("Success!", "Data is successfully updated.", "success");
              window.history.back();
            }
          },
          function () {
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
              stack: 6,
            });
          }
        );
    };

    $scope.backToList = () => {
      window.history.back();
    };

    $scope.getData();
  }
);
