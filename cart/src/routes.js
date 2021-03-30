import React from 'react';
import { Route, Switch } from "react-router-dom";
//Components
import Home from './Home';
import Order from './Order/Order';

function Routes() {
    
    return (
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/order" component={Order}/>
        </Switch>
    )
    
}

export default Routes;