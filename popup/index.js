function save_options() {
  var api = document.getElementById("wptk").value;
  chrome.storage.sync.set(
    {
      savedApi: api,
    },
    function () {
      // Update status to let user know options were saved.
      var status = document.getElementById("status");
      status.textContent = "Options saved.";
      setTimeout(function () {
        status.textContent = "";
      }, 750);
    }
  );
}

console.log(document.getElementById("save"));
document.getElementById("save").addEventListener("click", save_options);
