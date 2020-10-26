import React from "react";

interface IAvatarProps {
    height?: number;
    src: string;
    fallBackSrc?: string;
    [key: string]: any;
}

const Avatar: React.FC<IAvatarProps> = ({height, src, fallBackSrc, ...rest}) => {
    const [imgOrigSrc, setSrc] = React.useState<string>();

    const square = `${height || 50}px`;
    const style: React.CSSProperties = {
        backgroundImage: `url(${imgOrigSrc})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: "contain",
        height: square,
        width: square,
        borderRadius: '3px'
    };

    React.useEffect(() => {
        if(fallBackSrc) {
            const img = new Image();
            img.onload = function() {
                setSrc(src);
            }
            img.onerror = function() {
                setSrc(fallBackSrc);
            }

            img.src = src;
        }
    }, [])

    return (
        <div style={style} {...rest}/>
    );
};

export default Avatar;