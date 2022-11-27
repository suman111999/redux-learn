const redux = require('redux');
const { createStore, bindActionCreators,combineReducers,applyMiddleware } = redux;

const {createLogger}=require('redux-logger');
const logger=createLogger();

const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTOCKED = 'CAKE_RESTOCKED';
const ICECREAM_ORDERED = 'ICECREAM_ORDERED';
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED';

//action creator
function orderCake() {
    //action object->customer ordered the cake
    return {
        type: CAKE_ORDERED,
        payload: 1,
    }
};

const restockeCake = (quantity = 1) => {
    return {
        type: CAKE_RESTOCKED,
        payload: quantity
    }
};

const orderIcecream = (quantity = 1) => {
    return {
        type: ICECREAM_ORDERED,
        payload: quantity
    }
};

const restockeIcecream = (quantity = 1) => {
    return {
        type: ICECREAM_RESTOCKED,
        payload: quantity
    }
};



//M-1 to use only one reducers to manage multiple state.
// const initialSate = {
//     noOfCakes: 10,
//     noOfIcecream:30
// };

// reducer to do the action
// using only one reducers we can manage multiple state but reducers functions would be large so recomended way to do is create diff reducers for diff state to update
// const reducer = (state = initialSate, action) => {
//     switch (action.type) {
//         case CAKE_ORDERED:
//             return {
//                 ...state,
//                 noOfCakes: state.noOfCakes - 1
//             }
//         case CAKE_RESTOCKED:
//             return {
//                 ...state,
//                 noOfCakes: state.noOfCakes + action.payload
//             }
//         case ICECREAM_ORDERED:
//             return{
//                 ...state,
//                 noOfIcecream:state.noOfIcecream-action.payload
//             }
//         case ICECREAM_RESTOCKED:
//             return{
//                 ...state,
//                 noOfIcecream:state.noOfIcecream+action.payload

//             }
//         default:
//             return state
//     }
// };

//M-2

const initialCakeState={
    noOfCakes:20
};

const cakeReducer = (state = initialCakeState, action) => {
    switch (action.type) {
        case CAKE_ORDERED:
            return {
                ...state,
                noOfCakes: state.noOfCakes - 1
            }
        case CAKE_RESTOCKED:
            return {
                ...state,
                noOfCakes: state.noOfCakes + action.payload
            }
        default:
            return state
    }
};

const initialIcecreamState={
    noOfIcecream:40
}

const icecreamReducer=(state=initialIcecreamState,action)=>{
    switch(action.type){
        case ICECREAM_ORDERED:
            return{
                ...state,
                noOfIcecream:state.noOfIcecream-action.payload
            }
        case ICECREAM_RESTOCKED:
            return{
                ...state,
                noOfIcecream:state.noOfIcecream+action.payload
            }
        default:
            return state;
    }
}



//store
//create store
//M-1
// const store = createStore(reducer);

//M-2
//as createStore takes only one argument and only one store have to create in a application but now we have two reducers so need to use redux.combineReducers

const rootReducers=combineReducers({cakeReducer,icecreamReducer});

const store=createStore(rootReducers,applyMiddleware(logger));

console.log('initial state ' + JSON.stringify(store.getState()))
//subscribe to store and this subscribe function return unsubscribe function so call that fumction at last
const unsubscribe = store.subscribe(() => {}
// console.log('updated state ', store.getState())
)

// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(restockeCake())
// store.dispatch(restockeCake(4))

//instead of store.dispatch() we can use bindActionCreators also. but is old way to do
const actions = bindActionCreators({ orderCake, restockeCake,orderIcecream,restockeIcecream }, store.dispatch);

actions.orderCake()
actions.restockeCake()
actions.orderIcecream()
actions.restockeIcecream(4)

unsubscribe();

