function save_options(e) {
  var api = document.getElementsByClassName("wptk")[0].value;
  console.log(e);

  if (api === "") {
    var status = document.getElementsByClassName("status")[0];
    status.textContent = "Please insert a valid API key.";
    status.style.color = "#ff0000";

    setTimeout(() => {
      var status = document.getElementsByClassName("status")[0];
      status.textContent = "";
    }, 5000);
  } else {
    var status = document.getElementsByClassName("status")[0];
    status.textContent = "Option saved.";
    status.style.color = "#1eff00";
    browser.storage.local.set(
      {
        apiKey: api,
      },
      function () {
        // Update status to let user know options were saved.
        var status = document.getElementsByClassName("status")[0];
        status.textContent = "Options saved.";

        setTimeout(() => {
          var status = document.getElementsByClassName("status")[0];
          status.textContent = "";
        }, 5000);
      }
    );
  }
}

document
  .getElementsByClassName("save")[0]
  .addEventListener("click", save_options);
