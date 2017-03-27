var React = require('react');
var Link = require('react-router').Link;
var connect = require('react-redux').connect;

var Layout = React.createClass({
    render: function () {
        var custom = this.props.custom;
        return (
            <aside className="main-sidebar">
                <section className="sidebar">
                    <ul className="sidebar-menu">
                        <li className="header">MAIN NAVIGATION</li>
                        <li className="active">
                            <a href="users">
                                <i className="fa fa-user"></i>
                                List users</a>
                        </li>
                        <li className="active">
                            <a href="messages">
                                <i className="fa fa-envelope"></i>
                                Messages</a>
                        </li>
                        <li className="treeview">
                            <a href="#">
                                <i className="fa fa-picture-o"></i>
                                <span>Masks</span>
                                <span className="pull-right-container">
                                    <i className="fa fa-angle-left pull-right"></i>
                                </span>
                            </a>
                            <ul className="treeview-menu">
                                <li>
                                    <a href="createMask">
                                        <i className="fa fa-circle-o"></i>
                                        Create masks</a>
                                </li>
                                <li>
                                    <a href="listMasks">
                                        <i className="fa fa-circle-o"></i>
                                        List masks</a>
                                </li>
                            </ul>
                        </li>
                        <li className="treeview">
                            <a href="#">
                                <i className="fa fa-truck"></i>
                                <span>Shipping methods</span>
                                <span className="pull-right-container">
                                    <i className="fa fa-angle-left pull-right"></i>
                                </span>
                            </a>
                            <ul className="treeview-menu">
                                <li>
                                    <a href="createShipping">
                                        <i className="fa fa-circle-o"></i>
                                        Create shipping method</a>
                                </li>
                                <li>
                                    <a href="listShipping">
                                        <i className="fa fa-circle-o"></i>
                                        List shipping methods</a>
                                </li>
                            </ul>
                        </li>
                        <li className="treeview">
                            <a href="#">
                                <i className="fa fa-arrows-h"></i>
                                <span>Dimensions</span>
                                <span className="pull-right-container">
                                    <i className="fa fa-angle-left pull-right"></i>
                                </span>
                            </a>
                            <ul className="treeview-menu">
                                <li>
                                    <a href="createDimension">
                                        <i className="fa fa-circle-o"></i>
                                        Create dimension</a>
                                </li>
                                <li>
                                    <a href="listDimensions">
                                        <i className="fa fa-circle-o"></i>
                                        List dimensions</a>
                                </li>
                            </ul>
                        </li>
                        <li className="active">
                            <a href="listOrders">
                                <i className="fa fa-archive"></i>
                                Orders</a>
                        </li>
                    </ul>
                </section>
            </aside>
        );
    }
});

module.exports = Layout;