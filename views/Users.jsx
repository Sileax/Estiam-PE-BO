var React = require('react');
var connect = require('react-redux').connect;
require('fetch-everywhere');
var Modal = require('react-modal');
var Notification = require('react-notification').Notification;
const apiUrl = "http://localhost:3000/api";

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

    /*getAddresses: function (id) {
        var self = this;
        var custom = this.props.custom;
        fetch(apiUrl + '/address/' + id, {
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
    },*/

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
            userId: null
        };
        this.getUsers();
    },
    openModal(id) {
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
            console.log(json);
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
        }).catch((ex) => {
            console.log('parsing failed', ex)
        });
    },

    toggleNotification() {
        this.setState({
            isActive: !this.state.isActive
        })
    },

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        this.refs.subtitle.style.color = '#f00';

    },

    closeModal() {
        this.setState({modalIsOpen: false});
    },
    render: function () {
        var user = this.state.Data;
        console.log(user);
        if (user) {
            return (
                <div>
                    <div className="row header-row margin-bottom flex">
                        <div className="col-md-2 text-center vertical-align">
                            <span className="header-title">Pseudo</span>
                        </div>
                        <div className="col-md-2 text-center vertical-align">
                            <span className="header-title">Email</span>
                        </div>
                        <div className="col-md-1 text-center vertical-align">
                            <span className="header-title">Age</span>
                        </div>
                        <div className="col-md-2 text-center vertical-align">
                            <span className="header-title">Nom</span>
                        </div>
                        <div className="col-md-2 text-center vertical-align">
                            <span className="header-title">Prenom</span>
                        </div>
                        <div className="col-md-2 text-center vertical-align">
                            <span className="header-title">Mise a jour</span>
                        </div>
                    </div>
                    {this
                        .state
                        .Data
                        .map((user, index) => {
                            return <div key={index} className="row margin-bottom flex">
                                <div className="col-md-2 text-center vertical-align">
                                    <span>{user.pseudo}</span>
                                </div>
                                <div className="col-md-2 text-center vertical-align">
                                    <span>{user.email}</span>
                                </div>
                                <div className="col-md-1 text-center vertical-align">
                                    <span>22</span>
                                </div>
                                <div className="col-md-2 text-center vertical-align">
                                    <span>{user.nom}</span>
                                </div>
                                <div className="col-md-2 text-center vertical-align">
                                    <span>{user.prenom}</span>
                                </div>
                                <div className="col-md-2 text-center vertical-align">
                                    <button
                                        className="btn btn-success"
                                        onClick={this
                                        .openModal
                                        .bind(this, user.id)}>Update User</button>
                                </div>
                            </div>;
                        })}
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        contentLabel="Example Modal">

                        <h2 ref="subtitle" className="text-center">Modify User</h2>
                        <form className="form-horizontal" action="javascript:void(0);">
                            <fieldset className="text-center">
                                <div className="control-group">
                                    <label className="control-label" htmlFor="pseudo">Pseudo</label>
                                    <div className="controls">
                                        <input
                                            type="text"
                                            id="pseudo"
                                            name="pseudo"
                                            placeholder=""
                                            className="input-xlarge"/>
                                        <p className="help-block">Nouveau pseudo</p>
                                    </div>
                                </div>

                                <div className="control-group">
                                    <label className="control-label" htmlFor="email">E-mail</label>
                                    <div className="controls">
                                        <input
                                            type="text"
                                            id="email"
                                            name="email"
                                            placeholder=""
                                            className="input-xlarge"/>
                                        <p className="help-block">Nouvel email</p>
                                    </div>
                                </div>

                                <div className="control-group">
                                    <label className="control-label" htmlFor="birthday">Date de Naissance</label>
                                    <div className="controls">
                                        <input
                                            type="text"
                                            id="birthday"
                                            name="birthday"
                                            placeholder=""
                                            className="input-xlarge"/>
                                        <p className="help-block">Modifier date de naissance</p>
                                    </div>
                                </div>

                                <div className="control-group">
                                    <label className="control-label" htmlFor="firstname">Prenom</label>
                                    <div className="controls">
                                        <input
                                            type="text"
                                            id="firstname"
                                            name="firstname"
                                            placeholder=""
                                            className="input-xlarge"/>
                                        <p className="help-block">Modifier Prenom</p>
                                    </div>
                                </div>

                                <div className="control-group">
                                    <label className="control-label" htmlFor="lastname">Nom</label>
                                    <div className="controls">
                                        <input
                                            type="text"
                                            id="lastname"
                                            name="lastname"
                                            placeholder=""
                                            className="input-xlarge"/>
                                        <p className="help-block">Modifier Prenom</p>
                                    </div>
                                </div>
                                <div className="control-group">
                                    <div className="controls">
                                        <input type="hidden" id="userId"/>
                                    </div>
                                </div>
                                <div className="control-group">
                                    <div className="controls">
                                        <button
                                            onClick={this
                                            .updateUser
                                            .bind(this, this.state.userId)}
                                            className="btn btn-success">Update user</button>
                                    </div>
                                </div>
                            </fieldset>
                        </form>
                        <h2 ref="subtitle" className="text-center">Modify user address</h2>
                        <form className="form-horizontal" action="javascript:void(0);">
                            <fieldset className="text-center">
                                <div className="control-group">
                                    <label className="control-label" htmlFor="pseudo">Type d'adresse</label>
                                    <div className="controls">
                                        <select name="addressType" id="addressType">
                                            <option value="Billing">Facturation</option>
                                            <option value="Shipping">Livraison</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="control-group">
                                    <label className="control-label" htmlFor="address">Adresse</label>
                                    <div className="controls">
                                        <input
                                            type="text"
                                            id="address"
                                            name="address"
                                            placeholder="Addresse"
                                            className="input-xlarge"/>
                                        <p className="help-block">Modifier addresse</p>
                                    </div>
                                </div>

                                <div className="control-group">
                                    <label className="control-label" htmlFor="city">Ville</label>
                                    <div className="controls">
                                        <input
                                            type="text"
                                            id="city"
                                            name="city"
                                            placeholder="Ville"
                                            className="input-xlarge"/>
                                        <p className="help-block">Modifier la ville</p>
                                    </div>
                                </div>

                                <div className="control-group">
                                    <label className="control-label" htmlFor="firstname">Code postal</label>
                                    <div className="controls">
                                        <input
                                            type="text"
                                            id="ZC"
                                            name="ZC"
                                            placeholder="Code postal"
                                            className="input-xlarge"/>
                                        <p className="help-block">Modifier code postal</p>
                                    </div>
                                </div>

                                <div className="control-group">
                                    <div className="controls">
                                        <button
                                            onClick={this
                                            .updateAddress
                                            .bind(this, this.state.userId)}
                                            className="btn btn-success">Update Address</button>
                                    </div>
                                </div>
                            </fieldset>
                        </form>

                    </Modal>
                    <Notification
                        isActive={this.state.isActive}
                        message="User has been updated"
                        action="Dismiss"
                        onDismiss={this.toggleNotification}
                        onClick={() => this.setState({isActive: false})}/>
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