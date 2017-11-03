import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import createReducer from '../reducers/default'

export default function configureStore() {
    const composeEnhancers =
        process.env.NODE_ENV === 'production' ?
            // eslint-disable-next-line
            compose : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const middlewares = [
        thunk
    ];

    return createStore(
        createReducer(),
        composeEnhancers(
            applyMiddleware(...middlewares)
        )
    );
}