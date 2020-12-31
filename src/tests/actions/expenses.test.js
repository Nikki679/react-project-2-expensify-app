import { startAddExpense, addExpense, removeExpense, editExpense } from '../../actions/expenses';
import uuid from 'uuid';
import expenses from '../fixtures/expenses';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database from '../../firebase/firebase';

const createMockStore=configureMockStore([thunk]);

test('Should setup remove expense action object', () =>{
const action=removeExpense({ id:'ade345' });
expect(action).toEqual({
    type:'REMOVE_EXPENSE',
    id:'ade345'
});
});

test('should setup edit expense action object', () =>{
const action=editExpense('abc',{note:'New note value'});
expect(action).toEqual({
    type:'EDIT_EXPENSE',
    id:'abc',
    updates:{
        note:'New note value'
    }
});
});

test('should setup add expense action object with provided value', () =>{
const action=addExpense(expenses[2]);
expect(action).toEqual({
type:'ADD_EXPENSE',
expense:expenses[2]
});
});

test('should add expense to database and store',()=>{
const store=createMockStore({});
const expenseData={
    description:'Mouse',
    amount:3000,
    note:'this is better',
    createdAt:1000
};
store.dispatch(startAddExpense(expenseData)).then(()=>{
const actions=store.getActions();
expect(action[0]).toEqual({
    type:'ADD_EXPENSE',
    expense:{
        id:expect.any(String),
        ...expenseData
    }
});
return database.ref(`expenses/${actions[0].expense.id}`).once('value')
}).then((snapshot)=>{
    expect(snapshot.val()).toEqual(expenseData);
//done();
});
});

test('should add expense with defaults to database and store',()=>{
    const store=createMockStore({});
    const expenseDefault={
        description:'',
        amount:0,
        note:'',
        createdAt:0
    };
    store.dispatch(startAddExpense({})).then(()=>{
    const actions=store.getActions();
    expect(action[0]).toEqual({
        type:'ADD_EXPENSE',
        expense:{
            id:expect.any(String),
            ...expenseDefault
        }
    });
    return database.ref(`expenses/${actions[0].expense.id}`).once('value')
    }).then((snapshot)=>{
        expect(snapshot.val()).toEqual(expenseDefault);
    //done();
    });
});

/* test('should setup add expense action object with default value', () =>{
const action=addExpense();
expect(action).toEqual({
type:'ADD_EXPENSE',
expense:{
    id:expect.any(String),
    description:'',
    note:'',
    amount:0,
    createdAt:0
}
});
}); */