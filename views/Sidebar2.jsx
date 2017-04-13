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
                        <li className="header">Naivgation</li>
                        <li className="active">
                            <a href="users">
                                <i className="fa fa-user"></i>
                                Liste des utilisateurs</a>
                        </li>
                        <li className="active">
                            <a href="messages">
                                <i className="fa fa-envelope"></i>
                                Messages</a>
                        </li>
                        <li className="treeview">
                            <a href="#">
                                <i className="fa fa-picture-o"></i>
                                <span>Masques</span>
                                <span className="pull-right-container">
                                    <i className="fa fa-angle-left pull-right"></i>
                                </span>
                            </a>
                            <ul className="treeview-menu">
                                <li>
                                    <a href="createMask">
                                        <i className="fa fa-circle-o"></i>
                                        Creer masque</a>
                                </li>
                                <li>
                                    <a href="listMasks">
                                        <i className="fa fa-circle-o"></i>
                                        Liste des masques</a>
                                </li>
                            </ul>
                        </li>
                        <li className="treeview">
                            <a href="#">
                                <i className="fa fa-truck"></i>
                                <span>Methodes de livraisons</span>
                                <span className="pull-right-container">
                                    <i className="fa fa-angle-left pull-right"></i>
                                </span>
                            </a>
                            <ul className="treeview-menu">
                                <li>
                                    <a href="createShipping">
                                        <i className="fa fa-circle-o"></i>
                                        Creer methode de livraison</a>
                                </li>
                                <li>
                                    <a href="listShipping">
                                        <i className="fa fa-circle-o"></i>
                                        Liste des methodes de livraison</a>
                                </li>
                            </ul>
                        </li>
                        <li className="treeview">
                            <a href="#">
                                <i className="fa fa-arrows-h"></i>
                                <span>Formats</span>
                                <span className="pull-right-container">
                                    <i className="fa fa-angle-left pull-right"></i>
                                </span>
                            </a>
                            <ul className="treeview-menu">
                                <li>
                                    <a href="createDimension">
                                        <i className="fa fa-circle-o"></i>
                                        Creer format</a>
                                </li>
                                <li>
                                    <a href="listDimensions">
                                        <i className="fa fa-circle-o"></i>
                                        Liste des formats</a>
                                </li>
                            </ul>
                        </li>
                        <li className="active">
                            <a href="listOrders">
                                <i className="fa fa-archive"></i>
                                Liste des commandes</a>
                        </li>
                    </ul>
                </section>
            </aside>
        );
    }
});

module.exports = Layout;