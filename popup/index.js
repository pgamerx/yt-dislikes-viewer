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
    chrome.storage.sync.set(
      {
        savedApi: api,
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

function ratioBarCustomisation(e) {
  var first = document.getElementsByClassName("color1")[0].value;
  const second = document.getElementsByClassName("color2")[0].value;
  if (first == "" || second == "") {
    var status = document.getElementsByClassName("status2")[0];
    status.textContent = "Please insert a valid Hex Code...";
    status.style.color = "#ff0000";

    setTimeout(() => {
      var status = document.getElementsByClassName("status")[0];
      status.textContent = "";
    }, 5000);
  } else {
    var status = document.getElementsByClassName("status2")[0];
    const reg = /^#[0-9A-F]{6}$/i;
    if(!reg.test(first) || !reg.test(second)) {
      status.textContent = `Invalid HexCode(s) were provided`;
      status.style.color = "#ff0000";
      setTimeout(() => {
        var status = document.getElementsByClassName("status")[0];
        status.textContent = "";
      }, 5000);
      return
    }else{
    status.textContent = "Color options have been saved!";
    status.style.color = "#1eff00";
    chrome.storage.sync.set(
      {
        primary: first,
        secondary: second,
      },
      function () {
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
  console.log(e);
}

document.getElementsByClassName("save2")[0].addEventListener("click", ratioBarCustomisation);
document
  .getElementsByClassName("save")[0]
  .addEventListener("click", save_options);
