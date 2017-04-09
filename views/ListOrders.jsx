var React = require('react');
var connect = require('react-redux').connect;
require('fetch-everywhere');
var Modal = require('react-modal');
var Notification = require('react-notification').Notification;
const apiUrl = "http://193.70.40.193:3000/api";

class ListOrders extends React.Component {

    constructor(props) {
        super(props);
        this.apiUrl = "http://193.70.40.193:3000/api";
        this.state = {
            Data: [],
            Order: []
        };
        this.setOrdersState = this
            .setOrdersState
            .bind(this);
        this.setOrderState = this
            .setOrderState
            .bind(this);
        this.openModal = this
            .openModal
            .bind(this);
        this.toggleNotification = this
            .toggleNotification
            .bind(this);
        this.closeModal = this
            .closeModal
            .bind(this);
    }

    getOrders() {
        var self = this;
        var custom = this.props.custom;
        fetch(apiUrl + '/order', {
            method: "GET",
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Content-Type": "application/x-www-form-urlencoded",
                "x-access-token": custom.token
            }
        }).then((response) => {
            return response.json()
        }).then((json) => {
            self.setOrdersState(json);
            console.log(json);
        }).catch((ex) => {
            console.log('parsing failed', ex);
        })
    }

    updateOrder(id) {
        var self = this;
        var custom = this.props.custom;
        let nom = document
            .querySelector('#name')
            .value;
        let prix = document
            .querySelector('#price')
            .value;
        let dimension = document
            .querySelector('#dimensions')
            .value;
        fetch(apiUrl + '/order/' + id, {
            method: "POST",
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Content-Type": "application/x-www-form-urlencoded",
                "x-access-token": custom.token
            },
            body: "price=" + prix + "&name=" + nom + "&DimensionId=" + dimension
        }).then((response) => {
            return response.json()
        }).then((json) => {
            self.closeModal();
            self.toggleNotification();
            self.getOrders();
        }).catch((ex) => {
            console.log('parsing failed', ex)
        })
    }

    setOrdersState(json) {
        this.setState({Data: json});
    }

    setOrderState(json) {
        this.setState({Order: json});
    }

    componentDidMount() {
        this.state = {
            modalIsOpen: false,
            isActive: false,
            orderID: null
        };
        this.getOrders();
    }

    openModal(id) {
        document
            .querySelector('.main-sidebar')
            .style
            .visibility = "hidden";
        this.setState({modalIsOpen: true});
        var self = this;
        var custom = this.props.custom;
        this.setState({orderID: id});
        fetch(apiUrl + '/order/' + id, {
            method: "GET",
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Content-Type": "application/x-www-form-urlencoded",
                "x-access-token": custom.token
            }
        }).then((response) => {
            return response.json()
        }).then((json) => {
            self.setOrderState(json);
            document
                .querySelector('#name')
                .value = json.name;
            document
                .querySelector('#price')
                .value = json.price;
        }).catch((ex) => {
            console.log('parsing failed', ex);
        });
    }

    toggleNotification() {
        this.setState({
            isActive: !this.state.isActive
        });
    }

    closeModal() {
        document
            .querySelector('.main-sidebar')
            .style
            .visibility = "visible";
        this.setState({modalIsOpen: false});
    }

    render() {
        var order = this.state.Data;
        if (order) {
            return (
                <div className="box">
                    <div className="box-header">
                        <h3 className="box-title">List of all orders
                        </h3>

                    </div>
                    <div className="box-body table-responsive no-padding">
                        <table className="table table-hover">
                            <tbody>
                                <tr>
                                    <th>ID</th>
                                    <th>Utilisateur</th>
                                    <th>Statut</th>
                                    <th>Prix HT</th>
                                    <th>Prix TTC</th>
                                    <th>Adresse Livraison</th>
                                    <th>Code Postal</th>
                                    <th>Ville</th>
                                    <th className="pull-right">Mise a jour</th>
                                </tr>
                                {this
                                    .state
                                    .Data
                                    .map((order, index) => {
                                        return <tr key={index}>
                                            <td>{order.id}</td>
                                            <td>{order.User.pseudo}</td>
                                            <td>{order.status}</td>
                                            <td>{order.totalPriceHT} €</td>
                                            <td>{order.totalPriceTTC} €</td>
                                            <td>{order.Address.street} </td>
                                            <td> {order.Address.ZC} </td>
                                            <td> {order.Address.city}</td>
                                            <td className="pull-right">
                                                <button
                                                    className="btn btn-primary btn-flat"
                                                    onClick={this
                                                    .openModal
                                                    .bind(this, order.id)}>Update order
                                                </button>
                                            </td>
                                        </tr>;
                                    })}

                            </tbody>
                        </table>
                        <Modal
                            isOpen={this.state.modalIsOpen}
                            onRequestClose={this.closeModal}
                            contentLabel="Example Modal">

                        

                        </Modal>
                        <Notification
                            isActive={this.state.isActive}
                            message="Order has been updated"
                            action="Dismiss"
                            onDismiss={this.toggleNotification}
                            onClick={() => this.setState({isActive: false})}/>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="divLoading">Loading...</div>
            );
        }
    }
};
var wrapper = connect(function (state) {
    return {custom: state};
});

module.exports = wrapper(ListOrders);