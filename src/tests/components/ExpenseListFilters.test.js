import React from 'react';
import { shallow } from 'enzyme';
import { filters, altFilters } from '../fixtures/filters';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import moment from 'moment';

let setStartDate,setEndDate,setTextFilter,sortByDate,sortByAmount,wrapper;

beforeEach(()=>{
    setStartDate=jest.fn();
    setEndDate=jest.fn();
    setTextFilter=jest.fn();
    sortByDate=jest.fn();
    sortByAmount=jest.fn();
    wrapper=shallow(<ExpenseListFilters 
    setStartDate={setStartDate}
    setEndDate={setEndDate}
    setTextFilter={setTextFilter}
    sortByAmount={sortByAmount}
    sortByDate={sortByDate}
    filters={filters}
    />
    );
});

test('should render ExpenseListFilters correctly',()=>{
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFilters with alt data correctly',()=>{
wrapper.setProps({
filters:altFilters
});
expect(wrapper).toMatchSnapshot();
});

test('should handle the text change',()=>{
const value='rent';
wrapper.find('input').simulate('change',{
    target:{ value }
});
expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test('should handle sortby date',()=>{
const value='date';
wrapper.setProps({
    filters:altFilters
});
wrapper.find('select').simulate('change',{
    target:{ value }
});
expect(sortByDate).toHaveBeenLastCalledWith();
});

test('should handle sortby amount',()=>{
    const value='amount';
    wrapper.find('select').simulate('change',{
        target:{ value }
    });
    expect(sortByAmount).toHaveBeenLastCalledWith();
    });
    
test('should handle date change',()=>{
const startDate=moment(0).add(4,'years');
const endDate=moment(0).add(8,'years');
wrapper.find('DateRangePicker').prop('onDatesChange')({startDate,endDate});
expect(setStartDate).toHaveBeenLastCalledWith(startDate);
expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

test('should handle data focus change',()=>{
const calenderFocused='endDate';
wrapper.find('DateRangePicker').prop('onFocusChange')(calenderFocused);
expect(wrapper.state('calenderFocused')).toBe(calenderFocused);
});