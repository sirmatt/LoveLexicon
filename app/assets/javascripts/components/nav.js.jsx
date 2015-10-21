var Nav = React.createClass({
  getInitialState: function(){
    // replace with word store
    return {};
  },
  handleCreateClick: function(event){
    window.location.href = "/#/definition/new";
  },
  handleRandomWord: function(event){
    window.location.href = '/#/random';
  },
  render: function () {
    return (
      <span>
        <div onClick={this.handleCreateClick}>Create Word</div>
        <div onClick={this.handleRandomWord}>Random World</div>
      </span>
    );
  }
});
