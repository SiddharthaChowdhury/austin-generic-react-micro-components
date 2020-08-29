import * as React from 'react';

export enum IdBtnColor {
    DANGER,
    SUCCESS,
    PRIMARY,
    SECONDARY,
    DEFAULT
}

export interface IBtnProps {
    text?: string;
    icon?: any;
    isDisabled?: boolean;
    [index: string]: any;
}

class Btn extends React.Component<IBtnProps> {
    render () {
        const {isDisabled, text, ...rest} = this.props;
        return (
            <button disabled={isDisabled} {...rest}>
                {text}
            </button>
        );
    }
}

export default Btn;