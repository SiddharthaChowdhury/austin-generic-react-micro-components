# austin-generic-react-micro-components

## Available components
___
1. `Avatar`
2. `Btn`
3. `DatePicker` note implemented using [react-datepicker](https://www.npmjs.com/package/react-datepicker) npm packages [DOCS here](https://reactdatepicker.com/)
4. `TimePicker`
5. `Dropdown` Select (multiselect using chips/tags)
6. `AsyncDropdown` Select fetch options async (multiselect using chips/tags)
7. Custom colorful multi select chips + Custom avatar select/multiselect
8. `Loading`
9. `Popup`
10. `InputText` with label
11. `Login` form (with remember me)

## Usage
___
### <Dropdown

    <Dropdown
        isMulti={true} // is multiselect
        options={[
            {
                label: 'Normal', 
                value: 'normal'
            },
            {
                label: 'With Data', 
                value: 'with data', 
                dataAttr: [
                    {attr: 'test', value: 'on select get back'}
                ]
            },
            {
                label: 'Color when multiselect only', 
                value: 'color', 
                color: ['#000', '#fff']
            },
            {
                label: 'Show color in dropdown list', 
                value: 'color2', 
                color: ['red', '#fff', "true"]},
            {
                label: 'Avatar', 
                value: 'avatar', 
                avatar: 'https://some/image.png'
            },
            {
                label: 'Avatar with color', 
                value: 'avatar with color', 
                avatar: 'https://some/image.png', 
                color: ['green', '#fff', "true"]
            },
        ]}
        onChange={(selection: IDropdownOption[]) => {
            console.log('Selection = ', selection)
        }}
    />

#### All props
    interface IDropdownProps {
        options: IDropdownOption[];
        onChange?(selection: IDropdownOption[]): any;
        selected?: IDropdownOption[];
        placeholder?: string;
        isMulti?: boolean;
        isDisabled?: boolean;
        debouneTime?: number;
    }

___


### <AsyncDropdown

This is to be used when the options are NOT predefined and they need to filled asynchronously
The construct is same as Dropdown component except the props are as slightly different :

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

Example usage

    <AsyncDropdown
        promise={promiseOptions}
        selected={this.state.selection || undefined}
        initialOptions={[
            {label: 'type to search', value: ''}
        ]}
        onChange={selection => this.setState({selection})}
    />

    const promiseOptions = (input: string): Promise<IDropdownOption[]> => {
        return new Promise((resolve: any, reject: any) => {
            axios({
                url: '/users',
            }).then((asyncData: any[]) => {
                let options: IDropdownOption[] = [];

                options = asyncData.map(({id, name}) => {
                    return ({
                        label: name,
                        value: id,
                    })
                });

                resolve(options);
            }).catch(() => {
                reject(); // this safely closes the dropdown
            });
        });
    };

## Check changes before publish
- run `yarn link`. This should generate something like this
- `You can now run 'yarn link "austin-generic-react-micro-components"' in the projects where you want to use this package and it will be used instead.`
- open another dummy project if not create a react app using `npx create-react-app dummy --typescript` and then
- execute `yarn link "dummy-counter"` and try using user component


## Publish note
- add entry to index.ts (if new feature)
- update version number
- yarn build
- yarn coverage (to update the coverage before publish)
- git push
- npm publish
