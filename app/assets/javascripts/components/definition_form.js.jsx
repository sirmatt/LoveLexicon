var DefinitionForm = React.createClass({
  getInitialState: function(){
    return {
      word: '',
      word_def: ''
    };
  },
  handleWordChange: function(event){
    this.state.word = event.target.value;
  },
  handleDefinitionChange: function(event){
    this.state.word_def = event.target.value;
  },
  onSubmit: function(event){
    event.preventDefault();
    ApiUtil.createDefinition(this.state);
  },
  render: function () {
    return (
      <form>
        <div className="form-group">
          <label for="word">Word</label>
          <input className="form-control" placeholder="Enter Word" type="text" name="word" onChange={this.handleWordChange}/>
        </div>
        <br/>
        <textarea className="form-control" placeholder="Enter Definition" name="word_def" onChange={this.handleDefinitionChange}></textarea>
        <button className="btn btn-default" type="submit" onClick={this.onSubmit}>Submit</button>
      </form>
    );
  }
});
