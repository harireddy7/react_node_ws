import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducers';

const configureStore = () => {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const middlewares = [thunk, logger];

    return createStore(
        rootReducer,
        {},
        composeEnhancers(applyMiddleware(...middlewares))
    )
}

export default configureStore;