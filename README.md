# austin-generic-react-micro-components

## Available components

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

## Check changes before publish
- run `yarn link`. This should rgenerate something like this
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
