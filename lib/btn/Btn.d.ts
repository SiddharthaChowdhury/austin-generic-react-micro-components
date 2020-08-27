import * as React from 'react';
export declare enum IdBtnColor {
    DANGER = 0,
    SUCCESS = 1,
    PRIMARY = 2,
    SECONDARY = 3,
    DEFAULT = 4
}
export interface IBtnProps {
    text?: string;
    icon?: any;
    isDisabled?: boolean;
    [index: string]: any;
}
export declare class Btn extends React.Component<IBtnProps> {
    render(): JSX.Element;
}
