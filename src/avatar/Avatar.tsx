import React from "react";

interface IAvatarProps {
    height?: number;
    src: string;
    [key: string]: any;
}

const Avatar: React.FC<IAvatarProps> = ({height, src, ...rest}) => {
    const square = `${height || 50}px`;
    const style: React.CSSProperties = {
        backgroundImage: `url(${src})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: "contain",
        height: square,
        width: square,
        borderRadius: '3px'
    };

    return (
        <div style={style} {...rest}/>
    );
};

export default Avatar;