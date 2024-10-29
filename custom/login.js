function login() {
  $("#errorMessage").text("");
  var username = $("#username").val();
  var password = $("#password").val();
  $.post(
    SERVER_URL + "/auth/token",
    { username: username, password: password },
    function(data) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user_name", data.name);
      localStorage.setItem("user_role", data.role);
      localStorage.setItem("user_email", data.email);
      jQuery.ajax({
        url: SERVER_URL + "/api/settings",
        headers: {
          Authorization: localStorage.getItem("token")
        },
        success: function(reqRes) {
          localStorage.setItem("nama_direktur", reqRes.nama_direktur);
          localStorage.setItem("nip_direktur", reqRes.nip_direktur);
          localStorage.setItem("nama_rumah_sakit", reqRes.nama_rumah_sakit);
          localStorage.setItem("waktu_kunci_pmkp", reqRes.waktu_kunci_pmkp);
          localStorage.setItem("waktu_sembunyi_ikp", reqRes.waktu_sembunyi_ikp);
        },
        async: false
      });
      window.location = "main.html";
    }
  ).fail(function() {
    $("#errorMessage").text("Nulis Username dan Password yang Bener BOSS!!");
  });
}

function enterKeypress(e, callFunc) {
  e = e || window.event;
  if (e.keyCode == 13) {
    callFunc();
  }
}

$("#username").focus();
