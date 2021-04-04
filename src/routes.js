import React from 'react';
import { Route, Switch } from "react-router-dom";
//Components
import Home from './Home';
import Order from './order/Order';
import Cart from './cart/CartDetails';
import OrderList from './order/OrderList';

function Routes() {
    
    return (
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/cart" component={Cart}/>
            <Route path="/order" component={Order}/>
            <Route path="/ordersList" component={OrderList}/>
        </Switch>
    )
    
}

export default Routes;