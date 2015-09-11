var _ = require('underscore');

var NestedProps = {};

NestedProps.add = function(object, key, val, replaceExisting) {
  var value = val || null;
  var replace = (replaceExisting === undefined) ? true : replaceExisting;
  var split = key.split('.');
  var thisKey = split[0];
  if (split.length > 1) {
    if (typeof object[thisKey] !== 'object') object[thisKey] = {};
    var newKey = key.replace(thisKey+'.', '');
    this.add(object[thisKey], newKey, value, replace);
  } else {
    if ((replace && val) || object[thisKey] === undefined)
      object[thisKey] = value;
  }
}

NestedProps.select = function(object, key) {
  var split = key.split('.');
  var thisKey = split[0];
  if (split.length > 1) {
    var value = object[thisKey];
    var newKey = key.replace(thisKey+'.', '');
    return this.select(value, newKey);
  } else {
    return object[thisKey];
  }
}

module.exports = NestedProps;
