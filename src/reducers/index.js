import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import CircleReducer from './CircleReducer';


export default combineReducers({
    auth: AuthReducer,
    circleReducer: CircleReducer,

});

