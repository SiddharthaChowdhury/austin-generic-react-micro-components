import * as React from 'react';
import Btn from '../btn/Btn';
import { ILoginRequestInfo, ILoginProps } from '../..';

interface ILoginState extends ILoginRequestInfo {}

export default class Login extends React.Component<ILoginProps> {
    readonly state:ILoginState = {
        user: '',
        password: '',
        rememberMe: false
    }
    render () {
        const {onForgotPassword, onLogin} = this.props;
        return (
            <div>
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