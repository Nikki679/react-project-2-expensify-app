import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import './styles/styles.scss';  
import 'normalize.css/normalize.css';  
import 'react-dates/lib/css/_datepicker.css';
import AppRouter from './routers/AppRouter';

const store=configureStore();
store.dispatch(addExpense({description:'Water Bills',amount:4500}));
store.dispatch(addExpense({description:'Gas Bills',amount:2000,createdAt:1}));
store.dispatch(addExpense({description:'Rent',amount:8000}));
//store.dispatch(setTextFilter('bill'));

const state=store.getState();
const visibleExpenses=getVisibleExpenses(state.expenses,state.filters);
console.log(visibleExpenses);

const jsx=(
<Provider store={store}>
<AppRouter />
</Provider>
);
ReactDOM.render(jsx,document.getElementById('app'));