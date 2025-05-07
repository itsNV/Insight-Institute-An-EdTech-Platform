
import combineReducers from "combine-reducers";
import authReducer from '../slices/Auth'
import profileReducer from '../slices/profile'
import cartReducer from '../slices/cart'
import courseReducer from '../slices/course'
import viewCourseReducer from '../slices/ViewCourse'


export const rootReducer = combineReducers({

    auth: authReducer,
    profile: profileReducer,
    cart: cartReducer,
    course: courseReducer,
    viewCourse : viewCourseReducer,
})