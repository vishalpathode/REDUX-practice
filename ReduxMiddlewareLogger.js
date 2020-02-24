//npm install redux-logger
// node <FILENAME>

const redux = require('redux')


const createStore = redux.createStore
const combineReducers = redux.combineReducers

//importing redux-logger
const reduxLogger = require('redux-logger')
//applyMiddleware() is used for passing it through createStore
const applyMiddleware = redux.applyMiddleware
const logger = reduxLogger.createLogger()



// start : action
const BUY_CAKE = 'BUY_CAKE'
const BUY_ICECREAM = 'BUY_ICECREAM'

function buyCake(){
    return {
        type: BUY_CAKE,
        info: 'First redux action'
    }
} 

 function buyIceCream(){
    return {
        type: BUY_ICECREAM,
        info: 'Second redux action'
    }
 } 
// end: action

// start: reducer

    const InitialCakeState = {
        numOfCakes: 10
    }
    const InitialIceCreamState = {
        numOfIceCreams: 20
    }

    // cake reducer
    const reducerCake =(state=InitialCakeState, action ) =>{
        switch(action.type){

            case BUY_CAKE: 
                return {
                    ...state,

                    numOfCakes: state.numOfCakes - 1
                }
            default: return state
        }
    }

    // ice-cream reducer
    const reducerIceCream =(state=InitialIceCreamState, action ) =>{
        switch(action.type){
            case BUY_ICECREAM: 
                return {
                    ...state,

                    numOfIceCreams: state.numOfIceCreams - 1
                }
            default: return state
        }
    }
// end: reducer


// combining reducers
const rootReducer = combineReducers({
    cake: reducerCake,
    iceCream: reducerIceCream
})

// applyMiddleware(logger) as 2nd parameter of createStore()
const store = createStore(rootReducer, applyMiddleware(logger))

console.log('Initial State', store.getState())

const unsubscribe = store.subscribe(() =>{})

// when we dispatch an action both reducers recieves that action, but one acts on that action 
// whereas other ignores that action 
store.dispatch(buyCake()) 
store.dispatch(buyCake()) 
store.dispatch(buyIceCream()) 
store.dispatch({type:BUY_CAKE}) 

unsubscribe()
