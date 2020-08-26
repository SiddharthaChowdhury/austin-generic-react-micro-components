export interface ILoginProps {
    onLogin?: (ILoginRequestInfo: any) => any;
    onForgotPassword?: () => any;
}

export interface ILoginRequestInfo {
    user: string;
    password: string;
    rememberMe?: boolean;
}