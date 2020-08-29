# austin-generic-react-micro-components

## Check changes before publish
- run `yarn link`. This should rgenerate something like this
- `You can now run 'yarn link "austin-generic-react-micro-components"' in the projects where you want to use this package and it will be used instead.`
- open another dummy project if not create a react app using `npx create-react-app dummy --typescript` and then
- execute `yarn link "dummy-counter"` and try using user component


## To publish
- add entry to index.ts (if new feature)
- update version number
- yarn coverage (to update the coverage before publish)
- git push
- npm publish

