var Home = React.createClass({
  getInitialState: function(){
    // replace with word store
    return { definitions: []};
  },
  componentDidMount: function(){
    ApiUtil.fetchAllDefinitions();
    DefinitionStore.addChangeListener(this.onDefinitionsChange);
  },
  onDefinitionsChange: function(e){
    var definitions = DefinitionStore.all();
    this.setState({definitions: definitions});
  },
  render: function () {
    return (
      <div>
        <div class="searchBar">
          <input type="text" placeholder="Search word"/>
        </div>
        { this.props.children }
        <ul>
          {
            this.state.definitions.map(function (definition){
                return <li className=''>{definition.word}:{definition.word_def}</li>
            }.bind(this))
          }
        </ul>
      </div>
    );
  }
});
