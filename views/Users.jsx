var React = require('react');
var connect = require('react-redux').connect;
require('fetch-everywhere');
var Modal = require('react-modal');
var Notification = require('react-notification').Notification;
const apiUrl = "http://193.70.40.193:3000/api";

var Users = React.createClass({

    getUsers: function () {
        var self = this;
        var custom = this.props.custom;
        fetch(apiUrl + '/users', {
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
            console.log('parsed json', json)
            self.setUsersState(json)
        }).catch((ex) => {
            console.log('parsing failed', ex)
        })
    },

    updateUser(id) {
        var self = this;
        var custom = this.props.custom;
        let pseudo = document
            .querySelector('#pseudo')
            .value;
        let prenom = document
            .querySelector('#firstname')
            .value;
        let nom = document
            .querySelector('#lastname')
            .value;
        let email = document
            .querySelector('#email')
            .value;
        let birthday = document
            .querySelector('#birthday')
            .value;
        fetch(apiUrl + '/users/' + id, {
            method: "POST",
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Content-Type": "application/x-www-form-urlencoded",
                "x-access-token": custom.token
            },
            body: "pseudo=" + pseudo + "&email=" + email + "&prenom=" + prenom + "&nom=" + nom + "&birthday=" + birthday + "&oldPassword="
        }).then((response) => {
            return response.json()
        }).then((json) => {
            self.closeModal();
            self.toggleNotification();
        }).catch((ex) => {
            console.log('parsing failed', ex)
        })
    },

    updateAddress(id) {
        var self = this;
        var custom = this.props.custom;
        let type = document
            .querySelector('#addressType')
            .value;
        let street = document
            .querySelector('#address')
            .value;
        let city = document
            .querySelector('#city')
            .value;
        let ZC = document
            .querySelector('#ZC')
            .value;
        fetch(apiUrl + '/address/' + id, {
            method: "POST",
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Content-Type": "application/x-www-form-urlencoded",
                "x-access-token": custom.token
            },
            body: "type=" + type + "&street=" + street + "&city=" + city + "&ZC=" + ZC
        }).then((response) => {
            return response.json()
        }).then((json) => {
            self.closeModal();
            self.toggleNotification();
        }).catch((ex) => {
            console.log('parsing failed', ex)
        })
    },

    setUsersState: function (json) {
        this.setState({Data: json});
        console.log(json);
    },

    getInitialState: function () {
        return {Data: []};
    },
    // React exposes this function, which you can think of as the constructor of
    // your component. Call for your data here.
    componentDidMount: function () {
        this.state = {
            modalIsOpen: false,
            isActive: false,
            userId: null,
            addressId: null
        };
        this.getUsers();
    },
    openModal(id) {
        document
            .querySelector('.main-sidebar')
            .style
            .visibility = "hidden";
        this.setState({modalIsOpen: true});
        var self = this;
        var custom = this.props.custom;
        this.setState({userId: id});
        console.log(id);
        fetch(apiUrl + '/users/' + id, {
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
            document
                .querySelector('#pseudo')
                .value = json.pseudo;
            document
                .querySelector('#firstname')
                .value = json.prenom;
            document
                .querySelector('#lastname')
                .value = json.nom;
            document
                .querySelector('#email')
                .value = json.email;
            document
                .querySelector('#birthday')
                .value = json
                .dateNaissance
                .replace(/T00:00:00.000Z/, '');
            document
                .querySelector('#userId')
                .value = json.id;
            if(json.Addresses[0]){
                document
                .querySelector('#addressType')
                .value = json.Addresses[0].type;
            document
                .querySelector('#address')
                .value = json.Addresses[0].street;
            document
                .querySelector('#city')
                .value = json.Addresses[0].city;
            document
                .querySelector('#ZC')
                .value = json.Addresses[0].ZC;
            this.setState({addressId: json.Addresses[0].id});
            }
        }).catch((ex) => {
            console.log('parsing failed', ex)
        });
    },

    toggleNotification() {
        this.setState({
            isActive: !this.state.isActive
        })
    },

    closeModal() {
        document
            .querySelector('.main-sidebar')
            .style
            .visibility = "visible";
        this.setState({modalIsOpen: false});
    },
    render: function () {
        var user = this.state.Data;
        console.log(user);
        if (user) {
            return (
                <div className="box">
                    <div className="box-header">
                        <h3 className="box-title">List of all registered users
                        </h3>

                    </div>
                    <div className="box-body table-responsive no-padding">
                        <table className="table table-hover">
                            <tbody>
                                <tr>
                                    <th>Pseudo</th>
                                    <th>Email</th>
                                    <th>Nom</th>
                                    <th>Prenom</th>
                                    <th>Mise a jour</th>
                                </tr>
                                {this
                                    .state
                                    .Data
                                    .map((user, index) => {
                                        return <tr key={index}>
                                            <td>{user.pseudo}</td>
                                            <td>{user.email}</td>
                                            <td>{user.nom}</td>
                                            <td>{user.prenom}</td>
                                            <td>
                                                <button
                                                    className="btn btn-primary btn-flat"
                                                    onClick={this
                                                    .openModal
                                                    .bind(this, user.userId)}>Mise a jour
                                                </button>
                                            </td>
                                        </tr>;
                                    })}

                            </tbody>
                        </table>

                        <Modal
                            isOpen={this.state.modalIsOpen}
                            onAfterOpen={this.afterOpenModal}
                            onRequestClose={this.closeModal}
                            contentLabel="Example Modal">

                            <div className="box box-primary">
                                <div className="box-header with-border">
                                    <h3 className="box-title">Modify user informations</h3>
                                </div>
                                <form className="form-horizontal" action="javascript:void(0);">
                                    <div className="box-body">
                                        <div className="form-group">
                                            <label htmlFor="pseudo">Pseudo</label>
                                            <input className="form-control" id="pseudo" placeholder="Pseudo" type="text"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input className="form-control" id="email" placeholder="Email" type="email"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="firstname">Prenom</label>
                                            <input
                                                className="form-control"
                                                id="firstname"
                                                placeholder="Prenom"
                                                type="text"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="lastname">Nom</label>
                                            <input className="form-control" id="lastname" placeholder="Nom" type="text"/>
                                        </div>
                                        <div className="control-group">
                                            <div className="controls">
                                                <input type="hidden" id="userId"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="box-footer">
                                        <button onClick={this
                                            .updateUser
                                            .bind(this, this.state.userId)}
                                            className="btn btn-primary">Mise a jour</button>
                                    </div>
                                </form>
                            </div>
                            <div className="box box-primary">
                                <div className="box-header with-border">
                                    <h3 className="box-title">Modify user address</h3>
                                </div>
                                <form className="form-horizontal" action="javascript:void(0);">
                                    <div className="box-body">
                                        <div className="form-group">
                                            <label htmlFor="addressType">Type d'adresse</label>
                                            <select className="form-control" id="addressType">
                                                <option value="Billing">Facturation</option>
                                                <option value="Shipping">Livraison</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="address">Adresse</label>
                                            <input
                                                className="form-control"
                                                id="address"
                                                placeholder="Addresse"
                                                type="text"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="city">Ville</label>
                                            <input className="form-control" id="city" placeholder="Ville" type="text"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="ZC">Code postal</label>
                                            <input className="form-control" id="ZC" placeholder="Code postal" type="text"/>
                                        </div>
                                    </div>
                                    <div className="box-footer">
                                        <button onClick={this
                                            .updateAddress
                                            .bind(this, this.state.addressId)}
                                            className="btn btn-primary">Submit</button>
                                    </div>
                                </form>
                            </div>

                        </Modal>
                        <Notification
                            isActive={this.state.isActive}
                            message="User has been updated"
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
});

var wrapper = connect(function (state) {
    return {custom: state};
});

module.exports = wrapper(Users);