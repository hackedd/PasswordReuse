if (typeof PasswordReuse == "undefined")
  var PasswordReuse = {};

PasswordReuse.Menu = {
  checkStoredPasswords: function(event)
  {
    window.openDialog("chrome://passwordreuse/content/checkStoredPasswords.xul", "check-stored-passwords", "");
  },

  displayPreferences: function(event)
  {
    window.alert("Preferences");
  }
};
