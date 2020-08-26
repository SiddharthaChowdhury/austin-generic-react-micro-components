import * as React from 'react';
import { IBtnProps } from './IBtn';

export default class Btn extends React.Component<IBtnProps> {
    render () {
        const {isDisabled, text} = this.props;
        return (
            <button disabled={isDisabled}>
                {text}
            </button>
        );
    }
}