"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Btn_1 = require("../btn/Btn");
class Login extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            user: '',
            password: '',
            rememberMe: false
        };
    }
    render() {
        const { onForgotPassword, onLogin } = this.props;
        return (React.createElement("div", null,
            React.createElement("input", { placeholder: "Email", type: "text", value: this.state.user, onChange: (e) => this.setState({ user: e.target.value }) }),
            React.createElement("input", { placeholder: "Password", type: "password", value: this.state.password, onChange: (e) => this.setState({ password: e.target.value }) }),
            React.createElement("div", null,
                React.createElement("input", { type: 'checkbox', checked: this.state.rememberMe, onChange: (e) => this.setState({ rememberMe: e.target.checked }) }),
                React.createElement("small", null, "Remember me here")),
            React.createElement(Btn_1.default, { onClick: () => {
                    if (onLogin)
                        onLogin(this.state);
                    return;
                }, text: "Login" })));
    }
}
exports.default = Login;
//# sourceMappingURL=Login.js.map