import React from 'react';
import { shallow } from 'enzyme';
import {ExpensesSummary} from '../../components/ExpensesSummary';

test('should correctly render expensesSummary with 1 expense',()=>{
const wrapper=shallow(<ExpensesSummary expenseCount={1} expensesTotal={230}/>);
expect(wrapper).toMatchSnapshot();
});

test('should correctly render expensesSummary with multiple expense',()=>{
    const wrapper=shallow(<ExpensesSummary expenseCount={23} expensesTotal={23512340987}/>);
    expect(wrapper).toMatchSnapshot();
    });
