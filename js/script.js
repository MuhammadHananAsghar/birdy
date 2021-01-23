function trigger() {
  let NavBar= document.getElementById('CHATLIST');
  NavBar.classList.toggle('active');
  let Trigger = document.getElementById('NavTriggerAside');
  Trigger.classList.toggle('activeNav');
  let Area = document.getElementById('Area');
  Area.classList.toggle('activeArea');
}

var modal = document.getElementById("Modal");
var btn = document.getElementById("emoji");
var span = document.getElementById('close');
btn.onclick = function() {
  var emoji_anchor = "";
    for (var i = 14; i < 92; i++) {
        emoji = "&#" + 1285 + i + ";";
        emoji_anchor += `<a href="#" onclick="getEmoji(this);">${emoji}</a>`;
    }
    for (var i = 296; i < 388; i++) {
        emoji = "&#" + 129 + i + ";";
        emoji_anchor += `<a href="#" onclick="getEmoji(this);">${emoji}</a>`;
    }
    for (var i = 47; i < 60; i++) {
        emoji = "&#" + 1281 + i + ";";
        emoji_anchor += `<a href="#" onclick="getEmoji(this);">${emoji}</a>`;
    }
  modal.style.display = "block";
  document.getElementById('EmojiDiv').innerHTML = '';
  document.getElementById('EmojiDiv').innerHTML = emoji_anchor;
}
span.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function getEmoji(control) {
    document.getElementById("messageBox").value += control.innerHTML;
    document.getElementById('messageBox').focus();
}

var btnMic = document.getElementById('microphone');
var modalMic = document.getElementById("ModalMic");
var spanMic = document.getElementById('closed');
btnMic.onclick = function() {
  modalMic.style.display = "block";
}
spanMic.onclick = function() {
  modalMic.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modalMic) {
    modalMic.style.display = "none";
  }
}
