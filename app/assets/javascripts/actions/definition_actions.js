var DefinitionActions = {
  receiveAllDefinitions: function (definitions) {
    AppDispatcher.dispatch({
      actionType: DefinitionConstants.RECEIVED_ALL_DEFINITIONS,
      definitions: definitions
    });
  },
  receiveNewDefinition: function (definition) {
    AppDispatcher.dispatch({
      actionType: DefinitionConstants.NEW_DEFINITION,
      definition: definition
    });
  }
};
