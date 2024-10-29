sikatApp.controller("tableController", function(
  $scope,
  $rootScope,
  $http,
  $location,
  NgTableParams
) {
  $rootScope.currPage = "table";

  $scope.addTable = () => {
    $location.url("/table_new");
  };
  $scope.showTable = id => {
    $location.url("/table_edit?id=" + id);
  };

  $scope.tableParams = new NgTableParams({}, { dataset: [] });
  $scope.getData = () => {
    var url = SERVER_URL + "/api/table/all";
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

sikatApp.controller("tableNewController", function($scope, $rootScope, $http) {
  $rootScope.currPage = "table";
  $scope.save = () => {
    $http
      .post(
        SERVER_URL + "/api/table",
        {
          nm_menu: $scope.namaMenu,
          nm_table: $scope.namaTable,
          query: $scope.query,
          is_tahun: $scope.isTahun,
          is_bulan: $scope.isBulan,
          is_minggu: $scope.isMinggu,
          is_unit: $scope.isUnit,
          is_dokter: $scope.isDokter,
          is_ruang: $scope.isRuang,
          is_umum_bpjs: $scope.isUmumBpjs,
          is_start_date: $scope.isStartDate,
          is_end_date: $scope.isEndDate,
          span_header1: $scope.spanHeader1,
          span_header2: $scope.spanHeader2,
          column_title: $scope.columnTitle,
          column_key: $scope.columnKey
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

sikatApp.controller("tableEditController", function(
  $scope,
  $rootScope,
  $routeParams,
  $http
) {
  $rootScope.currPage = "table";
  $scope.id = $routeParams.id;
  $scope.getData = () => {
    var url = SERVER_URL + "/api/table?id=" + $scope.id;
    $http
      .get(url, { headers: { Authorization: localStorage.getItem("token") } })
      .then(
        function(reqRes) {
          if (reqRes.data && reqRes.data != "") {
            $scope.namaMenu = reqRes.data.nm_menu;
            $scope.namaTable = reqRes.data.nm_table;
            $scope.query = reqRes.data.query;
            $scope.isTahun = reqRes.data.is_tahun === "1";
            $scope.isBulan = reqRes.data.is_bulan === "1";
            $scope.isMinggu = reqRes.data.is_minggu === "1";
            $scope.isUnit = reqRes.data.is_unit === "1";
            $scope.isDokter = reqRes.data.is_dokter === "1";
            $scope.isRuang = reqRes.data.is_ruang === "1";
            $scope.isUmumBpjs = reqRes.data.is_umum_bpjs === "1";
            $scope.isStartDate = reqRes.data.is_start_date === "1";
            $scope.isEndDate = reqRes.data.is_end_date === "1";
            $scope.spanHeader1 = reqRes.data.span_header1;
            $scope.spanHeader2 = reqRes.data.span_header2;
            $scope.columnTitle = reqRes.data.column_title;
            $scope.columnKey = reqRes.data.column_key;
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
        SERVER_URL + "/api/table/" + $scope.id,
        {
          nm_menu: $scope.namaMenu,
          nm_table: $scope.namaTable,
          query: $scope.query,
          is_tahun: $scope.isTahun,
          is_bulan: $scope.isBulan,
          is_minggu: $scope.isMinggu,
          is_unit: $scope.isUnit,
          is_dokter: $scope.isDokter,
          is_ruang: $scope.isRuang,
          is_umum_bpjs: $scope.isUmumBpjs,
          is_start_date: $scope.isStartDate,
          is_end_date: $scope.isEndDate,
          span_header1: $scope.spanHeader1,
          span_header2: $scope.spanHeader2,
          column_title: $scope.columnTitle,
          column_key: $scope.columnKey
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
    var url = SERVER_URL + "/api/table/" + $scope.id;
    $http
      .delete(url, {
        headers: { Authorization: localStorage.getItem("token") }
      })
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

sikatApp.controller("viewTableController", function(
  $scope,
  $rootScope,
  $routeParams,
  $http
) {
  $rootScope.currPage = "viewTable_" + $routeParams.id;
  $scope.id = $routeParams.id;
  $scope.dokterList = [];
  $scope.unitList = [];
  $scope.ruangList = [];
  var today = new moment();
  $scope.tahun = today.year() + "";
  $scope.bulan = today.month() + 1 + "";
  $scope.minggu = Math.ceil(today.date() / 7) + "";
  $scope.unit = "P01";
  $scope.dokter = "DP001";
  $scope.ruang = "B0001";
  $scope.umum = "UMUM";
  $scope.start = null;
  $scope.end = null;
  $scope.getTableMenu = () => {
    var url = SERVER_URL + "/api/table?id=" + $scope.id;
    $http
      .get(url, { headers: { Authorization: localStorage.getItem("token") } })
      .then(
        function(reqRes) {
          if (reqRes.data && reqRes.data != "") {
            $scope.namaMenu = reqRes.data.nm_menu;
            $scope.namaTable = reqRes.data.nm_table;
            $scope.query = reqRes.data.query;
            $scope.isTahun = reqRes.data.is_tahun === "1";
            $scope.isBulan = reqRes.data.is_bulan === "1";
            $scope.isMinggu = reqRes.data.is_minggu === "1";
            $scope.isUnit = reqRes.data.is_unit === "1";
            $scope.isDokter = reqRes.data.is_dokter === "1";
            $scope.isRuang = reqRes.data.is_ruang === "1";
            $scope.isUmumBpjs = reqRes.data.is_umum_bpjs === "1";
            $scope.isStartDate = reqRes.data.is_start_date === "1";
            $scope.isEndDate = reqRes.data.is_end_date === "1";
            $scope.spanHeader1 = reqRes.data.span_header1;
            $scope.spanHeader2 = reqRes.data.span_header2;
            $scope.columnTitle = reqRes.data.column_title;
            $scope.columnKey = reqRes.data.column_key;
          }
          $scope.getData();
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
  $scope.getData = () => {
    $rootScope.loading = true;
    var urlParam = "";
    if ($scope.tahun) urlParam += "&tahun=" + $scope.tahun;
    if ($scope.bulan) urlParam += "&bulan=" + $scope.bulan;
    if ($scope.minggu) urlParam += "&minggu=" + $scope.minggu;
    if ($scope.unit) urlParam += "&unit=" + $scope.unit;
    if ($scope.dokter) urlParam += "&dokter=" + $scope.dokter;
    if ($scope.ruang) urlParam += "&ruang=" + $scope.ruang;
    if ($scope.umum) urlParam += "&umumBpjs=" + $scope.umum;
    if ($scope.start) urlParam += "&startDate=" + $scope.start;
    if ($scope.end) urlParam += "&endDate=" + $scope.end;
    var url = SERVER_URL + "/api/table/show?id=" + $scope.id + urlParam;
    $http
      .get(url, { headers: { Authorization: localStorage.getItem("token") } })
      .then(
        function(reqRes) {
          // if (reqRes.data && reqRes.data != "") {
          $scope.dataCount = reqRes.data.length;
          var nestedHeaders = [];
          if ($scope.spanHeader1) {
            var nestedGroups = $scope.spanHeader1.split(";");
            for (var i = 0; i < nestedGroups.length; i += 1) {
              var headerToken = nestedGroups[i].split(",");
              var headerUnit = [];
              for (var j = 0; j < headerToken.length; j += 1) {
                var headerMeta = headerToken[j].split(":");
                headerUnit.push({
                  title: headerMeta[0],
                  colspan: headerMeta.length > 1 ? parseInt(headerMeta[1]) : 1
                });
              }
              nestedHeaders.push(headerUnit);
            }
          }
          var colHeaders = [];
          var colKeys = [];
          var colWidths = [];
          var colAlignments = [];
          var columns = [];
          if (!$scope.columnKey) {
            if (reqRes.data.length > 0) {
              var firstData = reqRes.data[0];
              for (var property in firstData) {
                if (
                  firstData.hasOwnProperty(property) &&
                  property != "$$hashKey"
                ) {
                  colHeaders.push(property);
                  colKeys.push(property);
                  colWidths.push(200);
                  colAlignments.push("left");
                  columns.push({
                    type: "text",
                    wordWrap: true,
                    readOnly: true
                  });
                }
              }
            }
          } else {
            var titleToken = $scope.columnTitle.split(",");
            for (var i = 0; i < titleToken.length; i += 1) {
              var titleUnitToken = titleToken[i].split(":");
              colHeaders.push(
                titleUnitToken[0].trim() ? titleUnitToken[0].trim() : " "
              );
              if (titleUnitToken.length > 1) {
                colWidths.push(parseInt(titleUnitToken[1]));
              } else {
                colWidths.push(100);
              }
              if (titleUnitToken.length > 2) {
                colAlignments.push(titleUnitToken[2]);
              } else {
                colAlignments.push("left");
              }
              if (titleUnitToken.length > 3) {
                columns.push({
                  type: titleUnitToken[3],
                  wordWrap: true,
                  readOnly: true
                });
              } else {
                columns.push({
                  type: "text",
                  wordWrap: true,
                  readOnly: true
                });
              }
            }
            var titleKey = $scope.columnKey.split(",");
            for (var i = 0; i < titleKey.length; i += 1) {
              colKeys.push(titleKey[i].trim());
            }
          }
          var data = [];
          for (var i = 0; i < reqRes.data.length; i += 1) {
            var dataUnit = reqRes.data[i];
            var datum = [];
            for (var j = 0; j < colKeys.length; j += 1) {
              datum.push(dataUnit[colKeys[j]]);
            }
            data.push(datum);
          }
          $("#tableView").jexcel("destroyAll");
          $("#tableView").jexcel({
            data: data,
            nestedHeaders,
            colHeaders,
            colWidths,
            colAlignments,
            columns,
            tableOverflow: true,
            tableHeight: "500px"
          });
          // }
          $rootScope.loading = false;
        },
        function() {
          $rootScope.loading = false;
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
  $scope.getAllDokter = function() {
    return $http
      .get(SERVER_URL + "/api/table/allDokter", {
        headers: { Authorization: localStorage.getItem("token") }
      })
      .then(function(response) {
        $scope.dokterList = response.data;
      });
  };
  $scope.getAllUnit = function() {
    return $http
      .get(SERVER_URL + "/api/table/allUnit", {
        headers: { Authorization: localStorage.getItem("token") }
      })
      .then(function(response) {
        $scope.unitList = response.data;
      });
  };
  $scope.getAllRuang = function() {
    return $http
      .get(SERVER_URL + "/api/table/allRuang", {
        headers: { Authorization: localStorage.getItem("token") }
      })
      .then(function(response) {
        $scope.ruangList = response.data;
      });
  };
  $scope.getAllDokter();
  $scope.getAllUnit();
  $scope.getAllRuang();
  $scope.getTableMenu();
});
