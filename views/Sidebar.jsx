var React = require('react');
var Link = require('react-router').Link;
var connect = require('react-redux').connect;
var cookie = require('react-cookie');
var Header = require('./Header.jsx');
var Sidebar = require('./Sidebar2.jsx');
var LoginPage = require('./Login.jsx');

var Layout = React.createClass({
    _handleClick: function () {
        alert();
    },
    render: function () {
        var custom = this.props.custom;
        console.log(custom);
        return (
            <html>
                <head>
                    <title>{custom.title}</title>
                    <link rel="stylesheet" href="base.css"/>
                    <link rel="stylesheet" href="AdminLTE/bootstrap/css/bootstrap.min.css"/>
                    <link
                        rel="stylesheet"
                        href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css"/>
                    <link rel="stylesheet" href="AdminLTE/dist/css/AdminLTE.min.css"/>
                    <link rel="stylesheet" href="AdminLTE/dist/css/skins/_all-skins.min.css"/>
                    <link rel="stylesheet" href="AdminLTE/plugins/iCheck/flat/blue.css"/>
                    <link rel="stylesheet" href="AdminLTE/plugins/morris/morris.css"/>
                    <link
                        rel="stylesheet"
                        href="AdminLTE/plugins/jvectormap/jquery-jvectormap-1.2.2.css"/>
                    <link rel="stylesheet" href="AdminLTE/plugins/datepicker/datepicker3.css"/>
                    <link
                        rel="stylesheet"
                        href="AdminLTE/plugins/daterangepicker/daterangepicker.css"/>
                    <link
                        rel="stylesheet"
                        href="AdminLTE/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css"/>
                    <link
                        rel="stylesheet"
                        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css"/>
                </head>
                <body className="skin-blue">
                    <Header/>
                    <Sidebar/>
                    <div className="content-wrapper">
                        {this.props.custom.token ? (this.props.custom.token.length > 10 ? (cookie.load("Token") ? this.props.children : <LoginPage/>) : <LoginPage/>) : <LoginPage/>}
                    </div>
                    <script
                        dangerouslySetInnerHTML={{
                        __html: 'window.PROPS=' + JSON.stringify(custom)
                    }}/>
                    <script src="AdminLTE/plugins/jQuery/jquery-2.2.3.min.js"></script>
                    <script src="https://code.jquery.com/ui/1.11.4/jquery-ui.min.js"></script>
                    <script src="AdminLTE/bootstrap/js/bootstrap.min.js"></script>
                    <script
                        src="https://cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js"></script>
                    <script src="AdminLTE/plugins/morris/morris.min.js"></script>
                    <script src="AdminLTE/plugins/sparkline/jquery.sparkline.min.js"></script>
                    <script src="AdminLTE/plugins/jvectormap/jquery-jvectormap-1.2.2.min.js"></script>
                    <script src="AdminLTE/plugins/jvectormap/jquery-jvectormap-world-mill-en.js"></script>
                    <script src="AdminLTE/plugins/knob/jquery.knob.js"></script>
                    <script
                        src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.11.2/moment.min.js"></script>
                    <script src="AdminLTE/plugins/daterangepicker/daterangepicker.js"></script>
                    <script src="AdminLTE/plugins/datepicker/bootstrap-datepicker.js"></script>
                    <script src="AdminLTE/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js"></script>
                    <script src="AdminLTE/plugins/slimScroll/jquery.slimscroll.min.js"></script>
                    <script src="AdminLTE/plugins/fastclick/fastclick.js"></script>
                    <script src="AdminLTE/dist/js/app.min.js"></script>
                    <script src='bundle.js'/>
                </body>
            </html>
        );
    }
});

var wrapper = connect(function (state) {
    return {custom: state};
});

module.exports = wrapper(Layout);
