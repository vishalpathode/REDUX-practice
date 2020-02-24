// node <FILENAME>


const redux = require('redux')

// redux.createStore is a method store that holds the state tree.
const createStore = redux.createStore

// start : action
const BUY_CAKE = 'BUY_CAKE'
const BUY_ICECREAM = 'BUY_ICECREAM'

 // function - type - property
function buyCake(){
    return {
        type: BUY_CAKE,
        info: 'First redux action'
    }
} 

 // function - type - property
 function buyIceCream(){
    return {
        type: BUY_ICECREAM,
        info: 'Second redux action'
    }
 } 
// end: action

// start: reducer
    // reducer tells how state transition will happen
 
    // (previousState, action) => newState

    // previousState
    const initialState = {
        numOfCakes: 10,
        numOfIceCreams: 20
    }

    // 'action' representing as an object (I GUESS) 
    const reducer =(state=initialState, action ) =>{
        switch(action.type){

            case BUY_CAKE: 
                return {
                    // might be we have multiple properties, so we keep copy of state, 
                    // so other properties remains unchanged
                    ...state,

                    // we are not mutating state object, we are returning new object
                    numOfCakes: state.numOfCakes - 1
                }

            case BUY_ICECREAM: 
                return {
                    // might be we have multiple properties, so we keep copy of state, 
                    // so other properties remains unchanged
                    ...state,

                    // we are not mutating state object, we are returning new object
                    numOfIceCreams: state.numOfIceCreams - 1
                }
            default: return state
        }
    }
// end: reducer


// this store holding application state, can called as redux store
const store = createStore(reducer)

// getState() gives current state of the store
console.log('Initial State', store.getState())

// subscribe(listner) used to allow changes in the store 
// this subscribe() returns unsubscribe
const unsubscribe = store.subscribe(() => console.log('Updated state',store.getState()))

// dispatch() used to update the state
// we have to pass 'action' as parameter in dispatch() , e.g. dispatch(<ACTION>)
// but here we are passing 'action creator' as of now. e.g. 
// afer update in state this will call 'listener' of subscribe() i.e. store.subscribe(listner)
store.dispatch(buyCake()) // passing 'action creator'
store.dispatch(buyCake()) // passing 'action creator'
store.dispatch(buyIceCream()) // passing 'action creator'
store.dispatch({type:BUY_CAKE}) //  directly passing object type

// final step to unsubscribe from the store
// unregister of listner 
// after 'unsubscribe' we can't do changes,
unsubscribe()
