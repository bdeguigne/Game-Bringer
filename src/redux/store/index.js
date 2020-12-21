import { createStore, compose, applyMiddleware } from "redux";
import reducers from '../reducers';
import thunkMiddleware from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(
            thunkMiddleware,
        )
    )
);

export default store;