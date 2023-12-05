import React from 'react';
import { Route, Switch } from 'react-router';
import './App.scss';
import Main from './components/Main/Main';

const App = () => {
    return (
        <div>
            <Switch>
                <Route path="/" render={() => <Main />} />
            </Switch>
        </div>
    );
};

export default App;
