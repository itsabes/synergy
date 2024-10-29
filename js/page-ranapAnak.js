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
        "B e d a h",
        "Kesehatan Anak",
        "Obsterik & Ginekologi",
        "Keluarga Berencana",
        "S a r a f",
        "J i w a",
        "T H T",
        "M a t a",
        "Kulit & Kelamin",
        "Gigi & Mulut",
        "Radiologi",
        "Paru-Paru",
        "Spesialisasi Lain",
        "Total"
      ];
      data = [];
      for (var i = 1; i <= kegiatanList.length; i++) {
        data.push([
          kegiatanList[i - 1],
          "0",
          "0",
          "0",
          "0",
          "0",
          "0",
          "0",
          "0",
          "0"
        ]);
      }
      $("#poliAnak").jexcel({
        data: data,
        colHeaders: [
          "Jenis Spesialisasi",
          "Puskesmas",
          "Fas.Kes Lain",
          "RS Lain",
          "Puskesmas",
          "Fas.Kes Lain",
          "RS Lain",
          "Rujukan",
          "Datang Sendiri",
          "Diterima Kembali"
        ],
        colWidths: [400, 120, 120, 120, 120, 120, 120, 150, 150, 150],
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
          "center"
        ],
        columns: [
          {
            type: "text",
            wordWrap: true
          },
          { type: "text" },
          { type: "text" },
          { type: "text" },
          { type: "text" },
          { type: "text" },
          { type: "text" },
          { type: "text" },
          { type: "text" },
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
        if (row == 14) {
          if (col == 0) {
            $(cell).html("Total");
          }
          $(cell).css("font-weight", "600");
          $(cell).css("background-color", "#f3f3f3");
        }
      }
    });
    $("#poliAnak")
      .find("thead")
      .before(
        '<thead class="jexcel_label"><tr><td class="jexcel_label" width="30"></td><td width="400" align="center"></td><td width="360" colspan="3" align="center">Rujukan Diterima Dari</td><td width="360" colspan="3" align="center">Rujukan Dikembalikan Ke</td><td width="450" colspan="3" align="center">DiRujuk</td></tr></thead>'
      );
  }
  refreshTable("1");
});
