import {createStore} from 'redux';
const defaultState ={
    checkLogin : false
}

const reducer = (state = defaultState, action)=>{
    if(action.type ==="LOGIN") return {checkLogin : !defaultState.checkLogin};
    if(action.type ==="LOGOUT") return {checkLogin : !defaultState.checkLogin};
    return defaultState;
}

export const store = createStore(reducer);