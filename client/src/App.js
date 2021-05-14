import React, { createContext, useReducer } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Route ,Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Footer from "./components/footer";
import ErrorPage from "./components/ErrorPage";
import Logout from "./components/Logout";
import { initialState , reducer } from "./reducer/UseReducer";

export const UserContext = createContext();

const  Routing = () => {
  return(
    <>
      <Switch>
      <Route exact path="/"><Home/></Route>
      <Route exact path="/about"><About/></Route>
      <Route exact path="/contact"><Contact/></Route>
      <Route exact path="/login"><Login/></Route>
      <Route exact path="/signup" component={Signup}/>
      <Route exact path="/logout" component={Logout}/>
      <Route component={ErrorPage} />
      </Switch>
      <Footer/>
    </>
  )
}

const App = () => {

  const [state,dispatch] = useReducer(reducer,initialState);

  return(
    <>
      <UserContext.Provider value={{state,dispatch}}>
      <NavBar/>
      <Routing/>
      </UserContext.Provider>
    </>
  );
}

export default App;