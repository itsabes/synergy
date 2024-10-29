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
    if (selected == "1") {
      kegiatanList = [
        "Penyakit Dalam",
        "Bedah",
        "Kesehatan Anak (Neonatal)",
        "Kesehatan Anak (Lainnya)",
        "Obstetri & Ginekologi (Ibu Hamil)",
        "Obstetri & Ginekologi (Lainnya)",
        "Keluarga Berencana",
        "Bedah Saraf",
        "Saraf",
        "Jiwa",
        "Napza",
        "Psikologi",
        "THT",
        "Mata",
        "Kulit dan Kelamin",
        "Gigi dan Mulut",
        "Geriatri",
        "Kardiologi",
        "Radiologi",
        "Bedah Orthopedi",
        "Paru-paru",
        "Kusta",
        "Umum ",
        "Rawat Darurat",
        "Rehabilitasi Medis",
        "Akupungtur Medis",
        "Konsultasi Gizi",
        "Day Care",
        "Lain-lain",
        "Total"
      ];
      data = [];
      for (var i = 1; i <= kegiatanList.length; i++) {
        data.push([kegiatanList[i - 1], "0"]);
      }
      $("#poliAnak").jexcel({
        data: data,
        colHeaders: ["Jenis Kegiatan", "Jumlah"],
        colWidths: [400, 120],
        colAlignments: ["center", "center"],
        columns: [
          {
            type: "text",
            wordWrap: true
          },
          { type: "text" }
        ]
      });
    } else if (selected == "2") {
      kegiatanList = [
        "rfa",
        "well baby",
        "ispa",
        "gea",
        "tfa",
        "obs febris",
        "fa",
        "RINITIS",
        "diare akut",
        "bp"
      ];
      data = [];
      for (var i = 1; i <= kegiatanList.length; i++) {
        data.push(["", kegiatanList[i - 1], "0", "0", "0", "0"]);
      }
      $("#poliAnak").jexcel({
        editable: false,
        wordWrap: true,
        data: data,
        colHeaders: [
          "Kode ICD 10",
          "Deskripsi",
          "Kasus Baru LK",
          "Kasus Baru PR",
          "Jml. Kasus Baru",
          "Jml. Kunjungan"
        ],
        colWidths: [150, 400, 150, 150, 150, 150],
        colAlignments: ["left", "left", "center", "center", "center", "center"],
        columns: [
          { type: "text" },
          { type: "text", wordWrap: true },
          { type: "text" },
          { type: "text" },
          { type: "text" },
          { type: "text" }
        ]
      });
    }
    $("#poliAnak").jexcel("updateSettings", {
      table: function(instance, cell, col, row, val, id) {
        // Odd row colours
        if (row % 2) {
          $(cell).css("background-color", "#edf3ff");
        }
        // Remove controls for the last row
        if (row == 29) {
          if (col == 0) {
            $(cell).html("Total");
          }
          $(cell).css("font-weight", "600");
          $(cell).css("background-color", "#f3f3f3");
        }
      }
    });
  }
  refreshTable("1");
});
