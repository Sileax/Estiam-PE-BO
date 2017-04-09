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
        fetch(apiUrl + '/contact', {
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
                .birthday
                .replace(/T00:00:00.000Z/, '');
            document
                .querySelector('#userId')
                .value = json.id;
        }).catch((ex) => {
            console.log('parsing failed', ex)
        })
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
        if (user) {
            return (
                <div className="box box-primary">
                    <div className="box-header with-border">
                        <h3 className="box-title">Messages</h3>
                    </div>
                    <div className="table-responsive mailbox-messages">
                        <table className="table table-hover table-striped">
                            <tbody>
                                <tr>
                                    <th>Expéditeur</th>
                                    <th>Sujet</th>
                                    <th>Message</th>
                                    <th>Lire</th>
                                </tr>
                                {this
                                    .state
                                    .Data
                                    .map((message, index) => {
                                        let email = message.email;
                                        let subject = message.subject;
                                        let messageText = message.message;
                                        if (messageText.length > 75) {
                                            messageText = messageText.substr(0, 75);
                                            messageText += "..."
                                        }
                                        return <tr key={index}>
                                            <td className="mailbox-name">
                                                {message.readed
                                                    ? <span>{email}</span>
                                                    : <b>
                                                        {email}
                                                    </b>}
                                            </td>
                                            <td className="mailbox-name">
                                                {message.readed
                                                    ? <span>{subject}</span>
                                                    : <b>
                                                        {subject}
                                                    </b>}
                                            </td>
                                            <td className="mailbox-subject">
                                                {message.readed
                                                    ? <span>{messageText}</span>
                                                    : <b>
                                                        {messageText}
                                                    </b>}
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-primary btn-flat"
                                                    onClick={this
                                                    .openModal
                                                    .bind(this, message.id)}>Read
                                                </button>
                                            </td>
                                        </tr>
                                    })}
                            </tbody>
                        </table>
                    </div>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        contentLabel="Example Modal">
                        <h2 ref="subtitle" className="text-center">Modify User</h2>
                        < form className="form-horizontal" action="javascript:void(0);">
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
                    </Modal >
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