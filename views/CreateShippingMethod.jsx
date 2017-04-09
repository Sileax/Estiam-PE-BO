var React = require('react');
var connect = require('react-redux').connect;
require('fetch-everywhere');
var Modal = require('react-modal');
var Notification = require('react-notification').Notification;
const apiUrl = "http://193.70.40.193:3000/api";

class CreateShippingMethod extends React.Component {

    constructor(props) {
        super(props);
        this.apiUrl = "http://193.70.40.193:3000/api";
        this.state = {
            isActive: false
        };
        this.toggleNotification = this
            .toggleNotification
            .bind(this);
        this.createShipping = this
            .createShipping
            .bind(this);
    }

    createShipping() {
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
        fetch(apiUrl + '/shipping', {
            method: "PUT",
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
            console.log(json)
            if(json.success === true){
                self.toggleNotification();
            } else {
                alert('Sorry this shipping method already exists or a value entered was incorrect')
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
                            <label className="control-label" htmlFor="name">Nom</label>
                            <div className="controls">
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Nom"
                                    className="input-xlarge"/>
                                <p className="help-block">Nom de la methode de livraison</p>
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
                                <p className="help-block">Prix de la methode de livraison (en Euro)</p>
                            </div>
                        </div>
                         <div className="control-group">
                            <label className="control-label" htmlFor="duration">Durée de livraison</label>
                            <div className="controls">
                                <input
                                    type="text"
                                    id="duration"
                                    name="duration"
                                    placeholder="Durée de transport"
                                    className="input-xlarge"/>
                                <p className="help-block">Durée de transport de la methode de livraison (Nombre de jours)</p>
                            </div>
                        </div>
                        <div className="control-group">
                            <div className="controls">
                                <button onClick={this.createShipping} className="btn btn-success">Create Shipping Method</button>
                            </div>
                        </div>
                    </fieldset>
                </form>
                <Notification
                    isActive={this.state.isActive}
                    message="Shipping method has been created"
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

module.exports = wrapper(CreateShippingMethod);