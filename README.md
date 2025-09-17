# Pixel Editor

An editor for making pixel art built on top of the Fluid Framework, React, and Redux.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Architecture

This application uses a layered architecture and uses the PropNode API to read Shared Tree nodes. There are three layers, each of which only talks to the layer below it. Starting with the top layer:

Component Tree - The React Component tree, which renders state and calls reducers/thunks as appropriate to perform edits. See Grid.tsx for the majority of the Component-level logic.
PropNode "Store" - A React Context that contains the root PropNode and the `setupStore` method that initially populates it.
Model - Encapsulates Fluid Tree initialization and editing. Exposes editing degrees of freedom as methods on the schema.
