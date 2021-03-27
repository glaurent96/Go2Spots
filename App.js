import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import SpotNavigator from './navigation/SpotNavigator';
import spotsReducer from './store/spot-reducer';
import { init } from './helpers/db';

init().then(() => {
    console.log('Initialized database')
}).catch(err => {
    console.log('Initializing db failed.');
    console.log(err);
});

const rootReducer = combineReducers({
    spots: spotsReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
    return (
        <Provider store={store}>
            <SpotNavigator />
        </Provider>
    );
}
