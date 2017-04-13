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
        let status = document
            .querySelector('#select-status')
            .value;
        console.log(id);
        fetch(apiUrl + '/order/' + id, {
            method: "POST",
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Content-Type": "application/x-www-form-urlencoded",
                "x-access-token": custom.token
            },
            body: "status="+status
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
        this.setState({Order: json.Items});
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
            let i = 1;
            let totalPrice = 0;
            let itemNumber = 0;
            let delivererNumber = 0;
            for(var item of json[0].Items){
                let price = 0;
                itemNumber++;
                let id = "Item0";
                var str = '<td style="width:100px"><img class="img-item" src="http://193.70.40.193:3000/' + item.Photo.filePath  + '"/></td>' +
                '<td>' +
                '<ul>';
                for(var deliverer of item.deliverers){
                    if(deliverer.delivererDetail){
                        delivererNumber++;
                        price += parseInt(item.Mask.price);
                        str +=
                            '<li> Nom : ' + deliverer.delivererDetail.name + ' , ' + deliverer.delivererDetail.street + ' ' + deliverer.delivererDetail.ZC + ' ' + deliverer.delivererDetail.city + '</li><br/>' +
                            'Message : ' + deliverer.message + '<br/>';
                            totalPrice += parseInt(item.Mask.price);
                    }
                }
                            /*'<div className="progress progress-xs">' +
                            '<div className="progress-bar progress-bar-danger" style={{width: 55}}></div>' +
                            '</div>' + */
                str +=  '</ul>' +
                        '</td>' +
                        '<td>' +
                            price + "€"
                        '</td>'
                var tr = document.getElementById('Item0').appendChild(document.createElement('tr'));
                i++;
                tr.setAttribute("id", "Item"+i);
                tr.innerHTML = str;
                let shippingMethod = '<td>Mode de livraison  : ' + json[0].ShippingMethod.name + '</td>' +
                            '<td></td>' +
                            '<td> Prix : ' + json[0].ShippingMethod.price + '€ </td>';
            var tr = document.getElementById('Item0').appendChild(document.createElement('tr'));
            tr.innerHTML = totalPriceStr;
            }
        let totalPriceStr = '<td> Nombre d\'articles : ' + itemNumber + '</td>' +
                            '<td> Nombre de destinataires : ' + delivererNumber + '</td>' +
                            '<td> Prix total : ' + totalPrice + '€ </td>';
            var tr = document.getElementById('Item0').appendChild(document.createElement('tr'));
            tr.innerHTML = totalPriceStr;
            document.querySelector('#select-status').value = json[0].status;
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

    getOrder(){
        
    }

    render() {
        var orders = this.state.Data;
        if (orders) {
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

                            <div className="box">
            <div className="box-header with-border">
              <h3 className="box-title">Bordered Table</h3>
            </div>
            <div className="box-body" id="listOrder">
              <table className="table table-bordered">
                <tbody id="Item0"><tr>
                  <th>Items</th>
                  <th>Deliverers</th>
                  <th>Price</th>
                </tr>
               
              </tbody></table>
              <label htmlFor="select-status">Order status : </label>
              <select id="select-status">
                   <option value=""></option>
                   <option value="Pending">Pending</option>
                   <option value="Processing">Processing</option>
                   <option value="Shipping">Shipping</option>
                   <option value="Shipped">Shipped</option>
                   <option value="Received">Received</option>
              </select>
              <div className="control-group">
                    <div className="controls">
                        <button
                            onClick={this
                            .updateOrder
                            .bind(this, this.state.orderID)}
                            className="btn btn-success">Update Mask</button>
                    </div>
                </div>
            </div>
          </div>

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