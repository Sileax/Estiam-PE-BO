var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var browserHistory = ReactRouter.browserHistory;

module.exports = (
    <Router history={browserHistory}>
        <Route path='/' component={require('../views/Sidebar.jsx')}>
            <IndexRoute component={require('../views/Login.jsx')} />
            <Route path='index' component={require('../views/Index.jsx')} />
            <Route path='about' component={require('../views/About.jsx')} />
            <Route path='users' component={require('../views/Users.jsx')} />
            <Route path='messages' component={require('../views/Messages.jsx')} />
            <Route path='listMasks' component={require('../views/ListMasks.jsx')} />
            <Route path='createMask' component={require('../views/CreateMask.jsx')} />
            <Route path='listShipping' component={require('../views/ListShippingMethods.jsx')} />
            <Route path='createShipping' component={require('../views/CreateShippingMethod.jsx')} />
            <Route path='listDimensions' component={require('../views/ListDimensions.jsx')} />
            <Route path='createDimension' component={require('../views/CreateDimension.jsx')} />
            <Route path='listOrders' component={require('../views/ListOrders.jsx')} />
        </Route>
    </Router>
);
