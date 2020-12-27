import {createStore,combineReducers} from 'redux';
import uuid from 'uuid';

//Add Expense
const addExpense=({description='',note='',amount=0,createdAt=0}={})=>({
type:'ADD_EXPENSE',
expense:{
id:uuid(),
description,
note,
amount,
createdAt
}
});
//Remove Expense
const removeExpense=({id}={})=>({
    type:'REMOVE_EXPENSE',
    id
});
//EDIT EXPENSE
const editExpense=(id,updates)=>({
type:'EDIT_EXPENSE',
id,
updates
});
//setTextFilter
const setTextFilter=(text='')=>({
type:'SET_TEXT_FILTER',
text
});
//SORT BY DATE
const sortByDate=()=>({
type:'SORT_BY_DATE'
});
//SORT BY AMOUNT
const sortByAmount=()=>({
    type:'SORT_BY_AMOUNT'
    });
//setStartDate
const setStartDate=(startDate)=>({
type:'SET_START_DATE',
startDate
});
//setEndDate
const setEndDate=(endDate)=>({
    type:'SET_END_DATE',
    endDate
    });
//expense reducer
const expensesReducersDefaultState=[];
const expensesReducers=(state=expensesReducersDefaultState,action)=>{
switch(action.type){
    case 'ADD_EXPENSE':return [
        ...state,
        action.expense
    ]
    case 'REMOVE_EXPENSE':return state.filter(({id})=>id!==action.id);
    case 'EDIT_EXPENSE':return state.map((expense)=>{
        if(expense.id===action.id)
        {
            return{
                ...state,
            ...action.updates
            };
        }
        else{
            return expense
        }
    })
    default:
        return state;
}
};
//filter reducer
const filterReducersDefaultState={
text:'',
sortBy:'date',
startDate:undefined,
endDate:undefined
};
const filterReducers=(state=filterReducersDefaultState,action)=>{
switch(action.type){
    case 'SET_TEXT_FILTER':return {
        ...state,
        text:action.text
    }
    case 'SORT_BY_DATE':return{
       ...state,
       sortBy:'date'
    }
    case 'SORT_BY_AMOUNT':return{
        ...state,
        sortBy:'amount'
     }
     case 'SET_START_DATE':return{
         ...state,
         startDate:action.startDate
     }
     case 'SET_END_DATE':return{
        ...state,
        endDate:action.endDate
    }
    default: return state;
}
};

const getVisibleExpenses=(expenses,{ text,sortBy,startDate,endDate })=>{
return expenses.filter((expense)=>{
const startDateMatch=typeof startDate!=='number' || expense.createdAt>=startDate;
const endDateMatch=typeof endDate!=='number' || expense.createdAt<=endDate;;
const textMatch=expense.description.toLowerCase().includes(text);
    return startDateMatch &&  endDateMatch && textMatch
}).sort((a,b)=>{
if(sortBy==='date')
{
    return a.createdAt<b.createdAt?1:-1;
}
else if(sortBy==='amount')
{
    return a.amount<b.amount?1:-1;
}
});
};

const store=createStore(
    combineReducers({
    expenses:expensesReducers,
    filters:filterReducers
}));
store.subscribe(()=>{
    const state=store.getState();
    const visibleExpenses=getVisibleExpenses(state.expenses,state.filters);
    console.log( visibleExpenses);
});
const expenseOne=store.dispatch(addExpense({description:'Rent',amount:800,createdAt:900}));
const expenseTwo=store.dispatch(addExpense({description:'coffee',amount:100,createdAt:1000}));
/* store.dispatch(removeExpense({id:expenseOne.expense.id}));
store.dispatch(editExpense(expenseTwo.expense.id,{amount:500}));
store.dispatch(setTextFilter());
store.dispatch(sortByDate());


store.dispatch(setStartDate());
 */
//console.log(expenseOne);
//store.dispatch(setStartDate(950));
//store.dispatch(setEndDate(150));
//store.dispatch(setTextFilter('e'));
store.dispatch(sortByAmount());
const demoState={
    expenses:[{
        id:'njkk',
        description:'jan rent',
        note:'pg',
        amount:'8000',
        createdAt:0
    }],
    filters:{
        text:'rents',
        sortBy:'amount',
        startDate:undefined,
        endDate:undefined
    }
};