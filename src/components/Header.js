import React from 'react';
import { NavLink } from 'react-router-dom';
import { startLogout } from '../actions/auth';
import { connect } from 'react-redux';
const Header=({ startLogout })=>(
    <div>
        <header>
            <h1>Expensify</h1>
            <NavLink activeClassName='is-active' to='/dashboard'>Dashboard</NavLink>
            <NavLink activeClassName='is-active' to='/create'>Create Expense</NavLink>
            <button onClick={startLogout}>Logout</button>
        </header>
    </div>
);

const mapDispatchToProps=(dispatch)=>({
    startLogout:()=>dispatch(startLogout())
});

export default connect(undefined,mapDispatchToProps)(Header);