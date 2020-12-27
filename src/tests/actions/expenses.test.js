import { addExpense, removeExpense, editExpense } from '../../actions/expenses';
import uuid from 'uuid';

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

test('should setup add expense action object', () =>{
    const expenseData=
    {
        description:'Rent',
        note:'Nov rent',
        amount:10000,
        createdAt:1
    }
const action=addExpense(expenseData);
expect(action).toEqual({
type:'ADD_EXPENSE',
expense:{
    ...expenseData,
    id:expect.any(String),
}
});
});
test('should setup add expense action object', () =>{
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
});