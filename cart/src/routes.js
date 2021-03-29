import React from 'react';
import { Route, Switch } from "react-router-dom";
//Components
import Home from './Home';

function Routes() {
    
    return (
        <Switch>
            <Route exact path="/" component={Home}/>
        </Switch>
    )
    
}

export default Routes;