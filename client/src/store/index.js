import { createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
// Import the reducers
import calegReducer from './reducers/caleg'
import regionReducer from './reducers/region'
import authReducer from './reducers/auth'
import userReducer from './reducers/user'
import parpolReducer from './reducers/parpol'
import dapilReducer from './reducers/dapil'
import statusReducer from './reducers/status'
import dokumenReducer from './reducers/dokumen'

const reducers = combineReducers({
  caleg: calegReducer,
  dokumen: dokumenReducer,
  region: regionReducer,
  auth: authReducer,
  user: userReducer,
  parpol: parpolReducer,
  dapil: dapilReducer,
  status: statusReducer
})

const middleware = applyMiddleware(thunk);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(middleware));

export default store;