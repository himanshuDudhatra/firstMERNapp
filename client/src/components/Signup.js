import React, { useState } from "react";
import {NavLink , useHistory } from "react-router-dom";

const Signup = () => {

    const history = useHistory();
    //for sotre user data and send to data database
    const [user,setUser] = useState({
        name:"",email:"",phone:"",work:"",password:"",cpassword:""
    });

    //for user update value
    const handleInputes = (e) =>{ 
        //defrine variable
        let name,value;
        //first fird event property in name and value
        //console.log(e);
        //get value
        name = e.target.name;
        value = e.target.value;
        //sotre data in new function
        setUser({...user,[name]:value});
    }

    const postData = async (e) => {
        e.preventDefault();

        const { name, email, phone, work, password, cpassword } = user;
        
        const res = await fetch("/register",{
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                name, email, phone, work, password, cpassword 
            })
        });
        //confirmation from server
        const data = await res.json();
        console.log(data);
        if(res.status === 422 || !data){
            window.alert(data.error);
            console.log("invalid Registration");
        }else{
            window.alert(data.message);
            console.log("Registration Successfull");
            history.push("/login");
        }
    }
    return(
        <>
           <section className="signup">
            <div className="container mt-5">
                <div className="signup-constent">
                    <div className="signup-form">
                        <h2 className="from-title">Sign up</h2><br/>
                        <form method="POST" className="register-form">
                            <div className="form-group">
                                <label htmlFor="name">
                                    <i className="zmdi zmdi-account material-icouns-name zmdi-hc-lg" />
                                </label>
                                <input type="text" className="form-control" name="name" id="name" placeholder="Enter Name" autoComplete="off" 
                                value={user.name}
                                onChange={handleInputes} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">
                                <i className="zmdi zmdi-email material-icouns-name zmdi-hc-lg" />
                                </label>
                                <input type="email" className="form-control" name="email" id="email" placeholder="email" autoComplete="off" 
                                value={user.email}
                                onChange={handleInputes} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone"><i className="zmdi zmdi-phone-in-talk material-icouns-name zmdi-hc-lg" /></label>
                                <input type="text" className="form-control" name="phone" id="phone" placeholder="Your phone" autoComplete="off" 
                                value={user.phone}
                                onChange={handleInputes} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="work"><i className="zmdi zmdi-slideshow material-icouns-name zmdi-hc-lg" /></label>
                                <input type="text" className="form-control" name="work" id="work" placeholder="Your Profession" autoComplete="off" 
                                value={user.work}
                                onChange={handleInputes} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password"><i className="zmdi zmdi-lock material-icouns-name zmdi-hc-lg" /></label>
                                <input type="password" className="form-control" name="password" id="password" placeholder="Your password" autoComplete="off" 
                                value={user.password}
                                onChange={handleInputes} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="cpassword"><i className="zmdi zmdi-lock material-icouns-name zmdi-hc-lg" /></label>
                                <input type="password" className="form-control" name="cpassword" id="cpassword" placeholder="Confirm Your Password" autoComplete="off" 
                                value={user.cpassword}
                                onChange={handleInputes} />
                            </div><br/>
                            <div>
                            <center><div className="form-group form-button">
                                <input type="submit" name="signup" id="signup" className="form-submit" value="register" onClick={postData} />
                            </div></center>
                            </div>
                        </form><br/>
                        <div className="signup-image">
                            <center>
                            <h4><NavLink to="/login" className="signup-image-link"> I am already Register.</NavLink></h4>
                            </center>
                        </div>
                    </div>
                </div>
            </div>
           </section>
        </>
    );
}

export default Signup;