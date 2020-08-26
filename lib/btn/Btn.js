"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class Btn extends React.Component {
    render() {
        const { isDisabled, text } = this.props;
        return (React.createElement("button", { disabled: isDisabled }, text));
    }
}
exports.default = Btn;
//# sourceMappingURL=Btn.js.map