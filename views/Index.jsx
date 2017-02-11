var React = require('react');
var cookie = require('react-cookie');
var connect = require('react-redux').connect;

var Layout = React.createClass ({

    render: function() {
        let custom = this.props.custom;
        return (
            <p>
                Current:
                <strong>Index</strong>
                <br/>
            </p>
        );
    }
});

var wrapper = connect(function (state) {
    return {custom: state};
});

module.exports = wrapper(Layout);


