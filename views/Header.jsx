var React = require('react');
var Link = require('react-router').Link;
var cookie = require('react-cookie');
var connect = require('react-redux').connect;
var Router = require('react-router');

var Layout = React.createClass({

    unset: function(){
        cookie.remove("Token");
        Router
                .browserHistory
                .push('/');
    },

    render: function () {
        var custom = this.props.custom;
        if(custom.token) {
            if(custom.token.length > 10){
                return (
                    <header className="main-header">
                        <a href="/" className="logo">
                            <span className="logo-mini">
                                <b>P</b>EXP</span>
                            <span className="logo-lg">
                                <b>Photo</b>Expresso</span>
                        </a>
                        < nav className="navbar navbar-static-top">
                            <a href="#" className="sidebar-toggle" data-toggle="offcanvas" role="button">
                                <span className="sr-only">Toggle navigation</span>
                            </a>
                            <div className="navbar-custom-menu">
                                <ul className="nav navbar-nav">
                                    <button className="btn btn-danger btn-flat btn-lg" style={{height: 50}} onClick={this.unset}>
                                        Logout
                                    </button>
                                </ul>
                            </div>
                        </nav>
                    </header>
                );
            }
        } else{
            return (
                    <header className="main-header">
                        <a href="/" className="logo">
                            <span className="logo-mini">
                                <b>P</b>EXP</span>
                            <span className="logo-lg">
                                <b>Photo</b>Expresso</span>
                        </a>
                        < nav className="navbar navbar-static-top">
                            <a href="#" className="sidebar-toggle" data-toggle="offcanvas" role="button">
                                <span className="sr-only">Toggle navigation</span>
                            </a>
                        </nav>
                    </header>
                );
        }
    }
});

var wrapper = connect(function (state) {
    return {custom: state};
});

module.exports = wrapper(Layout);