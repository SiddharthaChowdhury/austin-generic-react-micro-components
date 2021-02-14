import React from "react";

interface IAvatarProps {
    height?: number;
    src: string;
    fallBackSrc?: string;
    [key: string]: any;
}

interface IAvatarState {
  origSrc: string;
}

class Avatar extends React.Component<IAvatarProps> {
  readonly state: IAvatarState = {origSrc: ''};

  componentDidMount() {
    const {fallBackSrc, src} = this.props;
    const self = this;

    if(fallBackSrc) {
        const img = new Image();
        img.onload = function() {
            self.setState({origSrc: src})
        }
        img.onerror = function() {
            self.setState({origSrc: fallBackSrc})
        }

        img.src = src;
    } else {
        this.setState({origSrc: src})
    }
  }

  render () {
    const {origSrc} = this.state;
    const {height, src, fallBackSrc, ...rest} = this.props;
    const square = `${height || 50}px`;

    return (
      <div style={{
          backgroundImage: `url(${origSrc})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: "contain",
          height: square,
          width: square,
          borderRadius: '3px'
      }} {...rest}/>
    );
  }
}

export default Avatar;
