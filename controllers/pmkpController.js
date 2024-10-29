sikatApp.controller("formAController", function(
  $scope,
  $rootScope,
  $routeParams,
  $http,
  utils,
  pmkpService
) {
  $rootScope.currPage = $routeParams.id;
  $rootScope.currForm = "formA";

  // Tambahkan log halaman saat ini
  console.log("Halaman saat ini:", $rootScope.currPage);
  // Jika ingin melog semua $routeParams
  console.log("Parameter URL saat ini:", $routeParams);

  // calculate latest date that can be inputted
  $scope.todayString = new moment().format("D/MMM/YYYY");
  var today = new moment();
  $rootScope.waktuKunciPmkp = localStorage.getItem("waktu_kunci_pmkp");
  $scope.latestDateToInput = today.subtract($rootScope.waktuKunciPmkp, "d");
  $scope.dailyNames = [];//pmkpService.getDailyNames($scope.currPage);
  const formAformBMapping = new Map();
  console.log("dailyNames before:",$scope.dailyNames);
  pmkpService.getDynamicData($rootScope.currPage,1,result => {
    if (result) {
      console.log("Received data:", result.data);
      $scope.dailyNames = result.data.map(o => o.JUDUL_INDIKATOR);

      Object.keys(result.data).forEach(key => {
        console.log(`${key}: ${result.data[key]['JUDUL_INDIKATOR']}`);
        formAformBMapping.set(result.data[key]['JUDUL_INDIKATOR'],result.data[key]['LEVEL']);
      });

    } else {
      console.log("No data or error occurred.");
    }
  });

  console.log("dailyNames after:", $scope.dailyNames);
  console.log('formAformBMapping:',formAformBMapping);

  $scope.monthlyMapping = formAformBMapping;//pmkpService.getMonthlyMapping($scope.currPage);
  $scope.monthNames = pmkpService.getMonthNames();
  $scope.dataId = null;
  $scope.typeSelect = $routeParams.id;
  var today = new Date();
  $scope.monthSelect = today.getMonth() + 1 + "";
  $scope.yearSelect = today.getFullYear() + "";
  $scope.dailyData = [];
  $scope.monthlyData = [];
  // FUNCTIONS
  $scope.getTotalFor = function(idx) {
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

  
  $scope.dailyToMonthly = (dailyData, monthlyData, utils) => {
    pmkpService.getDynamicData($rootScope.currPage,2,result => {
      if (result) {

        console.log("Received data:", result.data);
        let numeratorIdx = 0; 
        let denumeratorIdx = 1;
        Object.keys(result.data).forEach(key => {
          
          if (result.data[key]['STATUS']=='0'){

              console.log("key:",key);
              console.log("numeratorIdx:",numeratorIdx);
              console.log("denumeratorIdx:",denumeratorIdx);

              var specialCalc = result.data[key]['DAILYMONTHLYSPECIAL'];
              console.log("specialCalc",specialCalc);
        
              if (monthlyData[key] === undefined) 
                monthlyData[key] = {};
        
              console.log("monthlyData[key]",monthlyData[key]);
              
              monthlyData[key].numerator = utils.sumArray(dailyData[numeratorIdx],31);
              monthlyData[key].denumerator = utils.sumArray(dailyData[denumeratorIdx],31);
        
              console.log("monthlyData[key].numerator",monthlyData[key].numerator);
              console.log("monthlyData[key].denumerator",monthlyData[key].denumerator);
              
              if (monthlyData[key].denumerator == 0 && monthlyData[key].numerator != 0
              ) {
                  monthlyData[key].hasil = 100;
              } else if (monthlyData[key].numerator == 0 && monthlyData[key].denumerator == 0
              ) {
                  monthlyData[key].hasil = 0;
                  if (specialCalc && specialCalc.includes("zeroDenumeratorIsHundred")) {
                      monthlyData[key].hasil = 100;
                  }
              } else {
        
                  monthlyData[key].hasil = monthlyData[key].numerator / monthlyData[key].denumerator;
                  var target = result.data[key]['TARGET'].toLowerCase();
                  
                  if (target.includes("%")) {
                    monthlyData[key].hasil = Math.round(monthlyData[key].hasil * 100 * 10000) / 10000;
                  } else if (target.includes("‰")) {
                    monthlyData[key].hasil = Math.round(monthlyData[key].hasil * 1000 * 10000) / 10000;
                  } else {
                    monthlyData[key].hasil = Math.round(monthlyData[key].hasil * 10000) / 10000;
                }
              }
        
              console.log("monthlyData[key].hasil",monthlyData[key].hasil);
              numeratorIdx+=2;
              denumeratorIdx+=2;
            
          }
        });

        console.log("monthlyData",monthlyData); 
        console.log("dailyData",dailyData);
  
      } else {
        console.log("No data or error occurred.");
      }
    });

  };

  $scope.dailyToMonthly2 = (dailyData, monthlyData, utils) => {
    var mappingArr = pmkpService.getMonthlyMapping($scope.currPage);
    var targetMonthly = pmkpService.getMonthlyTarget($scope.currPage);
    var specialCalcDailyToMonthly = pmkpService.getDailyMonthlySpecialHasilCalculation(
      $scope.currPage
    );
    for (var i = 0; i < mappingArr.length; i++) {
      var mappingUnit = mappingArr[i];
      var monthlyIdx = mappingUnit[0] - 1;
      var numeratorIdx = mappingUnit[1] - 1;
      var denumeratorIdx = mappingUnit[2] - 1;
      var specialCalc = specialCalcDailyToMonthly
        ? specialCalcDailyToMonthly[monthlyIdx]
        : null;
      if (monthlyData[monthlyIdx] === undefined) monthlyData[monthlyIdx] = {};
      monthlyData[monthlyIdx].numerator = utils.sumArray(
        dailyData[numeratorIdx],
        31
      );
      monthlyData[monthlyIdx].denumerator = utils.sumArray(
        dailyData[denumeratorIdx],
        31
      );
      if (
        monthlyData[monthlyIdx].denumerator == 0 &&
        monthlyData[monthlyIdx].numerator != 0
      ) {
        monthlyData[monthlyIdx].hasil = 100;
      } else if (
        monthlyData[monthlyIdx].numerator == 0 &&
        monthlyData[monthlyIdx].denumerator == 0
      ) {
        monthlyData[monthlyIdx].hasil = 0;
        if (specialCalc && specialCalc.includes("zeroDenumeratorIsHundred")) {
          monthlyData[monthlyIdx].hasil = 100;
        }
      } else {
        monthlyData[monthlyIdx].hasil =
          monthlyData[monthlyIdx].numerator /
          monthlyData[monthlyIdx].denumerator;
        var target = targetMonthly[monthlyIdx].toLowerCase();
        if (target.includes("%")) {
          monthlyData[monthlyIdx].hasil =
            Math.round(monthlyData[monthlyIdx].hasil * 100 * 10000) / 10000;
        } else if (target.includes("‰")) {
          monthlyData[monthlyIdx].hasil =
            Math.round(monthlyData[monthlyIdx].hasil * 1000 * 10000) / 10000;
        } else {
          monthlyData[monthlyIdx].hasil =
            Math.round(monthlyData[monthlyIdx].hasil * 10000) / 10000;
        }
      }
    }
  };

  $scope.save = () => {
    $scope.dailyToMonthly($scope.dailyData, $scope.monthlyData, utils);
    pmkpService.save(
      $scope.dataId,
      $scope.typeSelect,
      $scope.yearSelect,
      $scope.monthSelect,
      $scope.dailyData,
      $scope.monthlyData
    );
  };
  
  $scope.getData = () => {
    $rootScope.loading = true;
    pmkpService.getData(
      $scope.currPage,
      $scope.yearSelect,
      $scope.monthSelect,
      result => {
        $scope.dataId = result.dataId;
        $scope.dailyData = result.dailyData;
        $scope.monthlyData = result.monthlyData;
        data = [];
        
        for (var i = 0; i < $scope.dailyNames.length; i++) {
          if (!$scope.dailyData[i]) {
            $scope.dailyData[i] = [];
            for (var j = 0; j < 31; j++) {
              $scope.dailyData[i].push("");
            }
          }

          var columnRefNo = $scope.monthlyMapping.get($scope.dailyNames[i]);
          console.log("columnRefNo:",columnRefNo);
          console.log("iterator:",i);
          var rowData = [columnRefNo, $scope.dailyNames[i]];
          console.log("rowData:",rowData);
          console.log("dailyNames:",$scope.dailyNames[i]);
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
          { type: "numeric", readOnly: true },
          { type: "text", wordWrap: true, readOnly: true }
        ];
        for (var i = 0; i < 31; i++) {
          colHeaders.push(i + 1 + "");
          colWidths.push(30);
          colAlignments.push("center");

          var loopDate = moment({
            year: parseInt($scope.yearSelect),
            month: $scope.monthSelect - 1,
            date: i + 1
          });
          if (loopDate.isAfter($scope.latestDateToInput)) {
            columns.push({ type: "numeric" });
          } else {
            columns.push({ type: "numeric", readOnly: true });
          }
        }
        colHeaders.push("Total");
        colWidths.push(50);
        colAlignments.push("center");
        columns.push({ type: "numeric", readOnly: true });
        $("#tableFormA").jexcel("destroyAll");
        $("#tableFormA").jexcel({
          data: data,
          colHeaders,
          colWidths,
          colAlignments,
          columns,
          tableOverflow: true,
          tableHeight: "500px",
          onchange: function(obj, cel, val) {
            var colRow = $(cel)
              .prop("id")
              .split("-");
            $scope.dailyData[colRow[1] - 0][colRow[0] - 2] = val;
          }
        });
        $rootScope.loading = false;
      },
      () => ($rootScope.loading = false)
    );
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
      m: $scope.monthlyData
    };
    const url = REPORT_URL + "/xlsx/" + $scope.currPage;
    pmkpService.postDownload(url, data, $scope.currPage + ".xlsx");
  };
  $scope.getData();
});

sikatApp.controller("formBController", function(
  $scope,
  $rootScope,
  $routeParams,
  pmkpService
) {
  $rootScope.currPage = $routeParams.id;
  $rootScope.currForm = "formB";
  $scope.specialCalcDailyToMonthly = {};//pmkpService.getDailyMonthlySpecialHasilCalculation($rootScope.currPage);
  $scope.monthlyNames = {};//pmkpService.getMonthlyNames($rootScope.currPage);
  $scope.monthlyDisable = [];//pmkpService.getMonthlyDisable($rootScope.currPage);
  $scope.monthNames = pmkpService.getMonthNames();
  $scope.dailyNames = {};//pmkpService.getDailyNames($scope.currPage);
  $scope.dynamicId = {};
  $scope.dataId = null;
  $scope.typeSelect = $routeParams.id;
  var today = new Date();
  $scope.monthSelect = today.getMonth() + 1 + "";
  $scope.yearSelect = today.getFullYear() + "";
  $scope.target = {};//pmkpService.getMonthlyTarget($rootScope.currPage);

  pmkpService.getDynamicData($rootScope.currPage,2,result => {
    if (result) {

      console.log("Received data:", result.data);
      $scope.monthlyNames = result.data.map(o => o.JUDUL_INDIKATOR);
      $scope.specialCalcDailyToMonthly = result.data.map(o => o.DAILYMONTHLYSPECIAL);
      $scope.target = result.data.map(o => o.TARGET);
      $scope.dynamicId = result.data.map(o => o.LEVEL);

      let iterator=0;
      Object.keys(result.data).forEach(key => {
        if(result.data[key]['STATUS']=='0'){
          $scope.monthlyDisable[iterator] = [parseInt(key)+1,"numerator", "denumerator", "hasil"];
          iterator++;
        }
        
      });

    } else {
      console.log("No data or error occurred.");
    }
  });

  console.log("$scope.monthlyDisable:", $scope.monthlyDisable);
  for (var i = 0; i < $scope.monthlyDisable.length; i += 1) {
    var disabledColumn = $scope.monthlyDisable[i];
    console.log("disabledColumn:",disabledColumn);
  }

  pmkpService.getDynamicData($rootScope.currPage,1,result => {
    if (result) {
      console.log("Received data:", result.data);
      $scope.dailyNames = result.data.map(o => o.JUDUL_INDIKATOR);
    } else {
      console.log("No data or error occurred.");
    }
  });

  $scope.filterMonthly = monthlyData => {
    for (var i = 0; i < $scope.monthlyNames.length; i++) {
      if (monthlyData[i]) {
        delete monthlyData[i].disable_hasil;
      } else {
        monthlyData[i] = {
          numerator: "",
          denumerator: "",
          hasil: "",
          analisa: ""
        };
      }
    }

    /*
    var mappingArr = pmkpService.getMonthlyMapping($rootScope.currPage);
    for (var i = 0; i < mappingArr.length; i++) {
      var mappingUnit = mappingArr[i];
      console.log("mappingUnit",mappingUnit);
      console.log("mappingUnit[0] - 1",mappingUnit[0] - 1);
      monthlyData[mappingUnit[0] - 1]["disable_hasil"] = true;
    }
    */

    pmkpService.getDynamicData($rootScope.currPage,2,result => {
      if (result) {
        console.log("Received data:", result.data);
        Object.keys(result.data).forEach(key => {
          if(result.data[key]['STATUS']=='0'){
            monthlyData[key]["disable_hasil"] = true;
          }
        });
  
      } else {
        console.log("No data or error occurred.");
      }
    });
    console.log("monthlyData:", monthlyData);

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
  };
  $scope.yaTidakOptions = [
    { value: 100, text: "Ya" },
    { value: 0, text: "Tidak" }
  ];
  $scope.showYaTidak = function() {
    var selected = $filter("filter")($scope.statuses, {
      value: $scope.user.status
    });
    return $scope.user.status && selected.length ? selected[0].text : "Not set";
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
    pmkpService.getData(
      $scope.currPage,
      $scope.yearSelect,
      $scope.monthSelect,
      result => {
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
          "Analisa"
        ];
        var colWidths = [300,150, 150, 150, 150, 300];
        var colAlignments = [
          "left",
          "center",
          "center",
          "center",
          "center",
          "left"
        ];
        var numericCustomEditor = {
          closeEditor: function(cell, save) {
            var value = 0;
            var colRow = $(cell)
              .prop("id")
              .split("-");
            var type = $scope.monthlyData[colRow[1] - 0].type_hasil;
            value = $(cell)
              .find(".editor")
              .val();
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
          openEditor: function(cell, empty) {
            var colRow = $(cell)
              .prop("id")
              .split("-");
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
                  { value: 100, text: "Memenuhi" },
                  { value: 0, text: "Tidak Memenuhi" }
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

                $(editor).blur(function() {
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

                $(editor).blur(function() {
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

                $(editor).blur(function() {
                  $("#" + $.fn.jexcel.current).jexcel(
                    "closeEditor",
                    $(cell),
                    true
                  );
                });
            }
          },
          getValue: function(cell) {
            var result = 0;
            var colRow = $(cell)
              .prop("id")
              .split("-");
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
          setValue: function(cell, value) {
            if (value == "") {
              value = "";
              $(cell).html(value);
            } else {
              var colRow = $(cell)
                .prop("id")
                .split("-");
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
          }
        };
        var columns = [
          { type: "text", wordWrap: true, readOnly: true },
          { type: "numeric" },
          { type: "numeric" },
          { type: "text", wordWrap: true, editor: numericCustomEditor },
          { type: "text", wordWrap: true, readOnly: true },
          { type: "text", wordWrap: true }
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
          onchange: function(obj, cel, val) {
            var colRow = $(cel)
              .prop("id")
              .split("-");
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
          }
        });
        $("#tableFormB").jexcel("updateSettings", {
          cells: function(cell, col, row) {
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
          }
        });
        $rootScope.loading = false;
      },
      () => ($rootScope.loading = false)
    );
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
      m: $scope.monthlyData
    };
    const url = REPORT_URL + "/xlsx/" + $scope.currPage;
    pmkpService.postDownload(url, data, $scope.currPage + ".xlsx");
  };
  $scope.getData();
});

sikatApp.controller("rekapController", function(
  $scope,
  $rootScope,
  $routeParams,
  $http,
  pmkpService
) {
  $rootScope.currPage = $routeParams.id;
  $rootScope.currForm = "rekap";
  $scope.monthlyNames = pmkpService.getMonthlyNames($scope.currPage);
  $scope.dataId = null;
  $scope.typeSelect = $routeParams.id;
  var today = new Date();
  $scope.yearSelect = today.getFullYear() + "";
  $scope.target = pmkpService.getMonthlyTarget($scope.currPage);
  $scope.targetHasil = pmkpService.getMonthlyTargetHasil($scope.currPage);
  $scope.monthNames = pmkpService.getMonthNames();
  $scope.yearlyData = [];
  $scope.filterMonthly = monthlyData => {
    for (var i = monthlyData.length; i < $scope.monthlyNames.length; i++) {
      monthlyData[i] = {
        numerator: "",
        denumerator: "",
        hasil: "",
        analisa: ""
      };
    }
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
        { headers: { Authorization: localStorage.getItem("token") } }
      )
      .then(
        function(reqRes) {
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
            null
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
            { type: "text", wordWrap: true, readOnly: true },
            { type: "text", wordWrap: true, readOnly: true }
          ];
          for (var i = 0; i < 12; i++) {
            colHeaders.push($scope.monthNames[i]);
            colWidths.push(100);
            colAlignments.push("center");
            columns.push({ type: "text", wordWrap: true, readOnly: true });
          }
          $("#tableRekap").jexcel("destroyAll");
          $("#tableRekap").jexcel({
            data: data,
            colHeaders,
            colWidths,
            colAlignments,
            columns,
            tableOverflow: true,
            tableHeight: "500px"
          });
          $("#tableRekap").jexcel("updateSettings", {
            table: function(instance, cell, col, row, val, id) {
              if (col >= 2) {
                if ($scope.yearlyData[col - 2] && val !== null && val !== "") {
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
            }
          });

          $rootScope.loading = false;
        },
        function() {
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
            stack: 6
          });
        }
      );
  };
  $scope.downloadExcel = () => {
    for (var h = 0; h < $scope.yearlyData.length; h++) {
      let monthlyData = [];
      if ($scope.yearlyData[h]) monthlyData = $scope.yearlyData[h].m;
      for (var i = 0; i < $scope.monthlyNames.length; i++) {
        var target = $scope.target[i].toLowerCase();
        if (!monthlyData[i]) monthlyData[i] = { hasil: null };
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
      y: $scope.yearlyData
    };
    const url = REPORT_URL + "/xlsx/" + $scope.currPage + "Rekap";
    pmkpService.postDownload(url, data, $scope.currPage + "Rekap.xlsx");
  };
  $scope.downloadChart = part => {
    for (var h = 0; h < $scope.yearlyData.length; h++) {
      let monthlyData = [];
      if ($scope.yearlyData[h]) monthlyData = $scope.yearlyData[h].m;
      for (var i = 0; i < $scope.monthlyNames.length; i++) {
        var target = $scope.target[i].toLowerCase();
        if (!monthlyData[i]) monthlyData[i] = { hasil: null };
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
          y: val
        });
        dataStandarBawah.push({
          x:
            part > 1
              ? $scope.monthNames[monthIdx].substr(0, 3).toUpperCase()
              : $scope.monthNames[monthIdx].toUpperCase(),
          y: standarBawah
        });
        dataStandarAtas.push({
          x:
            part > 1
              ? $scope.monthNames[monthIdx].substr(0, 3).toUpperCase()
              : $scope.monthNames[monthIdx].toUpperCase(),
          y: standarAtas
        });
      }

      let lines = [];

      lines.push({
        name: "PENCAPAIAN",
        data: dataPencapaian
      });
      if (standarAtas !== undefined && standarAtas !== null) {
        lines.push({
          name: "STANDAR",
          data: dataStandarAtas
        });
      }
      if (standarBawah != undefined && standarBawah != null) {
        lines.push({
          name: "STANDAR",
          data: dataStandarBawah
        });
      }

      dataList.push({
        idx: i,
        kriteria: criteriaName,
        chart: {
          options: {
            xTitle: axisName
          },
          lines: lines
        }
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
      dataList: dataList
    };
    const url = REPORT_URL + "/docx/pmkp";
    pmkpService.postDownload(url, data, $scope.currPage + "-chart-report.docx");
  };
  $scope.getData();
});

sikatApp.controller("analisaIndikatorNewController", function(
  $scope,
  $rootScope,
  $routeParams,
  $http
) {
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
          rekomendasi: $scope.rekomendasi
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
            $scope.id_prodilindikator = reqRes.data.id_prodilindikator - 0;
            $scope.analisa = reqRes.data.analisa - 0;
            $scope.rekomendasi = reqRes.data.rekomendasi - 0;
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
        SERVER_URL + "/api/analisaIndikator",
        {
          id: $scope.id_analisaindikator,
          id_prodilindikator: $scope.id_prodilindikator,
          analisa: $scope.analisa,
          rekomendasi: $scope.rekomendasi
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