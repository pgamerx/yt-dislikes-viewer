function save_options() {
  var api = document.getElementById('wptk').value;
    chrome.storage.sync.set({
    savedApi: api,
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

function how(){
window.open("https://blog.hubspot.com/website/how-to-get-youtube-api-key", '_blank').focus();

}
function discord(){
window.open("https://u.pgamerx.com/donate", '_blank').focus();
}
function donate(){
window.open("https://ko-fi.com/pgamerx", '_blank').focus();
}

document.getElementById('save').addEventListener('click', save_options);
document.getElementById('how').addEventListener('click', how);
document.getElementById('discord').addEventListener('click', discord);
document.getElementById('donate').addEventListener('click', donate);
