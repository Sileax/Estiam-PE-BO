var router = require('express').Router();
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var ReactRouter = require('react-router');
var Redux = require('redux');
var Provider = require('react-redux').Provider;
var cookie = require('react-cookie');

function reducer(state) { return state; }

router.get('*', function(request, response) {
    const token = request.cookies.Token;
    var initialState = { title: 'Universal React', token: token };
    var store = Redux.createStore(reducer, initialState);

    ReactRouter.match({
        routes: require('./routes.jsx'),
        location: request.url
    }, function(error, redirectLocation, renderProps) {
        if (renderProps) {
            const unplug = cookie.plugToRequest(request, response);
            var html = ReactDOMServer.renderToString(
                <Provider store={store}>
                    <ReactRouter.RouterContext {...renderProps} />
                </Provider>
            );
            response.send(html);
        } else {
            response.status(404).send('Not Found');
        }
    });
});

module.exports = router;
