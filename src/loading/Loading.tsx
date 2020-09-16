import React from "react";
import "./loading.scss";

interface ILoadingProps {
    size?: number;
    color?: string;
    text?: string;
}

const defaultStyle: React.CSSProperties = {
    border: "3px solid #292860",
    // "border-top": "3px solid blue",
    // "border-right": "3px solid green",
    // "border-bottom": "3px solid red",
    // "border-left": "3px solid pink",
    width: "20px",
    height: "20px",
};

const containerStyle: React.CSSProperties = {
    display: "flex"
};

const loadingTextStyle: React.CSSProperties = {
    marginLeft: '5px'
};

const Loading:  React.FC<ILoadingProps> = (props) => {
    const {size, color, text} = props;

    const newStyle: React.CSSProperties  = {
        ...defaultStyle,
    };

    if(size) {
        newStyle.width = `${size || 15}px`;
        newStyle.height = `${size || 15}px`;
    }

    if(color) {
        newStyle.border = `3px solid ${color}`
    }

    if(text) {
        return (
            <div className={'loading-elem-container'} style={containerStyle}>
                <div className="loading-elem" style={newStyle}/>
                <div className={"loading-text"} style={loadingTextStyle}>{text}</div>
            </div>
        )
    }

    return (
        <div className="loading-elem" style={newStyle}/>
    )
};

export default Loading;