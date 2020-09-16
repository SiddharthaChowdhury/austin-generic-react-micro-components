import React from "react";
import { IDropdownOption } from "./IDropdown";
import AsyncDropdown from "./AsyncDropdown";

interface IDropdownOwnState {
    typedValue: string;
    newOptions?: IDropdownOption[];
    isLoading?: boolean;
    stateSelected?: IDropdownOption[];
    open?: boolean;
}
interface IDropdownProps {
    // initialOptions?: IDropdownOption[]; // options
    // promise: (input: string) => Promise<IDropdownOption[]>;
    options: IDropdownOption[];
    onChange?(selection: IDropdownOption[]): any;
    selected?: IDropdownOption[];
    placeholder?: string;
    isMulti?: boolean;
    isDisabled?: boolean;
}

class Dropdown extends React.Component<IDropdownProps, IDropdownOwnState> {
    readonly state: IDropdownOwnState = {typedValue: '', stateSelected: this.props.selected};

    private promiseOptions = (inputValue: string = ''): Promise<IDropdownOption[]> => {
        const {options} = this.props;
        return new Promise<IDropdownOption[]>((resolve: any, reject: any) => {
            if(options.length === 0) {
                resolve([])
            }


            const filtered: IDropdownOption[] = options.filter((item: IDropdownOption) => {
                return this.searchPattern(inputValue, item.label);
            })

            resolve(filtered);
        })
    }

    private searchPattern = (needle: string, hay: string): boolean => {
        return hay.toLowerCase().indexOf(needle.toLowerCase()) >= 0;
    };


    render() {
        const {options, ...rest} = this.props;
        return (
            <AsyncDropdown
                promise={this.promiseOptions}
                initialOptions={options}
                {...rest}
            />
        );
    }
}

export default Dropdown;