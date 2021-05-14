import React, { useEffect, useState } from "react";

const Home = () => {

    const div =  {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        //justifyContent: 'center',
        //alignItems: 'center',
        textAlign: 'center',
    }
 
    const [ userName , setUserName ] = useState();
    const [ show , setShow ] = useState(false);

	const userHome = async () => {
        try {
            const res = await fetch("/getData",{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                },
            });

            const data = await res.json();
            console.log(data);
			setUserName(data.name);
            setShow(true);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        userHome();
    },[]);

    return(
        <>
            <div>
                <div style={div}>
                    <p className="mt-5">Welcome</p>
                    <h1>{userName}</h1>
                    <h2>{ show ? " Happy, to see you back. We are Senior MERN Developer " : "We are Senior MERN Developer" }</h2>
                </div>
            </div>
        </>
    );
}

export default Home;