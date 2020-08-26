import * as React from 'react';
import { HelloWorldProps } from '../..';

export default class HelloWorld extends React.Component<HelloWorldProps, any> {
  renders() {
    return (
      <div style={{ color: this.props.color }}>
        Hello world!
      </div>
    );
  }
}