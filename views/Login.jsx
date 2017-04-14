var React = require('react');
var cookie = require('react-cookie');
var connect = require('react-redux').connect;
var Router = require('react-router');
require('whatwg-fetch');

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.apiUrl = "http://193.70.40.193:3000/api";
        this.state = {
            userId: cookie.load('userId')
        };
    }

    login() {
        let pseudo = document
            .querySelector('#Username')
            .value;
        let password = document
            .querySelector('#Password')
            .value;
        fetch(this.apiUrl + '/connection', {
            method: "POST",
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "pseudo=" + pseudo + "&password=" + password
        }).then((response) => {
            return response.json()
        }).then((json) => {
            console.log('parsed json', json);
            if(json.error !== undefined){
                document.querySelector('#error').style.visibility = "visible";
            } else {
                let today = new Date();
            today = today.setHours(today.getHours() + 6);
            let expire = new Date(today);
            if(cookie.load("Token") === undefined){
                cookie.save('Token', json.token, {
                path: "/",
                expires: expire
            });
            Router
                .browserHistory
                .push('/index');
            }
            }
        }).catch((ex) => {
            console.log('parsing failed', ex)
        })
    }

    componentDidMount() {
        if(this.props.custom.token.length > 10){
            Router
                .browserHistory
                .push('/index');
        }
    }

    render() {
        return (
            <div style={{display: "flex", alignItems: "center", justifyContent: "center", paddingTop: "20%"}}>
            <div className="login-box-body">
                <p className="login-box-msg">Sign in to start your session</p>

                <form action="javascript:void(0);" name="Login_Form">
                    <div className="form-group has-feedback">
                        <input
                            className="form-control"
                            placeholder="Username"
                            name="Username"
                            id="Username"
                            type="text"/>
                        <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
                    </div>
                    <div className="form-group has-feedback">
                        <input
                            className="form-control"
                            name="Password"
                            id="Password"
                            placeholder="Password"
                            type="Password"/>
                        <span className="glyphicon glyphicon-lock form-control-feedback"></span>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <button
                                onClick={() => this.login()}
                                className="btn btn-primary btn-block btn-flat"
                                name="Submit"
                                value="Login">Sign In</button>
                        </div>
                    </div>
                    <div id="error" className="row" style={{visibility: "hidden"}}>
                        <div className="col-xs-12">
                            <span style={{color:"red"}}> Username or password invalid</span>
                        </div>
                    </div>
                </form>

            </div>
        </div>
        )
    }

}

var wrapper = connect(function (state) {
    return {custom: state};
});

module.exports = wrapper(Login);