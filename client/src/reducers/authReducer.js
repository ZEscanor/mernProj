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
/*
The authReducer function takes in two parameters, state and action.
The state parameter is the current state of the application.
The action parameter is the action that was dispatched.
The switch statement will check the action type and perform the appropriate action.
The AUTH case will set the authData state to the data that was returned from the action.
The LOGOUT case will clear the local storage and set the authData state to null.
The default case will return the current state.



*/

export default authReducer;