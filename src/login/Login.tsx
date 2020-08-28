import * as React from 'react';
import { Btn } from '../btn/Btn';

export interface ILoginRequestInfo {
    user: string;
    password: string;
    rememberMe?: boolean;
}

export interface ILoginProps {
    onLogin: (ILoginRequestInfo: any) => any;
    onForgotPassword?: () => any;
    error?: string;
}

export interface ILoginState extends ILoginRequestInfo {
    error?: string;
}

export class Login extends React.Component<ILoginProps> {
    readonly state:ILoginState = {
        user: '',
        password: '',
        rememberMe: false,
        error: this.props.error
    }
    render () {
        const {onForgotPassword, onLogin} = this.props;
        return (
            <div data-test="login">
                <div>Login</div>
                {this.state.error && <div data-test={'error'}>{this.state.error}</div>}
                <input placeholder="Email" type="text" value={this.state.user} onChange={(e: any) => this.setState({user: e.target.value})}/>
                <input placeholder="Password" type="password" value={this.state.password} onChange={(e: any) => this.setState({password: e.target.value})} />
                <div>
                    <input type={'checkbox'} checked={this.state.rememberMe} onChange={(e: any) => this.setState({rememberMe: e.target.checked})}/> 
                    <small>Remember me here</small>
                </div>

                <Btn data-test={'loginBtn'} onClick={this.handleLoginClicked} text={"Login"}/>
            </div>
        );
    }

    private handleLoginClicked = () => {
        const {user, password} = this.state;
        const {onLogin} = this.props;

        // basic validation
        if(!user || !password || (password && password.length < 6)) {
            this.setState({error: 'Login failed!'});
            return;
        }

        onLogin(this.state); 
    }
}