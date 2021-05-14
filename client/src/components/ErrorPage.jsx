import React from "react";
import { NavLink } from "react-router-dom";
import "./css/errorpage.css";

const ErrorPage = () => {

    return(
        <>
           <div className="notFound">
		        <div className="notfound">
			        <div className="notfound-404">
				        <h1>Oops!</h1>
			        </div>
			        <h2>404 - Page not found</h2>
			        <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
			        <NavLink to="/">Go To Homepage</NavLink>
		        </div>
	        </div>
        </>
    );
}

export default ErrorPage;