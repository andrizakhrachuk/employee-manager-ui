import "./App.css";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./Home";
import GroupList from "./components/GroupList";
import GroupEdit from "./components/GroupEdit";
import AppNavbar from "./components/AppNavbar";

const App = () => {
    return (
        <div>
            <AppNavbar/>
            <BrowserRouter>
                <Switch>
                    <Route path='/' exact={true} component={Home}/>
                    <Route path='/groups' exact={true} component={GroupList}/>
                    <Route path='/groups/:id' component={GroupEdit}/>
                </Switch>
            </BrowserRouter>
        </div>

    );
};

export default App;
