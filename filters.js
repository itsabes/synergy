sikatApp.filter("range", function() {
  return function(input, total) {
    total = parseInt(total);

    for (var i = 0; i < total; i++) {
      input.push(i);
    }

    return input;
  };
});

sikatApp.directive("metis", function($timeout) {
  return function($scope, $element, $attrs) {
    if ($scope.$last == true) {
      $timeout(function() {
        $("#sidebarnav").metisMenu("dispose");
        $("#sidebarnav").metisMenu();
      }, 150);
    }
  };
});
