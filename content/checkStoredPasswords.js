if (typeof PasswordReuse == "undefined")
  var PasswordReuse = {};

var CC_loginManager = Components.classes["@mozilla.org/login-manager;1"];
var nsLoginInfo = new Components.Constructor("@mozilla.org/login-manager/loginInfo;1", Components.interfaces.nsILoginInfo, "init");

PasswordReuse.CheckStoredPasswords = {
  checkStoredPasswords: function(event)
  {
    var logins = this.getStoredPasswords();
    var list = document.getElementById("check-stored-passwords-list");
    var usage = {};
    var reused = 0;

    for (var i = 0; i < logins.length; i += 1)
    {
      var domainClass = PasswordReuse.Classify.classifyDomain(logins[i].hostname),
          key = logins[i].password;

      if (!(key in usage))
      {
        usage[key] = {
          logins: [],
          usernames: [],
          sites: [],
          domainClass: domainClass,
          count: 0
        };
      }

      usage[key].count += 1;
      usage[key].logins.push(logins[i]);

      if (usage[key].usernames.indexOf(logins[i].username) == -1)
        usage[key].usernames.push(logins[i].username);

      var site = logins[i].hostname.replace(/^http(s?):\/\//, "");
      if (usage[key].sites.indexOf(site) == -1)
        usage[key].sites.push(site);

      if (usage[key].domainClass != -1 && usage[key].domainClass != domainClass)
        usage[key].domainClass = -1;
    }

    for (var key in usage)
    {
      if (usage[key].count == 1)
        continue;

      this.addListRow(list,
        usage[key].count,
        PasswordReuse.Classify.getDescription(usage[key].domainClass),
        usage[key].usernames.join(", "),
        "(hidden)",
        usage[key].sites.join(", ")
      );
      reused += 1;
    }

    if (reused == 0)
    {
      window.alert("Congratulations, none of your stored passwords are used for multiple sites!");
    }
  },

  getStoredPasswords: function()
  {
    var loginManager = CC_loginManager.getService(Components.interfaces.nsILoginManager);
    return loginManager.getAllLogins({});
  },

  addListRow: function(list)
  {
    var item = document.createElement("listitem");

    for (var i = 1; i < arguments.length; i += 1)
    {
      var cell = document.createElement("listcell");
      cell.setAttribute("label", arguments[i]);
      item.appendChild(cell);
    }

    list.appendChild(item);
  },
};
