import {AUTH } from './constants';
import * as api from '../api';

//dispatch -> action -> api request -> reducer
export const signin = (formData, history) => async (dispatch) => {

    try{
        const {data} = await api.signIn(formData);
       // console.log("in our Actions", formData,data, history)
        dispatch({type: AUTH, data});
        history.push('/')
    }
    catch(error){
        console.log(error)
    }
};  // function that will sign in a user and dispatch it to our reducer

export const signup = (formData,history) => async (dispatch) => {

    try{
        const {data} = await api.signUp(formData);
        dispatch({type: AUTH, data});
        history.push('/')
    }
    catch(error){
        console.log(error)
    }
}   // function that will sign up a user and dispatch it to our reducer


// no google user data is saved in our database, only the user's name when they make a post etc.


