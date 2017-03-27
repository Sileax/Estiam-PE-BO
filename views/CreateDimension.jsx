var React = require('react');
var connect = require('react-redux').connect;
require('fetch-everywhere');
var Modal = require('react-modal');
var Notification = require('react-notification').Notification;
const apiUrl = "http://localhost:3000/api";

class CreateDimension extends React.Component {

    constructor(props) {
        super(props);
        this.apiUrl = "http://localhost:3000/api";
        this.state = {
            isActive: false
        };
        this.toggleNotification = this
            .toggleNotification
            .bind(this);
        this.createDimension = this
            .createDimension
            .bind(this);
    }

    createDimension() {
        var self = this;
        var custom = this.props.custom;
        let height = document
            .querySelector('#height')
            .value;
        let width = document
            .querySelector('#width')
            .value;
        let name = document
            .querySelector('#name')
            .value;
        fetch(apiUrl + '/dimension', {
            method: "PUT",
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Content-Type": "application/x-www-form-urlencoded",
                "x-access-token": custom.token
            },
            body: "height=" + height + "&width=" + width + "&name=" + name
        }).then((response) => {
            return response.json()
        }).then((json) => {
            console.log(json)
            if(json.success === true){
                self.toggleNotification();
            } else {
                alert('Sorry this dimension already exists or a value entered was incorrect')
            }
        }).catch((ex) => {
            console.log('parsing failed', ex)
        })
    }

    componentDidMount() {
        this.state = {
            isActive: false
        };
    }

    toggleNotification() {
        this.setState({
            isActive: !this.state.isActive
        });
    }

    render() {
        return (
            <div>
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
                                            onClick={this.createDimension}
                                            className="btn btn-success">Create Dimension</button>
                                    </div>
                                </div>
                    </fieldset>
                </form>
                <Notification
                    isActive={this.state.isActive}
                    message="Dimension method has been created"
                    action="Dismiss"
                    onDismiss={this.toggleNotification}
                    onClick={() => this.setState({isActive: false})}/>
            </div>
        );
    }
};

var wrapper = connect(function (state) {
    return {custom: state};
});

module.exports = wrapper(CreateDimension);