import React from 'react';
import './inputText.scss';

interface IInputText2Props {
    value?: string;
    className?: string;
    isDisabled?: boolean;
    isRequired?: boolean;
    style?: React.CSSProperties;
    helpIcon?: any;
    onChange?(e: any): void;
    [key: string]: any;
}

const InputText: React.FC<IInputText2Props> = (props) => {
    const {value, className, help, isDisabled, isRequired, popupAlign, onChange, style, ...rest} = props;

    return (
        <div className={'input-text2'} style={style} data-test={'inputText'}>
            {isRequired && <span data-test={'important'} className={'input-text2-required'}>*</span>}
            <input disabled={!!isDisabled} type={'text'} {...rest} onChange={onChange} value={value || ''} className={`input-text2-text ${className}`}/>
        </div>
    )
};

export default InputText;