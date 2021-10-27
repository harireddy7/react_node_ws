import { createStore, applyMiddleware, compose } from 'redux';
import logger from './middlewares/logger';
import rootReducer from './reducers';

const configureStore = () => {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const middlewares = [logger];

    return createStore(
        rootReducer,
        {},
        composeEnhancers(applyMiddleware(...middlewares))
    )
}

export default configureStore;