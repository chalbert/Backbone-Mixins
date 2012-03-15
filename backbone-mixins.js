define([
  'underscore',
  'libs/vendor/backbone/backbone'
], function(_, Backbone) {

  function implementMixins(protoProps) {

    var mixins = protoProps.mixins,
        mixed = this;

    _.each(mixins, function(mixin, name){
      mixed = mixed._extend(mixin);
    }, this);

    return mixed;
  }

  _.each(["Model", "Collection", "View", "Router"], function(klass) {
    var extend = Backbone[klass].extend;

    Backbone[klass].extend = function(protoProps, classProps){
      var mixed = this;
      _.each(protoProps.mixins, function(mixin, name) {
        mixed = extend.call(mixed, mixin);
      });
      mixed = extend.call(mixed, protoProps, classProps);
      return mixed;
    }

  });

  return Backbone;

});