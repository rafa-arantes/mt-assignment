## MT ASSIGNMENT

### How to run

The project is using `yarn` to manage dependencies, so:

- run `yarn`
- then `yarn start`

Should start at the port 8080.

### Architecture

#### Components Folder

All component folders, being them `pages` and `components` share the same structure. To make file search easier, there's the named file, capitalized, with the name of the component, and a `index.js` file, exporting the contents of this file to make imports cleaner while keeping search results clean.

A component folder contains:
```
  Component.jsx - Component code
  index.js - Export default Component
  styles.scss - If styling is necessary
  constants.js - A place to share constants related to this module
  ChildComponent/ - Folder with child component that is used only in this component
```

Every component folder can have child component folders inside of it, just place it at the root of the component folder and you're set. The purpose of this is to set usage a scope for the given components. If a child component is going to be used somewhere else, the component should be moved to `src/components`.

#### Hooks

The hooks are divided in two kinds of hooks: `suspenseful` and normal hooks. A `suspenseful` hook, it's a hook that depends on the usage of a `React.Suspense` up in the component tree to manage it's loading state and an `ErrorBoundary` to manage it's error states. This was made in order to leverage the loading/error states from components `(e.g: if(loading) return 'loading')` to a place where it can be handled in batches, while also giving flexibility to handle priority between loading states.

The separation between hooks is straight forward:
Suspenseful hooks should be kept inside `hooks/suspenseful` folder, while normal hooks can be kept at the root of the `hooks` folder.

#### Data Fetching

All the data fetching is made using `react-query` and custom hooks. `react-query` is a great library for data fetching/mutating, taking care of most chalenges that envolves calling an async APIs. By default it de-dupes calls made with same arguments, returning cached responses instead of re-calling the same API. It also has a very straightforward caching/cache invalidation API.

All the state related to API data is kept inside the data fetching hooks, providing a solid separation between component state and API state. The only way to access it is through hooks, and if possible, all the serialization should be done inside of the hooks as well.

