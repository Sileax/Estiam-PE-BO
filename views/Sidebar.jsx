var React = require('react');
var Link = require('react-router').Link;
var connect = require('react-redux').connect;

var Layout = React.createClass({
    _handleClick: function () {
        alert();
    },
    render: function () {
        var custom = this.props.custom;
        return (
            <html>
                <head>
                    <title>{custom.title}</title>
                    <link rel='stylesheet' href='/base.css'/>
                    <link
                        rel='stylesheet'
                        href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'/>
                </head>
                <body>
                    <div className="row">
                        <div className="col-md-1 fill">
                            <div id="sidebar" className="well fill sidebar-nav">
                                <h5 className="active">
                                    <i className="glyphicon glyphicon-home"></i>
                                    <small>
                                        <b>HOME</b>
                                    </small>
                                </h5>
                                <ul className="nav nav-pills nav-stacked">
                                    <li>
                                        <Link to="/home" activeClassName="active">Home</Link>
                                    </li>
                                </ul>
                                <h5>
                                    <i className="glyphicon glyphicon-user"></i>
                                    <small>
                                        <b>USERS</b>
                                    </small>
                                </h5>
                                <ul className="nav nav-pills nav-stacked">
                                    <li>
                                        <Link to="/users" activeClassName="active">List</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-11">
                            {this.props.children}
                        </div>
                    </div>
                    <script
                        dangerouslySetInnerHTML={{
                        __html: 'window.PROPS=' + JSON.stringify(custom)
                    }}/>
                    <script src='/bundle.js'/>
                </body>
            </html>
        );
    }
});

var wrapper = connect(function (state) {
    return {custom: state};
});

module.exports = wrapper(Layout);
