var React = require('react');
var connect = require('react-redux').connect;
require('fetch-everywhere');
var Modal = require('react-modal');
var Notification = require('react-notification').Notification;
const apiUrl = "http://193.70.40.193:3000/api";

class ListDimensions extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Data: []
        };
        this.setDimensionsState = this
            .setDimensionsState
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

    getDimensions() {
        var self = this;
        var custom = this.props.custom;
        fetch(apiUrl + '/dimension', {
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
            self.setDimensionsState(json);
        }).catch((ex) => {
            console.log('parsing failed', ex);
        })
    }

    deleteDimension(id) {
        var self = this;
        var custom = this.props.custom;
        fetch(apiUrl + '/dimension/' + id, {
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
            self.getDimensions();
        }).catch((ex) => {
            console.log('parsing failed', ex)
        })
    }

    updateDimension(id) {
        var self = this;
        var custom = this.props.custom;
        let width = document
            .querySelector('#width')
            .value;
        let height = document
            .querySelector('#height')
            .value;
        let name = document
            .querySelector('#name')
            .value;
        fetch(apiUrl + '/dimension/' + id, {
            method: "POST",
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Content-Type": "application/x-www-form-urlencoded",
                "x-access-token": custom.token
            },
            body: "width=" + width + "&height=" + height + "&name=" + name
        }).then((response) => {
            return response.json()
        }).then((json) => {
            self.closeModal();
            self.toggleNotification();
            self.getDimensions();
        }).catch((ex) => {
            console.log('parsing failed', ex)
        })
    }

    setDimensionsState(json) {
        this.setState({Data: json});
    }

    componentDidMount() {
        this.state = {
            modalIsOpen: false,
            isActive: false,
            shippingID: null
        };
        this.getDimensions();
    }

    openModal(id) {
        document
            .querySelector('.main-sidebar')
            .style
            .visibility = "hidden";
        this.setState({modalIsOpen: true});
        var self = this;
        var custom = this.props.custom;
        this.setState({dimensionID: id});
        fetch(apiUrl + '/dimension/' + id, {
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
                .querySelector('#width')
                .value = json.width;
            document
                .querySelector('#height')
                .value = json.height;
            document
                .querySelector('#name')
                .value = json.name;
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
                        <h3 className="box-title">Liste de tous les formats
                        </h3>

                    </div>
                    <div className="box-body table-responsive no-padding">
                        <table className="table table-hover">
                            <tbody>
                                <tr>
                                    <th>ID</th>
                                    <th>Hauteur</th>
                                    <th>Largeur</th>
                                    <th>Nom</th>
                                    <th className="pull-right">Mise a jour</th>
                                    <th className="pull-right">Supprimer</th>
                                </tr>
                                {this
                                    .state
                                    .Data
                                    .map((dimension, index) => {
                                        return <tr key={index}>
                                            <td>{dimension.id}</td>
                                            <td>{dimension.height}px</td>
                                            <td>{dimension.width}px</td>
                                            <td>{dimension.name}</td>
                                            <td className="pull-right">
                                                <button
                                                    className="btn btn-primary btn-flat"
                                                    onClick={this
                                                    .openModal
                                                    .bind(this, dimension.id)}>Mise a jour
                                                </button>
                                            </td>
                                            <td className="pull-right">
                                                <button
                                                    className="btn btn-danger btn-flat"
                                                    onClick={this
                                                    .deleteDimension
                                                    .bind(this, dimension.id)}>Supprimer
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

                        <h2 className="text-center">Update Dimension</h2>
                        <form className="form-horizontal" action="javascript:void(0);">
                            <fieldset className="text-center">
                                <div className="control-group">
                                    <label className="control-label" htmlFor="name">Hauteur</label>
                                    <div className="controls">
                                        <input
                                            type="text"
                                            id="height"
                                            name="height"
                                            placeholder="Hauteur"
                                            className="input-xlarge"/>
                                        <p className="help-block">Nouvelle hauteur</p>
                                    </div>
                                </div>

                                <div className="control-group">
                                    <label className="control-label" htmlFor="price">Largeur</label>
                                    <div className="controls">
                                        <input
                                            type="text"
                                            id="width"
                                            name="width"
                                            placeholder="Largeur"
                                            className="input-xlarge"/>
                                        <p className="help-block">Nouvelle largeur</p>
                                    </div>
                                </div>
                                <div className="control-group">
                                    <label className="control-label" htmlFor="price">Nom</label>
                                    <div className="controls">
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            placeholder="Nom"
                                            className="input-xlarge"/>
                                        <p className="help-block">Nouveau nom </p>
                                    </div>
                                </div>
                                <div className="control-group">
                                    <div className="controls">
                                        <input type="hidden" id="dimensionID"/>
                                    </div>
                                </div>
                                <div className="control-group">
                                    <div className="controls">
                                        <button
                                            onClick={this
                                            .updateDimension
                                            .bind(this, this.state.dimensionID)}
                                            className="btn btn-primary btn-flat">Mise a jour</button>
                                    </div>
                                </div>
                                
                            </fieldset>
                        </form>

                    </Modal>
                    <Notification
                        isActive={this.state.isActive}
                        message="Dimension has been updated"
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

module.exports = wrapper(ListDimensions);