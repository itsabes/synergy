sikatApp.controller(
  "lembarPdsaController",
  function (
    $scope,
    $rootScope,
    $http,
    $filter,
    $location,
    $routeParams,
    NgTableParams
  ) {
    $rootScope.currPage = $routeParams.id;
    $rootScope.currForm = "lembarPdsa";

    // Tambahkan log halaman saat ini
    console.log("Halaman saat ini:", $rootScope.currPage);
    // Jika ingin melog semua $routeParams
    console.log("Parameter URL saat ini:", $routeParams);

    $scope.dataId = null;

    $scope.tableParams = new NgTableParams({}, { dataset: [] });
    $scope.loadData = () => {
      $location.url(
        "/lembarPdsa?tahun=" +
          ($scope.tahun ? $scope.tahun : "") +
          "&unit=" +
          ($scope.unit ? $scope.unit : "")
      );
    };

    $scope.showLembarPdsa = (id) => {
      $location.url(
        "/lembarPdsa_edit/" + $rootScope.currPage + "?uniqIdx=" + id
      );
    };

    $scope.addLembarPdsa = () => {
      $location.url("/lembarPdsa_new");
    };

    $scope.showLembarPdsaEdit = (
      judul,
      numerator,
      denumerator,
      target,
      id,
      analisa,
      rekomendasi
    ) => {
      $location.url(
        "/lembarPdsa_edit/" +
          $rootScope.currPage +
          "?judul=" +
          judul +
          "&numerator=" +
          numerator +
          "&denumerator=" +
          denumerator +
          "&target=" +
          target +
          "&idx=" +
          id +
          "&analisa=" +
          analisa +
          "&rekomendasi=" +
          rekomendasi
      );
    };

    $scope.getData = () => {
      var url = SERVER_URL + "/api/lembarPdsa/getByQuery?q=0";
      url += "&unit=" + $rootScope.currPage;

      $http
        .get(url, { headers: { Authorization: localStorage.getItem("token") } })
        .then(
          function (reqRes) {
            if (reqRes.data && reqRes.data != "") {
              $scope.tableParams = new NgTableParams(
                {},
                { dataset: reqRes.data }
              );
            } else {
              $scope.tableParams = new NgTableParams({}, { dataset: [] });
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

    $scope.backToList = () => {
      window.history.back();
    };

    $scope.getData();
  }
);

sikatApp.controller(
  "lembarPdsaNewController",
  function ($scope, $rootScope, $routeParams, $http) {
    $rootScope.currPage = $routeParams.id;
    $rootScope.currForm = "lembarPdsa";

    // Tambahkan log halaman saat ini
    console.log("Halaman saat ini:", $rootScope.currPage);
    // Jika ingin melog semua $routeParams
    console.log("Parameter URL saat ini:", $routeParams);

    // Inisialisasi array untuk siklus
    $scope.siklusList = [];

    // Fungsi untuk menambah siklus baru
    $scope.tambahSiklus = function () {
      // Dapatkan siklus terakhir di array
      const lastSiklus = $scope.siklusList[$scope.siklusList.length - 1];

      // Cek apakah semua field di siklus terakhir sudah terisi
      if (
        lastSiklus &&
        (!lastSiklus.rencana ||
          !lastSiklus.tanggalMulaiSiklus ||
          !lastSiklus.tanggalSelesaiSiklus ||
          !lastSiklus.berharap ||
          !lastSiklus.tindakan ||
          !lastSiklus.diamati ||
          !lastSiklus.pelajari ||
          !lastSiklus.tindakanSelanjutnya)
      ) {
        swal(
          "Error!",
          "Harap lengkapi semua field di siklus sebelumnya sebelum menambahkan siklus baru.",
          "error"
        );
        return;
      }

      // Tambahkan siklus baru jika validasi lolos
      $scope.siklusList.push({
        rencana: "",
        tanggalMulaiSiklus: "",
        tanggalSelesaiSiklus: "",
        berharap: "",
        tindakan: "",
        diamati: "",
        pelajari: "",
        tindakanSelanjutnya: "",
      });
    };

    // Panggil fungsi sekali saat halaman dimuat untuk inisialisasi siklus pertama
    $scope.tambahSiklus();

    $scope.idx = $routeParams.idx;
    $scope.id = $routeParams.id;

    $scope.save = () => {
      if (!$scope.judulProyek) {
        Swal.fire("Error!", "judul Proyek tidak boleh kosong.", "error");
        return;
      }
      if (!$scope.ketuaTim) {
        Swal.fire("Error!", "ketua Tim tidak boleh kosong.", "error");
        return;
      }

      if (!$scope.anggota1) {
        Swal.fire("Error!", "anggota1 tidak boleh kosong.", "error");
        return;
      }

      if (!$scope.jabatan1) {
        Swal.fire("Error!", "jabatan1 tidak boleh kosong.", "error");
        return;
      }

      if (!$scope.anggota2) {
        Swal.fire("Error!", "anggota2 tidak boleh kosong.", "error");
        return;
      }

      if (!$scope.jabatan2) {
        Swal.fire("Error!", "jabatan2 tidak boleh kosong.", "error");
        return;
      }

      if (!$scope.anggota3) {
        Swal.fire("Error!", "anggota3 tidak boleh kosong.", "error");
        return;
      }

      if (!$scope.jabatan3) {
        Swal.fire("Error!", "jabatan3 tidak boleh kosong.", "error");
        return;
      }

      if (!$scope.benefit) {
        Swal.fire("Error!", "benefit tidak boleh kosong.", "error");
        return;
      }

      if (!$scope.masalah) {
        Swal.fire("Error!", "masalah tidak boleh kosong.", "error");
        return;
      }

      if (!$scope.tujuan) {
        Swal.fire("Error!", "tujuan tidak boleh kosong.", "error");
        return;
      }

      if (!$scope.ukuran) {
        Swal.fire("Error!", "ukuran tidak boleh kosong.", "error");
        return;
      }

      if (!$scope.perbaikan) {
        Swal.fire("Error!", "perbaikan tidak boleh kosong.", "error");
        return;
      }

      if (!$scope.periodeWaktu) {
        Swal.fire("Error!", "periodeWaktu tidak boleh kosong.", "error");
        return;
      }

      if (!$scope.anggaran) {
        Swal.fire("Error!", "anggaran tidak boleh kosong.", "error");
        return;
      }

      if (!$scope.tanggalMulai) {
        Swal.fire("Error!", "tanggalMulai Proyek tidak boleh kosong.", "error");
        return;
      }

      if (!$scope.tanggalSelesai) {
        Swal.fire("Error!", "tanggalSelesai Proyek tidak boleh kosong.", "error");
        return;
      }

      if ($scope.siklusList.length == 0) {
        Swal.fire("Error!", "siklus tidak boleh kosong.", "error");
        return;
      }

      // Cek jika ada siklus dengan id null dan field kosong
      for (let i = 0; i < $scope.siklusList.length; i++) {
        const currentSiklus = $scope.siklusList[i];

        // Check if `id` is null and all other properties are empty
        if (
          (!currentSiklus.rencana ||
            !currentSiklus.tanggalMulaiSiklus ||
            !currentSiklus.tanggalSelesaiSiklus ||
            !currentSiklus.berharap ||
            !currentSiklus.tindakan ||
            !currentSiklus.diamati ||
            !currentSiklus.pelajari ||
            !currentSiklus.tindakanSelanjutnya)
        ) {
          Swal.fire("Error!", "Siklus tidak boleh kosong", "error");
          return;
        }
      }
      $http
        .post(
          SERVER_URL + "/api/lembarPdsa",
          {
            judulProyek: $scope.judulProyek != null ? $scope.judulProyek : "",
            ketuaTim: $scope.ketuaTim != null ? $scope.ketuaTim : "",
            anggota1: $scope.anggota1 != null ? $scope.anggota1 : "",
            anggota2: $scope.anggota2 != null ? $scope.anggota2 : "",
            anggota3: $scope.anggota3 != null ? $scope.anggota3 : "",
            jabatan1: $scope.jabatan1 != null ? $scope.jabatan1 : "",
            jabatan2: $scope.jabatan2 != null ? $scope.jabatan2 : "",
            jabatan3: $scope.jabatan3 != null ? $scope.jabatan3 : "",
            benefit: $scope.benefit != null ? $scope.benefit : "",
            masalah: $scope.masalah != null ? $scope.masalah : "",
            tujuan: $scope.tujuan != null ? $scope.tujuan : "",
            ukuran: $scope.ukuran != null ? $scope.ukuran : "",
            perbaikan: $scope.perbaikan != null ? $scope.perbaikan : "",
            periodeWaktu:
              $scope.periodeWaktu != null ? $scope.periodeWaktu : "",
            anggaran: $scope.anggaran != null ? $scope.anggaran : "",
            tanggalMulai:
              $scope.tanggalMulai != null ? $scope.tanggalMulai : "",
            tanggalSelesai:
              $scope.tanggalSelesai != null ? $scope.tanggalSelesai : "",
            siklus: $scope.siklusList,
          },
          { headers: { Authorization: localStorage.getItem("token") } }
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
  "lembarPdsaEditController",
  function ($scope, $rootScope, $routeParams, $http, pmkpService) {
    var today = new Date();
    $scope.tahun = today.getFullYear() + "";

    $scope.yearDynamic = [];
    const startYear = 2016;
    const currentYear = new Date().getFullYear();
    $scope.currentYear = currentYear;
    for (let year = startYear; year <= currentYear; year++) {
      $scope.yearDynamic.push(year);
    }

    $rootScope.currPage = $routeParams.id;
    $scope.idx = $routeParams.uniqIdx;
    $rootScope.currForm = "lembarPdsa";

    // Tambahkan log halaman saat ini
    console.log("Halaman saat ini:", $rootScope.currPage);
    // Jika ingin melog semua $routeParams
    console.log("Parameter URL saat ini:", $routeParams);

    $scope.siklusList = [];

    // Fungsi untuk menambah siklus baru
    $scope.tambahSiklus = function () {
      // Dapatkan siklus terakhir di array
      const lastSiklus = $scope.siklusList[$scope.siklusList.length - 1];

      // Cek apakah semua field di siklus terakhir sudah terisi
      if (
        lastSiklus &&
        (!lastSiklus.rencana ||
          !lastSiklus.tanggalMulaiSiklus ||
          !lastSiklus.tanggalSelesaiSiklus ||
          !lastSiklus.berharap ||
          !lastSiklus.tindakan ||
          !lastSiklus.diamati ||
          !lastSiklus.pelajari ||
          !lastSiklus.tindakanSelanjutnya)
      ) {
        swal(
          "Error!",
          "Harap lengkapi semua field di siklus sebelumnya sebelum menambahkan siklus baru.",
          "error"
        );
        return;
      }

      // Tambahkan siklus baru jika validasi lolos
      $scope.siklusList.push({
        siklusId: "",
        rencana: "",
        tanggalMulaiSiklus: "",
        tanggalSelesaiSiklus: "",
        berharap: "",
        tindakan: "",
        diamati: "",
        pelajari: "",
        tindakanSelanjutnya: "",
      });
    };

    $scope.getData = () => {
      var url = SERVER_URL + "/api/lembarPdsa?id=" + $scope.idx;
      $http
        .get(url, { headers: { Authorization: localStorage.getItem("token") } })
        .then(
          function (reqRes) {
            if (reqRes.data && reqRes.data != "") {
              $scope.lembarPdsaId = reqRes.data.ID;
              $scope.judulProyek =
                reqRes.data.JUDUL_PROYEK != null
                  ? reqRes.data.JUDUL_PROYEK
                  : "";
              $scope.ketuaTim =
                reqRes.data.KETUA_TIM != null ? reqRes.data.KETUA_TIM : "";
              $scope.anggota1 =
                reqRes.data.ANGGOTA_1 != null ? reqRes.data.ANGGOTA_1 : "";
              $scope.anggota2 =
                reqRes.data.ANGGOTA_2 != null ? reqRes.data.ANGGOTA_2 : "";
              $scope.anggota3 =
                reqRes.data.ANGGOTA_3 != null ? reqRes.data.ANGGOTA_3 : "";
              $scope.jabatan1 =
                reqRes.data.JABATAN_1 != null ? reqRes.data.JABATAN_1 : "";
              $scope.jabatan2 =
                reqRes.data.JABATAN_2 != null ? reqRes.data.JABATAN_2 : "";
              $scope.jabatan3 =
                reqRes.data.JABATAN_3 != null ? reqRes.data.JABATAN_3 : "";
              $scope.benefit =
                reqRes.data.BENEFIT != null ? reqRes.data.BENEFIT : "";
              $scope.masalah =
                reqRes.data.MASALAH != null ? reqRes.data.MASALAH : "";
              $scope.tujuan =
                reqRes.data.TUJUAN != null ? reqRes.data.TUJUAN : "";
              $scope.ukuran =
                reqRes.data.UKURAN != null ? reqRes.data.UKURAN : "";
              $scope.perbaikan =
                reqRes.data.PERBAIKAN != null ? reqRes.data.PERBAIKAN : "";
              $scope.periodeWaktu =
                reqRes.data.PERIODE_WAKTU != null
                  ? reqRes.data.PERIODE_WAKTU
                  : "";
              $scope.anggaran =
                reqRes.data.ANGGARAN != null ? reqRes.data.ANGGARAN : "";
              $scope.tanggalMulai =
                reqRes.data.TANGGAL_MULAI != null
                  ? new Date(reqRes.data.TANGGAL_MULAI)
                  : "";
              $scope.tanggalSelesai =
                reqRes.data.TANGGAL_SELESAI != null
                  ? new Date(reqRes.data.TANGGAL_SELESAI)
                  : "";
              $scope.siklusList = reqRes.data.SIKLUS != null ? reqRes.data.SIKLUS.map(function(siklus) {
                    siklus.tanggalMulaiSiklus = new Date(siklus.tanggalMulaiSiklus);
                    siklus.tanggalSelesaiSiklus = new Date(siklus.tanggalSelesaiSiklus);
                    return siklus;
                }) : [];
                
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
      if (!$scope.judulProyek) {
        Swal.fire("Error!", "judul Proyek tidak boleh kosong.", "error");
        return;
      }
      if (!$scope.ketuaTim) {
        Swal.fire("Error!", "ketua Tim tidak boleh kosong.", "error");
        return;
      }

      if (!$scope.anggota1) {
        Swal.fire("Error!", "anggota1 tidak boleh kosong.", "error");
        return;
      }

      if (!$scope.jabatan1) {
        Swal.fire("Error!", "jabatan1 tidak boleh kosong.", "error");
        return;
      }

      if (!$scope.anggota2) {
        Swal.fire("Error!", "anggota2 tidak boleh kosong.", "error");
        return;
      }

      if (!$scope.jabatan2) {
        Swal.fire("Error!", "jabatan2 tidak boleh kosong.", "error");
        return;
      }

      if (!$scope.anggota3) {
        Swal.fire("Error!", "anggota3 tidak boleh kosong.", "error");
        return;
      }

      if (!$scope.jabatan3) {
        Swal.fire("Error!", "jabatan3 tidak boleh kosong.", "error");
        return;
      }

      if (!$scope.benefit) {
        Swal.fire("Error!", "benefit tidak boleh kosong.", "error");
        return;
      }

      if (!$scope.masalah) {
        Swal.fire("Error!", "masalah tidak boleh kosong.", "error");
        return;
      }

      if (!$scope.tujuan) {
        Swal.fire("Error!", "tujuan tidak boleh kosong.", "error");
        return;
      }

      if (!$scope.ukuran) {
        Swal.fire("Error!", "ukuran tidak boleh kosong.", "error");
        return;
      }

      if (!$scope.perbaikan) {
        Swal.fire("Error!", "perbaikan tidak boleh kosong.", "error");
        return;
      }

      if (!$scope.periodeWaktu) {
        Swal.fire("Error!", "periodeWaktu tidak boleh kosong.", "error");
        return;
      }

      if (!$scope.anggaran) {
        Swal.fire("Error!", "anggaran tidak boleh kosong.", "error");
        return;
      }

      if (!$scope.tanggalMulai) {
        Swal.fire("Error!", "tanggalMulai Proyek tidak boleh kosong.", "error");
        return;
      }

      if (!$scope.tanggalSelesai) {
        Swal.fire("Error!", "tanggalSelesai Proyek tidak boleh kosong.", "error");
        return;
      }

      // Cek jika ada siklus dengan id null dan field kosong
      for (let i = 0; i < $scope.siklusList.length; i++) {
        const currentSiklus = $scope.siklusList[i];

        // Check if `id` is null and all other properties are empty
        if (
          currentSiklus.id == null &&
          (!currentSiklus.rencana ||
            !currentSiklus.tanggalMulaiSiklus ||
            !currentSiklus.tanggalSelesaiSiklus ||
            !currentSiklus.berharap ||
            !currentSiklus.tindakan ||
            !currentSiklus.diamati ||
            !currentSiklus.pelajari ||
            !currentSiklus.tindakanSelanjutnya)
        ) {
          Swal.fire("Error!", "Siklus tidak boleh kosong", "error");
          return;
        }
      }

      $http
        .put(
          SERVER_URL + "/api/lembarPdsa",
          {
            id: $scope.lembarPdsaId,
            judulProyek: $scope.judulProyek != null ? $scope.judulProyek : "",
            ketuaTim: $scope.ketuaTim != null ? $scope.ketuaTim : "",
            anggota1: $scope.anggota1 != null ? $scope.anggota1 : "",
            anggota2: $scope.anggota2 != null ? $scope.anggota2 : "",
            anggota3: $scope.anggota3 != null ? $scope.anggota3 : "",
            jabatan1: $scope.jabatan1 != null ? $scope.jabatan1 : "",
            jabatan2: $scope.jabatan2 != null ? $scope.jabatan2 : "",
            jabatan3: $scope.jabatan3 != null ? $scope.jabatan3 : "",
            benefit: $scope.benefit != null ? $scope.benefit : "",
            masalah: $scope.masalah != null ? $scope.masalah : "",
            tujuan: $scope.tujuan != null ? $scope.tujuan : "",
            ukuran: $scope.ukuran != null ? $scope.ukuran : "",
            perbaikan: $scope.perbaikan != null ? $scope.perbaikan : "",
            periodeWaktu:
              $scope.periodeWaktu != null ? $scope.periodeWaktu : "",
            anggaran: $scope.anggaran != null ? $scope.anggaran : "",
            tanggalMulai:
              $scope.tanggalMulai != null ? $scope.tanggalMulai : "",
            tanggalSelesai:
              $scope.tanggalSelesai != null ? $scope.tanggalSelesai : "",
            siklus: $scope.siklusList,
          },
          { headers: { Authorization: localStorage.getItem("token") } }
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

    $scope.downloadPdf = (idx) => {
      const data = {
        direkturName: localStorage.getItem("nama_direktur"),
        direkturNip: localStorage.getItem("nip_direktur"),
        rsName: localStorage.getItem("nama_rumah_sakit"),
      };
      const url =
        REPORT_URL + "/lembar_pdsa/" + $scope.currPage + "/" + idx;
      pmkpService.postDownload(url, data, $scope.currPage + ".pdf");
    };

    $scope.delete = () => {
      var url = SERVER_URL + "/api/lembarPdsa/delete?id=" + $scope.idx;

      $http
        .get(url, { headers: { Authorization: localStorage.getItem("token") } })
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

    $scope.delete = () => {
      var url = SERVER_URL + "/api/lembarPdsa/delete?id=" + $scope.idx;

      $http
        .get(url, { headers: { Authorization: localStorage.getItem("token") } })
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
