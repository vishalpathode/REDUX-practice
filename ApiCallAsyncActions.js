// npm install axios // used for calling http requests
// npm install redux-thunk //used to define async action creators
// node <FILENAME>

const redux = require('redux')
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware
const thunkMiddleware = require('redux-thunk').default
const axios = require('axios')


// start : action
const USERS_REQUEST = 'USERS_REQUEST'
const USERS_SUCCESS = 'USERS_SUCCESS'
const USERS_FAILURE = 'USERS_FAILURE'



const userRequest = () => {
    return {
        type: USERS_REQUEST,
    }
}
const userSuccess = users => {
    return {
        type: USERS_SUCCESS,
        payload: users
    }
}
const userFailure = error => {
    return {
        type: USERS_FAILURE, 
        payload: error
    }
} 

// end: action

// start: reducer

    const initialState = {
        loading: false,
        users:[],
        error:''
    }


    const reducer =(state=initialState, action ) =>{
        switch(action.type){
            case USERS_REQUEST: 
                return {
                    ...state,
                    loading: true
                }
            case USERS_SUCCESS: 
                return {
                    loading: false,
                    users: action.payload, // action.payload will put data in users
                    error: ''
                }    
            case USERS_FAILURE: 
                return {
                    loading: false,
                    users: [],
                    error: action.payload

                }        
            default: return state
        }
    }
// end: reducer

// async action creator
const fetchUsers = () =>{
    return function(dispatch){

        dispatch(userRequest()) // will set loading:true
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response =>{
            const userIDs = response.data.map(user=> user.id)
            dispatch(userSuccess(userIDs))
        })
        .catch(error=>{
            dispatch(userFailure(error.message))
        })
    }
}

// thunk middleware returns function instead of action,
// fetchUsers()) performing async tasks and returning functions
const store = createStore(reducer, applyMiddleware(thunkMiddleware)) 

store.subscribe(() =>{console.log(store.getState())})
store.dispatch(fetchUsers())