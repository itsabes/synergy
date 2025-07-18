sikatApp.controller(
  "formAController",
  function ($scope, $rootScope, $routeParams, $http, utils, pmkpService) {
    $rootScope.currPage = $routeParams.id;
    $rootScope.currForm = "formA";

    // calculate latest date that can be inputted
    $scope.todayString = new moment().format("D/MMM/YYYY");
    var today = new moment();
    $rootScope.waktuKunciPmkp = localStorage.getItem("waktu_kunci_pmkp");
    $scope.latestDateToInput = today.subtract($rootScope.waktuKunciPmkp, "d");
    $scope.dailyNames = [];
    $scope.monthlyMapping = [];
    $scope.monthNames = pmkpService.getMonthNames();
    $scope.dataId = null;
    $scope.typeSelect = $routeParams.id;
    var today = new Date();
    $scope.monthSelect = today.getMonth() + 1 + "";
    $scope.yearSelect = $routeParams.yearSelect
      ? $routeParams.yearSelect
      : today.getFullYear() + "";
    $scope.dailyData = [];
    $scope.monthlyData = [];
    // FUNCTIONS
    $scope.getTotalFor = function (idx) {
      var total = 0;
      var dailyData = $scope.dailyData[idx];
      if (dailyData) {
        for (var i = 0; i < dailyData.length; i++) {
          if (dailyData[i]) {
            total += parseInt(dailyData[i]);
          }
        }
      }
      return total;
    };

    $scope.yearDynamic = [];
    const currentYear = new Date().getFullYear(); // Tahun berjalan
    $scope.currentYear = currentYear;
    $scope.yearDynamic.push(currentYear, currentYear + 1); // Tambahkan tahun berjalan dan tahun depan
    console.log("$scope.yearDynamic:" + $scope.yearDynamic);

    $scope.dailyToMonthly = (dailyData, monthlyData, utils) => {
      pmkpService.getDynamicData(
        $rootScope.currPage,
        $scope.yearSelect,
        (result) => {
          if (result) {
            console.log("Received data:", result.data);
            console.log("Received dailyData:", dailyData);
            console.log("Received monthlyData:", monthlyData);

            let numeratorIdx = 0;
            let denumeratorIdx = 1;
            let indexTemp = 0;

            Object.keys(result.data).forEach((key) => {
              if (result.data[key]["STATUS_ACC"] == "1") {
                if (monthlyData[key] === undefined) monthlyData[key] = {};
                console.log("indexTemp:" + indexTemp);

                if (
                  result.data[key]["NUMERATOR"] !== "" &&
                  result.data[key]["DENUMERATOR"] !== ""
                ) {
                  if (indexTemp > 0) {
                    monthlyData[key].numerator = utils.sumArray(
                      dailyData[indexTemp],
                      31
                    );

                    monthlyData[key].denumerator = utils.sumArray(
                      dailyData[indexTemp + 1],
                      31
                    );

                    indexTemp = 0;
                  } else {
                    if (dailyData[numeratorIdx] !== undefined) {
                      monthlyData[key].numerator = utils.sumArray(
                        dailyData[numeratorIdx],
                        31
                      );
                    }

                    if (dailyData[denumeratorIdx] !== undefined) {
                      monthlyData[key].denumerator = utils.sumArray(
                        dailyData[denumeratorIdx],
                        31
                      );
                    }
                  }
                } else {
                  console.log(
                    "indexTemp update :" + result.data[key]["JUDUL_INDIKATOR"]
                  );
                  /*console.log("dailyData[numeratorIdx] :"+ dailyData[numeratorIdx]);
                console.log("dailyData[denumeratorIdx] :"+ dailyData[denumeratorIdx]);
                console.log("numeratorIdx :"+ numeratorIdx);
                console.log("denumeratorIdx :"+ denumeratorIdx);*/

                  monthlyData[key].numerator = 0;
                  monthlyData[key].denumerator = 0;
                  if (
                    dailyData[numeratorIdx] !== undefined &&
                    dailyData[denumeratorIdx] !== undefined
                  ) {
                    indexTemp = numeratorIdx;
                  }
                }

                if (
                  monthlyData[key].denumerator == 0 &&
                  monthlyData[key].numerator != 0
                ) {
                  monthlyData[key].hasil = 100;
                } else if (
                  monthlyData[key].numerator == 0 &&
                  monthlyData[key].denumerator == 0
                ) {
                  monthlyData[key].hasil = 0;
                  // if ($rootScope.currPage == "hcu") {
                  //   if ($scope.monthSelect == "3") {
                  //     monthlyData[key].hasil = 100;
                  //   }
                  // } else if ($rootScope.currPage == "kamarBersalin") {
                  //   if (
                  //     $scope.monthSelect == "6" ||
                  //     $scope.monthSelect == "7" ||
                  //     $scope.monthSelect == "8"
                  //   ) {
                  //     monthlyData[key].hasil = 100;
                  //   }
                  // } else if ($rootScope.currPage == "k3rs") {
                  //   if (
                  //     $scope.monthSelect == "1" ||
                  //     $scope.monthSelect == "2" ||
                  //     $scope.monthSelect == "3"
                  //   ) {
                  //     monthlyData[key].hasil = 100;
                  //   }
                  // } else if ($rootScope.currPage == "timPonek") {
                  //   if ($scope.monthSelect == "1") {
                  //     monthlyData[key].hasil = 100;
                  //   }
                  // }
                } else {
                  monthlyData[key].hasil =
                    monthlyData[key].numerator / monthlyData[key].denumerator;
                  var target =
                    result.data[key]["TARGET_PENCAPAIAN"] !== null &&
                    result.data[key]["TARGET_PENCAPAIAN"] !== undefined
                      ? result.data[key]["TARGET_PENCAPAIAN"].toLowerCase()
                      : "";

                  if (target.includes("%")) {
                    monthlyData[key].hasil =
                      Math.round(monthlyData[key].hasil * 100 * 10000) / 10000;
                  } else if (target.includes("‰")) {
                    monthlyData[key].hasil =
                      Math.round(monthlyData[key].hasil * 1000 * 10000) / 10000;
                  } else {
                    monthlyData[key].hasil =
                      Math.round(monthlyData[key].hasil * 10000) / 10000;
                  }
                }

                if (
                  result.data[key]["NUMERATOR"] !== "" &&
                  result.data[key]["DENUMERATOR"] !== ""
                ) {
                  numeratorIdx += 2;
                  denumeratorIdx += 2;
                }
              }
            });
          } else {
            console.log("No data or error occurred.");
          }
        }
      );
    };

    $scope.save = () => {
      $scope.dailyToMonthly($scope.dailyData, $scope.monthlyData, utils);
      let monthlyData = $scope.monthlyData.filter((item) => {
        return (
          item &&
          typeof item.numerator === "number" &&
          item.numerator >= 0 &&
          typeof item.denumerator === "number" &&
          item.denumerator >= 0 &&
          item.hasOwnProperty("hasil")
        );
      });

      console.log("Received $scope.monthlyData:", monthlyData);
      pmkpService.save(
        $scope.dataId,
        $scope.typeSelect,
        $scope.yearSelect,
        $scope.monthSelect,
        $scope.dailyData,
        monthlyData
      );
    };

    $scope.getData = () => {
      $rootScope.loading = true;
      pmkpService.getData(
        $scope.currPage,
        $scope.yearSelect,
        $scope.monthSelect,
        (result) => {
          $scope.dataId = result.dataId;
          $scope.dailyData = result.dailyData;
          $scope.monthlyData = result.monthlyData;
          data = [];

          pmkpService.getDynamicDataFormA(
            $rootScope.currPage,
            $scope.yearSelect,
            (result) => {
              if (result) {
                const size = Object.keys(result.data).length;
                const entries = Object.entries(result.data);

                for (var i = 0; i < size; i++) {
                  const [key, value] = entries[i];
                  if (!$scope.dailyData[i]) {
                    $scope.dailyData[i] = [];
                    for (var j = 0; j < 31; j++) {
                      $scope.dailyData[i].push("");
                    }
                  }

                  var columnRefNo = value.ORDERS;
                  var rowData = [columnRefNo, value.JUDUL];
                  for (var j = 0; j < 31; j++) {
                    if (j < $scope.dailyData[i].length) {
                      if (
                        $scope.dailyData[i][j] !== undefined &&
                        $scope.dailyData[i][j] !== ""
                      ) {
                        $scope.dailyData[i][j] = isNaN($scope.dailyData[i][j])
                          ? 0
                          : Number($scope.dailyData[i][j]);
                      }
                      rowData.push($scope.dailyData[i][j]);
                    } else {
                      rowData.push("");
                    }
                  }
                  rowData.push("=SUM(C" + (i + 1) + ":AG" + (i + 1) + ")");
                  data.push(rowData);
                }

                var colHeaders = ["Form B No.", "Name"];
                var colWidths = [110, 300];
                var colAlignments = ["center", "left"];
                var columns = [
                  {
                    type: "numeric",
                    readOnly: true,
                  },
                  {
                    type: "text",
                    wordWrap: true,
                    readOnly: true,
                  },
                ];
                for (var i = 0; i < 31; i++) {
                  colHeaders.push(i + 1 + "");
                  colWidths.push(30);
                  colAlignments.push("center");

                  var loopDate = moment({
                    year: parseInt($scope.yearSelect),
                    month: $scope.monthSelect - 1,
                    date: i + 1,
                  });
                  if (loopDate.isAfter($scope.latestDateToInput)) {
                    columns.push({
                      type: "numeric",
                    });
                  } else {
                    columns.push({
                      type: "numeric",
                      readOnly: true,
                    });
                  }
                }
                colHeaders.push("Total");
                colWidths.push(70);
                colAlignments.push("center");
                columns.push({
                  type: "numeric",
                  readOnly: true,
                });
                $("#tableFormA").jexcel("destroyAll");
                $("#tableFormA").jexcel({
                  data: data,
                  colHeaders,
                  colWidths,
                  colAlignments,
                  columns,
                  tableOverflow: true,
                  tableHeight: "500px",
                  onchange: function (obj, cel, val) {
                    var colRow = $(cel).prop("id").split("-");
                    $scope.dailyData[colRow[1] - 0][colRow[0] - 2] = val;
                  },
                });
                $rootScope.loading = false;
                // });
              } else {
                console.log("No data or error occurred.");
              }
            }
          );
        },
        () => ($rootScope.loading = false)
      );
    };

    $scope.formatString = (input) => {
      return input
        .replace(/([a-z])([A-Z])/g, "$1 $2") // Tambahkan spasi sebelum huruf kapital
        .split(" ") // Pisahkan kata-kata berdasarkan spasi
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Kapitalisasi huruf pertama tiap kata
        .join(" "); // Gabungkan kembali dengan spasi
    };

    $scope.downloadExcel = () => {
      for (var i = 0; i < $scope.dailyData.length; i += 1) {
        for (var j = 0; j < $scope.dailyData[i].length; j += 1) {
          if (
            typeof $scope.dailyData[i][j] === "string" &&
            $scope.dailyData[i][j] !== ""
          ) {
            $scope.dailyData[i][j] = $scope.dailyData[i][j] - 0;
          }
        }
      }
      const data = {
        direkturName: localStorage.getItem("nama_direktur"),
        direkturNip: localStorage.getItem("nip_direktur"),
        rsName: localStorage.getItem("nama_rumah_sakit"),
        monthSelectedName: $scope.monthNames[$scope.monthSelect - 1],
        yearSelected: $scope.yearSelect,
        todayDate:
          today.getDate() +
          " " +
          $scope.monthNames[today.getMonth()] +
          " " +
          today.getFullYear(),
        d: $scope.dailyData,
        m: $scope.monthlyData,
        unit: $rootScope.currPage,
      };
      const url = REPORT_CURRENT_URL + "/pdf_a/" + $scope.currPage;
      pmkpService.postDownload(
        url,
        data,
        "Report Form A " + $scope.formatString($scope.currPage) + ".pdf"
      );
    };
    $scope.getData();
  }
);

sikatApp.controller(
  "formBController",
  function ($scope, $rootScope, $routeParams, pmkpService) {
    $rootScope.currPage = $routeParams.id;
    $rootScope.currForm = "formB";
    $scope.specialCalcDailyToMonthly = []; //pmkpService.getDailyMonthlySpecialHasilCalculation($rootScope.currPage);
    $scope.monthlyNames = [];
    $scope.monthlyDisable = []; //pmkpService.getMonthlyDisable($rootScope.currPage);
    $scope.monthNames = pmkpService.getMonthNames();
    $scope.dailyNames = []; //pmkpService.getDailyNames($scope.currPage);
    $scope.dynamicId = {};
    $scope.dataId = null;
    $scope.typeSelect = $routeParams.id;
    var today = new Date();
    $scope.monthSelect = today.getMonth() + 1 + "";
    $scope.yearSelect = $routeParams.yearSelect
      ? $routeParams.yearSelect
      : today.getFullYear() + "";
    $scope.target = [];

    $scope.getDynamicData = () => {
      // Reset arrays at the beginning
      $scope.monthlyNames = [];
      $scope.target = [];
      $scope.monthlyDisable = [];
    
      pmkpService.getDynamicData(
        $rootScope.currPage,
        $scope.yearSelect,
        (result) => {
          if (result && Array.isArray(result.data) && result.data.length > 0) {
            let iterator = 1;
            Object.keys(result.data).forEach((key) => {
              if (result.data[key]["STATUS_ACC"] == 1) {
                $scope.monthlyNames.push(result.data[key]["JUDUL_INDIKATOR"]);
                $scope.target.push(result.data[key]["TARGET_PENCAPAIAN"]);
    
                // Cek apakah numerator dan denumerator kosong
                if (
                  result.data[key]["NUMERATOR"] &&
                  result.data[key]["DENUMERATOR"]
                ) {
                  // Jika kosong, set monthlyDisable dengan format [iterator, "numerator", "denumerator", "hasil"]
                  $scope.monthlyDisable.push([
                    iterator,
                    "numerator",
                    "denumerator",
                    "hasil",
                  ]);
                }
    
                iterator++;
              }
            });
          } else {
            // Jika tidak ada data, log pesan
            console.log("No data or error occurred.");
          }
        }
      );
    };
    

    $scope.yearDynamic = [];
    const currentYear = new Date().getFullYear(); // Tahun berjalan
    $scope.currentYear = currentYear;
    $scope.yearDynamic.push(currentYear, currentYear + 1); // Tambahkan tahun berjalan dan tahun depan

    $scope.filterMonthly = (monthlyData) => {
      for (var i = 0; i < $scope.monthlyNames.length; i++) {
        if (monthlyData[i]) {
          delete monthlyData[i].disable_hasil;
        } else {
          monthlyData[i] = {
            numerator: "",
            denumerator: "",
            hasil: "",
            analisa: "",
          };
        }
      }

      for (var i = 0; i < $scope.monthlyNames.length; i++) {
        if ($scope.target[i] != null) {
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
          } else if (target.includes("%")) {
            monthlyData[i]["type_hasil"] = "percent";
          } else if (target.includes("‰")) {
            monthlyData[i]["type_hasil"] = "permil";
          } else if (target.startsWith(" ") && target.endsWith(" ")) {
            monthlyData[i]["type_hasil"] = "number";
          } else {
            monthlyData[i]["type_hasil"] = "ya/tidak";
          }
        }
      }
    };
    $scope.yaTidakOptions = [
      {
        value: 100,
        text: "Ya",
      },
      {
        value: 0,
        text: "Tidak",
      },
    ];
    $scope.showYaTidak = function () {
      var selected = $filter("filter")($scope.statuses, {
        value: $scope.user.status,
      });
      return $scope.user.status && selected.length
        ? selected[0].text
        : "Not set";
    };
    $scope.dailyData = [];
    $scope.monthlyData = [];

    // FUNCTIONS
    $scope.save = () =>
      pmkpService.save(
        $scope.dataId,
        $scope.typeSelect,
        $scope.yearSelect,
        $scope.monthSelect,
        $scope.dailyData,
        $scope.monthlyData
      );

    $scope.getData = () => {
      $rootScope.loading = true;
      $scope.getDynamicData();

      pmkpService.getData(
        $scope.currPage,
        $scope.yearSelect,
        $scope.monthSelect,
        (result) => {
          $scope.dataId = result.dataId;
          $scope.dailyData = result.dailyData;
          for (var i = 0; i < $scope.dailyNames.length; i++) {
            if (i >= $scope.dailyData.length) {
              $scope.dailyData[i] = [];
              for (var j = 0; j < 31; j++) {
                $scope.dailyData[i].push("");
              }
            }
            for (var j = 0; j < 31; j++) {
              if (j < $scope.dailyData[i].length) {
                if (
                  $scope.dailyData[i][j] !== undefined &&
                  $scope.dailyData[i][j] !== ""
                ) {
                  $scope.dailyData[i][j] = isNaN($scope.dailyData[i][j])
                    ? 0
                    : Number($scope.dailyData[i][j]);
                }
              }
            }
          }
          $scope.monthlyData = result.monthlyData;
          $scope.filterMonthly($scope.monthlyData);
          data = [];
          for (var i = 0; i < $scope.monthlyNames.length; i++) {
            var rowData = [$scope.monthlyNames[i]];
            rowData.push($scope.monthlyData[i].numerator);
            rowData.push($scope.monthlyData[i].denumerator);
            rowData.push($scope.monthlyData[i].hasil);
            rowData.push($scope.target[i]);
            rowData.push($scope.monthlyData[i].analisa);
            data.push(rowData);
          }
          var colHeaders = [
            "Name",
            "Numerator",
            "Denumerator",
            "Hasil",
            "Target",
            "Analisa",
          ];
          var colWidths = [500, 150, 150, 150, 150, 300];
          var colAlignments = [
            "left",
            "center",
            "center",
            "center",
            "center",
            "left",
          ];
          var numericCustomEditor = {
            closeEditor: function (cell, save) {
              var value = 0;
              var colRow = $(cell).prop("id").split("-");
              var type = $scope.monthlyData[colRow[1] - 0].type_hasil;
              value = $(cell).find(".editor").val();
              if (value == "") {
                value = "";
              } else {
                value = Number(value) || 0;
              }
              switch (type) {
                case "ya/tidak":
                  if (value === 100)
                    $(cell).html($scope.monthlyNames[colRow[1] - 0]);
                  else $(cell).html("Tidak Memenuhi");
                  break;
                case "laporan":
                  $(cell).html(value + " Laporan");
                  break;
                case "mg/l":
                  $(cell).html(value + " mg/l");
                  break;
                case "ph69":
                  $(cell).html(value);
                  break;
                case "menit":
                  $(cell).html(value + " Menit");
                  break;
                case "jam":
                  $(cell).html(value + " Jam");
                  break;
                case "hari":
                  $(cell).html(value + " Hari");
                  break;
                case "percent":
                  $(cell).html(value + " %");
                  break;
                case "permil":
                  $(cell).html(value + " ‰");
                  break;
                case "number":
                  $(cell).html(value + "");
                  break;
                default:
              }
              $(cell).removeClass("edition");
              return value;
            },
            openEditor: function (cell, empty) {
              var colRow = $(cell).prop("id").split("-");
              var type = $scope.monthlyData[colRow[1] - 0].type_hasil;
              switch (type) {
                case "ya/tidak":
                  var editorWidth = $(cell).width();
                  var editorHeight = $(cell).innerHeight();
                  var input = $(cell).find("input");
                  if ($(input).length) {
                    var html = $(input).val();
                  } else {
                    var html = $(cell).html();
                  }
                  var editor = document.createElement("select");
                  //Create and append the options
                  var options = [
                    {
                      value: 100,
                      text: "Memenuhi",
                    },
                    {
                      value: 0,
                      text: "Tidak Memenuhi",
                    },
                  ];
                  for (var i = 0; i < options.length; i++) {
                    var option = document.createElement("option");
                    option.value = options[i].value;
                    option.text = options[i].text;
                    editor.appendChild(option);
                  }
                  $(editor).prop("class", "editor");
                  $(editor).css("width", editorWidth);
                  $(editor).css("min-height", editorHeight);
                  $(cell).html(editor);

                  $(editor).focus();
                  if (!empty) {
                    $(editor).val(Number(html));
                  }

                  $(editor).blur(function () {
                    $("#" + $.fn.jexcel.current).jexcel(
                      "closeEditor",
                      $(cell),
                      true
                    );
                  });
                  break;
                case "number":
                  var editorWidth = $(cell).width();
                  var editorHeight = $(cell).innerHeight();
                  var input = $(cell).find("input");
                  if ($(input).length) {
                    var html = $(input).val();
                  } else {
                    var html = $(cell).html();
                  }
                  var editor = document.createElement("input");

                  $(editor).prop("class", "editor");
                  $(editor).css("width", editorWidth);
                  $(editor).css("min-height", editorHeight);
                  $(cell).html(editor);

                  $(editor).focus();
                  if (!empty) {
                    $(editor).val(Number(html));
                  }

                  $(editor).blur(function () {
                    $("#" + $.fn.jexcel.current).jexcel(
                      "closeEditor",
                      $(cell),
                      true
                    );
                  });
                  break;
                case "laporan":
                case "mg/l":
                case "ph69":
                case "menit":
                case "jam":
                case "hari":
                case "percent":
                case "permil":
                default:
                  var editorWidth = $(cell).width();
                  var editorHeight = $(cell).innerHeight();
                  var input = $(cell).find("input");
                  if ($(input).length) {
                    var html = $(input).val();
                  } else {
                    var html = $(cell).html();
                  }
                  var editor = document.createElement("input");

                  $(editor).prop("class", "editor");
                  $(editor).css("width", editorWidth);
                  $(editor).css("min-height", editorHeight);
                  $(cell).html(editor);

                  $(editor).focus();
                  if (!empty) {
                    $(editor).val(Number(html.split(" ")[0]));
                  }

                  $(editor).blur(function () {
                    $("#" + $.fn.jexcel.current).jexcel(
                      "closeEditor",
                      $(cell),
                      true
                    );
                  });
              }
            },
            getValue: function (cell) {
              var result = 0;
              var colRow = $(cell).prop("id").split("-");
              var type = $scope.monthlyData[colRow[1] - 0].type_hasil;
              switch (type) {
                case "ya/tidak":
                  var value = $(cell).html();
                  if (value === "Tidak Memenuhi") {
                    result = 0;
                  } else if (value === "Memenuhi") {
                    result = 100;
                  } else {
                    result = 0;
                  }
                  break;
                case "number":
                  var value = $(cell).html();
                  result = Number(value);
                  break;
                case "laporan":
                case "mg/l":
                case "ph69":
                case "menit":
                case "jam":
                case "hari":
                case "percent":
                case "permil":
                  var value = $(cell).html();
                  result = Number(value.split(" ")[0]);
                  break;
              }
              return result;
            },
            setValue: function (cell, value) {
              if (value == "") {
                value = "";
                $(cell).html(value);
              } else {
                var colRow = $(cell).prop("id").split("-");
                var type = $scope.monthlyData[colRow[1] - 0].type_hasil;
                var categoryName = $scope.monthlyNames[colRow[1] - 0];
                value = Number(value) || 0;
                switch (type) {
                  case "ya/tidak":
                    if (value == 100) {
                      $(cell).html("Memenuhi");
                    } else {
                      $(cell).html("Tidak Memenuhi");
                    }
                    break;
                  case "number":
                    $(cell).html(value + "");
                    break;
                  case "laporan":
                    $(cell).html(value + " Laporan");
                    break;
                  case "mg/l":
                    $(cell).html(value + " mg/l");
                    break;
                  case "ph69":
                    $(cell).html(value + "");
                    break;
                  case "menit":
                    $(cell).html(value + " Menit");
                    break;
                  case "jam":
                    $(cell).html(value + " Jam");
                    break;
                  case "hari":
                    $(cell).html(value + " Hari");
                    break;
                  case "percent":
                    $(cell).html(value + " %");
                    break;
                  case "permil":
                    $(cell).html(value + " ‰");
                    break;
                  default:
                    $(cell).html(value);
                }
              }
              return true;
            },
          };
          var columns = [
            {
              type: "text",
              wordWrap: true,
              readOnly: true,
            },
            {
              type: "numeric",
            },
            {
              type: "numeric",
            },
            {
              type: "text",
              wordWrap: true,
              editor: numericCustomEditor,
            },
            {
              type: "text",
              wordWrap: true,
              readOnly: true,
            },
            {
              type: "text",
              wordWrap: true,
            },
          ];
          $("#tableFormB").jexcel("destroyAll");
          $("#tableFormB").jexcel({
            data: data,
            colHeaders,
            colWidths,
            colAlignments,
            columns,
            tableOverflow: true,
            tableHeight: "500px",
            onchange: function (obj, cel, val) {
              var colRow = $(cel).prop("id").split("-");
              var monthlyIdx = colRow[1] - 0;
              var isCalculateHasil = false;
              var specialCalc = $scope.specialCalcDailyToMonthly
                ? $scope.specialCalcDailyToMonthly[monthlyIdx]
                : null;
              if ($scope.monthlyData[monthlyIdx] === undefined)
                $scope.monthlyData[monthlyIdx] = {};
              var monthlyDatum = $scope.monthlyData[monthlyIdx];
              switch (colRow[0]) {
                case "1": // numerator
                  monthlyDatum.numerator = val;
                  isCalculateHasil = true;
                  break;
                case "2": // denumerator
                  monthlyDatum.denumerator = val;
                  isCalculateHasil = true;
                  break;
                case "3": // hasil
                  monthlyDatum.hasil = val;
                  break;
                case "5": // analisa
                  monthlyDatum.analisa = val;
                  break;
                default:
              }
              if (isCalculateHasil) {
                if (
                  monthlyDatum.denumerator == 0 &&
                  monthlyDatum.numerator != 0
                ) {
                  monthlyDatum.hasil = 100;
                } else if (
                  monthlyDatum.numerator == 0 &&
                  monthlyDatum.denumerator == 0
                ) {
                  //monthlyDatum.hasil = 0;
                  monthlyDatum.hasil = 0; //edit mba astin
                  if (
                    specialCalc &&
                    specialCalc.includes("zeroDenumeratorIsHundred")
                  ) {
                    monthlyDatum.hasil = 100;
                  }
                } else {
                  monthlyDatum.hasil =
                    monthlyDatum.numerator / monthlyDatum.denumerator;
                  var target = $scope.target[monthlyIdx].toLowerCase();
                  if (target.includes("%")) {
                    monthlyDatum.hasil =
                      Math.round(monthlyDatum.hasil * 100 * 10000) / 10000;
                  } else if (target.includes("‰")) {
                    monthlyDatum.hasil =
                      Math.round(monthlyDatum.hasil * 1000 * 10000) / 10000;
                  } else {
                    monthlyDatum.hasil =
                      Math.round(monthlyDatum.hasil * 10000) / 10000;
                  }
                }
                data = [];
                for (var i = 0; i < $scope.monthlyNames.length; i++) {
                  var rowData = [$scope.monthlyNames[i]];
                  rowData.push($scope.monthlyData[i].numerator);
                  rowData.push($scope.monthlyData[i].denumerator);
                  rowData.push($scope.monthlyData[i].hasil);
                  rowData.push($scope.target[i]);
                  rowData.push($scope.monthlyData[i].analisa);
                  data.push(rowData);
                }
                $("#tableFormB").jexcel("setData", data);
              }
            },
          });
          $("#tableFormB").jexcel("updateSettings", {
            cells: function (cell, col, row) {
              // if ($scope.monthlyData[row].disable_hasil && col < 5) {
              //   $(cell).addClass("readonly");
              // }
              if (col - 0 === 4) {
                $(cell).addClass("readonly");
              }
              if ($scope.monthlyDisable && col - 0 === 1) {
                for (var i = 0; i < $scope.monthlyDisable.length; i += 1) {
                  var disabledColumn = $scope.monthlyDisable[i];
                  if (
                    disabledColumn[0] - 1 === row - 0 &&
                    disabledColumn.includes("numerator")
                  ) {
                    $(cell).addClass("readonly");
                  }
                }
              } else if ($scope.monthlyDisable && col - 0 === 2) {
                for (var i = 0; i < $scope.monthlyDisable.length; i += 1) {
                  var disabledColumn = $scope.monthlyDisable[i];
                  if (
                    disabledColumn[0] - 1 === row - 0 &&
                    disabledColumn.includes("denumerator")
                  ) {
                    $(cell).addClass("readonly");
                  }
                }
              } else if ($scope.monthlyDisable && col - 0 === 3) {
                for (var i = 0; i < $scope.monthlyDisable.length; i += 1) {
                  var disabledColumn = $scope.monthlyDisable[i];
                  if (
                    disabledColumn[0] - 1 === row - 0 &&
                    disabledColumn.includes("hasil")
                  ) {
                    $(cell).addClass("readonly");
                  }
                }
              }
            },
          });
          $rootScope.loading = false;
        },
        () => ($rootScope.loading = false)
      );
    };

    $scope.formatString = (input) => {
      return input
        .replace(/([a-z])([A-Z])/g, "$1 $2") // Tambahkan spasi sebelum huruf kapital
        .split(" ") // Pisahkan kata-kata berdasarkan spasi
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Kapitalisasi huruf pertama tiap kata
        .join(" "); // Gabungkan kembali dengan spasi
    };

    $scope.downloadExcel = () => {
      for (var i = 0; i < $scope.dailyData.length; i += 1) {
        for (var j = 0; j < $scope.dailyData[i].length; j += 1) {
          if (
            typeof $scope.dailyData[i][j] === "string" &&
            $scope.dailyData[i][j] !== ""
          ) {
            $scope.dailyData[i][j] = $scope.dailyData[i][j] - 0;
          }
        }
      }
      const monthlyData = $scope.monthlyData;
      for (var i = 0; i < $scope.monthlyNames.length; i++) {
        if ($scope.target[i] != null) {
          var target = $scope.target[i].toLowerCase();
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
      const data = {
        direkturName: localStorage.getItem("nama_direktur"),
        direkturNip: localStorage.getItem("nip_direktur"),
        rsName: localStorage.getItem("nama_rumah_sakit"),
        monthSelectedName: $scope.monthNames[$scope.monthSelect - 1],
        yearSelected: $scope.yearSelect,
        todayDate:
          today.getDate() +
          " " +
          $scope.monthNames[today.getMonth()] +
          " " +
          today.getFullYear(),
        d: $scope.dailyData,
        m: $scope.monthlyData,
        unit: $rootScope.currPage,
      };
      const url = REPORT_CURRENT_URL + "/pdf_b/" + $scope.currPage;
      pmkpService.postDownload(
        url,
        data,
        "Report Form B " + $scope.formatString($scope.currPage) + ".pdf"
      );
    };
    $scope.getData();
  }
);

sikatApp.controller(
  "rekapController",
  function ($scope, $rootScope, $routeParams, $http, pmkpService, $location) {
    $rootScope.currPage = $routeParams.id;
    $rootScope.currForm = "rekap";
    $scope.monthlyNames = []; //pmkpService.getMonthlyNames($scope.currPage);
    $scope.dataId = null;
    $scope.typeSelect = $routeParams.id;
    var today = new Date();
    $scope.yearSelect = $routeParams.yearSelect
      ? $routeParams.yearSelect
      : today.getFullYear() + "";
    $scope.target = []; //pmkpService.getMonthlyTarget($scope.currPage);
    $scope.targetHasil = []; //pmkpService.getMonthlyTargetHasil($scope.currPage);
    $scope.monthNames = pmkpService.getMonthNames();
    $scope.yearlyData = [];
    $scope.numerator = [];
    $scope.denumerator = [];
    $scope.idx = [];
    $scope.analisaId = [];
    $scope.analisa = [];
    $scope.rekomendasi = [];
    $scope.periodeAnalisa = [];

    $scope.yearDynamic = [];
    const currentYear = new Date().getFullYear(); // Tahun berjalan
    $scope.currentYear = currentYear;
    $scope.yearDynamic.push(currentYear, currentYear + 1); // Tambahkan tahun berjalan dan tahun depan

    $scope.getDynamicData = () => {
      pmkpService.getDynamicData(
        $rootScope.currPage,
        $scope.yearSelect,
        (result) => {
          if (result && Array.isArray(result.data) && result.data.length > 0) {
            let iterator = 1;
            Object.keys(result.data).forEach((key) => {
              if (result.data[key]["STATUS_ACC"] == 1) {
                if (
                  !$scope.monthlyNames.includes(
                    result.data[key]["JUDUL_INDIKATOR"]
                  )
                ) {
                 // $scope.monthlyNames.push(result.data[key]["JUDUL_INDIKATOR"]);
                }
                $scope.monthlyNames.push(result.data[key]["JUDUL_INDIKATOR"]);
                $scope.target.push(result.data[key]["TARGET_PENCAPAIAN"]);
                $scope.targetHasil.push(result.data[key]["TARGET_PENCAPAIAN"]);
                $scope.idx.push(result.data[key]["ID"]);
                $scope.numerator.push(result.data[key]["NUMERATOR"]);
                $scope.denumerator.push(result.data[key]["DENUMERATOR"]);
                $scope.analisaId.push(result.data[key]["analisa_id"]);
                $scope.analisa.push(result.data[key]["analisa"]);
                $scope.rekomendasi.push(result.data[key]["rekomendasi"]);
                $scope.periodeAnalisa.push(result.data[key]["PERIODE_ANALISA"]);

                iterator++;
              }
            });
          } else {

            $scope.monthlyNames = [];
            $scope.target = [];
            $scope.targetHasil = [];
            $scope.numerator = [];
            $scope.denumerator = [];
            $scope.idx = [];
            $scope.analisaId = [];
            $scope.analisa = [];
            $scope.rekomendasi = [];
            $scope.periodeAnalisa = [];
        
            console.log("No data or error occurred.");
          }
        }
      );
    }
      

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

    $scope.getData = () => {
      $rootScope.loading = true;
      $scope.getDynamicData();
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
              var rowData = [$scope.monthlyNames[i], $scope.target[i]];
              //let urlLink = "";
              /*
              if ($scope.analisaId[i]) {
                urlLink = $location.protocol() + "://" + $location.host() + 
                          ($location.port() ? ":" + $location.port() : "") +
                          "/synergy/main.html#!/analisaIndikator_edit/" + $rootScope.currPage +
                          "?judul=" + encodeURIComponent($scope.monthlyNames[i]) +
                          "&numerator=" + encodeURIComponent($scope.numerator[i] || "") +
                          "&denumerator=" + encodeURIComponent($scope.denumerator[i] || "") +
                          "&target=" + encodeURIComponent($scope.target[i] || "null") +
                          "&analisa=" + encodeURIComponent($scope.analisa[i] || "null") +
                          "&rekomendasi=" + encodeURIComponent($scope.rekomendasi[i] || "null") +
                          "&idx=" + encodeURIComponent($scope.analisaId[i]);
              } else if (!$scope.analisaId[i]) {

                  urlLink = $location.protocol() + "://" + $location.host() + 
                            ($location.port() ? ":" + $location.port() : "") +
                            "/synergy/main.html#!/analisaIndikator_new/" + $rootScope.currPage +
                            "?judul=" + encodeURIComponent($scope.monthlyNames[i]) +
                            "&numerator=" + encodeURIComponent($scope.numerator[i] || "") +
                            "&denumerator=" + encodeURIComponent($scope.denumerator[i] || "") +
                            "&target=" + encodeURIComponent($scope.target[i] || "null") +
                            "&idx=" + encodeURIComponent($scope.idx[i]);
              }
              */
              /*
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
              */
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

    $scope.formatString = (input) => {
      return input
        .replace(/([a-z])([A-Z])/g, "$1 $2") // Tambahkan spasi sebelum huruf kapital
        .split(" ") // Pisahkan kata-kata berdasarkan spasi
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Kapitalisasi huruf pertama tiap kata
        .join(" "); // Gabungkan kembali dengan spasi
    };

    $scope.downloadExcel = () => {
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
      const data = {
        direkturName: localStorage.getItem("nama_direktur"),
        direkturNip: localStorage.getItem("nip_direktur"),
        rsName: localStorage.getItem("nama_rumah_sakit"),
        yearSelected: $scope.yearSelect,
        todayDate:
          today.getDate() +
          " " +
          $scope.monthNames[today.getMonth()] +
          " " +
          today.getFullYear(),
        y: $scope.yearlyData,
        unit: $rootScope.currPage,
      };

      /*
      const url = REPORT_CURRENT_URL + "/pdf_c/" + $scope.currPage + "/Rekap";
      pmkpService.postDownload(url, data, "Report Form C "+ $scope.formatString($scope.currPage) + ".pdf");
      */
      const url = REPORT_URL + "/xlsx/" + $scope.currPage;
      pmkpService.postDownload(url, data, $scope.currPage + ".xlsx");
    };

    $scope.downloadChart = (part) => {
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
        for (let monthIdx = 0; monthIdx < (part + 1) * 3; monthIdx++) {
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
        tahun: $scope.yearSelect,
        part: partString,
        dataList: dataList,
        unit: $rootScope.currPage,
      };

      const url = REPORT_CURRENT_URL + "/analisa_indikator/" + $scope.currPage;
      pmkpService.postDownload(url, data, $scope.currPage + ".pdf");
    };
    $scope.getData();
  }
);

sikatApp.controller(
  "analisaIndikatorNewController",
  function ($scope, $rootScope, $routeParams, $http) {
    $rootScope.currPage = "analisaIndikator";
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
          SERVER_URL + "/api/analisaIndikator",
          {
            id_prodilindikator: $scope.id_prodilindikator,
            analisa: $scope.analisa,
            rekomendasi: $scope.rekomendasi,
          },
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        )
        .then(
          function (data) {
            swal("Success!", "Data is successfully saved.", "success");
            window.history.back();
          },
          function (data) {
            swal("Error!", "Data is failed to be saved.", "error");
          }
        );
    };
    $scope.backToList = () => {
      window.history.back();
    };
  }
);

sikatApp.controller(
  "ppiEditController",
  function ($scope, $rootScope, $routeParams, $http) {
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
        .get(url, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then(
          function (reqRes) {
            if (reqRes.data && reqRes.data != "") {
              $scope.id_prodilindikator = reqRes.data.id_prodilindikator - 0;
              $scope.analisa = reqRes.data.analisa - 0;
              $scope.rekomendasi = reqRes.data.rekomendasi - 0;
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
    $scope.update = () => {
      $http
        .put(
          SERVER_URL + "/api/analisaIndikator",
          {
            id: $scope.id_analisaindikator,
            id_prodilindikator: $scope.id_prodilindikator,
            analisa: $scope.analisa,
            rekomendasi: $scope.rekomendasi,
          },
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        )
        .then(
          function (data) {
            swal("Success!", "Data is successfully updated.", "success");
            window.history.back();
          },
          function (data) {
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
        .get(url, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
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
