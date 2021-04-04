import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BadPage from "./pages/bad-page";
import GoodPage from "./pages/good-page";
import HomePage from "./pages/home-page";

function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/bad">
                        <BadPage />
                    </Route>
                    <Route path="/good">
                        <GoodPage />
                    </Route>
                    <Route path="/">
                        <HomePage />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
