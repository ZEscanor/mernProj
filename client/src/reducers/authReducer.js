import {AUTH, LOGOUT} from "../actions/constants";


const authReducer = (state={authData:null},action) => {
    switch(action.type){
        case AUTH:
            //console.log("OUR AUTH",action?.data)
            localStorage.setItem('profile', JSON.stringify({...action?.data}))
            return {...state, authData: action?.data}
        case LOGOUT:
            localStorage.clear();
            return {...state, authData: null}
        default:
         return state;
    }
};


export default authReducer;