export interface IDropdownOption {
    label: string;
    value?: any;

    color?: string[]; // [bgColor, color, useColorInDropDownList: string <"true"|"false">]
    avatar?: string; // a valid src (url)
    dataAttr?: IDropdownOptionDataAttr[]; // to pass in more data
}

export interface IDropdownOptionDataAttr {
    attr: string;
    value: string;
}
