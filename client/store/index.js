import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './auth';
import hotSauces from './hotSauces';
import singleHotSauce from './singleHotSauce';
import singleCustomer from './singleCustomer';

const reducer = combineReducers({
  auth,
  singleHotSauce,
  hotSauces,
  singleCustomer,
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './auth';
