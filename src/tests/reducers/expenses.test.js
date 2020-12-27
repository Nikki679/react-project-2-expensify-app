import moment from "moment";
import expenses from "../fixtures/expenses";
import expensesReducers from "../../reducers/expenses";

test("should setup for default state", () => {
  const state = expensesReducers(undefined, { type: "@@INIT" });
  expect(state).toEqual([]);
});

test("should set remove expenses by id", () => {
  const action = {
    type: "REMOVE_EXPENSE",
    id: expenses[1].id,
  };
  const state = expensesReducers(expenses, action);
  expect(state).toEqual([expenses[0], expenses[2]]);
});

test("should not remove expenses if id not found", () => {
  const action = {
    type: "REMOVE_EXPENSE",
    id: "-1",
  };
  const state = expensesReducers(expenses, action);
  expect(state).toEqual(expenses);
});

test("should add expenses", () => {
    const expense= {
        id: 4,
        description: "pg",
        note: "dec rent",
        amount: 8905,
        createdAt: 0,
      }
  const action = {
    type: "ADD_EXPENSE",
    expense
  };
  const state = expensesReducers(expenses, action);
  expect(state).toEqual([...expenses, expense]);
});

test('should edit an expense',()=>{
    const amount= 12000
      const action = {
        type: "EDIT_EXPENSE",
        id:expenses[1].id,
        updates:{
            amount
        }
      };
      const state = expensesReducers(expenses, action);
      expect(state[1].amount).toEqual(amount);
});

test('should not edit expense if expense not found',()=>{
    const amount= 12000
      const action = {
        type: "EDIT_EXPENSE",
        id:'-1',
        updates:{
            amount
        }
      };
      const state = expensesReducers(expenses, action);
      expect(state).toEqual(expenses);
});