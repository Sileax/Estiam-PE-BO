var React = require('react');
var connect = require('react-redux').connect;
require('fetch-everywhere');
var Modal = require('react-modal');
var Notification = require('react-notification').Notification;
const apiUrl = "http://193.70.40.193:3000/api";

var Users = React.createClass({

    getMessages: function () {
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

    answer(id) {
        var self = this;
        let message = document.querySelector('#answer').value;
        let deliverer = document.querySelector('#deliverer').value;
        let subject = document.querySelector('#subject').value;
        var custom = this.props.custom;
        fetch(apiUrl + '/contact/answer', {
            method: "PUT",
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Content-Type": "application/x-www-form-urlencoded",
                "x-access-token": custom.token
            },
            body: "email="+ deliverer +"&message=" + message + "&subject=" + subject
        }).then((response) => {
            return response.json()
        }).then((json) => {
            self.closeModal();
            self.toggleNotification();
        }).catch((ex) => {
            console.log('parsing failed', ex)
        })
    },

    deleteMessage(id) {
        var self = this;
        var custom = this.props.custom;
        fetch(apiUrl + '/contact/' + id, {
            method: "DELETE",
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Content-Type": "application/x-www-form-urlencoded",
                "x-access-token": custom.token
            },
        }).then((response) => {
            return response.json()
        }).then((json) => {
            self.toggleNotification();
        }).catch((ex) => {
            console.log('parsing failed', ex)
        })

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
            messageId: null
        };
        this.getMessages();
    },
    openModal(id) {
        document
            .querySelector('.main-sidebar')
            .style
            .visibility = "hidden";
        this.setState({modalIsOpen: true});
        var self = this;
        var custom = this.props.custom;
        this.setState({messageId: id});
        console.log(id);
        fetch(apiUrl + '/contact/' + id, {
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
            .querySelector('#deliverer')
            .value = json.email;
            document
            .querySelector('#subject')
            .value = json.subject;
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
        document
            .querySelector('.main-sidebar')
            .style
            .visibility = "visible";
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
                                    <th>Delete</th>
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
                                                <span>{email}</span>
                                            </td>
                                            <td className="mailbox-name">
                                                <span>{subject}</span>
                                            </td>
                                            <td className="mailbox-subject">
                                                <span>{messageText}</span>
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-primary btn-flat"
                                                    onClick={this
                                                    .openModal
                                                    .bind(this, message.id)}>Read
                                                </button>
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-primary btn-flat"
                                                    onClick={this
                                                    .deleteMessage
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
                        <h2 ref="subtitle" className="text-center">Answer</h2>
                        < form className="form-horizontal" action="javascript:void(0);">
                            <fieldset className="text-center">
                            <div className="control-group">
                                    <label className="control-label" htmlFor="price">Destinataire</label>
                                    <div className="controls">
                                        <input
                                            type="text"
                                            id="deliverer"
                                            name="deliverer"
                                            placeholder="Largeur"
                                            className="input-xlarge"/>
                                    </div>
                                </div>
                                <div className="control-group">
                                    <label className="control-label" htmlFor="price">Sujet</label>
                                    <div className="controls">
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            placeholder="Subject"
                                            className="input-xlarge"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Reponse</label>
                                    <textarea id="answer" className="form-control" rows="10" placeholder="Reponse..."></textarea>
                                </div>
                                <div className="control-group">
                                    <div className="controls">
                                        <button
                                            onClick={this
                                            .answer
                                            .bind(this, this.state.messageId)}
                                            className="btn btn-success">Update user</button>
                                    </div>
                                </div>
                            </fieldset>
                        </form>
                    </Modal >
                    <Notification
                        isActive={this.state.isActive}
                        message="Done"
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