#Backbone-Mixins

Extend your Backbone objects using mixins. It uses the normal Backbone extend method, 
it really just is a way to organize better the multi-inheritance of your objects.

Works with Collections, Models, Views and Routers.

    var orderableMixin = {
      ...
    }

    var col = Backbone.Collection.extend({
        mixins: {
          orderable: orderableMixin
        }
    });
    
The mixin are mixed in order, so if the same method is present in multiple mixins, the last will prevail. 
The current object is of course the last to be added to the mix.

Using a 'super' method like [this one](https://gist.github.com/1542120) allows chaining of mixins.

    var mixin1 = {
          initialize: function() {
            console.log(1);
            this._super('initialize', arguments);
          }
        },
        mixin2 = {
          initialize: function() {
            console.log(2);
            this._super('initialize', arguments);
          }
        };
        
    var view = Backbone.View.extend({
      mixins: {
        1: mixin1,
        2: mixin2
      },
      initialize: function() {
        console.log(3);
        this._super('initialize', arguments);
      }
    });
    
    new view(); 
    // logs: 3 2 1
    // Bubbling from current object to topmost mixin

**Note**: It's safe to call _super('initialize') from the first mixin as Backbone.View has an empty initialize
methods. But when trying to call an unexisting method, _super() throws an error.
    