var React = require('react');
var connect = require('react-redux').connect;
require('fetch-everywhere');
var Modal = require('react-modal');
var Notification = require('react-notification').Notification;
const apiUrl = "http://193.70.40.193:3000/api";

class ListShippingMethods extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Data: []
        };
        this.setShippingState = this
            .setShippingState
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

    getShipping() {
        var self = this;
        var custom = this.props.custom;
        fetch(apiUrl + '/shipping', {
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
            self.setShippingState(json);
        }).catch((ex) => {
            console.log('parsing failed', ex);
        })
    }

    updateShipping(id) {
        var self = this;
        var custom = this.props.custom;
        let nom = document
            .querySelector('#name')
            .value;
        let prix = document
            .querySelector('#price')
            .value;
        let duration = document
            .querySelector('#duration')
            .value;
        fetch(apiUrl + '/shipping/' + id, {
            method: "POST",
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Content-Type": "application/x-www-form-urlencoded",
                "x-access-token": custom.token
            },
            body: "price=" + prix + "&name=" + nom + "&shippingDuration=" + duration
        }).then((response) => {
            return response.json()
        }).then((json) => {
            console.log(json);
            self.closeModal();
            self.toggleNotification();
            self.getShipping();
        }).catch((ex) => {
            console.log('parsing failed', ex)
        })
    }

    setShippingState(json) {
        this.setState({Data: json});
    }

    componentDidMount() {
        this.state = {
            modalIsOpen: false,
            isActive: false,
            shippingID: null
        };
        this.getShipping();
    }

    openModal(id) {
        document
            .querySelector('.main-sidebar')
            .style
            .visibility = "hidden";
        this.setState({modalIsOpen: true});
        var self = this;
        var custom = this.props.custom;
        this.setState({shippingID: id});
        fetch(apiUrl + '/shipping/' + id, {
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
            console.log(json)
            document
                .querySelector('#name')
                .value = json.name;
            document
                .querySelector('#price')
                .value = json.price;
            document
                .querySelector('#duration')
                .value = json.shippingDuration;
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
        var shipping = this.state.Data;
        if (shipping) {
            return (
                <div className="box">
                    <div className="box-header">
                        <h3 className="box-title">List of all masks
                        </h3>

                    </div>
                    <div className="box-body table-responsive no-padding">
                        <table className="table table-hover">
                            <tbody>
                                <tr>
                                    <th>ID</th>
                                    <th>Nom</th>
                                    <th>Prix</th>
                                    <th>Durée de transport</th>
                                    <th className="pull-right">Mise a jour</th>
                                </tr>
                                {this
                                    .state
                                    .Data
                                    .map((mask, index) => {
                                        return <tr key={index}>
                                            <td>{mask.id}</td>
                                            <td>{mask.name}</td>
                                            <td>{mask.price}</td>
                                            <td>{mask.shippingDuration} jours</td>
                                            <td className="pull-right">
                                                <button
                                                    className="btn btn-primary btn-flat"
                                                    onClick={this
                                                    .openModal
                                                    .bind(this, mask.id)}>Mise a jour
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

                        <h2 className="text-center">Update Mask</h2>
                        <form className="form-horizontal" action="javascript:void(0);">
                            <fieldset className="text-center">
                                <div className="control-group">
                                    <label className="control-label" htmlFor="name">Nom</label>
                                    <div className="controls">
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            placeholder="Nom"
                                            className="input-xlarge"/>
                                        <p className="help-block">Nouveau nom</p>
                                    </div>
                                </div>

                                <div className="control-group">
                                    <label className="control-label" htmlFor="price">Prix</label>
                                    <div className="controls">
                                        <input
                                            type="text"
                                            id="price"
                                            name="price"
                                            placeholder="Prix"
                                            className="input-xlarge"/>
                                        <p className="help-block">Nouveau prix (en Euro)</p>
                                    </div>
                                </div>
                                <div className="control-group">
                                    <label className="control-label" htmlFor="price">Durée de livraison</label>
                                    <div className="controls">
                                        <input
                                            type="text"
                                            id="duration"
                                            name="duration"
                                            placeholder="Durée de livraison"
                                            className="input-xlarge"/>
                                        <p className="help-block">Nouvelle durée de livraison </p>
                                    </div>
                                </div>
                                <div className="control-group">
                                    <div className="controls">
                                        <input type="hidden" id="maskID"/>
                                    </div>
                                </div>
                                <div className="control-group">
                                    <div className="controls">
                                        <button
                                            onClick={this
                                            .updateShipping
                                            .bind(this, this.state.shippingID)}
                                            className="btn btn-success">Update Shipping method</button>
                                    </div>
                                </div>
                            </fieldset>
                        </form>

                    </Modal>
                    <Notification
                        isActive={this.state.isActive}
                        message="Shipping method has been updated"
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

module.exports = wrapper(ListShippingMethods);