if (typeof PasswordReuse == "undefined")
  var PasswordReuse = {};

PasswordReuse.Util = {
  log: function()
  {
    var args = Array.prototype.slice.call(arguments);
    dump(args.length);
    if (typeof Firebug != "undefined")
    {
      Firebug.Console.log.apply(Firebug.Console, args);
    }

    for (var i = 0; i < args.length; i += 1)
      this.dumpObject(args[i], i, 5);
  },

  dumpObject: function(obj, name, maxDepth, curDepth)
  {
    if (curDepth == undefined)
      curDepth = 0;
    if (maxDepth != undefined && curDepth > maxDepth)
      return;

    var i = 0;
    for (prop in obj)
    {
      i++;
      if (typeof(obj[prop]) == "object")
      {
        if (obj[prop] && obj[prop].length != undefined)
          dump(name + "." + prop + "=[probably array, length "
                + obj[prop].length + "]\n");
        else
          dump(name + "." + prop + "=[" + typeof(obj[prop]) + "]\n");
        this.dumpObject(obj[prop], name + "." + prop, maxDepth, curDepth+1);
      }
      else if (typeof(obj[prop]) == "function")
        dump(name + "." + prop + "=[function]\n");
      else
        dump(name + "." + prop + "=" + obj[prop]+"\n");
    }
    if (!i)
      dump(name + " is empty\n");
  }
};

if (typeof Array.prototype.unique == "undefined")
{
  Array.prototype.unique = function()
  {
    var newArray = [];
    for (var i = 0; i < this.length; i += 1)
    {
      if (newArray.indexOf(this[i]) == -1)
        newArray.push(this[i]);
    }
    return newArray;
  };
}