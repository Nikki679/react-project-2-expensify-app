import { createStore } from 'redux';
const incrementCount=({IncrementBy=1}={})=>({
type:'INCREMENT',
IncrementBy
});
const decrementCount=({DecrementBy=1}={})=>
({
type:'DECREMENT',
DecrementBy
});
const resetCount=()=>({
    type:'RESET'
    });
const setCount=({count=1}={})=>({
type:'SET',
count
});
const countReducer=(state={count:0},action)=>
{
    switch(action.type)
    {
        case 'INCREMENT':
            return {
            count:state.count+action.IncrementBy
        }
        case 'DECREMENT':
            return {
            count:state.count-action.DecrementBy
        }
        case 'RESET':return{
            count:0
        }
        case 'SET':return{
            count:action.count
        }
        default:{
            return state
        }
    }
};
const store=createStore(countReducer);

const unsubscribe=store.subscribe(()=>
{
    console.log(store.getState());

});


store.dispatch(incrementCount({IncrementBy:5}));
store.dispatch(incrementCount());

store.dispatch(decrementCount({DecrementBy:10}));
store.dispatch(setCount({count:100}));
//unsubscribe();

store.dispatch(resetCount()); 
