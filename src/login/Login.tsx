import * as React from 'react';
import { Btn } from '../btn/Btn';

export interface ILoginRequestInfo {
    user: string;
    password: string;
    rememberMe?: boolean;
}

export interface ILoginProps {
    onLogin?: (ILoginRequestInfo: any) => any;
    onForgotPassword?: () => any;
}

export interface ILoginState extends ILoginRequestInfo {}

export class Login extends React.Component<ILoginProps> {
    readonly state:ILoginState = {
        user: '',
        password: '',
        rememberMe: false
    }
    render () {
        const {onForgotPassword, onLogin} = this.props;
        return (
            <div data-test="login">
                <input placeholder="Email" type="text" value={this.state.user} onChange={(e: any) => this.setState({user: e.target.value})}/>
                <input placeholder="Password" type="password" value={this.state.password} onChange={(e: any) => this.setState({password: e.target.value})} />
                <div>
                    <input type={'checkbox'} checked={this.state.rememberMe} onChange={(e: any) => this.setState({rememberMe: e.target.checked})}/> 
                    <small>Remember me here</small>
                </div>

                <Btn onClick={() => {
                        if (onLogin) onLogin(this.state); 
                        return;
                    }
                } text={"Login"}/>
            </div>
        );
    }
}