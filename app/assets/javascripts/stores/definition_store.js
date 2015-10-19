(function(root) {
  'use strict';

  var  _definitions = [];
  var CHANGE_EVENT = "CHANGE_EVENT";

  function resetDefinitions(definitions) {
    _definitions = definitions;
    DefinitionStore.changed();
  }

  function receiveNewDefinition(definition) {
    _definitions.push(definition);
    DefinitionStore.changed();
  }

  root.DefinitionStore = $.extend({}, EventEmitter.prototype, {
    all: function () {
      return _definitions.slice();
    },

    addChangeListener: function (callback) {
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
      this.removeListener(CHANGE_EVENT, callback);
    },

    changed: function () {
      this.emit(CHANGE_EVENT);
    },

    dispatcherId: AppDispatcher.register(function (action) {
      switch (action.actionType) {
        case DefinitionConstants.RECEIVED_ALL_DEFINITIONS:
          resetDefinitions(action.definitions);
          break;
        case DefinitionConstants.NEW_DEFINITION:
          receiveNewDefinition(action.definition);
          break;
      }
    }.bind(this))
  });
}(this));
