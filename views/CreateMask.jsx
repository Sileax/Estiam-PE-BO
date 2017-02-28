var React = require('react');
var connect = require('react-redux').connect;
require('fetch-everywhere');
var Modal = require('react-modal');
var Notification = require('react-notification').Notification;
const apiUrl = "http://localhost:3000/api";

class CreateMask extends React.Component {

    constructor(props) {
        super(props);
        this.apiUrl = "http://localhost:3000/api";
        this.state = {
            Dimensions: []
        };
        this.setDimensionsState = this
            .setDimensionsState
            .bind(this);
        this.toggleNotification = this
            .toggleNotification
            .bind(this);
        this.createMask = this
            .createMask
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

    createMask() {
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
        let file = document.querySelector('#maskPNG');

        let data = new FormData();

        data.append('mask', file.files[0]);
        data.append('price', prix);
        data.append('name', nom);
        data.append('DimensionId', dimension);
        console.log(data);
        fetch(apiUrl + '/mask', {
            method: "PUT",
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                "x-access-token": custom.token
            },
            body: data
        }).then((response) => {
            return response.json()
        }).then((json) => {
            self.toggleNotification();
        }).catch((ex) => {
            console.log('parsing failed', ex)
        })
    }

    setDimensionsState(json) {
        this.setState({Dimensions: json});
        console.log(json);
    }

    componentDidMount() {
        this.state = {
            isActive: false
        };
        this.getDimensions();
    }

    toggleNotification() {
        this.setState({
            isActive: !this.state.isActive
        });
    }

    render() {
        var dimension = this.state.Dimensions;
        if (dimension) {
            return (
                <div>
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
                            <label className="control-label" htmlFor="maskPNG">Fichier</label>
                            <div className="controls">
                                <input type="file" id="maskPNG" name="maskPNG" className="input-xlarge"/>
                                <p className="help-block">Fichier PNG a importer</p>
                            </div>
                        </div>
                        <div className="control-group">
                            <div className="controls">
                                <button onClick={this.createMask} className="btn btn-success">Create Mask</button>
                            </div>
                        </div>
                    </fieldset>
                </form>
                    <Notification
                        isActive={this.state.isActive}
                        message="Mask has been updated"
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
};

var wrapper = connect(function (state) {
    return {custom: state};
});

module.exports = wrapper(CreateMask);