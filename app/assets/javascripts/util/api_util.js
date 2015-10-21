// The whole purpose of the api_util is to populate the store with content from the server using ajax requests. The util will receive a callback from the ajax with a 'payload' from the server. This payload will be used to update the front end app.

ApiUtil = {
  createDefinition: function (definitionParams) {
    $.ajax({
      url: 'api/definitions',
      type: 'POST',
      data: { definition: definitionParams },
      dataType: 'json',
      success: function (definition) {
        DefinitionActions.receiveNewDefinition(definition);
        window.location.href = "/#/";
      }
    });
  },

  fetchAllDefinitions: function () {
    $.ajax({
      url: 'api/definitions',
      type: 'GET',
      dataType: 'json',
      success: function (definitions) {
        DefinitionActions.receiveAllDefinitions(definitions);
      }
    });
  },

  deleteDefinition: function(definitionId) {
    $.ajax({
      url: 'api/definitions',
      type: 'DELETE',
      success: function () {
        window.locaiton.href = "/";
      }
    });
  },

  logOut: function () {
    $.ajax({
      url: 'session',
      type: 'DELETE',
      success: function () {
        window.location.href = "/";
      }
    });
  }
};
