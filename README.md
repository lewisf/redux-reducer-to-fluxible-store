# Create Fluxible Store From Redux Reducer

This is useful if you're migrating a large app from Fluxible to redux.
This essentially implements http://rackt.org/redux/docs/recipes/MigratingToRedux.html
from Fluxible.

### How to use

Unfortunately, in order for a store to operate in the Fluxible App Context (getting registered),
it needs a storeName. It also needs to have its action handlers registered as functions on the
store itself.

In order to support those needs, we have to pass in the storeName and action handlers in addition
to the redux reducer function we write. The good thing is that this is a small price to pay.

Example is below.

MyReducer.js
```
const createReducerStore = require('redux-reducer-to-fluxible-store');

function myReducer(state = {}, action) {
  switch (action.type) {
    case 'SOME_ACTION':
      return {
        ...state,
        someValue: action.someValue
      };
    case 'SOME_OTHER_ACTION':
      return {
        ...state,
        someOtherValue: action.someOtherValue
      };
    case 'DELETE_ALL':
      return {
        ...state,
        someValue: null,
        someOtherValue: null
      };
  }
}

module.exports = createReducerStore(
  myReducer,
  'MyReducer',
  [
    'SOME_ACTION',
    'SOME_OTHER_ACTION',
    'DELETE_ALL'
  ]
);
```

FluxibleApp.js
```
const Fluxible = require('fluxible');

const app = new Fluxible({
  component: ...
});

app.registerStore(require('./reducers/MyReducer');

```
