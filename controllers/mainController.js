sikatApp.controller("mainController", function(
  $scope,
  $rootScope,
  $http,
  pmkpService
) {
  $rootScope.yearRange = [];
  for (var i = 2020; i <= new Date().getYear() + 1900; i++) {
    $rootScope.yearRange.push(i);
  }
  $rootScope.loading = false;
  $rootScope.currPage = "dashboard";
  $scope.message = "Selamat Datang";
  $scope.user_name = localStorage.getItem("user_name");
  $scope.user_role = localStorage.getItem("user_role");
  $scope.user_email = localStorage.getItem("user_email");
  $scope.menuTableList = [];
  $scope.formAExist = page => {
    var dailyNamesForPage = pmkpService.getDailyNames(page);
    if (dailyNamesForPage !== null && dailyNamesForPage.length > 0) {
      return true;
    }
    return false;
  };
  $scope.getData = () => {
    var url = SERVER_URL + "/api/table/all";
    $http
      .get(url, { headers: { Authorization: localStorage.getItem("token") } })
      .then(
        function(reqRes) {
          if (reqRes.data && reqRes.data != "") {
            var menuTableList = reqRes.data;
            var menuList = {};
            for (var i = 0; i < menuTableList.length; i++) {
              var menuToken = menuTableList[i].nm_menu.split("#");
              if (menuToken[0] in menuList) {
                menuList[menuToken[0]].push({
                  ...menuTableList[i],
                  submenu: menuToken[1]
                });
              } else {
                menuList[menuToken[0]] = [
                  { ...menuTableList[i], submenu: menuToken[1] }
                ];
              }
            }
            $scope.menuTableList = menuList;
          } else {
            $scope.menuTableList = [];
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
  $scope.logout = function() {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    window.location = "/synergy-2024";
  };
  $scope.getData();
  $rootScope.isNumeric = function(value) {
    return /^\d+$/.test(value);
  };
});
