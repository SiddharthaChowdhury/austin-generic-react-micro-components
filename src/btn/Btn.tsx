import React from 'react';
import './btn.scss';
import {utilBtn} from "./utilBtn";
import { IdBtnColor } from './IdBtnColor';
interface IBtnProps {
    text?: string;
    submitType?: boolean; 
    isDisabled?: boolean;
    color?: IdBtnColor;
    solid?: boolean;
    icon?: any;
    href?: string;
    onClick?: any;
    [index: string]: any;
}

const Btn: React.FC<IBtnProps> = (props) => {
    const {text, submitType, isDisabled, color, solid, className, icon, ...rest} = props;

    const colorClass = utilBtn.getColorClass(color, solid);
    const classes = className ? className + ` ${colorClass}` : colorClass;

    return (
        <button type={submitType ? 'submit': 'button'} className={`${isDisabled ? 'disabled': ''} ${classes}`} {...rest} data-test="btn">
            {icon && <span className={'btnIcon'}>{icon}</span>}
            {(text && icon) &&
            <span style={{marginLeft: '6px'}} className={'btnText'}>{text}</span>
            }
            {(text && !icon) &&
            <span className={'btnText'}>{text}</span>
            }
        </button>
    )
};


export default Btn;