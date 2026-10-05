import { useNavigate } from "react-router-dom";
import {useState } from "react";
import { toast } from "react-toastify";
import api from "../Services/Axios";
function Registration() {

    // React_States-----------------------------------------------------
    const [email,setEmail]=useState()
    const [name,setName]=useState()
    const [password,setPassword]=useState()
    const [error,setError]=useState()
    const navigate=useNavigate()

    // Functions--------------------------------------------------------
    
    // Form-Submit-Function
    const submitHandler=async(e)=>{
        e.preventDefault()
        const actualData={
            name:name,
            email:email,
            password:password,        
        }
        try {
            const {data}=await api.post("/user/registration",actualData)
            toast.success("Register SuccessFully")
            navigate("/user/login")
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
              setError(error.response.data.message)
            } else {
              setError("An error occurred during registration.");
            }
        }
    }

  return (
    <>
       <Helmet>
        <title>User|Registration</title>
      </Helmet> 
    </>
  )
}

export default Registration
