var expect      = require('chai').expect;
var NestedProps = require('../../lib/nested_props');

describe("NestedProps.add", function() {
  it('creates a nested property in a blank object', function() {
    var object = {};
    NestedProps.add(object, "name.first", "tom");
    expect(object.name.first).to.equal("tom");
  })

  it('retains "bystandard" props', function() {
    var object = { name: {last: "yolk"}, age: 48 }
    NestedProps.add(object, "name.first", "tom");
    expect(object.name.first).to.equal("tom");
    expect(object.name.last).to.equal("yolk");
    expect(object.age).to.equal(48);
  })

  it('overrides existing values', function() {
    var object = { name: { first: "david", last: "yolk"}, age: 48 }
    NestedProps.add(object, "name.first", "tom");
    expect(object.name.first).to.equal("tom");
  })

  it('doesnt override an existing values if replaceExisting=false', function() {
    var object = { name: { first: 'jason' } };
    NestedProps.add(object, "name.first", 'tim', false);
    expect(object.name.first).to.equal('jason');
  })

  it('sets the value if replaceExisting=false, but no current value exists', function() {
    var object = {};
    NestedProps.add(object, "name.first", 'tim', false);
    expect(object.name.first).to.equal('tim');
  })

  it('nests real deep-like', function() {
    var object = {};
    var key = "supervisor.department.manager.officer.name.first";
    NestedProps.add(object, key, "joe");
    var value = object.supervisor.department.manager.officer.name.first;
    expect(value).to.equal("joe");
  })

  it('creates a nested prop with a null value if no value is passed', function() {
    var object = {};
    NestedProps.add(object, "name.first");
    expect(object.name.first).to.equal(null);
  })

  it('doesnt override an existing prop if no value is passed', function() {
    var object = { name: { first: 'jason' } };
    NestedProps.add(object, "name.first");
    expect(object.name.first).to.equal('jason');
  })
}); // NestedProps.add


describe("NestedProps.select", function() {
  it('selects a deeply nested property', function() {
    var object = { manager: { name: { first: "david", last: "yolk" }}}
    var value = NestedProps.select(object, "manager.name.first");
    expect(value).to.equal("david");
  })

  it('passes arrays by reference', function() {
    var object = { managers: { names: ['david', 'james'] }}
    var names = NestedProps.select(object, "managers.names");
    names.push('tom')
    expect(object.managers.names.length).to.equal(3);
  })
}); // NestedProps.select
