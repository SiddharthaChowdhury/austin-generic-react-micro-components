import * as React from 'react';

// --- DECFOR [ Login ] ---
export interface ILoginProps extends React.Props<any> {
  onLogin?: (ILoginRequestInfo: any) => any;
  onForgotPassword?: () => any;
}

declare class LoginForm extends React.Component<ILoginProps, any> {}

export interface ILoginRequestInfo {
  user: string;
  password: string;
  rememberMe?: boolean;
}


//  --- DEC FOR [ Btn ] ---

export interface HelloWorldProps extends React.Props<HelloWorld> {
  color: string;
}

declare class HelloWorld extends React.Component<HelloWorldProps, any> {
}

declare module 'austin-generic-react-micro-components' {
}
