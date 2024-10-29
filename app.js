var sikatApp = angular.module("sikatApp", [
  "ngRoute",
  "xeditable",
  "fixed.table.header",
  "ngTable",
  "ngTableExport",
  "moment-picker",
  "angularMoment",
  "ngSanitize",
  "ui.select"
]);
sikatApp.constant("moment", moment);
sikatApp.run([
  "editableOptions",
  "editableThemes",
  function (editableOptions, editableThemes) {
    editableOptions.theme = "bs3"; // bootstrap3 theme. Can be also 'bs2', 'default'
    editableThemes["bs3"].submitTpl =
      '<button type="submit" class="btn btn-success btn-xs m-t-5" title="Submit" aria-label="Submit" ng-click="$form.$submit()"><span class="fas fa-check"></span></button>';
    editableThemes["bs3"].cancelTpl =
      '<button type="button" class="btn btn-warning btn-xs m-t-5" ng-click="$form.$cancel()" title="Cancel" aria-label="Cancel"><span class="fas fa-ban"></span></button>';
  }
]);

sikatApp.config(function ($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "pages/home.html",
      controller: "mainController"
    })
    .when("/user", {
      templateUrl: "pages/userList.html",
      controller: "userController"
    })
    .when("/user_new", {
      templateUrl: "pages/userNew.html",
      controller: "userNewController"
    })
    .when("/user_edit", {
      templateUrl: "pages/userEdit.html",
      controller: "userEditController"
    })
    .when("/settings", {
      templateUrl: "pages/settings.html",
      controller: "settingsController"
    })
    .when("/indikatorMutu", {
      templateUrl: "pages/indikatorMutuList.html",
      controller: "indikatorMutuListController"
    })
    .when("/indikatorMutu_new", {
      templateUrl: "pages/indikatorMutuNew.html",
      controller: "indikatorMutuNewController"
    })
    .when("/indikatorMutu_edit", {
      templateUrl: "pages/indikatorMutuEdit.html",
      controller: "indikatorMutuEditController"
    })
    .when("/forma/:id", {
      templateUrl: "pages/forma.html",
      controller: "formAController"
    })
    .when("/formb/:id", {
      templateUrl: "pages/formb.html",
      controller: "formBController"
    })
    .when("/rekap/:id", {
      templateUrl: "pages/rekap.html",
      controller: "rekapController"
    })
    .when("/analisaIndikator_new/", {
      templateUrl: "pages/analisaIndikatorNew.html",
      controller: "analisaIndikatorNewController"
    })
    .when("/analisaIndikator_edit/", {
      templateUrl: "pages/analisaIndikatorEdit.html",
      controller: "analisaIndikatorEditController"
    })
    .when("/ppi", {
      templateUrl: "pages/ppiList.html",
      controller: "ppiController"
    })
    .when("/ppi_new", {
      templateUrl: "pages/ppiNew.html",
      controller: "ppiNewController"
    })
    .when("/ppi_edit", {
      templateUrl: "pages/ppiEdit.html",
      controller: "ppiEditController"
    })
    .when("/ppi_report_harian", {
      templateUrl: "pages/ppiReportHarian.html",
      controller: "ppiReportHarianController"
    })
    .when("/ppi_report_bulanan", {
      templateUrl: "pages/ppiReportBulanan.html",
      controller: "ppiReportBulananController"
    })
    .when("/ppi_report_kamar", {
      templateUrl: "pages/ppiReportKamar.html",
      controller: "ppiReportKamarController"
    })
    .when("/k3rsLapor", {
      templateUrl: "pages/k3rsLaporList.html",
      controller: "k3rsLaporController"
    })
    .when("/k3rsLapor_new", {
      templateUrl: "pages/k3rsLaporNew.html",
      controller: "k3rsLaporNewController as ctrl"
    })
    .when("/k3rsLapor_edit", {
      templateUrl: "pages/k3rsLaporEdit.html",
      controller: "k3rsLaporEditController as ctrl"
    })
    .when("/k3rsInves", {
      templateUrl: "pages/k3rsInvesList.html",
      controller: "k3rsInvesController"
    })
    .when("/k3rsInves_new", {
      templateUrl: "pages/k3rsInvesNew.html",
      controller: "k3rsInvesNewController"
    })
    .when("/k3rsInves_edit", {
      templateUrl: "pages/k3rsInvesEdit.html",
      controller: "k3rsInvesEditController"
    })
    .when("/b3rs", {
      templateUrl: "pages/b3rsList.html",
      controller: "b3rsController"
    })
    .when("/b3rs_new", {
      templateUrl: "pages/b3rsNew.html",
      controller: "b3rsNewController"
    })
    .when("/b3rs_edit", {
      templateUrl: "pages/b3rsEdit.html",
      controller: "b3rsEditController"
    })
    .when("/ikpLapor", {
      templateUrl: "pages/ikpLaporList.html",
      controller: "ikpLaporController"
    })
    .when("/ikpLapor_new", {
      templateUrl: "pages/ikpLaporNew.html",
      controller: "ikpLaporNewController"
    })
    .when("/ikpLapor_edit", {
      templateUrl: "pages/ikpLaporEdit.html",
      controller: "ikpLaporEditController"
    })
    .when("/ikpLapor_report_harian", {
      templateUrl: "pages/ikpLaporReportHarian.html",
      controller: "ikpLaporReportHarianController"
    })
    .when("/ikpInves", {
      templateUrl: "pages/ikpInvesList.html",
      controller: "ikpInvesController"
    })
    .when("/ikpInves_new", {
      templateUrl: "pages/ikpInvesNew.html",
      controller: "ikpInvesNewController"
    })
    .when("/ikpInves_edit", {
      templateUrl: "pages/ikpInvesEdit.html",
      controller: "ikpInvesEditController"
    })
    .when("/ikpInves_report_harian", {
      templateUrl: "pages/ikpInvesReportHarian.html",
      controller: "ikpInvesReportHarianController"
    })
    .when("/table", {
      templateUrl: "pages/tableList.html",
      controller: "tableController"
    })
    .when("/table_new", {
      templateUrl: "pages/tableNew.html",
      controller: "tableNewController"
    })
    .when("/table_edit", {
      templateUrl: "pages/tableEdit.html",
      controller: "tableEditController"
    })
    .when("/viewTable/:id", {
      templateUrl: "pages/viewTable.html",
      controller: "viewTableController"
    });
});