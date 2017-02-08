var electron = require('electron');
var fform = document.getElementById('form');
var femail = document.getElementById('email');
var fmessage = document.getElementById('message');
var infos;

fform.onsubmit = function(e) {
  e.preventDefault();

  var data = {
    email: femail.value,
    message: fmessage.value,
    infos: infos
  };

  console.log(data);
};

electron.ipcRenderer.on('feedback.infos', function (event, inf) {
  console.log("[Feedback] infos");
  infos = inf;
});
