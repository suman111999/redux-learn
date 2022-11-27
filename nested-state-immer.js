const redux=require('redux');
const {createStore}=redux;
const immer=require('immer');
const {produce}=immer;

const initialSate={
    name:'suman',
    address:{
        street:'332432  delhi gali',
        city:'jaipur',
        state:'RJ'
    }
}

const UPDATE_STREET='UPDATE_STREET';

const updateStreet=(street)=>{
    return {
        type:UPDATE_STREET,
        payload:street
    }
};

const reducer=(state=initialSate,action)=>{
    switch(action.type){
        case UPDATE_STREET:
            // return{
            //     ...state,
            //    address:{
            //     ...state.address,
            //     street:action.payload
            //    }
            // }
            return produce(state,(copyOfSate)=>{
                copyOfSate.address.street=action.payload;
            })
        default:
            return state
    }
};

const store=createStore(reducer);

const unsubscribe=store.subscribe(()=>console.log('updated ',store.getState()));

store.dispatch(updateStreet('delhi'));

unsubscribe();

