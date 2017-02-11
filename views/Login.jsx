var React = require('react');
var cookie = require('react-cookie');
var Router = require('react-router');
require('whatwg-fetch');

module.exports = class Login extends React.Component {

    constructor(props){
        super(props);
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
        fetch('http://193.70.40.193:3000/api/connection', {
            method: "POST",
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Content-Type": "application/x-www-form-urlencoded"
            },
                body: "pseudo=" + pseudo + "&password=" + password
            })
            .then((response) => {
                return response.json()
            })
            .then((json) => {
                console.log('parsed json', json)
                cookie.save('Token', json.token, {path: '/'});
                Router.browserHistory.push('/index');
            })
            .catch((ex) => {
                console.log('parsing failed', ex)
            })
    }

    render() {
        return (
            <div className="container">
                <div className="wrapper">
                    <form action="javascript:void(0);" name="Login_Form" className="form-signin">
                        <h3 className="form-signin-heading">Welcome Back! Please Sign In</h3>
                        <hr className="colorgraph"/>
                        <br/>

                        <input
                            type="text"
                            className="form-control"
                            id="Username"
                            name="Username"
                            placeholder="Username"
                            required="required"/>
                        <input
                            type="password"
                            className="form-control"
                            id="Password"
                            name="Password"
                            placeholder="Password"
                            required="required"/>

                        <button
                            onClick={() => this.login()}
                            className="btn btn-lg btn-primary btn-block"
                            name="Submit"
                            value="Login">Login</button>
                    </form>
                </div>
            </div>
        )
    }

}