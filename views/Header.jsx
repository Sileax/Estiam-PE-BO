var React = require('react');
var Link = require('react-router').Link;
var connect = require('react-redux').connect;

var Layout = React.createClass({
    render: function () {
        var custom = this.props.custom;
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
});

module.exports = Layout;