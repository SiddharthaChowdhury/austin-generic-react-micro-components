import * as React from 'react';
import Btn  from '../btn/Btn';
import "./login.scss"
import InputText from '../text/InputText';
import { IdBtnColor } from '../btn/IdBtnColor';

export interface ILoginRequestInfo {
    user: string;
    password: string;
    rememberMe: boolean;
}

export interface ILoginPropOptionsInfo {
    formHeadingLabel?: string;
    userLabel?: string;
    passwordLabel?: string;
    forgotPassLabel?: string;
    btnLabel?: string;
    loadingMsg?: string;
}

export interface ILoginProps {
    onLogin: (ILoginRequestInfo: any) => any;
    onForgotPassword?: () => any;
    error?: string;
    options?: ILoginPropOptionsInfo;
}

interface ILoginState extends ILoginRequestInfo {
    error?: string;
    loading?: string;
}

class Login extends React.Component<ILoginProps> {
    readonly state:ILoginState = {
        user: '',
        password: '',
        rememberMe: false,
        error: this.props.error,
        loading: undefined
    }
    render () {
        const {options, onForgotPassword} = this.props;
 
        return (
            <form onSubmit={e => this.handleFormSubmit(e)} className='loginWrapper' data-test="loginForm">
                <div className="loginForm">
                    <div className="loginForm__container" data-test="login">
                        <div data-test={'formHeadingLabel'} className="loginForm__container--heading">{options?.formHeadingLabel || 'Login'}</div>
                        {(this.state.error && !this.state.loading) && 
                        <div className="loginForm__container--error">
                            <span data-test="error">{this.state.error}</span>
                        </div>
                        }
                        {this.state.loading && 
                        <div className="loginForm__container--loading">
                            <span data-test="loading">{this.state.loading}</span>
                        </div>
                        }
                        <div className="loginForm__container--formGroup">
                            <label>{options?.userLabel || 'Your email address:'}</label>
                            <InputText
                                type="text"
                                isDisabled={!!this.state.loading}
                                className="loginForm__container--formGroup-input" 
                                value={this.state.user} 
                                onChange={(e: any) => this.setState({user: e.target.value})}
                                onFocus={this.clearForm}
                                data-test="input" 
                            />
                        </div>
                        <div className="loginForm__container--formGroup">
                            <label>{options?.passwordLabel || 'Password:'}</label>
                            <InputText 
                                isDisabled={!!this.state.loading}
                                type="password" 
                                className="loginForm__container--formGroup-input" 
                                value={this.state.password} 
                                onChange={(e: any) => this.setState({password: e.target.value})}
                                onFocus={this.clearForm}
                                data-test="input" 
                            />
                        </div>
                        <div className="loginForm__container--formGroup">
                            <input 
                                disabled={!!this.state.loading}
                                type="checkbox" 
                                className="form-control" 
                                checked={this.state.rememberMe} 
                                onChange={(e: any) => this.setState({rememberMe: e.target.checked})} 
                                data-test="input"
                            />
                            <label> {options?.forgotPassLabel || 'Remember me'}</label>
                        </div>
                        <div className="loginForm__container--btnContainer">
                            <Btn 
                                solid={true}
                                submitType={true}
                                className={'loginBtn'}
                                data-test={'loginBtn'}
                                text={options?.btnLabel || 'Login'}
                                color={IdBtnColor.BLUE}
                                isDisabled={!!this.state.loading}
                            />

                            {onForgotPassword && <a className={'forgotPasswordBtn'} onClick={onForgotPassword}>Forgot password?</a>}
                        </div>
                    </div>
                </div>
            </form>
        );
    }

    private handleFormSubmit = (e: any) => {
        if(e) {
            e.preventDefault()
        }
        
        const {user, password, rememberMe} = this.state;
        const {onLogin, options} = this.props;

        const update: any = {loading: options?.loadingMsg || 'Please wait...'}

        if(!user || !password || (password && password.length < 6)) {
            update.error = 'Error! Login failed. Invalid user email or password is passed.';
            update.loading = undefined;
            this.setState({...update});
            return;
        }

        this.setState({...update});

        onLogin({
            user,
            password,
            rememberMe
        }); 
    }

    private clearForm = () => {
        this.setState({error: undefined, loading: undefined})
    }
}

export default Login;