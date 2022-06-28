import React, { useEffect } from "react";
import './index.css'
import { BrowserRouter as Router, Switch,Route } from "react-router-dom/cjs/react-router-dom.min";
import Login from "./components/Login";
import Home from "./components/Home";
import { useDispatch, useSelector } from "react-redux";
import{ getUserAuth} from './actions/index';
import store from './store/index'



function App() {

  const auth = useSelector(state => state.userState.user)
  const dispatch = useDispatch()

  useEffect((auth) => {
      
      //  dispatch(getUserAuth())
    console.log(store.getState())
     
  },[auth])

  return (
    <div className="App">
    <Router>
      <Switch>
        <Route exact path = '/'>
          <Login/>
        </Route>
        <Route exact path = '/home'>
          <Home/>
        </Route>
      </Switch>
    </Router>

    </div>
  );
}


export default App;
