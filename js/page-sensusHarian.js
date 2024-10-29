$(function() {
  // For select 2
  $(".select2").select2();
  $("#type-select").on("select2:select", function(e) {
    refreshTable(e.params.data.id);
  });
  $("#month-select").datepicker({
    autoclose: true,
    todayHighlight: true,
    format: "MM yyyy",
    startView: "months",
    minViewMode: "months"
  });
  function refreshTable(selected) {
    if (selected == "IGD") {
      variableList = [
        "Jumlah pasien yang \nmendapat pertolongan life \nsaving",
        "Jumlah  pasien yang \nmembutuhkan penanganan \nlife saving",
        "Jumlah waktu yang \ndiperlukan sejak kedatangan \npasien sampai mendapat \npelayanan dokter",
        "Jumlah pasien yang \ndisampling (min n=50)",
        "Jumlah pasien yang \nmeninggal <24 jam sejak \npasien datang",
        "Jumlah seluruh pasien di \nhari tersebut",
        "Aspirin  diberikan <24 jam \nuntuk pasien dengan acute \nmyocardial",
        "Jumlah pasien dengan \ndiagnosa AMI",
        "Jumlah pasien jatuh di IGD",
        "Jumlah seluruh pasien di \nhari tersebut",
        "Jumlah waktu yang \ndiperlukan sejak kedatangan \npasien di IGD sampai pasien \ndipulangkan/dirawat/dirujuk",
        "Jumlah seluruh pasien di \nhari tersebut (kec pasien \nfalse emergency)",
        "Jumlah pasien yang pulang \npaksa",
        "Jumlah seluruh pasien di \nhari tersebut (kec pasien \nfalse emergency)"
      ];
    } else if (selected == "Rajal") {
      variableList = [
        "Jumlah pelayanan rawat \njalan spesialistik yang buka \nsesuai ketentuan ",
        "Jumlah pelayanan rawat \njalan spesialistik di hari \ntersebut",
        "Jumlah waktu tunggu \npasien rawat jalan yang disurvey",
        "Jumlah pasien rawat \njalan yang disurvey di hari tersebut",
        "Jumlah pasien rajal TB\n yang ditangani dengan strategi DOTS di hari tersebut",
        "Jumlah pasien rajal TB\n di hari tersebut",
        "Jumlah pasien yang \nmengalami kesalahan pemberian label",
        "Jumlah pasien di hari \ntersebut"
      ];
    }
    data = [];
    for (var i = 1; i <= variableList.length; i++) {
      data.push([
        variableList[i - 1],
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        0
      ]);
    }
    $("#sensusHarian").jexcel({
      data: data,
      colHeaders: [
        "Besaran / Variabel",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
        "31",
        "Total"
      ],
      colWidths: [
        250,
        30,
        30,
        30,
        30,
        30,
        30,
        30,
        30,
        30,
        30,
        30,
        30,
        30,
        30,
        30,
        30,
        30,
        30,
        30,
        30,
        30,
        30,
        30,
        30,
        30,
        30,
        30,
        30,
        30,
        30,
        30,
        80
      ],
      colAlignments: [
        "left",
        "center",
        "center",
        "center",
        "center",
        "center",
        "center",
        "center",
        "center",
        "center",
        "center",
        "center",
        "center",
        "center",
        "center",
        "center",
        "center",
        "center",
        "center",
        "center",
        "center",
        "center",
        "center",
        "center",
        "center",
        "center",
        "center",
        "center",
        "center",
        "center",
        "center",
        "center"
      ],
      columns: [
        {
          type: "text",
          wordWrap: true
        },
        { type: "number" },
        { type: "number" },
        { type: "number" },
        { type: "number" },
        { type: "number" },
        { type: "number" },
        { type: "number" },
        { type: "number" },
        { type: "number" },
        { type: "number" },
        { type: "number" },
        { type: "number" },
        { type: "number" },
        { type: "number" },
        { type: "number" },
        { type: "number" },
        { type: "number" },
        { type: "number" },
        { type: "number" },
        { type: "number" },
        { type: "number" },
        { type: "number" },
        { type: "number" },
        { type: "number" },
        { type: "number" },
        { type: "number" },
        { type: "number" },
        { type: "number" },
        { type: "number" },
        { type: "number" },
        { type: "number" }
      ]
    });
    $("#sensusHarian").jexcel("updateSettings", {
      table: function(instance, cell, col, row, val, id) {
        // Odd row colours
        if (row % 2) {
          $(cell).css("background-color", "#edf3ff");
        }
        if (col !== "0" && col !== "32") {
          $(cell).css("background-color", "#26c6da4d");
        }
      }
    });
    $("#sensusHarian")
      .find("thead")
      .before(
        '<thead class="jexcel_label"><tr><td class="jexcel_label" width="30"></td><td width="250" align="center"></td><td width="930" colspan="31" align="center">Jumlah Dalam Tanggal</td><td width="80" align="center"></td></tr></thead>'
      );
  }
  refreshTable("IGD");
});
