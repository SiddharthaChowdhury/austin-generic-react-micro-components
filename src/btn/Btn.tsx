import React from 'react';
import './btn.scss';
import {utilBtn} from "./utilBtn";
import { IdBtnColor } from './IdBtnColor';
import styled from "styled-components";
import { adjustColor } from '../util/utilBrowser';
interface IBtnProps {
    text?: string;
    submitType?: boolean; 
    isDisabled?: boolean;
    color?: IdBtnColor;
    forceColorHex?: {
        bgColor: string; // #ColHex
        color: string; // #ColHex
    }; // This overrides props.color 
    solid?: boolean;
    icon?: any;
    href?: string;
    onClick?: any;
    [index: string]: any;
}

const Btn: React.FC<IBtnProps> = (props) => {
    const {text, submitType, isDisabled, color, solid, className, icon, forceColorHex, ...rest} = props;

    const colorClass = utilBtn.getColorClass(color, solid);
    const classes = className ? className + ` ${colorClass}` : colorClass;

    const getbtnContent = () => {
        return (
            <>
                {icon && <span className={'btnIcon'}>{icon}</span>}
                {(text && icon) &&
                <span style={{marginLeft: '6px'}} className={'btnText'}>{text}</span>
                }
                {(text && !icon) &&
                <span className={'btnText'}>{text}</span>
                }
            </>
        );
    }

    if(forceColorHex && !isDisabled) {
        const StyledBtn = styled.button`
            border-radius: 3px;
            font-size: 14px;
            font-weight: 400;
            padding: 6px 10px;
            background-color: ${forceColorHex.bgColor};
            border: 1px solid ${adjustColor(forceColorHex.bgColor, -10)};
            color: ${forceColorHex.color};
            cursor: pointer;
            text-decoration: none;
            box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12);

            &:hover {
                background-color: ${adjustColor(forceColorHex.bgColor, -10)};
                color: ${adjustColor(forceColorHex.color, 10)}
            }
        `;

        return (
            <StyledBtn type={submitType ? 'submit': 'button'} {...rest} data-test="btn">
                {getbtnContent()}
            </StyledBtn>
        );
    }

    return (
        <button type={submitType ? 'submit': 'button'} className={`${isDisabled ? 'disabled': ''} ${classes}`} {...rest} data-test="btn">
            {getbtnContent()}
        </button>
    )
};



export default Btn;