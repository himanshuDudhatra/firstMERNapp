import React, { useContext, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { UserContext } from "../App";

const Login = () => {

    const { state , dispatch } = useContext(UserContext);

    const history = useHistory();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const loginUser = async (e) => {
        e.preventDefault();

        const res = await fetch("/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,
                password
            })
        });

        const data = res.json();
        if (res.status === 400 || !data) {
            console.log(data);
            window.alert(res.status.error);
        } else {
            dispatch({type:"USER",payload:true});
            window.alert("valid");
            history.push("/");
        }
    };
    return(
        <>
            <section className="signin">
            <div className="container mt-5">
                <div className="signin-constent">
                    <div className="signin-form">
                        <h2 className="from-title">Log in</h2><br/>
                        <form>
                            <div className="form-group">
                                <label htmlFor="email">
                                <i className="zmdi zmdi-email material-icouns-name zmdi-hc-lg" />
                                </label>
                                <input type="email" className="form-control" name="email" id="email" placeholder="email" autoComplete="off"
                                value={email} 
                                onChange={ (e)=>  setEmail(e.target.value) } />
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password"><i className="zmdi zmdi-lock material-icouns-name zmdi-hc-lg" /></label>
                                <input type="password" className="form-control" name="password" id="password" placeholder="Your password" autoComplete="off"
                                value={password} 
                                onChange={ (e)=> setPassword(e.target.value) } />
                            </div>
                            <div>
                            <center><button type="submit" className="btn btn-primary" onClick={loginUser}>Login</button></center>
                            </div>
                        </form><br/>
                        <center><h2>OR</h2></center><br/>
                        <div className="signin-image">
                            <center>
                            <h2><NavLink to="/signup" className="signin-image-link"> Create a new account</NavLink></h2>
                            </center>
                        </div>
                    </div>
                </div>
            </div>
           </section>
        </>
    );
}

export default Login;