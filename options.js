function save_options() {
  var hideLocked = document.getElementById('hide-locked').checked;
  var hideAccepted = document.getElementById('hide-accepted').checked;
  chrome.storage.sync.set({
    hideLocked: hideLocked,
    hideAccepted: hideAccepted
  }, function() {
    window.close();
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    hideLocked: false,
    hideAccepted: false
  }, function(items) {
    document.getElementById('hide-locked').checked = items.hideLocked;
    document.getElementById('hide-accepted').checked = items.hideAccepted;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
