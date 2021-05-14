import React, { useEffect, useState } from "react";
import "./css/contact.css"
import img from "./img/contact-image.png"

const Contact = () => {

	const [userData,setData] = useState({name:"",email:"",phone:"",message:""});
	const userContact = async () => {
        try {
            const res = await fetch("/getData",{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                },
            });

            const data = await res.json();
            console.log(data);
			setData({ ...userData, name:data.name, email:data.email, phone:data.phone });
            if(!res.status === 200 ){
                const error = new Error(res.error);
                throw error;
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        userContact();
    },[]);

	const handleInputs = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setData({...userData, [name]:value });
	}

	const contactForm = async (e) => {
		e.preventDefault();

		const { name, email, phone, message } = userData;

		const res = await fetch("/contact",{
			method:'POST',
			headers:{
				"Content-Type":"application/json"
			},
			body:JSON.stringify({
				name,email,phone,message
			})
		});

		const data = await res.json();

		if(!data){
			console.log('message does not send');
		}else{
			alert("message send");
			setData({...userData, message:""});
		}
	}

    return(
        <>
        <h2 className="title">Contact Us</h2>
            <div className="container contact">
	            <div className="row">
		            <div className="col-md-3" style={{border:'3px solid black',borderRight:'0px'}}>
			            <div className="contact-info">
				            <img src={img} alt="description of img" />
				            <h2>Contact Us</h2>
				            <h4>We would love to hear from you !</h4>
			            </div>
		            </div>
		            <div className="col-md-9" style={{border:'3px solid black',borderLeft:'0px',backgroundColor:' #25274d',color:'white'}}>
			            <form method="POST">
						<div className="contact-form">
				            <div className="form-group">
				                <div className="col-sm-10">          
					                <input type="text" className="form-control" id="contact_form_name" name="name" value={userData.name} onChange={handleInputs} placeholder="Enter First Name" required />
				                </div>
				            </div>
				            <div className="form-group">
				                <div className="col-sm-10">
					                <input type="email" className="form-control" id="contact_form_email" name="email" value={userData.email} onChange={handleInputs} placeholder="Enter email" required />
				                </div>
				            </div>
                            <div className="form-group">
				                    <div className="col-sm-10">          
					                    <input type="number" className="form-control" id="contact_form_phone" name="phone" value={userData.phone} onChange={handleInputs} placeholder="your phone number" required />
				                    </div>
				            </div>
				            <div className="form-group">
				                    <div className="col-sm-10">
					                    <textarea className="form-control" rows="5" id="message" placeholder="Message" name="message" value={userData.message} onChange={handleInputs} ></textarea>
				                    </div>
				            </div>
				            <div className="form-group">        
				                <div className="col-sm-offset-2 col-sm-10">
					                <button type="submit" className="btn btn-primary" onClick={contactForm}>send Message</button>
				                </div>
				            </div>
			            </div>
						</form>
		            </div>
	            </div>
            </div>

        </>
    );
}

export default Contact;