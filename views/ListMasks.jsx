var React = require('react');
var connect = require('react-redux').connect;
require('fetch-everywhere');
var Modal = require('react-modal');
var Notification = require('react-notification').Notification;
const apiUrl = "http://localhost:3000/api";

class ListMasks extends React.Component {

    constructor(props) {
        super(props);
        this.apiUrl = "http://localhost:3000/api";
        this.state = {
            Data: [],
            Dimensions: []
        };
        this.setMasksState = this
            .setMasksState
            .bind(this);
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

    getMasks() {
        var self = this;
        var custom = this.props.custom;
        fetch(apiUrl + '/mask', {
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
            self.setMasksState(json);
        }).catch((ex) => {
            console.log('parsing failed', ex);
        })
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

    updateMask(id) {
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
        fetch(apiUrl + '/mask/' + id, {
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
            self.getMasks();
        }).catch((ex) => {
            console.log('parsing failed', ex)
        })
    }

    setMasksState(json) {
        this.setState({Data: json});
    }

    setDimensionsState(json) {
        this.setState({Dimensions: json});
        console.log(json);
    }

    componentDidMount() {
        this.state = {
            modalIsOpen: false,
            isActive: false,
            maskID: null
        };
        this.getMasks();
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
        this.setState({maskID: id});
        fetch(apiUrl + '/mask/' + id, {
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
        var mask = this.state.Data;
        var dimension = this.state.Dimensions;
        if (mask && dimension) {
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
                                            <td className="pull-right">
                                                <button
                                                    className="btn btn-primary btn-flat"
                                                    onClick={this
                                                    .openModal
                                                    .bind(this, mask.id)}>Update mask
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
                                            <p className="help-block">Nouvel prix</p>
                                        </div>
                                    </div>
                                    <div className="control-group">
                                        <label className="control-label" htmlFor="price">Formats</label>
                                        <div className="controls">
                                            <select name="dimensions" id="dimensions">
                                                {this
                                                    .state
                                                    .Dimensions
                                                    .map((dimension, index) => {
                                                        return <option value={dimension.id} key={index}>{dimension.width + "x" + dimension.height}</option>
                                                    })}
                                            </select>
                                            <p className="help-block">Modifier format du masque</p>
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
                                                .updateMask
                                                .bind(this, this.state.maskID)}
                                                className="btn btn-success">Update Mask</button>
                                        </div>
                                    </div>
                                </fieldset>
                            </form>

                        </Modal>
                        <Notification
                            isActive={this.state.isActive}
                            message="Mask has been updated"
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

module.exports = wrapper(ListMasks);