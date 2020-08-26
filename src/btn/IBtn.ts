export enum IdBtnColor {
    DANGER,
    SUCCESS,
    PRIMARY,
    SECONDARY,
    DEFAULT
}

export interface IBtnProps {
    text?: string;
    icon?: any;
    isDisabled?: boolean;
    [index: string]: any;
}
