export interface IDropdownOption {
    label: string;
    value?: any;
    dataAttr?: IDropdownOptionDataAttr[];
}

export interface IDropdownOptionDataAttr {
    attr: string;
    value: string;
}