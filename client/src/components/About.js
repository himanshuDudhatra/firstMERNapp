import React, { useEffect, useState } from "react";
import imgPath from "./img/download.jpg"
import { NavLink, useHistory } from "react-router-dom";
import "./css/about.css";

const About = () => {

    const history = useHistory();
    const [userData,setData] = useState({});//always write type data what you want to store likr obj. so useStare({}) and not wite like so type error is undefine
    const callAboutPage = async () => {
        try {
            const res = await fetch("/about",{
                method:"GET",
                headers:{
                    Accept:"application/json",
                    "Content-Type":"application/json"
                },
                credentials:"include"
            });

            const data = await res.json();
            console.log(data);
            setData(data);
            if(!res.status === 200 ){
                const error = new Error(res.error);
                throw error;
            }
        } catch (error) {
            console.log(error);
            history.push("/login");
        }
    }

    useEffect(()=>{
        callAboutPage();
    },[]);

    return(
        <>
            <div className="container emp-profile" style={{ }}>
            <form method="GET">
                <div className="row">
                    <div className="col-md-4">
                        <div className="profile-img">
                            <img src={imgPath} alt=""/>
                            <div className="file btn btn-lg btn-primary">
                                Change Photo
                                <input type="file" name="file"/>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="profile-head">
                            <h5>{userData.name} </h5>
                            <h6>{userData.work}</h6>
                            <p className="proile-rating">RANKINGS : <span>8/10</span></p>
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item">
                                    <NavLink className="nav-link active" id="home-tab" data-toggle="tab" to="#home" role="tab" aria-controls="home" aria-selected="true">About</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" id="profile-tab" data-toggle="tab" to="#profile" role="tab" aria-controls="profile" aria-selected="false">Timeline</NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <input type="submit" className="profile-edit-btn" name="btnAddMore" value="Edit Profile"/>
                    </div>
                </div>
                {/** right side data toogle */}
                <div className="row">
                    <div className="col-md-4">
                        <div className="profile-work">
                            <p>WORK LINK</p>
                            <NavLink to="">Website Link</NavLink><br/>
                            <NavLink to="">Bootsnipp Profile</NavLink><br/>
                            <NavLink to="">Bootply Profile</NavLink>
                            <p>SKILLS</p>
                            <NavLink to="">Web Designer</NavLink><br/>
                            <NavLink to="">Web Developer</NavLink><br/>
                            <NavLink to="">WordPress</NavLink><br/>
                            <NavLink to="">WooCommerce</NavLink><br/>
                            <NavLink to="">PHP, .Net</NavLink><br/>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="tab-content profile-tab" id="myTabContent">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>User Id</label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>{userData._id}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Name</label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>{userData.name}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Email</label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>{userData.email}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Phone</label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>{userData.phone}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Profession</label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>{userData.work}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Experience</label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>Expert</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Hourly Rate</label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>10$/hr</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Total Projects</label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>230</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>English Level</label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>Expert</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Availability</label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>6 months</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <label>Your Bio</label><br/>
                                        <p>Your detail description</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            </div>
        </>
    );
}

export default About;