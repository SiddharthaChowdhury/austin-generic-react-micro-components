import React, { ChangeEvent } from "react";
import "./asyncDropdown.scss";
import { IDropdownOption } from "./IDropdown";
import Loading from "../loading/Loading";
import { debounce } from "../util/utilBrowser";
import Avatar from "../avatar/Avatar";

interface IAsyncDropdownOwnState {
    typedValue: string;
    newOptions?: IDropdownOption[];
    isLoading?: boolean;
    stateSelected?: IDropdownOption[];
    open?: boolean;
}
interface IAsyncDropdownProps {
    initialOptions?: IDropdownOption[]; // options
    promise: (input: string) => Promise<IDropdownOption[]>;
    onChange?(selection: IDropdownOption[]): any;
    selected?: IDropdownOption[];
    placeholder?: string;
    isMulti?: boolean;
    hideMultiTags?: boolean;
    isDisabled?: boolean;
    debouneTime?: number;
}

class AsyncDropdown extends React.Component<IAsyncDropdownProps, IAsyncDropdownOwnState> {
    readonly state: IAsyncDropdownOwnState = { typedValue: '', stateSelected: this.props.selected};

    private refSuggestionContainer = React.createRef<any>();
    private refInput = React.createRef<any>();

    private timerHandleSuggestionPosition: number | null = null;
    private timerHandleInputWidth: number | null = null;
    private timerHandleSafeSuggestionClose: number | null = null;
    private debouncedInput = debounce(() => {
        this.triggerSearch();
    }, this.props.debouneTime || 260);

    render() {
        const {typedValue, stateSelected, open, newOptions} = this.state;
        const {isMulti, placeholder, isDisabled, initialOptions} = this.props;
        const pholder = stateSelected
            ? !isMulti ? (stateSelected[0] ? stateSelected[0].label : placeholder || '') : placeholder || ''
            : this.props.selected ? (this.props.selected[0] ? this.props.selected[0].label : placeholder || '') : placeholder || '';

        const isNoOptions = (!newOptions || (newOptions && newOptions.length === 0)) && (!initialOptions || (initialOptions && initialOptions.length === 0));

        return (
            <div className={'asyncDrpDwn821'}>
                {((stateSelected && stateSelected.length > 0) && isMulti) &&
                <div className={'asyncDrpDwn821__multiTagContainer'}>
                    {stateSelected.map((sItem: IDropdownOption, _key: number) => {
                        const {label, color, avatar} = sItem;

                        return (
                            <div
                                title={`REMOVE - ${label}`}
                                key={_key}
                                className={'asyncDrpDwn821__multiTagContainer--item'}
                                onClick={() => this.removeTag(sItem)}
                                style={{
                                    backgroundColor: color ? color[0] : '#f3f3f3',
                                    color: color ? color[1] : '#000',
                                    border: `1px solid ${color ? color[0] : '#f3f3f3'}`
                                }}

                            >
                                {avatar && 
                                    <Avatar 
                                        src={avatar} 
                                        height={17}
                                        className="asyncDrpDwn821__multiTagContainer--item-avatar"
                                    />
                                }
                                <span>{label.replace(' ', '_')}</span>
                                <span
                                    className="asyncDrpDwn821__multiTagContainer--item-close"
                                    style={{color: color ? color[1] || '#3d3d3d' : '#3d3d3d'}}
                                >
                                    &times;
                                </span>
                            </div>

                        )
                    })}
                </div>
                }

                <input type={'text'}
                    ref={this.refInput}
                    title={isNoOptions ? 'No items': ''}
                    className={'asyncDrpDwn821__input asyncDrpDwn821-js-common'}
                    value={typedValue}
                    onChange={this.handleInputChange}
                    onKeyUp={() => this.debouncedInput()}
                    placeholder={pholder}
                    onClick={this.handleInputBoxClick}
                    disabled={!!isDisabled}
                    style={isNoOptions ? {backgroundColor: '#eeeeee'} : {}}
                />
                {typedValue &&
                    <span className={'asyncDrpDwn821__clearTextIcon'}
                        onClick={() => {
                            this.setState({typedValue: ''});
                        }}
                    >
                        &times;
                    </span>
                }

                {open &&
                    <div
                        className={'asyncDrpDwn821_Overlay'}
                        onClick={(e: any) => {
                            if(e.target) {
                                if(e.target.className === 'asyncDrpDwn821__suggestions--item') {
                                    return;
                                }
                                this.setState({open: false, isLoading: false, newOptions: undefined})
                            }
                        }}
                    >
                        <div className={'asyncDrpDwn821__suggestions'} ref={this.refSuggestionContainer}>
                            {(() => {
                                const result: any = this.getListContent();
                                if(result && (Array.isArray(result) && result.length > 0)) {
                                    return result;
                                }

                                this.safeSuggestionClose(true);
                                return null;
                            })()}

                        </div>
                    </div>
                }
            </div>
        );
    }

    componentDidMount() {
      document.body.addEventListener('click', this.detectDocumentClicks);
    }

    componentWillUnmount() {
        if(this.timerHandleSuggestionPosition) {
            clearTimeout(this.timerHandleSuggestionPosition);
        }

        if(this.timerHandleInputWidth) {
            clearTimeout(this.timerHandleInputWidth);
        }
        if(this.timerHandleSafeSuggestionClose) {
            clearTimeout(this.timerHandleSafeSuggestionClose)
        }

        document.body.removeEventListener('click', this.detectDocumentClicks);
    }

    private detectDocumentClicks = (e: any) => {
      if(e && e.target) {
        const {target} = e;
        const suggestionContainer: HTMLElement = this.refSuggestionContainer.current;
        const classes: string = target.getAttribute('class') || '';
        const itemClass = 'asyncDrpDwn821-js-common';
        const parentClasses: string = target.parentElement ? target.parentElement.getAttribute('class') || '' : '';

        if(suggestionContainer && !suggestionContainer.contains(target)) {
            this.safeSuggestionClose();
            return;
        }

        // Close when somewhere outside dropdown environment is clicked
        if(!classes.includes(itemClass) && !parentClasses.includes(itemClass) && this.state.open) {
            this.safeSuggestionClose();
        }

      }
    }

    private triggerSearch = () => {
        const {promise} = this.props;
        const promiseOptions = promise(this.state.typedValue);

        promiseOptions.then((options: IDropdownOption[]) => {
            this.completeLoading(options || []);
        }).catch(() => {
            this.safeSuggestionClose()
        });
    }

    private removeTag = (itemToRemove: IDropdownOption) => {
        const {stateSelected} = this.state;
        if(stateSelected && stateSelected.length >= 0) {

            const index: number = stateSelected.findIndex((item: IDropdownOption) => item.value.toString() === itemToRemove.value.toString());

            if(index !== undefined) {
                const stateSelectedNew = [...stateSelected];
                stateSelectedNew.splice(index, 1);

                this.setState({ stateSelected: stateSelectedNew});
                if(this.props.onChange) {
                    this.props.onChange(stateSelectedNew);
                }
            }
        }
    }

    private safeSuggestionClose = (async?: boolean) => {
        if(async) {
            this.timerHandleSafeSuggestionClose = setTimeout(() => {
                this.setState({open: false, isLoading: false, newOptions: undefined});
            })

            return;
        }

        this.setState({open: false, isLoading: false, newOptions: undefined});
        return;
    }

    private startLoading = (update: any) => {
        this.setState({open: true, isLoading: true, ...update})
    }

    private completeLoading = (options: IDropdownOption[]) => {
        this.setState({open: true, isLoading: false, newOptions: options});
    }

    private handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value || '';
        this.startLoading({typedValue: value})
        return;
    }

    private handleInputBoxClick = () => {
        const {initialOptions, isDisabled} = this.props;

        if(isDisabled || (!initialOptions && !this.state.newOptions && !this.state.isLoading)) {
            return;
        }

        if(!this.state.open && initialOptions && initialOptions.length > 0) {
            this.setState({open: true});
        }
    }

    private adjustSuggestionPosition = () => {
        this.timerHandleSuggestionPosition = setTimeout(() => {
            const suggestionContainer: HTMLElement = this.refSuggestionContainer.current;

            if(suggestionContainer) {
                const ipRect: DOMRect =  this.refInput.current.getBoundingClientRect();
                suggestionContainer.setAttribute('style', `top: ${ipRect.height + 5}px; width: ${ipRect.width}px; visibility: visible;`);
            }
        })
    }

    private getListContent = () => {
        const {isLoading, newOptions, stateSelected} = this.state;
        const {initialOptions, isMulti, onChange} = this.props;

        const handleSuggestionItemClick = (item: IDropdownOption) => {
            let selectedItems: IDropdownOption[] = [];

            if(!isMulti) {
                selectedItems = [item];
            } else {
                const newStateSelected = (stateSelected && stateSelected.length > 0 )
                                            ? stateSelected.filter((sItem: IDropdownOption) => {
                                                    return sItem.value.toString() !== item.value.toString();
                                                })
                                            : [];
                selectedItems = [...newStateSelected, item];
            }

            this.setState({stateSelected: selectedItems, open: false, typedValue: '', newOptions: undefined});

            if(onChange) {
                onChange(selectedItems);
            }
        }

        const getItemFromListItem = (options: IDropdownOption[]) => {
            const uniqueList: IDropdownOption[] | undefined = (stateSelected && stateSelected.length > 0)
                                                        ? this.deriveUniqueList(options, stateSelected )
                                                        : options;
            if(!uniqueList)  {
                return [];
            }

            return uniqueList.map((item: IDropdownOption, _key: number) => {
                const {label, avatar, color} = item;

                return (
                    <div key={_key}
                      className={'asyncDrpDwn821-js-common asyncDrpDwn821__suggestions--item'}
                      onClick={() => handleSuggestionItemClick(item)}
                      style={color && color[2] ? {backgroundColor: color[0], color: color[1]}: {}}

                    >
                        {avatar && <Avatar src={avatar} height={17}/>}
                        <div className={'asyncDrpDwn821__suggestions--item-label'}>{label}</div>
                    </div>
                );
            })
        }

        const decideContent = () => {
            if (isLoading) {
                return (
                    <div className={'asyncDrpDwn821__suggestions--item'}>
                        <Loading size={15}/>
                        <div className={'asyncDrpDwn821__suggestions--item-label'}>{'Loading..'}</div>
                    </div>
                )
            }

            if (newOptions && newOptions.length > 0) {
                return getItemFromListItem(newOptions);
            }
            if (newOptions && newOptions.length === 0) {
                return (
                    <div className={'asyncDrpDwn821__suggestions--item'}>
                        <div className={'asyncDrpDwn821__suggestions--item-label'}>{'No item'}</div>
                    </div>
                )
            }


            if(initialOptions && initialOptions.length > 0) {
                const uniqueList: IDropdownOption[] = (stateSelected && stateSelected.length > 0)
                                                        ? this.deriveUniqueList(initialOptions, stateSelected )
                                                        : initialOptions;

                return getItemFromListItem(uniqueList);
            }

            return null;
        }

        const content = decideContent();
        if(content) {
            this.adjustSuggestionPosition();
            return content;
        }

        return null;
    }

    private deriveUniqueList = (list: IDropdownOption[], selectedList: IDropdownOption[]): IDropdownOption[] => {
        return list.filter((li: IDropdownOption) => {
            let found = selectedList.find((sl: IDropdownOption) => sl.value.toString() === li.value.toString())
            return !found;
        });
    }
}

export default AsyncDropdown;

/*
    Core of dropdown
    - Contains text input to filter/search
    - Drop
    - To be used in by Async and Sync dropdown wrapper
    - If promise is passed -> Async
    - Else -> Sync

    initialOptions:
        -   Default list to show, before something is typed to search
        - [case : Async] Once searched the dropdownList will replaced by new content and the default list will not be displayed
        - [case : Sync] Once typed, the initialList will be filtered [using string pattern match]
        -   If the typed text is cleared, the dropdown list will then be relpaced back to options passed in "initialOptions"

    promise: [Async only]
        - This determines if the current dropdown is Async or not
        - To be used to fetch dropdownList asynchronously
        - Takes a function as input (see the defination in "IAsyncDropdownProps" interface)
        - This function is triggered every time input is changed
        - This function is triggerd everytime input is changed (with debounce of 260ms by default, to minimize the number of async calls)

    debouneTime: [Async only]
        - Override the default debouneTime, which is 260ms, cannot be more than 1000ms

    onChange:
        - handler to get selected option/s
        - if [isMulti: true] always returns full set of items selected in the dropdown

    selected:
        - Default selection on render
        - Item must contain in "props.initialOptions"

    isMulti:
        - if TRUE: then the dropdown behaviour changes to multiSelect from single select

    hideMultiTags:
        - Selections will not be shown as tags
        - [isMulti: true] Works only when "props.isMulti" = TRUE;

    isDisabled:
        - if TRUE disables the dropdown

    placeholder:
        - Default place holder when nothing is selected
        - Works if "props.selected" is undefined

*/
