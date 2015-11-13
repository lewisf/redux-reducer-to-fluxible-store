const BaseStore = require('dispatchr/addons/BaseStore');

function createStoreFromReducer(reducer, storeNameString, actionNames = []) {
  class WrappedReducerStore extends BaseStore {
    static storeName = storeNameString
    static handlers = actionNames.reduce((memo, actionName) => {
      memo[actionName] = function(data, actionType) {
        this.state = reducer(this.getState(), {type: actionType, ...data});

        this.emitChange();
      };

      return memo;
    }, {})

    constructor(dispatcher) {
      super(dispatcher);
    }

    getState() {
      return this.state;
    }

    dehydrate() {
      return this.getState();
    }

    rehydrate(state) {
      this.state = state;
    }
  };

  return WrappedReducerStore;
}

module.exports = createStoreFromReducer;
