import * as React from 'react';
export interface ILoginRequestInfo {
    user: string;
    password: string;
    rememberMe?: boolean;
}
export interface ILoginProps {
    onLogin?: (ILoginRequestInfo: any) => any;
    onForgotPassword?: () => any;
}
export interface ILoginState extends ILoginRequestInfo {
}
export declare class Login extends React.Component<ILoginProps> {
    readonly state: ILoginState;
    render(): JSX.Element;
}
