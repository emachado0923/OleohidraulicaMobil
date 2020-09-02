import {combineReducers} from "redux";

//Reducers
import scheduleReducer from "./Schedule/scheduleReducer";
import maintenanceReducer from "./Maintenance/maintenanceReducer";
import itemsReducer from './Items/itemsReducer'
import usersReducer from './Users/usersReducer';
import AuthReducer from './Auth/authReducer';
import connectionReducer from './Connection/connectionReducer';


export default combineReducers({
    AuthReducer,
    usersReducer,
    scheduleReducer,
    maintenanceReducer,
    itemsReducer,
    connectionReducer,


})
