var electron = require('electron');
var fform = document.getElementById('form');
var femail = document.getElementById('email');
var fmessage = document.getElementById('message');
var infos;

if (localStorage.getItem('email')) {
  femail.value = localStorage.getItem('email');
}

fform.onsubmit = function(e) {
  e.preventDefault();

  var data = {
    email: femail.value,
    message: fmessage.value,
    infos: infos
  };

  localStorage.setItem('email', data.email);

  console.log(data);

  var http = new XMLHttpRequest();
  var url = "https://alltomp3.org/app.feedback.php";
  http.open("POST", url, true);
  http.setRequestHeader("Content-Type", "application/json");
  http.send(JSON.stringify(data));
  alert(translation.confirmation);
  fmessage.value = '';
};

electron.ipcRenderer.on('feedback.infos', function (event, inf) {
  console.log("[Feedback] infos");
  infos = inf;
});

var translations = {
  fr: {
    email: 'Votre adresse email (si vous le souhaitez, pour que je puisse vous contacter si nécessaire)',
    message: 'Votre message',
    send: 'Envoyer',
    confirmation: 'Votre message a été envoyé !'
  },
  en: {
    confirmation: 'Your message has been sent!'
  }
};
var translation = translations[navigator.language] || translations.en;

document.querySelectorAll('[i18n]').forEach(function (e) {
  var attr = e.getAttribute('i18n-attr') || 'innerHTML';
  if (translation[e.getAttribute('i18n')]) {
    e[attr] = translation[e.getAttribute('i18n')];
  }
});
