function togglePopup(div){
  if(div) {
    div.classList.toggle("active");
  } else {
    var modals = document.getElementsByClassName("active");
    
    for(i = 0; i < modals.length; i++) {
      var modal = modals[i];
      
      modal.classList.remove("active");
    }
  }
  
}
function toggle_help() {
  const help_modal = document.getElementById("help-modal");
  togglePopup(help_modal);
}
function toggle_about() {
  const about_modal = document.getElementById("about-modal");
  togglePopup(about_modal);
}

const overlays = document.getElementsByClassName("overlay");
for(i = 0; i < overlays.length; i++) {
  var overlay = overlays[i];
  
  overlay.onclick = (e) => {
    togglePopup();
  };
}
