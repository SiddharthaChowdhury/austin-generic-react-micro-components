"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = void 0;
var React = __importStar(require("react"));
var Btn_1 = require("../btn/Btn");
var Login = (function (_super) {
    __extends(Login, _super);
    function Login() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            user: '',
            password: '',
            rememberMe: false
        };
        return _this;
    }
    Login.prototype.render = function () {
        var _this = this;
        var _a = this.props, onForgotPassword = _a.onForgotPassword, onLogin = _a.onLogin;
        return (React.createElement("div", null,
            React.createElement("input", { placeholder: "Email", type: "text", value: this.state.user, onChange: function (e) { return _this.setState({ user: e.target.value }); } }),
            React.createElement("input", { placeholder: "Password", type: "password", value: this.state.password, onChange: function (e) { return _this.setState({ password: e.target.value }); } }),
            React.createElement("div", null,
                React.createElement("input", { type: 'checkbox', checked: this.state.rememberMe, onChange: function (e) { return _this.setState({ rememberMe: e.target.checked }); } }),
                React.createElement("small", null, "Remember me here")),
            React.createElement(Btn_1.Btn, { onClick: function () {
                    if (onLogin)
                        onLogin(_this.state);
                    return;
                }, text: "Login" })));
    };
    return Login;
}(React.Component));
exports.Login = Login;
//# sourceMappingURL=Login.js.map