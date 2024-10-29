sikatApp.controller("userController", function(
  $scope,
  $rootScope,
  $http,
  $location,
  NgTableParams
) {
  $rootScope.currPage = "user";

  $scope.addUser = () => {
    $location.url("/user_new");
  };
  $scope.showUser = id => {
    $location.url("/user_edit?id=" + id);
  };

  $scope.tableParams = new NgTableParams({}, { dataset: [] });
  $scope.getData = () => {
    var url = SERVER_URL + "/api/user/all";
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

sikatApp.controller("userNewController", function($scope, $rootScope, $http) {
  $rootScope.currPage = "user";
  $scope.save = () => {
    $http
      .post(
        SERVER_URL + "/api/user",
        {
          username: $scope.username,
          password: $scope.password,
          name: $scope.name,
          email: $scope.email,
          role: $scope.role
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

sikatApp.controller("userEditController", function(
  $scope,
  $rootScope,
  $routeParams,
  $http
) {
  $rootScope.currPage = "user";
  $scope.id = $routeParams.id;
  $scope.getData = () => {
    var url = SERVER_URL + "/api/user?id=" + $scope.id;
    $http
      .get(url, { headers: { Authorization: localStorage.getItem("token") } })
      .then(
        function(reqRes) {
          if (reqRes.data && reqRes.data != "") {
            $scope.username = reqRes.data.username;
            $scope.password = reqRes.data.password;
            $scope.name = reqRes.data.name;
            $scope.email = reqRes.data.email;
            $scope.role = reqRes.data.role;
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
        SERVER_URL + "/api/user/" + $scope.id,
        {
          username: $scope.username,
          password: $scope.password,
          name: $scope.name,
          email: $scope.email,
          role: $scope.role
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
    var url = SERVER_URL + "/api/user/" + $scope.id;
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
