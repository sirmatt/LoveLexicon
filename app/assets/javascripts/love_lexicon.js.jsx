var Route = ReactRouter.Route;
var Router = ReactRouter.Router;
var IndexRoute = ReactRouter.IndexRoute;

var App = React.createClass({
  render: function(){
    return (
      <div>
        <header><h1>LoveLexicon</h1></header>
        {this.props.children}
      </div>
    );
  }
});

var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="definition/new" component={DefinitionForm}/>
  </Route>

);

$(function(){
  var root = document.getElementById('lexicon');
  var navContainer = document.getElementById('navContainer');
  React.render(<Router>{routes}</Router>, root);
  React.render(<Nav></Nav>, navContainer);

});
